"use client";

import { CyberInput } from "@/components/ui/CyberInput";
import { GlassCard } from "@/components/ui/GlassCard";
import { Search, Mail, Lock, Terminal } from "lucide-react";

export default function InputShowcase() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Inputs */}
                <GlassCard title="Text Inputs">
                    <div className="space-y-4">
                        <CyberInput label="Username" placeholder="Enter username" icon={<Terminal className="w-4 h-4" />} />
                        <CyberInput label="Email" type="email" placeholder="dev@example.com" icon={<Mail className="w-4 h-4" />} />
                    </div>
                </GlassCard>

                {/* Password & Search */}
                <GlassCard title="Special Inputs">
                    <div className="space-y-4">
                        <CyberInput label="Password" type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} />
                        <CyberInput label="Search" type="search" placeholder="Search components..." icon={<Search className="w-4 h-4" />} />
                    </div>
                </GlassCard>

                {/* States */}
                <GlassCard title="States">
                    <div className="space-y-4">
                        <CyberInput label="With Helper" placeholder="Type something..." helper="This is a helper text" />
                        <CyberInput
                            label="With Error"
                            placeholder="Invalid input"
                            error="This field is required"
                        />
                    </div>
                </GlassCard>

                {/* Disabled */}
                <GlassCard title="Disabled">
                    <CyberInput
                        label="Disabled Input"
                        placeholder="Cannot edit"
                        disabled
                        helper="This input is currently disabled"
                    />
                </GlassCard>
            </div>
        </div>
    );
}