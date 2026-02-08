"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CyberButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    icon?: ReactNode;
    className?: string;
    href?: string;
}

export function CyberButton({
    children,
    variant = "primary",
    size = "md",
    onClick,
    disabled = false,
    loading = false,
    icon,
    className = "",
    href,
}: CyberButtonProps) {
    const baseStyles = "relative font-mono font-medium transition-all duration-300 overflow-hidden group";

    const variants = {
        primary: "bg-neon/10 border border-neon/50 text-neon hover:bg-neon/20 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]",
        secondary: "bg-electric/10 border border-electric/50 text-electric hover:bg-electric/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
        ghost: "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40",
        danger: "bg-red-500/10 border border-red-500/50 text-red-400 hover:bg-red-500/20 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs rounded-lg",
        md: "px-6 py-3 text-sm rounded-xl",
        lg: "px-8 py-4 text-base rounded-2xl",
    };

    const content = (
        <>
            {/* Background animation */}
            <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
            />

            <span className="relative flex items-center gap-2">
                {loading && (
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    />
                )}
                {icon && !loading && <span className="w-4 h-4">{icon}</span>}
                {children}
            </span>

            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
        </>
    );

    if (href) {
        return (
            <motion.a
                href={href}
                whileHover={{ scale: disabled ? 1 : 1.02 }}
                whileTap={{ scale: disabled ? 1 : 0.98 }}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled || loading}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
        >
            {content}
        </motion.button>
    );
}
