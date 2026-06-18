"use client";
import { useState } from "react";
import Link from "next/link";
import { mockNjangis, formatCurrency, pct } from "../../lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  ProgressBar,
  Modal,
  FormField,
  TFInput,
  TFSelect,
} from "../../components/shared/UI";
import { Avatar } from "../../components/shared/AuthenticatedLayout";

export default function NjangiPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [done, setDone] = useState(false);

  return (
    <div>
      <PageHeader
        title="My Njangis"
        sub="Manage your cooperative savings groups."
        action={
          <ActionButton
            variant="primary"
            onClick={() => {
              setShowCreate(true);
              setCreateStep(1);
              setDone(false);
            }}
          >
            + Create Njangi
          </ActionButton>
        }
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {[
          { label: "Active Groups", value: "2", icon: "🤝" },
          { label: "Total Pooled", value: "XAF 1.65M", icon: "💰" },
          { label: "Paid", value: "1/2", icon: "✅" },
          { label: "Next Payout", value: "Jun 30", icon: "📅" },
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

      {mockNjangis.map((nj) => (
        <GlassCard key={nj.id} hover={false} style={{ marginBottom: "1.5rem" }}>
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
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(26,108,255,.15)",
                  border: "1px solid rgba(26,108,255,.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                }}
              >
                🤝
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                  }}
                >
                  {nj.name}
                </h3>
                <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                  {nj.description}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Badge variant={nj.status === "active" ? "green" : "muted"}>
                {nj.status}
              </Badge>
              <Badge variant={nj.myContributionPaid ? "green" : "gold"}>
                {nj.myContributionPaid ? "Paid" : "Due"}
              </Badge>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
              gap: "0.65rem",
              marginBottom: "1.25rem",
            }}
          >
            {[
              { l: "Amount", v: formatCurrency(nj.cycleAmount, nj.currency) },
              { l: "Frequency", v: nj.frequency },
              { l: "Cycle", v: nj.currentCycle + "/" + nj.totalCycles },
              { l: "My Position", v: "#" + nj.myPosition },
              {
                l: "Next Payout",
                v: new Date(nj.nextPayoutDate).toLocaleDateString(),
              },
              { l: "Pool", v: formatCurrency(nj.totalPool, nj.currency) },
            ].map((item) => (
              <div
                key={item.l}
                style={{
                  padding: "0.65rem 0.8rem",
                  background: "rgba(255,255,255,.03)",
                  borderRadius: 10,
                  border: "1px solid var(--glass-border)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--muted)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {item.l}
                </div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                  }}
                >
                  {item.v}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginBottom: "0.4rem",
              }}
            >
              <span>Cycle progress</span>
              <span>{pct(nj.currentCycle, nj.totalCycles)}%</span>
            </div>
            <ProgressBar
              value={pct(nj.currentCycle, nj.totalCycles)}
              color="blue"
            />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginBottom: "0.6rem",
              }}
            >
              Members ({nj.members.length})
            </div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {nj.members.map((m) => (
                <div
                  key={m.id}
                  style={{
                    position: "relative",
                    opacity: m.hasPaid ? 1 : 0.45,
                  }}
                  title={m.name + " #" + m.position}
                >
                  <Avatar initials={m.avatar} size={30} />
                  {m.isCurrentEater && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: -2,
                        right: -2,
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: "var(--gold)",
                        border: "2px solid var(--navy)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {nj.members.find((m) => m.isCurrentEater) && (
            <div
              style={{
                padding: "0.85rem 1rem",
                background: "rgba(240,180,41,.08)",
                border: "1px solid rgba(240,180,41,.2)",
                borderRadius: 12,
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span>🎉</span>
              <div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "var(--gold2)",
                  }}
                >
                  Current Beneficiary
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                  {nj.members.find((m) => m.isCurrentEater)?.name} receives{" "}
                  {formatCurrency(
                    nj.cycleAmount * nj.members.length,
                    nj.currency,
                  )}
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {!nj.myContributionPaid && (
              <ActionButton variant="primary">Pay Contribution</ActionButton>
            )}
            <Link href={"/njangi/" + nj.id}>
              <ActionButton variant="ghost">View Details</ActionButton>
            </Link>
          </div>
        </GlassCard>
      ))}

      {showCreate && (
        <Modal title="Create New Njangi" onClose={() => setShowCreate(false)}>
          <div
            style={{ display: "flex", gap: "0.4rem", marginBottom: "1.5rem" }}
          >
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 2,
                  background:
                    s <= createStep
                      ? "var(--electric)"
                      : "rgba(255,255,255,.08)",
                  transition: "background .3s",
                }}
              />
            ))}
          </div>
          {!done ? (
            <>
              {createStep === 1 && (
                <>
                  <FormField label="Group Name">
                    <TFInput placeholder="e.g. Family Savings Circle" />
                  </FormField>
                  <FormField label="Description">
                    <TFInput placeholder="Brief description" />
                  </FormField>
                  <FormField label="Currency">
                    <TFSelect>
                      <option>XAF</option>
                      <option>NGN</option>
                      <option>USDT</option>
                    </TFSelect>
                  </FormField>
                  <FormField label="Amount per Cycle">
                    <TFInput type="number" placeholder="150,000" />
                  </FormField>
                  <ActionButton
                    variant="primary"
                    onClick={() => setCreateStep(2)}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Continue
                  </ActionButton>
                </>
              )}
              {createStep === 2 && (
                <>
                  <FormField label="Frequency">
                    <TFSelect>
                      <option>Monthly</option>
                      <option>Biweekly</option>
                      <option>Weekly</option>
                    </TFSelect>
                  </FormField>
                  <FormField label="Number of Members">
                    <TFInput type="number" placeholder="8" />
                  </FormField>
                  <FormField label="Start Date">
                    <TFInput type="date" />
                  </FormField>
                  <FormField label="Late Penalty (%)">
                    <TFInput type="number" placeholder="5" />
                  </FormField>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <ActionButton
                      variant="ghost"
                      onClick={() => setCreateStep(1)}
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      Back
                    </ActionButton>
                    <ActionButton
                      variant="primary"
                      onClick={() => setCreateStep(3)}
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      Continue
                    </ActionButton>
                  </div>
                </>
              )}
              {createStep === 3 && (
                <>
                  <FormField label="Invite Members (email or phone)">
                    <TFInput placeholder="member@email.com" />
                  </FormField>
                  <div
                    style={{
                      padding: "0.9rem",
                      background: "rgba(26,108,255,.08)",
                      border: "1px solid rgba(26,108,255,.2)",
                      borderRadius: 10,
                      marginBottom: "1rem",
                      fontSize: "0.82rem",
                      color: "var(--muted)",
                    }}
                  >
                    All members must complete KYC verification. Escrow
                    protection is automatic.
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <ActionButton
                      variant="ghost"
                      onClick={() => setCreateStep(2)}
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      Back
                    </ActionButton>
                    <ActionButton
                      variant="primary"
                      onClick={() => setDone(true)}
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      Create Group
                    </ActionButton>
                  </div>
                </>
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
              <h3
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                Njangi Created!
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "1.5rem",
                }}
              >
                Invitations sent to all members.
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
