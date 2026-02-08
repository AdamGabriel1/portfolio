"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    title?: string; // Propriedade adicionada para resolver o erro de tipagem
    className?: string;
    hover?: boolean;
    glow?: "none" | "neon" | "electric" | "purple";
    onClick?: () => void;
}

export function GlassCard({
    children,
    title, // Desestruturação do título
    className = "",
    hover = true,
    glow = "none",
    onClick,
}: GlassCardProps) {
    const glowStyles = {
        none: "",
        neon: "hover:shadow-[0_0_40px_rgba(0,240,255,0.2)]",
        electric: "hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]",
        purple: "hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]",
    };

    return (
        <motion.div
            onClick={onClick}
            whileHover={hover ? { y: -5, scale: 1.01 } : {}}
            transition={{ duration: 0.3 }}
            className={`
        relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6
        ${hover ? "hover:border-white/20 cursor-pointer" : ""}
        ${glowStyles[glow]}
        ${className}
      `}
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {/* Renderização condicional do título */}
                {title && (
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6 border-l-2 border-white/20 pl-3">
                        {title}
                    </h3>
                )}
                {children}
            </div>

            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-white/5 to-transparent rounded-tr-2xl pointer-events-none" />
        </motion.div>
    );
}