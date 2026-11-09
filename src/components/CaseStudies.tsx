import { useState, useRef, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  ExternalLink,
  Zap,
  Globe,
  Database,
  CalendarCheck,
  Mail,
  Target,
} from "lucide-react";

export type FilterCategory =
  | "All"
  | "Lead Gen"
  | "CRM & Bookings"
  | "Email & Campaigns"
  | "Web Optimization";

interface StudyItem {
  id: string;
  category: "Lead Gen" | "CRM & Bookings" | "Email & Campaigns" | "Web Optimization";
  metric: string;
  numericPart: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  metricLabel: string;
  client: string;
  industry: string;
  desc: string;
  stack: string[];
  deliverables: string[];
  icon: typeof TrendingUp;
}

const CASE_STUDIES: StudyItem[] = [
  {
    id: "saas-recovery",
    category: "Email & Campaigns",
    metric: "+42%",
    numericPart: 42,
    prefix: "+",
    suffix: "%",
    decimals: 0,
    metricLabel: "Close Rate Increase",
    client: "SaaS Enterprise",
    industry: "B2B Cloud Software",
    desc: "Engineered an autonomous conversational follow-up engine that systematically reactivated stale leads over 90 days, reclaiming lost pipeline without rep intervention.",
    stack: ["Smartlead", "OpenAI GPT-4o", "HubSpot API", "Slack Alerts"],
    deliverables: ["Behavioral trigger sequences", "Real-time CRM sync", "AI objection replies"],
    icon: TrendingUp,
  },
  {
    id: "realestate-outbound",
    category: "Lead Gen",
    metric: "3.5x",
    numericPart: 3.5,
    suffix: "x",
    decimals: 1,
    metricLabel: "Qualified Pipeline Growth",
    client: "Commercial Brokerage",
    industry: "Real Estate & Asset Mgmt",
    desc: "Replaced manual cold outreach with an AI prospecting engine that enriches corporate property filings, identifying active buyers and booking high-intent discovery calls.",
    stack: ["Apollo API", "Clay Enrichment", "OpenAI", "Instantly"],
    deliverables: ["Automated prospect research", "Verified decision-makers", "Multi-inbox rotation"],
    icon: Users,
  },
  {
    id: "agency-zero-touch",
    category: "CRM & Bookings",
    metric: "40hrs",
    numericPart: 40,
    suffix: "hrs",
    decimals: 0,
    metricLabel: "Saved Weekly / Rep",
    client: "Global Media Agency",
    industry: "Creative & Performance",
    desc: "Consolidated client onboarding, contract delivery, and cross-team discovery scheduling into a zero-touch orchestration layer connecting CRM to calendar.",
    stack: ["Cal.com", "Airtable", "Make.com", "Google Workspace"],
    deliverables: ["Round-robin calendar sync", "Automated contract generation", "Zero-entry CRM logs"],
    icon: Clock,
  },
  {
    id: "fintech-conversion",
    category: "Web Optimization",
    metric: "2.8x",
    numericPart: 2.8,
    suffix: "x",
    decimals: 1,
    metricLabel: "Visitor-to-Lead Lift",
    client: "Fintech Platform",
    industry: "Financial Infrastructure",
    desc: "Re-engineered web engine with sub-second Edge delivery, Core Web Vitals 98+, and adaptive conversion funnels tailored to institutional financial buyers.",
    stack: ["Next.js", "Edge Middleware", "Semantic Schema", "Tailwind"],
    deliverables: ["0.4s initial paint speed", "Dynamic intent routing", "Semantic search indexing"],
    icon: Globe,
  },
  {
    id: "logistics-scheduling",
    category: "CRM & Bookings",
    metric: "94%",
    numericPart: 94,
    suffix: "%",
    decimals: 0,
    metricLabel: "Show-Up Rate (6% No-Shows)",
    client: "Freight & Logistics Group",
    industry: "Supply Chain Solutions",
    desc: "Deployed automated bidirectional SMS and calendar reminder sequences with predictive rescheduling, cutting ghosted carrier partner calls down to near-zero.",
    stack: ["Twilio API", "Cal.com", "Pipedrive", "PostgreSQL"],
    deliverables: ["Automated 2-way SMS confirmation", "Instant reschedule links", "Call prep dossiers"],
    icon: CalendarCheck,
  },
  {
    id: "ecom-campaigns",
    category: "Email & Campaigns",
    metric: "-38%",
    numericPart: 38,
    prefix: "-",
    suffix: "%",
    decimals: 0,
    metricLabel: "Reduction in Customer Acquisition Cost",
    client: "Consumer Brands Co.",
    industry: "Direct-to-Consumer",
    desc: "Closed-loop feedback engine that dynamically re-allocates multi-channel ad spend and triggers algorithmic retention flows based on predicted customer LTV.",
    stack: ["Meta Ads API", "Klaviyo", "Custom Webhooks", "BigQuery"],
    deliverables: ["Algorithmic audience profiling", "Dynamic creative optimization", "Automated LTV win-backs"],
    icon: Target,
  },
];

const CATEGORIES: FilterCategory[] = [
  "All",
  "Lead Gen",
  "CRM & Bookings",
  "Email & Campaigns",
  "Web Optimization",
];

