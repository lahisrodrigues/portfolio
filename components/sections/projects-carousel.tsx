"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, Globe, Smartphone, X, Images } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

interface ProjectMeta {
  images: (string | null)[];
  link: string | null;
  stack: string[];
  isLive: boolean;
  gradientFrom: string;
  gradientTo: string;
  Icon: typeof Globe;
}

const projectMeta: ProjectMeta[] = [
  {
    images: ["/projects/landingpageJulie.png"],
    link: "https://psijuliedelazari.vercel.app/",
    stack: ["Next.js", "Tailwind CSS"],
    isLive: true,
    gradientFrom: "#312e81",
    gradientTo: "#1e3a8a",
    Icon: Globe,
  },
  {
    images: [
      "/projects/loginPWANail.png",
      "/projects/dashboardPWANail.png",
      "/projects/agendamentosPWANail.png",
      "/projects/clientesPWANail.png",
      "/projects/servicosPWANail.png",
    ],
    link: null,
    stack: ["Next.js", "TypeScript", "PWA"],
    isLive: false,
    gradientFrom: "#881337",
    gradientTo: "#86198f",
    Icon: Smartphone,
  },
  {
    images: [null],
    link: null,
    stack: ["Next.js", "Tailwind CSS"],
    isLive: false,
    gradientFrom: "#4c1d95",
    gradientTo: "#1e1b4b",
    Icon: Globe,
  },
];

const badgeStyles = [
  "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800",
  "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
  "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700",
];

export default function ProjectsCarousel() {
  const { lang } = useLanguage();
  const tProjects = translations[lang].upcomingProjects;

  const [lightbox, setLightbox] = useState(false);
  const [lightboxProject, setLightboxProject] = useState(0);
  const [lightboxImgIndex, setLightboxImgIndex] = useState(0);
  const [imgDirection, setImgDirection] = useState(0);

  const lbMeta = projectMeta[lightboxProject];
  const lbTotal = lbMeta.images.length;
  const lbHasMultiple = lbTotal > 1;
  const lbCurrentImage = lbMeta.images[lightboxImgIndex];

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") goImg(1);
      if (e.key === "ArrowLeft") goImg(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const openLightbox = (projectIdx: number, imgIdx = 0) => {
    setLightboxProject(projectIdx);
    setLightboxImgIndex(imgIdx);
    setImgDirection(0);
    setLightbox(true);
  };

  const goImg = useCallback((dir: number) => {
    setImgDirection(dir);
    setLightboxImgIndex(i => (i + dir + lbTotal) % lbTotal);
  }, [lbTotal]);

  const goImgTo = (i: number) => {
    setImgDirection(i > lightboxImgIndex ? 1 : -1);
    setLightboxImgIndex(i);
  };

  return (
    <>
      <section
        id="projetos"
        className="relative py-20 md:py-28 overflow-hidden bg-[#f8faff] dark:bg-[#050a14]"
      >
        {/* Spotlight do topo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(59,130,246,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 dark:block hidden"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(59,130,246,0.28) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 lg:px-16">
          {/* Header */}
          <motion.div
            className="text-center mb-12 md:mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-sky-600 dark:text-sky-400 text-xs tracking-widest uppercase mb-3">
              {tProjects.eyebrow}
            </p>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
              {tProjects.title}
            </h2>
            <p className="font-sans text-base text-zinc-600 dark:text-zinc-300 mt-3">
              {tProjects.subtitle}
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {tProjects.items.map((project, i) => {
              const meta = projectMeta[i];
              const { Icon } = meta;
              const firstImage = meta.images[0];
              const hasMultiple = meta.images.filter(Boolean).length > 1;

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0f1e] overflow-hidden hover:border-[#3b82f6]/50 hover:shadow-lg hover:shadow-[#3b82f6]/8 transition-all duration-300"
                >
                  {/* Image area */}
                  <div
                    className={`relative aspect-video overflow-hidden ${firstImage ? "cursor-pointer" : ""}`}
                    onClick={() => firstImage && openLightbox(i, 0)}
                    style={{
                      background: `linear-gradient(135deg, ${meta.gradientFrom}, ${meta.gradientTo})`,
                    }}
                  >
                    {firstImage ? (
                      <Image
                        src={firstImage}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        draggable={false}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon size={40} strokeWidth={1} className="text-white/20" />
                      </div>
                    )}

                    {/* Multiple images badge */}
                    {hasMultiple && firstImage && (
                      <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
                        <Images size={11} className="text-white/80" />
                        <span className="font-mono text-[10px] text-white/80">
                          {meta.images.filter(Boolean).length}
                        </span>
                      </div>
                    )}

                    <span className="absolute bottom-2 left-3 font-mono text-5xl font-black text-white/10 leading-none select-none pointer-events-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`font-mono text-xs px-2 py-0.5 ${badgeStyles[i]}`}>
                        {project.badge}
                      </span>
                      {meta.isLive && (
                        <span className="font-mono text-xs text-green-500 flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                          </span>
                          LIVE
                        </span>
                      )}
                    </div>

                    <h3 className="font-mono text-base md:text-lg font-bold text-zinc-900 dark:text-white mb-2 leading-snug">
                      {project.title}
                    </h3>

                    <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {meta.stack.map(tech => (
                        <span key={tech} className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
                          #{tech.toLowerCase().replace(/[\s.]/g, "")}
                        </span>
                      ))}
                    </div>

                    {meta.link ? (
                      <a
                        href={meta.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 border border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white transition-all duration-200 self-start"
                      >
                        {lang === "pt" ? "Ver projeto" : "View project"}
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="inline-flex items-center font-mono text-xs px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-400 dark:text-zinc-600 cursor-not-allowed select-none self-start">
                        {lang === "pt" ? "Em breve" : "Coming soon"}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setLightbox(false)}
            />

            <motion.div
              className="relative z-10 w-full max-w-5xl"
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.x > 60) goImg(-1);
                else if (info.offset.x < -60) goImg(1);
              }}
            >
              <AnimatePresence mode="wait" custom={imgDirection}>
                <motion.div
                  key={lightboxImgIndex}
                  custom={imgDirection}
                  initial={{ opacity: 0, x: imgDirection * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: imgDirection * -40 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="relative w-full"
                  style={{ aspectRatio: "16/9" }}
                >
                  {lbCurrentImage && (
                    <Image
                      src={lbCurrentImage}
                      alt={`${tProjects.items[lightboxProject].title} — foto ${lightboxImgIndex + 1}`}
                      fill
                      className="object-contain rounded-lg"
                      draggable={false}
                      sizes="100vw"
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="font-mono text-xs text-white/50">
                  {tProjects.items[lightboxProject].title}
                </span>
                {lbHasMultiple && (
                  <span className="font-mono text-xs text-white/30">
                    — {lightboxImgIndex + 1}/{lbTotal}
                  </span>
                )}
              </div>
            </motion.div>

            <button
              onClick={() => setLightbox(false)}
              aria-label="Fechar"
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            {lbHasMultiple && (
              <>
                <button
                  onClick={() => goImg(-1)}
                  aria-label="Imagem anterior"
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => goImg(1)}
                  aria-label="Próxima imagem"
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {lbHasMultiple && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {lbMeta.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goImgTo(i)}
                    aria-label={`Foto ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === lightboxImgIndex ? "bg-white w-6" : "bg-white/30 w-2 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
