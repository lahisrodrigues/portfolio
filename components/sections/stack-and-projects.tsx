"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const categories = [
  {
    label: "Frontend",
    color: "text-sky-600 dark:text-sky-400",
    border: "border-sky-100 dark:border-sky-900/40",
    bg: "bg-sky-50/80 dark:bg-sky-950/20",
    techs: [
      { name: "Next.js",      symbol: "▲"   },
      { name: "React",        symbol: "⚛"   },
      { name: "TypeScript",   symbol: "TS"  },
      { name: "JavaScript",   symbol: "JS"  },
      { name: "Tailwind CSS", symbol: "✦"   },
      { name: "HTML5",        symbol: "</>" },
      { name: "CSS",          symbol: "{}"  },
    ],
  },
  {
    label: "Backend",
    color: "text-teal-600 dark:text-teal-400",
    border: "border-teal-100 dark:border-teal-900/40",
    bg: "bg-teal-50/80 dark:bg-teal-950/20",
    techs: [
      { name: "Python",    symbol: "🐍"  },
      { name: "Node.js",   symbol: "⬡"   },
      { name: "REST APIs", symbol: "⟨⟩"  },
    ],
  },
  {
    label: "Ferramentas",
    color: "text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-900/40",
    bg: "bg-blue-50/80 dark:bg-blue-950/20",
    techs: [
      { name: "Git",    symbol: "⎇" },
      { name: "Vercel", symbol: "◆" },
    ],
  },
] as const;

const stacks = [
  ["Next.js", "Tailwind CSS"],
  ["Next.js", "TypeScript"],
  ["Next.js", "PWA", "TypeScript"],
] as const;

const pulseColors = ["bg-green-500", "bg-yellow-500", "bg-zinc-500"] as const;
const badgeStyles = [
  "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
  "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700",
] as const;

export default function StackAndProjects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isLightRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const tStack = translations[lang].stack;
  const tProjects = translations[lang].upcomingProjects;

  const isLight = mounted && resolvedTheme === "light";

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { isLightRef.current = isLight; }, [isLight]);

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
      const light = isLightRef.current;
      ctx.fillStyle = light ? "rgba(224,242,254,0.04)" : "rgba(10,15,30,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const opacity = light ? 0.35 + Math.random() * 0.55 : 0.1 + Math.random() * 0.7;
        ctx.fillStyle = `rgba(35,35,255,${opacity.toFixed(2)})`;
        const char = Math.random() > 0.5 ? "1" : "0";
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speeds[i];
      }
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="stack" className="relative py-20 md:py-32 overflow-hidden bg-[#e0f2fe] dark:bg-[#0a0f1e]">
      {/* Canvas Matrix rain */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" aria-hidden="true" />

      {/* Overlay legibilidade */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: isLight
            ? "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(14,165,233,0.05) 0%, transparent 70%), rgba(224,242,254,0.78)"
            : "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(14,165,233,0.06) 0%, transparent 70%), rgba(10,15,30,0.62)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 lg:px-16">

        {/* Cabeçalho */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sky-600 dark:text-sky-400 text-xs tracking-widest uppercase mb-3">
            {tStack.eyebrow}
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
            {tStack.title}
          </h2>
        </motion.div>

        {/* Stack — layout editorial sem cards */}
        <div className="mb-20 md:mb-24 space-y-0">
          {categories.map(({ label, color, techs }, ci) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: ci * 0.08 }}
              className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10 py-6 border-b border-zinc-100 dark:border-[#1e3a5f] last:border-b-0"
            >
              {/* Categoria */}
              <span className={`font-mono text-xs font-bold tracking-[0.2em] uppercase shrink-0 w-28 ${color}`}>
                {label}
              </span>

              {/* Techs em linha — separadas por · */}
              <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                {techs.map(({ name, symbol }, ti) => (
                  <span key={name} className="flex items-center gap-x-1">
                    <span className="flex items-center gap-1.5 font-mono text-sm md:text-base text-zinc-800 dark:text-zinc-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 cursor-default">
                      <span className={`text-xs ${color} opacity-70`}>{symbol}</span>
                      {name}
                    </span>
                    {ti < techs.length - 1 && (
                      <span className="text-zinc-300 dark:text-zinc-600 select-none px-1">·</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projetos em andamento */}
        <div id="projetos">
          <motion.div
            className="mb-10 md:mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-sky-600 dark:text-blue-400 text-xs tracking-widest uppercase mb-3">
              {tProjects.eyebrow}
            </p>
            <h3 className="font-mono text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
              {tProjects.title}
            </h3>
            <p className="font-sans text-base text-zinc-600 dark:text-zinc-300">
              {tProjects.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tProjects.items.map(({ title, description, badge }, i) => {
              const isClickable = i === 0;
              const card = (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ y: -6, scale: isClickable ? 1.02 : 1, transition: { duration: 0.2 } }}
                  className={`relative flex flex-col p-6 rounded-xl border bg-white dark:bg-[#0d1b3e]/50 backdrop-blur-sm transition-all duration-300 ${
                    isClickable
                      ? "border-sky-100 dark:border-[#1e3a5f] hover:border-teal-400 dark:hover:border-blue-400"
                      : "border-sky-100 dark:border-[#1e3a5f] hover:border-sky-300 dark:hover:border-blue-600"
                  }`}
                >
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    {isClickable && (
                      <ExternalLink size={14} className="text-zinc-400 group-hover:text-teal-500 transition-colors duration-200" />
                    )}
                    <span className="relative flex h-2.5 w-2.5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pulseColors[i]} opacity-50`} />
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${pulseColors[i]}`} />
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono border ${badgeStyles[i]}`}>
                      {badge}
                    </span>
                    {isClickable && (
                      <span className="text-green-500 font-mono text-xs animate-pulse">● LIVE</span>
                    )}
                  </div>

                  <h3 className="font-mono text-zinc-900 dark:text-white font-semibold text-base mb-2 pr-6">
                    {title}
                  </h3>
                  <p className="font-sans text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4 flex-1">
                    {description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(stacks[i] as readonly string[]).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2.5 py-1 rounded-md bg-sky-50 dark:bg-[#0a1628] text-zinc-600 dark:text-zinc-400 border border-sky-100 dark:border-[#1e3a5f]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );

              return isClickable ? (
                <a key={title} href="https://psijuliedelazari.vercel.app/" target="_blank" rel="noopener noreferrer" className="group">
                  {card}
                </a>
              ) : (
                <div key={title} className="contents">{card}</div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fade de transição para a próxima seção */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
        style={{
          background: isLight
            ? "linear-gradient(to bottom, transparent, #e0f2fe)"
            : "linear-gradient(to bottom, transparent, #0d1b3e)",
        }}
      />
    </section>
  );
}
