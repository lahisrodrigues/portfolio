"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 50%, #0a1a30 100%)"
          : "linear-gradient(135deg, #bfe8ff 0%, #7ecef7 40%, #4aaaff 100%)",
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center py-24 md:py-0 md:min-h-screen gap-10 md:gap-0">

        {/* Esquerda: texto */}
        <div className="flex-1 flex flex-col justify-center md:pr-8">

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
            className="flex items-center gap-3 flex-wrap"
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
              Projetos
            </a>
            <a
              href="#contato"
              className="px-6 py-3 rounded-full bg-[#3b82f6] text-white font-semibold hover:bg-blue-400 transition-all duration-300 text-sm shadow-lg shadow-[#3b82f6]/30"
            >
              {t.ctaSecondary}
            </a>
          </motion.div>
        </div>

        {/* Direita: ilustração animada */}
        <motion.div
          className="flex-1 flex items-center justify-center md:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-illustration.gif"
            alt="Ilustração tech animada"
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-none md:w-[460px] lg:w-[560px] object-contain"
            style={{
              transform: "scaleX(-1)",
              filter: isDark
                ? "hue-rotate(180deg) saturate(0.6) brightness(0.85)"
                : "none",
              transition: "filter 0.4s ease",
            }}
          />
        </motion.div>
      </div>

      {/* Fade de transição para a próxima seção */}
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
