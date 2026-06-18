"use client";
import { useState } from "react";
import {
  mockBalances,
  mockTransactions,
  formatCurrency,
  timeAgo,
} from "@/src/lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  Modal,
  FormField,
  TFInput,
  TFSelect,
  SectionHeader,
} from "@/src/components/shared/UI";

type MT = "deposit" | "withdraw" | "transfer" | null;

export default function WalletPage() {
  const [modal, setModal] = useState<MT>(null);
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  const filtered = mockTransactions.filter(
    (tx) => filter === "all" || tx.type === filter,
  );
  function open(t: MT) {
    setModal(t);
    setStep(1);
    setDone(false);
  }

  return (
    <div>
      <PageHeader
        title="Wallet"
        sub="Manage your multi-currency balances and transactions."
      />

      {/* Currency Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        {mockBalances.map((b) => {
          const accent =
            b.currency === "XAF"
              ? "var(--gold2)"
              : b.currency === "NGN"
                ? "var(--green)"
                : "#7eb8ff";
          const glow =
            b.currency === "XAF"
              ? "rgba(240,180,41,.2)"
              : b.currency === "NGN"
                ? "rgba(0,229,160,.2)"
                : "rgba(26,108,255,.2)";
          return (
            <div
              key={b.currency}
              style={{
                padding: "1.5rem",
                background: "var(--card-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: 20,
                backdropFilter: "blur(16px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  right: -30,
                  width: 110,
                  height: 110,
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
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: `radial-gradient(circle,${glow},transparent 80%)`,
                    border: `1px solid ${accent}55`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Syne",
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    color: accent,
                  }}
                >
                  {b.currency}
                </div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: b.change24h >= 0 ? "var(--green)" : "#ff6b6b",
                  }}
                >
                  {b.change24h >= 0 ? "↑" : "↓"} {Math.abs(b.change24h)}% 24h
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
                {formatCurrency(b.amount, b.currency)}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                approx. ${b.usdEquivalent.toLocaleString()} USD
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <GlassCard hover={false} style={{ marginBottom: "2rem" }}>
        <SectionHeader title="Quick Actions" />
        <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
          <ActionButton variant="primary" onClick={() => open("deposit")}>
            + Deposit
          </ActionButton>
          <ActionButton variant="ghost" onClick={() => open("withdraw")}>
            Withdraw
          </ActionButton>
          <ActionButton variant="ghost" onClick={() => open("transfer")}>
            Send Money
          </ActionButton>
          <ActionButton variant="ghost">Swap Currency</ActionButton>
        </div>
      </GlassCard>

      {/* History */}
      <GlassCard hover={false}>
        <SectionHeader
          title="Transaction History"
          action={
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {(["all", "credit", "debit"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "0.35rem 0.8rem",
                    borderRadius: 8,
                    border:
                      filter === f
                        ? "1px solid rgba(26,108,255,.4)"
                        : "1px solid var(--glass-border)",
                    background:
                      filter === f ? "rgba(26,108,255,.15)" : "transparent",
                    color: filter === f ? "#7eb8ff" : "var(--muted)",
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    fontFamily: "Syne",
                    fontWeight: 600,
                  }}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          }
        />
        {filtered.map((tx, i) => (
          <div
            key={tx.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.9rem 0",
              borderBottom:
                i < filtered.length - 1
                  ? "1px solid rgba(100,160,255,.06)"
                  : "none",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
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
              {tx.category === "njangi"
                ? "🤝"
                : tx.category === "savings"
                  ? "🔒"
                  : tx.category === "swap"
                    ? "🔄"
                    : tx.category === "escrow"
                      ? "🛡️"
                      : tx.type === "credit"
                        ? "↙️"
                        : "↗️"}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  marginBottom: "0.2rem",
                }}
              >
                {tx.description}
              </div>
              <div style={{ fontSize: "0.73rem", color: "var(--muted)" }}>
                {new Date(tx.timestamp).toLocaleString()}
                {tx.counterparty ? " · " + tx.counterparty : ""}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: tx.type === "credit" ? "var(--green)" : "var(--text)",
                  marginBottom: "0.25rem",
                }}
              >
                {tx.type === "credit" ? "+" : "-"}
                {formatCurrency(tx.amount, tx.currency)}
              </div>
              <Badge
                variant={
                  tx.status === "completed"
                    ? "green"
                    : tx.status === "pending"
                      ? "gold"
                      : "red"
                }
              >
                {tx.status}
              </Badge>
            </div>
          </div>
        ))}
      </GlassCard>

      {modal && (
        <Modal
          title={
            modal === "deposit"
              ? "Deposit Funds"
              : modal === "withdraw"
                ? "Withdraw Funds"
                : "Send Transfer"
          }
          onClose={() => setModal(null)}
        >
          {!done ? (
            <>
              {step === 1 && (
                <>
                  <FormField label="Currency">
                    <TFSelect>
                      <option>XAF</option>
                      <option>NGN</option>
                      <option>USDT</option>
                    </TFSelect>
                  </FormField>
                  <FormField label="Amount">
                    <TFInput type="number" placeholder="0.00" />
                  </FormField>
                  {modal === "transfer" && (
                    <FormField label="Recipient">
                      <TFInput placeholder="email or +237..." />
                    </FormField>
                  )}
                  {modal !== "transfer" && (
                    <FormField label="Method">
                      <TFSelect>
                        <option>MTN Mobile Money</option>
                        <option>Orange Money</option>
                        <option>Bank Transfer</option>
                      </TFSelect>
                    </FormField>
                  )}
                  <ActionButton
                    variant="primary"
                    onClick={() => setStep(2)}
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    Continue
                  </ActionButton>
                </>
              )}
              {step === 2 && (
                <>
                  <div
                    style={{
                      background: "rgba(26,108,255,.08)",
                      border: "1px solid rgba(26,108,255,.2)",
                      borderRadius: 12,
                      padding: "1.25rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      Review your {modal}
                    </div>
                    <div
                      style={{
                        fontFamily: "Syne",
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        marginBottom: "0.5rem",
                      }}
                    >
                      XAF 50,000
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                      Fee: XAF 500 · Net: XAF 49,500
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <ActionButton
                      variant="ghost"
                      onClick={() => setStep(1)}
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      Back
                    </ActionButton>
                    <ActionButton
                      variant="primary"
                      onClick={() => setDone(true)}
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      Confirm
                    </ActionButton>
                  </div>
                </>
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h3
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                Done!
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "1.5rem",
                }}
              >
                Your transaction is being processed securely.
              </p>
              <ActionButton
                variant="primary"
                onClick={() => setModal(null)}
                style={{ justifyContent: "center" }}
              >
                Close
              </ActionButton>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
