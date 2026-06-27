"use client";

import { useEffect, useState, useRef } from "react";

interface BackgroundProps {
  isDarkMode?: boolean;
}

export function ChipBackground({ isDarkMode = true }: BackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="fixed inset-0 w-screen h-screen -z-10 overflow-hidden pointer-events-none select-none transition-colors duration-700"
      style={{
        backgroundColor: isDarkMode ? "#03050a" : "#fafafa",
      }}
    >
      {/* Dynamic Ambient Spotlight Casing */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-30 transition-all duration-300 mix-blend-screen"
        style={{
          background: `radial-gradient(circle 450px at ${mousePos.x}% ${mousePos.y}%, ${
            isDarkMode ? "rgba(0, 243, 255, 0.12)" : "rgba(59, 130, 246, 0.15)"
          }, transparent 100%)`,
        }}
      />

      <div
        className="absolute inset-0 opacity-25 dark:opacity-10 transition-all duration-500 mix-blend-plus-lighter"
        style={{
          background: `radial-gradient(circle 600px at 50% 30%, ${
            isDarkMode ? "rgba(29, 78, 216, 0.2)" : "rgba(234, 179, 8, 0.1)"
          }, transparent 100%)`,
        }}
      />

      {/* Prestige Engineering Grid Overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${isDarkMode ? '#ffffff' : '#000000'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDarkMode ? '#ffffff' : '#000000'} 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Premium Linear Light Horizons */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/20 to-transparent" />
      <div className="absolute bottom-1/3 left-10 right-10 h-px opacity-40 bg-linear-to-r from-transparent via-slate-400/20 to-transparent" />

      {/* Subtle Matrix Core Accent Rings */}
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full border border-slate-500/5 dark:border-slate-400/3 animate-[spin_120s_linear_infinite]" />
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full border border-dashed border-slate-500/5 dark:border-slate-400/2 animate-[spin_80s_linear_infinite_reverse]" />
    </div>
  );
}