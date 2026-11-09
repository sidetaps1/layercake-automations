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
    <div
      className="reveal mx-auto max-w-4xl rounded-[20px] p-8 md:p-12"
      data-reveal
      style={{
        background: "rgba(17,17,19,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 60px -15px rgba(0,0,0,0.5)",
      }}
    >
      <div className="mb-10 text-center">
        <div
          className="mb-4 inline-flex items-center justify-center rounded-xl p-3"
          style={{
            background: "rgba(124,92,255,0.12)",
            border: "1px solid rgba(124,92,255,0.25)",
          }}
        >
          <Calculator className="h-6 w-6" style={{ color: "#A98BFF" }} />
        </div>
        <h3 className="text-3xl font-bold tracking-tight text-[#F4F4F5] md:text-4xl">
          Automation{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            ROI Calculator
          </span>
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-sm" style={{ color: "#71717A" }}>
          See how much revenue you're leaving on the table. Adjust the numbers below to calculate your potential uplift with AI automation.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Sliders */}
        <div className="space-y-8">
          {[
            { label: "Monthly Leads", value: leads, setter: setLeads, min: 10, max: 500, step: 10, format: (v: number) => `${v}` },
            { label: "Avg Deal Size", value: dealSize, setter: setDealSize, min: 500, max: 10000, step: 500, format: (v: number) => `$${v.toLocaleString()}` },
            { label: "Current Close Rate", value: closeRate, setter: setCloseRate, min: 5, max: 80, step: 5, format: (v: number) => `${v}%` },
          ].map(({ label, value, setter, min, max, step, format }) => (
            <div key={label} className="space-y-4">
              <div className="flex items-center justify-between">
                <label
                  className="text-sm font-medium uppercase tracking-wider"
                  style={{ color: "#A98BFF" }}
                >
                  {label}
                </label>
                <span className="text-lg font-semibold text-[#F4F4F5]">{format(value)}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg"
                style={{
                  background: `linear-gradient(to right, #7C5CFF ${((value - min) / (max - min)) * 100}%, rgba(124,92,255,0.15) 0%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Results */}
        <div
          className="flex flex-col items-center justify-center rounded-[16px] p-8 text-center"
          style={{
            background: "rgba(124,92,255,0.07)",
            border: "1px solid rgba(124,92,255,0.18)",
          }}
        >
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "#71717A" }}>
            Potential Additional Revenue
          </p>
          <div className="my-6">
            <span
              className="block text-5xl font-bold tracking-tight md:text-6xl"
              style={{
                background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              +${additionalRevenue.toLocaleString()}
            </span>
            <span className="mt-2 block text-sm" style={{ color: "rgba(169,139,255,0.7)" }}>
              per month
            </span>
          </div>

          <div className="mt-4 w-full">
            <a
              href="#contact"
              className="group relative flex w-full items-center justify-center gap-3 rounded-[12px] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:shadow-[0_15px_50px_-10px_rgba(124,92,255,0.6)]"
              style={{
                background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
                boxShadow: "0 10px 30px -10px rgba(124,92,255,0.4)",
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Get Your Free Audit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            <p className="mt-4 text-[10px] uppercase tracking-wider" style={{ color: "#71717A" }}>
              Based on +20% lead capture &amp; +15% close rate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
