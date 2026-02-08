"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/lab/Navbar";
import ButtonShowcase from "@/components/lab/showcases/ButtonShowcase";
import CardShowcase from "@/components/lab/showcases/CardShowcase";
import InputShowcase from "@/components/lab/showcases/InputShowcase";
import ModalShowcase from "@/components/lab/showcases/ModalShowcase";
import LoaderShowcase from "@/components/lab/showcases/LoaderShowcase";
import BadgeShowcase from "@/components/lab/showcases/BadgeShowcase";

const categories = [
    { id: "buttons", name: "Buttons", num: "01" },
    { id: "cards", name: "Cards", num: "02" },
    { id: "inputs", name: "Inputs", num: "03" },
    { id: "modals", name: "Modals", num: "04" },
    { id: "loaders", name: "Loaders", num: "05" },
    { id: "badges", name: "Badges", num: "06" },
];

export default function LabPage() {
    const [activeCategory, setActiveCategory] = useState("buttons");

    return (
        <div className="min-h-screen bg-void text-white">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="text-neon font-mono text-sm tracking-widest">[LABORATÓRIO]</span>
                        <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6 bg-linear-to-r from-white via-neon to-electric bg-clip-text text-transparent">
                            Component Library
                        </h1>
                        <p className="text-ghost max-w-2xl mx-auto text-lg">
                            Coleção de componentes React reutilizáveis com design system consistente.
                            Copie, cole e customize para seus projetos.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Navigation Tabs */}
            <div className="sticky top-20 z-30 bg-void/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 whitespace-nowrap ${activeCategory === cat.id
                                    ? "bg-neon/20 text-neon border border-neon/50"
                                    : "text-ghost hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <span className="opacity-50 mr-1">[{cat.num}]</span>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Showcase Area */}
            <section className="py-12 px-6 min-h-[60vh]">
                <div className="max-w-7xl mx-auto">
                    {activeCategory === "buttons" && <ButtonShowcase />}
                    {activeCategory === "cards" && <CardShowcase />}
                    {activeCategory === "inputs" && <InputShowcase />}
                    {activeCategory === "modals" && <ModalShowcase />}
                    {activeCategory === "loaders" && <LoaderShowcase />}
                    {activeCategory === "badges" && <BadgeShowcase />}
                </div>
            </section>
        </div>
    );
}