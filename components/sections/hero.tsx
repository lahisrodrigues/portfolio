"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const CHAR_SPEED = 50;
const START_DELAY = 800;

function useTypewriter(text: string, speed: number, delay: number) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return { displayed, done };
}

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const { displayed, done } = useTypewriter(t.typewriter, CHAR_SPEED, START_DELAY);
  const valueDelay = (START_DELAY + t.typewriter.length * CHAR_SPEED + 400) / 1000;

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950"
    >
      {/* Grid tech de fundo */}
      <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Gradiente radial violet centralizado */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 48%, rgba(139, 92, 246, 0.09) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-16 text-center">
        <div className="flex flex-col items-center gap-8 md:gap-10">

          {/* Badge */}
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-600/40 dark:border-violet-700/60 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-300 text-xs font-mono tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 shrink-0"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {t.badge}
          </motion.span>

          {/* Título principal — responsivo mobile-first */}
          <motion.h1
            className="font-mono text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600 dark:from-violet-400 dark:via-indigo-300 dark:to-violet-400 drop-shadow-[0_0_50px_rgba(139,92,246,0.25)] break-words w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            Lais Rodrigues
          </motion.h1>

          {/* Code comment */}
          <motion.p
            className="font-mono text-xs text-zinc-400 dark:text-zinc-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            {t.codeComment}
          </motion.p>

          {/* Subtítulo em duas linhas */}
          <motion.div
            className="flex flex-col items-center gap-2 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.3 }}
          >
            <p className="font-mono text-base sm:text-lg md:text-xl text-zinc-700 dark:text-zinc-300">
              {t.subtitle}
            </p>
            <p className="font-mono text-lg sm:text-2xl md:text-3xl text-violet-600 dark:text-violet-400 font-semibold min-h-[1.75rem] sm:min-h-[2rem] md:min-h-[2.25rem]">
              {displayed}
              <span
                className={`inline-block w-[2px] h-[0.85em] bg-violet-600 dark:bg-violet-400 align-middle ml-0.5 translate-y-[-1px] ${
                  done ? "animate-pulse" : ""
                }`}
              />
            </p>
          </motion.div>

          {/* Proposta de valor */}
          <motion.p
            className="font-sans text-sm sm:text-base text-zinc-700 dark:text-zinc-300 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: valueDelay, duration: 0.6 }}
          >
            {t.paragraph}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: valueDelay + 0.2, duration: 0.6 }}
          >
            <a
              href="#projetos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-violet-500 text-violet-600 dark:text-violet-300 font-sans font-semibold hover:bg-violet-50 dark:hover:bg-violet-950/60 hover:border-violet-500 dark:hover:border-violet-400 hover:scale-105 transition-all duration-200 w-full sm:w-auto"
            >
              <ArrowRight size={18} />
              {t.ctaPrimary}
            </a>
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-sans font-semibold hover:scale-105 transition-all duration-200 w-full sm:w-auto shadow-lg shadow-violet-900/30"
            >
              <Mail size={18} />
              {t.ctaSecondary}
            </a>
          </motion.div>

          {/* Diferenciais */}
          <motion.div
            className="flex items-center gap-3 flex-wrap justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: valueDelay + 0.4, duration: 0.5 }}
          >
            {(t.differentials as readonly string[]).map((diff, i) => (
              <span key={diff} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-zinc-300 dark:text-zinc-700 hidden md:inline" aria-hidden="true">·</span>
                )}
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{diff}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.a
        href="#sobre"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Ir para a próxima seção"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
