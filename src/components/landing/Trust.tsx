"use client";
import { useEffect, useRef } from "react";

const TRUST_ITEMS = [
  {
    icon: "🛡️",
    title: "Mandatory KYC Verification",
    desc: "Identity verified before any group activity or transfer",
  },
  {
    icon: "🔐",
    title: "Escrow Protection",
    desc: "Funds held securely until all parties confirm release",
  },
  {
    icon: "🕵️",
    title: "Anti-Fraud Intelligence",
    desc: "Real-time AI monitoring for suspicious activity",
  },
  {
    icon: "🌐",
    title: "Community Trust Architecture",
    desc: "Reputation scores and dispute resolution built-in",
  },
];

const STATS = [
  { value: "100%", label: "KYC verified members" },
  { value: "$0", label: "Fraudulent losses to date" },
  { value: "256-bit", label: "Encryption standard" },
  { value: "24/7", label: "Security monitoring" },
];

export default function Trust() {
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            (e.target as HTMLElement).classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    [...itemsRef.current, ...statsRef.current].forEach((el) => {
      if (el) {
        el.classList.add("fade-up");
        obs.observe(el);
      }
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="trust"
      style={{
        padding: "6rem 2rem",
        background:
          "linear-gradient(180deg,var(--deep) 0%,rgba(4,13,31,.95) 100%)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Two-col layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          {/* Text + list */}
          <div>
            <div className="section-tag">Trust & Security</div>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                lineHeight: 1.1,
                letterSpacing: "-1px",
                marginBottom: "1rem",
              }}
            >
              Finance built on
              <br />
              <span className="blue-text">verified identity.</span>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                maxWidth: 500,
                fontSize: "1rem",
                lineHeight: 1.7,
                fontWeight: 300,
                marginBottom: "2rem",
              }}
            >
              Every member goes through mandatory KYC. We protect every
              transaction so your community can trust with confidence.
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: 0,
              }}
            >
              {TRUST_ITEMS.map((item, i) => (
                <li
                  key={item.title}
                  ref={(el) => {
                    itemsRef.current[i] = el;
                  }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    background: "var(--card-bg)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: 14,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background:
                        "linear-gradient(135deg,rgba(26,108,255,.2),rgba(26,108,255,.05))",
                      border: "1px solid rgba(26,108,255,.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "Syne",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        marginBottom: "0.2rem",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Spinning rings visual */}
          <div style={{ position: "relative", height: 360 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {[
                {
                  size: 240,
                  color: "rgba(26,108,255,.25)",
                  duration: "20s",
                  dir: "normal",
                },
                {
                  size: 180,
                  color: "rgba(0,229,160,.2)",
                  duration: "15s",
                  dir: "reverse",
                },
                {
                  size: 120,
                  color: "rgba(240,180,41,.2)",
                  duration: "10s",
                  dir: "normal",
                },
              ].map((ring, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: ring.size,
                    height: ring.size,
                    borderRadius: "50%",
                    border: `1px solid ${ring.color}`,
                    animation: `${ring.dir === "reverse" ? "spinReverse" : "spinSlow"} ${ring.duration} linear infinite`,
                  }}
                />
              ))}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,var(--electric),var(--green))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  boxShadow:
                    "0 0 40px rgba(26,108,255,.5),0 0 80px rgba(26,108,255,.2)",
                  zIndex: 2,
                }}
              >
                🛡️
              </div>
              <div
                style={{
                  position: "absolute",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--green)",
                  animation: "orbit 8s linear infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--gold2)",
                  animation: "orbit2 6s linear infinite",
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "1.5rem",
            marginTop: "4rem",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              ref={(el) => {
                statsRef.current[i] = el;
              }}
              style={{
                textAlign: "center",
                padding: "2rem",
                background: "var(--card-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: 20,
                backdropFilter: "blur(16px)",
              }}
            >
              <div
                style={{
                  fontFamily: "Syne",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                  background: "linear-gradient(135deg,#fff,var(--gold2))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
