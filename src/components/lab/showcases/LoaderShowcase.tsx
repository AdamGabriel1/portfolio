"use client";

import { CyberLoader } from "@/components/ui/CyberLoader";
import { GlassCard } from "@/components/ui/GlassCard";

export default function LoaderShowcase() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <GlassCard className="flex flex-col items-center justify-center h-40">
                    <CyberLoader variant="spinner" size="lg" />
                    <p className="mt-4 text-sm text-ghost font-mono">Spinner</p>
                </GlassCard>

                <GlassCard className="flex flex-col items-center justify-center h-40">
                    <CyberLoader variant="dots" size="md" />
                    <p className="mt-4 text-sm text-ghost font-mono">Dots</p>
                </GlassCard>

                <GlassCard className="flex flex-col items-center justify-center h-40">
                    <CyberLoader variant="terminal" text="compiling..." />
                    <p className="mt-4 text-sm text-ghost font-mono">Terminal</p>
                </GlassCard>

                <GlassCard className="flex flex-col items-center justify-center h-40">
                    <CyberLoader variant="pulse" size="md" text="processing" />
                    <p className="mt-4 text-sm text-ghost font-mono">Pulse</p>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard title="With Text">
                    <div className="space-y-6 py-4">
                        <CyberLoader variant="spinner" text="Loading data..." size="md" />
                        <CyberLoader variant="dots" text="Connecting..." size="sm" />
                        <CyberLoader variant="terminal" text="npm install framer-motion" />
                    </div>
                </GlassCard>

                <GlassCard title="Sizes">
                    <div className="flex items-center gap-8 py-4">
                        <CyberLoader size="sm" />
                        <CyberLoader size="md" />
                        <CyberLoader size="lg" />
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}