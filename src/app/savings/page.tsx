"use client";
import { useState } from "react";
import {
  mockVaults,
  mockSavingsWallets,
  formatCurrency,
  pct,
  SavingsVault,
} from "../../lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  ProgressBar,
  SectionHeader,
  TabBar,
  StatCard,
  Modal,
  FormField,
  TFInput,
  TFSelect,
  AlertBanner,
  InterestPreview,
  LeavingGroupWarning,
  AvatarStack,
  InfoRow,
  StatRow,
  ConfirmModal,
  EmptyState,
} from "../../components/shared/UI";
import { Avatar } from "../../components/shared/AuthenticatedLayout";

function VaultProgress({ v }: { v: SavingsVault }) {
  const progress = pct(v.currentAmount, v.targetAmount);
  const isLocked = v.status === "locked";
  const isComplete = progress >= 100;
  const wallet = mockSavingsWallets.find((w) => w.vaultId === v.id);

  const barColor = isLocked ? "muted" : isComplete ? "green" : "blue";
  const glowType = isLocked ? undefined : isComplete ? "green" : "blue";

  return (
    <GlassCard hover={!isLocked} glow={glowType}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: isLocked
                ? "rgba(255,255,255,.05)"
                : isComplete
                  ? "rgba(0,229,160,.15)"
                  : "rgba(26,108,255,.15)",
              border: `1px solid ${isLocked ? "var(--glass-border)" : isComplete ? "rgba(0,229,160,.25)" : "rgba(26,108,255,.25)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            {v.emoji}
          </div>
          <div>
            <h3
              style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "1rem" }}
            >
              {v.name}
            </h3>
            <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
              {v.type === "group" ? "👥 Group Savings" : "👤 Personal"} ·{" "}
              {v.currency}
            </div>
          </div>
        </div>
        <Badge variant={isLocked ? "muted" : isComplete ? "green" : "blue"}>
          {isLocked ? "🔒 Locked" : isComplete ? "✅ Complete" : "Active"}
        </Badge>
      </div>

      {/* Amount */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "0.4rem",
        }}
      >
        <span
          style={{
            fontFamily: "Syne",
            fontSize: "1.5rem",
            fontWeight: 800,
            color: isLocked ? "var(--muted)" : "var(--text)",
          }}
        >
          {formatCurrency(v.currentAmount, v.currency)}
        </span>
        <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
          of {formatCurrency(v.targetAmount, v.currency)}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "var(--muted)",
          marginBottom: "0.6rem",
        }}
      >
        <span>{progress}% reached</span>
        <span>
          {formatCurrency(
            Math.max(0, v.targetAmount - v.currentAmount),
            v.currency,
          )}{" "}
          to go
        </span>
      </div>
      <ProgressBar value={progress} color={barColor} height={8} animated />

      {/* Meta */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.6rem",
          margin: "1rem 0",
        }}
      >
        <div
          style={{
            padding: "0.6rem 0.85rem",
            background: "rgba(255,255,255,.03)",
            borderRadius: 10,
            border: "1px solid var(--glass-border)",
          }}
        >
          <div
            style={{
              fontSize: "0.67rem",
              color: "var(--muted)",
              marginBottom: "0.2rem",
            }}
          >
            Locked Until
          </div>
          <div
            style={{ fontFamily: "Syne", fontWeight: 600, fontSize: "0.8rem" }}
          >
            {new Date(v.lockedUntil).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
        <div
          style={{
            padding: "0.6rem 0.85rem",
            background: "rgba(255,255,255,.03)",
            borderRadius: 10,
            border: "1px solid var(--glass-border)",
          }}
        >
          <div
            style={{
              fontSize: "0.67rem",
              color: "var(--muted)",
              marginBottom: "0.2rem",
            }}
          >
            Auto-Save
          </div>
          <div
            style={{ fontFamily: "Syne", fontWeight: 600, fontSize: "0.8rem" }}
          >
            {v.autoContribute && v.autoAmount
              ? `${formatCurrency(v.autoAmount, v.currency)}/${v.autoFrequency?.[0] ?? "mo"}`
              : "Off"}
          </div>
        </div>
        {v.interestRate > 0 && (
          <div
            style={{
              padding: "0.6rem 0.85rem",
              background: "rgba(0,229,160,.05)",
              borderRadius: 10,
              border: "1px solid rgba(0,229,160,.15)",
            }}
          >
            <div
              style={{
                fontSize: "0.67rem",
                color: "var(--muted)",
                marginBottom: "0.2rem",
              }}
            >
              Interest Rate
            </div>
            <div
              style={{
                fontFamily: "Syne",
                fontWeight: 600,
                fontSize: "0.8rem",
                color: "var(--green)",
              }}
            >
              {v.interestRate}% p.a.
            </div>
          </div>
        )}
        {wallet && wallet.interest > 0 && (
          <div
            style={{
              padding: "0.6rem 0.85rem",
              background: "rgba(0,229,160,.05)",
              borderRadius: 10,
              border: "1px solid rgba(0,229,160,.15)",
            }}
          >
            <div
              style={{
                fontSize: "0.67rem",
                color: "var(--muted)",
                marginBottom: "0.2rem",
              }}
            >
              Interest Earned
            </div>
            <div
              style={{
                fontFamily: "Syne",
                fontWeight: 600,
                fontSize: "0.8rem",
                color: "var(--green)",
              }}
            >
              +{formatCurrency(wallet.interest, v.currency)}
            </div>
          </div>
        )}
      </div>

      {/* Group members */}
      {v.type === "group" && v.members && (
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              fontSize: "0.72rem",
              color: "var(--muted)",
              marginBottom: "0.5rem",
            }}
          >
            Members ({v.members.length})
          </div>
          <AvatarStack initials={v.members.map((m) => m.avatar)} size={30} />
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
        {!isLocked && !isComplete && (
          <ActionButton variant="primary" size="sm">
            + Add Funds
          </ActionButton>
        )}
        {isComplete && !isLocked && (
          <ActionButton variant="gold" size="sm">
            🎉 Withdraw Goal
          </ActionButton>
        )}
        {isLocked && (
          <ActionButton variant="ghost" size="sm">
            🔓 Early Unlock
          </ActionButton>
        )}
        <ActionButton variant="ghost" size="sm">
          📊 History
        </ActionButton>
        {v.type === "group" && (
          <ActionButton variant="ghost" size="sm">
            👥 Members
          </ActionButton>
        )}
      </div>
    </GlassCard>
  );
}

export default function SavingsPage() {
  const [tab, setTab] = useState("vaults");
  const [showCreate, setShowCreate] = useState(false);
  const [createType, setCreateType] = useState<"personal" | "group">(
    "personal",
  );
  const [createDone, setCreateDone] = useState(false);
  const [autoMode, setAutoMode] = useState<"manual" | "auto">("auto");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("12");
  const [rate, setRate] = useState(4.5);
  const [currency, setCurrency] = useState("XAF");
  const [showLeave, setShowLeave] = useState<SavingsVault | null>(null);
  const [leaveConfirm, setLeaveConfirm] = useState(false);

  const personalVaults = mockVaults.filter((v) => v.type === "personal");
  const groupVaults = mockVaults.filter((v) => v.type === "group");
  const totalSaved = mockVaults.reduce(
    (s, v) =>
      s +
      (v.currency === "XAF"
        ? v.currentAmount
        : v.currentAmount * (v.currency === "USDT" ? 620 : 0.385)),
    0,
  );
  const totalInterest = mockSavingsWallets.reduce(
    (s, w) => s + (w.currency === "XAF" ? w.interest : w.interest * 620),
    0,
  );

  const monthsNum = parseInt(duration) || 12;

  return (
    <div>
      <PageHeader
        title="Savings Vaults"
        sub="Personal goals, group savings, locked funds — all in one place."
        action={
          <ActionButton
            variant="primary"
            onClick={() => {
              setShowCreate(true);
              setCreateDone(false);
            }}
          >
            + New Vault
          </ActionButton>
        }
      />

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          label="Total Saved"
          value={`XAF ${(totalSaved / 1_000_000).toFixed(1)}M`}
          icon="💰"
          glow="gold"
          change={12.1}
        />
        <StatCard
          label="Interest Earned"
          value={`XAF ${(totalInterest / 1000).toFixed(0)}K`}
          icon="📈"
          glow="green"
        />
        <StatCard
          label="Active Vaults"
          value={String(mockVaults.filter((v) => v.status === "active").length)}
          icon="🔓"
          glow="blue"
        />
        <StatCard
          label="Locked Vaults"
          value={String(mockVaults.filter((v) => v.status === "locked").length)}
          icon="🔒"
        />
      </div>

      <TabBar
        tabs={[
          { id: "vaults", label: "All Vaults", icon: "🔒" },
          { id: "personal", label: "Personal", icon: "👤" },
          { id: "group", label: "Group Savings", icon: "👥" },
          { id: "history", label: "History", icon: "🕐" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {/* ── ALL / PERSONAL ── */}
      {(tab === "vaults" || tab === "personal") && (
        <>
          {(tab === "vaults" || tab === "personal") && (
            <div style={{ marginBottom: "1.5rem" }}>
              {tab === "vaults" && <SectionHeader title="Personal Vaults" />}
              {personalVaults.length === 0 ? (
                <EmptyState
                  emoji="🔒"
                  title="No personal vaults"
                  sub="Create your first savings goal."
                  action={
                    <ActionButton
                      variant="primary"
                      onClick={() => {
                        setCreateType("personal");
                        setShowCreate(true);
                      }}
                    >
                      + Create Vault
                    </ActionButton>
                  }
                />
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {personalVaults.map((v) => (
                    <VaultProgress key={v.id} v={v} />
                  ))}
                  {/* Create card */}
                  <div
                    onClick={() => {
                      setCreateType("personal");
                      setShowCreate(true);
                      setCreateDone(false);
                    }}
                    style={{
                      padding: "2rem",
                      background: "rgba(26,108,255,.04)",
                      border: "1px dashed rgba(26,108,255,.25)",
                      borderRadius: 20,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all .25s",
                      minHeight: 200,
                    }}
                    onMouseOver={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.background =
                        "rgba(26,108,255,.09)")
                    }
                    onMouseOut={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.background =
                        "rgba(26,108,255,.04)")
                    }
                  >
                    <div
                      style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}
                    >
                      🏦
                    </div>
                    <div
                      style={{
                        fontFamily: "Syne",
                        fontWeight: 700,
                        marginBottom: "0.35rem",
                      }}
                    >
                      New Personal Vault
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                      Set a goal and save automatically
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ── GROUP SAVINGS ── */}
      {(tab === "vaults" || tab === "group") && (
        <div>
          {tab === "vaults" && (
            <SectionHeader
              title="Group Savings"
              sub="Collaborative vaults with shared goals"
              style={{ marginTop: "2rem" }}
            />
          )}
          {groupVaults.length === 0 ? (
            <EmptyState
              emoji="👥"
              title="No group vaults"
              sub="Start a group savings with friends, family or colleagues."
              action={
                <ActionButton
                  variant="primary"
                  onClick={() => {
                    setCreateType("group");
                    setShowCreate(true);
                  }}
                >
                  + Start Group Vault
                </ActionButton>
              }
            />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                gap: "1.5rem",
              }}
            >
              {groupVaults.map((v) => (
                <GlassCard key={v.id} hover glow="blue">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: "rgba(26,108,255,.15)",
                          border: "1px solid rgba(26,108,255,.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.4rem",
                        }}
                      >
                        {v.emoji}
                      </div>
                      <div>
                        <div style={{ fontFamily: "Syne", fontWeight: 700 }}>
                          {v.name}
                        </div>
                        <div
                          style={{ fontSize: "0.72rem", color: "var(--muted)" }}
                        >
                          👥 {v.members?.length} members
                        </div>
                      </div>
                    </div>
                    <Badge variant={v.status === "locked" ? "muted" : "green"}>
                      {v.status}
                    </Badge>
                  </div>

                  {v.goal && (
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--muted)",
                        marginBottom: "0.85rem",
                        fontStyle: "italic",
                      }}
                    >
                      🎯 {v.goal}
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Syne",
                        fontSize: "1.4rem",
                        fontWeight: 800,
                      }}
                    >
                      {formatCurrency(v.currentAmount, v.currency)}
                    </span>
                    <span
                      style={{ fontSize: "0.78rem", color: "var(--muted)" }}
                    >
                      of {formatCurrency(v.targetAmount, v.currency)}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {pct(v.currentAmount, v.targetAmount)}% of goal reached
                  </div>
                  <ProgressBar
                    value={pct(v.currentAmount, v.targetAmount)}
                    color="blue"
                    height={8}
                    animated
                  />

                  {/* Members */}
                  {v.members && (
                    <div style={{ marginTop: "1rem" }}>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--muted)",
                          marginBottom: "0.6rem",
                        }}
                      >
                        Contributors
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.4rem",
                        }}
                      >
                        {v.members.slice(0, 3).map((m) => (
                          <div
                            key={m.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <Avatar initials={m.avatar} size={24} />
                            <span style={{ fontSize: "0.78rem", flex: 1 }}>
                              {m.name}
                              {m.isAdmin ? " 👑" : ""}
                            </span>
                            <span
                              style={{
                                fontFamily: "Syne",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                                color: "var(--green)",
                              }}
                            >
                              {formatCurrency(m.contributed, v.currency)}
                            </span>
                          </div>
                        ))}
                        {v.members.length > 3 && (
                          <div
                            style={{
                              fontSize: "0.72rem",
                              color: "var(--muted)",
                            }}
                          >
                            +{v.members.length - 3} more members
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <StatRow
                    style={{ marginTop: "1rem" }}
                    items={[
                      {
                        label: "Lock Until",
                        value: new Date(v.lockedUntil).toLocaleDateString(
                          "en-GB",
                          { month: "short", year: "numeric" },
                        ),
                      },
                      {
                        label: "Interest",
                        value: `${v.interestRate}% p.a.`,
                        color: "var(--green)",
                      },
                      {
                        label: "Auto-Contrib",
                        value:
                          v.autoContribute && v.autoAmount
                            ? `${formatCurrency(v.autoAmount, v.currency)}/mo`
                            : "Off",
                      },
                      {
                        label: "Early Penalty",
                        value: `${v.earlyPenalty}% forfeiture`,
                      },
                    ]}
                  />

                  {v.withdrawalHistory && v.withdrawalHistory.length > 0 && (
                    <div
                      style={{
                        marginTop: "1rem",
                        padding: "0.75rem",
                        background: "rgba(255,255,255,.03)",
                        borderRadius: 10,
                        border: "1px solid var(--glass-border)",
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                      }}
                    >
                      Last withdrawal:{" "}
                      {formatCurrency(
                        v.withdrawalHistory[0].amount,
                        v.currency,
                      )}{" "}
                      — {v.withdrawalHistory[0].reason}
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      gap: "0.6rem",
                      marginTop: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <ActionButton variant="primary" size="sm">
                      + Contribute
                    </ActionButton>
                    <ActionButton variant="ghost" size="sm">
                      📊 Activity
                    </ActionButton>
                    <ActionButton
                      variant="danger"
                      size="sm"
                      onClick={() => setShowLeave(v)}
                    >
                      Leave Group
                    </ActionButton>
                  </div>
                </GlassCard>
              ))}

              {/* Create group card */}
              <div
                onClick={() => {
                  setCreateType("group");
                  setShowCreate(true);
                  setCreateDone(false);
                }}
                style={{
                  padding: "2rem",
                  background: "rgba(26,108,255,.04)",
                  border: "1px dashed rgba(26,108,255,.25)",
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all .25s",
                  minHeight: 200,
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background =
                    "rgba(26,108,255,.09)")
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background =
                    "rgba(26,108,255,.04)")
                }
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                  👥
                </div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    marginBottom: "0.35rem",
                  }}
                >
                  New Group Vault
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                  Collaborate with others towards a shared goal
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── HISTORY ── */}
      {tab === "history" && (
        <GlassCard hover={false}>
          <SectionHeader title="Savings Activity" />
          {[
            {
              emoji: "💰",
              desc: "Auto-save — Emergency Fund",
              amount: "+XAF 100,000",
              time: "3 Jun",
              color: "var(--green)",
            },
            {
              emoji: "📈",
              desc: "Interest credited — Emergency Fund",
              amount: "+XAF 4,500",
              time: "1 Jun",
              color: "var(--green)",
            },
            {
              emoji: "💰",
              desc: "Auto-save — New Laptop",
              amount: "+50 USDT",
              time: "1 Jun",
              color: "var(--green)",
            },
            {
              emoji: "💰",
              desc: "Contribution — Community School",
              amount: "+XAF 200,000",
              time: "3 Jun",
              color: "var(--green)",
            },
            {
              emoji: "🔒",
              desc: "Holiday 2025 vault locked",
              amount: "XAF 500,000",
              time: "1 Jan",
              color: "var(--muted)",
            },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.85rem 0",
                borderBottom:
                  i < 4 ? "1px solid rgba(100,160,255,.06)" : "none",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "rgba(0,229,160,.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {row.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  {row.desc}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                  {row.time}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  color: row.color,
                }}
              >
                {row.amount}
              </div>
            </div>
          ))}
        </GlassCard>
      )}

      {/* ── CREATE VAULT MODAL ── */}
      {showCreate && (
        <Modal
          title={
            createType === "personal"
              ? "🏦 New Personal Vault"
              : "👥 New Group Vault"
          }
          onClose={() => setShowCreate(false)}
          maxWidth={500}
        >
          {!createDone ? (
            <>
              {/* Type toggle */}
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                {(["personal", "group"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setCreateType(t)}
                    style={{
                      flex: 1,
                      padding: "0.65rem",
                      borderRadius: 10,
                      border:
                        createType === t
                          ? "1px solid rgba(26,108,255,.4)"
                          : "1px solid var(--glass-border)",
                      background:
                        createType === t
                          ? "rgba(26,108,255,.12)"
                          : "transparent",
                      color: createType === t ? "#7eb8ff" : "var(--muted)",
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                    }}
                  >
                    {t === "personal" ? "👤 Personal" : "👥 Group"}
                  </button>
                ))}
              </div>

              <FormField label="Vault Name" required>
                <TFInput
                  placeholder={
                    createType === "personal"
                      ? "Emergency Fund, New Car…"
                      : "School Fund, Family Trip…"
                  }
                />
              </FormField>
              <FormField label="Emoji Icon">
                <TFInput
                  placeholder="🏠"
                  style={{ fontSize: "1.3rem", textAlign: "center" }}
                />
              </FormField>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                }}
              >
                <FormField label="Currency">
                  <TFSelect
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option>XAF</option>
                    <option>NGN</option>
                    <option>USDT</option>
                  </TFSelect>
                </FormField>
                <FormField label="Target Amount" required>
                  <TFInput
                    type="number"
                    placeholder="1,000,000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </FormField>
              </div>

              <FormField label="Lock Duration">
                <TFSelect
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                    setRate(
                      parseInt(e.target.value) >= 12
                        ? 4.5
                        : parseInt(e.target.value) >= 6
                          ? 3.0
                          : 2.0,
                    );
                  }}
                >
                  <option value="3">3 months</option>
                  <option value="6">6 months (3.0% interest)</option>
                  <option value="12">12 months (4.5% interest)</option>
                  <option value="24">24 months (6.0% interest)</option>
                  <option value="36">36 months (7.5% interest)</option>
                </TFSelect>
              </FormField>

              {amount && parseFloat(amount) > 0 && (
                <InterestPreview
                  principal={parseFloat(amount)}
                  rate={rate}
                  months={monthsNum}
                  currency={currency}
                />
              )}

              {/* Deduction mode */}
              <FormField label="Contribution Mode">
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {(["manual", "auto"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setAutoMode(m)}
                      style={{
                        flex: 1,
                        padding: "0.6rem",
                        borderRadius: 10,
                        border:
                          autoMode === m
                            ? "1px solid rgba(26,108,255,.4)"
                            : "1px solid var(--glass-border)",
                        background:
                          autoMode === m
                            ? "rgba(26,108,255,.12)"
                            : "transparent",
                        color: autoMode === m ? "#7eb8ff" : "var(--muted)",
                        fontFamily: "Syne",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      {m === "manual" ? "✋ Manual" : "🤖 Automatic"}
                    </button>
                  ))}
                </div>
              </FormField>

              {autoMode === "auto" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.75rem",
                  }}
                >
                  <FormField label="Auto Amount">
                    <TFInput type="number" placeholder="50,000" />
                  </FormField>
                  <FormField label="Frequency">
                    <TFSelect>
                      <option>Monthly</option>
                      <option>Weekly</option>
                      <option>Daily</option>
                    </TFSelect>
                  </FormField>
                </div>
              )}

              {/* Group-specific */}
              {createType === "group" && (
                <>
                  <FormField label="Savings Goal Description">
                    <TFInput placeholder="e.g. Build school library in Bamenda" />
                  </FormField>
                  <FormField label="Invite Members (email or phone)">
                    <TFInput placeholder="member@email.com or +237…" />
                  </FormField>
                  <AlertBanner
                    type="warning"
                    title="Group Leaving Policy"
                    message="Members who leave a group vault forfeit 50% of their contributions. 25% goes to remaining members and 25% to the platform."
                  />
                </>
              )}

              {/* Early withdrawal warning */}
              <AlertBanner
                type="warning"
                title="Early Withdrawal"
                message={`Withdrawing before the lock date incurs a ${createType === "group" ? "50%" : "2–10%"} penalty. Funds are protected until maturity for maximum interest.`}
              />

              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginTop: "0.75rem",
                }}
              >
                <ActionButton
                  variant="ghost"
                  onClick={() => setShowCreate(false)}
                  fullWidth
                >
                  Cancel
                </ActionButton>
                <ActionButton
                  variant="primary"
                  onClick={() => setCreateDone(true)}
                  fullWidth
                >
                  Create Vault ✓
                </ActionButton>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎉</div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  marginBottom: "0.5rem",
                }}
              >
                Vault Created!
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "2rem",
                }}
              >
                {createType === "group"
                  ? "Invitations sent to members."
                  : "Start adding funds to reach your goal."}
              </div>
              <ActionButton
                variant="primary"
                onClick={() => setShowCreate(false)}
                fullWidth
              >
                Done
              </ActionButton>
            </div>
          )}
        </Modal>
      )}

      {/* Leave Group Warning */}
      {showLeave && !leaveConfirm && (
        <Modal title="⚠️ Leave Group Vault" onClose={() => setShowLeave(null)}>
          <LeavingGroupWarning
            contributed={
              showLeave.members?.find((m) => m.avatar === "AT")?.contributed ??
              0
            }
            currency={showLeave.currency}
          />
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            <ActionButton
              variant="ghost"
              onClick={() => setShowLeave(null)}
              fullWidth
            >
              Stay in Group
            </ActionButton>
            <ActionButton
              variant="danger"
              onClick={() => {
                setLeaveConfirm(true);
                setShowLeave(null);
              }}
              fullWidth
            >
              Leave & Forfeit
            </ActionButton>
          </div>
        </Modal>
      )}

      {leaveConfirm && (
        <ConfirmModal
          title="Confirm — Leave Group"
          message="This is your final confirmation. You will forfeit 50% of your contributions and lose access to this group vault. This cannot be undone."
          confirmLabel="Yes, Leave Now"
          cancelLabel="Cancel"
          variant="danger"
          icon="🚪"
          onConfirm={() => setLeaveConfirm(false)}
          onCancel={() => setLeaveConfirm(false)}
        />
      )}
    </div>
  );
}
