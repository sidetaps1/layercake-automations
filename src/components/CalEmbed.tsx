import { useEffect } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

export function CalEmbed() {
  useEffect(() => {
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    if (window.Cal) {
      window.Cal("init", "30min", { origin: "https://app.cal.com" });
      window.Cal.config = window.Cal.config || {};
      window.Cal.config.forwardQueryParams = true;

      window.Cal.ns["30min"]("inline", {
        elementOrSelector: "#my-cal-inline-30min",
        config: {
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true",
          theme: "dark",
        },
        calLink: "matt-m-l3939q/30min",
        cssVarsPerTheme: {
          dark: {
            "cal-brand": "#7C5CFF",
            "cal-text-emphasis": "#F4F4F5",
            "cal-text-muted": "#71717A",
          },
        },
      });

      window.Cal.ns["30min"]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        css: "https://layercakehq.com/cal-custom.css",
        cssVarsPerTheme: {
          dark: {
            "cal-brand": "#7C5CFF",
            "cal-text-emphasis": "#F4F4F5",
            "cal-text-muted": "#71717A",
          },
        },
      });
    }
  }, []);

  return (
    <div
      className="w-full overflow-x-hidden rounded-[16px]"
      style={{
        border: "1px solid rgba(124,92,255,0.2)",
        background: "rgba(17,17,19,0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 20px 60px -15px rgba(0,0,0,0.5)",
      }}
    >
      <div
        id="my-cal-inline-30min"
        style={{ width: "100%", height: "100%", minHeight: "600px", overflowY: "auto", overflowX: "hidden" }}
      />
    </div>
  );
}
