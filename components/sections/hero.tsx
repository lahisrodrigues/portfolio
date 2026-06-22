"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const SHAPES = [
  { name: "Esfera",   icon: "●" },
  { name: "Cubo",     icon: "■" },
  { name: "Pirâmide", icon: "▲" },
  { name: "Torus",    icon: "⊚" },
  { name: "Galáxia",  icon: "✦" },
  { name: "Onda",     icon: "∿" },
];

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark  = mounted && resolvedTheme === "dark";
  const isLight = mounted && resolvedTheme === "light";

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeShape, setActiveShape] = useState(0);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "shapeChanged") setActiveShape(e.data.index);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  function selectShape(idx: number) {
    setActiveShape(idx);
    iframeRef.current?.contentWindow?.postMessage({ type: "morphTo", index: idx }, "*");
  }

  const particlesFilter = isLight ? "invert(1) hue-rotate(180deg)" : "none";

  const shapeButtons = (
    <div className="flex flex-wrap gap-2 justify-center">
      {SHAPES.map((shape, idx) => (
        <button
          key={shape.name}
          onClick={() => selectShape(idx)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[11px] transition-all duration-200 backdrop-blur-md border ${
            activeShape === idx
              ? "bg-[#3b82f6]/20 border-[#3b82f6]/60 text-[#3b82f6]"
              : "bg-white/50 dark:bg-black/30 border-zinc-300/50 dark:border-white/10 text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-white/80 dark:hover:bg-white/10"
          }`}
        >
          <span className="text-[12px] leading-none">{shape.icon}</span>
          <span>{shape.name}</span>
        </button>
      ))}
    </div>
  );

  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden"
      style={{ background: isDark ? "#000000" : "#ffffff" }}
    >
      {/* Fullscreen particle canvas — both mobile and desktop */}
      <iframe
        ref={iframeRef}
        src="/hero-particles.html"
        title="Animação de partículas 3D"
        className="absolute inset-0 w-full h-full border-0 z-0"
        style={{ filter: particlesFilter }}
      />

      {/* Mobile gradient: top-left heavy so text is readable */}
      <div
        className="md:hidden absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(120deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.58) 45%, rgba(0,0,0,0.18) 100%)"
            : "linear-gradient(120deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.68) 45%, rgba(255,255,255,0.08) 100%)",
        }}
      />

      {/* Desktop gradient: left side covered for text, right transparent for interaction */}
      <div
        className="hidden md:block absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.82) 28%, rgba(0,0,0,0.38) 52%, rgba(0,0,0,0.0) 72%)"
            : "linear-gradient(90deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.90) 28%, rgba(255,255,255,0.42) 52%, rgba(255,255,255,0.0) 72%)",
        }}
      />

      {/* Content — pointer-events-none so right half passes events to iframe */}
      <div className="relative z-[2] pointer-events-none w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 min-h-screen flex items-center py-24 md:py-0">

        {/* Text: full width mobile, left half desktop */}
        <div className="pointer-events-auto w-full md:w-1/2 flex flex-col justify-center">
          <motion.p
            className="font-mono text-sm font-semibold mb-5 tracking-wide text-blue-800 dark:text-blue-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            LR &nbsp; Lais Rodrigues
          </motion.p>

          <motion.h1
            className="font-sans font-black leading-none mb-5 text-blue-900 dark:text-white"
            style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {t.subtitle}
          </motion.h1>

          <motion.p
            className="font-sans text-blue-900/60 dark:text-blue-200/70 text-base md:text-lg leading-relaxed max-w-md mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t.paragraph}
          </motion.p>

          <motion.div
            className="flex items-center gap-3 flex-wrap mt-12 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <a
              href="#stack"
              className="px-6 py-3 rounded-full border-2 border-[#3b82f6] text-blue-700 dark:text-[#3b82f6] font-semibold bg-white/30 dark:bg-white/5 hover:bg-[#3b82f6] hover:text-white dark:hover:bg-[#3b82f6] transition-all duration-300 backdrop-blur-sm text-sm"
            >
              Stack
            </a>
            <a
              href="#projetos"
              className="px-6 py-3 rounded-full border-2 border-[#3b82f6] text-blue-700 dark:text-[#3b82f6] font-semibold bg-white/30 dark:bg-white/5 hover:bg-[#3b82f6] hover:text-white dark:hover:bg-[#3b82f6] transition-all duration-300 backdrop-blur-sm text-sm"
            >
              Projects
            </a>
            <a
              href="#contato"
              className="px-6 py-3 rounded-full bg-[#3b82f6] text-white font-semibold hover:bg-blue-400 transition-all duration-300 text-sm shadow-lg shadow-[#3b82f6]/30"
            >
              {t.ctaSecondary}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Shape selector — bottom center, both mobile and desktop */}
      <div className="absolute bottom-8 left-0 right-0 z-[22] px-6 pointer-events-auto">
        {shapeButtons}
      </div>

      {/* Fade de transição */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, transparent, #0d1b3e)"
            : "linear-gradient(to bottom, transparent, #e0f2fe)",
        }}
      />
    </section>
  );
}
