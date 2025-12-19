import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ControlBar } from './components/ControlBar';
import { LyricsView } from './components/LyricsView';
import { LibraryModal } from './components/LibraryModal';
import { parseLRC } from './services/lrcParser';
import { analyzeLyricsWithGemini } from './services/geminiService';
import { saveSongToLibrary, getAllSongs, deleteSongFromLibrary } from './services/storageService';
import { LyricLine, PlayerState, SavedSong } from './types';
import { DEMO_LRC, DEMO_AUDIO_URL } from './constants';
import { Upload, Mic2, Save, Library as LibraryIcon } from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [fileName, setFileName] = useState<string>("Demo: Fly Me to the Moon");
  
  // Storage State
  const [currentAudioBlob, setCurrentAudioBlob] = useState<Blob | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [savedSongs, setSavedSongs] = useState<SavedSong[]>([]);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  
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

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper: Create a tiny silent WAV blob as fallback
  const createSilentBlob = () => {
    const wavHeader = new Uint8Array([
      0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45, 0x66, 0x6d, 0x74, 0x20,
      0x10, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x44, 0xac, 0x00, 0x00, 0x88, 0x58, 0x01, 0x00,
      0x02, 0x00, 0x10, 0x00, 0x64, 0x61, 0x74, 0x61, 0x00, 0x00, 0x00, 0x00
    ]);
    return new Blob([wavHeader], { type: 'audio/wav' });
  };

  // --- Initialization ---
  useEffect(() => {
    const initApp = async () => {
        // 1. Load initial UI state
        const demoParsed = parseLRC(DEMO_LRC);
        setLyrics(demoParsed);

        // 2. Try seeding Library
        const existingSongs = await getAllSongs();
        let activeAudioBlob: Blob | null = null;
        let activeName = fileName;

        if (existingSongs.length === 0) {
            try {
                // Try fetching remote demo audio
                const response = await fetch(DEMO_AUDIO_URL);
                if (!response.ok) throw new Error("CORS or Network issue");
                activeAudioBlob = await response.blob();
            } catch (e) {
                console.warn("Could not fetch remote demo, using silent placeholder.");
                activeAudioBlob = createSilentBlob();
                activeName = "[Placeholder] Fly Me to the Moon";
                setFileName(activeName);
            }

            const demoId = "demo-track";
            const demoSong: SavedSong = {
                id: demoId,
                name: activeName,
                audioBlob: activeAudioBlob,
                lyrics: demoParsed,
                createdAt: Date.now()
            };
            
            await saveSongToLibrary(demoSong);
            const songs = await getAllSongs();
            setSavedSongs(songs);
            setCurrentSongId(demoId);
            setCurrentAudioBlob(activeAudioBlob);
        } else {
            setSavedSongs(existingSongs);
            const lastSong = existingSongs[0];
            activeAudioBlob = lastSong.audioBlob;
            activeName = lastSong.name;
            setFileName(activeName);
            setLyrics(lastSong.lyrics);
            setCurrentSongId(lastSong.id);
            setCurrentAudioBlob(activeAudioBlob);
        }

        // Load into player
        if (audioRef.current && activeAudioBlob) {
            audioRef.current.src = URL.createObjectURL(activeAudioBlob);
            audioRef.current.load();
        }

        showCoachToast("Vocal Coach active. Use 'Upload' to replace the demo with your own music!");
    };

    initApp();
  }, []);

  const refreshLibrary = async () => {
      try {
          const songs = await getAllSongs();
          setSavedSongs(songs);
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
      const line = lyrics[activeIndex];
      if (line && !line.analysis && !analyzingIndex && playerState.isPlaying) {
         triggerAnalysis(activeIndex);
      }
    }

    setPlayerState(prev => ({ 
      ...prev, 
      currentTime: time,
      isPlaying: !audioRef.current!.paused 
    }));
  };

  const triggerAnalysis = async (index: number) => {
    if (index < 0 || index >= lyrics.length) return;
    const line = lyrics[index];
    if (line.analysis) return;

    setAnalyzingIndex(index);
    try {
      const result = await analyzeLyricsWithGemini(line.text);
      const { translation, ...analysisData } = result;

      setLyrics(prev => {
        const copy = [...prev];
        copy[index] = { ...copy[index], analysis: analysisData, translation: translation };
        return copy;
      });
      
      if (index + 1 < lyrics.length && !lyrics[index+1].analysis) {
        const nextResult = await analyzeLyricsWithGemini(lyrics[index+1].text);
        setLyrics(prev => {
            const copy = [...prev];
            copy[index+1] = { ...copy[index+1], analysis: nextResult, translation: nextResult.translation };
            return copy;
        });
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
      const url = URL.createObjectURL(audioFile);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.load();
      }
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
        if (parsed.length > 0) setLyrics(parsed);
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
          const url = URL.createObjectURL(song.audioBlob);
          audioRef.current.src = url;
          audioRef.current.load();
      }
      setFileName(song.name);
      setLyrics(song.lyrics);
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

      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 flex justify-between items-center backdrop-blur-md">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                <Mic2 className="text-white" size={24} />
            </div>
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">SingLingo</h1>
                <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Vocal Coach</p>
            </div>
         </div>

         <div className="flex items-center gap-3">
             <button onClick={() => setIsLibraryOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-sm font-medium">
                <LibraryIcon size={18} />
                <span>Library</span>
             </button>
             <button onClick={handleSaveToLibrary} className="p-2.5 bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 rounded-full border border-white/10 transition-all">
                <Save size={18} />
             </button>
             <div className="flex flex-col items-center">
                 <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".mp3,.wav,.lrc,.txt" multiple className="hidden" />
                 <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full shadow-lg hover:scale-105 transition-all">
                    <Upload size={18} />
                    <span className="font-semibold">Upload</span>
                 </button>
             </div>
         </div>
      </header>

      <main className="h-screen w-full flex flex-col items-center justify-center relative z-10">
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
          <div className="fixed bottom-36 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
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

      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={() => setPlayerState(prev => ({ ...prev, duration: audioRef.current?.duration || 0 }))} onEnded={() => setPlayerState(prev => ({ ...prev, isPlaying: false }))} className="hidden" />

      <ControlBar state={playerState} onTogglePlay={togglePlay} onSeek={seek} onSetRate={setPlaybackRate} onToggleLoop={toggleLoop} fileName={fileName} />
    </div>
  );
};

export default App;