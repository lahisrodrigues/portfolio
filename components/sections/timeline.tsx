"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const icons = [GraduationCap, Briefcase, Briefcase] as const;

export default function Timeline() {
  const { lang } = useLanguage();
  const t = translations[lang].timeline;

  return (
    <section
      id="trajetoria"
      className="relative pt-8 pb-20 md:pt-12 md:pb-32 px-4 md:px-8 lg:px-16"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="mb-12 md:mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
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
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-blue-500/20 left-5 md:left-1/2 md:-translate-x-px"
            aria-hidden="true"
          />

          <div className="space-y-10 md:space-y-14">
            {t.items.map(({ year, title }, i) => {
              const Icon = icons[i] ?? Briefcase;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={year}
                  className={`relative flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="absolute left-3.5 md:left-1/2 top-2.5 w-3.5 h-3.5 rounded-full bg-[#3b82f6] border-2 border-white dark:border-[#0a0f1e] md:-translate-x-[7px] z-10 shrink-0" />

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
                      <span className="font-mono text-xs font-bold tracking-widest text-[#3b82f6]">
                        {year}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/30 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-[#3b82f6]" />
                      </div>
                    </div>
                    <h3 className="font-mono text-zinc-900 dark:text-white font-semibold text-base md:text-lg break-words">
                      {title}
                    </h3>
                  </div>

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
