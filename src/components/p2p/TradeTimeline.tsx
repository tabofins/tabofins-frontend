"use client";

interface Step {
  label: string;
  sub: string;
  done: boolean;
  active: boolean;
}

interface Props {
  steps: Step[];
}

export default function TradeTimeline({ steps }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {steps.map((step, i) => (
        <div
          key={i}
          style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
        >
          {/* Dot + line */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: step.done
                  ? "linear-gradient(135deg,var(--green),#00c489)"
                  : step.active
                    ? "linear-gradient(135deg,var(--electric),#0052cc)"
                    : "rgba(255,255,255,.07)",
                border: step.active
                  ? "2px solid rgba(26,108,255,.5)"
                  : "2px solid var(--glass-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                boxShadow: step.active
                  ? "0 0 16px rgba(26,108,255,.4)"
                  : undefined,
                transition: "all .3s",
              }}
            >
              {step.done ? "✓" : step.active ? "●" : "○"}
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  width: 2,
                  flex: 1,
                  minHeight: 32,
                  background: step.done
                    ? "linear-gradient(180deg,var(--green),rgba(0,229,160,.2))"
                    : "rgba(255,255,255,.06)",
                  margin: "4px 0",
                }}
              />
            )}
          </div>
          {/* Text */}
          <div style={{ paddingBottom: i < steps.length - 1 ? "1.5rem" : 0 }}>
            <div
              style={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: "0.88rem",
                color: step.done
                  ? "var(--green)"
                  : step.active
                    ? "var(--text)"
                    : "var(--muted)",
                marginBottom: "0.2rem",
                paddingTop: "0.2rem",
              }}
            >
              {step.label}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                lineHeight: 1.4,
              }}
            >
              {step.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
