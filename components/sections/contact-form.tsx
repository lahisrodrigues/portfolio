"use client";

import { useTransition, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { sendContactEmail } from "@/app/actions";
import type { ContactFormData, ActionResult } from "@/types";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const emptyForm: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [form, setForm] = useState<ContactFormData>(emptyForm);
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    startTransition(async () => {
      const res = await sendContactEmail(form);
      setResult(res);
      if (res.success) setForm(emptyForm);
    });
  }

  const inputClass =
    "w-full min-w-0 max-w-full px-4 py-3 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 font-sans text-sm md:text-base";

  return (
    <section
      id="contato"
      className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden bg-white dark:bg-zinc-950"
    >
      {/* Imagem de fundo — lazy load pois está abaixo da dobra */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/contact-bg.jpg')" }}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-zinc-50/[0.88] via-zinc-50/70 to-zinc-50/[0.88] dark:from-zinc-950/90 dark:via-zinc-950/75 dark:to-zinc-950/90 pointer-events-none"
        aria-hidden="true"
      />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-2xl mx-auto w-full">
        <motion.div
          className="mb-10 md:mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-brand dark:text-blue-400 text-xs tracking-widest uppercase mb-3">
            {t.eyebrow}
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3 drop-shadow-[0_0_20px_rgba(35,35,255,0.15)]">
            {t.title}
          </h2>
          <p className="font-sans text-base text-zinc-700 dark:text-zinc-300">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md p-6 md:p-8 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="min-w-0">
                <label
                  htmlFor="name"
                  className="block font-mono text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  {t.name}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  disabled={isPending}
                  className={inputClass}
                />
              </div>
              <div className="min-w-0">
                <label
                  htmlFor="email"
                  className="block font-mono text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  {t.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  disabled={isPending}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block font-mono text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                {t.subject}
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={handleChange}
                placeholder={t.subjectPlaceholder}
                disabled={isPending}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-mono text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                {t.message}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder={t.messagePlaceholder}
                disabled={isPending}
                className={`${inputClass} resize-none`}
              />
            </div>

            {result && !result.success && (
              <div className="flex items-start gap-2 p-3.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 text-sm font-sans">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                {result.error}
              </div>
            )}

            {result?.success && (
              <div className="flex items-center gap-2 p-3.5 rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-sans">
                <CheckCircle2 size={16} className="shrink-0" />
                {t.success}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand hover:bg-blue-500 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-sans font-semibold rounded-lg transition-colors duration-200"
            >
              {isPending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {t.submitting}
                </>
              ) : (
                <>
                  <Send size={18} />
                  {t.submit}
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