function useCountUp(target: number, decimals = 0, triggered = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);
  const startTimeRef = useRef(0);
  const duration = 1400;

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

function CaseStudyCard({
  study,
  triggered,
}: {
  study: StudyItem;
  triggered: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const countVal = useCountUp(study.numericPart, study.decimals || 0, triggered);
  const Icon = study.icon;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };

    card.addEventListener("mousemove", onMouseMove);
    return () => card.removeEventListener("mousemove", onMouseMove);
  }, []);

  const displayMetric = `${study.prefix || ""}${countVal}${study.suffix || ""}`;

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(124,92,255,0.3)]"
      style={{
        background: "rgba(17, 17, 19, 0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Dynamic Cursor Spotlight inside Card */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124,92,255,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Top Ambient Glow */}
      <div
        className="absolute -right-16 -top-16 h-36 w-36 rounded-full blur-[50px] transition-all duration-500 group-hover:opacity-80"
        style={{ background: "rgba(124,92,255,0.15)", opacity: 0.4 }}
      />

      <div className="relative">
        {/* Top Badges */}
        <div className="mb-5 flex items-center justify-between">
          <span
            className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              background: "rgba(124, 92, 255, 0.12)",
              border: "1px solid rgba(124, 92, 255, 0.28)",
              color: "#A98BFF",
            }}
          >
            {study.category}
          </span>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-[10px]"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Icon className="h-4 w-4 text-[#A98BFF]" />
          </div>
        </div>

        {/* Client & Industry */}
        <div>
          <span className="text-xs uppercase tracking-wider text-[#71717A] font-medium">
            {study.industry}
          </span>
          <h4 className="text-lg font-bold text-[#F4F4F5] mt-0.5">
            {study.client}
          </h4>
        </div>

        {/* Large Key Metric */}
        <div className="my-5 rounded-[14px] p-4 border border-white/5 bg-white/[0.02]">
          <span
            className="block text-4xl sm:text-5xl font-extrabold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #7C5CFF 0%, #4F8CFF 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {displayMetric}
          </span>
          <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-[#A98BFF]">
            {study.metricLabel}
          </span>
        </div>

        {/* Narrative Description */}
        <p className="text-sm leading-relaxed text-[#71717A]">
          {study.desc}
        </p>

        {/* Key Deliverables */}
        <div className="mt-5 space-y-1.5 border-t border-white/5 pt-4">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#71717A] mb-2">
            Engineered Capabilities
          </span>
          {study.deliverables.map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-white/80">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#7C5CFF] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Pills & CTA */}
      <div className="relative mt-6 pt-4 border-t border-white/5">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {study.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-[6px] px-2 py-0.5 text-[10px] font-medium text-[#71717A] bg-white/[0.03] border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href="#contact"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#A98BFF] hover:text-white transition-colors"
        >
          <span>Request Blueprint</span>
          <ArrowRight className="h-3 w-3 ml-1.5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

export function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredStudies =
    activeCategory === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((s) => s.category === activeCategory);

  const getCategoryCount = (cat: FilterCategory) => {
    if (cat === "All") return CASE_STUDIES.length;
    return CASE_STUDIES.filter((s) => s.category === cat).length;
  };

  return (
    <div className="mx-auto max-w-7xl" ref={sectionRef} id="case-studies">
      {/* Header */}
      <div className="mb-12 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
          style={{
            background: "rgba(124, 92, 255, 0.12)",
            border: "1px solid rgba(124, 92, 255, 0.28)",
            color: "#A98BFF",
          }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Proven Results
        </div>
        <h3 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F4F5]">
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
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-[#71717A]">
          Explore verified automation architectures and live client outcomes across our precision-engineered service spectrum.
        </p>

        {/* Filter Bar Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5" role="tablist" aria-label="Case Study Service Categories">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count = getCategoryCount(cat);

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className="group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #7C5CFF, #4F8CFF)"
                    : "rgba(255, 255, 255, 0.04)",
                  color: isActive ? "#FFFFFF" : "#71717A",
                  border: isActive
                    ? "1px solid rgba(124, 92, 255, 0.6)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: isActive
                    ? "0 8px 25px -6px rgba(124, 92, 255, 0.5)"
                    : "none",
                }}
              >
                <span>{cat}</span>
                <span
                  className="rounded-full px-1.5 py-0.2 text-[10px] font-bold transition-colors"
                  style={{
                    background: isActive ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.08)",
                    color: isActive ? "#FFFFFF" : "#71717A",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Filtered Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-300">
        {filteredStudies.map((study) => (
          <div
            key={study.id}
            className="animate-in fade-in zoom-in-95 duration-300"
          >
            <CaseStudyCard study={study} triggered={triggered} />
          </div>
        ))}
      </div>

      {/* Bottom CTA Trigger */}
      <div className="mt-14 text-center">
        <p className="text-sm text-[#71717A]">
          Want an architecture blueprint customized for your specific business stack?
        </p>
        <div className="mt-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-r from-[#7C5CFF] to-[#4F8CFF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_35px_-8px_rgba(124,92,255,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_45px_-8px_rgba(124,92,255,0.75)]"
          >
            <span>Request Your Custom Blueprint</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
