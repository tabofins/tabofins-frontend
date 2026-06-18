"use client";
import React from "react";

export function GlassCard({
  children,
  style,
  hover = true,
  glow,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  hover?: boolean;
  glow?: "blue" | "gold" | "green";
}) {
  const gc =
    glow === "gold"
      ? "rgba(240,180,41,.12)"
      : glow === "green"
        ? "rgba(0,229,160,.12)"
        : "rgba(26,108,255,.08)";
  function onOver(e: React.MouseEvent<HTMLDivElement>) {
    if (!hover) return;
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.borderColor = "rgba(26,108,255,.35)";
  }
  function onOut(e: React.MouseEvent<HTMLDivElement>) {
    if (!hover) return;
    e.currentTarget.style.transform = "";
    e.currentTarget.style.borderColor = "";
  }
  return (
    <div
      onMouseOver={onOver}
      onMouseOut={onOut}
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--glass-border)",
        borderRadius: 20,
        backdropFilter: "blur(16px)",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
        transition: hover ? "all .25s" : undefined,
        ...style,
      }}
    >
      {glow && (
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: `radial-gradient(circle,${gc},transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </div>
  );
}

export function Badge({
  children,
  variant = "blue",
}: {
  children: React.ReactNode;
  variant?: "blue" | "gold" | "green" | "red" | "muted";
}) {
  const styles: Record<string, React.CSSProperties> = {
    blue: {
      background: "rgba(26,108,255,.15)",
      color: "#7eb8ff",
      border: "1px solid rgba(26,108,255,.25)",
    },
    gold: {
      background: "rgba(240,180,41,.15)",
      color: "var(--gold2)",
      border: "1px solid rgba(240,180,41,.25)",
    },
    green: {
      background: "rgba(0,229,160,.15)",
      color: "var(--green)",
      border: "1px solid rgba(0,229,160,.25)",
    },
    red: {
      background: "rgba(255,107,107,.12)",
      color: "#ff8080",
      border: "1px solid rgba(255,107,107,.2)",
    },
    muted: {
      background: "rgba(255,255,255,.06)",
      color: "var(--muted)",
      border: "1px solid var(--glass-border)",
    },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.2rem 0.65rem",
        borderRadius: 100,
        fontSize: "0.68rem",
        fontWeight: 600,
        fontFamily: "Syne",
        ...styles[variant],
      }}
    >
      {children}
    </span>
  );
}

export function ProgressBar({
  value,
  color = "blue",
  height = 6,
}: {
  value: number;
  color?: "blue" | "gold" | "green" | "muted";
  height?: number;
}) {
  const bg =
    color === "gold"
      ? "linear-gradient(90deg,var(--gold),#e89a00)"
      : color === "green"
        ? "linear-gradient(90deg,var(--green),#00c489)"
        : color === "muted"
          ? "rgba(255,255,255,.15)"
          : "linear-gradient(90deg,var(--electric),var(--green))";
  return (
    <div
      style={{
        height,
        background: "rgba(255,255,255,.08)",
        borderRadius: height,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${Math.min(100, value)}%`,
          background: bg,
          borderRadius: height,
          transition: "width 1s ease",
        }}
      />
    </div>
  );
}

export function PageHeader({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "Syne",
            fontSize: "clamp(1.5rem,3vw,2rem)",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            marginBottom: sub ? "0.4rem" : 0,
          }}
        >
          {title}
        </h1>
        {sub && (
          <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{sub}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function SectionHeader({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "1.5rem",
        flexWrap: "wrap",
        gap: "0.75rem",
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: "Syne",
            fontSize: "1.1rem",
            fontWeight: 700,
            marginBottom: sub ? "0.25rem" : 0,
          }}
        >
          {title}
        </h2>
        {sub && (
          <p style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{sub}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function ActionButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  style: xs,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "gold" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}) {
  const pad =
    size === "sm"
      ? "0.4rem 0.9rem"
      : size === "lg"
        ? "0.85rem 2rem"
        : "0.6rem 1.4rem";
  const fs = size === "sm" ? "0.78rem" : size === "lg" ? "1rem" : "0.88rem";
  const base: React.CSSProperties = {
    padding: pad,
    borderRadius: 10,
    fontFamily: "Syne,sans-serif",
    fontWeight: 600,
    fontSize: fs,
    cursor: "pointer",
    border: "none",
    transition: "all .22s",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg,var(--electric),#0052cc)",
      color: "#fff",
      boxShadow: "0 4px 16px rgba(26,108,255,.3)",
    },
    gold: {
      background: "linear-gradient(135deg,var(--gold),#e89a00)",
      color: "#0a0a0a",
    },
    ghost: {
      background: "transparent",
      color: "var(--text)",
      border: "1px solid var(--glass-border)",
    },
    danger: {
      background: "rgba(255,107,107,.12)",
      color: "#ff8080",
      border: "1px solid rgba(255,107,107,.2)",
    },
  };
  return (
    <button
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...xs }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.1)";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLButtonElement).style.filter = "";
      }}
    >
      {children}
    </button>
  );
}

export function StatCard({
  label,
  value,
  sub,
  icon,
  change,
  glow,
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: string;
  change?: number;
  glow?: "blue" | "gold" | "green";
}) {
  return (
    <GlassCard glow={glow} style={{ padding: "1.4rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "0.75rem",
        }}
      >
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          {label}
        </span>
        {icon && <span style={{ fontSize: "1.2rem" }}>{icon}</span>}
      </div>
      <div
        style={{
          fontFamily: "Syne",
          fontSize: "1.6rem",
          fontWeight: 800,
          lineHeight: 1,
          marginBottom: "0.4rem",
        }}
      >
        {value}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {sub && (
          <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
            {sub}
          </span>
        )}
        {change !== undefined && (
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: change >= 0 ? "var(--green)" : "#ff6b6b",
            }}
          >
            {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
          </span>
        )}
      </div>
    </GlassCard>
  );
}

export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(4,13,31,.85)",
        backdropFilter: "blur(16px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(145deg,rgba(10,25,70,.93),rgba(5,15,40,.97))",
          border: "1px solid rgba(26,108,255,.25)",
          borderRadius: 24,
          padding: "2rem",
          width: "100%",
          maxWidth: 460,
          backdropFilter: "blur(24px)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h3
            style={{ fontFamily: "Syne", fontSize: "1.15rem", fontWeight: 700 }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--muted)",
              fontSize: "1.4rem",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            &#x2715;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.78rem",
          fontWeight: 500,
          color: "var(--muted)",
          marginBottom: "0.45rem",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function TFInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="form-input" {...props} />;
}

export function TFSelect({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="form-input"
      style={{ appearance: "none" as const }}
      {...props}
    >
      {children}
    </select>
  );
}
