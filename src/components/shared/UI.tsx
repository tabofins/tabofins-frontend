"use client";
import React, { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// COLOUR & STYLE TOKENS (mirrors CSS variables — used inline for consistency)
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  electric: "var(--electric)",
  gold: "var(--gold)",
  gold2: "var(--gold2)",
  green: "var(--green)",
  navy: "var(--navy)",
  deep: "var(--deep)",
  text: "var(--text)",
  muted: "var(--muted)",
  cardBg: "var(--card-bg)",
  glass: "var(--glass)",
  glassBorder: "var(--glass-border)",
};

// ─────────────────────────────────────────────────────────────────────────────
// GLASS CARD
// ─────────────────────────────────────────────────────────────────────────────
export function GlassCard({
  children,
  style,
  hover = true,
  glow,
  onClick,
  noPad,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  hover?: boolean;
  glow?: "blue" | "gold" | "green" | "red";
  onClick?: () => void;
  noPad?: boolean;
}) {
  const glowColor =
    glow === "gold"
      ? "rgba(240,180,41,.13)"
      : glow === "green"
        ? "rgba(0,229,160,.13)"
        : glow === "red"
          ? "rgba(255,107,107,.10)"
          : "rgba(26,108,255,.09)";

  function ov(e: React.MouseEvent<HTMLDivElement>) {
    if (!hover) return;
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.borderColor = "rgba(26,108,255,.40)";
  }
  function ou(e: React.MouseEvent<HTMLDivElement>) {
    if (!hover) return;
    e.currentTarget.style.transform = "";
    e.currentTarget.style.borderColor = "";
  }

  return (
    <div
      onClick={onClick}
      onMouseOver={ov}
      onMouseOut={ou}
      style={{
        background: C.cardBg,
        border: `1px solid ${C.glassBorder}`,
        borderRadius: 20,
        backdropFilter: "blur(16px)",
        padding: noPad ? 0 : "1.5rem",
        position: "relative",
        overflow: "hidden",
        transition: "all .25s",
        cursor: onClick ? "pointer" : undefined,
        ...style,
      }}
    >
      {glow && (
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: `radial-gradient(circle,${glowColor},transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BADGE
// ─────────────────────────────────────────────────────────────────────────────
type BadgeVariant =
  | "blue"
  | "gold"
  | "green"
  | "red"
  | "muted"
  | "orange"
  | "purple";

export function Badge({
  children,
  variant = "blue",
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) {
  const map: Record<BadgeVariant, React.CSSProperties> = {
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
      border: "1px solid rgba(255,107,107,.20)",
    },
    muted: {
      background: "rgba(255,255,255,.06)",
      color: "var(--muted)",
      border: "1px solid var(--glass-border)",
    },
    orange: {
      background: "rgba(255,165,0,.12)",
      color: "#ffb347",
      border: "1px solid rgba(255,165,0,.20)",
    },
    purple: {
      background: "rgba(160,100,255,.12)",
      color: "#c9a0ff",
      border: "1px solid rgba(160,100,255,.20)",
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
        fontFamily: "Syne, sans-serif",
        whiteSpace: "nowrap",
        ...map[variant],
      }}
    >
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────────────
export function ProgressBar({
  value,
  color = "blue",
  height = 6,
  animated,
}: {
  value: number;
  color?: "blue" | "gold" | "green" | "muted" | "red";
  height?: number;
  animated?: boolean;
}) {
  const bg =
    color === "gold"
      ? "linear-gradient(90deg,var(--gold),#e89a00)"
      : color === "green"
        ? "linear-gradient(90deg,var(--green),#00c489)"
        : color === "muted"
          ? "rgba(255,255,255,.15)"
          : color === "red"
            ? "linear-gradient(90deg,#ff6b6b,#cc3333)"
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
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: bg,
          borderRadius: height,
          transition: animated
            ? "width 1.2s cubic-bezier(.4,0,.2,1)"
            : "width .6s ease",
          boxShadow:
            color !== "muted" ? "0 0 8px rgba(26,108,255,.3)" : undefined,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CIRCULAR PROGRESS
// ─────────────────────────────────────────────────────────────────────────────
export function CircularProgress({
  value,
  size = 80,
  label,
  sublabel,
  color = "#1a6cff",
}: {
  value: number;
  size?: number;
  label?: string;
  sublabel?: string;
  color?: string;
}) {
  const r = 15.9;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg
        viewBox="0 0 36 36"
        style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
      >
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,.07)"
          strokeWidth="2.5"
        />
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
        />
      </svg>
      {label && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Syne",
              fontWeight: 800,
              fontSize: size * 0.19,
              color: C.text,
            }}
          >
            {label}
          </div>
          {sublabel && (
            <div style={{ fontSize: size * 0.12, color: C.muted }}>
              {sublabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE HEADER
// ─────────────────────────────────────────────────────────────────────────────
export function PageHeader({
  title,
  sub,
  action,
  back,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
  back?: string;
}) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      {back && (
        <a
          href={back}
          style={{
            color: C.muted,
            textDecoration: "none",
            fontSize: "0.82rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            marginBottom: "0.75rem",
          }}
        >
          ← Back
        </a>
      )}
      <div
        style={{
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
            <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.5 }}>
              {sub}
            </p>
          )}
        </div>
        {action && <div style={{ flexShrink: 0 }}>{action}</div>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────────────────────────────────────
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
        marginBottom: "1.25rem",
        flexWrap: "wrap",
        gap: "0.75rem",
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: "Syne",
            fontSize: "1.05rem",
            fontWeight: 700,
            marginBottom: sub ? "0.2rem" : 0,
          }}
        >
          {title}
        </h2>
        {sub && <p style={{ fontSize: "0.78rem", color: C.muted }}>{sub}</p>}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTION BUTTON
// ─────────────────────────────────────────────────────────────────────────────
type BtnVariant = "primary" | "gold" | "ghost" | "danger" | "green" | "muted";
type BtnSize = "xs" | "sm" | "md" | "lg";

export function ActionButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  style: xs,
  disabled,
  fullWidth,
  icon,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  size?: BtnSize;
  style?: React.CSSProperties;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: string;
}) {
  const pad: Record<BtnSize, string> = {
    xs: "0.28rem 0.6rem",
    sm: "0.42rem 0.9rem",
    md: "0.62rem 1.4rem",
    lg: "0.88rem 2rem",
  };
  const fs: Record<BtnSize, string> = {
    xs: "0.7rem",
    sm: "0.78rem",
    md: "0.88rem",
    lg: "1rem",
  };
  const vMap: Record<BtnVariant, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg,var(--electric),#0052cc)",
      color: "#fff",
      boxShadow: "0 4px 16px rgba(26,108,255,.28)",
    },
    gold: {
      background: "linear-gradient(135deg,var(--gold),#e89a00)",
      color: "#0a0a0a",
    },
    ghost: {
      background: "transparent",
      color: C.text,
      border: `1px solid ${C.glassBorder}`,
    },
    danger: {
      background: "rgba(255,107,107,.12)",
      color: "#ff8080",
      border: "1px solid rgba(255,107,107,.20)",
    },
    green: {
      background: "linear-gradient(135deg,var(--green),#00c489)",
      color: "#0a0a0a",
    },
    muted: {
      background: "rgba(255,255,255,.06)",
      color: C.muted,
      border: `1px solid ${C.glassBorder}`,
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: pad[size],
        borderRadius: 10,
        fontFamily: "Syne, sans-serif",
        fontWeight: 600,
        fontSize: fs[size],
        cursor: disabled ? "not-allowed" : "pointer",
        border: "none",
        transition: "all .22s",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.4rem",
        width: fullWidth ? "100%" : undefined,
        opacity: disabled ? 0.5 : 1,
        ...vMap[variant],
        ...xs,
      }}
      onMouseOver={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLButtonElement).style.filter =
            "brightness(1.12)";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLButtonElement).style.filter = "";
      }}
    >
      {icon && <span style={{ fontSize: "1em" }}>{icon}</span>}
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────────────────────────────────────
export function StatCard({
  label,
  value,
  sub,
  icon,
  change,
  glow,
  onClick,
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: string;
  change?: number;
  glow?: "blue" | "gold" | "green";
  onClick?: () => void;
}) {
  return (
    <GlassCard glow={glow} style={{ padding: "1.4rem" }} onClick={onClick}>
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
            color: C.muted,
          }}
        >
          {label}
        </span>
        {icon && <span style={{ fontSize: "1.2rem" }}>{icon}</span>}
      </div>
      <div
        style={{
          fontFamily: "Syne",
          fontSize: "1.55rem",
          fontWeight: 800,
          lineHeight: 1,
          marginBottom: "0.4rem",
        }}
      >
        {value}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {sub && (
          <span style={{ fontSize: "0.75rem", color: C.muted }}>{sub}</span>
        )}
        {change !== undefined && (
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: change >= 0 ? C.green : "#ff6b6b",
            }}
          >
            {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
          </span>
        )}
      </div>
    </GlassCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────────────────────
export function Modal({
  title,
  children,
  onClose,
  maxWidth = 460,
  subtitle,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  maxWidth?: number;
  subtitle?: string;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(4,13,31,.88)",
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
            "linear-gradient(145deg,rgba(10,25,70,.95),rgba(5,15,40,.98))",
          border: "1px solid rgba(26,108,255,.25)",
          borderRadius: 24,
          padding: "2rem",
          width: "100%",
          maxWidth,
          backdropFilter: "blur(24px)",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "Syne",
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              {title}
            </h3>
            {subtitle && (
              <p
                style={{
                  fontSize: "0.78rem",
                  color: C.muted,
                  marginTop: "0.2rem",
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: C.muted,
              fontSize: "1.3rem",
              cursor: "pointer",
              lineHeight: 1,
              flexShrink: 0,
              padding: "0 0 0 0.5rem",
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

// ─────────────────────────────────────────────────────────────────────────────
// CONFIRMATION MODAL  (reusable ok/cancel prompt)
// ─────────────────────────────────────────────────────────────────────────────
export function ConfirmModal({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger",
  icon,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: BtnVariant;
  icon?: string;
}) {
  return (
    <Modal title={title} onClose={onCancel} maxWidth={420}>
      {icon && (
        <div
          style={{
            fontSize: "3rem",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          {icon}
        </div>
      )}
      <p
        style={{
          color: C.muted,
          fontSize: "0.88rem",
          lineHeight: 1.6,
          marginBottom: "1.5rem",
        }}
      >
        {message}
      </p>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <ActionButton variant="ghost" onClick={onCancel} fullWidth>
          {cancelLabel}
        </ActionButton>
        <ActionButton variant={variant} onClick={onConfirm} fullWidth>
          {confirmLabel}
        </ActionButton>
      </div>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORM FIELD
// ─────────────────────────────────────────────────────────────────────────────
export function FormField({
  label,
  children,
  hint,
  required,
  error,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.78rem",
          fontWeight: 500,
          color: C.muted,
          marginBottom: "0.45rem",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#ff8080", marginLeft: "0.2rem" }}>*</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p style={{ fontSize: "0.7rem", color: C.muted, marginTop: "0.3rem" }}>
          {hint}
        </p>
      )}
      {error && (
        <p
          style={{ fontSize: "0.7rem", color: "#ff8080", marginTop: "0.3rem" }}
        >
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORM INPUTS
// ─────────────────────────────────────────────────────────────────────────────
export function TFInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { icon?: string },
) {
  const { icon, style: xs, ...rest } = props;
  if (icon) {
    return (
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: "0.9rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1rem",
            pointerEvents: "none",
          }}
        >
          {icon}
        </span>
        <input
          className="form-input"
          style={{ paddingLeft: "2.5rem", ...xs }}
          {...rest}
        />
      </div>
    );
  }
  return <input className="form-input" style={xs} {...rest} />;
}

export function TFSelect({
  children,
  style: xs,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="form-input"
      style={{ appearance: "none" as const, ...xs }}
      {...props}
    >
      {children}
    </select>
  );
}

export function TFTextarea({
  style: xs,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="form-input"
      style={{ resize: "vertical", minHeight: 80, ...xs }}
      {...props}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SEARCH INPUT
// ─────────────────────────────────────────────────────────────────────────────
export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  style: xs,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ position: "relative", ...xs }}>
      <span
        style={{
          position: "absolute",
          left: "0.9rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "1rem",
          color: C.muted,
          pointerEvents: "none",
        }}
      >
        🔍
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input"
        style={{ paddingLeft: "2.5rem" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB BAR
// ─────────────────────────────────────────────────────────────────────────────
export function TabBar({
  tabs,
  active,
  onChange,
  style: xs,
}: {
  tabs: { id: string; label: string; icon?: string; badge?: number }[];
  active: string;
  onChange: (id: string) => void;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.25rem",
        background: "rgba(255,255,255,.04)",
        borderRadius: 12,
        padding: "0.25rem",
        marginBottom: "1.75rem",
        flexWrap: "wrap",
        ...xs,
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            flex: 1,
            minWidth: 70,
            padding: "0.55rem 0.9rem",
            borderRadius: 9,
            border: "none",
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            fontSize: "0.8rem",
            cursor: "pointer",
            transition: "all .2s",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.35rem",
            position: "relative",
            background:
              active === t.id
                ? "linear-gradient(135deg,var(--electric),#0052cc)"
                : "transparent",
            color: active === t.id ? "#fff" : C.muted,
            boxShadow:
              active === t.id ? "0 2px 10px rgba(26,108,255,.30)" : undefined,
          }}
        >
          {t.icon && <span>{t.icon}</span>}
          {t.label}
          {t.badge !== undefined && t.badge > 0 && (
            <span
              style={{
                background: "#ff6b6b",
                color: "#fff",
                borderRadius: 100,
                fontSize: "0.58rem",
                fontWeight: 700,
                padding: "0.1rem 0.38rem",
                marginLeft: "0.2rem",
              }}
            >
              {t.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOGGLE
// ─────────────────────────────────────────────────────────────────────────────
export function Toggle({
  on,
  onChange,
  disabled,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div
      onClick={() => {
        if (!disabled) onChange(!on);
      }}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: on ? "var(--electric)" : "rgba(255,255,255,.10)",
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background .25s",
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: on ? 22 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .25s",
          boxShadow: "0 1px 4px rgba(0,0,0,.30)",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────────────────────
export function EmptyState({
  emoji,
  title,
  sub,
  action,
}: {
  emoji: string;
  title: string;
  sub: string;
  action?: React.ReactNode;
}) {
  return (
    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{emoji}</div>
      <h3
        style={{ fontFamily: "Syne", fontWeight: 700, marginBottom: "0.5rem" }}
      >
        {title}
      </h3>
      <p
        style={{
          color: C.muted,
          fontSize: "0.88rem",
          marginBottom: action ? "1.5rem" : 0,
          lineHeight: 1.5,
        }}
      >
        {sub}
      </p>
      {action}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INFO ROW  (label → value pair used in detail cards)
// ─────────────────────────────────────────────────────────────────────────────
export function InfoRow({
  label,
  value,
  accent,
  mono,
  last,
}: {
  label: string;
  value: string;
  accent?: boolean;
  mono?: boolean;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.65rem 0",
        borderBottom: last ? "none" : "1px solid rgba(100,160,255,.06)",
      }}
    >
      <span style={{ fontSize: "0.82rem", color: C.muted }}>{label}</span>
      <span
        style={{
          fontFamily: mono ? "monospace" : "Syne, sans-serif",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: accent ? C.green : C.text,
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP PROGRESS BAR  (used in multi-step modals / KYC / signup)
// ─────────────────────────────────────────────────────────────────────────────
export function StepProgress({
  steps,
  current,
}: {
  steps: string[];
  current: number; // 1-based
}) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {/* Bars */}
      <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.6rem" }}>
        {steps.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background:
                i < current
                  ? "var(--electric)"
                  : i === current - 1
                    ? "var(--electric)"
                    : "rgba(255,255,255,.08)",
              transition: "background .3s",
            }}
          />
        ))}
      </div>
      {/* Label */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.72rem",
          color: C.muted,
        }}
      >
        <span>
          Step {current} of {steps.length}
        </span>
        <span>{steps[current - 1]}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP DOTS  (compact version used in auth modals)
// ─────────────────────────────────────────────────────────────────────────────
export function StepDots({
  total,
  current,
}: {
  total: number;
  current: number; // 1-based
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.4rem",
        justifyContent: "center",
        marginBottom: "1.25rem",
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current - 1 ? 24 : 8,
            height: 8,
            borderRadius: 4,
            background:
              i === current - 1
                ? "var(--electric)"
                : i < current - 1
                  ? "var(--green)"
                  : "rgba(255,255,255,.10)",
            transition: "all .3s",
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NOTIFICATION TOAST  (in-page flash message)
// ─────────────────────────────────────────────────────────────────────────────
export function Toast({
  message,
  type = "success",
  onClose,
}: {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const meta = {
    success: {
      icon: "✅",
      bg: "rgba(0,229,160,.12)",
      border: "rgba(0,229,160,.25)",
      color: C.green,
    },
    error: {
      icon: "❌",
      bg: "rgba(255,107,107,.1)",
      border: "rgba(255,107,107,.25)",
      color: "#ff8080",
    },
    warning: {
      icon: "⚠️",
      bg: "rgba(255,165,0,.1)",
      border: "rgba(255,165,0,.25)",
      color: "#ffb347",
    },
    info: {
      icon: "ℹ️",
      bg: "rgba(26,108,255,.1)",
      border: "rgba(26,108,255,.25)",
      color: "#7eb8ff",
    },
  }[type];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.85rem 1.25rem",
        background: meta.bg,
        border: `1px solid ${meta.border}`,
        borderRadius: 14,
        backdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0,0,0,.4)",
        animation: "slideUp .3s ease",
        maxWidth: 340,
      }}
    >
      <span style={{ fontSize: "1.1rem" }}>{meta.icon}</span>
      <span
        style={{
          fontSize: "0.85rem",
          color: meta.color,
          flex: 1,
          lineHeight: 1.4,
        }}
      >
        {message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: C.muted,
          cursor: "pointer",
          fontSize: "1rem",
          flexShrink: 0,
        }}
      >
        ✕
      </button>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOADING SPINNER
// ─────────────────────────────────────────────────────────────────────────────
export function Spinner({
  size = 32,
  label,
}: {
  size?: number;
  label?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `3px solid rgba(26,108,255,.15)`,
          borderTopColor: "var(--electric)",
          animation: "spin .7s linear infinite",
        }}
      />
      {label && (
        <span style={{ fontSize: "0.8rem", color: C.muted }}>{label}</span>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON LOADER
// ─────────────────────────────────────────────────────────────────────────────
export function Skeleton({
  width = "100%",
  height = 18,
  radius = 8,
  style: xs,
}: {
  width?: string | number;
  height?: number;
  radius?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background:
          "linear-gradient(90deg,rgba(255,255,255,.04) 0%,rgba(255,255,255,.09) 50%,rgba(255,255,255,.04) 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        ...xs,
      }}
    >
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AVATAR STACK  (overlapping avatars for group displays)
// ─────────────────────────────────────────────────────────────────────────────
export function AvatarStack({
  initials,
  size = 32,
  max = 5,
}: {
  initials: string[];
  size?: number;
  max?: number;
}) {
  const shown = initials.slice(0, max);
  const overflow = initials.length - max;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {shown.map((init, i) => (
        <div
          key={i}
          title={init}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: "linear-gradient(135deg,var(--electric),var(--green))",
            border: `2px solid var(--navy)`,
            marginLeft: i === 0 ? 0 : -(size * 0.28),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: size * 0.33,
            color: "#fff",
            zIndex: shown.length - i,
            flexShrink: 0,
          }}
        >
          {init.slice(0, 2)}
        </div>
      ))}
      {overflow > 0 && (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: "rgba(255,255,255,.1)",
            border: `2px solid var(--navy)`,
            marginLeft: -(size * 0.28),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: size * 0.28,
            color: C.muted,
            zIndex: 0,
          }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RATING STARS
// ─────────────────────────────────────────────────────────────────────────────
export function RatingStars({
  rating,
  showValue = true,
  size = "0.75rem",
}: {
  rating: number;
  showValue?: boolean;
  size?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            fontSize: size,
            color: i <= Math.round(rating) ? C.gold2 : C.muted,
          }}
        >
          ★
        </span>
      ))}
      {showValue && (
        <span style={{ fontSize: size, color: C.muted, marginLeft: "0.2rem" }}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ONLINE INDICATOR
// ─────────────────────────────────────────────────────────────────────────────
export function OnlineDot({ online }: { online: boolean }) {
  return (
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: online ? C.green : C.muted,
        boxShadow: online ? `0 0 6px ${C.green}` : undefined,
        flexShrink: 0,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CURRENCY PILL  (coloured currency tag)
// ─────────────────────────────────────────────────────────────────────────────
export function CurrencyPill({ currency }: { currency: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    XAF: { bg: "rgba(240,180,41,.15)", color: C.gold2 },
    NGN: { bg: "rgba(0,229,160,.15)", color: C.green },
    USDT: { bg: "rgba(26,108,255,.15)", color: "#7eb8ff" },
    GHS: { bg: "rgba(160,100,255,.15)", color: "#c9a0ff" },
    KES: { bg: "rgba(255,165,0,.15)", color: "#ffb347" },
  };
  const s = map[currency] ?? { bg: "rgba(255,255,255,.08)", color: C.muted };
  return (
    <span
      style={{
        padding: "0.2rem 0.6rem",
        borderRadius: 100,
        fontSize: "0.7rem",
        fontFamily: "Syne",
        fontWeight: 700,
        background: s.bg,
        color: s.color,
      }}
    >
      {currency}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATUS DOT  (coloured dot + label)
// ─────────────────────────────────────────────────────────────────────────────
export function StatusDot({ status }: { status: string }) {
  const map: Record<string, { color: string; label: string }> = {
    active: { color: C.green, label: "Active" },
    completed: { color: "#7eb8ff", label: "Completed" },
    pending: { color: C.gold2, label: "Pending" },
    paused: { color: "#ffb347", label: "Paused" },
    failed: { color: "#ff8080", label: "Failed" },
    cancelled: { color: C.muted, label: "Cancelled" },
    locked: { color: "#7eb8ff", label: "Locked" },
    open: { color: C.green, label: "Open" },
    disputed: { color: "#ff8080", label: "Disputed" },
    verified: { color: C.green, label: "Verified" },
    rejected: { color: "#ff8080", label: "Rejected" },
    unverified: { color: C.muted, label: "Unverified" },
    under_review: { color: "#ffb347", label: "Under Review" },
  };
  const s = map[status] ?? { color: C.muted, label: status };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: s.color,
          boxShadow: `0 0 5px ${s.color}`,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: "0.75rem", color: s.color, fontWeight: 600 }}>
        {s.label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MINI BAR CHART  (pure CSS sparkline)
// ─────────────────────────────────────────────────────────────────────────────
export function MiniBarChart({
  data,
  height = 48,
  color = "var(--electric)",
}: {
  data: number[];
  height?: number;
  color?: string;
}) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
      {data.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${(v / max) * 100}%`,
            background: color,
            borderRadius: "3px 3px 0 0",
            opacity: 0.7 + (i / data.length) * 0.3,
            minHeight: 3,
            transition: "height .6s ease",
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AREA SPARKLINE  (SVG line chart)
// ─────────────────────────────────────────────────────────────────────────────
export function Sparkline({
  data,
  width = 120,
  height = 40,
  color = "var(--electric)",
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });
  const linePath = `M ${pts.join(" L ")}`;
  const areaPath = `M 0,${height} L ${pts.join(" L ")} L ${width},${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: "hidden" }}
    >
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sg)" />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DONUT CHART  (SVG, single segment)
// ─────────────────────────────────────────────────────────────────────────────
export function DonutChart({
  segments,
  size = 120,
  thickness = 14,
}: {
  segments: { value: number; color: string; label: string }[];
  size?: number;
  thickness?: number;
}) {
  const r = size / 2 - thickness / 2;
  const circ = 2 * Math.PI * r;
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  let offset = 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,.06)"
        strokeWidth={thickness}
      />
      {segments.map((seg, i) => {
        const dash = (seg.value / total) * circ;
        const el = (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
          />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PENALTY BREAKDOWN CARD
// ─────────────────────────────────────────────────────────────────────────────
export function PenaltyBreakdownCard({
  amount,
  currency = "XAF",
}: {
  amount: number;
  currency?: string;
}) {
  const system = Math.round(amount * 0.3);
  const beneficiary = Math.round(amount * 0.3);
  const reserve = Math.round(amount * 0.4);

  const rows = [
    { label: "Platform (30%)", value: system, color: "#7eb8ff", icon: "🏦" },
    {
      label: "Beneficiary (30%)",
      value: beneficiary,
      color: "var(--gold2)",
      icon: "🎁",
    },
    {
      label: "Reserve Wallet (40%)",
      value: reserve,
      color: "var(--green)",
      icon: "🔒",
    },
  ];

  return (
    <div
      style={{
        padding: "1.1rem",
        background: "rgba(255,107,107,.06)",
        border: "1px solid rgba(255,107,107,.15)",
        borderRadius: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.85rem",
        }}
      >
        <span
          style={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: "0.85rem",
            color: "#ff8080",
          }}
        >
          ⚠️ Penalty Breakdown
        </span>
        <span
          style={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: "0.9rem",
            color: "#ff8080",
          }}
        >
          {currency} {amount.toLocaleString()}
        </span>
      </div>
      {rows.map((row) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.6rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
              color: C.muted,
            }}
          >
            <span>{row.icon}</span>
            {row.label}
          </div>
          <span
            style={{
              fontFamily: "Syne",
              fontWeight: 700,
              fontSize: "0.82rem",
              color: row.color,
            }}
          >
            {currency} {row.value.toLocaleString()}
          </span>
        </div>
      ))}
      <div
        style={{
          marginTop: "0.75rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid rgba(255,107,107,.12)",
          fontSize: "0.73rem",
          color: C.muted,
          lineHeight: 1.5,
        }}
      >
        Reserve wallet is distributed equally to all members when the last
        person receives their payout.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ESCROW STATUS BLOCK  (inline — not the full component version)
// ─────────────────────────────────────────────────────────────────────────────
export function EscrowBadge({
  state,
}: {
  state: "pending" | "locked" | "releasing" | "released" | "disputed";
}) {
  const map = {
    pending: {
      label: "Awaiting Lock",
      icon: "⏳",
      variant: "muted" as BadgeVariant,
    },
    locked: {
      label: "Funds Locked",
      icon: "🔒",
      variant: "blue" as BadgeVariant,
    },
    releasing: {
      label: "Releasing",
      icon: "🔄",
      variant: "orange" as BadgeVariant,
    },
    released: {
      label: "Released",
      icon: "✅",
      variant: "green" as BadgeVariant,
    },
    disputed: { label: "Disputed", icon: "⚠️", variant: "red" as BadgeVariant },
  };
  const m = map[state];
  return (
    <Badge variant={m.variant}>
      {m.icon} {m.label}
    </Badge>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRANSACTION ROW  (shared across Wallet, Dashboard, P2P history)
// ─────────────────────────────────────────────────────────────────────────────
export function TransactionRow({
  type,
  category,
  description,
  amount,
  currency,
  status,
  timestamp,
  counterparty,
  last,
}: {
  type: "credit" | "debit";
  category: string;
  description: string;
  amount: number;
  currency: string;
  status: string;
  timestamp: string;
  counterparty?: string;
  last?: boolean;
}) {
  const catIcon: Record<string, string> = {
    njangi: "🤝",
    savings: "🔒",
    swap: "🔄",
    escrow: "🛡️",
    p2p: "🔄",
    marketplace: "🛍️",
    referral: "🎁",
    penalty: "⚠️",
    interest: "📈",
    crossborder: "🌍",
    transfer: type === "credit" ? "↙️" : "↗️",
  };
  const icon = catIcon[category] ?? (type === "credit" ? "↙️" : "↗️");

  function fmt(a: number, c: string) {
    if (c === "USDT")
      return `${a.toLocaleString(undefined, { maximumFractionDigits: 2 })} USDT`;
    if (c === "NGN") return `₦${a.toLocaleString()}`;
    return `XAF ${a.toLocaleString()}`;
  }

  // Quick timeAgo inline
  function ago(ts: string) {
    const diff = Date.now() - new Date(ts).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }

  const statusVariant: Record<string, BadgeVariant> = {
    completed: "green",
    pending: "gold",
    failed: "red",
    cancelled: "muted",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.9rem 0",
        borderBottom: last ? "none" : "1px solid rgba(100,160,255,.06)",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background:
            type === "credit" ? "rgba(0,229,160,.12)" : "rgba(255,107,107,.10)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "Syne",
            fontWeight: 600,
            fontSize: "0.87rem",
            marginBottom: "0.15rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </div>
        <div style={{ fontSize: "0.72rem", color: C.muted }}>
          {ago(timestamp)}
          {counterparty ? ` · ${counterparty}` : ""}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div
          style={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: type === "credit" ? C.green : C.text,
            marginBottom: "0.2rem",
          }}
        >
          {type === "credit" ? "+" : "-"}
          {fmt(amount, currency)}
        </div>
        <Badge variant={statusVariant[status] ?? "muted"}>{status}</Badge>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WALLET BALANCE CARD
// ─────────────────────────────────────────────────────────────────────────────
export function WalletCard({
  currency,
  amount,
  lockedAmount,
  escrowAmount,
  change24h,
  label,
  onClick,
}: {
  currency: string;
  amount: number;
  lockedAmount: number;
  escrowAmount: number;
  change24h: number;
  label: string;
  onClick?: () => void;
}) {
  const accents: Record<string, { accent: string; glow: string }> = {
    XAF: { accent: "var(--gold2)", glow: "rgba(240,180,41,.22)" },
    NGN: { accent: "var(--green)", glow: "rgba(0,229,160,.22)" },
    USDT: { accent: "#7eb8ff", glow: "rgba(26,108,255,.22)" },
    GHS: { accent: "#c9a0ff", glow: "rgba(160,100,255,.22)" },
    KES: { accent: "#ffb347", glow: "rgba(255,165,0,.22)" },
  };
  const { accent, glow } = accents[currency] ?? {
    accent: C.muted,
    glow: "rgba(255,255,255,.1)",
  };

  function fmt(a: number) {
    if (currency === "USDT")
      return (
        a.toLocaleString(undefined, { maximumFractionDigits: 2 }) + " USDT"
      );
    if (currency === "NGN") return "₦" + a.toLocaleString();
    return "XAF " + a.toLocaleString();
  }

  return (
    <div
      onClick={onClick}
      style={{
        padding: "1.5rem",
        background: C.cardBg,
        border: `1px solid ${C.glassBorder}`,
        borderRadius: 20,
        backdropFilter: "blur(16px)",
        position: "relative",
        overflow: "hidden",
        cursor: onClick ? "pointer" : undefined,
        transition: "all .25s",
      }}
      onMouseOver={(e) => {
        if (onClick)
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "rgba(26,108,255,.4)";
      }}
      onMouseOut={(e) =>
        ((e.currentTarget as HTMLDivElement).style.borderColor = "")
      }
    >
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle,${glow},transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `radial-gradient(circle,${glow},transparent 80%)`,
            border: `1px solid ${accent}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: "0.72rem",
            color: accent,
          }}
        >
          {currency}
        </div>
        <span
          style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            color: change24h >= 0 ? C.green : "#ff6b6b",
          }}
        >
          {change24h >= 0 ? "↑" : "↓"} {Math.abs(change24h)}%
        </span>
      </div>

      <div
        style={{
          fontFamily: "Syne",
          fontSize: "1.65rem",
          fontWeight: 800,
          marginBottom: "0.3rem",
        }}
      >
        {fmt(amount)}
      </div>
      <div
        style={{ fontSize: "0.72rem", color: C.muted, marginBottom: "0.75rem" }}
      >
        {label}
      </div>

      {(lockedAmount > 0 || escrowAmount > 0) && (
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {lockedAmount > 0 && (
            <span
              style={{
                fontSize: "0.68rem",
                color: "#7eb8ff",
                background: "rgba(26,108,255,.1)",
                border: "1px solid rgba(26,108,255,.2)",
                borderRadius: 6,
                padding: "0.15rem 0.5rem",
              }}
            >
              🔒 {fmt(lockedAmount)} locked
            </span>
          )}
          {escrowAmount > 0 && (
            <span
              style={{
                fontSize: "0.68rem",
                color: C.gold2,
                background: "rgba(240,180,41,.1)",
                border: "1px solid rgba(240,180,41,.2)",
                borderRadius: 6,
                padding: "0.15rem 0.5rem",
              }}
            >
              🛡️ {fmt(escrowAmount)} escrow
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXCHANGE RATE PREVIEW  (cross-border / swap)
// ─────────────────────────────────────────────────────────────────────────────
export function ExchangePreview({
  fromAmount,
  fromCurrency,
  toAmount,
  toCurrency,
  rate,
  fee,
  estimatedArrival,
}: {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  rate: number;
  fee: number;
  estimatedArrival: string;
}) {
  return (
    <div
      style={{
        padding: "1.1rem",
        background: "rgba(26,108,255,.07)",
        border: "1px solid rgba(26,108,255,.18)",
        borderRadius: 14,
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.75rem",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.7rem",
              color: C.muted,
              marginBottom: "0.2rem",
            }}
          >
            You send
          </div>
          <div
            style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1.2rem" }}
          >
            {fromAmount.toLocaleString()}{" "}
            <span style={{ fontSize: "0.75rem", color: C.muted }}>
              {fromCurrency}
            </span>
          </div>
        </div>
        <div style={{ fontSize: "1.5rem" }}>→</div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "0.7rem",
              color: C.muted,
              marginBottom: "0.2rem",
            }}
          >
            Recipient gets
          </div>
          <div
            style={{
              fontFamily: "Syne",
              fontWeight: 800,
              fontSize: "1.2rem",
              color: C.green,
            }}
          >
            {toAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
            <span style={{ fontSize: "0.75rem" }}>{toCurrency}</span>
          </div>
        </div>
      </div>
      {[
        ["Rate", `1 ${fromCurrency} = ${rate} ${toCurrency}`],
        ["Fee", `${fee} ${fromCurrency}`],
        ["Arrives", estimatedArrival],
      ].map(([l, v]) => (
        <div
          key={l}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.78rem",
            marginBottom: "0.35rem",
          }}
        >
          <span style={{ color: C.muted }}>{l}</span>
          <span style={{ fontFamily: "Syne", fontWeight: 600 }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MARKET ITEM CARD  (compact grid card)
// ─────────────────────────────────────────────────────────────────────────────
export function MarketCard({
  emoji,
  title,
  price,
  currency,
  condition,
  escrow,
  seller,
  sellerRating,
  location,
  onClick,
  isFeatured,
}: {
  emoji: string;
  title: string;
  price: number;
  currency: string;
  condition: string;
  escrow: boolean;
  seller: string;
  sellerRating: number;
  location: string;
  onClick?: () => void;
  isFeatured?: boolean;
}) {
  function fmt(a: number, c: string) {
    if (c === "USDT")
      return (
        a.toLocaleString(undefined, { maximumFractionDigits: 2 }) + " USDT"
      );
    if (c === "NGN") return "₦" + a.toLocaleString();
    return "XAF " + a.toLocaleString();
  }

  return (
    <div
      onClick={onClick}
      style={{
        background: C.cardBg,
        border: `1px solid ${isFeatured ? "rgba(240,180,41,.3)" : C.glassBorder}`,
        borderRadius: 18,
        backdropFilter: "blur(16px)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all .25s",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-3px)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(26,108,255,.4)";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "";
        (e.currentTarget as HTMLDivElement).style.borderColor = isFeatured
          ? "rgba(240,180,41,.3)"
          : C.glassBorder;
      }}
    >
      {/* Image area */}
      <div
        style={{
          height: 130,
          background:
            "linear-gradient(135deg,rgba(10,30,90,.6),rgba(5,15,50,.8))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3.5rem",
          position: "relative",
        }}
      >
        {emoji}
        {isFeatured && (
          <div style={{ position: "absolute", top: 8, left: 8 }}>
            <Badge variant="gold">⭐ Featured</Badge>
          </div>
        )}
        {escrow && (
          <div style={{ position: "absolute", top: 8, right: 8 }}>
            <Badge variant="green">🔒 Escrow</Badge>
          </div>
        )}
      </div>

      {/* Details */}
      <div style={{ padding: "1rem" }}>
        <div
          style={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: "0.88rem",
            marginBottom: "0.3rem",
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: "1.1rem",
            color: C.gold2,
            marginBottom: "0.5rem",
          }}
        >
          {fmt(price, currency)}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "0.7rem", color: C.muted }}>
            <RatingStars rating={sellerRating} size="0.68rem" /> {seller}
          </div>
          <div style={{ fontSize: "0.68rem", color: C.muted }}>
            📍 {location}
          </div>
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <span
            style={{
              fontSize: "0.65rem",
              color: condition === "new" ? C.green : C.muted,
              background:
                condition === "new"
                  ? "rgba(0,229,160,.1)"
                  : "rgba(255,255,255,.05)",
              border: `1px solid ${condition === "new" ? "rgba(0,229,160,.2)" : C.glassBorder}`,
              borderRadius: 6,
              padding: "0.15rem 0.45rem",
              fontFamily: "Syne",
              fontWeight: 600,
            }}
          >
            {condition === "new"
              ? "🆕 New"
              : condition === "refurbished"
                ? "♻️ Refurbished"
                : "📦 Used"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// KYC PROGRESS TRACKER
// ─────────────────────────────────────────────────────────────────────────────
export function KYCTracker({
  steps,
}: {
  steps: {
    id: string;
    label: string;
    status: "completed" | "pending" | "rejected" | "not_started";
    note?: string;
  }[];
}) {
  const iconMap = {
    completed: "✅",
    pending: "⏳",
    rejected: "❌",
    not_started: "○",
  };
  const colorMap = {
    completed: C.green,
    pending: C.gold2,
    rejected: "#ff8080",
    not_started: C.muted,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {steps.map((step, i) => (
        <div
          key={step.id}
          style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
        >
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
                width: 32,
                height: 32,
                borderRadius: "50%",
                background:
                  step.status === "completed"
                    ? "rgba(0,229,160,.15)"
                    : step.status === "rejected"
                      ? "rgba(255,107,107,.12)"
                      : "rgba(255,255,255,.05)",
                border: `2px solid ${colorMap[step.status]}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
              }}
            >
              {iconMap[step.status]}
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  width: 2,
                  height: 32,
                  background:
                    step.status === "completed"
                      ? "rgba(0,229,160,.3)"
                      : "rgba(255,255,255,.06)",
                  margin: "4px 0",
                }}
              />
            )}
          </div>
          <div
            style={{
              paddingBottom: i < steps.length - 1 ? "1.5rem" : 0,
              paddingTop: "0.3rem",
            }}
          >
            <div
              style={{
                fontFamily: "Syne",
                fontWeight: 600,
                fontSize: "0.87rem",
                color: colorMap[step.status],
                marginBottom: "0.15rem",
              }}
            >
              {step.label}
            </div>
            {step.note && (
              <div
                style={{ fontSize: "0.72rem", color: C.muted, lineHeight: 1.4 }}
              >
                {step.note}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FILE UPLOAD DROPZONE
// ─────────────────────────────────────────────────────────────────────────────
export function DropZone({
  label,
  hint,
  accept,
  onSelect,
  icon = "📎",
}: {
  label: string;
  hint?: string;
  accept?: string;
  onSelect?: (f: File) => void;
  icon?: string;
}) {
  const [hover, setHover] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  function handleFile(files: FileList | null) {
    if (!files?.length) return;
    setSelected(files[0].name);
    onSelect?.(files[0]);
  }

  return (
    <div
      onClick={() => ref.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setHover(true);
      }}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => {
        e.preventDefault();
        setHover(false);
        handleFile(e.dataTransfer.files);
      }}
      style={{
        padding: "1.5rem",
        border: `1px dashed ${hover ? "rgba(26,108,255,.6)" : "rgba(26,108,255,.28)"}`,
        borderRadius: 14,
        textAlign: "center",
        cursor: "pointer",
        background: hover ? "rgba(26,108,255,.08)" : "transparent",
        transition: "all .2s",
      }}
    >
      <input
        ref={ref}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files)}
      />
      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
        {selected ? "✅" : icon}
      </div>
      <div
        style={{
          fontFamily: "Syne",
          fontWeight: 600,
          fontSize: "0.85rem",
          marginBottom: "0.25rem",
          color: selected ? C.green : C.text,
        }}
      >
        {selected ?? label}
      </div>
      {!selected && hint && (
        <div style={{ fontSize: "0.72rem", color: C.muted }}>{hint}</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REFERRAL CODE BLOCK
// ─────────────────────────────────────────────────────────────────────────────
export function ReferralCodeBlock({
  code,
  link,
}: {
  code: string;
  link: string;
}) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  function copy(text: string, setter: (v: boolean) => void) {
    navigator.clipboard.writeText(text).then(() => {
      setter(true);
      setTimeout(() => setter(false), 2000);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {/* Code */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1rem 1.25rem",
          background: "rgba(26,108,255,.08)",
          border: "1px solid rgba(26,108,255,.2)",
          borderRadius: 12,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "0.7rem",
              color: C.muted,
              marginBottom: "0.2rem",
            }}
          >
            Referral Code
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "0.12em",
              color: "#7eb8ff",
            }}
          >
            {code}
          </div>
        </div>
        <ActionButton
          variant="ghost"
          size="sm"
          onClick={() => copy(code, setCopiedCode)}
        >
          {copiedCode ? "✓ Copied" : "Copy"}
        </ActionButton>
      </div>
      {/* Link */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.85rem 1.25rem",
          background: "rgba(255,255,255,.04)",
          border: `1px solid ${C.glassBorder}`,
          borderRadius: 12,
        }}
      >
        <div
          style={{
            flex: 1,
            fontSize: "0.78rem",
            color: C.muted,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {link}
        </div>
        <ActionButton
          variant="ghost"
          size="sm"
          onClick={() => copy(link, setCopiedLink)}
        >
          {copiedLink ? "✓ Copied" : "Copy Link"}
        </ActionButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LEADERBOARD ROW
// ─────────────────────────────────────────────────────────────────────────────
export function LeaderboardRow({
  rank,
  name,
  avatar,
  value,
  valueLabel,
  badge,
  isMe,
}: {
  rank: number;
  name: string;
  avatar: string;
  value: string;
  valueLabel: string;
  badge: string;
  isMe: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.85rem 1rem",
        borderRadius: 12,
        background: isMe ? "rgba(26,108,255,.1)" : "rgba(255,255,255,.03)",
        border: `1px solid ${isMe ? "rgba(26,108,255,.3)" : C.glassBorder}`,
        marginBottom: "0.5rem",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: "rgba(255,255,255,.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Syne",
          fontWeight: 800,
          fontSize: "0.85rem",
          color: rank <= 3 ? C.gold2 : C.muted,
          flexShrink: 0,
        }}
      >
        {rank <= 3 ? badge : `#${rank}`}
      </div>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "linear-gradient(135deg,var(--electric),var(--green))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Syne",
          fontWeight: 700,
          fontSize: "0.8rem",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {avatar}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.87rem" }}
        >
          {name}
          {isMe ? " (you)" : ""}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: "0.9rem",
            color: C.gold2,
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: "0.68rem", color: C.muted }}>{valueLabel}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NOTIFICATION ITEM ROW
// ─────────────────────────────────────────────────────────────────────────────
export function NotificationRow({
  icon,
  title,
  message,
  time,
  read,
  badge,
  onMarkRead,
  onAction,
  actionLabel,
  last,
}: {
  icon: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  badge?: React.ReactNode;
  onMarkRead?: () => void;
  onAction?: () => void;
  actionLabel?: string;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1.1rem",
        background: read ? "transparent" : "rgba(26,108,255,.05)",
        borderBottom: last ? "none" : "1px solid rgba(100,160,255,.06)",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "rgba(255,255,255,.04)",
          border: `1px solid ${C.glassBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.15rem",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "0.5rem",
            marginBottom: "0.3rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: "0.87rem",
              }}
            >
              {title}
            </span>
            {badge}
            {!read && (
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: C.electric,
                  flexShrink: 0,
                }}
              />
            )}
          </div>
          <span
            style={{
              fontSize: "0.7rem",
              color: C.muted,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {time}
          </span>
        </div>
        <p
          style={{
            fontSize: "0.81rem",
            color: C.muted,
            lineHeight: 1.5,
            marginBottom: "0.65rem",
          }}
        >
          {message}
        </p>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {onAction && actionLabel && (
            <ActionButton variant="primary" size="xs" onClick={onAction}>
              {actionLabel}
            </ActionButton>
          )}
          {!read && onMarkRead && (
            <ActionButton variant="ghost" size="xs" onClick={onMarkRead}>
              Mark read
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION DIVIDER
// ─────────────────────────────────────────────────────────────────────────────
export function Divider({ label }: { label?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "1.25rem 0",
      }}
    >
      <div style={{ flex: 1, height: 1, background: C.glassBorder }} />
      {label && (
        <span
          style={{
            fontSize: "0.72rem",
            color: C.muted,
            fontFamily: "Syne",
            fontWeight: 600,
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
      <div style={{ flex: 1, height: 1, background: C.glassBorder }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COUNTDOWN TIMER  (payment windows in P2P)
// ─────────────────────────────────────────────────────────────────────────────
export function CountdownTimer({
  seconds: initialSeconds,
}: {
  seconds: number;
}) {
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  const urgent = remaining < 300;

  return (
    <div
      style={{
        fontFamily: "Syne",
        fontWeight: 800,
        fontSize: "1.4rem",
        color: urgent ? "#ff8080" : C.gold2,
        letterSpacing: "0.05em",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
      }}
    >
      {urgent && <span style={{ fontSize: "0.9rem" }}>⚠️</span>}
      {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSISTENCY SCORE BADGE
// ─────────────────────────────────────────────────────────────────────────────
export function ConsistencyBadge({ score }: { score: number }) {
  const color = score >= 90 ? C.green : score >= 70 ? C.gold2 : "#ff8080";
  const label =
    score >= 90 ? "Excellent" : score >= 70 ? "Good" : "Needs Attention";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <CircularProgress value={score} size={36} color={color} />
      <div>
        <div
          style={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: "0.82rem",
            color,
          }}
        >
          {score}%
        </div>
        <div style={{ fontSize: "0.68rem", color: C.muted }}>{label}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ALERT BANNER  (inline contextual alerts)
// ─────────────────────────────────────────────────────────────────────────────
export function AlertBanner({
  type = "info",
  title,
  message,
  action,
  onDismiss,
  style: xs,
}: {
  type?: "info" | "warning" | "error" | "success";
  title?: string;
  message: string;
  action?: React.ReactNode;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}) {
  const meta = {
    info: {
      icon: "ℹ️",
      bg: "rgba(26,108,255,.09)",
      border: "rgba(26,108,255,.22)",
      color: "#7eb8ff",
    },
    warning: {
      icon: "⚠️",
      bg: "rgba(255,165,0,.08)",
      border: "rgba(255,165,0,.22)",
      color: "#ffb347",
    },
    error: {
      icon: "❌",
      bg: "rgba(255,107,107,.08)",
      border: "rgba(255,107,107,.22)",
      color: "#ff8080",
    },
    success: {
      icon: "✅",
      bg: "rgba(0,229,160,.08)",
      border: "rgba(0,229,160,.22)",
      color: C.green,
    },
  }[type];

  return (
    <div
      style={{
        padding: "1rem 1.25rem",
        background: meta.bg,
        border: `1px solid ${meta.border}`,
        borderRadius: 14,
        display: "flex",
        gap: "0.85rem",
        alignItems: "flex-start",
        marginBottom: "1rem",
      }}
    >
      <div style={{ ...xs }}></div>
      <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{meta.icon}</span>
      <div style={{ flex: 1 }}>
        {title && (
          <div
            style={{
              fontFamily: "Syne",
              fontWeight: 700,
              fontSize: "0.87rem",
              color: meta.color,
              marginBottom: "0.25rem",
    
            }}
          >
            {title}
          </div>
        )}
        <div style={{ fontSize: "0.81rem", color: C.muted, lineHeight: 1.5 }}>
          {message}
        </div>
        {action && <div style={{ marginTop: "0.6rem" }}>{action}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: "none",
            border: "none",
            color: C.muted,
            cursor: "pointer",
            fontSize: "1rem",
            flexShrink: 0,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUICK ACTION BUTTON  (icon-based shortcuts on Dashboard)
// ─────────────────────────────────────────────────────────────────────────────
export function QuickActionBtn({
  icon,
  label,
  onClick,
  color = "var(--electric)",
}: {
  icon: string;
  label: string;
  onClick?: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        padding: "1.1rem 0.75rem",
        background: C.cardBg,
        border: `1px solid ${C.glassBorder}`,
        borderRadius: 16,
        cursor: "pointer",
        transition: "all .25s",
        flex: 1,
        minWidth: 80,
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(26,108,255,.1)";
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "rgba(26,108,255,.4)";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = C.cardBg;
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          C.glassBorder;
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: `rgba(26,108,255,.12)`,
          border: `1px solid rgba(26,108,255,.2)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontFamily: "Syne",
          fontWeight: 600,
          fontSize: "0.72rem",
          color: C.muted,
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD GRID LAYOUT  (responsive CSS grid wrapper)
// ─────────────────────────────────────────────────────────────────────────────
export function CardGrid({
  children,
  minWidth = 260,
  gap = "1.25rem",
  style: xs,
}: {
  children: React.ReactNode;
  minWidth?: number;
  gap?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill,minmax(${minWidth}px,1fr))`,
        gap,
        ...xs,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT ROW  (horizontal key-value for detail panels)
// ─────────────────────────────────────────────────────────────────────────────
export function StatRow({
  items,
}: {
  items: { label: string; value: string; color?: string; icon?: string }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit,minmax(140px,1fr))`,
        gap: "0.75rem",
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            padding: "0.85rem 1rem",
            background: "rgba(255,255,255,.03)",
            border: `1px solid ${C.glassBorder}`,
            borderRadius: 12,
          }}
        >
          <div
            style={{
              fontSize: "0.68rem",
              color: C.muted,
              marginBottom: "0.25rem",
            }}
          >
            {item.label}
          </div>
          <div
            style={{
              fontFamily: "Syne",
              fontWeight: 700,
              fontSize: "0.9rem",
              color: item.color ?? C.text,
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            {item.icon && <span>{item.icon}</span>}
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COPY BUTTON  (inline copy-to-clipboard)
// ─────────────────────────────────────────────────────────────────────────────
export function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  function handle() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <ActionButton variant="ghost" size="xs" onClick={handle}>
      {copied ? "✓ Copied" : label}
    </ActionButton>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TERMS SECTION BLOCK  (used in Terms & Conditions page)
// ─────────────────────────────────────────────────────────────────────────────
export function TermsBlock({
  title,
  icon,
  paragraphs,
}: {
  title: string;
  icon: string;
  paragraphs: { heading?: string; body: string }[];
}) {
  return (
    <div
      id={title.toLowerCase().replace(/\s+/g, "-")}
      style={{ marginBottom: "2.5rem" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1.25rem",
          paddingBottom: "0.75rem",
          borderBottom: `1px solid ${C.glassBorder}`,
        }}
      >
        <span style={{ fontSize: "1.5rem" }}>{icon}</span>
        <h2 style={{ fontFamily: "Syne", fontSize: "1.2rem", fontWeight: 800 }}>
          {title}
        </h2>
      </div>
      {paragraphs.map((p, i) => (
        <div key={i} style={{ marginBottom: "1.1rem" }}>
          {p.heading && (
            <h3
              style={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: "0.92rem",
                color: "#7eb8ff",
                marginBottom: "0.4rem",
              }}
            >
              {p.heading}
            </h3>
          )}
          <p style={{ color: C.muted, fontSize: "0.87rem", lineHeight: 1.7 }}>
            {p.body}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING CHAT TRIGGER  (bottom-right toggle)
// ─────────────────────────────────────────────────────────────────────────────
export function ChatFAB({
  unread = 0,
  onClick,
}: {
  unread?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "linear-gradient(135deg,var(--electric),#0052cc)",
        border: "none",
        color: "#fff",
        fontSize: "1.4rem",
        cursor: "pointer",
        boxShadow: "0 8px 24px rgba(26,108,255,.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 140,
        transition: "all .25s",
      }}
      onMouseOver={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)")
      }
      onMouseOut={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.transform = "")
      }
    >
      💬
      {unread > 0 && (
        <div
          style={{
            position: "absolute",
            top: 2,
            right: 2,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#ff6b6b",
            border: "2px solid var(--navy)",
            fontSize: "0.6rem",
            fontWeight: 700,
            fontFamily: "Syne",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {unread > 9 ? "9+" : unread}
        </div>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FILTER PILL ROW  (horizontal scrollable filter pills)
// ─────────────────────────────────────────────────────────────────────────────
export function FilterPills({
  options,
  active,
  onChange,
}: {
  options: { id: string; label: string; icon?: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.4rem",
        overflowX: "auto",
        paddingBottom: "0.25rem",
        marginBottom: "1.5rem",
      }}
    >
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          style={{
            padding: "0.4rem 0.85rem",
            borderRadius: 100,
            border:
              active === o.id
                ? "1px solid rgba(26,108,255,.45)"
                : `1px solid ${C.glassBorder}`,
            background:
              active === o.id ? "rgba(26,108,255,.15)" : "transparent",
            color: active === o.id ? "#7eb8ff" : C.muted,
            fontFamily: "Syne",
            fontWeight: 600,
            fontSize: "0.77rem",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all .2s",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            flexShrink: 0,
          }}
        >
          {o.icon && <span>{o.icon}</span>}
          {o.label}
          {o.count !== undefined && (
            <span
              style={{
                background: "rgba(255,255,255,.08)",
                borderRadius: 100,
                padding: "0.05rem 0.35rem",
                fontSize: "0.65rem",
              }}
            >
              {o.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SAVINGS INTEREST PREVIEW
// ─────────────────────────────────────────────────────────────────────────────
export function InterestPreview({
  principal,
  rate,
  months,
  currency,
}: {
  principal: number;
  rate: number; // annual %
  months: number;
  currency: string;
}) {
  const interest = principal * (rate / 100) * (months / 12);
  const total = principal + interest;

  function fmt(v: number) {
    if (currency === "USDT")
      return (
        v.toLocaleString(undefined, { maximumFractionDigits: 2 }) + " USDT"
      );
    return currency + " " + v.toLocaleString();
  }

  return (
    <div
      style={{
        padding: "1rem",
        background: "rgba(0,229,160,.07)",
        border: "1px solid rgba(0,229,160,.18)",
        borderRadius: 12,
        marginBottom: "0.75rem",
      }}
    >
      <div
        style={{
          fontFamily: "Syne",
          fontWeight: 600,
          fontSize: "0.82rem",
          color: C.green,
          marginBottom: "0.65rem",
        }}
      >
        📈 Interest Preview ({rate}% p.a.)
      </div>
      {[
        ["Principal", fmt(principal)],
        [`Interest (${months} months)`, `+${fmt(interest)}`],
        ["Total at maturity", fmt(total)],
      ].map(([l, v]) => (
        <div
          key={l}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.8rem",
            marginBottom: "0.35rem",
          }}
        >
          <span style={{ color: C.muted }}>{l}</span>
          <span
            style={{
              fontFamily: "Syne",
              fontWeight: 700,
              color: l.includes("Total") ? C.green : C.text,
            }}
          >
            {v}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GROUP SAVINGS LEAVING WARNING
// ─────────────────────────────────────────────────────────────────────────────
export function LeavingGroupWarning({
  contributed,
  currency,
}: {
  contributed: number;
  currency: string;
}) {
  const forfeited = Math.round(contributed * 0.5);
  const toMembers = Math.round(contributed * 0.25);
  const toSystem = Math.round(contributed * 0.25);

  function fmt(v: number) {
    if (currency === "USDT")
      return (
        v.toLocaleString(undefined, { maximumFractionDigits: 2 }) + " USDT"
      );
    return currency + " " + v.toLocaleString();
  }

  return (
    <div
      style={{
        padding: "1.1rem",
        background: "rgba(255,107,107,.07)",
        border: "1px solid rgba(255,107,107,.2)",
        borderRadius: 14,
      }}
    >
      <div
        style={{
          fontFamily: "Syne",
          fontWeight: 700,
          fontSize: "0.88rem",
          color: "#ff8080",
          marginBottom: "0.75rem",
        }}
      >
        ⚠️ Leaving Group — Forfeiture Warning
      </div>
      <p
        style={{
          fontSize: "0.8rem",
          color: C.muted,
          marginBottom: "0.85rem",
          lineHeight: 1.5,
        }}
      >
        By leaving, you will forfeit{" "}
        <strong style={{ color: "#ff8080" }}>50%</strong> of your total
        contribution ({fmt(forfeited)}):
      </p>
      {[
        {
          label: "To remaining members (25%)",
          value: toMembers,
          color: C.green,
        },
        { label: "To platform (25%)", value: toSystem, color: "#ff8080" },
        {
          label: "You keep (50%)",
          value: contributed - forfeited,
          color: "#7eb8ff",
        },
      ].map((row) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.79rem",
            marginBottom: "0.4rem",
          }}
        >
          <span style={{ color: C.muted }}>{row.label}</span>
          <span
            style={{ fontFamily: "Syne", fontWeight: 700, color: row.color }}
          >
            {fmt(row.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
