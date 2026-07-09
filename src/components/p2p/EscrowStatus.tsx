"use client";
import { Badge } from "../../components/shared/UI";

type EscrowState = "pending" | "locked" | "releasing" | "released" | "disputed";

interface Props {
  state: EscrowState;
  amount: string;
  currency: string;
}

const STATE_META: Record<
  EscrowState,
  {
    label: string;
    icon: string;
    badge: "blue" | "gold" | "green" | "red" | "muted" | "orange";
    desc: string;
  }
> = {
  pending: {
    label: "Awaiting Lock",
    icon: "⏳",
    badge: "muted",
    desc: "Waiting for seller to lock funds into escrow.",
  },
  locked: {
    label: "Funds Locked",
    icon: "🔒",
    badge: "blue",
    desc: "Funds are locked in escrow. Safe to proceed with payment.",
  },
  releasing: {
    label: "Releasing",
    icon: "🔄",
    badge: "orange",
    desc: "Escrow release in progress. Funds arriving shortly.",
  },
  released: {
    label: "Released",
    icon: "✅",
    badge: "green",
    desc: "Funds have been successfully released to the buyer.",
  },
  disputed: {
    label: "Under Dispute",
    icon: "⚠️",
    badge: "red",
    desc: "A dispute has been raised. Moderator is reviewing.",
  },
};

export default function EscrowStatus({ state, amount, currency }: Props) {
  const meta = STATE_META[state];
  return (
    <div
      style={{
        padding: "1.25rem",
        background: "rgba(26,108,255,.06)",
        border: "1px solid rgba(26,108,255,.18)",
        borderRadius: 16,
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
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.2rem" }}>{meta.icon}</span>
          <span
            style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.9rem" }}
          >
            Escrow Status
          </span>
        </div>
        <Badge variant={meta.badge}>{meta.label}</Badge>
      </div>
      <div
        style={{
          fontFamily: "Syne",
          fontSize: "1.4rem",
          fontWeight: 800,
          marginBottom: "0.4rem",
        }}
      >
        {amount}{" "}
        <span
          style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 400 }}
        >
          {currency}
        </span>
      </div>
      <div
        style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.5 }}
      >
        {meta.desc}
      </div>
    </div>
  );
}
