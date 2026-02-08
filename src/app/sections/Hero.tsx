"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import MagneticButton from "../components/MagneticButton";
import { ArrowRight, ChevronDown, Cpu, Zap, Globe } from "lucide-react";
import gsap from "gsap";

// ==========================================
// SHADER MATERIAL FOR ADVANCED BACKGROUND
// ==========================================
const ShaderBackground = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport, mouse } = useThree();

    const uniforms = useRef({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
    });

    useFrame((state) => {
        if (meshRef.current) {
            uniforms.current.uTime.value = state.clock.elapsedTime;
            uniforms.current.uMouse.value.x = mouse.x;
            uniforms.current.uMouse.value.y = mouse.y;
        }
    });

    const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      vec2 mouse = uMouse * 0.5 + 0.5;
      
      float noise = snoise(uv * 3.0 + uTime * 0.1);
      float noise2 = snoise(uv * 5.0 - uTime * 0.15);
      
      float dist = distance(uv, mouse);
      float ripple = sin(dist * 20.0 - uTime * 2.0) * 0.5 + 0.5;
      ripple *= smoothstep(0.5, 0.0, dist);
      
      vec3 color1 = vec3(0.02, 0.01, 0.05);
      vec3 color2 = vec3(0.55, 0.36, 0.96);
      vec3 color3 = vec3(0.0, 0.94, 1.0);
      
      vec3 finalColor = mix(color1, color2, noise * 0.3 + ripple * 0.2);
      finalColor = mix(finalColor, color3, noise2 * 0.1 + ripple * 0.1);
      
      float vignette = 1.0 - smoothstep(0.3, 1.0, length(uv - 0.5));
      finalColor *= vignette;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms.current}
            />
        </mesh>
    );
};

// ==========================================
// 3D FLOATING OBJECTS INSIDE CANVAS
// ==========================================
const FloatingObjects = () => {
    return (
        <>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[-4, 2, 0]}>
                <mesh>
                    <octahedronGeometry args={[0.3, 0]} />
                    <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.5} wireframe />
                </mesh>
            </Float>

            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3} position={[4, 1, -2]}>
                <mesh>
                    <icosahedronGeometry args={[0.25, 0]} />
                    <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.5} wireframe />
                </mesh>
            </Float>

            <Float speed={2.5} rotationIntensity={0.7} floatIntensity={0.4} position={[3.5, -2, -1]}>
                <mesh>
                    <dodecahedronGeometry args={[0.2, 0]} />
                    <meshStandardMaterial color="#FF006E" emissive="#FF006E" emissiveIntensity={0.5} wireframe />
                </mesh>
            </Float>
        </>
    );
};

// ==========================================
// UI FLOATING CARD COMPONENT (Outside Canvas)
// ==========================================
const FloatingCard = ({
    icon: Icon,
    label,
    value,
    delay,
    position
}: {
    icon: any;
    label: string;
    value: string;
    delay: number;
    position: { x: string; y: string };
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 4.2 + delay, ease: [0.19, 1, 0.22, 1] }}
            className="absolute hidden lg:block z-20"
            style={{ left: position.x, top: position.y }}
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
                className="glass p-4 rounded-xl border border-white/10 hover:border-electric/50 transition-all duration-300 group cursor-pointer hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center group-hover:bg-electric/30 transition-colors">
                        <Icon className="w-5 h-5 text-neon" />
                    </div>
                    <div>
                        <div className="text-xs text-ghost font-mono">{label}</div>
                        <div className="text-white font-bold font-mono">{value}</div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ==========================================
// KINETIC TEXT COMPONENT
// ==========================================
const KineticText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
    const letters = text.split("");

    return (
        <span className={`inline-flex overflow-hidden ${className}`}>
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    initial={{ y: 100, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: delay + i * 0.03,
                        ease: [0.19, 1, 0.22, 1],
                    }}
                    className="inline-block"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {letter === " " ? "\\u00A0" : letter}
                </motion.span>
            ))}
        </span>
    );
};

