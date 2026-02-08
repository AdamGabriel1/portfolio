"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { CyberBadge } from "@/components/ui/CyberBadge";
import { CyberButton } from "@/components/ui/CyberButton";
import { Terminal, Zap, Shield, Rocket } from "lucide-react";

export default function CardShowcase() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Basic Card */}
                <GlassCard>
                    <h3 className="text-xl font-bold text-white mb-2">Basic Card</h3>
                    <p className="text-ghost text-sm">
                        Um card simples com efeito glassmorphism e hover animation.
                    </p>
                </GlassCard>

                {/* Card with Glow */}
                <GlassCard glow="neon">
                    <div className="flex items-center gap-3 mb-3">
                        <Zap className="w-5 h-5 text-neon" />
                        <h3 className="text-xl font-bold text-white">Neon Glow</h3>
                    </div>
                    <p className="text-ghost text-sm">
                        Card com efeito de brilho neon ao passar o mouse.
                    </p>
                </GlassCard>

                {/* Card with Content */}
                <GlassCard glow="electric">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-electric/20 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-electric" />
                        </div>
                        <CyberBadge variant="electric" pulse>Active</CyberBadge>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Feature Card</h3>
                    <p className="text-ghost text-sm mb-4">
                        Card completo com ícone, badge e conteúdo estruturado.
                    </p>
                    <CyberButton size="sm" variant="primary" className="w-full">
                        Learn More
                    </CyberButton>
                </GlassCard>
            </div>

            {/* Complex Layout */}
            <GlassCard className="mt-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">Project Card</h3>
                        <p className="text-ghost mb-4">
                            Layout complexo combinando múltiplos componentes do design system.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <CyberBadge variant="neon">React</CyberBadge>
                            <CyberBadge variant="electric">TypeScript</CyberBadge>
                            <CyberBadge variant="ghost">NextJS</CyberBadge>
                        </div>
                        <div className="flex gap-3">
                            <CyberButton icon={<Rocket className="w-4 h-4" />}>Deploy</CyberButton>
                            <CyberButton variant="ghost" icon={<Terminal className="w-4 h-4" />}>
                                Code
                            </CyberButton>
                        </div>
                    </div>
                    <div className="w-full md:w-48 h-32 md:h-auto rounded-xl bg-linear-to-br from-neon/20 to-electric/20 border border-white/10" />
                </div>
            </GlassCard>
        </div>
    );
}