import { createFileRoute } from "@tanstack/react-router";
import { CursorTrail } from "@/components/CursorTrail";
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
  MapPin,
} from "lucide-react";

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
  },
  {
    icon: Database,
    title: "Booking CRM",
    desc: "A backend command center that tracks every contact, deal, and conversation without lifting a finger.",
  },
  {
    icon: CalendarCheck,
    title: "Calendar Bookings",
    desc: "Automated scheduling that syncs across your team and books qualified calls while you sleep.",
  },
  {
    icon: Mail,
    title: "Email Automation",
    desc: "Personalized backend sequences that nurture leads and close deals on autopilot.",
  },
  {
    icon: Megaphone,
    title: "Marketing Campaigns",
    desc: "End-to-end campaign engines — from creative to conversion — built on data, not guesswork.",
  },
  {
    icon: Search,
    title: "Website Engine Optimization",
    desc: "Fast, ranked, and conversion-tuned websites engineered to be found and remembered.",
  },
];

function DecoDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-4 text-gold">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
      <span className="text-xs uppercase tracking-[0.4em] text-gold-soft">{label ?? "◈"}</span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

function CTAButton({
  children,
  href = "#contact",
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
}) {
  const base =
    "group relative inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.25em] font-medium transition-all duration-300";
  if (variant === "outline") {
    return (
      <a href={href} className={`${base} border border-gold/50 text-gold-soft hover:bg-gold/10 hover:border-gold`}>
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    );
  }
  return (
    <a
      href={href}
      className={`${base} text-ink shadow-[0_10px_40px_-10px_var(--gold-deep)] hover:shadow-[0_15px_50px_-10px_var(--gold)]`}
      style={{ background: "var(--gradient-gold)" }}
    >
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  );
}

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CursorTrail />

      {/* Background deco pattern */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--gold) 0 1px, transparent 1px 22px), repeating-linear-gradient(-45deg, var(--gold) 0 1px, transparent 1px 22px)",
        }}
      />

      {/* Nav */}
      <header className="relative z-20 border-b border-gold/15">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center">
              <div className="absolute inset-0 rotate-45 border border-gold" />
              <div className="absolute inset-1 rotate-45 border border-gold/50" />
              <Sparkles className="relative h-4 w-4 text-gold" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl tracking-wider text-gold-soft">Layer Cake</span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">AI</span>
            </div>
          </a>
          <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex">
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-soft hover:text-gold"
          >
            <Phone className="h-3.5 w-3.5" />
            {PHONE}
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-32 md:pb-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-card/40 px-5 py-2 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-slow" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold-soft">
              AI Automation Studio
            </span>
          </div>

          <h1 className="font-display text-5xl leading-[1.05] md:text-7xl lg:text-8xl">
            <span className="block text-foreground/90">Automation,</span>
            <span className="block text-gradient-gold italic">Refined.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Layer Cake AI engineers intelligent systems that generate leads, book meetings, run
            campaigns, and grow your business — while you focus on what matters.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href="#contact">Book a Call</CTAButton>
            <CTAButton href="#services" variant="outline">
              Explore Services
            </CTAButton>
          </div>

          <div className="mt-16">
            <DecoDivider label="◈  ◈  ◈" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">— Our Services —</p>
          <h2 className="font-display text-4xl md:text-6xl">
            Built for <span className="text-gradient-gold italic">growth.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Six precision-engineered systems working in concert to compound your revenue.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-gold/20 bg-gold/20 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group relative bg-card/60 p-8 backdrop-blur transition-all duration-500 hover:bg-card"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-sm border border-gold/40 bg-ink/60 transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_30px_-5px_var(--gold)]">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-display text-2xl text-gold-soft">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-6 h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <CTAButton href="#contact">Automate My Business</CTAButton>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <DecoDivider label="About" />
        <div className="mt-12 grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Intelligence,
              <br />
              <span className="text-gradient-gold italic">layered.</span>
            </h2>
          </div>
          <div className="md:col-span-3 space-y-5 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              We build the invisible infrastructure behind modern businesses — AI systems that
              generate opportunities, capture attention, and convert interest into revenue.
            </p>
            <p className="leading-relaxed">
              Every layer is engineered with intention: from the first click to the closed deal.
              Elegant on the surface, obsessive underneath.
            </p>
            <div className="flex flex-wrap gap-6 pt-4 text-xs uppercase tracking-[0.3em] text-gold-soft">
              <span>◈ Bespoke</span>
              <span>◈ Data-Driven</span>
              <span>◈ Always-On</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Final CTA */}
      <section id="contact" className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <div className="deco-corners relative overflow-hidden rounded-lg border border-gold/40 bg-card/50 p-10 backdrop-blur md:p-16">
          <div className="deco-corner-tl" />
          <div className="deco-corner-tr" />
          <div className="deco-corner-bl" />
          <div className="deco-corner-br" />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "var(--gradient-radial)" }}
          />

          <div className="relative text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">— Let's talk —</p>
            <h2 className="font-display text-4xl md:text-6xl">
              Ready to <span className="text-gradient-gold italic">automate?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Book a discovery call and we'll map out an automation blueprint tailored to your
              business — no fluff, just leverage.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CTAButton href={`tel:${PHONE_TEL}`}>Book a Call</CTAButton>
              <CTAButton href="mailto:owner@layercakehq.com" variant="outline">
                Send an Email
              </CTAButton>
            </div>

            <div className="mt-12 grid gap-6 border-t border-gold/20 pt-8 text-sm sm:grid-cols-3">
              <div className="flex flex-col items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Phone</span>
                <a href={`tel:${PHONE_TEL}`} className="text-gold-soft hover:text-gold">
                  {PHONE}
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Email</span>
                <a href="mailto:owner@layercakehq.com" className="text-gold-soft hover:text-gold">
                  owner@layercakehq.com
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Web</span>
                <span className="text-gold-soft">layercakehq.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gold/15 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="relative flex h-7 w-7 items-center justify-center">
              <div className="absolute inset-0 rotate-45 border border-gold/60" />
              <Sparkles className="relative h-3 w-3 text-gold" />
            </div>
            <span className="font-display tracking-wider text-gold-soft">Layer Cake AI</span>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            © {new Date().getFullYear()} — Automation, Refined.
          </p>
        </div>
      </footer>
    </div>
  );
}
