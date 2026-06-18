"use client";
import { useEffect, useRef } from "react";

interface HeroProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export default function Hero({ onGetStarted, onLogin }: HeroProps) {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const sz = Math.random() * 4 + 2;
      const isBlue = Math.random() > 0.5;
      p.style.cssText = `
        width:${sz}px; height:${sz}px; left:${Math.random() * 100}%;
        background:rgba(${isBlue ? "26,108,255" : "0,229,160"},${Math.random() * 0.4 + 0.1});
        animation-duration:${Math.random() * 15 + 8}s;
        animation-delay:${Math.random() * 10}s;
      `;
      container.appendChild(p);
    }
    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: 80,
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(10,60,200,.5) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 60%, rgba(0,229,160,.12) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at 20% 70%, rgba(240,180,41,.08) 0%, transparent 60%),
            var(--deep)
          `,
        }}
      />
      <div className="grid-overlay" />
      <div
        ref={particlesRef}
        style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: 900,
          padding: "0 2rem",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(26,108,255,.12)",
            border: "1px solid rgba(26,108,255,.3)",
            borderRadius: 100,
            padding: "0.35rem 1rem 0.35rem 0.5rem",
            marginBottom: "2rem",
            fontSize: "0.8rem",
            color: "var(--muted)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--green)",
              animation: "badgePulse 2s infinite",
              display: "inline-block",
            }}
          />
          Now in Open Beta — Join 12,000+ members
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-2px",
            marginBottom: "1.5rem",
          }}
        >
          <span className="gradient-text">The Future of</span>
          <br />
          <span className="blue-text">Cooperative Finance</span>
          <br />
          <span className="gradient-text">Has Arrived.</span>
        </h1>

        {/* Sub */}
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--muted)",
            maxWidth: 580,
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Digital Njangi. Cross-border transfers. Escrow protection. Crypto &
          fiat in one unified ecosystem built for trust.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "4rem",
          }}
        >
          <button
            onClick={onGetStarted}
            className="btn-gold"
            style={{
              padding: "0.7rem 2rem",
              fontSize: "0.95rem",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
            }}
          >
            Get Started Free
          </button>
          <button
            onClick={onLogin}
            className="btn-ghost"
            style={{
              padding: "0.7rem 1.5rem",
              fontSize: "0.95rem",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "Syne, sans-serif",
              fontWeight: 600,
            }}
          >
            Join a Njangi →
          </button>
        </div>

        {/* Floating Cards */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 700,
            margin: "0 auto",
            height: 280,
          }}
        >
          {/* Left card */}
          <FloatCard
            style={
              {
                left: "2%",
                top: 60,
                width: 200,
                "--rot": "-8deg",
                animationDuration: "5s",
                animationDelay: "-1s",
                background: "rgba(10,20,60,.7)",
              } as React.CSSProperties
            }
          >
            <div
              style={{
                fontSize: "0.65rem",
                color: "var(--muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}
            >
              Group Savings
            </div>
            <div
              style={{
                fontFamily: "Syne",
                fontSize: "1.3rem",
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                  fontWeight: 400,
                }}
              >
                XAF{" "}
              </span>
              4,250,000
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "0.75rem",
              }}
            >
              <span className="chip chip-green">Active ✓</span>
              <span style={{ color: "var(--green)", fontSize: "0.8rem" }}>
                ↑ 12%
              </span>
            </div>
          </FloatCard>

          {/* Main card */}
          <FloatCard
            style={
              {
                left: "50%",
                transform: "translateX(-50%)",
                top: 30,
                width: 280,
                "--rot": "-2deg",
                animationDuration: "4s",
                zIndex: 3,
                background:
                  "linear-gradient(135deg,rgba(10,30,100,.85),rgba(5,15,50,.92))",
                borderColor: "rgba(26,108,255,.35)",
              } as React.CSSProperties
            }
          >
            <div
              style={{
                fontSize: "0.65rem",
                color: "var(--muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}
            >
              Total Balance
            </div>
            <div
              style={{
                fontFamily: "Syne",
                fontSize: "1.45rem",
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  fontWeight: 400,
                }}
              >
                USDT{" "}
              </span>
              28,430.00
            </div>
            <div
              style={{
                marginTop: "0.75rem",
                height: 3,
                background: "rgba(255,255,255,.08)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "68%",
                  background: "linear-gradient(90deg,#1a6cff,#00e5a0)",
                  borderRadius: 2,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                Njangi fund 68%
              </span>
              <span className="chip chip-blue">Escrow Protected</span>
            </div>
          </FloatCard>

          {/* Right card */}
          <FloatCard
            style={
              {
                right: "2%",
                top: 40,
                width: 200,
                "--rot": "6deg",
                animationDuration: "4.5s",
                animationDelay: "-0.5s",
                background: "rgba(10,20,60,.7)",
              } as React.CSSProperties
            }
          >
            <div
              style={{
                fontSize: "0.65rem",
                color: "var(--muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}
            >
              Last Transfer
            </div>
            <div
              style={{
                fontFamily: "Syne",
                fontSize: "1.3rem",
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                  fontWeight: 400,
                }}
              >
                NGN{" "}
              </span>
              185,000
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "0.75rem",
              }}
            >
              <span className="chip chip-gold">XAF settled</span>
              <span style={{ color: "var(--green)", fontSize: "0.8rem" }}>
                2 min ago
              </span>
            </div>
          </FloatCard>

          {/* Transfer line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "28%",
              width: "44%",
              height: 2,
              background:
                "linear-gradient(90deg,transparent,var(--electric),transparent)",
              animation: "pulseLine 2s ease-in-out infinite",
            }}
          />
          <div className="transfer-dot" />
        </div>
      </div>
    </section>
  );
}

function FloatCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="card-float"
      style={{
        position: "absolute",
        borderRadius: 16,
        backdropFilter: "blur(20px)",
        border: "1px solid var(--glass-border)",
        padding: "1.25rem 1.5rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
