import { TrendingUp, Users, Clock } from "lucide-react";

const studies = [
  {
    metric: "+42%",
    title: "Close Rate Increase",
    client: "B2B SaaS Provider",
    desc: "Implemented an autonomous follow-up engine that nurtured dead leads over 90 days, recovering lost pipeline.",
    icon: TrendingUp,
  },
  {
    metric: "3.5x",
    title: "Lead Volume",
    client: "Real Estate Brokerage",
    desc: "Replaced manual prospecting with an AI outbound system, generating consistent qualified appointments.",
    icon: Users,
  },
  {
    metric: "40hrs",
    title: "Saved Weekly",
    client: "Marketing Agency",
    desc: "Automated client onboarding, data entry, and meeting scheduling into a single zero-touch workflow.",
    icon: Clock,
  }
];

export function CaseStudies() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">— Proven Results —</h2>
        <p className="font-display text-4xl md:text-5xl">
          Hypothetical is good. <span className="text-gradient-gold italic">Actual is better.</span>
        </p>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          See how our bespoke automation architectures have transformed operations and revenue for real clients.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {studies.map((study, idx) => {
          const Icon = study.icon;
          return (
            <div 
              key={idx}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gold/20 bg-card/40 p-8 backdrop-blur transition-all duration-500 hover:border-gold/50 hover:bg-card hover:shadow-[0_10px_40px_-10px_var(--gold-deep)]"
            >
              {/* Highlight gradient */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gold/10 blur-[50px] transition-all duration-500 group-hover:bg-gold/20" />
              
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold border border-gold/20">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-soft">{study.client}</span>
                </div>
                
                <div className="mb-4">
                  <span className="block font-display text-5xl font-bold text-foreground">
                    {study.metric}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-muted-foreground">
                    {study.title}
                  </span>
                </div>
                
                <p className="text-sm leading-relaxed text-foreground/70">
                  {study.desc}
                </p>
              </div>
              
              <div className="mt-8 flex items-center text-xs font-medium uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-soft cursor-pointer">
                Read Full Study <span className="ml-2">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
