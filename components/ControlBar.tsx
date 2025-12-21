import React from 'react';
import { PlayerState } from '../types';
import { Play, Pause, Repeat, FastForward, Rewind } from 'lucide-react';

interface ControlBarProps {
  state: PlayerState;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onSetRate: (rate: number) => void;
  onToggleLoop: () => void;
  fileName?: string;
}

export const ControlBar: React.FC<ControlBarProps> = ({ 
  state, 
  onTogglePlay, 
  onSeek, 
  onSetRate,
  onToggleLoop,
  fileName
}) => {
  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const progress = state.duration ? (state.currentTime / state.duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100]">
      {/* Glass Container - Mobile: px-4 pt-3 pb-6 (Increased padding for breathing room & lift) */}
      <div className="bg-[#120c29]/95 backdrop-blur-xl border-t border-white/10 px-4 pt-3 pb-6 md:px-6 md:pt-5 md:pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] transition-all duration-300">
        {/* Mobile Gap: 1.5 (More comfortable spacing) */}
        <div className="max-w-4xl mx-auto flex flex-col gap-1.5 md:gap-4">
          
          {/* Row 1: Time & Title Info */}
          <div className="flex items-center justify-between text-[10px] md:text-xs font-medium text-slate-400 px-1">
            <span className="w-8 text-left font-mono text-slate-500 opacity-80">{formatTime(state.currentTime)}</span>
            
            {/* Song Title - Centered & Truncated */}
            <div className="flex-1 text-center px-2 truncate">
                <span className="text-slate-300 font-semibold tracking-wide text-[11px] md:text-sm">{fileName || "SingLingo"}</span>
            </div>
            
            <span className="w-8 text-right font-mono text-slate-500 opacity-80">{formatTime(state.duration)}</span>
          </div>

          {/* Row 2: Progress Bar - Mobile: my-1 for slight vertical separation */}
          <div 
            className="group relative w-full h-3 md:h-4 flex items-center cursor-pointer touch-none my-1"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percentage = x / rect.width;
              onSeek(percentage * state.duration);
            }}
          >
             {/* Track Background */}
             <div className="w-full h-1 md:h-1.5 bg-white/10 rounded-full overflow-hidden">
                {/* Loop Region Indicator */}
                {state.loopActive && state.loopStart !== null && state.loopEnd !== null && state.duration > 0 && (
                    <div 
                        className="absolute top-1/2 -translate-y-1/2 h-1 md:h-1.5 bg-cyan-500/30 z-0"
                        style={{
                            left: `${(state.loopStart / state.duration) * 100}%`,
                            width: `${((state.loopEnd - state.loopStart) / state.duration) * 100}%`
                        }}
                    />
                )}
                {/* Progress Fill */}
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 rounded-full relative z-10 transition-all duration-300 ease-linear" 
                  style={{ width: `${progress}%` }} 
                />
             </div>
             
             {/* Thumb - Mobile: w-2.5 h-2.5 (Slightly larger for visibility) */}
             <div 
               className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 md:w-4 md:h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20 pointer-events-none transition-all duration-300 ease-linear group-active:scale-125"
               style={{ left: `${progress}%` }}
             />
          </div>

          {/* Row 3: Controls */}
          <div className="flex items-center justify-between relative">
            
            {/* Left: Loop - Use basis-0 for perfect centering of middle element */}
            <div className="flex-1 basis-0 min-w-0 flex justify-start">
                <button 
                    onClick={onToggleLoop}
                    className={`p-2 rounded-full transition-all ${state.loopActive ? 'text-cyan-400 bg-cyan-400/10' : 'text-slate-500 hover:text-white'}`}
                    title="Loop Section"
                >
                    <Repeat size={16} className="md:w-5 md:h-5" strokeWidth={state.loopActive ? 2.5 : 2} />
                </button>
            </div>

            {/* Center: Playback Controls */}
            <div className="flex-initial flex items-center justify-center gap-4 md:gap-8">
               <button 
                 className="text-slate-400 hover:text-white active:scale-95 transition-transform p-1.5 md:p-1.5"
                 onClick={() => onSeek(Math.max(0, state.currentTime - 5))}
               >
                  <Rewind size={20} className="md:w-7 md:h-7" />
               </button>

               {/* Play Button */}
               <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePlay();
                }}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-white/20 touch-manipulation cursor-pointer"
                style={{ WebkitTapHighlightColor: 'transparent' }}
               >
                 {state.isPlaying ? 
                    <Pause size={18} className="md:w-7 md:h-7" fill="currentColor" /> : 
                    <Play size={18} className="md:w-7 md:h-7 ml-0.5 md:ml-1" fill="currentColor" />
                 }
               </button>

               <button 
                 className="text-slate-400 hover:text-white active:scale-95 transition-transform p-1.5 md:p-1.5"
                 onClick={() => onSeek(Math.min(state.duration, state.currentTime + 5))}
               >
                  <FastForward size={20} className="md:w-7 md:h-7" />
               </button>
            </div>

            {/* Right: Rate Selector - Use basis-0 for perfect centering of middle element */}
            <div className="flex-1 basis-0 min-w-0 flex justify-end">
                <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/5 scale-75 md:scale-90 origin-right">
                    {[0.5, 0.75, 1.0].map(rate => (
                        <button
                        key={rate}
                        onClick={() => onSetRate(rate)}
                        className={`px-1.5 py-1 md:px-2 md:py-1 rounded-[4px] text-[9px] md:text-[10px] font-bold transition-all min-w-[28px] md:min-w-[32px] ${state.playbackRate === rate ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(192,38,211,0.4)] border border-white/20' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                        {rate}
                        </button>
                    ))}
                </div>
            </div>

          </div>

          {/* Row 4: Copyright Footer - pt-1 for separation */}
          <div className="w-full text-center pt-1 md:pt-3">
             <p className="text-[9px] md:text-xs text-slate-600 md:text-slate-500 font-mono tracking-tight opacity-50 md:opacity-70 select-none scale-95 md:scale-100 origin-center">
                © 2025 Krystal. All rights reserved · Powered by AI
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};