// ==========================================
// DECODER TEXT EFFECT
// ==========================================
const DecoderText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
    const [displayText, setDisplayText] = useState(text.split("").map(() => " "));
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

    useEffect(() => {
        const timeout = setTimeout(() => {
            let iteration = 0;
            const interval = setInterval(() => {
                setDisplayText(prev =>
                    text.split("").map((char, i) => {
                        if (char === " ") return " ";
                        if (i < iteration) return char;
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                );

                iteration += 1 / 3;
                if (iteration >= text.length) {
                    clearInterval(interval);
                    setDisplayText(text.split(""));
                }
            }, 30);

            return () => clearInterval(interval);
        }, delay * 1000);

        return () => clearTimeout(timeout);
    }, [text, delay]);

    return (
        <span className={`font-mono ${className}`}>
            {displayText.join("")}
        </span>
    );
};

// ==========================================
// MAIN HERO COMPONENT
// ==========================================
export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    const springY = useSpring(y, { stiffness: 100, damping: 30 });
    const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

    useEffect(() => {
        const counters = document.querySelectorAll(".counter");
        counters.forEach((counter) => {
            const target = parseFloat(counter.getAttribute("data-target") || "0");
            const isDecimal = target % 1 !== 0;
            const obj = { val: 0 };

            gsap.to(obj, {
                val: target,
                duration: 2.5,
                delay: 4.5,
                ease: "power2.out",
                onUpdate: () => {
                    const current = obj.val;
                    (counter as HTMLElement).innerText = isDecimal
                        ? current.toFixed(2)
                        : Math.floor(current).toString();
                }
            });
        });
    }, []);

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* WebGL Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ShaderBackground />
                    <FloatingObjects />
                    <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={0.5} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F0FF" />
                </Canvas>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-size:60px_60px pointer-events-none z-1" />

            {/* Floating UI Cards (Outside Canvas) */}
            <FloatingCard
                icon={Cpu}
                label="STACK"
                value="FULLSTACK"
                delay={0}
                position={{ x: "5%", y: "30%" }}
            />
            <FloatingCard
                icon={Zap}
                label="EXPERIÊNCIA"
                value="3 ANOS"
                delay={0.1}
                position={{ x: "85%", y: "25%" }}
            />
            <FloatingCard
                icon={Globe}
                label="FOCO"
                value="DEVOPS"
                delay={0.2}
                position={{ x: "80%", y: "65%" }}
            />

            {/* Main Content */}
            <motion.div
                style={{ y: springY, opacity: springOpacity, scale }}
                className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center"
            >
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 3.8 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-electric/20 text-xs font-mono text-neon mb-8 hover:border-neon/50 transition-colors cursor-default"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon"></span>
                    </span>
                    <DecoderText text="ADAM_GABRIEL_FULLSTACK_DEV" delay={4} />
                </motion.div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.9] mb-8 tracking-tight">
                    <span className="block text-white overflow-hidden">
                        <KineticText text="ADAM" delay={4} />
                    </span>
                    <span className="block gradient-text overflow-hidden mt-2">
                        <KineticText text="GABRIEL" delay={4.2} />
                    </span>
                </h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 4.6 }}
                    className="text-ghost text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                >
                    Engenheiro de Software com 3 anos de experiência em{" "}
                    <span className="text-neon font-mono">React</span>,{" "}
                    <span className="text-electric font-mono">Next.js</span>,{" "}
                    <span className="text-plasma font-mono">Node.js</span>,{" "}
                    <span className="text-neon font-mono">Python</span>,{" "}
                    <span className="text-electric font-mono">Go</span>,{" "}
                    <span className="text-plasma font-mono">C# .NET</span> e{" "}
                    <span className="text-neon font-mono">DevOps</span>.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 4.8 }}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center mb-20"
                >
                    <MagneticButton>
                        <a
                            href="#terminal"
                            className="group relative px-8 py-4 bg-electric/10 border border-electric rounded-full overflow-hidden hover:bg-electric/20 transition-all duration-500 inline-flex items-center gap-3"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-electric via-neon to-electric opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-length:200%_100% animate-shimmer" />
                            <span className="relative font-mono text-neon font-bold flex items-center gap-2">
                                Iniciar Contato
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                    </MagneticButton>

                    <MagneticButton>
                        <a
                            href="#lab"
                            className="group px-8 py-4 text-ghost hover:text-white font-mono transition-colors flex items-center gap-2 rounded-full border border-transparent hover:border-white/10"
                        >
                            Ver Projetos
                            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </a>
                    </MagneticButton>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                >
                    {[
                        { value: "3", suffix: "+", label: "Anos de Experiência", color: "electric" },
                        { value: "10", suffix: "+", label: "Tecnologias Dominadas", color: "neon" },
                        { value: "99", suffix: "%", label: "Entregas no Prazo", color: "plasma" }
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="glass p-6 rounded-2xl border border-white/5 text-center hover:border-electric/30 transition-all duration-300 group cursor-default"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono flex items-center justify-center gap-1">
                                <span className="counter" data-target={stat.value}>0</span>
                                <span className={stat.color === "electric" ? "text-electric" : stat.color === "neon" ? "text-neon" : "text-plasma"}>
                                    {stat.suffix}
                                </span>
                            </div>
                            <div className="text-xs font-mono text-ghost uppercase tracking-widest group-hover:text-white transition-colors">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 text-ghost"
                >
                    <span className="text-xs font-mono tracking-widest">SCROLL</span>
                    <div className="w-px h-12 bg-linear-gradient-to-b from-neon to-transparent" />
                </motion.div>
            </motion.div>

            {/* Corner Decorations */}
            <div className="absolute top-20 left-6 z-10 hidden lg:block">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5 }}
                    className="font-mono text-xs text-ghost/50 space-y-1"
                >
                    <div>LOC: BRASIL</div>
                    <div>STACK: FULL</div>
                    <div className="text-neon">STATUS: ONLINE</div>
                </motion.div>
            </div>

            <div className="absolute top-20 right-6 z-10 hidden lg:block">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5 }}
                    className="font-mono text-xs text-ghost/50 text-right"
                >
                    <div>ADAM_OS v1.0</div>
                    <div>BUILD: 2025.02.03</div>
                    <div className="text-neon">DEV: ACTIVE</div>
                </motion.div>
            </div>
        </section>
    );
}