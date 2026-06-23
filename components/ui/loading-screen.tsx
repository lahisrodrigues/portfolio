"use client";

import { useEffect, useState } from "react";

const LETTERS = ["G", "N", "I", "D", "A", "O", "L"];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startedAt = Date.now();
    const MIN_MS = 3000;

    function dismiss() {
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 700);
      }, wait);
    }

    const handler = (e: MessageEvent) => {
      if (e.data?.type === "heroReady") dismiss();
    };
    window.addEventListener("message", handler);
    const fallback = setTimeout(dismiss, 8000);

    return () => {
      window.removeEventListener("message", handler);
      clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.7s ease",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      <div style={{ position: "relative", width: 600, height: 36, overflow: "visible" }}>
        {LETTERS.map((char, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              width: 20,
              height: 36,
              opacity: 0,
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: "36px",
              lineHeight: "36px",
              color: "#3b82f6",
              animation: "loaderMove 2s linear infinite",
              animationDelay: `${i * 0.2}s`,
              transform: "rotate(180deg)",
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
