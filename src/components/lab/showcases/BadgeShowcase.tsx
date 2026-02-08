"use client";

import { CyberBadge } from "@/components/ui/CyberBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Terminal, Zap, Shield, AlertCircle, Check, Star } from "lucide-react";

export default function BadgeShowcase() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Variants */}
                <GlassCard title="Variants">
                    <div className="flex flex-wrap gap-3">
                        <CyberBadge>Default</CyberBadge>
                        <CyberBadge variant="neon">Neon</CyberBadge>
                        <CyberBadge variant="electric">Electric</CyberBadge>
                        <CyberBadge variant="success">Success</CyberBadge>
                        <CyberBadge variant="warning">Warning</CyberBadge>
                        <CyberBadge variant="danger">Danger</CyberBadge>
                        <CyberBadge variant="ghost">Ghost</CyberBadge>
                    </div>
                </GlassCard>

                {/* With Icons */}
                <GlassCard title="With Icons">
                    <div className="flex flex-wrap gap-3">
                        <CyberBadge icon={<Terminal className="w-3 h-3" />}>CLI</CyberBadge>
                        <CyberBadge variant="neon" icon={<Zap className="w-3 h-3" />}>Live</CyberBadge>
                        <CyberBadge variant="success" icon={<Check className="w-3 h-3" />}>Done</CyberBadge>
                        <CyberBadge variant="electric" icon={<Star className="w-3 h-3" />}>Pro</CyberBadge>
                    </div>
                </GlassCard>

                {/* Sizes */}
                <GlassCard title="Sizes">
                    <div className="flex flex-wrap items-center gap-3">
                        <CyberBadge size="sm" variant="neon">Small</CyberBadge>
                        <CyberBadge size="md" variant="neon">Medium</CyberBadge>
                        <CyberBadge size="lg" variant="neon">Large</CyberBadge>
                    </div>
                </GlassCard>

                {/* Pulse Effect */}
                <GlassCard title="Pulse Effect">
                    <div className="flex flex-wrap gap-3">
                        <CyberBadge variant="neon" pulse>Recording</CyberBadge>
                        <CyberBadge variant="danger" pulse>Live</CyberBadge>
                        <CyberBadge variant="success" pulse>Active</CyberBadge>
                    </div>
                </GlassCard>
            </div>

            {/* Real World Example */}
            <GlassCard title="Real World Usage">
                <div className="flex items-center gap-4 p-4 bg-black/20 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-neon/20 flex items-center justify-center">
                        <Terminal className="w-6 h-6 text-neon" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-medium">Project Alpha</span>
                            <CyberBadge size="sm" variant="neon" pulse>Dev</CyberBadge>
                        </div>
                        <p className="text-sm text-ghost">Full-stack application with modern stack</p>
                    </div>
                    <div className="flex gap-2">
                        <CyberBadge size="sm" variant="electric">React</CyberBadge>
                        <CyberBadge size="sm" variant="ghost">v2.0</CyberBadge>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}