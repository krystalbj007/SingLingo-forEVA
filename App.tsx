import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ControlBar } from './components/ControlBar';
import { LyricsView } from './components/LyricsView';
import { LibraryModal } from './components/LibraryModal';
import { parseLRC } from './services/lrcParser';
import { PREBAKED_DEMO_ANALYSIS } from './data/prebaked';
import { analyzeLyricsWithGemini } from './services/geminiService';
import { saveSongToLibrary, getAllSongs, deleteSongFromLibrary } from './services/storageService';
import { LyricLine, PlayerState, SavedSong } from './types';
import { DEMO_LRC, DEMO_AUDIO_URL, DEMO_LRC_URL } from './constants';
import { Upload, Mic2, Save, Library as LibraryIcon, Download } from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [fileName, setFileName] = useState<string>("Demo: Taylor Swift - The Fate of Ophelia");
  
  // Storage State
  const [currentAudioBlob, setCurrentAudioBlob] = useState<Blob | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [savedSongs, setSavedSongs] = useState<SavedSong[]>([]);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const isStorageBroken = useRef(false);
  
  // Audio State
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playbackRate: 1.0,
    loopActive: false,
    loopStart: null,
    loopEnd: null
  });

  // UI State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [analyzingIndex, setAnalyzingIndex] = useState<number | null>(null);

    // --- Refs ---
    const audioRef = useRef<HTMLAudioElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const blobUrlRef = useRef<string | null>(null);
    const currentBlobRef = useRef<Blob | null>(null); // Track the actual Blob object
    const lyricsRef = useRef<LyricLine[]>([]); // Track latest lyrics for async operations

    // Sync lyricsRef with state
    useEffect(() => {
        lyricsRef.current = lyrics;
    }, [lyrics]);

    // Helper: Cleanup previous Blob URL to prevent memory leaks and 404s
    const setAudioSource = useCallback((blob: Blob) => {
        if (!blob) return;
        
        // Warn if blob is empty
        if (blob.size === 0) {
            console.warn("Attempted to set empty audio blob source");
            return;
        }

        // STRICT CHECK: If it's the exact same Blob instance, do nothing.
        if (currentBlobRef.current === blob) {
            return; 
        }
        
        // Also check if audioRef already has this blob URL to prevent loop
        if (audioRef.current && blobUrlRef.current && audioRef.current.src === blobUrlRef.current) {
            // Check if blob is same size/type just in case reference is different but content same
             if (currentBlobRef.current && 
                 currentBlobRef.current.size === blob.size && 
                 currentBlobRef.current.type === blob.type) {
                 return;
             }
        }

        try {
            // Stop previous playback
            if (audioRef.current) {
                audioRef.current.pause();
            }

            const newUrl = URL.createObjectURL(blob);
            const oldUrl = blobUrlRef.current;

            console.log(`Setting audio source: ${newUrl} (size: ${blob.size})`);

            // Update refs immediately
            blobUrlRef.current = newUrl;
            currentBlobRef.current = blob;
            
            if (audioRef.current) {
                audioRef.current.src = newUrl;
                audioRef.current.load(); // Force reload to ensure readiness
            }

            // Revoke old URL with a delay to prevent net::ERR_ABORTED if audio is still buffering/loading
            if (oldUrl && oldUrl !== newUrl) {
                setTimeout(() => {
                    URL.revokeObjectURL(oldUrl);
                    console.log(`Revoked old audio source: ${oldUrl}`);
                }, 10000); // 10 second delay for safety
            }
        } catch (e) {
            console.error("Failed to create object URL", e);
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            const urlToRevoke = blobUrlRef.current;
            if (urlToRevoke) {
                // Delay revocation to ensure no pending loads are aborted
                setTimeout(() => {
                    URL.revokeObjectURL(urlToRevoke);
                }, 5000);
            }
        };
    }, []);
  const createSilentBlob = () => {
    const wavHeader = new Uint8Array([
      0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45, 0x66, 0x6d, 0x74, 0x20,
      0x10, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x44, 0xac, 0x00, 0x00, 0x88, 0x58, 0x01, 0x00,
      0x02, 0x00, 0x10, 0x00, 0x64, 0x61, 0x74, 0x61, 0x00, 0x00, 0x00, 0x00
    ]);
    return new Blob([wavHeader], { type: 'audio/wav' });
  };

    const isInit = useRef(false);

  // --- Initialization ---
  useEffect(() => {
    // Use the "ignore" pattern to handle React Strict Mode double-invocation correctly.
    // This ensures we only apply the results of the latest effect, preventing race conditions
    // and "net::ERR_ABORTED" errors from cancelled Blob URL loads.
    let ignore = false;

    const initApp = async () => {
        try {
            // 1. Try to load existing library first
            let allSongs: SavedSong[] = [];
            let dbLoadFailed = false;
            try {
                allSongs = await getAllSongs();
            } catch (dbError) {
                if (ignore) return;
                console.warn("First DB load failed, retrying...", dbError);
                try {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    if (ignore) return;
                    allSongs = await getAllSongs();
                } catch (retryError) {
                    if (ignore) return;
                    console.warn("Failed to load library from DB after retry, starting fresh", retryError);
                    dbLoadFailed = true;
                    isStorageBroken.current = true; // Mark storage as broken
                }
            }
            
            if (ignore) return;
            
            const demoId = "demo-track";
            let existingDemo = allSongs.find(s => s.id === demoId);

            // PRE-BAKING INJECTION FOR EXISTING DEMO
            // If we found a demo but it lacks analysis (e.g. from previous load), inject the pre-baked data
            if (existingDemo) {
                let hasUpdates = false;
                existingDemo.lyrics.forEach(line => {
                    const cleanText = line.text.trim().replace(/\s+/g, ' '); // Normalize whitespace
                    const cached = PREBAKED_DEMO_ANALYSIS[cleanText];
                    
                    // Relaxed check: Inject if analysis is missing OR translation is missing (assuming prebaked has both)
                    // We also overwrite if the current analysis seems "empty" (no links/stress) but we have rich data
                    const isAnalysisEmpty = !line.analysis || (line.analysis.links.length === 0 && line.analysis.stress.length === 0);
                    
                    if (cached && (isAnalysisEmpty || !line.translation)) {
                        console.log(`Injecting pre-baked data for line: "${cleanText.substring(0, 20)}..."`);
                        line.analysis = {
                            links: cached.links,
                            stress: cached.stress,
                            elisions: cached.elisions,
                            explanation: cached.explanation
                        };
                        line.translation = cached.translation;
                        hasUpdates = true;
                    }
                });
                
                if (hasUpdates) {
                    console.log("Injected pre-baked analysis into existing demo");
                    // Update in DB if possible
                    if (!dbLoadFailed) {
                         saveSongToLibrary(existingDemo).catch(e => console.warn("Failed to update demo with pre-baked data", e));
                    }
                }
            }

            if (existingDemo) {
                if (ignore) return;
                console.log("Loaded existing demo from library");

                // Cleanup: Remove unwanted footer line if present
                const lastLine = existingDemo.lyrics[existingDemo.lyrics.length - 1];
                if (lastLine && lastLine.text.toLowerCase().includes("rentanadviser")) {
                    console.log("Removing unwanted footer line");
                    existingDemo.lyrics = existingDemo.lyrics.slice(0, -1);
                    // Try to update DB, but don't block if it fails
                    saveSongToLibrary(existingDemo).catch(e => console.error("Failed to update demo cleanup", e));
                    
                    // Update local list
                    const index = allSongs.findIndex(s => s.id === demoId);
                    if (index !== -1) allSongs[index] = existingDemo;
                }

                setSavedSongs(allSongs);
                setFileName(existingDemo.name);
                setLyrics(existingDemo.lyrics);
                lyricsRef.current = existingDemo.lyrics; // Sync ref immediately to prevent data loss on analysis
                setCurrentSongId(existingDemo.id);
                setCurrentAudioBlob(existingDemo.audioBlob);
                
                if (audioRef.current) {
                    setAudioSource(existingDemo.audioBlob);
                }
                return;
            }

            // 2. If no demo exists, fetch assets
            let demoAudioBlob: Blob;
            let demoLyricsText: string;

            try {
                const audioRes = await fetch(DEMO_AUDIO_URL);
                if (!audioRes.ok) throw new Error("Failed to load demo audio");
                demoAudioBlob = await audioRes.blob();
            } catch (e) {
                if (ignore) return;
                console.warn("Using silent blob fallback");
                demoAudioBlob = createSilentBlob();
            }

            if (ignore) return;

            try {
                const lrcRes = await fetch(DEMO_LRC_URL);
                if (lrcRes.ok) {
                    demoLyricsText = await lrcRes.text();
                } else {
                    demoLyricsText = DEMO_LRC;
                }
            } catch (e) {
                demoLyricsText = DEMO_LRC;
            }

            if (ignore) return;

            const demoParsed = parseLRC(demoLyricsText);
            
            // PRE-BAKING: Apply cached analysis if available (Fresh Demo)
            demoParsed.forEach(line => {
                const cleanText = line.text.trim().replace(/\s+/g, ' ');
                if (PREBAKED_DEMO_ANALYSIS[cleanText]) {
                    const cached = PREBAKED_DEMO_ANALYSIS[cleanText];
                    line.analysis = {
                        links: cached.links,
                        stress: cached.stress,
                        elisions: cached.elisions,
                        explanation: cached.explanation
                    };
                    line.translation = cached.translation;
                }
            });

            const demoSong: SavedSong = {
                id: demoId,
                name: "Demo: Taylor Swift - The Fate of Ophelia",
                audioBlob: demoAudioBlob,
                lyrics: demoParsed,
                createdAt: Date.now()
            };

            // 3. Save New Demo Song to Library (Only if DB load didn't fail, to avoid overwriting existing data)
            if (!dbLoadFailed) {
                try {
                    await saveSongToLibrary(demoSong);
                    // 4. Update State from DB to be sure
                    const updatedSongs = await getAllSongs();
                    if (ignore) return;
                    setSavedSongs(updatedSongs);
                } catch (saveError) {
                    if (ignore) return;
                    console.error("Failed to save demo to DB, using in-memory only", saveError);
                    // Fallback: Use in-memory state if DB fails
                    setSavedSongs([demoSong]);
                    showCoachToast("Storage error: Songs may not persist.");
                }
            } else {
                 console.warn("DB load failed previously, using in-memory demo to avoid overwriting potential data");
                 setSavedSongs([demoSong]);
                 showCoachToast("Library unavailable. Changes won't be saved.");
            }
            
            if (ignore) return;

            setFileName(demoSong.name);
            setLyrics(demoSong.lyrics);
            lyricsRef.current = demoSong.lyrics; // Sync ref immediately
            setCurrentSongId(demoSong.id);
            setCurrentAudioBlob(demoSong.audioBlob);
                
            if (audioRef.current) {
                setAudioSource(demoSong.audioBlob);
            }
        } catch (fatalError) {
            if (ignore) return;
            console.error("Fatal initialization error", fatalError);
            // Last resort fallback
            setLyrics(parseLRC(DEMO_LRC));
            setAudioSource(createSilentBlob());
            showCoachToast("App failed to initialize.");
        }
    };

    initApp();

    return () => {
        ignore = true;
    };
  }, []);

  const refreshLibrary = async () => {
      try {
          const songs = await getAllSongs();
          setSavedSongs(songs);
          
          // Also sync current song lyrics if it exists in library
          if (currentSongId) {
              const currentInLib = songs.find(s => s.id === currentSongId);
              if (currentInLib) {
                  // Only update if analysis count changed to avoid UI flicker
                  const libAnalyzed = currentInLib.lyrics.filter(l => l.analysis).length;
                  const currentAnalyzed = lyricsRef.current.filter(l => l.analysis).length;
                  
                  if (libAnalyzed > currentAnalyzed) {
                      console.log("Syncing lyrics from library (found more analysis)");
                      setLyrics(currentInLib.lyrics);
                      lyricsRef.current = currentInLib.lyrics;
                  }
              }
          }
      } catch (e) {
          console.error("Failed to load library", e);
      }
  };

  // --- Audio Logic ---
  const safePlay = useCallback(() => {
    if (audioRef.current) {
      const promise = audioRef.current.play();
      if (promise !== undefined) {
        promise.catch(error => {
          if (error.name === 'AbortError') return;
          console.error("Audio playback error:", error);
        });
      }
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playerState.isPlaying) {
      audioRef.current.pause();
    } else {
      safePlay();
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const setPlaybackRate = (rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
      setPlayerState(prev => ({ ...prev, playbackRate: rate }));
    }
  };

  const toggleLoop = () => {
    setPlayerState(prev => {
      if (!prev.loopActive) {
        const currentLine = lyrics[currentLineIndex];
        const nextLine = lyrics[currentLineIndex + 1];
        return {
          ...prev,
          loopActive: true,
          loopStart: currentLine ? currentLine.time : 0,
          loopEnd: nextLine ? nextLine.time : prev.duration
        };
      }
      return { ...prev, loopActive: false, loopStart: null, loopEnd: null };
    });
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const time = audioRef.current.currentTime;

    if (playerState.loopActive && playerState.loopEnd !== null && playerState.loopStart !== null) {
      if (time >= playerState.loopEnd) {
        audioRef.current.currentTime = playerState.loopStart;
        return;
      }
    }

    let activeIndex = lyrics.findIndex(l => l.time > time) - 1;
    if (activeIndex === -2) activeIndex = lyrics.length - 1; 
    if (activeIndex < 0) activeIndex = 0;

    if (activeIndex !== currentLineIndex) {
      setCurrentLineIndex(activeIndex);
      // We do NOT trigger analysis here anymore to prevent stale closure issues.
      // Instead, we rely on a useEffect to trigger it when currentLineIndex changes.
    }

    setPlayerState(prev => ({ 
      ...prev, 
      currentTime: time,
      isPlaying: !audioRef.current!.paused 
    }));

    // Use requestAnimationFrame for smoother UI updates
    // onTimeUpdate is too infrequent (4Hz) for smooth progress bars.
    // We rely on this for the main time state.
  };

  // RAF Loop for smooth playback time updates
  const lastTimeRef = useRef(0);

  useEffect(() => {
    let rafId: number;
    
    const loop = () => {
      // We check ref directly to avoid closure staleness issues with playerState
      if (audioRef.current && !audioRef.current.paused) {
        const newTime = audioRef.current.currentTime;
        // Only update React state if time has changed significantly (> 0.1s)
        // AND if it differs from what we last committed to state (tracked via ref)
        if (Math.abs(newTime - lastTimeRef.current) > 0.1) {
             lastTimeRef.current = newTime;
             setPlayerState(prev => ({
               ...prev,
               currentTime: newTime
             }));
        }
        rafId = requestAnimationFrame(loop);
      }
    };

    if (playerState.isPlaying) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [playerState.isPlaying]);

  // Trigger analysis when line changes (and playing)
  useEffect(() => {
      if (playerState.isPlaying && currentLineIndex >= 0) {
          const line = lyrics[currentLineIndex];
          if (line && !line.analysis && !analyzingIndex) {
              triggerAnalysis(currentLineIndex);
          }
      }
  }, [currentLineIndex, playerState.isPlaying]); // Depend on lyrics? No, handled inside triggerAnalysis via Ref.
  // Actually, we should depend on 'lyrics' length or existence, but not the whole object to avoid loops.
  // 'triggerAnalysis' uses ref, so it's safe.

  const triggerAnalysis = async (index: number) => {
    if (index < 0 || index >= lyrics.length) return;
    const line = lyrics[index];
    if (line.analysis) return;

    setAnalyzingIndex(index);
    try {
      const result = await analyzeLyricsWithGemini(line.text);
      const { translation, ...analysisData } = result;

      // Use lyricsRef.current to get the absolutely latest state
      // This prevents overwriting updates from parallel analysis calls
      const currentLyrics = [...lyricsRef.current];
      
      // Update the specific line
      currentLyrics[index] = { 
          ...currentLyrics[index], 
          analysis: analysisData, 
          translation: translation 
      };

      // 1. Update React State & Ref IMMEDIATELY to prevent race conditions
      lyricsRef.current = currentLyrics; // Manual sync before async gap
      setLyrics(currentLyrics);

      // 2. Auto-save using the fresh data
      if (currentSongId && currentAudioBlob) {
         if (isStorageBroken.current) {
             console.warn("Skipping auto-save because storage is broken.");
             return;
         }

         // Create a clone or ensure blob is valid before passing to async
         // Note: Blob is immutable, but reference might change if state updates? No.
         const blobToSave = currentAudioBlob; 

         const songToSave: SavedSong = {
            id: currentSongId,
            name: fileName,
            audioBlob: blobToSave,
            lyrics: currentLyrics,
            createdAt: Date.now() 
         };
         
         // Save to DB asynchronously
         saveSongToLibrary(songToSave).catch(e => {
             console.error("Auto-save failed", e);
             // Optional: Show toast only on critical failures, or maybe debounce warnings
         });
         
         // Update local library state immediately without full reload
         setSavedSongs(prev => {
             const idx = prev.findIndex(s => s.id === songToSave.id);
             if (idx >= 0) {
                 const newArr = [...prev];
                 newArr[idx] = songToSave;
                 return newArr;
             } else {
                 return [songToSave, ...prev];
             }
         });
      }
      
      // Chain next line analysis
      if (index + 1 < currentLyrics.length && !currentLyrics[index+1].analysis) {
        // ... (Similar logic for next line, but we let the recursion handle state via triggerAnalysis or just call it?)
        // Actually, triggerAnalysis is async, so we can just call it for the next index!
        // BUT, to avoid deep recursion stack or complex state management, let's keep it simple:
        // We just invoke the analysis for the next line directly here as before, 
        // BUT we must fetch fresh state again before saving.
        
        const nextResult = await analyzeLyricsWithGemini(currentLyrics[index+1].text);
        
        // Fetch fresh state AGAIN because the user might have analyzed another line in parallel
        const freshLyrics = [...lyricsRef.current]; 
        freshLyrics[index+1] = { 
            ...freshLyrics[index+1], 
            analysis: nextResult, 
            translation: nextResult.translation 
        };

        setLyrics(freshLyrics);

        if (currentSongId && currentAudioBlob) {
            const songToSave: SavedSong = {
               id: currentSongId,
               name: fileName,
               audioBlob: currentAudioBlob,
               lyrics: freshLyrics,
               createdAt: Date.now()
            };
            
            saveSongToLibrary(songToSave).catch(e => console.error("Auto-save chain failed", e));

            setSavedSongs(prev => {
                const idx = prev.findIndex(s => s.id === songToSave.id);
                if (idx >= 0) {
                    const newArr = [...prev];
                    newArr[idx] = songToSave;
                    return newArr;
                } else {
                    return [songToSave, ...prev];
                }
            });
         }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzingIndex(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    let audioFile: File | null = null;
    let lrcFile: File | null = null;

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith('audio/')) audioFile = files[i];
      if (files[i].name.endsWith('.lrc') || files[i].name.endsWith('.txt')) lrcFile = files[i];
    }

    if (audioFile) {
      // const url = URL.createObjectURL(audioFile); // Removed unused/leaked URL creation
      setAudioSource(audioFile);
      setFileName(audioFile.name.replace(/\.[^/.]+$/, ""));
      setCurrentAudioBlob(audioFile); 
      setCurrentSongId(null);
      setPlayerState(prev => ({ ...prev, isPlaying: false, currentTime: 0, duration: 0 }));
    }

    if (lrcFile) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        const parsed = parseLRC(text);
        if (parsed.length > 0) {
            setLyrics(parsed);
            lyricsRef.current = parsed;
        }
      };
      reader.readAsText(lrcFile);
    }
    e.target.value = '';
  };

  const handleSaveToLibrary = async () => {
      let blobToSave = currentAudioBlob;
      if (!blobToSave) {
          try {
              const response = await fetch(DEMO_AUDIO_URL);
              blobToSave = await response.blob();
          } catch (e) {
              blobToSave = createSilentBlob();
          }
      }

      try {
          const songId = currentSongId || Date.now().toString();
          const newSong: SavedSong = {
              id: songId,
              name: fileName,
              audioBlob: blobToSave,
              lyrics: lyrics,
              createdAt: Date.now()
          };
          
          await saveSongToLibrary(newSong);
          setCurrentSongId(songId);
          await refreshLibrary();
          showCoachToast(`"${fileName}" saved!`);
      } catch (e) {
          showCoachToast("Failed to save.");
      }
  };

  const handleLoadSong = (song: SavedSong) => {
      if (audioRef.current) {
          audioRef.current.pause();
          setAudioSource(song.audioBlob);
      }
      setFileName(song.name);
      setLyrics(song.lyrics);
      lyricsRef.current = song.lyrics; // Sync ref
      setCurrentAudioBlob(song.audioBlob);
      setCurrentSongId(song.id);
      setIsLibraryOpen(false);
      setPlayerState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
      showCoachToast(`Loaded: ${song.name}`);
  };

  const handleDeleteSong = async (id: string) => {
      try {
          await deleteSongFromLibrary(id);
          if (id === currentSongId) setCurrentSongId(null);
          await refreshLibrary();
          showCoachToast("Removed.");
      } catch (e) {
          showCoachToast("Delete failed.");
      }
  };

  const handleLineClick = (time: number, index: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      safePlay();
    }
    setPlayerState(prev => ({ ...prev, loopActive: false, isPlaying: true }));
    triggerAnalysis(index);
  };

  const handleExportAnalysis = () => {
    const exportData = lyrics.reduce((acc, line) => {
        if (line.analysis) {
            const cleanText = line.text.trim().replace(/\s+/g, ' ');
            acc[cleanText] = {
                ...line.analysis,
                translation: line.translation || ""
            };
        }
        return acc;
    }, {} as Record<string, any>);

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName || "song"}_analysis.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showCoachToast("Analysis exported!");
  };

  const showCoachToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="min-h-screen bg-[#050511] text-white font-sans overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[50vw] h-[50vw] bg-violet-600/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] md:px-6 md:py-5 flex justify-between items-center backdrop-blur-md bg-[#050511]/60 border-b border-white/5">
         <div className="flex items-center gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-cyan-400 to-fuchsia-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                <Mic2 className="text-white" size={18} />
            </div>
            <div>
                <h1 className="text-lg md:text-2xl font-bold tracking-tight text-white">SingLingo</h1>
                <p className="text-[8px] md:text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Vocal Coach</p>
            </div>
         </div>

         <div className="flex items-center gap-2 md:gap-3">
             <button onClick={() => setIsLibraryOpen(true)} className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-xs md:text-sm font-medium">
                <LibraryIcon size={16} className="md:w-[18px] md:h-[18px]" />
                <span className="hidden md:inline">Library</span>
             </button>
             <button onClick={handleSaveToLibrary} className="p-2 md:p-2.5 bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 rounded-full border border-white/10 transition-all">
                <Save size={16} className="md:w-[18px] md:h-[18px]" />
             </button>
             <button onClick={handleExportAnalysis} className="p-2 md:p-2.5 bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 rounded-full border border-white/10 transition-all" title="Export Analysis JSON">
                <Download size={16} className="md:w-[18px] md:h-[18px]" />
             </button>
             <div className="flex flex-col items-center">
                 <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".mp3,.wav,.lrc,.txt" multiple className="hidden" />
                 <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full shadow-lg hover:scale-105 transition-all">
                    <Upload size={16} className="md:w-[18px] md:h-[18px]" />
                    <span className="hidden md:inline font-semibold">Upload</span>
                 </button>
             </div>
         </div>
      </header>

      <main className="h-[100dvh] w-full flex flex-col items-center justify-center relative z-10">
         {lyrics.length > 0 ? (
             <LyricsView lines={lyrics} currentLineIndex={currentLineIndex} onLineClick={handleLineClick} onLinkExplain={showCoachToast} analyzingIndex={analyzingIndex} />
         ) : (
            <div className="flex flex-col items-center gap-4 text-slate-500">
                <div className="w-12 h-12 rounded-full border-4 border-t-cyan-500 border-white/10 animate-spin"></div>
                <p className="text-sm font-medium">Initializing Library...</p>
            </div>
         )}
      </main>

      <LibraryModal isOpen={isLibraryOpen} onClose={() => setIsLibraryOpen(false)} songs={savedSongs} onSelectSong={handleLoadSong} onDeleteSong={handleDeleteSong} />

      {toastMessage && (
          <div className="fixed top-32 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 pt-[env(safe-area-inset-top)]">
             <div className="bg-[#120c29]/90 backdrop-blur-xl p-4 rounded-2xl border border-cyan-500/30 flex gap-4 shadow-2xl">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">AI</span>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-cyan-400 uppercase mb-1">Coach Insight</h4>
                    <p className="text-sm text-slate-200">{toastMessage}</p>
                </div>
             </div>
          </div>
      )}

      <audio 
        ref={audioRef} 
        preload="auto"
        onTimeUpdate={handleTimeUpdate} 
        onLoadedMetadata={() => {
            console.log("Audio metadata loaded", audioRef.current?.duration);
            setPlayerState(prev => ({ ...prev, duration: audioRef.current?.duration || 0 }));
        }} 
        onEnded={() => setPlayerState(prev => ({ ...prev, isPlaying: false }))} 
        onError={(e) => {
            const error = e.currentTarget.error;
            console.error("Audio playback error event:", error);
            
            // Auto-recovery for demo song if blob is corrupted
            if (currentSongId === "demo-track" && error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
                 console.log("Attempting to recover demo audio...");
                 showCoachToast("Repairing demo audio...");
                 
                 // Fetch fresh from network
                 fetch(DEMO_AUDIO_URL)
                    .then(res => {
                        if(!res.ok) throw new Error("Network fetch failed");
                        return res.blob();
                    })
                    .then(newBlob => {
                        console.log("Recovered demo blob, updating...");
                        setAudioSource(newBlob);
                        setCurrentAudioBlob(newBlob);
                        
                        // Update in DB
                        const songToUpdate = savedSongs.find(s => s.id === "demo-track");
                        if (songToUpdate) {
                            const updated = { ...songToUpdate, audioBlob: newBlob };
                            saveSongToLibrary(updated).catch(err => console.error("Failed to save recovered blob", err));
                        }
                    })
                    .catch(err => {
                        console.error("Recovery failed", err);
                        showCoachToast("Audio repair failed.");
                    });
            } else {
                showCoachToast("Audio format not supported.");
            }
        }}
        className="fixed bottom-0 left-0 w-0 h-0 opacity-0 pointer-events-none" 
      />

      <ControlBar state={playerState} onTogglePlay={togglePlay} onSeek={seek} onSetRate={setPlaybackRate} onToggleLoop={toggleLoop} fileName={fileName} />
    </div>
  );
};

export default App;