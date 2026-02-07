"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface CyberModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    showCloseButton?: boolean;
    preventClose?: boolean;
}

export function CyberModal({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
    showCloseButton = true,
    preventClose = false,
}: CyberModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !preventClose) onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose, preventClose]);

    const sizes = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[95vw] h-[90vh]",
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => !preventClose && onClose()}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`
                pointer-events-auto w-full ${sizes[size]}
                bg-void/95 backdrop-blur-2xl border border-white/10 rounded-2xl
                shadow-[0_0_50px_rgba(0,240,255,0.1)]
                overflow-hidden
              `}
                        >
                            {/* Header */}
                            {title && (
                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                                    <h3 className="text-lg font-mono font-medium text-white flex items-center gap-2">
                                        <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
                                        {title}
                                    </h3>
                                    {showCloseButton && !preventClose && (
                                        <button
                                            onClick={onClose}
                                            className="p-2 rounded-lg hover:bg-white/10 text-ghost hover:text-white transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                                {children}
                            </div>

                            {/* Decorative corners */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon/50" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon/50" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon/50" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon/50" />
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}