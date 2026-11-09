import { TrendingUp, Users, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const studies = [
  {
    metric: "+42%",
    numericPart: 42,
    suffix: "%",
    prefix: "+",
    title: "Close Rate Increase",
    client: "B2B SaaS Provider",
    desc: "Implemented an autonomous follow-up engine that nurtured dead leads over 90 days, recovering lost pipeline.",
    icon: TrendingUp,
  },
  {
    metric: "3.5x",
    numericPart: 3.5,
    suffix: "x",
    prefix: "",
    title: "Lead Volume",
    client: "Real Estate Brokerage",
    desc: "Replaced manual prospecting with an AI outbound system, generating consistent qualified appointments.",
    icon: Users,
  },
  {
    metric: "40hrs",
    numericPart: 40,
    suffix: "hrs",
    prefix: "",
    title: "Saved Weekly",
    client: "Marketing Agency",
    desc: "Automated client onboarding, data entry, and meeting scheduling into a single zero-touch workflow.",
    icon: Clock,
  },
];

function useCountUp(target: number, decimals = 0, triggered = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);
  const startTimeRef = useRef(0);
  const duration = 1600;

  useEffect(() => {
    if (!triggered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const start = performance.now();
    startTimeRef.current = start;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setValue(parseFloat((target * easeOut(progress)).toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [triggered, target, decimals]);

  return value;
}

function CountUpCard({
  study,
  index,
  triggered,
}: {
  study: (typeof studies)[0];
  index: number;
  triggered: boolean;
}) {
  const decimals = study.numericPart % 1 !== 0 ? 1 : 0;
  const countValue = useCountUp(study.numericPart, decimals, triggered);
  const Icon = study.icon;

  const displayValue = `${study.prefix}${countValue}${study.suffix}`;

  // Cursor-position border glow on each card
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", onMouseMove);
    return () => card.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className="card-glow group relative flex flex-col justify-between overflow-hidden rounded-[20px] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(124,92,255,0.3)]"
      style={{
        background: "rgba(17,17,19,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        animationDelay: `${index * 120}ms`,
      }}
    >
      {/* Cursor-following glow inside card */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124,92,255,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Ambient top-right glow */}
      <div
        className="absolute -right-16 -top-16 h-36 w-36 rounded-full blur-[50px] transition-all duration-500 group-hover:opacity-80"
        style={{
          background: "rgba(124,92,255,0.12)",
          opacity: 0.5,
        }}
      />

      <div className="relative">
        <div className="mb-6 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: "rgba(124,92,255,0.12)",
              border: "1px solid rgba(124,92,255,0.25)",
            }}
          >
            <Icon className="h-4 w-4" style={{ color: "#A98BFF" }} />
          </div>
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#A98BFF" }}
          >
            {study.client}
          </span>
        </div>

        <div className="mb-4">
          <span
            className="block text-5xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {displayValue}
          </span>
          <span className="mt-1 block text-sm font-medium" style={{ color: "#71717A" }}>
            {study.title}
          </span>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: "rgba(244,244,245,0.65)" }}>
          {study.desc}
        </p>
      </div>

      <div className="relative mt-8 flex items-center text-xs font-medium uppercase tracking-[0.2em] transition-colors" style={{ color: "#7C5CFF" }}>
        Read Full Study <span className="ml-2">→</span>
      </div>
    </div>
  );
}

export function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-7xl" ref={sectionRef}>
      <div className="mb-16 text-center reveal" data-reveal>
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: "rgba(124,92,255,0.12)",
            border: "1px solid rgba(124,92,255,0.25)",
            color: "#A98BFF",
          }}
        >
          Proven Results
        </div>
        <p className="text-4xl font-bold tracking-tight text-[#F4F4F5] md:text-5xl">
          Hypothetical is good.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Actual is better.
          </span>
        </p>
        <p className="mx-auto mt-4 max-w-xl" style={{ color: "#71717A" }}>
          See how our bespoke automation architectures have transformed operations and revenue for real clients.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {studies.map((study, idx) => (
          <div
            key={idx}
            className="reveal"
            data-reveal
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <CountUpCard study={study} index={idx} triggered={triggered} />
          </div>
        ))}
      </div>
    </div>
  );
}
