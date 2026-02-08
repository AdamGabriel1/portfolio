"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TechItem {
    name: string;
    icon: ReactNode;
    level?: "beginner" | "intermediate" | "advanced" | "expert";
}

interface TechStackProps {
    items: TechItem[];
    columns?: 2 | 3 | 4;
    animated?: boolean;
    className?: string;
}

export function TechStack({ items, columns = 4, animated = true, className = "" }: TechStackProps) {
    const levels = {
        beginner: "bg-white/10",
        intermediate: "bg-neon/10",
        advanced: "bg-electric/10",
        expert: "bg-gradient-to-r from-neon/20 to-electric/20",
    };

    return (
        <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-3 ${className}`}>
            {items.map((tech, index) => (
                <motion.div
                    key={tech.name}
                    initial={animated ? { opacity: 0, y: 20 } : undefined}
                    whileInView={animated ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                    className={`
            flex items-center gap-3 p-3 rounded-xl border border-white/10
            ${levels[tech.level || "intermediate"]}
            transition-all duration-300 cursor-default
          `}
                >
                    <div className="w-8 h-8 flex items-center justify-center text-neon">
                        {tech.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{tech.name}</p>
                        {tech.level && (
                            <p className="text-xs text-ghost/70 capitalize">{tech.level}</p>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}