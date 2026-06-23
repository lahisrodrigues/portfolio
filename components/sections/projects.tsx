"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, FileText, Code2, Rocket } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const stepIcons = [MessageSquare, FileText, Code2, Rocket] as const;
const stepNums = ["01", "02", "03", "04"] as const;

const ticketStatusCls = [
  "text-sky-400 bg-sky-400/10 border-sky-400/20",
  "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "text-green-400 bg-green-400/10 border-green-400/20",
] as const;

function useCardTypewriter(text: string) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    function runCycle() {
      if (cancelled) return;
      setDisplayed("");
      setShowCursor(true);
      let i = 0;
      intervalId = setInterval(() => {
        if (cancelled) {
          if (intervalId) clearInterval(intervalId);
          return;
        }
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setShowCursor(false);
          const t1 = setTimeout(() => {
            if (cancelled) return;
            setDisplayed("");
            const t2 = setTimeout(() => {
              if (cancelled) return;
              runCycle();
            }, 500);
            timers.push(t2);
          }, 2000);
          timers.push(t1);
        }
      }, 80);
    }

    runCycle();

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      timers.forEach(clearTimeout);
    };
  }, [text]);

  return { displayed, showCursor };
}

function DevCardTitle({ text, color = "text-yellow-200" }: { text: string; color?: string }) {
  const { displayed, showCursor } = useCardTypewriter(text);
  return (
    <>
      <span className={color}>{displayed}</span>
      {showCursor && (
        <span className={`inline-block w-[1px] h-[0.8em] align-middle ml-0.5 animate-pulse ${color}`} style={{ background: "currentColor" }} />
      )}
    </>
  );
}

export default function Projects() {
  const { lang } = useLanguage();
  const t = translations[lang].howIWork;

  return (
    <section
      id="processo"
      className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="mb-12 md:mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[#3b82f6] dark:text-blue-400 text-xs tracking-widest uppercase mb-3">
            {t.eyebrow}
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="font-sans text-base text-zinc-700 dark:text-zinc-200">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="hidden lg:block absolute border-t-2 border-dashed border-[#3b82f6]/30 pointer-events-none z-0"
            style={{ top: "5rem", left: "12.5%", right: "12.5%", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.steps.map(({ title, description }, i) => {
              const Icon = stepIcons[i];
              const num = stepNums[i];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-lg bg-white dark:bg-[#0d1117] border border-zinc-200 dark:border-zinc-800 border-l-2 border-l-[#3b82f6] hover:border-zinc-300 dark:hover:border-zinc-700 hover:border-l-[#3b82f6] hover:shadow-lg hover:shadow-[#3b82f6]/10 transition-all duration-300 flex flex-col shadow-sm dark:shadow-none"
                >
                  {/* Header do ticket */}
                  <div className="px-4 pt-4 pb-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-600">#LR-{num}</span>
                      <span className="font-mono text-[10px] text-zinc-600 dark:text-zinc-700 bg-zinc-100 dark:bg-zinc-800/60 px-1.5 py-0.5 rounded">
                        P{i + 1}
                      </span>
                    </div>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${ticketStatusCls[i]}`}>
                      {t.statusLabels[i]}
                    </span>
                  </div>

                  {/* Corpo */}
                  <div className="p-4 flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-md bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={15} className="text-[#3b82f6]" />
                      </div>
                      <h3 className="font-sans font-bold text-zinc-900 dark:text-white text-base leading-snug pt-1">
                        {i === 2 ? (
                          <DevCardTitle text={title} color="text-zinc-900 dark:text-white" />
                        ) : title}
                      </h3>
                    </div>
                    <p className="text-zinc-500 text-[12px] leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="px-4 pb-4 flex items-center justify-between border-t border-zinc-200/60 dark:border-zinc-800/60 pt-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#3b82f6]/15 border border-[#3b82f6]/20 flex items-center justify-center">
                        <span className="font-mono text-[8px] text-[#3b82f6]">LR</span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-600">@laisrodrigues</span>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-700">{t.step} {num}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
