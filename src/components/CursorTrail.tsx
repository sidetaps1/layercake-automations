import { useEffect, useRef } from "react";

/**
 * CursorTrail — accent-colored spotlight that follows the mouse.
 *
 * Features:
 * - Three-layer lerp (core ring, mid glow, ambient aura)
 * - Violet/indigo gradient to match modern theme
 * - Scales up when hovering interactive elements
 * - mix-blend-mode: screen for intentional feel
 * - Disabled on touch devices & prefers-reduced-motion
 * - pointer-events: none — never blocks clicks
 */
export function CursorTrail() {
  const coreRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const scaleRef = useRef(1);

  useEffect(() => {
    // Disable on touch-only devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    // Disable if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const core = coreRef.current;
    const glow = glowRef.current;
    const aura = auraRef.current;
    if (!core || !glow || !aura) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    let coreX = targetX, coreY = targetY;
    let glowX = targetX, glowY = targetY;
    let auraX = targetX, auraY = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onEnterInteractive = () => {
      scaleRef.current = 1.8;
    };
    const onLeaveInteractive = () => {
      scaleRef.current = 1;
    };

    // Attach scale listeners to all interactive elements
    const interactive = document.querySelectorAll("a, button, [role='button'], input, label, select, textarea");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    let raf = 0;
    const tick = () => {
      const s = scaleRef.current;

      // Core: fast tracking, tight
      coreX += (targetX - coreX) * 0.3;
      coreY += (targetY - coreY) * 0.3;

      // Glow: moderate
      glowX += (targetX - glowX) * 0.14;
      glowY += (targetY - glowY) * 0.14;

      // Aura: slow drift
      auraX += (targetX - auraX) * 0.055;
      auraY += (targetY - auraY) * 0.055;

      core.style.transform = `translate3d(${coreX}px, ${coreY}px, 0) translate(-50%, -50%) scale(${s})`;
      glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%) scale(${s * 0.85})`;
      aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) translate(-50%, -50%)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* Large ambient aura — slow drift, wide violet */}
      <div
        ref={auraRef}
        className="absolute left-0 top-0 h-[900px] w-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.12) 0%, rgba(79,140,255,0.06) 35%, transparent 65%)",
          mixBlendMode: "screen",
          filter: "blur(60px)",
          opacity: 0.7,
        }}
      />
      {/* Mid glow — moderately-paced indigo */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[380px] w-[380px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.22) 0%, rgba(79,140,255,0.1) 40%, transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(28px)",
          opacity: 0.85,
          transition: "transform 0.15s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      {/* Core ring — tight, bright, tracks quickly */}
      <div
        ref={coreRef}
        className="absolute left-0 top-0 h-[100px] w-[100px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(169,139,255,0.5) 0%, rgba(124,92,255,0.15) 50%, transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(8px)",
          opacity: 0.9,
          transition: "transform 0.1s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}
