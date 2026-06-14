"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, FileText, Code2, Rocket } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const stepIcons = [MessageSquare, FileText, Code2, Rocket] as const;
const stepNums = ["01", "02", "03", "04"] as const;

function useCardTypewriter(text: string) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    function runCycle() {
      if (cancelled) return;
      setDisplayed("");
      setShowCursor(true);
      let i = 0;
      intervalId = setInterval(() => {
        if (cancelled) {
          if (intervalId) clearInterval(intervalId);
          return;
        }
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setShowCursor(false);
          const t1 = setTimeout(() => {
            if (cancelled) return;
            setDisplayed("");
            const t2 = setTimeout(() => {
              if (cancelled) return;
              runCycle();
            }, 500);
            timers.push(t2);
          }, 2000);
          timers.push(t1);
        }
      }, 80);
    }

    runCycle();

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      timers.forEach(clearTimeout);
    };
  }, [text]);

  return { displayed, showCursor };
}

function DevCardTitle({ text }: { text: string }) {
  const { displayed, showCursor } = useCardTypewriter(text);
  return (
    <h3 className="font-mono text-zinc-900 dark:text-white font-semibold text-lg mb-2 min-h-[1.75rem]">
      {displayed}
      {showCursor && (
        <span className="inline-block w-[1px] h-[0.85em] bg-zinc-900 dark:bg-white align-middle ml-0.5 animate-pulse" />
      )}
    </h3>
  );
}

export default function Projects() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const t = translations[lang].howIWork;
  const isLight = mounted && resolvedTheme === "light";

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      id="processo"
      className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden bg-white dark:bg-zinc-950"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src="/process-bg.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isLight ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.80)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="mb-12 md:mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[#2323FF] dark:text-blue-400 text-xs tracking-widest uppercase mb-3">
            {t.eyebrow}
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="font-sans text-base text-zinc-700 dark:text-zinc-200">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="hidden lg:block absolute border-t-2 border-dashed border-[#2323FF]/30 pointer-events-none z-0"
            style={{ top: "5rem", left: "12.5%", right: "12.5%", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.steps.map(({ title, description }, i) => {
              const Icon = stepIcons[i];
              const num = stepNums[i];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={`relative flex flex-col p-6 rounded-xl backdrop-blur-sm transition-colors duration-300 ${
                    isLight
                      ? "bg-white/80 border border-zinc-200 shadow-sm hover:border-[#2323FF]/50"
                      : "bg-white/5 border border-white/10 hover:border-blue-400/50"
                  }`}
                >
                  <span className={`font-mono text-4xl font-bold text-[#2323FF] leading-none select-none mb-1 ${isLight ? "opacity-80" : "opacity-60"}`}>
                    {num}
                  </span>

                  <div className="w-10 h-10 rounded-lg bg-[#2323FF]/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#2323FF]" />
                  </div>

                  {i === 2 ? (
                    <DevCardTitle text={title} />
                  ) : (
                    <h3 className="font-mono text-zinc-900 dark:text-white font-bold text-lg mb-2">
                      {title}
                    </h3>
                  )}
                  <p className="font-sans text-zinc-700 dark:text-zinc-200 text-sm leading-relaxed">
                    {description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
