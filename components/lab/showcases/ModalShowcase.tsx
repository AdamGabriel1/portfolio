"use client";

import { useState } from "react";
import { CyberModal } from "@/components/ui/CyberModal";
import { CyberButton } from "@/components/ui/CyberButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { CyberInput } from "@/components/ui/CyberInput";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

export default function ModalShowcase() {
    const [basicOpen, setBasicOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => setBasicOpen(true)}>Open Basic Modal</CyberButton>
                <CyberButton variant="secondary" onClick={() => setConfirmOpen(true)}>
                    Confirmation Modal
                </CyberButton>
                <CyberButton variant="electric" onClick={() => setFormOpen(true)}>
                    Form Modal
                </CyberButton>
            </div>

            {/* Basic Modal */}
            <CyberModal
                isOpen={basicOpen}
                onClose={() => setBasicOpen(false)}
                title="System Notification"
            >
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-neon/10 flex items-center justify-center flex-shrink-0">
                        <Info className="w-6 h-6 text-neon" />
                    </div>
                    <div>
                        <p className="text-white mb-2">Modal Component</p>
                        <p className="text-ghost text-sm">
                            Este é um modal básico com animações suaves, backdrop blur e cantos decorativos.
                            Pressione ESC ou clique fora para fechar.
                        </p>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <CyberButton variant="ghost" onClick={() => setBasicOpen(false)}>
                        Cancel
                    </CyberButton>
                    <CyberButton onClick={() => setBasicOpen(false)}>Confirm</CyberButton>
                </div>
            </CyberModal>

            {/* Confirmation Modal */}
            <CyberModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                title="Confirm Action"
                size="sm"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    </div>
                    <p className="text-white">Are you sure you want to proceed?</p>
                </div>
                <div className="flex justify-end gap-3">
                    <CyberButton variant="ghost" size="sm" onClick={() => setConfirmOpen(false)}>
                        Cancel
                    </CyberButton>
                    <CyberButton variant="danger" size="sm" onClick={() => setConfirmOpen(false)}>
                        Confirm Delete
                    </CyberButton>
                </div>
            </CyberModal>

            {/* Form Modal */}
            <CyberModal
                isOpen={formOpen}
                onClose={() => setFormOpen(false)}
                title="New Project"
                size="md"
            >
                <div className="space-y-4">
                    <CyberInput label="Project Name" placeholder="my-awesome-project" required />
                    <CyberInput label="Description" placeholder="Brief description..." helper="Max 100 characters" />
                    <div className="flex justify-end gap-3 mt-6">
                        <CyberButton variant="ghost" onClick={() => setFormOpen(false)}>
                            Cancel
                        </CyberButton>
                        <CyberButton variant="electric" onClick={() => setFormOpen(false)}>
                            Create Project
                        </CyberButton>
                    </div>
                </div>
            </CyberModal>

            {/* Usage Example */}
            <GlassCard className="mt-8">
                <h3 className="text-lg font-mono text-neon mb-4">// Usage</h3>
                <pre className="text-sm text-ghost overflow-x-auto">
                    {`const [isOpen, setIsOpen] = useState(false);

<CyberButton onClick={() => setIsOpen(true)}>Open</CyberButton>

<CyberModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content here</p>
</CyberModal>`}
                </pre>
            </GlassCard>
        </div>
    );
}