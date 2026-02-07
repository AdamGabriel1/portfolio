"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type BadgeVariant = "default" | "neon" | "electric" | "success" | "warning" | "danger" | "ghost";
type BadgeSize = "sm" | "md" | "lg";

interface CyberBadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    pulse?: boolean;
    icon?: ReactNode;
    className?: string;
    onClick?: () => void;
}

export function CyberBadge({
    children,
    variant = "default",
    size = "md",
    pulse = false,
    icon,
    className = "",
    onClick,
}: CyberBadgeProps) {
    const variants: Record<BadgeVariant, string> = {
        default: "bg-white/10 text-white border-white/20",
        neon: "bg-neon/10 text-neon border-neon/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]",
        electric: "bg-electric/10 text-electric border-electric/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]",
        success: "bg-green-500/10 text-green-400 border-green-500/30",
        warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
        danger: "bg-red-500/10 text-red-400 border-red-500/30",
        ghost: "bg-transparent text-ghost border-white/10",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
    };

    return (
        <motion.span
            onClick={onClick}
            whileHover={onClick ? { scale: 1.05 } : {}}
            className={`
        inline-flex items-center gap-1.5 font-mono rounded-full border
        ${variants[variant]}
        ${sizes[size]}
        ${pulse ? "animate-pulse" : ""}
        ${onClick ? "cursor-pointer hover:brightness-110" : ""}
        ${className}
      `}
        >
            {icon && <span className="w-3 h-3">{icon}</span>}
            {children}
        </motion.span>
    );
}