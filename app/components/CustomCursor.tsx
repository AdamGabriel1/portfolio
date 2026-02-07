"use client";

import { useEffect, useRef } from "react";
import useMousePosition from "../hooks/useMousePosition";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorDot = useRef<HTMLDivElement>(null);
    const cursorOutline = useRef<HTMLDivElement>(null);
    const { x, y } = useMousePosition();

    useEffect(() => {
        if (cursorDot.current && cursorOutline.current) {
            gsap.to(cursorDot.current, { x, y, duration: 0.1 });
            gsap.to(cursorOutline.current, { x, y, duration: 0.5, ease: "power2.out" });
        }
    }, [x, y]);

    useEffect(() => {
        const handleHover = () => {
            cursorOutline.current?.classList.add("hover");
        };

        const handleLeave = () => {
            cursorOutline.current?.classList.remove("hover");
        };

        const elements = document.querySelectorAll("a, button, [role='button']");
        elements.forEach((el) => {
            el.addEventListener("mouseenter", handleHover);
            el.addEventListener("mouseleave", handleLeave);
        });

        return () => {
            elements.forEach((el) => {
                el.removeEventListener("mouseenter", handleHover);
                el.removeEventListener("mouseleave", handleLeave);
            });
        };
    }, []);

    // Hide on mobile
    if (typeof window !== "undefined" && window.innerWidth < 768) return null;

    return (
        <>
            <div ref={cursorDot} className="cursor-dot hidden md:block" />
            <div ref={cursorOutline} className="cursor-outline hidden md:block" />
        </>
    );
}