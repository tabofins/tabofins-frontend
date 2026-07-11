"use client";
import { useState } from "react";
import { mockVaults, formatCurrency, pct } from "@/src/lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  ProgressBar,
  SectionHeader,
  Modal,
  FormField,
  TFInput,
  TFSelect,
} from "@/src/components/shared/UI";

export default function SavingsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div>
      <PageHeader
        title="Savings Vaults"
        sub="Set goals, lock funds, and grow your wealth automatically."
        action={
          <ActionButton
            variant="primary"
            onClick={() => {
              setShowCreate(true);
              setDone(false);
            }}
          >
            + New Vault
          </ActionButton>
        }
      />

      {/* Summary stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {[
          {
            label: "Total Saved",
            value: "XAF 1.7M+",
            icon: "💰",
            color: "var(--gold2)",
          },
          {
            label: "Active Vaults",
            value: String(
              mockVaults.filter((v) => v.status === "active").length,
            ),
            icon: "🔓",
            color: "var(--green)",
          },
          {
            label: "Locked Vaults",
            value: String(
              mockVaults.filter((v) => v.status === "locked").length,
            ),
            icon: "🔒",
            color: "#7eb8ff",
          },
          {
            label: "Auto-Saving",
            value: `${mockVaults.filter((v) => v.autoContribute).length} vaults`,
            icon: "🤖",
            color: "var(--muted)",
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              padding: "1.2rem",
              background: "var(--card-bg)",
              border: "1px solid var(--glass-border)",
              borderRadius: 16,
              backdropFilter: "blur(16px)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>
              {s.icon}
            </div>
            <div
              style={{
                fontFamily: "Syne",
                fontSize: "1.2rem",
                fontWeight: 800,
                color: s.color,
                marginBottom: "0.2rem",
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Vault cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "1.5rem",
        }}
      >
        {mockVaults.map((v) => {
          const progress = pct(v.currentAmount, v.targetAmount);
          const isLocked = v.status === "locked";
          const isComplete = progress >= 100;
          return (
            <GlassCard
              key={v.id}
              hover={!isLocked}
              glow={isLocked ? undefined : isComplete ? "green" : "blue"}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                  }}
                >
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
                      style={{
                        fontFamily: "Syne",
                        fontWeight: 700,
                        fontSize: "1rem",
                      }}
                    >
                      {v.name}
                    </h3>
                    <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                      {v.currency} · Created{" "}
                      {new Date(v.createdAt).toLocaleDateString("en-GB", {
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <Badge
                  variant={isLocked ? "muted" : isComplete ? "green" : "blue"}
                >
                  {isLocked
                    ? "🔒 Locked"
                    : isComplete
                      ? "Complete ✓"
                      : "Active"}
                </Badge>
              </div>

              {/* Amounts */}
              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "0.35rem",
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
                <ProgressBar
                  value={progress}
                  color={isLocked ? "muted" : isComplete ? "green" : "blue"}
                  height={8}
                />
              </div>

              {/* Meta grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.65rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    padding: "0.65rem 0.85rem",
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
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                    }}
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
                    padding: "0.65rem 0.85rem",
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
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                    }}
                  >
                    {v.autoContribute && v.autoAmount
                      ? `${formatCurrency(v.autoAmount, v.currency)}/mo`
                      : "Off"}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div
                style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}
              >
                {!isLocked && (
                  <ActionButton variant="primary" size="sm">
                    + Add Funds
                  </ActionButton>
                )}
                <ActionButton variant="ghost" size="sm">
                  📊 History
                </ActionButton>
                {isLocked && (
                  <ActionButton variant="ghost" size="sm">
                    🔓 Early Unlock
                  </ActionButton>
                )}
                {isComplete && !isLocked && (
                  <ActionButton variant="gold" size="sm">
                    🎉 Withdraw Goal
                  </ActionButton>
                )}
              </div>
            </GlassCard>
          );
        })}

        {/* Create new card */}
        <div
          onClick={() => {
            setShowCreate(true);
            setDone(false);
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
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🏦</div>
          <div
            style={{
              fontFamily: "Syne",
              fontWeight: 700,
              marginBottom: "0.35rem",
            }}
          >
            New Savings Vault
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
            Set a goal and start saving automatically
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <Modal
          title="🏦 Create Savings Vault"
          onClose={() => setShowCreate(false)}
        >
          {!done ? (
            <>
              <FormField label="Vault Name">
                <TFInput placeholder="e.g. Emergency Fund, New Car, Holiday..." />
              </FormField>
              <FormField label="Vault Emoji">
                <TFInput placeholder="🏠" style={{ fontSize: "1.4rem" }} />
              </FormField>
              <FormField label="Currency">
                <TFSelect>
                  <option>XAF — Central African Franc</option>
                  <option>NGN — Nigerian Naira</option>
                  <option>USDT — Tether</option>
                </TFSelect>
              </FormField>
              <FormField label="Target Goal Amount">
                <TFInput type="number" placeholder="1,000,000" />
              </FormField>
              <FormField label="Lock Until Date">
                <TFInput type="date" />
              </FormField>
              <FormField label="Auto-Contribute Monthly">
                <TFSelect>
                  <option>No auto-save</option>
                  <option>XAF 25,000 / month</option>
                  <option>XAF 50,000 / month</option>
                  <option>XAF 100,000 / month</option>
                  <option>Custom amount...</option>
                </TFSelect>
              </FormField>
              <div
                style={{
                  padding: "0.9rem 1rem",
                  background: "rgba(0,229,160,.06)",
                  border: "1px solid rgba(0,229,160,.15)",
                  borderRadius: 10,
                  marginBottom: "1.25rem",
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                🔒 Funds are locked until the target date. Early unlock requires
                identity confirmation.
              </div>
              <ActionButton
                variant="primary"
                onClick={() => setDone(true)}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Create Vault ✓
              </ActionButton>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎉</div>
              <h3
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  marginBottom: "0.5rem",
                }}
              >
                Vault Created!
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "1.5rem",
                }}
              >
                Start adding funds to reach your goal.
              </p>
              <ActionButton
                variant="primary"
                onClick={() => setShowCreate(false)}
                style={{ justifyContent: "center" }}
              >
                Done
              </ActionButton>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
