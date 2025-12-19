import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LyricLine, LinguisticAnalysis } from '../types';
import { PhoneticWord, LinkArc } from './PhoneticComponents';

interface LyricsViewProps {
  lines: LyricLine[];
  currentLineIndex: number;
  onLineClick: (time: number, index: number) => void;
  onLinkExplain: (explanation: string) => void;
  analyzingIndex: number | null;
}

export const LyricsView: React.FC<LyricsViewProps> = ({ 
  lines, 
  currentLineIndex, 
  onLineClick,
  onLinkExplain,
  analyzingIndex
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (containerRef.current) {
        // Find the active element
        const activeEl = containerRef.current.querySelector(`[data-active="true"]`);
        if (activeEl) {
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
  }, [currentLineIndex]);

  return (
    <div className="flex-1 w-full overflow-y-auto no-scrollbar py-[40vh] relative z-0 perspective-1000" ref={containerRef}>
      <div className="flex flex-col items-center gap-6 md:gap-10 px-2 md:px-4">
        {lines.map((line, index) => {
          const isActive = index === currentLineIndex;
          const isAnalyzing = analyzingIndex === index;
          
          return (
            <motion.div
              key={index}
              data-active={isActive}
              initial={{ opacity: 0.3, scale: 0.9, y: 20 }}
              animate={{ 
                opacity: isActive ? 1 : 0.3, 
                scale: isActive ? 1.05 : 0.95,
                y: 0,
                filter: isActive ? 'blur(0px)' : 'blur(1px)'
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`text-center cursor-pointer transition-all duration-500 rounded-2xl w-full max-w-3xl relative overflow-hidden group 
                ${isActive 
                    ? 'bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(124,58,237,0.15)]' 
                    : 'hover:bg-white/[0.02] border border-transparent'
                }
                ${isAnalyzing ? 'pt-10 pb-4 px-4 md:pt-12 md:pb-8 md:px-8' : 'p-4 md:p-8'}
              `}
              onClick={() => onLineClick(line.time, index)}
            >
               {/* Active State Glow Border (Gradient) */}
               {isActive && <div className="absolute inset-0 rounded-2xl border border-white/10 shadow-[inset_0_0_20px_rgba(192,38,211,0.1)] pointer-events-none" />}
               
               {/* Analysis Loading State */}
               {isAnalyzing && (
                 <div className="absolute top-2 right-2 md:top-3 md:right-3 flex items-center gap-2 px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-cyan-900/40 border border-cyan-500/30 z-20">
                    <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                    <span className="text-[9px] md:text-[10px] text-cyan-300 font-mono tracking-widest">ANALYZING</span>
                 </div>
               )}

              <div className="flex flex-wrap justify-center items-end relative gap-x-0.5 md:gap-x-1 gap-y-2 md:gap-y-3">
                 {/* Render Words & Arcs */}
                 {renderPhoneticLine(line, isActive, (exp) => onLinkExplain(exp))}
              </div>

              {/* Translation */}
              <AnimatePresence>
                {isActive && (
                    <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="overflow-hidden"
                    >
                    <div className="inline-block relative px-2">
                        {/* Decorative lines for translation */}
                        <div className="hidden md:block absolute -left-4 top-1/2 w-3 h-[1px] bg-white/20"></div>
                        <div className="hidden md:block absolute -right-4 top-1/2 w-3 h-[1px] bg-white/20"></div>
                        <p className="text-slate-400 text-sm md:text-lg font-light tracking-wider leading-relaxed">
                            {line.translation || <span className="text-slate-600 italic text-xs md:text-sm">Waiting for analysis...</span>}
                        </p>
                    </div>
                    </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        
        {/* Added bottom spacer for better scrolling experience */}
        <div className="h-32 w-full"></div>

      </div>
    </div>
  );
};

// Helper to render words with inter-word SVG arcs
const renderPhoneticLine = (line: LyricLine, isActive: boolean, onExplain: (msg: string) => void) => {
  const words = line.text.split(' ');
  const analysis = line.analysis || { links: [], stress: [], elisions: [] };

  return words.map((word, i) => {
    // Check if there is a link from this word to the next
    const link = analysis.links.find(l => l.fromWordIndex === i && l.toWordIndex === i + 1);
    const hasLink = !!link;

    return (
      <React.Fragment key={i}>
        <div className="relative group/word pb-1">
          <PhoneticWord 
            word={word} 
            wordIndex={i} 
            stressData={analysis.stress} 
            elisionData={analysis.elisions}
          />
          {/* Connector Arc */}
          {hasLink && isActive && (
             <div className="absolute right-[-4px] md:right-[-10px] bottom-[2px] w-0 h-0 flex items-center justify-center z-20">
                 <LinkArc 
                    type={link.type} 
                    onClick={() => {
                        const reason = link.type === 'consonant-vowel' 
                            ? `Linking: Consonant end of "${word}" flows into Vowel start of "${words[i+1]}"`
                            : `Linking: Smooth connection between "${word}" and "${words[i+1]}"`;
                        onExplain(reason + ` (${link.type})`);
                    }} 
                 />
             </div>
          )}
        </div>
      </React.Fragment>
    );
  });
};