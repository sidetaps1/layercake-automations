import { useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";

export function RoiCalculator() {
  const [leads, setLeads] = useState(50);
  const [dealSize, setDealSize] = useState(2500);
  const [closeRate, setCloseRate] = useState(20); // %

  // AI impact assumptions
  const aiLeadIncrease = 0.20; // 20% more leads captured
  const aiCloseRateIncrease = 0.15; // 15% better close rate

  const currentRevenue = leads * (closeRate / 100) * dealSize;
  
  const newLeads = leads * (1 + aiLeadIncrease);
  const newCloseRate = closeRate * (1 + aiCloseRateIncrease);
  const newRevenue = newLeads * (newCloseRate / 100) * dealSize;
  
  const additionalRevenue = Math.round(newRevenue - currentRevenue);

  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-gold/30 bg-card/40 p-8 backdrop-blur shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] md:p-12">
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full border border-gold/40 bg-ink/60 p-3 shadow-[0_0_20px_-5px_var(--gold)]">
          <Calculator className="h-6 w-6 text-gold" />
        </div>
        <h3 className="font-display text-3xl md:text-4xl">
          Automation <span className="text-gradient-gold italic">ROI Calculator</span>
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
          See how much revenue you're leaving on the table. Adjust the numbers below to calculate your potential uplift with AI automation.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Sliders */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium uppercase tracking-wider text-gold-soft">Monthly Leads</label>
              <span className="text-lg font-display text-foreground">{leads}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="500" 
              step="10"
              value={leads} 
              onChange={(e) => setLeads(Number(e.target.value))}
              className="w-full accent-gold h-2 rounded-lg appearance-none cursor-pointer bg-gold/20"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium uppercase tracking-wider text-gold-soft">Avg Deal Size</label>
              <span className="text-lg font-display text-foreground">${dealSize.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="10000" 
              step="500"
              value={dealSize} 
              onChange={(e) => setDealSize(Number(e.target.value))}
              className="w-full accent-gold h-2 rounded-lg appearance-none cursor-pointer bg-gold/20"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium uppercase tracking-wider text-gold-soft">Current Close Rate</label>
              <span className="text-lg font-display text-foreground">{closeRate}%</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="80" 
              step="5"
              value={closeRate} 
              onChange={(e) => setCloseRate(Number(e.target.value))}
              className="w-full accent-gold h-2 rounded-lg appearance-none cursor-pointer bg-gold/20"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-gold/20 bg-gold/5 p-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Potential Additional Revenue</p>
          <div className="my-6">
            <span className="font-display text-5xl md:text-6xl text-gradient-gold">
              +${additionalRevenue.toLocaleString()}
            </span>
            <span className="block mt-2 text-sm text-gold-soft/70">per month</span>
          </div>
          
          <div className="mt-4 w-full">
            <a
              href="#contact"
              className="group relative flex w-full items-center justify-center gap-3 rounded-md px-8 py-4 text-sm uppercase tracking-[0.2em] font-medium text-ink shadow-[0_5px_30px_-10px_var(--gold)] hover:shadow-[0_10px_40px_-10px_var(--gold)] transition-all duration-300"
              style={{ background: "var(--gradient-gold)" }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Get Your Free Audit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            <p className="mt-4 text-[10px] uppercase tracking-wider text-muted-foreground">
              Based on +20% lead capture & +15% close rate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
