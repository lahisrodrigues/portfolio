"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function Globe({
  size = 80,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 5.1;
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 5.1,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 8000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.14],
      markerColor: [0.14, 0.14, 1],
      glowColor: [0.1, 0.1, 1],
      markers: [
        { location: [-15.78, -47.93], size: 0.08 },
        { location: [-23.55, -46.63], size: 0.06 },
      ],
    });

    function animate() {
      phi += 0.003;
      globe.update({ phi });
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      globe.destroy();
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className={className}
    />
  );
}
