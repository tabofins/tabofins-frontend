"use client";
import Link from "next/link";
import {
  mockNjangis,
  mockTransactions,
  formatCurrency,
  timeAgo,
  pct,
} from "@/src/lib/data";
import {
  GlassCard,
  ActionButton,
  Badge,
  ProgressBar,
  SectionHeader,
} from "@/src/components/shared/UI";
import { Avatar } from "@/src/components/shared/AuthenticatedLayout";

export default function NjangiDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const nj = mockNjangis.find((n) => n.id === params.id) ?? mockNjangis[0];
  const njTx = mockTransactions.filter((tx) => tx.category === "njangi");
  const currentEater = nj.members.find((m) => m.isCurrentEater);

  return (
    <div>
      {/* Back */}
      <Link
        href="/njangi"
        style={{
          color: "var(--muted)",
          textDecoration: "none",
          fontSize: "0.82rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          marginBottom: "1.5rem",
        }}
      >
        ← Back to Njangis
      </Link>

      {/* Header */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background:
                "linear-gradient(135deg,rgba(26,108,255,.3),rgba(26,108,255,.1))",
              border: "1px solid rgba(26,108,255,.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            🤝
          </div>
          <div>
            <h1
              style={{
                fontFamily: "Syne",
                fontSize: "clamp(1.4rem,3vw,1.9rem)",
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              {nj.name}
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "0.88rem" }}>
              {nj.description}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {!nj.myContributionPaid && (
            <ActionButton variant="primary">💳 Pay Now</ActionButton>
          )}
          <ActionButton variant="ghost">⚙️ Manage Group</ActionButton>
        </div>
      </div>

      {/* Overview stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {[
          {
            label: "Total Pool",
            value: formatCurrency(nj.totalPool, nj.currency),
            icon: "💰",
            color: "var(--gold2)",
          },
          {
            label: "Per Cycle",
            value: formatCurrency(nj.cycleAmount, nj.currency),
            icon: "📅",
            color: "#7eb8ff",
          },
          {
            label: "Progress",
            value: `${nj.currentCycle}/${nj.totalCycles}`,
            icon: "🔄",
            color: "var(--green)",
          },
          {
            label: "My Position",
            value: `#${nj.myPosition}`,
            icon: "🎯",
            color: "var(--gold2)",
          },
          {
            label: "Penalty Rate",
            value: `${nj.penaltyRate}%`,
            icon: "⚠️",
            color: "#ff8080",
          },
          {
            label: "Members",
            value: `${nj.members.length}`,
            icon: "👥",
            color: "#7eb8ff",
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              padding: "1.1rem",
              background: "var(--card-bg)",
              border: "1px solid var(--glass-border)",
              borderRadius: 16,
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              {s.icon}
            </div>
            <div
              style={{
                fontFamily: "Syne",
                fontWeight: 800,
                fontSize: "1rem",
                color: s.color,
                marginBottom: "0.2rem",
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Current Beneficiary Banner */}
      {currentEater && (
        <div
          style={{
            padding: "1rem 1.5rem",
            background:
              "linear-gradient(135deg,rgba(240,180,41,.12),rgba(240,180,41,.05))",
            border: "1px solid rgba(240,180,41,.25)",
            borderRadius: 16,
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: "2rem" }}>🎉</div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--gold2)",
                marginBottom: "0.2rem",
              }}
            >
              Current Beneficiary — Cycle {nj.currentCycle}
            </div>
            <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
              {currentEater.name} receives{" "}
              {formatCurrency(nj.cycleAmount * nj.members.length, nj.currency)}{" "}
              on{" "}
              {new Date(nj.nextPayoutDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          <Badge variant="gold">In Progress</Badge>
        </div>
      )}

      {/* Two col: timeline + contributions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Payout Timeline */}
        <GlassCard hover={false}>
          <SectionHeader
            title="Payout Timeline"
            sub={`Cycle ${nj.currentCycle} of ${nj.totalCycles}`}
          />
          <div style={{ marginBottom: "1rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginBottom: "0.5rem",
              }}
            >
              <span>Overall progress</span>
              <span>{pct(nj.currentCycle, nj.totalCycles)}%</span>
            </div>
            <ProgressBar
              value={pct(nj.currentCycle, nj.totalCycles)}
              color="blue"
              height={8}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {[...nj.members]
              .sort((a, b) => a.position - b.position)
              .map((m) => {
                const received = m.position < nj.currentCycle;
                const isCurrent = m.isCurrentEater;
                const isMe = m.avatar === "AT" && m.position === nj.myPosition;
                return (
                  <div
                    key={m.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.65rem 0.9rem",
                      borderRadius: 10,
                      background: isCurrent
                        ? "rgba(240,180,41,.08)"
                        : isMe
                          ? "rgba(26,108,255,.08)"
                          : "rgba(255,255,255,.03)",
                      border: `1px solid ${isCurrent ? "rgba(240,180,41,.25)" : isMe ? "rgba(26,108,255,.25)" : "var(--glass-border)"}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Syne",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                        width: 20,
                        flexShrink: 0,
                      }}
                    >
                      #{m.position}
                    </span>
                    <Avatar initials={m.avatar} size={28} />
                    <span
                      style={{
                        flex: 1,
                        fontFamily: "Syne",
                        fontSize: "0.82rem",
                        fontWeight: isCurrent || isMe ? 700 : 400,
                        color: isCurrent
                          ? "var(--gold2)"
                          : isMe
                            ? "#7eb8ff"
                            : "var(--text)",
                      }}
                    >
                      {m.name}
                      {isMe ? " (you)" : ""}
                    </span>
                    {isCurrent && <Badge variant="gold">Now 🎉</Badge>}
                    {received && !isCurrent && (
                      <Badge variant="green">Done ✓</Badge>
                    )}
                    {!received && !isCurrent && (
                      <Badge variant="muted">Waiting</Badge>
                    )}
                  </div>
                );
              })}
          </div>
        </GlassCard>

        {/* Contribution Status */}
        <GlassCard hover={false}>
          <SectionHeader title="This Cycle — Contributions" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.55rem",
              marginBottom: "1.5rem",
            }}
          >
            {nj.members.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.65rem 0.9rem",
                  borderRadius: 10,
                  background: m.hasPaid
                    ? "rgba(0,229,160,.05)"
                    : "rgba(255,107,107,.04)",
                  border: `1px solid ${m.hasPaid ? "rgba(0,229,160,.15)" : "rgba(255,107,107,.12)"}`,
                }}
              >
                <Avatar initials={m.avatar} size={28} />
                <span
                  style={{
                    flex: 1,
                    fontSize: "0.82rem",
                    fontFamily: "Syne",
                    fontWeight: 500,
                  }}
                >
                  {m.name}
                </span>
                <Badge variant={m.hasPaid ? "green" : "red"}>
                  {m.hasPaid ? "✓ Paid" : "Pending"}
                </Badge>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                padding: "0.85rem",
                background: "rgba(0,229,160,.06)",
                border: "1px solid rgba(0,229,160,.15)",
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color: "var(--green)",
                }}
              >
                {nj.members.filter((m) => m.hasPaid).length}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                Paid
              </div>
            </div>
            <div
              style={{
                padding: "0.85rem",
                background: "rgba(255,107,107,.05)",
                border: "1px solid rgba(255,107,107,.15)",
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color: "#ff8080",
                }}
              >
                {nj.members.filter((m) => !m.hasPaid).length}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                Outstanding
              </div>
            </div>
          </div>

          {!nj.myContributionPaid && (
            <div
              style={{
                padding: "1rem",
                background: "rgba(240,180,41,.08)",
                border: "1px solid rgba(240,180,41,.2)",
                borderRadius: 12,
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "var(--gold2)",
                  marginBottom: "0.25rem",
                }}
              >
                ⚠️ Your contribution is due
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                  marginBottom: "0.75rem",
                }}
              >
                Pay {formatCurrency(nj.cycleAmount, nj.currency)} before{" "}
                {new Date(nj.nextPayoutDate).toLocaleDateString()}
              </div>
              <ActionButton variant="primary" size="sm">
                💳 Pay Now
              </ActionButton>
            </div>
          )}

          <div
            style={{
              padding: "0.9rem",
              background: "rgba(26,108,255,.08)",
              border: "1px solid rgba(26,108,255,.2)",
              borderRadius: 12,
            }}
          >
            <div
              style={{
                fontFamily: "Syne",
                fontWeight: 600,
                fontSize: "0.82rem",
                marginBottom: "0.2rem",
              }}
            >
              Next Payout Date
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
              {new Date(nj.nextPayoutDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Transaction history */}
      <GlassCard hover={false}>
        <SectionHeader title="Transaction History" sub="All njangi activity" />
        {njTx.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2.5rem",
              color: "var(--muted)",
            }}
          >
            No transactions yet
          </div>
        ) : (
          <div>
            {njTx.map((tx, i) => (
              <div
                key={tx.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.9rem 0",
                  borderBottom:
                    i < njTx.length - 1
                      ? "1px solid rgba(100,160,255,.06)"
                      : "none",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background:
                      tx.type === "credit"
                        ? "rgba(0,229,160,.12)"
                        : "rgba(255,107,107,.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    flexShrink: 0,
                  }}
                >
                  {tx.type === "credit" ? "🎉" : "💳"}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                    }}
                  >
                    {tx.description}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    {timeAgo(tx.timestamp)}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 700,
                      color:
                        tx.type === "credit" ? "var(--green)" : "var(--text)",
                    }}
                  >
                    {tx.type === "credit" ? "+" : "-"}
                    {formatCurrency(tx.amount, tx.currency)}
                  </div>
                  <Badge variant={tx.status === "completed" ? "green" : "gold"}>
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
