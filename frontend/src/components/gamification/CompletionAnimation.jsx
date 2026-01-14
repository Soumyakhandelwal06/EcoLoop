import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, ArrowRight, Zap, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';

const CompletionAnimation = ({ show, challenge, onClose }) => {
    useEffect(() => {
        if (show) {
            const duration = 4 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 999 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 100 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 300);

            return () => clearInterval(interval);
        }
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.5, opacity: 0, rotate: 5 }}
                        className="relative bg-[#1a1a1a] rounded-[3rem] p-12 max-w-md w-full shadow-[0_0_100px_rgba(16,185,129,0.3)] text-center overflow-hidden border border-white/10"
                    >
                        {/* Glow Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none"></div>

                        <div className="relative z-10">
                            {/* Solved Stamp / Icon */}
                            <motion.div 
                                initial={{ scale: 2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.3 }}
                                className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.5)] relative"
                            >
                                <Trophy className="w-16 h-16 text-white" />
                                <motion.div 
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.8, type: 'spring' }}
                                    className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg"
                                >
                                    Solved
                                </motion.div>
                            </motion.div>

                            <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Challenge Complete!</h2>
                            <p className="text-emerald-400 font-bold mb-10 text-lg">Your impact is growing! 🌱</p>

                            <div className="bg-white/5 rounded-[2rem] p-8 mb-10 border border-white/5">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="text-center">
                                        <div className="flex items-center gap-2 justify-center mb-1">
                                            <Coins className="w-6 h-6 text-yellow-400" />
                                            <span className="text-3xl font-black text-white">+{challenge?.coin_reward}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">EcoCoins</span>
                                    </div>
                                    <div className="text-center border-l border-white/5">
                                        <div className="flex items-center gap-2 justify-center mb-1">
                                            <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
                                            <span className="text-3xl font-black text-white">{challenge?.type === 'daily' ? '+1' : '0'}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Daily Streak</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={onClose}
                                className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-emerald-900/40 active:scale-95"
                            >
                                <span>Continue Journey</span>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CompletionAnimation;
