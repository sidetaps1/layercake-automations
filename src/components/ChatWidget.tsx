import { useState } from "react";
import { MessageSquare, X, Send, ArrowRight } from "lucide-react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hey there! Looking to automate your workflows or generate more leads?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          role: "ai", 
          text: "I can definitely help with that. The best next step is a quick 15-min discovery call to map out a custom blueprint." 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[400px] w-[320px] flex-col overflow-hidden rounded-2xl border border-gold/30 bg-card/95 backdrop-blur-md shadow-[0_10px_50px_-10px_rgba(0,0,0,0.7)] animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gold/20 bg-ink/50 p-4">
            <div className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-gold">
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-card" />
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Layer Cake AI</h4>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Typically replies instantly</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === "user" 
                      ? "bg-gold text-ink rounded-tr-sm" 
                      : "bg-ink border border-gold/10 text-foreground/90 rounded-tl-sm"
                  }`}
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
                    className="flex items-center gap-2 max-w-[85%] rounded-2xl px-4 py-2.5 text-sm bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-colors rounded-tl-sm"
                  >
                    Book a Discovery Call <ArrowRight className="h-3 w-3" />
                  </a>
               </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-gold/20 bg-ink/50 p-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Reply..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full rounded-full border border-gold/30 bg-card px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <button 
                type="submit"
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-ink transition-transform hover:scale-105"
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
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-gold-deep to-gold text-ink shadow-[0_5px_25px_-5px_var(--gold)] transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_40px_-5px_var(--gold)]"
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
