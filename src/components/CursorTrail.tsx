import { useEffect, useRef } from "react";

/**
 * Soft cursor spotlight, à la Antigravity — a large, eased radial glow
 * that follows the mouse and gently lights the background.
 */
export function CursorTrail() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const aura = auraRef.current;
    if (!glow || !aura) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let auraX = targetX;
    let auraY = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    let raf = 0;
    const tick = () => {
      // Tight glow follows quickly
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      // Ambient aura drifts more slowly for a layered feel
      auraX += (targetX - auraX) * 0.06;
      auraY += (targetY - auraY) * 0.06;

      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Large ambient aura — subtle, colors the background */}
      <div
        ref={auraRef}
        className="absolute left-0 top-0 h-[900px] w-[900px] rounded-full opacity-60 mix-blend-screen blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.14 75 / 0.28) 0%, oklch(0.62 0.14 75 / 0.10) 30%, transparent 65%)",
        }}
      />
      {/* Tighter, brighter core glow */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[380px] w-[380px] rounded-full opacity-80 mix-blend-screen blur-2xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.88 0.09 88 / 0.45) 0%, oklch(0.82 0.13 85 / 0.20) 35%, transparent 70%)",
        }}
      />
    </div>
  );
}
