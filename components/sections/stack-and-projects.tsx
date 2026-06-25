"use client";

import { motion } from "framer-motion";
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

export default function StackAndProjects() {
  const { lang } = useLanguage();
  const tStack = translations[lang].stack;

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
        <div className="mb-0 space-y-0">
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

      </div>

    </section>
  );
}
