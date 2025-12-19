import React from 'react';
import { motion } from 'framer-motion';
import { LinkData, StressData, ElisionData } from '../types';

interface PhoneticWordProps {
  word: string;
  wordIndex: number;
  stressData: StressData[];
  elisionData: ElisionData[];
}

export const PhoneticWord: React.FC<PhoneticWordProps> = ({ word, wordIndex, stressData, elisionData }) => {
  return (
    <span className="inline-flex items-end relative whitespace-nowrap mx-0.5 md:mx-1 text-xl md:text-5xl font-medium tracking-tight">
      {word.split('').map((char, charIdx) => {
        const isStressed = stressData.some(s => s.wordIndex === wordIndex && s.charIndex === charIdx);
        const isElided = elisionData.some(e => e.wordIndex === wordIndex && e.charIndex === charIdx);

        let className = "transition-all duration-300 relative ";
        
        if (isStressed) {
          className += "text-white font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] z-10 ";
        } else if (isElided) {
          className += "text-slate-600 opacity-40 line-through decoration-fuchsia-500/70 decoration-2 ";
        } else {
          className += "text-slate-400 group-hover/word:text-slate-200 ";
        }

        return (
          <span key={charIdx} className="relative inline-flex flex-col items-center justify-end">
             {/* Stress Dot Indicator - Neon Cyan */}
             {isStressed && (
                <span className="absolute -top-3 md:-top-4 w-1 md:w-1.5 h-1 md:h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-pulse"></span>
             )}
            <span className={className}>{char}</span>
          </span>
        );
      })}
    </span>
  );
};

interface LinkArcProps {
  type: LinkData['type'];
  onClick: () => void;
}

export const LinkArc: React.FC<LinkArcProps> = ({ type, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      className="absolute bottom-[-6px] md:bottom-[-10px] left-[-8px] md:left-[-14px] w-[16px] md:w-[28px] h-[8px] md:h-[14px] cursor-pointer z-20 pointer-events-auto group"
      onClick={(e) => {
        e.stopPropagation(); // Prevent line click loop
        onClick();
      }}
    >
        {/* Hover area helper */}
        <div className="absolute inset-0 -top-2 -bottom-2 bg-transparent group-hover:bg-cyan-500/10 rounded-full transition-colors" />
        
        <svg width="100%" height="100%" viewBox="0 0 24 12" className="overflow-visible">
            <path 
                d="M 2,0 Q 12,14 22,0" 
                fill="none" 
                stroke="url(#gradient-arc)" 
                strokeWidth="3" 
                strokeLinecap="round"
                className="drop-shadow-[0_0_6px_rgba(217,70,239,0.8)]"
            />
            <defs>
                <linearGradient id="gradient-arc" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
            </defs>
        </svg>
    </motion.div>
  );
};