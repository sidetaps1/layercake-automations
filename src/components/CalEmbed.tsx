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
      });

      window.Cal.ns["30min"]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          dark: {
            "cal-brand": "#c5a059",
            "cal-text-emphasis": "#ffffff",
            "cal-text-muted": "#a0a0a0",
          },
        },
      });
    }
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gold/30 bg-card/80 p-4 shadow-2xl backdrop-blur min-h-[700px]">
      <div
        id="my-cal-inline-30min"
        className="w-full h-full min-h-[650px] overflow-scroll"
      />
    </div>
  );
}
