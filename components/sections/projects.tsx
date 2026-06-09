"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, FileText, Code2, Rocket } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const stepIcons = [MessageSquare, FileText, Code2, Rocket] as const;
const stepNums = ["01", "02", "03", "04"] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Projects() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { lang } = useLanguage();
  const t = translations[lang].howIWork;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      id="projetos"
      className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden bg-zinc-50 dark:bg-zinc-950"
    >
      {/* Vídeo de fundo */}
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
        <source src="/contact-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-zinc-50/95 via-zinc-50/88 to-zinc-50/95 dark:from-zinc-950/96 dark:via-zinc-950/90 dark:to-zinc-950/96 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          className="mb-12 md:mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-violet-600 dark:text-violet-400 text-xs tracking-widest uppercase mb-3">
            {t.eyebrow}
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="font-sans text-base text-zinc-700 dark:text-zinc-300">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Grid de etapas com linha conectora */}
        <div className="relative">
          {/* Linha pontilhada conectora — apenas desktop 4 colunas */}
          <div
            className="hidden lg:block absolute border-t-2 border-dashed border-violet-500/20 pointer-events-none z-0"
            style={{ top: "5rem", left: "12.5%", right: "12.5%" }}
          />

          <motion.div
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t.steps.map(({ title, description }, i) => {
              const Icon = stepIcons[i];
              const num = stepNums[i];
              return (
                <motion.div
                  key={title}
                  variants={item}
                  className="relative flex flex-col p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm hover:border-violet-500 dark:hover:border-violet-700 transition-colors duration-300"
                >
                  {/* Número decorativo */}
                  <span className="font-mono text-4xl font-bold text-violet-500/20 dark:text-violet-400/20 leading-none select-none mb-1">
                    {num}
                  </span>

                  <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-950 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-violet-600 dark:text-violet-400" />
                  </div>

                  <h3 className="font-mono text-zinc-900 dark:text-white font-semibold text-lg mb-2">
                    {title}
                  </h3>
                  <p className="font-sans text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                    {description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
