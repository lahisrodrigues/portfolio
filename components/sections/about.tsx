"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, MessageCircle, Target } from "lucide-react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const { lang } = useLanguage();
  const t = translations[lang].whyHireMe;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      id="sobre"
      className="relative min-h-screen flex items-center py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden bg-zinc-100 dark:bg-zinc-900"
    >
      {/* Vídeo */}
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
        <source src="/about-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-zinc-50/92 via-zinc-50/75 to-zinc-50/92 dark:from-zinc-950/98 dark:via-zinc-950/92 dark:to-zinc-950/98 pointer-events-none"
        aria-hidden="true"
      />

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
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
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {t.cards.map(({ title, description }, i) => {
            const Icon = cardIcons[i];
            return (
              <motion.div
                key={title}
                variants={item}
                className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-md hover:border-violet-500 dark:hover:border-violet-700 transition-colors duration-300 w-full"
              >
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
    </section>
  );
}
