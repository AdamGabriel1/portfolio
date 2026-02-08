"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootSequence = [
    { text: "Initializing Adam Gabriel OS...", type: "info", delay: 0 },
    { text: "Loading React, Next.js, TypeScript modules...", type: "info", delay: 100 },
    { text: "Mounting Node.js and Python environments...", type: "info", delay: 200 },
    { text: "Connecting to PostgreSQL...", type: "info", delay: 300 },
    { text: "Loading DevOps toolchains...", type: "system", delay: 400 },
    { text: "Initializing Docker containers...", type: "info", delay: 500 },
    { text: "Compiling portfolio assets...", type: "info", delay: 600 },
    { text: "Security scan: DevSecOps protocols active", type: "warning", delay: 700 },
    { text: "System ready. Welcome, visitor.", type: "success", delay: 800 },
];

export default function Preloader({ onCompleteAction }: { onCompleteAction: () => void }) {
    const [progress, setProgress] = useState(0);
    const [visibleLines, setVisibleLines] = useState<typeof bootSequence>([]);
    const [exit, setExit] = useState(false);
    const [glitchActive, setGlitchActive] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Staggered line appearance with realistic typing effect
        bootSequence.forEach((line, index) => {
            setTimeout(() => {
                setVisibleLines(prev => [...prev, line]);
                setProgress(((index + 1) / bootSequence.length) * 100);

                // Random glitch effect on certain lines
                if (line.type === "warning" || line.type === "system") {
                    setGlitchActive(true);
                    setTimeout(() => setGlitchActive(false), 150);
                }
            }, 300 + index * 250);
        });

        // Completion sequence
        const completeTimer = setTimeout(() => {
            setExit(true);
            setTimeout(onCompleteAction, 1000);
        }, 3500);

        return () => clearTimeout(completeTimer);
    }, [onCompleteAction]);

    const getLineColor = (type: string) => {
        switch (type) {
            case "info": return "text-neon";
            case "system": return "text-electric";
            case "warning": return "text-plasma";
            case "success": return "text-green-400";
            default: return "text-white";
        }
    };

    const getPrefix = (type: string) => {
        switch (type) {
            case "info": return "[INFO]";
            case "system": return "[SYS]";
            case "warning": return "[SEC]";
            case "success": return "[OK]";
            default: return "[...]";
        }
    };

    return (
        <AnimatePresence>
            {!exit && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="fixed inset-0 z-100 bg-void flex items-center justify-center p-6 md:p-12 overflow-hidden"
                    ref={containerRef}
                >
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    <div className="absolute inset-0 bg-radial-glow" />

                    {/* CRT Scanline Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-length:100%_4px,3px_100% opacity-20 pointer-events-none" />

                    {/* Glitch Overlay */}
                    <AnimatePresence>
                        {glitchActive && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.8, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="absolute inset-0 bg-electric/20 mix-blend-overlay pointer-events-none"
                            />
                        )}
                    </AnimatePresence>

                    {/* Main Content */}
                    <div className="relative z-10 max-w-3xl w-full">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between mb-8 border-b border-white/10 pb-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-neon animate-pulse" />
                                <span className="font-mono text-sm text-neon tracking-widest">ADAM_GABRIEL_OS</span>
                            </div>
                            <div className="font-mono text-xs text-ghost">v1.0.0 // BUILD 2025.02.03</div>
                        </motion.div>

                        {/* Terminal Window */}
                        <div className="glass rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-electric/10">
                            {/* Terminal Header */}
                            <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-plasma" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="ml-4 font-mono text-xs text-ghost">boot_sequence.sh</span>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-6 md:p-8 font-mono text-sm min-h-[300px]">
                                <div className="space-y-2 mb-8">
                                    {visibleLines.map((line, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex items-start gap-3"
                                        >
                                            <span className={`text-xs ${getLineColor(line.type)} opacity-60 w-16`}>
                                                {getPrefix(line.type)}
                                            </span>
                                            <span className={getLineColor(line.type)}>
                                                {line.text}
                                                {i === visibleLines.length - 1 && (
                                                    <span className="animate-blink ml-1">▋</span>
                                                )}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Progress Section */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-mono text-ghost">
                                        <span>SYSTEM INITIALIZATION</span>
                                        <span className="text-neon">{Math.round(progress)}%</span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden relative">
                                        <motion.div
                                            className="absolute inset-y-0 left-0 bg-linear-to-r from-electric via-neon to-electric rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        />
                                        {/* Shimmer Effect */}
                                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                                    </div>

                                    {/* Status Indicators */}
                                    <div className="flex justify-between text-[10px] font-mono text-white/30 pt-2">
                                        <span>STACK: FULL</span>
                                        <span>EXP: 3+ YEARS</span>
                                        <span>STATUS: READY</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-6 flex justify-between items-center text-xs font-mono text-ghost/50"
                        >
                            <div className="flex items-center gap-4">
                                <span>SECURE CONNECTION</span>
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            </div>
                            <div>EST. TIME: 3.5s</div>
                        </motion.div>
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-6 left-6 font-mono text-xs text-ghost/30">
                        <div>LOC: BRASIL</div>
                        <div>STACK: REACT/NODE/PYTHON</div>
                    </div>

                    <div className="absolute top-6 right-6 font-mono text-xs text-ghost/30 text-right">
                        <div>ADAM_GABRIEL</div>
                        <div>DEV: FULLSTACK</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}