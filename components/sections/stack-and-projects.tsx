"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
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
  const { lang } = useLanguage();
  const tStack = translations[lang].stack;
  const tProjects = translations[lang].upcomingProjects;

  return (
    <section id="stack" className="relative py-20 md:py-32 overflow-hidden">
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

          {/* Estilo C — Editorial: sem card, só tipografia + divisórias */}
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {tProjects.items.map(({ title, description, badge }, i) => {
              const isClickable = i === 0;
              const inner = (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="group py-8 flex flex-col sm:flex-row sm:items-start gap-4 hover:pl-3 transition-all duration-300"
                >
                  {/* Número grande */}
                  <span className="font-mono text-5xl font-black leading-none select-none text-[#3b82f6]/40 shrink-0 w-16 text-right sm:text-right pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className={`font-mono text-xs px-2 py-0.5 border ${badgeStyles[i]}`}>
                        {badge}
                      </span>
                      {isClickable && (
                        <span className="text-green-500 font-mono text-xs flex items-center gap-1">
                          <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pulseColors[i]} opacity-60`} />
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${pulseColors[i]}`} />
                          </span>
                          LIVE
                        </span>
                      )}
                      {isClickable && <ExternalLink size={13} className="text-zinc-400 group-hover:text-[#3b82f6] transition-colors" />}
                    </div>

                    <h3 className="font-mono text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-[#3b82f6] transition-colors duration-200">
                      {title}
                    </h3>

                    <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3 max-w-prose">
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {(stacks[i] as readonly string[]).map((tech) => (
                        <span key={tech} className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
                          #{tech.toLowerCase().replace(/[\s.]/g, "")}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );

              return isClickable ? (
                <a key={title} href="https://psijuliedelazari.vercel.app/" target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={title}>{inner}</div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
