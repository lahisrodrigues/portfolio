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

const row1 = [...techs, ...techs];
const row2 = [...techs, ...techs];

function TechCard({ name, symbol }: { name: string; symbol: string }) {
  return (
    <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-6 py-4 mx-3 shrink-0">
      <span className="font-mono text-base text-violet-600 dark:text-violet-400 w-7 text-center leading-none select-none">
        {symbol}
      </span>
      <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function TechStack() {
  const { lang } = useLanguage();
  const t = translations[lang].stack;

  return (
    <section id="stack" className="py-20 md:py-32 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
      {/* Título */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16 mb-12 md:mb-14">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm text-zinc-400 dark:text-zinc-600 mb-2">{t.comment}</p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
            {t.title}
          </h2>
        </motion.div>
      </div>

      {/* Carrossel */}
      <div className="relative">
        {/* Fades laterais */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none" />

        {/* Linha 1 — direita para esquerda */}
        <div className="flex overflow-hidden mb-4">
          <div
            style={{ animation: "marquee 25s linear infinite", willChange: "transform" }}
            className="flex"
          >
            {row1.map((tech, i) => (
              <TechCard key={`r1-${i}`} {...tech} />
            ))}
          </div>
        </div>

        {/* Linha 2 — esquerda para direita */}
        <div className="flex overflow-hidden">
          <div
            style={{ animation: "marquee-reverse 25s linear infinite", willChange: "transform" }}
            className="flex"
          >
            {row2.map((tech, i) => (
              <TechCard key={`r2-${i}`} {...tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
