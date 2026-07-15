import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const spawn = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 1.2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.3,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          size: 1 + Math.random() * 2.2,
          hue: 40 + Math.random() * 30,
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);
      if (now - lastTime < 16 && dist < 4) return;
      const count = Math.min(4, 1 + Math.floor(dist / 20));
      spawn(e.clientX, e.clientY, count);
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    };

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.008;
        p.vx *= 0.985;
        const t = p.life / p.maxLife;
        if (t >= 1) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = (1 - t) * 0.85;
        const size = p.size * (1 - t * 0.5);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 6);
        grad.addColorStop(0, `hsla(${p.hue}, 85%, 70%, ${alpha})`);
        grad.addColorStop(0.4, `hsla(${p.hue}, 75%, 55%, ${alpha * 0.4})`);
        grad.addColorStop(1, `hsla(${p.hue}, 70%, 40%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  );
}
