"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, X, Cpu, Layers, Zap, ArrowRight, Terminal, GitBranch } from "lucide-react";
import Image from "next/image";

// ==========================================
// PROJECT DATA - Updated for Adam's profile
// ==========================================
const projects = [
    {
        id: 1,
        title: "ENTERPRISE DASHBOARD",
        subtitle: "Sistema de Gestão Empresarial",
        category: "architecture",
        year: "2024",
        tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
        description: "Plataforma completa de gestão empresarial com dashboard em tempo real, relatórios analíticos e integração multi-tenant. Implementação de autenticação JWT, RBAC e otimização de queries complexas.",
        metrics: [
            { label: "Users", value: "500+", unit: "Active" },
            { label: "Performance", value: "95", unit: "Lighthouse" },
            { label: "Uptime", value: "99.9", unit: "%" }
        ],
        color: "#8B5CF6",
        image: "/projects/dashboard.jpg"
    },
    {
        id: 2,
        title: "MICROSERVICES API",
        subtitle: "Arquitetura Distribuída",
        category: "architecture",
        year: "2024",
        tags: ["Go", "gRPC", "Docker", "Kubernetes"],
        description: "API gateway com microsserviços em Go, comunicação via gRPC, containerização Docker e orquestração Kubernetes. Implementação de circuit breakers, rate limiting e observabilidade com Prometheus/Grafana.",
        metrics: [
            { label: "Throughput", value: "10K", unit: "RPS" },
            { label: "Latency", value: "<50", unit: "ms" },
            { label: "Services", value: "8", unit: "Micro" }
        ],
        color: "#00F0FF",
        image: "/projects/microservices.jpg"
    },
    {
        id: 3,
        title: "DEVOPS PIPELINE",
        subtitle: "CI/CD & Automação",
        category: "performance",
        year: "2023",
        tags: ["GitHub Actions", "Terraform", "AWS", "Docker"],
        description: "Pipeline completo de CI/CD com infraestrutura como código (IaC), deploy automatizado em múltiplos ambientes, testes automatizados e scan de segurança. Redução de 70% no tempo de deploy.",
        metrics: [
            { label: "Deploy Time", value: "-70", unit: "%" },
            { label: "Coverage", value: "85", unit: "%" },
            { label: "Incidents", value: "-60", unit: "%" }
        ],
        color: "#FF006E",
        image: "/projects/devops.jpg"
    },
    {
        id: 4,
        title: "SECURE APP PLATFORM",
        subtitle: "DevSecOps Implementation",
        category: "security",
        year: "2024",
        tags: ["Node.js", "Python", "OWASP", "SAST"],
        description: "Plataforma com foco em segurança, implementando práticas DevSecOps desde o desenvolvimento. SAST/DAST integrado, gestão de secrets, scanning de dependências vulneráveis e compliance automatizado.",
        metrics: [
            { label: "Vulnerabilities", value: "0", unit: "Critical" },
            { label: "Scan Time", value: "<5", unit: "min" },
            { label: "Compliance", value: "100", unit: "%" }
        ],
        color: "#8B5CF6",
        image: "/projects/security.jpg"
    }
];

const categories = [
    { id: "all", label: "ALL_SYSTEMS", icon: Layers },
    { id: "architecture", label: "ARCHITECTURE", icon: GitBranch },
    { id: "performance", label: "DEVOPS", icon: Zap },
    { id: "security", label: "SECURITY", icon: Terminal }
];

// ==========================================
// 3D CARD COMPONENT WITH TILT EFFECT
// ==========================================
const ProjectCard = ({
    project,
    onSelect,
    index
}: {
    project: typeof projects[0];
    onSelect: (p: typeof projects[0]) => void;
    index: number;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onSelect(project)}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative h-[450px] cursor-pointer perspective-1000"
        >
            <div className="absolute inset-0 rounded-2xl bg-linear-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:border-(--project-color)/50 group-hover:shadow-[0_0_40px_rgba(var(--project-color),0.2)]"
                style={{ "--project-color": project.color } as React.CSSProperties}
            >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-linear-gradient-to-t from-void via-void/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--project-color)/10%,transparent_70%)]"
                    style={{ "--project-color": project.color } as React.CSSProperties}
                />

                {/* Holographic Grid Effect */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size:20px_20px" />

                {/* Content */}
                <div className="relative z-20 h-full p-8 flex flex-col justify-between transform-gpu transition-transform duration-500 group-hover:translate-z-20">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="font-mono text-xs text-white/40 mb-2 tracking-widest">{project.year}</div>
                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-(--project-color) transition-colors"
                                style={{ "--project-color": project.color } as React.CSSProperties}
                            >
                                {project.title}
                            </h3>
                            <p className="text-sm text-white/60 font-mono">{project.subtitle}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-(--project-color) group-hover:bg-(--project-color)/10 transition-all"
                            style={{ "--project-color": project.color } as React.CSSProperties}
                        >
                            <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-(--project-color) transition-colors"
                                style={{ "--project-color": project.color } as React.CSSProperties}
                            />
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 my-6">
                        {project.metrics.map((metric, i) => (
                            <div key={i} className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="text-xl font-bold text-white font-mono">{metric.value}</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-wider">{metric.label}</div>
                                <div className="text-[10px] text-white/30">{metric.unit}</div>
                            </div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-white/60 border border-white/10 group-hover:border-(--project-color)/30 group-hover:text-(--project-color) transition-all"
                                style={{ "--project-color": project.color } as React.CSSProperties}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Expand Indicator */}
                    <div className="mt-6 flex items-center gap-2 text-xs font-mono text-white/40 group-hover:text-white/80 transition-colors">
                        <span>VIEW_DETAILS</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),var(--project-color)/20%,transparent_50%)]"
                    style={{ "--project-color": project.color } as React.CSSProperties}
                />
            </div>
        </motion.div>
    );
};

