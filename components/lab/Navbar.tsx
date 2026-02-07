"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#hero", num: "00" },
        { name: "Projetos", href: "#lab", num: "01" },
        { name: "Stack", href: "#core", num: "02" },
        { name: "Contato", href: "#terminal", num: "03" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 3.5, ease: [0.19, 1, 0.22, 1] }}
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled
                    ? "w-[95%] max-w-6xl glass shadow-[0_0_40px_rgba(139,92,246,0.15)] rounded-full py-3 px-6 border border-white/10"
                    : "w-full max-w-7xl py-4 px-6 bg-transparent"
                    }`}
            >
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 group"
                        onClick={() => setMobileOpen(false)}
                    >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-electric/20 border border-electric/50 group-hover:scale-110 group-hover:bg-electric/30 transition-all duration-300">
                            <Terminal className="w-5 h-5 text-neon" />
                        </div>
                        <span className={`font-bold text-lg tracking-tighter transition-colors duration-300 ${scrolled ? "text-white" : "text-white"
                            }`}>
                            &lt;ADAM /&gt;
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-mono transition-all duration-300 hover:text-neon relative group ${scrolled ? "text-ghost" : "text-ghost"
                                    }`}
                            >
                                <span className="text-neon/50 mr-1">[{link.num}]</span>
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/AdamGabriel1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-full transition-all duration-300 hover:bg-white/10 hover:text-neon ${scrolled ? "text-ghost" : "text-ghost"
                                }`}
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/adam-gabriel-b9479b2a6/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-full transition-all duration-300 hover:bg-white/10 hover:text-neon ${scrolled ? "text-ghost" : "text-ghost"
                                }`}
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            className={`md:hidden p-2 rounded-full transition-all duration-300 hover:bg-white/10 ${scrolled ? "text-white" : "text-white"
                                }`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl md:hidden"
                        onClick={() => setMobileOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="flex flex-col items-center justify-center h-full gap-8 font-mono text-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-white hover:text-neon transition-colors flex items-center gap-3"
                                    >
                                        <span className="text-neon/50 text-sm">[{link.num}]</span>
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex gap-6 mt-8"
                            >
                                <a href="https://github.com/AdamGabriel1" target="_blank" rel="noopener noreferrer" className="text-ghost hover:text-neon transition-colors">
                                    <Github className="w-6 h-6" />
                                </a>
                                <a href="https://linkedin.com/in/adam-gabriel-b9479b2a6/" target="_blank" rel="noopener noreferrer" className="text-ghost hover:text-neon transition-colors">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}