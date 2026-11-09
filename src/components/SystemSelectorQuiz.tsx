import { useState } from "react";
import {
  Target,
  Database,
  CalendarCheck,
  Mail,
  Megaphone,
  Search,
  ArrowRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Layers,
} from "lucide-react";

type ServiceKey = "leadGen" | "crm" | "calendar" | "email" | "campaigns" | "seo";

interface ServiceInfo {
  key: ServiceKey;
  title: string;
  badge: string;
  tagline: string;
  icon: typeof Target;
  benefits: string[];
  gradient: string;
  impact: string;
}

const SERVICES_DATA: Record<ServiceKey, ServiceInfo> = {
  leadGen: {
    key: "leadGen",
    title: "Lead Generation",
    badge: "Layer 01 • Prospecting Engine",
    tagline: "Autonomous AI prospecting that identifies, enriches, and qualifies high-intent B2B leads.",
    icon: Target,
    benefits: ["Zero manual prospecting", "Verified decision-maker enrichment", "Warm multichannel outreach"],
    gradient: "from-[#7C5CFF] to-[#4F8CFF]",
    impact: "+200-300% qualified pipeline volume within 45 days",
  },
  crm: {
    key: "crm",
    title: "Booking CRM",
    badge: "Layer 02 • Pipeline Command",
    tagline: "A unified backend tracking hub that manages deals, logs conversations, and predicts close probability.",
    icon: Database,
    benefits: ["Zero manual data entry", "Real-time deal health scoring", "Instant CRM-to-team alert routing"],
    gradient: "from-[#4F8CFF] to-[#7C5CFF]",
    impact: "Recovers 12+ hours weekly per account rep",
  },
  calendar: {
    key: "calendar",
    title: "Calendar Bookings",
    badge: "Layer 03 • Scheduling Automation",
    tagline: "Autonomous booking engine with multi-team round-robin routing and proactive reminder sequences.",
    icon: CalendarCheck,
    benefits: ["Eliminates scheduling friction", "Automated SMS/Email confirmations", "Drastically cuts no-shows"],
    gradient: "from-[#9B7FFF] to-[#4F8CFF]",
    impact: "Cuts no-show rates from ~25% down to under 5%",
  },
  email: {
    key: "email",
    title: "Email Automation",
    badge: "Layer 04 • Nurture Infrastructure",
    tagline: "Dynamic AI nurture workflows that reactivate stagnant leads and maintain continuous conversion touchpoints.",
    icon: Mail,
    benefits: ["Context-aware AI follow-ups", "Behavioral trigger logic", "Autonomous inbox warming & deliverability"],
    gradient: "from-[#7C5CFF] to-[#A98BFF]",
    impact: "+35-45% revival rate on cold/stalled pipeline",
  },
  campaigns: {
    key: "campaigns",
    title: "Marketing Campaigns",
    badge: "Layer 05 • Growth Engine",
    tagline: "End-to-end multi-channel campaign architectures driven by telemetry data, not subjective guesswork.",
    icon: Megaphone,
    benefits: ["Algorithmic audience profiling", "Continuous creative optimization", "Closed-loop CAC & ROAS tracking"],
    gradient: "from-[#4F8CFF] to-[#9B7FFF]",
    impact: "Lowers Customer Acquisition Cost (CAC) by up to 38%",
  },
  seo: {
    key: "seo",
    title: "Website Engine Optimization",
    badge: "Layer 06 • Digital Flagship",
    tagline: "High-speed, SEO-engineered conversion web engines built to capture search demand and turn traffic into pipeline.",
    icon: Search,
    benefits: ["Sub-second page speeds & Core Web Vitals 95+", "Semantic AI search indexing", "Conversion-focused buyer journeys"],
    gradient: "from-[#7C5CFF] to-[#4F8CFF]",
    impact: "Typical 2.8x lift in visitor-to-meeting conversion rate",
  },
};

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    weight: Partial<Record<ServiceKey, number>>;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Where is your revenue funnel leaking the most?",
    subtitle: "Identify your critical friction point from discovery to closed deal.",
    options: [
      {
        label: "Top-of-Funnel Pipeline",
        description: "Not enough qualified prospects entering the pipeline consistently.",
        weight: { leadGen: 3, campaigns: 2 },
      },
      {
        label: "Lead Tracking & CRM Chaos",
        description: "Inbound leads slip through cracks; manual data entry is slow and disorganized.",
        weight: { crm: 3, email: 1 },
      },
      {
        label: "Meeting Bookings & No-Shows",
        description: "Endless email back-and-forth to schedule, plus frequent ghosting before calls.",
        weight: { calendar: 3, crm: 1 },
      },
      {
        label: "Cold & Stagnant CRM Leads",
        description: "Hundreds of older leads sitting untouched without persistent automated follow-up.",
        weight: { email: 3, crm: 1 },
      },
      {
        label: "Campaign ROI & Ad Inefficiency",
        description: "Marketing spend lacks predictable conversion mechanics and accurate feedback loops.",
        weight: { campaigns: 3, leadGen: 1 },
      },
      {
        label: "Website Conversion & Visibility",
        description: "Our website is outdated, slow, doesn't rank well, and converts under 1% of visitors.",
        weight: { seo: 3, leadGen: 1 },
      },
    ],
  },
  {
    id: 2,
    question: "What is your #1 operational objective over the next 90 days?",
    subtitle: "Choose the highest-impact outcome for your growth.",
    options: [
      {
        label: "Flood calendars with vetted decision-makers",
        description: "Target outbound prospecting and book 20+ qualified sales calls every month.",
        weight: { leadGen: 3, calendar: 2 },
      },
      {
        label: "Automate sales ops & eliminate manual admin",
        description: "Centralize all contact data, pipeline stages, and handoffs into a zero-touch hub.",
        weight: { crm: 3, email: 2 },
      },
      {
        label: "Convert more existing traffic & maximize search presence",
        description: "Transform our web assets into a fast, authoritative conversion machine.",
        weight: { seo: 3, campaigns: 2 },
      },
      {
        label: "Scale automated customer re-engagement",
        description: "Run persistent, intelligent nurturing sequences across all contacts.",
        weight: { email: 3, campaigns: 1 },
      },
    ],
  },
  {
    id: 3,
    question: "What does your current technology stack look like?",
    subtitle: "Help us calibrate the ideal integration depth.",
    options: [
      {
        label: "Mostly Manual & Decentralized",
        description: "Spreadsheets, direct messaging, calendar links, and manual notes.",
        weight: { crm: 2, calendar: 2, leadGen: 1 },
      },
      {
        label: "Fragmented Point Solutions",
        description: "Using CRM and email tools, but they don't talk to each other without duct tape.",
        weight: { crm: 2, email: 2 },
      },
      {
        label: "Active Outreach, Needs Intelligent Automation",
        description: "Already running outreach or ads, but need AI qualification and custom workflows.",
        weight: { leadGen: 2, campaigns: 2, seo: 1 },
      },
      {
        label: "Established Stack, Bottlenecked by Human Capacity",
        description: "Team is bogged down in administrative tasks instead of closing deals.",
        weight: { crm: 2, calendar: 2, email: 2 },
      },
    ],
  },
];