// ==========================================
// CASE STUDY MODAL
// ==========================================
const CaseStudyModal = ({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "auto"; };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-void/95 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-deepvoid border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                    <X className="w-6 h-6 text-white" />
                </button>

                {/* Header */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-gradient-to-br from-(--project-color)/30 to-transparent"
                        style={{ "--project-color": project.color } as React.CSSProperties}
                    />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-linear-gradient-to-t from-deepvoid to-transparent">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="font-mono text-sm text-white/50 mb-2">{project.year} // {project.category.toUpperCase()}</div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">{project.title}</h2>
                            <p className="text-xl text-white/60">{project.subtitle}</p>
                        </motion.div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h3 className="text-lg font-mono text-neon mb-4 flex items-center gap-2">
                                <Terminal className="w-5 h-5" />
                                OVERVIEW
                            </h3>
                            <p className="text-white/70 leading-relaxed text-lg">{project.description}</p>
                        </section>

                        <section>
                            <h3 className="text-lg font-mono text-neon mb-4 flex items-center gap-2">
                                <Cpu className="w-5 h-5" />
                                TECH STACK
                            </h3>
                            <div className="glass rounded-xl p-6 border border-white/5">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {project.tags.map((tag, i) => (
                                        <div key={i} className="text-center p-4 rounded-lg bg-white/5">
                                            <div className="text-2xl mb-2">⚡</div>
                                            <div className="text-sm font-mono text-white/80">{tag}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-mono text-neon mb-4 flex items-center gap-2">
                                <GitBranch className="w-5 h-5" />
                                RESULTS
                            </h3>
                            <div className="space-y-4">
                                {[
                                    "Arquitetura escalável preparada para crescimento",
                                    "Implementação de boas práticas de código e segurança",
                                    "Documentação completa e testes automatizados"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg glass">
                                        <div className="w-6 h-6 rounded-full bg-neon/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-xs text-neon font-mono">{i + 1}</span>
                                        </div>
                                        <p className="text-white/70">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="glass rounded-xl p-6 border border-white/5">
                            <h4 className="text-sm font-mono text-white/40 mb-4 uppercase tracking-wider">Metrics</h4>
                            <div className="space-y-4">
                                {project.metrics.map((metric, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                        <span className="text-white/60 text-sm">{metric.label}</span>
                                        <span className="text-white font-mono font-bold">{metric.value}{metric.unit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass rounded-xl p-6 border border-white/5">
                            <h4 className="text-sm font-mono text-white/40 mb-4 uppercase tracking-wider">Links</h4>
                            <div className="space-y-3">
                                <button className="w-full py-3 px-4 rounded-lg bg-electric/10 border border-electric/30 text-neon font-mono text-sm hover:bg-electric/20 transition-colors flex items-center justify-center gap-2">
                                    <ExternalLink className="w-4 h-4" />
                                    View Demo
                                </button>
                                <button className="w-full py-3 px-4 rounded-lg bg-white/5 border border-white/10 text-white/60 font-mono text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                    <GitBranch className="w-4 h-4" />
                                    Source Code
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ==========================================
// MAIN LAB COMPONENT
// ==========================================
export default function Lab() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    const filteredProjects = projects.filter(p =>
        activeFilter === "all" || p.category === activeFilter
    );

    return (
        <section id="lab" className="relative py-32 bg-deepvoid overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-size:40px_40px" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="font-mono text-neon text-sm mb-4 tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                            [SECTOR_01]
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                            THE <span className="gradient-text">LAB</span>
                        </h2>
                        <p className="text-ghost max-w-xl text-lg">
                            Projetos técnicos desenvolvidos ao longo de 3 anos de experiência.
                            Cada projeto demonstra competência em arquitetura, DevOps e segurança.
                        </p>
                    </motion.div>

                    {/* Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2"
                    >
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeFilter === cat.id;
                            const isHovered = hoveredCategory === cat.id;

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveFilter(cat.id)}
                                    onMouseEnter={() => setHoveredCategory(cat.id)}
                                    onMouseLeave={() => setHoveredCategory(null)}
                                    className={`relative px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 overflow-hidden group ${isActive
                                        ? "bg-electric/20 border border-electric text-neon"
                                        : "bg-white/5 border border-white/10 text-ghost hover:border-white/30"
                                        }`}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-neon" : "text-ghost group-hover:text-white"}`} />
                                        {cat.label}
                                    </span>

                                    {/* Hover Glow */}
                                    {(isHovered || isActive) && (
                                        <motion.div
                                            layoutId="glow"
                                            className="absolute inset-0 bg-linear-gradient-to-r from-electric/20 to-neon/20"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onSelect={setSelectedProject}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-ghost font-mono">No projects found in this category.</p>
                    </motion.div>
                )}

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <a href="https://github.com/AdamGabriel1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ghost hover:text-neon font-mono transition-colors group">
                        <span>ACCESS_GITHUB_ARCHIVE</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>

            {/* Case Study Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <CaseStudyModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}