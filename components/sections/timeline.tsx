"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const icons = [GraduationCap, Briefcase, Briefcase] as const;

export default function Timeline() {
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const t = translations[lang].timeline;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const fontSize = 14;
    let drops: number[] = [];
    let speeds: number[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
      speeds = Array.from({ length: cols }, () => 0.4 + Math.random() * 0.8);
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const opacity = 0.1 + Math.random() * 0.7;
        ctx.fillStyle = `rgba(35, 35, 255, ${opacity.toFixed(2)})`;
        const char = Math.random() > 0.5 ? "1" : "0";
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="trajetoria"
      className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden bg-white dark:bg-zinc-950"
    >
      {/* Canvas Matrix rain */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
      />

      {/* Overlay para legibilidade */}
      <div
        className={`absolute inset-0 z-[1] pointer-events-none ${
          resolvedTheme === "light" ? "bg-white/90" : "bg-zinc-950/60"
        }`}
        aria-hidden="true"
      />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="mb-12 md:mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-brand text-xs tracking-widest uppercase mb-3">
            {t.eyebrow}
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
            {t.title}
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Linha vertical */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-blue-500/20 left-5 md:left-1/2 md:-translate-x-px"
            aria-hidden="true"
          />

          <div className="space-y-10 md:space-y-14">
            {t.items.map(({ year, title, description }, i) => {
              const Icon = icons[i] ?? Briefcase;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={year}
                  className={`relative flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Dot */}
                  <div className="absolute left-3.5 md:left-1/2 top-2.5 w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-zinc-950 md:-translate-x-[7px] z-10 shrink-0" />

                  {/* Conteúdo */}
                  <div
                    className={`flex-1 pl-12 md:pl-0 ${
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-2 mb-2 ${
                        isEven ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="font-mono text-xs font-bold tracking-widest text-brand">
                        {year}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-blue-950 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-brand" />
                      </div>
                    </div>
                    <h3 className="font-mono text-zinc-900 dark:text-white font-semibold text-base md:text-lg mb-1.5 break-words">
                      {title}
                    </h3>
                    <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Lado vazio — desktop */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
