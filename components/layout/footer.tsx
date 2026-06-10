"use client";

import { Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-700 dark:text-zinc-300">
        <p className="text-center sm:text-left">
          © {year} Lais Rodrigues —{" "}
          <span className="text-brand dark:text-blue-400">{t.open}</span>
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/lahisrodrigues"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Lais Rodrigues (@lahisrodrigues)"
            className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 ease-in-out"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/laisrodrigues07/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Lais Rodrigues"
            className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 ease-in-out"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
