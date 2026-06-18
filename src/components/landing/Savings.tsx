"use client";
import { useEffect, useRef } from "react";

const VAULTS = [
  {
    tag: "Personal Vault",
    desc: "Emergency savings locked until goal met",
    amount: "XAF 1,200,000",
    pct: "60%",
    label: "Progress to goal",
    chip: { text: "On track ✓", cls: "chip-green" },
    type: "bar",
  },
  {
    tag: "Marketplace Escrow",
    desc: "Transaction held until buyer confirms receipt",
    amount: "USDT 850",
    pct: null,
    label: null,
    chip: { text: "Escrow Active", cls: "chip-blue" },
    type: "transit",
  },
  {
    tag: "Njangi Pool",
    desc: "Group of 8 — next payout in 12 days",
    amount: "XAF 3,600,000",
    pct: "37.5%",
    label: "Cycle 3 of 8",
    chip: { text: "Your turn next", cls: "chip-gold" },
    type: "bar",
  },
];

export default function Savings() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            (e.target as HTMLElement).classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    cardsRef.current.forEach((el) => {
      if (el) {
        el.classList.add("fade-up");
        obs.observe(el);
      }
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="savings"
      style={{ padding: "6rem 2rem", background: "var(--deep)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-tag">Savings & Escrow</div>
        <h2
          style={{
            fontSize: "clamp(2rem,4vw,3rem)",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            marginBottom: "1rem",
          }}
        >
          Your money,
          <br />
          <span className="gradient-text">perfectly protected.</span>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            maxWidth: 540,
            fontSize: "1rem",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Personal vaults, group pools, and marketplace escrow — all in one
          secure platform.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "2rem",
            marginTop: "3rem",
          }}
        >
          {VAULTS.map((v, i) => (
            <div
              key={v.tag}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              style={{
                background:
                  "linear-gradient(135deg,rgba(10,30,90,.7),rgba(5,15,50,.8))",
                border: "1px solid var(--glass-border)",
                borderRadius: 20,
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow bubble */}
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(26,108,255,.2),transparent 70%)",
                }}
              />

              <div className="section-tag" style={{ marginBottom: "0.75rem" }}>
                {v.tag}
              </div>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.85rem",
                  marginBottom: "0.5rem",
                }}
              >
                {v.desc}
              </p>
              <div
                style={{
                  fontFamily: "Syne",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "#fff",
                  margin: "0.5rem 0",
                }}
              >
                {v.amount}
              </div>

              {v.type === "bar" && v.pct && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span>{v.label}</span>
                    <span>{v.pct}</span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: "rgba(255,255,255,.1)",
                      borderRadius: 3,
                      overflow: "hidden",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      className="vault-fill"
                      style={{
                        height: "100%",
                        borderRadius: 3,
                        background:
                          "linear-gradient(90deg,var(--electric),var(--green))",
                        ["--pct" as string]: v.pct,
                      }}
                    />
                  </div>
                </>
              )}

              {v.type === "transit" && (
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    margin: "0.75rem 0",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: 3,
                      background: "var(--electric)",
                      borderRadius: 2,
                    }}
                  />
                  <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
                    in transit
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 3,
                      background: "rgba(255,255,255,.1)",
                      borderRadius: 2,
                    }}
                  />
                </div>
              )}

              <span className={`chip ${v.chip.cls}`}>{v.chip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
