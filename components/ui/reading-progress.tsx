"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const total = scrollHeight - windowHeight;
      setProgress(total > 0 ? (scrollY / total) * 100 : 0);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
      <div
        className="h-1 bg-[#2323FF] transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