export function SystemSelectorQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<ServiceKey, number>>({
    leadGen: 0,
    crm: 0,
    calendar: 0,
    email: 0,
    campaigns: 0,
    seo: 0,
  });
  const [selectedInStep, setSelectedInStep] = useState<number | null>(null);

  const totalSteps = QUIZ_QUESTIONS.length;
  const isFinished = currentStep >= totalSteps;

  const handleSelectOption = (index: number) => {
    setSelectedInStep(index);
  };

  const handleNext = () => {
    if (selectedInStep === null) return;
    const selectedOption = QUIZ_QUESTIONS[currentStep].options[selectedInStep];

    setScores((prev) => {
      const updated = { ...prev };
      Object.entries(selectedOption.weight).forEach(([key, val]) => {
        const k = key as ServiceKey;
        updated[k] = (updated[k] || 0) + (val || 0);
      });
      return updated;
    });

    setSelectedInStep(null);
    setCurrentStep((prev) => prev + 1);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedInStep(null);
    setScores({
      leadGen: 0,
      crm: 0,
      calendar: 0,
      email: 0,
      campaigns: 0,
      seo: 0,
    });
  };

  // Determine top recommendations
  const sortedServices = (Object.keys(scores) as ServiceKey[]).sort(
    (a, b) => scores[b] - scores[a]
  );
  const primaryServiceKey = sortedServices[0] || "leadGen";
  const secondaryServiceKey = sortedServices[1] || "crm";

  const primaryService = SERVICES_DATA[primaryServiceKey];
  const secondaryService = SERVICES_DATA[secondaryServiceKey];

  const PrimaryIcon = primaryService.icon;
  const SecondaryIcon = secondaryService.icon;

  return (
    <div className="mx-auto max-w-4xl" id="system-selector">
      {/* Container with Glassmorphism & Subtle Glow */}
      <div
        className="relative overflow-hidden rounded-[24px] p-6 sm:p-10 md:p-12 transition-all duration-500"
        style={{
          background: "rgba(13, 14, 18, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(124, 92, 255, 0.18)",
          boxShadow:
            "0 25px 70px -15px rgba(0, 0, 0, 0.7), 0 0 50px -20px rgba(124, 92, 255, 0.25)",
        }}
      >
        {/* Subtle Ambient Radial Glow Inside Card */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-[80px]"
          style={{ background: "rgba(124, 92, 255, 0.14)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-[80px]"
          style={{ background: "rgba(79, 140, 255, 0.12)" }}
        />

        {/* ── Quiz In Progress ─────────────────────────────────────────────────── */}
        {!isFinished ? (
          <div>
            {/* Header / Tracker */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    background: "rgba(124, 92, 255, 0.12)",
                    border: "1px solid rgba(124, 92, 255, 0.28)",
                    color: "#A98BFF",
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Automation Diagnostic
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#F4F4F5] sm:text-3xl">
                  Identify Your Optimal System Layer
                </h3>
              </div>

              {/* Progress counter pill */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#71717A]">
                  Step {currentStep + 1} of {totalSteps}
                </span>
                <div className="h-2 w-28 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((currentStep + 1) / totalSteps) * 100}%`,
                      background: "linear-gradient(90deg, #7C5CFF, #4F8CFF)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Current Question */}
            <div className="mb-8">
              <h4 className="text-lg sm:text-xl font-semibold text-[#F4F4F5]">
                {QUIZ_QUESTIONS[currentStep].question}
              </h4>
              <p className="mt-1 text-sm text-[#71717A]">
                {QUIZ_QUESTIONS[currentStep].subtitle}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3.5" role="radiogroup" aria-label="Diagnostic Options">
              {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => {
                const isSelected = selectedInStep === idx;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectOption(idx)}
                    className="group relative flex w-full items-start gap-4 rounded-[16px] p-4 sm:p-5 text-left transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
                    style={{
                      background: isSelected
                        ? "rgba(124, 92, 255, 0.12)"
                        : "rgba(255, 255, 255, 0.03)",
                      border: isSelected
                        ? "1px solid rgba(124, 92, 255, 0.55)"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                      boxShadow: isSelected
                        ? "0 8px 24px -6px rgba(124, 92, 255, 0.3)"
                        : "none",
                    }}
                  >
                    {/* Custom Radio Circle */}
                    <div
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all"
                      style={{
                        border: isSelected
                          ? "2px solid #7C5CFF"
                          : "2px solid rgba(255, 255, 255, 0.25)",
                        background: isSelected ? "#7C5CFF" : "transparent",
                      }}
                    >
                      {isSelected && (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p
                        className="font-semibold text-sm sm:text-base transition-colors"
                        style={{
                          color: isSelected ? "#F4F4F5" : "rgba(244, 244, 245, 0.9)",
                        }}
                      >
                        {opt.label}
                      </p>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#71717A]">
                        {opt.description}
                      </p>
                    </div>

                    <ChevronRight
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                      style={{
                        color: isSelected ? "#A98BFF" : "rgba(255, 255, 255, 0.2)",
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Step Action Bar */}
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
              <span className="text-xs text-[#71717A]">
                Select the option that best mirrors your bottleneck.
              </span>
              <button
                type="button"
                disabled={selectedInStep === null}
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-[12px] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_10px_35px_-8px_rgba(124,92,255,0.6)]"
                style={{
                  background:
                    selectedInStep !== null
                      ? "linear-gradient(135deg, #7C5CFF, #4F8CFF)"
                      : "rgba(255, 255, 255, 0.08)",
                }}
              >
                <span>{currentStep === totalSteps - 1 ? "Generate Architecture" : "Next Question"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          /* ── Quiz Results Card ──────────────────────────────────────────────── */
          <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
                style={{
                  background: "rgba(124, 92, 255, 0.15)",
                  border: "1px solid rgba(124, 92, 255, 0.35)",
                  color: "#A98BFF",
                }}
              >
                <Layers className="h-3.5 w-3.5" />
                Diagnostic Complete • Recommended Architecture
              </div>
              <h3 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5]">
                Your Tailored Automation Blueprint
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-[#71717A]">
                Based on your identified bottlenecks, these precision-engineered system layers will yield the highest immediate revenue leverage.
              </p>
            </div>

            {/* Recommendation Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              {/* Primary Recommended Layer */}
              <div
                className="relative flex flex-col justify-between overflow-hidden rounded-[20px] p-6 sm:p-7 transition-all duration-300"
                style={{
                  background: "rgba(124, 92, 255, 0.07)",
                  border: "1px solid rgba(124, 92, 255, 0.3)",
                  boxShadow: "0 15px 40px -15px rgba(124, 92, 255, 0.3)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
                      style={{
                        background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
                        color: "#FFFFFF",
                      }}
                    >
                      Primary Recommended Layer
                    </span>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-[12px]"
                      style={{
                        background: "rgba(124, 92, 255, 0.18)",
                        border: "1px solid rgba(124, 92, 255, 0.35)",
                      }}
                    >
                      <PrimaryIcon className="h-5 w-5" style={{ color: "#A98BFF" }} />
                    </div>
                  </div>

                  <span className="text-xs uppercase tracking-wider text-[#A98BFF] font-semibold">
                    {primaryService.badge}
                  </span>
                  <h4 className="mt-1 text-2xl font-bold text-[#F4F4F5]">
                    {primaryService.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#71717A]">
                    {primaryService.tagline}
                  </p>

                  <div className="mt-5 space-y-2">
                    {primaryService.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-2 text-xs text-white/80">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#7C5CFF] shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <span className="block text-[11px] uppercase tracking-wider text-[#71717A]">
                    Expected Leverage
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-[#A98BFF]">
                    {primaryService.impact}
                  </span>
                </div>
              </div>

              {/* Secondary Supporting Layer */}
              <div
                className="relative flex flex-col justify-between overflow-hidden rounded-[20px] p-6 sm:p-7 transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
                      style={{
                        background: "rgba(255, 255, 255, 0.06)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "rgba(244, 244, 245, 0.8)",
                      }}
                    >
                      Complementary Layer
                    </span>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-[12px]"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <SecondaryIcon className="h-5 w-5" style={{ color: "#71717A" }} />
                    </div>
                  </div>

                  <span className="text-xs uppercase tracking-wider text-[#71717A] font-semibold">
                    {secondaryService.badge}
                  </span>
                  <h4 className="mt-1 text-2xl font-bold text-[#F4F4F5]">
                    {secondaryService.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#71717A]">
                    {secondaryService.tagline}
                  </p>

                  <div className="mt-5 space-y-2">
                    {secondaryService.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-2 text-xs text-white/70">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#4F8CFF] shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <span className="block text-[11px] uppercase tracking-wider text-[#71717A]">
                    Expected Leverage
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-[#F4F4F5]">
                    {secondaryService.impact}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions Banner */}
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[16px] p-6 text-center sm:text-left"
              style={{
                background: "rgba(124, 92, 255, 0.05)",
                border: "1px solid rgba(124, 92, 255, 0.2)",
              }}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#A98BFF] shrink-0 hidden sm:block" />
                <div>
                  <p className="text-sm font-semibold text-[#F4F4F5]">
                    Ready to deploy this architecture?
                  </p>
                  <p className="text-xs text-[#71717A]">
                    We'll walk through the implementation blueprint and ROI timeline on a 15-minute call.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-[12px] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#71717A] hover:text-[#F4F4F5] transition-colors"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.08)" }}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Retake</span>
                </button>
                <a
                  href="#contact"
                  className="flex-1 sm:flex-initial group inline-flex items-center justify-center gap-2 rounded-[12px] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_12px_40px_-10px_rgba(124,92,255,0.7)] hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
                    boxShadow: "0 8px 30px -8px rgba(124, 92, 255, 0.5)",
                  }}
                >
                  <span>Book Implementation Call</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

