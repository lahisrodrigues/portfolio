"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const techs = [
  { name: "Next.js",      symbol: "▲"   },
  { name: "React",        symbol: "⚛"   },
  { name: "JavaScript",   symbol: "JS"  },
  { name: "Python",       symbol: "🐍"  },
  { name: "CSS",          symbol: "{}"  },
  { name: "Tailwind CSS", symbol: "✦"   },
  { name: "Git",          symbol: "⎇"   },
  { name: "Vercel",       symbol: "◆"   },
  { name: "HTML5",        symbol: "</>" },
  { name: "REST APIs",    symbol: "⟨⟩"  },
  { name: "Node.js",      symbol: "⬡"   },
];

const row = [...techs, ...techs];

const stacks = [
  ["Next.js", "Tailwind CSS"],
  ["Next.js", "TypeScript"],
  ["Next.js", "PWA", "TypeScript"],
] as const;

const pulseColors = [
  "bg-green-500",
  "bg-yellow-500",
  "bg-zinc-500",
] as const;

const badgeStyles = [
  "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
  "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700",
] as const;

function TechCard({ name, symbol }: { name: string; symbol: string }) {
  return (
    <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-6 py-4 mx-4 shrink-0">
      <span className="font-mono text-base text-violet-600 dark:text-violet-400 w-7 text-center leading-none select-none">
        {symbol}
      </span>
      <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function StackAndProjects() {
  const { lang } = useLanguage();
  const tProjects = translations[lang].upcomingProjects;

  return (
    <section id="stack" className="relative py-20 md:py-32 overflow-hidden bg-zinc-100 dark:bg-zinc-900 dot-grid">
      {/* Gradiente radial central suave */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Título unificado */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 lg:px-16 mb-12 md:mb-14">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm text-zinc-500 mb-2">
            // o que uso e o que estou construindo
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
            Stack & Projetos
          </h2>
        </motion.div>
      </div>

      {/* Carrossel — linha única, 40s */}
      <div className="relative z-10 mb-16 md:mb-20">
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div
            style={{ animation: "marquee 40s linear infinite", willChange: "transform" }}
            className="flex"
          >
            {row.map((tech, i) => (
              <TechCard key={`r-${i}`} {...tech} />
            ))}
          </div>
        </div>
      </div>

      {/* Projetos em andamento */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          className="mb-10 md:mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-violet-600 dark:text-violet-400 text-xs tracking-widest uppercase mb-3">
            {tProjects.eyebrow}
          </p>
          <h3 className="font-mono text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
            {tProjects.title}
          </h3>
          <p className="font-sans text-base text-zinc-700 dark:text-zinc-300">
            {tProjects.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tProjects.items.map(({ title, description, badge }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative flex flex-col p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm hover:border-violet-500 dark:hover:border-violet-700 transition-colors duration-300"
            >
              {/* Indicador pulsante */}
              <div className="absolute top-4 right-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pulseColors[i]} opacity-50`} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${pulseColors[i]}`} />
                </span>
              </div>

              {/* Badge(s) de status */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono border ${badgeStyles[i]}`}>
                  {badge}
                </span>
                {i === 0 && (
                  <span className="text-green-400 font-mono text-xs animate-pulse">● LIVE</span>
                )}
              </div>

              <h3 className="font-mono text-zinc-900 dark:text-white font-semibold text-base mb-2 pr-6">
                {title}
              </h3>
              <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 flex-1">
                {description}
              </p>

              {/* Stack chips */}
              <div className="flex flex-wrap gap-2">
                {(stacks[i] as readonly string[]).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                  >
                    {tech}
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
