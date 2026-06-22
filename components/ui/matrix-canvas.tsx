"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isLightRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  const isLight = mounted && resolvedTheme === "light";
  useEffect(() => { isLightRef.current = isLight; }, [isLight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const fontSize = 14;
    let drops: number[] = [];
    let speeds: number[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -100);
      speeds = Array.from({ length: cols }, () => 0.4 + Math.random() * 0.8);
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx || !canvas) return;
      const light = isLightRef.current;
      ctx.fillStyle = light ? "rgba(224,242,254,0.04)" : "rgba(10,15,30,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const opacity = light ? 0.35 + Math.random() * 0.55 : 0.1 + Math.random() * 0.7;
        ctx.fillStyle = `rgba(35,35,255,${opacity.toFixed(2)})`;
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speeds[i];
      }
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
