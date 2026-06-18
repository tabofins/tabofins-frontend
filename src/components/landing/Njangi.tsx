"use client";
import { useEffect, useRef } from "react";

const STEPS = [
  { n: 1, title: "Create Group", text: "Set members, cycle amount & schedule" },
  { n: 2, title: "Invite Members", text: "KYC-verified members join securely" },
  { n: 3, title: "Auto-Contribute", text: "Smart scheduling with reminders" },
  { n: 4, title: "Escrow Holds", text: "Funds secured until payout cycle" },
  { n: 5, title: "Auto Payout", text: "Recipient receives on schedule" },
];

const CARDS = [
  {
    icon: "👥",
    color: "icon-blue",
    title: "Group Management",
    text: "Full admin controls, member roles, voting, and dispute resolution built in.",
  },
  {
    icon: "📅",
    color: "icon-gold",
    title: "Payout Scheduling",
    text: "Automated rotation schedules. Weekly, monthly or custom intervals.",
  },
  {
    icon: "📊",
    color: "icon-green",
    title: "Contribution Tracking",
    text: "Real-time dashboards showing every member's status and cycle history.",
  },
];

export default function Njangi() {
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
      id="njangi"
      style={{ padding: "6rem 2rem", background: "var(--navy)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          <div className="section-tag">Digital Njangi</div>
          <h2
            style={{
              fontSize: "clamp(2rem,4vw,3rem)",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              marginBottom: "1rem",
            }}
          >
            Cooperative savings,
            <br />
            <span className="gradient-text">reimagined digitally.</span>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "1rem",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            The traditional rotating savings group — now automated, transparent,
            and protected by escrow.
          </p>
        </div>

        {/* Flow steps */}
        <div
          style={{
            marginTop: "3rem",
            overflowX: "auto",
            paddingBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", minWidth: 700 }}>
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "1.5rem 1rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg,var(--electric),var(--blue1))",
                    border: "2px solid rgba(26,108,255,.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    margin: "0 auto 1rem",
                    boxShadow: "0 0 20px rgba(26,108,255,.3)",
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    lineHeight: 1.5,
                  }}
                >
                  {s.text}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      right: -10,
                      top: "30%",
                      color: "var(--electric)",
                      fontSize: "1.2rem",
                    }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "1.5rem",
            marginTop: "3rem",
          }}
        >
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="glass-card"
              style={{
                padding: "1.75rem",
                transition: "all .3s",
                cursor: "default",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(26,108,255,.35)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.borderColor = "";
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  fontSize: "1.4rem",
                  background:
                    card.color === "icon-blue"
                      ? "linear-gradient(135deg,rgba(26,108,255,.3),rgba(26,108,255,.1))"
                      : card.color === "icon-gold"
                        ? "linear-gradient(135deg,rgba(240,180,41,.3),rgba(240,180,41,.1))"
                        : "linear-gradient(135deg,rgba(0,229,160,.3),rgba(0,229,160,.1))",
                  border:
                    card.color === "icon-blue"
                      ? "1px solid rgba(26,108,255,.2)"
                      : card.color === "icon-gold"
                        ? "1px solid rgba(240,180,41,.2)"
                        : "1px solid rgba(0,229,160,.2)",
                }}
              >
                {card.icon}
              </div>
              <h3
                style={{
                  fontFamily: "Syne",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "0.6rem",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
