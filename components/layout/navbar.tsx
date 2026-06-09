"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].navbar;

  const navLinks = [
    { label: t.about, href: "#sobre" },
    { label: t.stack, href: "#stack" },
    { label: t.projects, href: "#projetos" },
    { label: t.contact, href: "#contato" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!langOpen) return;
    function handleMousedown(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  }, [langOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={close}
            className="text-zinc-900 dark:text-white font-bold text-base md:text-lg hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300 ease-in-out z-50 relative"
          >
            Lais Rodrigues
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 ease-in-out px-2"
              >
                {label}
              </a>
            ))}

            <button
              onClick={() => setTheme("light")}
              className="hidden dark:flex p-2 rounded-lg text-zinc-300 hover:text-white transition-all duration-300 ease-in-out"
              aria-label="Mudar para modo claro"
            >
              <Sun size={18} />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className="flex dark:hidden p-2 rounded-lg text-zinc-700 hover:text-zinc-900 transition-all duration-300 ease-in-out"
              aria-label="Mudar para modo escuro"
            >
              <Moon size={18} />
            </button>

            {/* Language dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 ease-in-out"
              >
                {lang.toUpperCase()}
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden shadow-lg min-w-[80px]">
                  {(["pt", "en"] as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setLangOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-mono transition-colors ${
                        lang === l
                          ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#contato"
              className="px-4 py-2 text-sm bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out"
            >
              {t.cta}
            </a>
          </div>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => setTheme("light")}
              className="hidden dark:flex p-2 text-zinc-300 hover:text-white transition-all duration-300 ease-in-out"
              aria-label="Mudar para modo claro"
            >
              <Sun size={18} />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className="flex dark:hidden p-2 text-zinc-700 hover:text-zinc-900 transition-all duration-300 ease-in-out"
              aria-label="Mudar para modo escuro"
            >
              <Moon size={18} />
            </button>

            <button
              className="relative z-50 p-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 ease-in-out"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Drawer mobile com AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              className="absolute top-16 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-200 dark:border-zinc-800 px-4 pb-6 pt-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={close}
                    className="py-3.5 px-2 text-zinc-700 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400 font-medium border-b border-zinc-200 dark:border-zinc-800 last:border-0 transition-all duration-300 ease-in-out"
                  >
                    {label}
                  </a>
                ))}

                {/* Language toggle mobile */}
                <div className="flex gap-2 pt-4 pb-2">
                  {(["pt", "en"] as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`flex-1 py-2 rounded-lg text-sm font-mono font-medium transition-all duration-300 ease-in-out ${
                        lang === l
                          ? "bg-violet-600 text-white"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>

                <a
                  href="#contato"
                  onClick={close}
                  className="mt-2 py-3.5 text-center bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out"
                >
                  {t.cta}
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
