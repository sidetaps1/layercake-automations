import { createFileRoute } from "@tanstack/react-router";
import { MembraneHero } from "@/components/MembraneHero";
import { CursorTrail } from "@/components/CursorTrail";
import { CalEmbed } from "@/components/CalEmbed";
import { RoiCalculator } from "@/components/RoiCalculator";
import { WorkflowTest } from "@/components/WorkflowTest";
import { CaseStudies } from "@/components/CaseStudies";
import { ChatWidget } from "@/components/ChatWidget";
import { SystemSelectorQuiz } from "@/components/SystemSelectorQuiz";
import { ObjectionAccordion } from "@/components/ObjectionAccordion";
import {
  Sparkles,
  Target,
  CalendarCheck,
  Mail,
  Megaphone,
  Search,
  Database,
  Phone,
  ArrowRight,
  Video,
  Menu,
  X,
  MapPin,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const PHONE = "902-719-9011";
const PHONE_TEL = "9027199011";

const services = [
  {
    icon: Target,
    title: "Lead Generation",
    desc: "AI-driven prospecting that finds, qualifies, and delivers customers directly to your pipeline.",
    featured: true,
  },
  {
    icon: Database,
    title: "Booking CRM",
    desc: "A backend command center that tracks every contact, deal, and conversation without lifting a finger.",
    featured: false,
  },
  {
    icon: CalendarCheck,
    title: "Calendar Bookings",
    desc: "Automated scheduling that syncs across your team and books qualified calls while you sleep.",
    featured: false,
  },
  {
    icon: Mail,
    title: "Email Automation",
    desc: "Personalized backend sequences that nurture leads and close deals on autopilot.",
    featured: false,
  },
  {
    icon: Megaphone,
    title: "Marketing Campaigns",
    desc: "End-to-end campaign engines — from creative to conversion — built on data, not guesswork.",
    featured: false,
  },
  {
    icon: Search,
    title: "Website Engine Optimization",
    desc: "Fast, ranked, and conversion-tuned websites engineered to be found and remembered.",
    featured: false,
  },
  {
    icon: Video,
    title: "Content Studio",
    desc: "Strategy-led content production, including short-form video, social creative, and brand storytelling, designed to build authority and drive qualified demand across every channel.",
    featured: false,
  },
];

// ── Scroll-driven hooks ──────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 40px 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (el.closest("#top")) return;
      el.classList.add("reveal");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;

    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : "0%";
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
}

function useActiveNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = ["top", "services", "about", "case-studies", "calculator", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-80px 0px 0px 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function NavLink({
  href,
  children,
  isActive,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="relative text-sm font-medium transition-colors duration-200"
      style={{ color: isActive ? "#F4F4F5" : "#71717A" }}
    >
      {children}
      {isActive && (
        <span
          className="absolute -bottom-1 left-0 h-px w-full"
          style={{ background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)" }}
        />
      )}
    </a>
  );
}

function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center gap-2 rounded-[12px] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_15px_50px_-10px_rgba(124,92,255,0.65)] hover:-translate-y-0.5 ${className}`}
      style={{
        background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
        boxShadow: "0 8px 30px -8px rgba(124,92,255,0.5)",
      }}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function GhostButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 rounded-[12px] px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
      style={{
        color: "#A98BFF",
        border: "1px solid rgba(124,92,255,0.3)",
        background: "rgba(124,92,255,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(124,92,255,0.6)";
        e.currentTarget.style.background = "rgba(124,92,255,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(124,92,255,0.3)";
        e.currentTarget.style.background = "rgba(124,92,255,0.06)";
      }}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function ServiceCard({
  service,
  index,
  featured = false,
}: {
  service: (typeof services)[0];
  index: number;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const Icon = service.icon;

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

  return (
    <div
      ref={cardRef}
      className={`reveal group relative overflow-hidden rounded-[20px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(124,92,255,0.3)] ${
        featured ? "sm:col-span-2 lg:col-span-2 p-8 md:p-10" : "p-7"
      }`}
      data-reveal
      style={{
        background: featured ? "rgba(124,92,255,0.06)" : "rgba(17,17,19,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: featured ? "1px solid rgba(124,92,255,0.2)" : "1px solid rgba(255,255,255,0.08)",
        transitionDelay: `${index * 70}ms`,
      }}
    >
      {/* Cursor-following glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124,92,255,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Top glow */}
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-[50px] transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "rgba(124,92,255,0.15)", opacity: featured ? 0.6 : 0 }}
      />

      {/* Icon + Tag */}
      <div className="flex items-center justify-between mb-5">
        <div
          className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] transition-all duration-300 group-hover:scale-110"
          style={{
            background: "rgba(124,92,255,0.12)",
            border: "1px solid rgba(124,92,255,0.25)",
          }}
        >
          <Icon className="h-5 w-5" style={{ color: "#A98BFF" }} />
        </div>
        {featured && (
          <span
            className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(124,92,255,0.15)",
              border: "1px solid rgba(124,92,255,0.3)",
              color: "#A98BFF",
            }}
          >
            Featured
          </span>
        )}
      </div>

      <h3
        className={`mb-3 font-semibold tracking-tight text-[#F4F4F5] ${
          featured ? "text-2xl" : "text-lg"
        }`}
      >
        {service.title}
      </h3>
      <p
        className={`leading-relaxed ${featured ? "text-base max-w-xl" : "text-sm"}`}
        style={{ color: "#71717A" }}
      >
        {service.desc}
      </p>

      {/* Bottom accent line */}
      <div
        className="mt-6 h-px w-8 transition-all duration-500 group-hover:w-full"
        style={{ background: "linear-gradient(to right, #7C5CFF, #4F8CFF)" }}
      />
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

function LandingPage() {
  useScrollReveal();
  useScrollProgress();
  const activeSection = useActiveNav();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    return () => document.body.classList.remove("mobile-menu-open");
  }, [mobileOpen]);

  const navLinks = [
    { href: "#services", label: "Services", id: "services" },
    { href: "#about", label: "About", id: "about" },
    { href: "#case-studies", label: "Results", id: "case-studies" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#0A0A0B" }}>
      {/* Scroll progress bar */}
      <div id="scroll-progress" aria-hidden />

      <CursorTrail />

      {/* Fixed ambient glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute left-[-20%] top-[-10%] h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,92,255,0.06) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute right-[-15%] bottom-[-10%] h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(79,140,255,0.04) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* ── Navbar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-30"
        style={{
          background: "rgba(10,10,11,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-[10px]"
              style={{
                background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
                boxShadow: "0 4px 15px rgba(124,92,255,0.4)",
              }}
            >
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-semibold tracking-tight text-[#F4F4F5]">
              Layer Cake <span style={{ color: "#A98BFF" }}>AI</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                isActive={activeSection === link.id}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-4 md:flex">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-2 text-sm transition-colors hover:text-[#F4F4F5]"
              style={{ color: "#71717A" }}
            >
              <Phone className="h-3.5 w-3.5" />
              {PHONE}
            </a>
            <a
              href="#contact"
              className="rounded-full px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_8px_25px_-5px_rgba(124,92,255,0.6)] hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
                boxShadow: "0 4px 15px rgba(124,92,255,0.35)",
              }}
            >
              Book a Call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-[10px] transition-colors md:hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#F4F4F5" }}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="animate-in slide-in-from-top-2 fade-in duration-200 md:hidden"
            style={{
              background: "rgba(10,10,11,0.98)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="mx-auto max-w-7xl space-y-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center rounded-[10px] px-4 py-3 text-sm font-medium transition-colors"
                  style={{
                    color: activeSection === link.id ? "#A98BFF" : "#F4F4F5",
                    background: activeSection === link.id ? "rgba(124,92,255,0.08)" : "transparent",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 pb-1 space-y-2">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex w-full items-center gap-2 rounded-[10px] px-4 py-3 text-sm"
                  style={{ color: "#71717A" }}
                  onClick={() => setMobileOpen(false)}
                >
                  <Phone className="h-4 w-4" />
                  {PHONE}
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-[10px] px-4 py-3 text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)" }}
                >
                  Book a Call
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Membrane Hero Section ── */}
      <MembraneHero />

      {/* ── Workflow Tester ── */}
      <section
        id="workflow-test"
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16"
      >
        <WorkflowTest />
      </section>

      {/* ── Services (Bento Grid) ── */}
      <section id="services" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <div
            className="reveal mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            data-reveal
            style={{
              background: "rgba(124,92,255,0.1)",
              border: "1px solid rgba(124,92,255,0.25)",
              color: "#A98BFF",
            }}
          >
            Services
          </div>
          <p
            className="reveal text-4xl font-bold tracking-[-0.02em] text-[#F4F4F5] md:text-5xl"
            data-reveal
            style={{ transitionDelay: "80ms" }}
          >
            Built for{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              growth.
            </span>
          </p>
          <p
            className="reveal mx-auto mt-4 max-w-xl text-base"
            data-reveal
            style={{ color: "#71717A", transitionDelay: "160ms" }}
          >
            Seven precision-engineered systems working in concert to compound your revenue.
          </p>
        </div>

        {/* Bento grid — 7 cards, first one wider on lg */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              featured={service.featured}
            />
          ))}
        </div>

        <div className="reveal mt-16 flex justify-center" data-reveal style={{ transitionDelay: "200ms" }}>
          <PrimaryButton href="#contact">Automate My Business</PrimaryButton>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        {/* Section label */}
        <div
          className="reveal mb-12 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          data-reveal
          style={{
            background: "rgba(124,92,255,0.1)",
            border: "1px solid rgba(124,92,255,0.25)",
            color: "#A98BFF",
          }}
        >
          About
        </div>

        <div className="grid gap-16 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2
              className="reveal text-4xl font-bold leading-tight tracking-[-0.02em] md:text-5xl"
              data-reveal
              style={{ transitionDelay: "80ms" }}
            >
              <span className="text-[#F4F4F5]">Intelligence,</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                layered.
              </span>
            </h2>
          </div>

          <div className="md:col-span-3 space-y-6" style={{ color: "#71717A" }}>
            <p
              className="reveal text-lg leading-relaxed"
              data-reveal
              style={{ transitionDelay: "120ms" }}
            >
              We build the invisible infrastructure behind modern businesses — AI systems that
              generate opportunities, capture attention, and convert interest into revenue.
            </p>
            <p
              className="reveal leading-relaxed"
              data-reveal
              style={{ transitionDelay: "180ms" }}
            >
              Every layer is engineered with intention: from lead generation and booking CRMs to email
              flows, marketing campaigns, content production, and SEO. Elegant on the surface,
              obsessive underneath.
            </p>

            {/* Pillars */}
            <div
              className="reveal flex flex-wrap gap-3 pt-2"
              data-reveal
              style={{ transitionDelay: "240ms" }}
            >
              {["Bespoke", "Data-Driven", "Always-On"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    background: "rgba(124,92,255,0.08)",
                    border: "1px solid rgba(124,92,255,0.2)",
                    color: "#A98BFF",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── System Selector Quiz ── */}
      <section
        id="diagnostic"
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16"
      >
        <SystemSelectorQuiz />
      </section>

      {/* ── Case Studies ── */}
      <section
        id="case-studies"
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-24"
      >
        <CaseStudies />
      </section>

      {/* ── ROI Calculator ── */}
      <section
        id="calculator"
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-16"
      >
        <RoiCalculator />
      </section>

      {/* ── Objection Accordion (FAQ) ── */}
      <section
        id="faq"
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-16"
      >
        <ObjectionAccordion />
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24 overflow-x-hidden"
      >
        <div
          className="reveal relative overflow-hidden rounded-[24px]"
          data-reveal
          style={{
            background: "rgba(17,17,19,0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(124,92,255,0.18)",
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 60px -30px rgba(124,92,255,0.2)",
          }}
        >
          {/* Background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(124,92,255,0.1) 0%, transparent 60%)",
            }}
          />

          {/* Header */}
          <div className="relative text-center px-5 pt-10 sm:pt-14 sm:px-10 md:px-16">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "rgba(124,92,255,0.1)",
                border: "1px solid rgba(124,92,255,0.25)",
                color: "#A98BFF",
              }}
            >
              Contact
            </div>
            <p className="text-3xl font-bold tracking-[-0.02em] text-[#F4F4F5] sm:text-4xl md:text-5xl">
              Ready to{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                automate?
              </span>
            </p>
            <p
              className="mx-auto mt-5 max-w-xl text-sm sm:text-base"
              style={{ color: "#71717A" }}
            >
              Book a discovery call and we'll map out an automation blueprint tailored to your
              business — no fluff, just leverage.
            </p>
          </div>

          {/* Cal embed */}
          <div className="relative mt-8 px-3 sm:px-6 md:px-10">
            <CalEmbed />
          </div>

          {/* CTA + contact info */}
          <div className="relative px-5 pb-10 pt-6 sm:px-10 sm:pb-14 md:px-16 text-center">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PrimaryButton href="#contact">Book a Call</PrimaryButton>
            </div>

            <div
              className="mt-10 grid gap-6 pt-8 text-sm sm:grid-cols-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {[
                { icon: Phone, label: "Phone", value: PHONE, href: `tel:${PHONE_TEL}` },
                { icon: Mail, label: "Book", value: "Directly on Calendar", href: "#contact" },
                { icon: MapPin, label: "Web", value: "layercakehq.com", href: undefined },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon className="h-4 w-4" style={{ color: "#7C5CFF" }} />
                  <span
                    className="text-xs uppercase tracking-[0.25em]"
                    style={{ color: "#71717A" }}
                  >
                    {label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="transition-colors hover:text-[#F4F4F5]"
                      style={{ color: "#A98BFF" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <span style={{ color: "#A98BFF" }}>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="relative z-10 py-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-[8px]"
              style={{ background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-[#F4F4F5]">Layer Cake AI</span>
          </div>
          <p
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: "#71717A" }}
          >
            © {new Date().getFullYear()} — Automation, Refined.
          </p>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
