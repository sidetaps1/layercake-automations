import { useState, useEffect } from "react";
import { Play, CheckCircle2, RotateCcw, Mail, Loader2, Target, CalendarCheck, Database, ArrowRight } from "lucide-react";

type Bottleneck = "leads" | "followups" | "scheduling";

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
    }
  };

  return (
    <div className="mx-auto max-w-5xl rounded-2xl border border-gold/30 bg-card/40 p-6 sm:p-10 backdrop-blur shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
      <div className="mb-10 text-center">
        <h3 className="font-display text-3xl md:text-4xl">
          Test our <span className="text-gradient-gold italic">Engine</span>
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          Select your biggest operational bottleneck below to see how our AI handles it in real-time.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* Input Side */}
        <div className="space-y-6">
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-gold-soft">1. Select Bottleneck</h4>
            <div className="space-y-3">
              <button
                onClick={() => startSimulation("leads")}
                disabled={status === "processing"}
                className={`group flex w-full items-center justify-between rounded-lg border p-4 text-left transition-all ${
                  selected === "leads" ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/50 bg-card/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Target className={`h-5 w-5 ${selected === "leads" ? "text-gold" : "text-muted-foreground group-hover:text-gold-soft"}`} />
                  <div>
                    <p className={`font-medium ${selected === "leads" ? "text-gold" : "text-foreground"}`}>Cold Lead Generation</p>
                    <p className="text-xs text-muted-foreground mt-1">Finding and reaching out to prospects.</p>
                  </div>
                </div>
                {status === "idle" && <Play className="h-4 w-4 text-gold/50 opacity-0 transition-opacity group-hover:opacity-100" />}
              </button>

              <button
                onClick={() => startSimulation("followups")}
                disabled={status === "processing"}
                className={`group flex w-full items-center justify-between rounded-lg border p-4 text-left transition-all ${
                  selected === "followups" ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/50 bg-card/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Database className={`h-5 w-5 ${selected === "followups" ? "text-gold" : "text-muted-foreground group-hover:text-gold-soft"}`} />
                  <div>
                    <p className={`font-medium ${selected === "followups" ? "text-gold" : "text-foreground"}`}>Nurture & Follow-ups</p>
                    <p className="text-xs text-muted-foreground mt-1">Re-engaging dead leads in the CRM.</p>
                  </div>
                </div>
                {status === "idle" && <Play className="h-4 w-4 text-gold/50 opacity-0 transition-opacity group-hover:opacity-100" />}
              </button>

              <button
                onClick={() => startSimulation("scheduling")}
                disabled={status === "processing"}
                className={`group flex w-full items-center justify-between rounded-lg border p-4 text-left transition-all ${
                  selected === "scheduling" ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/50 bg-card/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <CalendarCheck className={`h-5 w-5 ${selected === "scheduling" ? "text-gold" : "text-muted-foreground group-hover:text-gold-soft"}`} />
                  <div>
                    <p className={`font-medium ${selected === "scheduling" ? "text-gold" : "text-foreground"}`}>Meeting Conversions</p>
                    <p className="text-xs text-muted-foreground mt-1">Confirmations and reducing no-shows.</p>
                  </div>
                </div>
                {status === "idle" && <Play className="h-4 w-4 text-gold/50 opacity-0 transition-opacity group-hover:opacity-100" />}
              </button>
            </div>
          </div>
        </div>

        {/* Output Side */}
        <div className="relative flex min-h-[300px] flex-col overflow-hidden rounded-lg border border-gold/20 bg-ink p-6 shadow-inner">
          <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-gold-soft">2. Live AI Output</h4>
          
          {status === "idle" && (
            <div className="flex flex-1 flex-col items-center justify-center text-center opacity-50">
              <div className="mb-3 rounded-full border border-dashed border-gold/30 p-4">
                <Play className="h-6 w-6 text-gold-soft ml-1" />
              </div>
              <p className="text-sm text-muted-foreground">Select an option on the left to begin.</p>
            </div>
          )}

          {status === "processing" && (
            <div className="flex flex-1 flex-col items-center justify-center space-y-6">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
              <div className="w-full max-w-[200px] space-y-2 text-center text-xs text-gold-soft">
                <p>Analyzing intent...</p>
                <div className="h-1 w-full overflow-hidden rounded-full bg-gold/10">
                  <div className="h-full bg-gold transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <p>Drafting bespoke sequence...</p>
              </div>
            </div>
          )}

          {status === "complete" && selected && (
            <div className="flex flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-4 flex items-center gap-2 border-b border-gold/10 pb-4">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium text-muted-foreground">Sequence Generated</span>
                <button onClick={reset} className="ml-auto flex items-center gap-1 text-[10px] uppercase text-gold hover:text-gold-soft transition-colors">
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              </div>
              
              <div className="flex-1 space-y-4 rounded bg-card/30 p-4 text-sm text-foreground/80 font-mono">
                <div className="flex gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-gold-soft" />
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Subj: {emailTemplates[selected].subject}</p>
                    <div className="h-px w-full bg-gold/10 my-2" />
                    <p className="whitespace-pre-wrap leading-relaxed text-xs">
                      {emailTemplates[selected].body}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                 <a href="#contact" className="text-xs font-medium text-gold hover:text-gold-soft transition-colors flex items-center gap-1">
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
