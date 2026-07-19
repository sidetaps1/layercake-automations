import { useEffect, useRef } from "react";

/**
 * Modern cursor spotlight — an Aurora-themed layered radial glow
 * that follows the mouse and dynamically lights the background.
 */
export function CursorTrail() {
  const coreRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const core = coreRef.current;
    const glow = glowRef.current;
    const aura = auraRef.current;
    if (!core || !glow || !aura) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    
    let coreX = targetX;
    let coreY = targetY;
    let glowX = targetX;
    let glowY = targetY;
    let auraX = targetX;
    let auraY = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    let raf = 0;
    const tick = () => {
      // Core tracks very closely
      coreX += (targetX - coreX) * 0.35;
      coreY += (targetY - coreY) * 0.35;
      
      // Glow tracks moderately fast
      glowX += (targetX - glowX) * 0.18;
      glowY += (targetY - glowY) * 0.18;
      
      // Ambient aura drifts more slowly for a layered, fluid feel
      auraX += (targetX - auraX) * 0.06;
      auraY += (targetY - auraY) * 0.06;

      core.style.transform = `translate3d(${coreX}px, ${coreY}px, 0) translate(-50%, -50%)`;
      glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
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
      {/* Large ambient aura — slow-moving, wide deep violet/magenta */}
      <div
        ref={auraRef}
        className="absolute left-0 top-0 h-[1000px] w-[1000px] rounded-full opacity-60 mix-blend-screen blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.5 0.25 310 / 0.35) 0%, oklch(0.5 0.25 310 / 0.15) 30%, transparent 65%)",
        }}
      />
      {/* Mid glow — moderately-paced vibrant cyan */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full opacity-80 mix-blend-screen blur-2xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.7 0.2 240 / 0.5) 0%, oklch(0.7 0.2 240 / 0.2) 35%, transparent 70%)",
        }}
      />
      {/* Core spark — tight, bright white/cyan tracking quickly */}
      <div
        ref={coreRef}
        className="absolute left-0 top-0 h-[150px] w-[150px] rounded-full opacity-90 mix-blend-screen blur-xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.95 0.05 240 / 0.8) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}
