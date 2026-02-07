"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypeWriterProps {
    texts: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    className?: string;
    cursor?: boolean;
}

export function TypeWriter({
    texts,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
    className = "",
    cursor = true,
}: TypeWriterProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) {
            const timeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, pauseDuration);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(
            () => {
                const fullText = texts[currentTextIndex];

                if (!isDeleting) {
                    setCurrentText(fullText.slice(0, currentText.length + 1));
                    if (currentText === fullText) {
                        setIsPaused(true);
                    }
                } else {
                    setCurrentText(fullText.slice(0, currentText.length - 1));
                    if (currentText === "") {
                        setIsDeleting(false);
                        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                    }
                }
            },
            isDeleting ? deletingSpeed : typingSpeed
        );

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, isPaused, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className={`font-mono ${className}`}>
            {currentText}
            {cursor && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-5 bg-neon ml-1 align-middle"
                />
            )}
        </span>
    );
}