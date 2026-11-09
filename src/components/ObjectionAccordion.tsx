import { useState } from "react";
import { ChevronDown, ShieldCheck, Clock, Cpu, RefreshCw, Users, HelpCircle } from "lucide-react";

interface ObjectionItem {
  id: string;
  icon: typeof ShieldCheck;
  category: string;
  question: string;
  answer: string;
  highlight: string;
}

const OBJECTIONS: ObjectionItem[] = [
  {
    id: "security",
    icon: ShieldCheck,
    category: "Security & Privacy",
    question: "How do you protect our proprietary data and client confidentiality?",
    answer:
      "We operate under strict zero-retention data protocols with enterprise-grade AES-256 encryption at rest and in transit. Your proprietary business data, pipeline interactions, and contact records are processed exclusively inside isolated private tenants and are never used to train public or foundation models.",
    highlight: "SOC 2 compliant infrastructure & private single-tenant execution.",
  },
  {
    id: "timeline",
    icon: Clock,
    category: "Deployment",
    question: "How long does implementation take, and will it disrupt our active operations?",
    answer:
      "Typical deployment runs on a 14-to-21 day sprint. We build and stage all autonomous layers in a sandbox environment that connects to your existing pipeline without disrupting live operations. Full cutover only happens once telemetry benchmarks match your exact standards.",
    highlight: "Zero downtime deployment with parallel sandbox staging.",
  },
  {
    id: "guardrails",
    icon: Cpu,
    category: "Quality Control",
    question: "What safeguards prevent the AI from making mistakes or hallucinating?",
    answer:
      "Our systems utilize deterministic guardrails combined with Retrieval-Augmented Generation (RAG). Every sequence operates within strict rule boundaries. For high-leverage steps (like contractual commitments or sensitive negotiations), human-in-the-loop approval gates are enforced.",
    highlight: "Deterministic boundary rules with human approval checkpoints.",
  },
  {
    id: "integrations",
    icon: RefreshCw,
    category: "Compatibility",
    question: "Will this replace our existing CRM and tools, or integrate seamlessly?",
    answer:
      "Layer Cake AI is designed as an intelligence layer, not a disruptive replacement. We bi-directionally sync with your existing tech stack—including HubSpot, Salesforce, Pipedrive, Google Workspace, Slack, and custom webhooks—enriching your current workflow instead of forcing a rip-and-replace.",
    highlight: "Bi-directional API sync with 100+ standard B2B platforms.",
  },
  {
    id: "adoption",
    icon: Users,
    category: "Team & Maintenance",
    question: "Will our internal team need technical engineering knowledge to run this?",
    answer:
      "Not at all. We build intuitive executive command dashboards and handle full operational maintenance, prompt fine-tuning, and system monitoring. Your team also receives thorough hands-on onboarding sessions and dedicated Slack channel support.",
    highlight: "Turnkey operational management with continuous fine-tuning.",
  },
];

export function ObjectionAccordion() {
  const [openId, setOpenId] = useState<string | null>("security");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mx-auto max-w-4xl" id="faq">
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
          <HelpCircle className="h-3.5 w-3.5" />
          Direct Answers
        </div>
        <h3 className="mt-4 text-3xl font-bold tracking-tight text-[#F4F4F5] sm:text-4xl">
          Engineered for Confidence &amp; Scale
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[#71717A]">
          Transparent answers about security, integration timelines, and operational control.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4" role="region" aria-label="Frequently Asked Questions">
        {OBJECTIONS.map((item) => {
          const isOpen = openId === item.id;
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-[20px] transition-all duration-300"
              style={{
                background: isOpen
                  ? "rgba(17, 17, 21, 0.85)"
                  : "rgba(17, 17, 19, 0.5)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: isOpen
                  ? "1px solid rgba(124, 92, 255, 0.45)"
                  : "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: isOpen
                  ? "0 12px 35px -10px rgba(124, 92, 255, 0.25), 0 0 20px -8px rgba(79, 140, 255, 0.2)"
                  : "none",
              }}
            >
              {/* Trigger Button */}
              <button
                type="button"
                id={`accordion-btn-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${item.id}`}
                onClick={() => toggleItem(item.id)}
                className="group flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
              >
                <div className="flex items-center gap-4">
                  {/* Icon Indicator */}
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] transition-colors duration-300"
                    style={{
                      background: isOpen
                        ? "rgba(124, 92, 255, 0.18)"
                        : "rgba(255, 255, 255, 0.04)",
                      border: isOpen
                        ? "1px solid rgba(124, 92, 255, 0.4)"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                      color: isOpen ? "#A98BFF" : "#71717A",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div>
                    <span
                      className="block text-[11px] font-semibold uppercase tracking-wider transition-colors"
                      style={{ color: isOpen ? "#A98BFF" : "#71717A" }}
                    >
                      {item.category}
                    </span>
                    <h4
                      className="mt-0.5 text-base sm:text-lg font-semibold tracking-tight transition-colors"
                      style={{ color: isOpen ? "#F4F4F5" : "rgba(244, 244, 245, 0.85)" }}
                    >
                      {item.question}
                    </h4>
                  </div>
                </div>

                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300"
                  style={{
                    background: isOpen ? "rgba(124, 92, 255, 0.15)" : "rgba(255, 255, 255, 0.03)",
                    color: isOpen ? "#A98BFF" : "#71717A",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              {/* Animated Expandable Body */}
              <div
                id={`accordion-panel-${item.id}`}
                role="region"
                aria-labelledby={`accordion-btn-${item.id}`}
                className="grid transition-all duration-300 ease-in-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-white/5 px-5 pb-6 pt-4 sm:px-6 sm:pl-[4.25rem]">
                    <p className="text-sm leading-relaxed text-[#71717A]">
                      {item.answer}
                    </p>

                    {/* Verified Guarantee Badge */}
                    <div
                      className="mt-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium"
                      style={{
                        background: "rgba(124, 92, 255, 0.08)",
                        border: "1px solid rgba(124, 92, 255, 0.22)",
                        color: "#A98BFF",
                      }}
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>{item.highlight}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

