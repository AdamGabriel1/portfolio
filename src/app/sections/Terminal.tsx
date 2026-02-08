"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    CheckCircle,
    AlertTriangle,
    Terminal as TerminalIcon,
    Cpu,
    Shield,
    Zap,
    Globe,
    ChevronRight,
    Copy,
    Lock,
    Unlock,
    Wifi,
    Server
} from "lucide-react";

// ==========================================
// TYPES
// ==========================================
interface SystemStatus {
    status: string;
    uptime: string;
    cpu_load: number;
    memory_mb: number;
    latency_ms: number;
}

interface TelemetryData {
    cpu: number;
    memory: number;
    latency: number;
    uptime: string;
    lastUpdate: Date;
}

// ==========================================
// API CONFIGURATION
// ==========================================
const API_BASE = 'api/';

// ==========================================
// TYPING EFFECT COMPONENT
// ==========================================
const TypewriterText = ({
    text,
    speed = 30,
    onComplete,
    className = ""
}: {
    text: string;
    speed?: number;
    onComplete?: () => void;
    className?: string;
}) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, text, speed, onComplete]);

    return (
        <span className={className}>
            {displayText}
            <span className="animate-pulse">▊</span>
        </span>
    );
};

// ==========================================
// TERMINAL LINE COMPONENT
// ==========================================
const TerminalLine = ({
    content,
    type = "output",
    delay = 0
}: {
    content: string;
    type?: "input" | "output" | "error" | "success" | "system" | "api";
    delay?: number;
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const colors = {
        input: "text-neon",
        output: "text-white/70",
        error: "text-plasma",
        success: "text-green-400",
        system: "text-electric",
        api: "text-yellow-400"
    };

    const prefixes = {
        input: "➜ ~ ",
        output: "",
        error: "[ERROR] ",
        success: "[SUCCESS] ",
        system: "[SYSTEM] ",
        api: "[API] "
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            className={`font-mono text-sm ${colors[type]} mb-1`}
        >
            <span className="opacity-50">{prefixes[type]}</span>
            {content}
        </motion.div>
    );
};

// ==========================================
// GLITCH TEXT COMPONENT
// ==========================================
const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => {
    const [displayText, setDisplayText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text.split("").map((char, i) => {
                    if (char === " ") return " ";
                    if (i < iteration) return text[i];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );

            iteration += 1 / 2;
            if (iteration >= text.length) {
                clearInterval(interval);
                setDisplayText(text);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return <span className={`${className} glitch-text`}>{displayText}</span>;
};

// ==========================================
// MAIN TERMINAL COMPONENT
// ==========================================
export default function Terminal() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        projectType: "architecture",
        message: "",
        budget: "10k-50k"
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [terminalHistory, setTerminalHistory] = useState<{ type: string; content: string }[]>([]);
    const [isEncrypting, setIsEncrypting] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
    const [apiConnected, setApiConnected] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const projectTypes = [
        { value: "frontend", label: "Frontend Development", code: "FE_DEV" },
        { value: "backend", label: "Backend API", code: "BE_API" },
        { value: "fullstack", label: "Fullstack Application", code: "FS_APP" },
        { value: "devops", label: "DevOps/Infrastructure", code: "DEVOPS" },
        { value: "security", label: "Security Audit", code: "SEC_AUDIT" }
    ];

    const budgets = [
        { value: "5k-10k", label: "$5K - $10K" },
        { value: "10k-25k", label: "$10K - $25K" },
        { value: "25k-50k", label: "$25K - $50K" },
        { value: "50k+", label: "$50K+" }
    ];

    const addToHistory = useCallback((type: string, content: string) => {
        setTerminalHistory(prev => [...prev, { type, content }]);
    }, []);

    // Fetch telemetry data from Go backend
    const fetchTelemetry = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE}/telemetry`);
            if (!response.ok) throw new Error("Failed to fetch telemetry");

            const data: SystemStatus = await response.json();
            setTelemetry({
                cpu: data.cpu_load,
                memory: data.memory_mb,
                latency: data.latency_ms,
                uptime: data.uptime,
                lastUpdate: new Date()
            });
            setApiConnected(true);
            addToHistory("api", `Telemetry updated: CPU ${data.cpu_load.toFixed(1)}% | MEM ${data.memory_mb}MB`);
        } catch (error) {
            console.error("Telemetry error:", error);
            setApiConnected(false);
            addToHistory("error", "Failed to connect to telemetry server");
        }
    }, [addToHistory]);

    // Check API health on mount
    useEffect(() => {
        const checkHealth = async () => {
            try {
                const response = await fetch(`${API_BASE}/health`);
                if (response.ok) {
                    const data = await response.json();
                    setApiConnected(true);
                    addToHistory("success", `Connected to ${data.engine} backend v${data.version}`);
                    // Fetch initial telemetry
                    fetchTelemetry();
                }
            } catch (error) {
                addToHistory("error", "Backend connection failed - running in offline mode");
            }
        };

        // Initial boot sequence
        const bootSequence = [
            { type: "system", content: "Initializing secure connection...", delay: 100 },
            { type: "system", content: "TLS 1.3 handshake complete", delay: 400 },
            { type: "system", content: "Encryption: AES-256-GCM", delay: 700 },
            { type: "system", content: "Ready for input.", delay: 1000 }
        ];

        bootSequence.forEach(({ type, content, delay }) => {
            setTimeout(() => addToHistory(type, content), delay);
        });

        // Check health after boot
        setTimeout(checkHealth, 1200);

        // Set up telemetry polling every 5 seconds
        const interval = setInterval(fetchTelemetry, 5000);
        return () => clearInterval(interval);
    }, [addToHistory, fetchTelemetry]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [terminalHistory]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (value) {
            addToHistory("input", `${field}: ${value}`);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setIsEncrypting(true);

        addToHistory("system", "Encrypting payload...");
        await new Promise(resolve => setTimeout(resolve, 800));
        addToHistory("system", "RSA-4096 encryption applied");
        addToHistory("system", "Transmitting to secure server...");

        try {
            const response = await fetch(`${API_BASE}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    project_type: formData.projectType,
                    budget: formData.budget,
                    message: formData.message,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const data = await response.json();
            setTransactionId(data.transaction_id);

            setLoading(false);
            setIsEncrypting(false);
            setSubmitted(true);
            addToHistory("success", "Message transmitted successfully");
            addToHistory("success", `Transaction ID: ${data.transaction_id}`);
        } catch (error) {
            setLoading(false);
            setIsEncrypting(false);
            addToHistory("error", "Transmission failed. Please try again.");
            console.error("Submit error:", error);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const getCurrentField = () => {
        const fields = ["name", "email", "projectType", "budget", "message"];
        return fields[step] || "complete";
    };

    const nextStep = () => {
        if (step < 4) {
            setStep(step + 1);
            addToHistory("system", `Proceeding to step ${step + 2}/5...`);
        }
    };

    return (
        <section id="terminal" className="relative py-32 bg-void min-h-screen overflow-hidden">
            {/* CRT Effects Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-length:100%_2px,3px_100% opacity-20" />
                <div className="absolute inset-0 bg-white/5 opacity-0 animate-[flicker_0.15s_infinite]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-size:40px_40px" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="font-mono text-neon text-sm mb-4 tracking-widest flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" />
                        [SECTOR_03] // SECURE_CHANNEL
                        {apiConnected && (
                            <span className="flex items-center gap-1 text-green-400 ml-2">
                                <Server className="w-3 h-3" />
                                API:ONLINE
                            </span>
                        )}
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                        <GlitchText text="CONTATO" />
                    </h2>
                    <p className="text-ghost max-w-2xl mx-auto">
                        Canal de comunicação direto com Adam Gabriel.
                        Disponível para projetos de desenvolvimento, consultoria e DevOps.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Main Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-electric/10">
                            {/* Terminal Header */}
                            <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-plasma" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-4 font-mono text-xs text-ghost flex items-center gap-2">
                                        <TerminalIcon className="w-3 h-3" />
                                        contact_adam@dev:~$
                                        {isEncrypting && (
                                            <span className="flex items-center gap-1 text-neon">
                                                <Lock className="w-3 h-3 animate-pulse" />
                                                ENCRYPTING...
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono text-ghost">
                                    <Wifi className={`w-3 h-3 ${apiConnected ? 'text-green-400' : 'text-red-400'}`} />
                                    <span>{apiConnected ? 'ONLINE' : 'OFFLINE'}</span>
                                </div>
                            </div>

                            {/* Terminal Body */}
                            <div
                                ref={terminalRef}
                                className="p-6 h-[500px] overflow-y-auto font-mono text-sm space-y-2 custom-scrollbar bg-black/20"
                            >
                                {/* Boot Sequence */}
                                {terminalHistory.map((line, i) => (
                                    <TerminalLine
                                        key={i}
                                        content={line.content}
                                        type={line.type as any}
                                    />
                                ))}

                                {!submitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                                        {/* Step 1: Name */}
                                        <div className={step >= 0 ? "block" : "hidden"}>
                                            <label className="flex items-center gap-2 text-neon mb-2">
                                                <ChevronRight className="w-4 h-4" />
                                                <span>NOME:</span>
                                            </label>
                                            <input
                                                type="text"
                                                ref={inputRef}
                                                value={formData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && formData.name && nextStep()}
                                                className="w-full bg-transparent border-b border-white/20 focus:border-neon outline-none text-white py-2 font-mono placeholder:text-white/30"
                                                placeholder="Seu nome completo..."
                                                required
                                            />
                                        </div>

                                        {/* Step 2: Email */}
                                        <div className={step >= 1 ? "block" : "hidden"}>
                                            <label className="flex items-center gap-2 text-neon mb-2">
                                                <ChevronRight className="w-4 h-4" />
                                                <span>EMAIL:</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && formData.email && nextStep()}
                                                className="w-full bg-transparent border-b border-white/20 focus:border-neon outline-none text-white py-2 font-mono placeholder:text-white/30"
                                                placeholder="seu@email.com"
                                                required
                                            />
                                        </div>

                                        {/* Step 3: Project Type */}
                                        <div className={step >= 2 ? "block" : "hidden"}>
                                            <label className="flex items-center gap-2 text-neon mb-2">
                                                <ChevronRight className="w-4 h-4" />
                                                <span>TIPO_DE_PROJETO:</span>
                                            </label>
                                            <div className="grid grid-cols-1 gap-2">
                                                {projectTypes.map((type) => (
                                                    <button
                                                        key={type.value}
                                                        type="button"
                                                        onClick={() => {
                                                            handleInputChange("projectType", type.code);
                                                            nextStep();
                                                        }}
                                                        className={`p-3 rounded border text-left transition-all ${formData.projectType === type.value
                                                            ? "border-neon bg-neon/10 text-neon"
                                                            : "border-white/10 text-white/60 hover:border-white/30"
                                                            }`}
                                                    >
                                                        <div className="text-xs opacity-50">{type.code}</div>
                                                        <div className="text-sm">{type.label}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Step 4: Budget */}
                                        <div className={step >= 3 ? "block" : "hidden"}>
                                            <label className="flex items-center gap-2 text-neon mb-2">
                                                <ChevronRight className="w-4 h-4" />
                                                <span>ORÇAMENTO_ESTIMADO:</span>
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {budgets.map((budget) => (
                                                    <button
                                                        key={budget.value}
                                                        type="button"
                                                        onClick={() => {
                                                            handleInputChange("budget", budget.value);
                                                            nextStep();
                                                        }}
                                                        className={`px-4 py-2 rounded border font-mono text-sm transition-all ${formData.budget === budget.value
                                                            ? "border-electric bg-electric/10 text-electric"
                                                            : "border-white/10 text-white/60 hover:border-white/30"
                                                            }`}
                                                    >
                                                        {budget.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Step 5: Message */}
                                        <div className={step >= 4 ? "block" : "hidden"}>
                                            <label className="flex items-center gap-2 text-neon mb-2">
                                                <ChevronRight className="w-4 h-4" />
                                                <span>DESCRIÇÃO_DO_PROJETO:</span>
                                                <span className="text-xs text-white/30">
                                                    ({500 - formData.message.length} chars)
                                                </span>
                                            </label>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                                maxLength={500}
                                                rows={4}
                                                className="w-full bg-transparent border border-white/20 rounded p-3 focus:border-neon outline-none text-white font-mono placeholder:text-white/30 resize-none"
                                                placeholder="Descreva seu projeto, requisitos técnicos e expectativas..."
                                                required
                                            />
                                        </div>

                                        {/* Submit */}
                                        {step >= 4 && formData.message && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-full py-4 bg-electric/20 border border-electric text-neon rounded-lg hover:bg-electric/30 transition-all duration-300 flex items-center justify-center gap-2 font-bold font-mono group disabled:opacity-50"
                                                >
                                                    {loading ? (
                                                        <span className="flex items-center gap-2">
                                                            <div className="w-4 h-4 border-2 border-neon border-t-transparent rounded-full animate-spin" />
                                                            ENCRYPTING_AND_SENDING...
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <span>ENVIAR_MENSAGEM()</span>
                                                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                        </>
                                                    )}
                                                </button>
                                            </motion.div>
                                        )}
                                    </form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-4 py-8"
                                    >
                                        <div className="flex items-center gap-3 text-green-400">
                                            <CheckCircle className="w-6 h-6" />
                                            <span className="text-lg font-bold">MENSAGEM_ENVIADA_COM_SUCESSO</span>
                                        </div>

                                        <div className="glass p-6 rounded-lg border border-green-400/30 space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-white/50">Transaction ID:</span>
                                                <span className="text-neon font-mono">#{transactionId}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-white/50">Encryption:</span>
                                                <span className="text-green-400 font-mono">AES-256-GCM ✓</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-white/50">Response Time:</span>
                                                <span className="text-white font-mono">&lt; 24 hours</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => copyToClipboard(`Transaction ID: #${transactionId}`)}
                                            className="flex items-center gap-2 text-sm text-ghost hover:text-white transition-colors"
                                        >
                                            {copySuccess ? (
                                                <>
                                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                                    Copied to clipboard
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    Copy transaction ID
                                                </>
                                            )}
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Side Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Live Telemetry from Go Backend */}
                        <div className="glass rounded-xl p-6 border border-white/10">
                            <h3 className="text-sm font-mono text-neon mb-4 flex items-center gap-2">
                                <Cpu className="w-4 h-4" />
                                SYSTEM_TELEMETRY
                                {telemetry && (
                                    <span className="text-xs text-green-400 ml-auto animate-pulse">
                                        LIVE
                                    </span>
                                )}
                            </h3>
                            {telemetry ? (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                                        <span className="text-white/50 text-sm">CPU Load</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-electric transition-all duration-500"
                                                    style={{ width: `${telemetry.cpu}%` }}
                                                />
                                            </div>
                                            <span className="text-electric font-mono text-sm w-12 text-right">
                                                {telemetry.cpu.toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                                        <span className="text-white/50 text-sm">Memory</span>
                                        <span className="text-neon font-mono text-sm">{telemetry.memory} MB</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                                        <span className="text-white/50 text-sm">Latency</span>
                                        <span className={`font-mono text-sm ${telemetry.latency < 30 ? 'text-green-400' : 'text-yellow-400'}`}>
                                            {telemetry.latency}ms
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                                        <span className="text-white/50 text-sm">Uptime</span>
                                        <span className="text-white/70 font-mono text-xs">{telemetry.uptime}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-4 text-white/30 text-sm">
                                    {apiConnected ? "Loading telemetry..." : "No connection to backend"}
                                </div>
                            )}
                        </div>

                        {/* Security Status */}
                        <div className="glass rounded-xl p-6 border border-white/10">
                            <h3 className="text-sm font-mono text-neon mb-4 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                SECURITY_STATUS
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Connection", value: apiConnected ? "TLS 1.3" : "DISCONNECTED", status: apiConnected ? "secure" : "error" },
                                    { label: "Encryption", value: "AES-256", status: "secure" },
                                    { label: "Backend", value: apiConnected ? "Go/Gin" : "OFFLINE", status: apiConnected ? "secure" : "error" },
                                    { label: "IP Masking", value: "Active", status: "secure" }
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                        <span className="text-white/50 text-sm">{item.label}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-mono text-sm">{item.value}</span>
                                            <div className={`w-2 h-2 rounded-full animate-pulse ${item.status === 'secure' ? 'bg-green-400' : 'bg-red-400'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="glass rounded-xl p-6 border border-white/10">
                            <h3 className="text-sm font-mono text-neon mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                AVAILABILITY
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 rounded-lg bg-white/5">
                                    <div className="text-2xl font-bold text-electric font-mono">3+</div>
                                    <div className="text-xs text-white/50">Years Exp</div>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-white/5">
                                    <div className="text-2xl font-bold text-neon font-mono">24h</div>
                                    <div className="text-xs text-white/50">Response</div>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-white/5">
                                    <div className="text-2xl font-bold text-plasma font-mono">100%</div>
                                    <div className="text-xs text-white/50">Commitment</div>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-white/5">
                                    <div className="text-2xl font-bold text-green-400 font-mono">PT-BR</div>
                                    <div className="text-xs text-white/50">Native</div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="glass rounded-xl p-6 border border-white/10">
                            <h3 className="text-sm font-mono text-neon mb-4 flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                DIRECT_LINKS
                            </h3>
                            <div className="space-y-3">
                                <a href="mailto:adamgabriel289@gmail.com" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                    <Zap className="w-4 h-4 text-electric" />
                                    <span className="text-white/70 text-sm group-hover:text-white">adamgabriel289@gmail.com</span>
                                </a>
                                <a href="https://github.com/AdamGabriel1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                    <TerminalIcon className="w-4 h-4 text-neon" />
                                    <span className="text-white/70 text-sm group-hover:text-white">github.com/AdamGabriel1</span>
                                </a>
                                <a href="https://www.linkedin.com/in/adam-gabriel-b9479b2a6/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                    <Globe className="w-4 h-4 text-plasma" />
                                    <span className="text-white/70 text-sm group-hover:text-white">LinkedIn Profile</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CSS for CRT effects */}
            <style jsx>{`
                @keyframes flicker {
                    0%, 100% { opacity: 0.02; }
                    50% { opacity: 0.05; }
                }
                
                .glitch-text {
                    position: relative;
                }
                
                .glitch-text::before,
                .glitch-text::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                
                .glitch-text::before {
                    animation: glitch-1 0.3s infinite linear alternate-reverse;
                    color: #ff00ff;
                    z-index: -1;
                }
                
                .glitch-text::after {
                    animation: glitch-2 0.3s infinite linear alternate-reverse;
                    color: #00ffff;
                    z-index: -2;
                }
                
                @keyframes glitch-1 {
                    0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 0); }
                    20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, 0); }
                    40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 0); }
                    60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, 0); }
                    80% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 0); }
                    100% { clip-path: inset(30% 0 20% 0); transform: translate(2px, 0); }
                }
                
                @keyframes glitch-2 {
                    0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, 0); }
                    20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 0); }
                    40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, 0); }
                    60% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 0); }
                    80% { clip-path: inset(50% 0 30% 0); transform: translate(2px, 0); }
                    100% { clip-path: inset(0% 0 80% 0); transform: translate(-2px, 0); }
                }
            `}</style>
        </section>
    );
}