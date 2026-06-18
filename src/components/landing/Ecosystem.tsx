"use client";

interface EcosystemProps {
  onGetStarted: () => void;
}

const ECO = [
  { emoji: "🤝", label: "Digital Njangi" },
  { emoji: "🌍", label: "Cross-Border" },
  { emoji: "🔒", label: "Escrow Shield" },
  { emoji: "💱", label: "P2P Swap" },
  { emoji: "🪪", label: "KYC Identity" },
  { emoji: "₿", label: "Crypto + Fiat" },
];

export default function Ecosystem({ onGetStarted }: EcosystemProps) {
  return (
    <section
      id="ecosystem"
      style={{
        padding: "6rem 2rem",
        background:
          "radial-gradient(ellipse 70% 50% at 50% 50%,rgba(10,40,120,.4) 0%,var(--navy) 70%)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <div className="section-tag">Future Finance Ecosystem</div>
        <h2
          style={{
            fontSize: "clamp(2rem,4vw,3rem)",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            marginBottom: "1rem",
          }}
        >
          One platform.
          <br />
          <span className="blue-text">Infinite financial power.</span>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            maxWidth: 540,
            margin: "0 auto 1rem",
            fontSize: "1rem",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          TaboFins is next-generation community-powered financial infrastructure
          — a trust layer for Africa&apos;s digital economy and beyond.
        </p>

        {/* Hex grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1.5rem",
            marginTop: "3rem",
            maxWidth: 800,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {ECO.map((item) => (
            <div
              key={item.label}
              style={{
                aspectRatio: "1",
                background: "var(--card-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "1.5rem",
                backdropFilter: "blur(12px)",
                transition: "all .3s",
                cursor: "default",
              }}
              onMouseOver={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "scale(1.05)";
                el.style.borderColor = "rgba(26,108,255,.4)";
                el.style.background = "rgba(10,30,100,.6)";
              }}
              onMouseOut={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "";
                el.style.borderColor = "";
                el.style.background = "var(--card-bg)";
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "0.6rem" }}>
                {item.emoji}
              </div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          style={{
            marginTop: "4rem",
            padding: "3rem",
            background:
              "linear-gradient(135deg,rgba(26,108,255,.12),rgba(240,180,41,.06))",
            border: "1px solid rgba(26,108,255,.2)",
            borderRadius: 24,
            backdropFilter: "blur(12px)",
          }}
        >
          <h3
            style={{
              fontFamily: "Syne",
              fontSize: "1.8rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            Ready to build your financial future?
          </h3>
          <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
            Join thousands already saving, swapping, and growing together.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={onGetStarted}
              className="btn-gold"
              style={{
                padding: "0.75rem 2rem",
                fontSize: "0.95rem",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
              }}
            >
              Create Free Account
            </button>
            <button
              onClick={onGetStarted}
              className="btn-ghost"
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "0.95rem",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
              }}
            >
              Explore Platform
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
