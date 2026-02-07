"use client";

import { motion } from "framer-motion";

interface CyberLoaderProps {
    size?: "sm" | "md" | "lg";
    variant?: "spinner" | "dots" | "pulse" | "terminal";
    text?: string;
    className?: string;
}

export function CyberLoader({ size = "md", variant = "spinner", text, className = "" }: CyberLoaderProps) {
    const sizes = {
        sm: "w-6 h-6",
        md: "w-10 h-10",
        lg: "w-16 h-16",
    };

    const textSizes = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
    };

    if (variant === "spinner") {
        return (
            <div className={`flex flex-col items-center gap-3 ${className}`}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className={`${sizes[size]} relative`}
                >
                    <div className="absolute inset-0 border-2 border-neon/20 rounded-full" />
                    <div className="absolute inset-0 border-2 border-transparent border-t-neon rounded-full" />
                    <div className="absolute inset-2 border-2 border-transparent border-t-electric rounded-full animate-spin-reverse" />
                </motion.div>
                {text && <span className={`font-mono ${textSizes[size]} text-neon animate-pulse`}>{text}</span>}
            </div>
        );
    }

    if (variant === "dots") {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className={`${size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"} bg-neon rounded-full`}
                    />
                ))}
                {text && <span className={`ml-2 font-mono ${textSizes[size]} text-ghost`}>{text}</span>}
            </div>
        );
    }

    if (variant === "terminal") {
        return (
            <div className={`font-mono ${className}`}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-neon"
                >
                    <span className="text-electric">➜</span>
                    <span className="text-ghost">~</span>
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="w-2 h-4 bg-neon ml-1"
                    />
                </motion.div>
                {text && <p className="text-xs text-ghost/70 mt-2">{text}</p>}
            </div>
        );
    }

    // Pulse variant
    return (
        <div className={`relative ${sizes[size]} ${className}`}>
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-neon/20 rounded-full blur-xl"
            />
            <div className="absolute inset-0 bg-neon/30 rounded-full" />
            {text && (
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-neon">
                    {text}
                </span>
            )}
        </div>
    );
}