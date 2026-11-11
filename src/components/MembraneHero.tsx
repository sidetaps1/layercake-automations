import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Vertex {
  x: number;
  y: number;
  restX: number;
  restY: number;
  vx: number;
  vy: number;
  offsetZ: number;
  velZ: number;
  col: number;
  row: number;
  centerFactor: number;
}

const COLS = 50;
const ROWS = 30;
const SPRING = 0.025;
const DAMPING = 0.93;
const SPREAD = 0.18;

export function MembraneHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const isMouseDownRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const cx = width / 2;
      const cy = height / 2;
      const maxDist = Math.hypot(cx, cy);

      vertices.forEach((v) => {
        v.restX = (v.col / (COLS - 1)) * width;
        v.restY = (v.row / (ROWS - 1)) * height;
        v.x = v.restX;
        v.y = v.restY;
        const dist = Math.hypot(v.restX - cx, v.restY - cy);
        v.centerFactor = Math.pow(Math.max(0, 1 - Math.min(1, (dist / maxDist) * 1.4)), 1.5);
      });
    };

    // Initialize vertices
    const vertices: Vertex[] = [];
    const cx = width / 2;
    const cy = height / 2;
    const maxDist = Math.hypot(cx, cy);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const restX = (c / (COLS - 1)) * width;
        const restY = (r / (ROWS - 1)) * height;
        const dist = Math.hypot(restX - cx, restY - cy);
        const centerFactor = Math.pow(Math.max(0, 1 - Math.min(1, (dist / maxDist) * 1.4)), 1.5);

        vertices.push({
          x: restX,
          y: restY,
          restX,
          restY,
          vx: 0,
          vy: 0,
          offsetZ: 0,
          velZ: 0,
          col: c,
          row: r,
          centerFactor,
        });
      }
    }

    const velZBuffer = new Float32Array(COLS * ROWS);

    // Initial sizing
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Canvas GSAP entrance fade-in
    gsap.fromTo(
      canvas,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.inOut" }
    );

    // Content GSAP staggered reveal
    if (contentRef.current) {
      const revealElements = contentRef.current.querySelectorAll("[data-reveal]");
      if (revealElements.length > 0) {
        gsap.fromTo(
          revealElements,
          {
            opacity: 0,
            y: 30,
            scale: 0.94,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
            stagger: 0.13,
            delay: 0.5,
          }
        );
      }
    }

    // Animation physics & render loop
    const render = () => {
      const time = performance.now() * 0.001;
      const isPressing = isMouseDownRef.current;
      const radius = isPressing ? 200 : 130;
      const forceStrength = isPressing ? 30 : 15;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouse = mx !== -9999 && my !== -9999;

      const currentCx = width / 2;
      const currentCy = height / 2;
      const zoneW = width * 0.35;
      const zoneH = height * 0.35;

      // 1. Ambient breathing & Cursor interaction & Spring return & Damping
      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];

        // Breathing animation
        const breathe = Math.sin(time * 0.6 + v.col * 0.15 + v.row * 0.12) * 2;
        v.velZ += (breathe - v.offsetZ) * 0.002;

        // Cursor force
        if (hasMouse) {
          const sx = v.x;
          const sy = v.y - v.offsetZ * 0.3;
          const dx = sx - mx;
          const dy = sy - my;
          const dist = Math.hypot(dx, dy);

          if (dist < radius && dist > 0.01) {
            const proximity = 1 - dist / radius;
            const force = proximity * forceStrength;
            v.velZ += force * 0.4;
            v.vx += (dx / dist) * force * 0.12;
            v.vy += (dy / dist) * force * 0.12;
          }
        }

        // Spring return
        v.vx += (v.restX - v.x) * SPRING;
        v.vy += (v.restY - v.y) * SPRING;
        v.velZ -= v.offsetZ * SPRING * 1.5;

        // Damping
        v.vx *= DAMPING;
        v.vy *= DAMPING;
        v.velZ *= DAMPING;

        // Update positions
        v.x += v.vx;
        v.y += v.vy;
        v.offsetZ += v.velZ;
      }

      // 2. Wave propagation across 4 direct neighbors
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          const v = vertices[idx];
          let diffSum = 0;
          let neighbors = 0;

          if (r > 0) {
            diffSum += vertices[(r - 1) * COLS + c].offsetZ - v.offsetZ;
            neighbors++;
          }
          if (r < ROWS - 1) {
            diffSum += vertices[(r + 1) * COLS + c].offsetZ - v.offsetZ;
            neighbors++;
          }
          if (c > 0) {
            diffSum += vertices[r * COLS + (c - 1)].offsetZ - v.offsetZ;
            neighbors++;
          }
          if (c < COLS - 1) {
            diffSum += vertices[r * COLS + (c + 1)].offsetZ - v.offsetZ;
            neighbors++;
          }

          velZBuffer[idx] = neighbors > 0 ? (diffSum / neighbors) * SPREAD : 0;
        }
      }

      for (let i = 0; i < vertices.length; i++) {
        vertices[i].velZ += velZBuffer[i];
      }

      // 3. Render Canvas
      ctx.save();
      ctx.scale(dpr, dpr);

      // Section background #08080a
      ctx.fillStyle = "#08080a";
      ctx.fillRect(0, 0, width, height);

      // Lines
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.018)";
      ctx.lineWidth = 0.5;

      // Horizontal lines
      for (let r = 0; r < ROWS; r++) {
        const startIdx = r * COLS;
        const first = vertices[startIdx];
        ctx.moveTo(first.x, first.y - first.offsetZ * 0.3);
        for (let c = 1; c < COLS; c++) {
          const v = vertices[startIdx + c];
          ctx.lineTo(v.x, v.y - v.offsetZ * 0.3);
        }
      }

      // Vertical lines
      for (let c = 0; c < COLS; c++) {
        const first = vertices[c];
        ctx.moveTo(first.x, first.y - first.offsetZ * 0.3);
        for (let r = 1; r < ROWS; r++) {
          const v = vertices[r * COLS + c];
          ctx.lineTo(v.x, v.y - v.offsetZ * 0.3);
        }
      }
      ctx.stroke();

      // Vertices rendering
      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];
        const sx = v.x;
        const sy = v.y - v.offsetZ * 0.3;
        const cf = v.centerFactor;

        const dx = v.x - v.restX;
        const dy = v.y - v.restY;
        const displacement = Math.sqrt(dx * dx + dy * dy + v.offsetZ * v.offsetZ);

        // Edge to center interpolation
        let r = 130 + (245 - 130) * cf;
        let g = 130 + (235 - 130) * cf;
        let b = 140 + (210 - 140) * cf;

        // Active vertices blend (displacement > 3)
        if (displacement > 3) {
          const activeFactor = Math.min(1, (displacement - 3) / 8);
          r += (255 - r) * activeFactor;
          g += (252 - g) * activeFactor;
          b += (245 - b) * activeFactor;
        }

        // Vertex size
        const size = 1 + cf * 1 + (displacement > 0.5 ? displacement * 0.05 : 0);

        // Vertex alpha
        const baseAlpha = 0.06 + cf * 0.18;
        const activeAlpha = displacement > 0.5 ? Math.min(0.9, displacement * 0.05) : 0;
        let alpha = Math.max(baseAlpha, activeAlpha);

        // Content Zone Dimming (when cursor is inside section)
        if (hasMouse) {
          const ex = (v.restX - currentCx) / zoneW;
          const ey = (v.restY - currentCy) / zoneH;
          const ellipseDist = ex * ex + ey * ey;
          if (ellipseDist < 1) {
            const dim = (1 - ellipseDist) * 0.7;
            alpha *= 1 - dim;
          }
        }

        const ir = Math.round(r);
        const ig = Math.round(g);
        const ib = Math.round(b);

        // Vertex Glow
        if (displacement > 1.5 || cf > 0.4) {
          ctx.beginPath();
          ctx.arc(sx, sy, size + 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ir}, ${ig}, ${ib}, ${(alpha * 0.15).toFixed(4)})`;
          ctx.fill();
        }

        // Vertex filled circle
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.6, size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ir}, ${ig}, ${ib}, ${alpha.toFixed(4)})`;
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    // Event handlers
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      setIsHovered(true);
    };

    const onMouseDown = (e: MouseEvent) => {
      isMouseDownRef.current = true;
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // Click impulse shockwave
      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];
        const sx = v.x;
        const sy = v.y - v.offsetZ * 0.3;
        const dx = sx - mx;
        const dy = sy - my;
        const dist = Math.hypot(dx, dy);
        if (dist < 200 && dist > 0.01) {
          const proximity = 1 - dist / 200;
          const force = proximity * 30;
          v.velZ += force * 0.5;
          v.vx += (dx / dist) * force * 0.14;
          v.vy += (dy / dist) * force * 0.14;
        }
      }
    };

    const onMouseUp = () => {
      isMouseDownRef.current = false;
    };

    const onMouseLeave = () => {
      isMouseDownRef.current = false;
      mouseRef.current = { x: -9999, y: -9999 };
      setIsHovered(false);
    };

    // Touch support for mobile devices
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
        setIsHovered(true);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isMouseDownRef.current = true;
        const rect = container.getBoundingClientRect();
        const mx = e.touches[0].clientX - rect.left;
        const my = e.touches[0].clientY - rect.top;
        mouseRef.current.x = mx;
        mouseRef.current.y = my;
        setIsHovered(true);

        for (let i = 0; i < vertices.length; i++) {
          const v = vertices[i];
          const sx = v.x;
          const sy = v.y - v.offsetZ * 0.3;
          const dx = sx - mx;
          const dy = sy - my;
          const dist = Math.hypot(dx, dy);
          if (dist < 200 && dist > 0.01) {
            const proximity = 1 - dist / 200;
            const force = proximity * 30;
            v.velZ += force * 0.5;
            v.vx += (dx / dist) * force * 0.14;
            v.vy += (dy / dist) * force * 0.14;
          }
        }
      }
    };

    const onTouchEnd = () => {
      isMouseDownRef.current = false;
      mouseRef.current = { x: -9999, y: -9999 };
      setIsHovered(false);
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const avatars = [
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/75.jpg",
    "https://randomuser.me/api/portraits/women/90.jpg",
  ];

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative flex h-screen min-h-screen w-full items-center justify-center overflow-hidden select-none"
      style={{
        background: "#08080a",
      }}
    >
      {/* Mesh Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Centered Content Layer */}
      <div
        ref={contentRef}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center px-6 text-center pointer-events-none"
      >
        {/* Award Badge */}
        <div
          data-reveal
          className="inline-flex items-center justify-center"
        >
          <img
            src="/left-award-symbol.svg"
            alt=""
            aria-hidden="true"
            className="h-[56px] w-[36px] -mr-[15px] select-none pointer-events-none md:h-[68px] md:w-[44px]"
            style={{ filter: "invert(1) opacity(0.4)" }}
          />
          <div className="z-10 flex flex-col items-center justify-center">
            <span
              className="text-[11px] font-bold tracking-wide text-white/55 md:text-[13px]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              #1 Interactive Section
            </span>
            <div className="mt-1 flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg
                  key={i}
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="rgba(255,255,255,0.3)"
                  aria-hidden="true"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </div>
          </div>
          <img
            src="/right-award-symbol.svg"
            alt=""
            aria-hidden="true"
            className="h-[56px] w-[36px] -ml-[15px] select-none pointer-events-none md:h-[68px] md:w-[44px]"
            style={{ filter: "invert(1) opacity(0.4)" }}
          />
        </div>

        {/* Title */}
        <h1
          data-reveal
          className="mt-7 font-medium text-white tracking-[-0.02em] leading-none select-text"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(3.2rem, 8vw, 6.5rem)",
          }}
        >
          Touch the{" "}
          <span className="inline-block cursor-default text-white/40 transition-colors duration-500 hover:text-white pointer-events-auto">
            invisible
          </span>
        </h1>

        {/* Subtitle */}
        <p
          data-reveal
          className="mx-auto mt-5 max-w-[24rem] text-[14px] leading-relaxed text-white/25 select-text"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          A living surface that responds to your presence. Move your cursor. Click to press deeper.
        </p>

        {/* Buttons */}
        <div
          data-reveal
          className="mt-8 flex items-center justify-center gap-3"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          <a
            href="#services"
            className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-white px-[28px] py-[10px] text-[13px] font-medium text-[#08080a] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            Get this section
          </a>
          <a
            href="#workflow-test"
            className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-[#18181b] border border-white/10 px-[28px] py-[10px] text-[13px] font-medium text-white/50 transition-all duration-200 hover:border-white/20 hover:text-white/70"
          >
            View code
          </a>
        </div>

        {/* Social Proof */}
        <div
          data-reveal
          className="mt-9 flex items-center justify-center gap-3"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          <div className="flex -space-x-2">
            {avatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Member avatar"
                className="h-[28px] w-[28px] rounded-full border-[1.5px] border-[#08080a] object-cover"
                loading="lazy"
              />
            ))}
          </div>
          <span className="text-[12px] font-normal text-white/35">
            <span className="font-medium text-white/50">2,400+</span> creators joined
          </span>
        </div>
      </div>
    </section>
  );
}

