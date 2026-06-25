"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, MessageCircle, Target } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const cardIcons = [Zap, MessageCircle, Target] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const t = translations[lang].whyHireMe;
  const isLight = mounted && resolvedTheme === "light";

  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      id="sobre"
      className="relative min-h-screen flex items-center py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden bg-[#e0f2fe] dark:bg-[#0a0f1e]"
    >
      {/* GIF de fundo */}
      <Image
        src="/hero-illustration.gif"
        alt=""
        fill
        unoptimized
        className="object-cover pointer-events-none select-none"
        style={{ opacity: isLight ? 0.40 : 0.22 }}
        aria-hidden="true"
      />

      {/* Overlay — mesma paleta da matrix */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isLight
            ? "linear-gradient(to bottom, rgba(224,242,254,0.75), rgba(224,242,254,0.70), rgba(224,242,254,0.75))"
            : "linear-gradient(to bottom, rgba(10,15,30,0.75), rgba(10,15,30,0.65), rgba(10,15,30,0.75))",
        }}
        aria-hidden="true"
      />

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div
          className="mb-12 md:mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-brand dark:text-blue-400 text-xs tracking-widest uppercase mb-3">
            {t.eyebrow}
          </p>
          <h2
            className="font-mono text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
            style={{ textShadow: isLight ? "none" : "0 2px 12px rgba(0,0,0,0.8)" }}
          >
            {t.title}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
        >
          {t.cards.map(({ title, description }, i) => {
            const Icon = cardIcons[i];
            return (
              <motion.div
                key={title}
                variants={item}
                className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0f] hover:border-[#3b82f6]/50 transition-colors duration-300 w-full shadow-sm dark:shadow-none"
              >
                {/* Header terminal */}
                <div className="flex items-center justify-between px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 rounded-full bg-green-500/60" />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-600">bash — lais@dev</span>
                  <span className="font-mono text-[10px] text-[#3b82f6]/70">0{i + 1}</span>
                </div>
                {/* Corpo terminal */}
                <div className="p-4 font-mono text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <span className="text-green-400">❯</span>
                    <span className="text-[#3b82f6]">{lang === "pt" ? "./motivo" : "./reason"}</span>
                    <span className="text-yellow-300">0{i + 1}</span>
                    <span className="text-zinc-600">--exec</span>
                  </div>
                  <div className="flex items-center gap-2 py-0.5">
                    <Icon size={14} className="text-[#3b82f6] shrink-0" />
                    <span className="font-mono text-zinc-900 dark:text-white font-bold text-sm">{title}</span>
                  </div>
                  <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800 text-zinc-500 leading-relaxed text-[11px]">
                    {description}
                  </div>
                  <div className="flex items-center gap-1.5 text-green-400 pt-1 text-[10px]">
                    <span>✓</span>
                    <span>{lang === "pt" ? "concluído" : "done"}</span>
                    <span className="text-zinc-700 ml-1">exit 0</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
