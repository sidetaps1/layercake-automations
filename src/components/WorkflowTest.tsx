import { useState, useEffect } from "react";
import { Play, CheckCircle2, RotateCcw, Mail, Loader2, Target, CalendarCheck, Database, ArrowRight } from "lucide-react";

type Bottleneck = "leads" | "followups" | "scheduling";

const violetStyle = { color: "#A98BFF" };
const violetBorder = { borderColor: "rgba(124,92,255,0.5)", background: "rgba(124,92,255,0.08)" };

export function WorkflowTest() {
  const [selected, setSelected] = useState<Bottleneck | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "complete">("idle");
  const [progress, setProgress] = useState(0);

  const startSimulation = (b: Bottleneck) => {
    setSelected(b);
    setStatus("processing");
    setProgress(0);
  };

  useEffect(() => {
    if (status === "processing") {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
      }, 150);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    if (status === "processing" && progress >= 100) {
      setStatus("complete");
    }
  }, [status, progress]);

  const reset = () => {
    setSelected(null);
    setStatus("idle");
    setProgress(0);
  };

  const emailTemplates = {
    leads: {
      subject: "Quick question regarding [Company Name]",
      body: "Hi [First Name],\n\nI noticed you're scaling your operations at [Company Name]. I built an AI system that consistently generates 15-20 qualified appointments per month for companies like yours.\n\nWould you be open to a quick 5-min chat to see if there's a fit?\n\nBest,\nAI Assistant",
    },
    followups: {
      subject: "Re: Following up on our last conversation",
      body: "Hi [First Name],\n\nI know things get busy, so I wanted to bump this to the top of your inbox.\n\nSince we last spoke, our AI engine has rolled out a new feature that matches exactly what you were looking for regarding [Pain Point].\n\nLet me know when you have 10 minutes to review the update.\n\nBest,\nAI Assistant",
    },
    scheduling: {
      subject: "Action Required: Confirm your strategy session",
      body: "Hi [First Name],\n\nYour strategy session is tentatively booked for tomorrow at 2:00 PM EST.\n\nTo ensure we make the most of our time, please click the secure link below to confirm your attendance and answer 3 quick questions about your current setup.\n\nLooking forward to it!\n\nBest,\nAI Assistant",
    },
  };

  const bottlenecks: { key: Bottleneck; label: string; sub: string; Icon: typeof Target }[] = [
    { key: "leads", label: "Cold Lead Generation", sub: "Finding and reaching out to prospects.", Icon: Target },
    { key: "followups", label: "Nurture & Follow-ups", sub: "Re-engaging dead leads in the CRM.", Icon: Database },
    { key: "scheduling", label: "Meeting Conversions", sub: "Confirmations and reducing no-shows.", Icon: CalendarCheck },
  ];

  return (
    <div
      className="reveal mx-auto max-w-5xl rounded-[20px] p-6 sm:p-10"
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
        <h3 className="text-3xl font-bold tracking-tight text-[#F4F4F5] md:text-4xl">
          Test our{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Engine
          </span>
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-sm" style={{ color: "#71717A" }}>
          Select your biggest operational bottleneck below to see how our AI handles it in real-time.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* Input Side */}
        <div className="space-y-6">
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={violetStyle}>
              1. Select Bottleneck
            </h4>
            <div className="space-y-3">
              {bottlenecks.map(({ key, label, sub, Icon }) => {
                const isActive = selected === key;
                return (
                  <button
                    key={key}
                    onClick={() => startSimulation(key)}
                    disabled={status === "processing"}
                    className="group flex w-full items-center justify-between rounded-[14px] p-4 text-left transition-all duration-300 hover:-translate-y-0.5"
                    style={
                      isActive
                        ? { ...violetBorder, border: "1px solid rgba(124,92,255,0.5)" }
                        : {
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }
                    }
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        className="h-5 w-5 transition-colors"
                        style={isActive ? violetStyle : { color: "#71717A" }}
                      />
                      <div>
                        <p
                          className="font-medium transition-colors"
                          style={{ color: isActive ? "#A98BFF" : "#F4F4F5" }}
                        >
                          {label}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "#71717A" }}>
                          {sub}
                        </p>
                      </div>
                    </div>
                    {status === "idle" && (
                      <Play className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "#7C5CFF" }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Output Side */}
        <div
          className="relative flex min-h-[300px] flex-col overflow-hidden rounded-[14px] p-6 shadow-inner"
          style={{
            background: "#070708",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={violetStyle}>
            2. Live AI Output
          </h4>

          {status === "idle" && (
            <div className="flex flex-1 flex-col items-center justify-center text-center opacity-50">
              <div
                className="mb-3 rounded-full border border-dashed p-4"
                style={{ borderColor: "rgba(124,92,255,0.3)" }}
              >
                <Play className="ml-1 h-6 w-6" style={{ color: "#A98BFF" }} />
              </div>
              <p className="text-sm" style={{ color: "#71717A" }}>
                Select an option on the left to begin.
              </p>
            </div>
          )}

          {status === "processing" && (
            <div className="flex flex-1 flex-col items-center justify-center space-y-6">
              <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#7C5CFF" }} />
              <div className="w-full max-w-[200px] space-y-2 text-center text-xs" style={violetStyle}>
                <p>Analyzing intent...</p>
                <div
                  className="h-1 w-full overflow-hidden rounded-full"
                  style={{ background: "rgba(124,92,255,0.15)" }}
                >
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(to right, #7C5CFF, #4F8CFF)",
                    }}
                  />
                </div>
                <p>Drafting bespoke sequence...</p>
              </div>
            </div>
          )}

          {status === "complete" && selected && (
            <div className="flex flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div
                className="mb-4 flex items-center gap-2 border-b pb-4"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium" style={{ color: "#71717A" }}>
                  Sequence Generated
                </span>
                <button
                  onClick={reset}
                  className="ml-auto flex items-center gap-1 text-[10px] uppercase transition-colors hover:opacity-80"
                  style={{ color: "#7C5CFF" }}
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              </div>

              <div
                className="flex-1 space-y-4 rounded-[10px] p-4 text-sm font-mono"
                style={{
                  background: "rgba(124,92,255,0.05)",
                  border: "1px solid rgba(124,92,255,0.1)",
                  color: "rgba(244,244,245,0.8)",
                }}
              >
                <div className="flex gap-3">
                  <Mail className="h-4 w-4 shrink-0" style={violetStyle} />
                  <div className="space-y-1">
                    <p className="font-semibold text-[#F4F4F5]">
                      Subj: {emailTemplates[selected].subject}
                    </p>
                    <div
                      className="my-2 h-px w-full"
                      style={{ background: "rgba(124,92,255,0.1)" }}
                    />
                    <p className="whitespace-pre-wrap text-xs leading-relaxed">
                      {emailTemplates[selected].body}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <a
                  href="#contact"
                  className="flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ color: "#7C5CFF" }}
                >
                  Automate this workflow <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
