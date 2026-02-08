"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import {
    Cpu,
    Globe,
    Database,
    Cloud,
    Shield,
    Zap,
    Terminal,
    Layers,
    GitBranch,
    Box,
    Server,
    Code2,
    Workflow,
    ChevronRight,
    Activity,
    Target,
    FileCode,
    Settings,
    Lock
} from "lucide-react";

// ==========================================
// 3D TECH ORB COMPONENT
// ==========================================
const TechOrb = () => {
    const groupRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Points>(null);

    // Create particles
    const particles = useMemo(() => {
        const count = 200;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const radius = 2 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Color based on position
            const color = new THREE.Color();
            color.setHSL(0.75 + Math.random() * 0.2, 0.8, 0.5);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        return { positions, colors };
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
        if (particlesRef.current) {
            particlesRef.current.rotation.y = -state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Core Sphere */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh>
                    <sphereGeometry args={[1.5, 64, 64]} />
                    <MeshDistortMaterial
                        color="#8B5CF6"
                        emissive="#4C1D95"
                        emissiveIntensity={0.5}
                        distort={0.3}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </mesh>
            </Float>

            {/* Outer Glow */}
            <mesh scale={1.8}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color="#8B5CF6"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Particle Field */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[particles.positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[particles.colors, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>

            {/* Orbiting Tech Icons */}
            {[
                { color: "#00F0FF", radius: 3, speed: 1 },
                { color: "#FF006E", radius: 3.5, speed: 0.8 },
                { color: "#8B5CF6", radius: 4, speed: 0.6 },
                { color: "#00F0FF", radius: 3.2, speed: 1.2 },
            ].map((tech, i) => (
                <OrbitingIcon key={i} {...tech} index={i} />
            ))}
        </group>
    );
};

const OrbitingIcon = ({
    color,
    radius,
    speed,
    index
}: {
    color: string;
    radius: number;
    speed: number;
    index: number;
}) => {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ref.current) {
            const angle = state.clock.elapsedTime * speed + (index * Math.PI / 2);
            ref.current.position.x = Math.cos(angle) * radius;
            ref.current.position.z = Math.sin(angle) * radius;
            ref.current.position.y = Math.sin(angle * 2) * 0.5;
            ref.current.lookAt(0, 0, 0);
        }
    });

    return (
        <mesh ref={ref}>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                toneMapped={false}
            />
        </mesh>
    );
};

// ==========================================
// SKILL ORB COMPONENT (2D)
// ==========================================
const SkillOrb = ({
    skill,
    index,
    total
}: {
    skill: { name: string; level: number; icon: any; color: string };
    index: number;
    total: number;
}) => {
    const Icon = skill.icon;

    // Calculate position in circle
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const radius = 280;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
            className="absolute left-1/2 top-1/2"
            style={{
                x: x - 60,
                y: y - 60,
            }}
        >
            <motion.div
                whileHover={{ scale: 1.2, zIndex: 50 }}
                className="relative w-[120px] h-[120px] group cursor-pointer"
            >
                {/* Glow Effect */}
                <div
                    className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                    style={{ backgroundColor: skill.color }}
                />

                {/* Orb */}
                <div
                    className="relative w-full h-full rounded-full glass border-2 flex flex-col items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_30px_var(--skill-color)]"
                    style={{
                        "--skill-color": skill.color,
                        borderColor: `${skill.color}40`
                    } as React.CSSProperties}
                >
                    <Icon className="w-8 h-8 mb-2" style={{ color: skill.color }} />
                    <div className="text-xs font-mono text-white/60 text-center leading-tight">
                        {skill.name}
                    </div>
                    <div className="text-lg font-bold font-mono mt-1" style={{ color: skill.color }}>
                        {skill.level}%
                    </div>
                </div>

                {/* Connection Line to Center */}
                <svg
                    className="absolute top-1/2 left-1/2 w-[300px] h-[2px] pointer-events-none opacity-20"
                    style={{
                        transform: `rotate(${angle * 180 / Math.PI}deg)`,
                        transformOrigin: "0 50%"
                    }}
                >
                    <line
                        x1="0"
                        y1="1"
                        x2="300"
                        y2="1"
                        stroke={skill.color}
                        strokeWidth="1"
                        strokeDasharray="4 4"
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
};

// ==========================================
// RADAR CHART COMPONENT
// ==========================================
const RadarChart = ({ data }: { data: { label: string; value: number }[] }) => {
    const size = 300;
    const center = size / 2;
    const radius = 120;
    const levels = 5;

    const getPoint = (value: number, index: number, total: number) => {
        const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
        const r = (value / 100) * radius;
        return {
            x: center + r * Math.cos(angle),
            y: center + r * Math.sin(angle)
        };
    };

    const points = data.map((d, i) => getPoint(d.value, i, data.length));
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

    return (
        <div className="relative w-[300px] h-[300px]">
            <svg width={size} height={size} className="transform rotate-0">
                {/* Grid Levels */}
                {Array.from({ length: levels }).map((_, i) => {
                    const levelRadius = (radius / levels) * (i + 1);
                    const levelPoints = data.map((_, j) => {
                        const angle = (Math.PI * 2 * j) / data.length - Math.PI / 2;
                        return `${center + levelRadius * Math.cos(angle)},${center + levelRadius * Math.sin(angle)}`;
                    }).join(' ');

                    return (
                        <polygon
                            key={i}
                            points={levelPoints}
                            fill="none"
                            stroke="rgba(139, 92, 246, 0.2)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />
                    );
                })}

                {/* Axes */}
                {data.map((_, i) => {
                    const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
                    const x = center + radius * Math.cos(angle);
                    const y = center + radius * Math.sin(angle);
                    return (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={x}
                            y2={y}
                            stroke="rgba(139, 92, 246, 0.2)"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Data Area */}
                <motion.path
                    d={pathD}
                    fill="rgba(139, 92, 246, 0.2)"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Data Points */}
                {points.map((p, i) => (
                    <motion.circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="#00F0FF"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                    />
                ))}
            </svg>

            {/* Labels */}
            {data.map((d, i) => {
                const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
                const labelRadius = radius + 30;
                const x = center + labelRadius * Math.cos(angle);
                const y = center + labelRadius * Math.sin(angle);

                return (
                    <div
                        key={i}
                        className="absolute text-xs font-mono text-white/60 whitespace-nowrap"
                        style={{
                            left: x,
                            top: y,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {d.label}
                    </div>
                );
            })}
        </div>
    );
};

// ==========================================
// TERMINAL SKILL COMPONENT
// ==========================================
const TerminalSkill = ({
    skill,
    index
}: {
    skill: { name: string; level: number; category?: string };
    index: number;
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500 + index * 100);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            className="group"
        >
            <div className="flex items-center justify-between py-3 border-b border-white/5 hover:border-electric/30 transition-colors">
                <div className="flex items-center gap-3">
                    <span className="text-neon/50 font-mono text-xs">[{String(index + 1).padStart(2, '0')}]</span>
                    <span className="text-white font-mono group-hover:text-neon transition-colors">{skill.name}</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={isVisible ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className="h-full bg-linear-to-r from-electric to-neon rounded-full"
                        />
                    </div>
                    <span className="text-neon font-mono text-sm w-12 text-right">{skill.level}%</span>
                </div>
            </div>
        </motion.div>
    );
};

// ==========================================
// MAIN CORE COMPONENT
// ==========================================
export default function Core() {
    const [activeTab, setActiveTab] = useState<"orbit" | "radar" | "terminal">("orbit");
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);

    const skills = [
        { name: "React", level: 95, icon: Layers, color: "#00F0FF" },
        { name: "Next.js", level: 92, icon: Globe, color: "#8B5CF6" },
        { name: "TypeScript", level: 90, icon: Code2, color: "#00F0FF" },
        { name: "Node.js", level: 88, icon: Server, color: "#8B5CF6" },
        { name: "Python", level: 85, icon: FileCode, color: "#FF006E" },
        { name: "Go", level: 82, icon: Cpu, color: "#00F0FF" },
        { name: "C# .NET", level: 80, icon: Box, color: "#8B5CF6" },
        { name: "PostgreSQL", level: 88, icon: Database, color: "#00F0FF" },
        { name: "DevOps", level: 85, icon: Settings, color: "#FF006E" },
        { name: "DevSecOps", level: 78, icon: Lock, color: "#8B5CF6" },
        { name: "Docker", level: 87, icon: Box, color: "#00F0FF" },
        { name: "Cloud", level: 80, icon: Cloud, color: "#8B5CF6" },
    ];

    const radarData = [
        { label: "Frontend", value: 95 },
        { label: "Backend", value: 88 },
        { label: "DevOps", value: 85 },
        { label: "Database", value: 88 },
        { label: "Security", value: 78 },
        { label: "Cloud", value: 80 },
    ];

    const categories = [
        { id: "frontend", name: "FRONTEND", items: ["React", "Next.js", "TypeScript", "Tailwind", "UI/UX"] },
        { id: "backend", name: "BACKEND", items: ["Node.js", "Python", "Go", "C# .NET", "PostgreSQL"] },
        { id: "devops", name: "DEVOPS", items: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform"] },
        { id: "security", name: "SECURITY", items: ["DevSecOps", "OWASP", "SAST/DAST", "Secrets Mgmt"] },
    ];

    return (
        <section id="core" className="relative py-32 bg-void overflow-hidden min-h-screen">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-size-[60px_60px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="font-mono text-neon text-sm mb-4 tracking-widest flex items-center justify-center gap-2">
                        <Activity className="w-4 h-4 animate-pulse" />
                        [SECTOR_02]
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                        THE <span className="gradient-text">CORE</span>
                    </h2>
                    <p className="text-ghost max-w-2xl mx-auto text-lg">
                        Stack tecnológico validado em produção. Especialização em desenvolvimento
                        fullstack, DevOps e segurança de aplicações.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Left: 3D Visualization */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative h-[600px]"
                    >
                        {/* View Toggle */}
                        <div className="absolute top-0 left-0 right-0 z-20 flex justify-center gap-2 mb-8">
                            {[
                                { id: "orbit", icon: Globe, label: "ORBIT" },
                                { id: "radar", icon: Target, label: "RADAR" },
                                { id: "terminal", icon: Terminal, label: "CLI" },
                            ].map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`px-4 py-2 rounded-lg font-mono text-xs flex items-center gap-2 transition-all ${activeTab === tab.id
                                            ? "bg-electric/20 text-neon border border-electric"
                                            : "bg-white/5 text-ghost border border-white/10 hover:border-white/30"
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* 3D Canvas */}
                        <div className="absolute inset-0">
                            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
                                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F0FF" />
                                <TechOrb />
                                <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />
                                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                            </Canvas>
                        </div>

                        {/* Overlay Stats */}
                        <div className="absolute bottom-0 left-0 right-0 glass rounded-xl p-6 border border-white/10">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-neon font-mono">12</div>
                                    <div className="text-xs text-ghost uppercase tracking-wider">Tech Stack</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-electric font-mono">3+</div>
                                    <div className="text-xs text-ghost uppercase tracking-wider">Years</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-plasma font-mono">85%</div>
                                    <div className="text-xs text-ghost uppercase tracking-wider">Avg Level</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Skills Visualization */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            {activeTab === "orbit" && (
                                <motion.div
                                    key="orbit"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="relative h-[700px]"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative w-full h-full">
                                            {skills.slice(0, 8).map((skill, i) => (
                                                <SkillOrb key={skill.name} skill={skill} index={i} total={8} />
                                            ))}
                                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full glass border border-electric/30 flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-3xl font-bold text-white font-mono">ADAM</div>
                                                    <div className="text-xs text-neon">STACK</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "radar" && (
                                <motion.div
                                    key="radar"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex justify-center"
                                >
                                    <RadarChart data={radarData} />
                                </motion.div>
                            )}

                            {activeTab === "terminal" && (
                                <motion.div
                                    key="terminal"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="glass rounded-xl p-6 border border-white/10"
                                >
                                    <div className="flex items-center gap-2 mb-6 text-neon font-mono text-sm">
                                        <Terminal className="w-4 h-4" />
                                        <span>skill_matrix.exe</span>
                                    </div>
                                    <div className="space-y-1 max-h-[320px] overflow-y-auto custom-scrollbar">
                                        {skills.map((skill, i) => (
                                            <TerminalSkill key={skill.name} skill={skill} index={i} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Category Tags */}
                        <div className="grid grid-cols-2 gap-4">
                            {categories.map((cat, i) => (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="glass p-4 rounded-lg border border-white/5 hover:border-electric/30 transition-all group cursor-pointer"
                                    onMouseEnter={() => setHoveredTech(cat.id)}
                                    onMouseLeave={() => setHoveredTech(null)}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-mono text-neon">{cat.name}</span>
                                        <ChevronRight className="w-4 h-4 text-ghost group-hover:text-neon group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.items.map((item) => (
                                            <span
                                                key={item}
                                                className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded group-hover:bg-electric/10 group-hover:text-white transition-colors"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom: Architecture Diagram */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="glass rounded-2xl p-8 border border-white/10"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Arquitetura Preferida</h3>
                            <p className="text-ghost text-sm">Stack otimizado para aplicações modernas e escaláveis</p>
                        </div>
                        <div className="flex items-center gap-2 text-neon font-mono text-xs">
                            <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                            LIVE SYSTEM
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {[
                            { layer: "Edge", tech: "Vercel / Cloudflare", color: "#00F0FF" },
                            { layer: "Client", tech: "Next.js / React", color: "#8B5CF6" },
                            { layer: "API", tech: "Node.js / Python", color: "#FF006E" },
                            { layer: "Service", tech: "Go / C# / Microservices", color: "#00F0FF" },
                            { layer: "Data", tech: "PostgreSQL / Redis", color: "#8B5CF6" },
                        ].map((item, i) => (
                            <motion.div
                                key={item.layer}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 + i * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div
                                    className="glass p-4 rounded-lg border border-white/10 transition-all text-center group"
                                    style={{ "--layer-color": item.color } as React.CSSProperties}
                                >
                                    <div className="text-xs font-mono text-ghost mb-1">{item.layer}</div>
                                    <div
                                        className="text-sm font-bold text-white transition-colors"
                                        style={{ color: item.color }}
                                    >
                                        {item.tech}
                                    </div>
                                </div>
                                {i < 4 && (
                                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-white/20" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}