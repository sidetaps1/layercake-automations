import { useState } from "react";
import { MessageSquare, X, Send, ArrowRight } from "lucide-react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hey there! Looking to automate your workflows or generate more leads?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "I can definitely help with that. The best next step is a quick 15-min discovery call to map out a custom blueprint.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div
          className="mb-4 flex h-[400px] w-[320px] flex-col overflow-hidden rounded-[20px] animate-in slide-in-from-bottom-5 fade-in duration-300"
          style={{
            background: "rgba(11,11,13,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 60px -10px rgba(0,0,0,0.7), 0 0 40px -20px rgba(124,92,255,0.3)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-4"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(124,92,255,0.05)",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="relative flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  background: "rgba(124,92,255,0.15)",
                  border: "1px solid rgba(124,92,255,0.3)",
                }}
              >
                <span
                  className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2"
                  style={{ background: "#22c55e", borderColor: "#0A0A0B" }}
                />
                <MessageSquare className="h-4 w-4" style={{ color: "#A98BFF" }} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#F4F4F5]">Layer Cake AI</h4>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: "#71717A" }}>
                  Typically replies instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="transition-colors hover:text-[#F4F4F5]"
              style={{ color: "#71717A" }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm"
                  style={
                    msg.role === "user"
                      ? {
                          background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
                          color: "#F4F4F5",
                          borderRadius: "16px 16px 4px 16px",
                        }
                      : {
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(244,244,245,0.9)",
                          borderRadius: "16px 16px 16px 4px",
                        }
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {messages.length > 1 && (
              <div className="flex justify-start">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 max-w-[85%] rounded-2xl px-4 py-2.5 text-sm transition-colors"
                  style={{
                    background: "rgba(124,92,255,0.1)",
                    border: "1px solid rgba(124,92,255,0.25)",
                    color: "#A98BFF",
                    borderRadius: "16px 16px 16px 4px",
                  }}
                >
                  Book a Discovery Call <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Reply..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full rounded-full px-4 py-2.5 pr-10 text-sm text-[#F4F4F5] placeholder-[#71717A] outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(124,92,255,0.5)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
                style={{ background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)" }}
              >
                <Send className="h-3.5 w-3.5 -ml-0.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #7C5CFF, #4F8CFF)",
          boxShadow: "0 8px 30px -5px rgba(124,92,255,0.6)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 12px 40px -5px rgba(124,92,255,0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 30px -5px rgba(124,92,255,0.6)";
        }}
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <MessageSquare className="h-6 w-6 transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </button>
    </div>
  );
}
