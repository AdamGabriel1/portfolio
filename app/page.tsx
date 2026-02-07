"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, ArrowUpRight, Rocket } from "lucide-react";
import Preloader from "./sections/Preloader";
import Hero from "./sections/Hero";
import Lab from "./sections/Lab";
import Core from "./sections/Core";
import Terminal from "./sections/Terminal";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader
            onCompleteAction={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className={loading ? "overflow-hidden h-screen" : "relative"}
      >
        {/* Background Ambient Effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon/5 rounded-full blur-[120px]" />
        </div>

        {/* Floating Lab Button - Visible after scrolling */}
        <FloatingLabButton />

        {/* Content */}
        <div className="relative z-10">
          <Hero />
          <Lab />
          <Core />
          <Terminal />
        </div>

        {/* Enhanced Footer with Lab Link */}
        <footer className="relative z-10 bg-void/80 backdrop-blur-sm border-t border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-6">

            {/* Lab CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 p-8 rounded-2xl bg-linear-to-br from-white/0.02 to-transparent border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-linear-to-r from-neon/5 to-electric/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center">
                    <FlaskConical className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Laboratório de Componentes</h3>
                    <p className="text-sm text-ghost">Explore minha coleção de UI components reutilizáveis</p>
                  </div>
                </div>

                <a
                  href="/lab"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neon/10 border border-neon/30 rounded-full text-neon font-mono text-sm hover:bg-neon/20 hover:border-neon/50 transition-all duration-300 group/btn"
                >
                  <span>Acessar Lab</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-neon/20 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-electric/20 rounded-br-2xl" />
            </motion.div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl text-white tracking-tighter font-bold font-mono"
              >
                &lt;ADAM /&gt;
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-6 text-sm text-ghost"
              >
                <a href="https://github.com/AdamGabriel1  " target="_blank" rel="noopener noreferrer" className="hover:text-neon transition-colors">GitHub</a>
                <a href="https://www.linkedin.com/in/adam-gabriel-b9479b2a6/  " target="_blank" rel="noopener noreferrer" className="hover:text-neon transition-colors">LinkedIn</a>
                <a href="mailto:adamgabriel289@gmail.com" className="hover:text-neon transition-colors">Email</a>
                <span className="text-white/20">|</span>
                <a
                  href="/lab"
                  className="inline-flex items-center gap-1.5 text-neon hover:text-white transition-colors font-medium"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  Lab
                </a>
                <span className="text-white/20">|</span>
                <a
                  href="/portfolio-v2"
                  className="inline-flex items-center gap-1.5 text-electric hover:text-white transition-colors font-medium"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  v2
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-mono text-xs text-ghost/50"
              >
                <span className="text-neon">©</span> 2025 // ADAM_GABRIEL
                <span className="mx-2">|</span>
                <span className="text-electric">v1.0.0</span>
              </motion.div>
            </div>

            {/* Bottom decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-8 h-px bg-linear-to-r from-transparent via-electric/50 to-transparent"
            />
          </div>
        </footer>
      </motion.main>
    </>
  );
}

// Floating Lab Button Component
function FloatingLabButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (approximately)
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="/lab"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50 group"
        >
          <div className="relative">
            {/* Pulse effect */}
            <div className="absolute inset-0 bg-neon/20 rounded-full animate-ping" />

            {/* Button */}
            <div className="relative w-14 h-14 bg-void border border-neon/30 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:border-neon/60 transition-all duration-300 group-hover:scale-110">
              <FlaskConical className="w-6 h-6 text-neon" />
            </div>

            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-void border border-white/10 rounded-lg text-xs font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Laboratório
            </div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}