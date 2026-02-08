"use client";

import { CyberButton } from "@/components/ui/CyberButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Github, Terminal, Zap, AlertCircle } from "lucide-react";

export default function ButtonShowcase() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Variants */}
                <GlassCard title="Variants">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                            <CyberButton variant="primary">Primary</CyberButton>
                            <CyberButton variant="secondary">Secondary</CyberButton>
                            <CyberButton variant="ghost">Ghost</CyberButton>
                            <CyberButton variant="danger">Danger</CyberButton>
                        </div>
                    </div>
                </GlassCard>

                {/* Sizes */}
                <GlassCard title="Sizes">
                    <div className="flex flex-wrap items-center gap-3">
                        <CyberButton size="sm">Small</CyberButton>
                        <CyberButton size="md">Medium</CyberButton>
                        <CyberButton size="lg">Large</CyberButton>
                    </div>
                </GlassCard>

                {/* With Icons */}
                <GlassCard title="With Icons">
                    <div className="flex flex-wrap gap-3">
                        <CyberButton icon={<Terminal className="w-4 h-4" />}>Terminal</CyberButton>
                        <CyberButton variant="secondary" icon={<Zap className="w-4 h-4" />}>
                            Deploy
                        </CyberButton>
                        <CyberButton variant="ghost" icon={<Github className="w-4 h-4" />}>
                            GitHub
                        </CyberButton>
                    </div>
                </GlassCard>

                {/* States */}
                <GlassCard title="States">
                    <div className="flex flex-wrap gap-3">
                        <CyberButton loading>Loading</CyberButton>
                        <CyberButton disabled>Disabled</CyberButton>
                        <CyberButton variant="danger" icon={<AlertCircle className="w-4 h-4" />}>
                            Error
                        </CyberButton>
                    </div>
                </GlassCard>
            </div>

            {/* Code Example */}
            <GlassCard className="mt-8">
                <h3 className="text-lg font-mono text-neon mb-4">// Usage</h3>
                <pre className="text-sm text-ghost overflow-x-auto">
                    {`<CyberButton 
  variant="primary" 
  size="md"
  onClick={handleClick}
  icon={<Terminal className="w-4 h-4" />}
>
  Click Me
</CyberButton>`}
                </pre>
            </GlassCard>
        </div>
    );
}