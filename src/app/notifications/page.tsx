"use client";
import { useState } from "react";
import { mockNotifications, timeAgo, Notification } from "@/src/lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
} from "@/src/components/shared/UI";

const TYPE_META: Record<
  Notification["type"],
  {
    icon: string;
    label: string;
    badgeVariant: "blue" | "gold" | "green" | "red" | "muted";
  }
> = {
  contribution: { icon: "💰", label: "Contribution", badgeVariant: "gold" },
  payout: { icon: "🎉", label: "Payout", badgeVariant: "green" },
  security: { icon: "🛡️", label: "Security", badgeVariant: "red" },
  transfer: { icon: "↗️", label: "Transfer", badgeVariant: "blue" },
  system: { icon: "📢", label: "System", badgeVariant: "muted" },
};

export default function NotificationsPage() {
  const [items, setItems] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | Notification["type"]>("all");

  const unread = items.filter((n) => !n.read).length;
  const filtered = items.filter((n) => filter === "all" || n.type === filter);

  const markAll = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markOne = (id: string) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  return (
    <div>
      <PageHeader
        title="Notifications"
        sub={`${unread} unread notification${unread !== 1 ? "s" : ""}`}
        action={
          unread > 0 ? (
            <ActionButton variant="ghost" size="sm" onClick={markAll}>
              ✓ Mark all read
            </ActionButton>
          ) : undefined
        }
      />

      {/* Filter pills */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "1.75rem",
        }}
      >
        {(
          [
            "all",
            "contribution",
            "payout",
            "security",
            "transfer",
            "system",
          ] as const
        ).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: 100,
              border:
                filter === f
                  ? "1px solid rgba(26,108,255,.4)"
                  : "1px solid var(--glass-border)",
              background: filter === f ? "rgba(26,108,255,.15)" : "transparent",
              color: filter === f ? "#7eb8ff" : "var(--muted)",
              fontSize: "0.78rem",
              cursor: "pointer",
              fontFamily: "Syne",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              transition: "all .2s",
            }}
          >
            {f !== "all" && TYPE_META[f].icon}
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* List */}
      <GlassCard hover={false}>
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "var(--muted)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
              🔔
            </div>
            <p>No notifications here.</p>
          </div>
        ) : (
          filtered.map((n, i) => {
            const meta = TYPE_META[n.type];
            return (
              <div
                key={n.id}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "1.1rem",
                  background: n.read ? "transparent" : "rgba(26,108,255,.05)",
                  borderBottom:
                    i < filtered.length - 1
                      ? "1px solid rgba(100,160,255,.06)"
                      : "none",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid var(--glass-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.15rem",
                    flexShrink: 0,
                  }}
                >
                  {meta.icon}
                </div>
                {/* Content */}
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
                          fontSize: "0.88rem",
                        }}
                      >
                        {n.title}
                      </span>
                      <Badge variant={meta.badgeVariant}>{meta.label}</Badge>
                      {!n.read && (
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: "var(--electric)",
                            display: "inline-block",
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--muted)",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {timeAgo(n.timestamp)}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--muted)",
                      lineHeight: 1.55,
                      marginBottom: "0.65rem",
                    }}
                  >
                    {n.message}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {n.actionUrl && (
                      <ActionButton variant="primary" size="sm">
                        View →
                      </ActionButton>
                    )}
                    {!n.read && (
                      <ActionButton
                        variant="ghost"
                        size="sm"
                        onClick={() => markOne(n.id)}
                      >
                        Mark read
                      </ActionButton>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </GlassCard>

      {/* Settings shortcut */}
      <div
        style={{
          marginTop: "1.5rem",
          padding: "1rem 1.25rem",
          background: "var(--card-bg)",
          border: "1px solid var(--glass-border)",
          borderRadius: 14,
          backdropFilter: "blur(16px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "Syne",
              fontWeight: 600,
              fontSize: "0.88rem",
              marginBottom: "0.2rem",
            }}
          >
            Notification Preferences
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
            Control which alerts you receive and how.
          </div>
        </div>
        <ActionButton variant="ghost" size="sm">
          ⚙️ Manage
        </ActionButton>
      </div>
    </div>
  );
}
