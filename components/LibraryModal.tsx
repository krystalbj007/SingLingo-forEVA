import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SavedSong } from '../types';
import { Trash2, Play, X, Music, Calendar } from 'lucide-react';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  songs: SavedSong[];
  onSelectSong: (song: SavedSong) => void;
  onDeleteSong: (id: string) => void;
}

export const LibraryModal: React.FC<LibraryModalProps> = ({
  isOpen,
  onClose,
  songs,
  onSelectSong,
  onDeleteSong
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#0f0b1e] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-gradient-to-r from-violet-900/20 to-transparent">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <Music size={16} className="text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">Your Library</h2>
            </div>
            <button 
                type="button"
                onClick={onClose} 
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
                <X size={20} />
            </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 p-4 space-y-3 no-scrollbar">
            {songs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                    <Music size={48} className="mb-4 opacity-20" />
                    <p>No saved tracks yet.</p>
                    <p className="text-xs mt-2 opacity-60">Upload and save tracks to see them here.</p>
                </div>
            ) : (
                <AnimatePresence initial={false}>
                    {songs.map((song) => {
                        const analyzedCount = song.lyrics.filter(l => l.analysis).length;
                        const isDeleting = deleteConfirmId === song.id;

                        return (
                        <motion.div
                            key={song.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            transition={{ duration: 0.2 }}
                            className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-all relative"
                        >
                            <div className="flex-1 min-w-0 mr-4">
                                <h3 className="text-white font-medium truncate mb-1 text-lg">{song.name}</h3>
                                <div className="flex items-center gap-3 text-xs text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(song.createdAt).toLocaleDateString()}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                    <span className={`${analyzedCount > 0 ? 'text-cyan-400/90' : ''}`}>
                                        {analyzedCount} / {song.lyrics.length} analyzed
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 relative z-50">
                                {isDeleting ? (
                                    <>
                                        <button 
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setDeleteConfirmId(null);
                                            }}
                                            className="px-3 py-1.5 rounded-full text-slate-400 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                onDeleteSong(song.id);
                                                setDeleteConfirmId(null);
                                            }}
                                            className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-sm shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all cursor-pointer"
                                        >
                                            Confirm
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button 
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                onSelectSong(song);
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30 hover:scale-105 transition-all border border-cyan-500/30 font-semibold text-sm cursor-pointer"
                                        >
                                            <Play size={14} fill="currentColor" className="pointer-events-none" />
                                            <span className="pointer-events-none">Load</span>
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setDeleteConfirmId(song.id);
                                            }}
                                            className="p-2 rounded-full text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} className="pointer-events-none" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )})}
                </AnimatePresence>
            )}
        </div>
        
        {/* Footer info */}
        <div className="px-6 py-3 bg-[#080612] border-t border-white/5 text-[10px] text-slate-500 text-center">
            Songs are stored locally in your browser and work offline.
        </div>

      </motion.div>
    </div>
  );
};