"use client";
import { useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: "🔄",
    title: "P2P Currency Swap",
    desc: "Direct peer exchange with escrow — no middleman inflating rates",
  },
  {
    icon: "⚡",
    title: "Fast Settlement",
    desc: "Most transfers complete in under 5 minutes across corridors",
  },
  {
    icon: "🔒",
    title: "Escrow-Backed",
    desc: "Funds secured until both parties confirm — zero counterparty risk",
  },
  {
    icon: "💱",
    title: "Fiat & Crypto",
    desc: "Seamlessly bridge USDT, XAF, NGN, and more currencies",
  },
];

export default function Transfers() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            (e.target as HTMLElement).classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    itemsRef.current.forEach((el) => {
      if (el) {
        el.classList.add("fade-up");
        obs.observe(el);
      }
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="transfers"
      style={{
        padding: "6rem 2rem",
        background:
          "linear-gradient(135deg,rgba(7,15,42,.97) 0%,rgba(4,13,31,.97) 100%)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {/* Text */}
          <div>
            <div className="section-tag">Cross-Border Transfers</div>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                lineHeight: 1.1,
                letterSpacing: "-1px",
                marginBottom: "1rem",
              }}
            >
              Move money across
              <br />
              <span className="blue-text">borders in minutes.</span>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "1rem",
                lineHeight: 1.7,
                fontWeight: 300,
                marginBottom: "2rem",
              }}
            >
              P2P currency swapping with escrow protection. NGN ↔ XAF ↔ USDT and
              more.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  ref={(el) => {
                    itemsRef.current[i] = el;
                  }}
                  style={{
                    padding: "1.25rem",
                    background: "var(--card-bg)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: 14,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "Syne",
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: "0.35rem",
                    }}
                  >
                    {f.icon} {f.title}
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Globe visual */}
          <div
            style={{
              position: "relative",
              height: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 240,
                height: 240,
                borderRadius: "50%",
                border: "1px dashed rgba(26,108,255,.15)",
                animation: "ringTilt 6s ease-in-out infinite",
              }}
            />
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 35%,rgba(26,108,255,.4) 0%,rgba(4,13,31,.9) 70%)",
                border: "1px solid rgba(26,108,255,.2)",
                animation: "globePulse 8s ease-in-out infinite",
                boxShadow:
                  "0 0 60px rgba(26,108,255,.2),inset 0 0 40px rgba(0,0,0,.5)",
              }}
            />
            {/* Currency pills */}
            {[
              {
                label: "🇳🇬 NGN",
                style: { top: 10, left: 0 },
                bg: "rgba(0,229,160,.15)",
                border: "1px solid rgba(0,229,160,.3)",
                color: "var(--green)",
                delay: "0s",
              },
              {
                label: "🇨🇲 XAF",
                style: { bottom: 20, left: 0 },
                bg: "rgba(240,180,41,.15)",
                border: "1px solid rgba(240,180,41,.3)",
                color: "var(--gold2)",
                delay: "-0.5s",
              },
              {
                label: "💵 USDT",
                style: { top: 30, right: 0 },
                bg: "rgba(26,108,255,.15)",
                border: "1px solid rgba(26,108,255,.3)",
                color: "#7eb8ff",
                delay: "-1s",
              },
            ].map((pill) => (
              <div
                key={pill.label}
                style={{
                  position: "absolute",
                  padding: "0.4rem 1rem",
                  borderRadius: 100,
                  fontFamily: "Syne",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  background: pill.bg,
                  border: pill.border,
                  color: pill.color,
                  animation: `pillFloat 3s ease-in-out ${pill.delay} infinite`,
                  ...pill.style,
                }}
              >
                {pill.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
