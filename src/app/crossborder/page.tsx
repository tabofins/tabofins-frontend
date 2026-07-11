"use client";
import { useState, useEffect } from "react";
import {
  mockCrossBorderTransfers,
  mockRecipients,
  SUPPORTED_COUNTRIES,
  EXCHANGE_RATES,
  formatCurrency,
  timeAgo,
  getRate,
  calcTransferFee,
  estimatedArrival,
  CrossBorderTransfer,
  Recipient,
} from "../../lib/data";
import {
  GlassCard,
  PageHeader,
  TabBar,
  ActionButton,
  Badge,
  SectionHeader,
  StatCard,
  Modal,
  FormField,
  TFInput,
  TFSelect,
  InfoRow,
  ExchangePreview,
  AlertBanner,
  StatRow,
} from "../../components/shared/UI";
import { Avatar } from "../../components/shared/AuthenticatedLayout";

const CURRENCIES = ["XAF", "NGN", "USDT", "GHS", "KES"] as const;

function TransferStatusBadge({ status }: { status: string }) {
  const map: Record<string, "green" | "gold" | "blue" | "red"> = {
    completed: "green",
    processing: "gold",
    pending: "blue",
    failed: "red",
  };
  return <Badge variant={map[status] ?? "muted"}>{status}</Badge>;
}

function TransferTimeline({ status }: { status: string }) {
  const steps = [
    { label: "Transfer Initiated", done: true, icon: "📤" },
    { label: "Identity Verified", done: true, icon: "🪪" },
    { label: "Funds Deducted", done: true, icon: "💸" },
    {
      label: "Processing with Partner",
      done: status !== "pending",
      icon: "🏦",
    },
    {
      label: "Delivered to Recipient",
      done: status === "completed",
      icon: "✅",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {steps.map((step, i) => (
        <div
          key={i}
          style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}
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
                background: step.done
                  ? "linear-gradient(135deg,var(--green),#00c489)"
                  : "rgba(255,255,255,.06)",
                border: `2px solid ${step.done ? "rgba(0,229,160,.4)" : "var(--glass-border)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                transition: "all .3s",
              }}
            >
              {step.done ? "✓" : step.icon}
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  width: 2,
                  height: 28,
                  background: step.done
                    ? "rgba(0,229,160,.3)"
                    : "rgba(255,255,255,.06)",
                  margin: "3px 0",
                }}
              />
            )}
          </div>
          <div
            style={{
              paddingBottom: i < steps.length - 1 ? "1.2rem" : 0,
              paddingTop: "0.3rem",
            }}
          >
            <div
              style={{
                fontFamily: "Syne",
                fontWeight: 600,
                fontSize: "0.84rem",
                color: step.done ? "var(--green)" : "var(--muted)",
              }}
            >
              {step.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CrossBorderPage() {
  const [tab, setTab] = useState("send");
  const [fromCur, setFromCur] = useState("XAF");
  const [toCur, setToCur] = useState("NGN");
  const [fromAmt, setFromAmt] = useState("");
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [selRec, setSelRec] = useState<Recipient | null>(null);
  const [showRec, setShowRec] = useState(false);
  const [showDet, setShowDet] = useState<CrossBorderTransfer | null>(null);
  const [newRec, setNewRec] = useState(false);
  const [note, setNote] = useState("");
  const [recSearch, setRecSearch] = useState("");

  const fromAmount = parseFloat(fromAmt) || 0;
  const rate = getRate(fromCur, toCur);
  const fee = calcTransferFee(fromAmount, fromCur);
  const toAmount = (fromAmount - fee) * rate;
  const arrival = estimatedArrival(
    SUPPORTED_COUNTRIES.find((c) => c.currency === fromCur)?.name ?? "Cameroon",
    SUPPORTED_COUNTRIES.find((c) => c.currency === toCur)?.name ?? "Nigeria",
  );

  const filteredRec = mockRecipients.filter(
    (r) =>
      r.name.toLowerCase().includes(recSearch.toLowerCase()) ||
      r.country.toLowerCase().includes(recSearch.toLowerCase()),
  );

  return (
    <div>
      <PageHeader
        title="Cross-Border Transfers"
        sub="Send money across Africa in minutes with live exchange rates."
      />

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          label="Total Sent (30d)"
          value="XAF 680K"
          icon="📤"
          glow="blue"
          change={12.4}
        />
        <StatCard label="Transfers" value="3" icon="🌍" glow="gold" />
        <StatCard label="Avg Arrival" value="8 min" icon="⚡" glow="green" />
        <StatCard
          label="Saved Recipients"
          value={String(mockRecipients.length)}
          icon="👥"
        />
      </div>

      <TabBar
        tabs={[
          { id: "send", label: "Send", icon: "📤" },
          { id: "history", label: "History", icon: "🕐" },
          { id: "recipients", label: "Recipients", icon: "👥" },
          { id: "rates", label: "Live Rates", icon: "📊" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {/* ── SEND TAB ── */}
      {tab === "send" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Send form */}
          <GlassCard hover={false}>
            <SectionHeader title="New Transfer" sub={`Step ${step} of 3`} />

            {/* Step progress */}
            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                marginBottom: "1.75rem",
              }}
            >
              {["Amount & Currency", "Recipient", "Review & Send"].map(
                (s, i) => (
                  <div key={i} style={{ flex: 1 }}>
                    <div
                      style={{
                        height: 3,
                        borderRadius: 2,
                        background:
                          i < step
                            ? "var(--electric)"
                            : "rgba(255,255,255,.08)",
                        transition: "background .3s",
                        marginBottom: "0.4rem",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "0.65rem",
                        color: i < step ? "var(--electric)" : "var(--muted)",
                      }}
                    >
                      {s}
                    </div>
                  </div>
                ),
              )}
            </div>

            {!done ? (
              <>
                {/* Step 1 */}
                {step === 1 && (
                  <>
                    <AlertBanner
                      type="info"
                      message="Live exchange rates update every 30 seconds. Your rate is locked when you confirm."
                    />

                    <FormField label="You Send" required>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <TFSelect
                          value={fromCur}
                          onChange={(e) => setFromCur(e.target.value)}
                          style={{ width: 100, flexShrink: 0 }}
                        >
                          {CURRENCIES.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </TFSelect>
                        <TFInput
                          type="number"
                          placeholder="0.00"
                          value={fromAmt}
                          onChange={(e) => setFromAmt(e.target.value)}
                        />
                      </div>
                    </FormField>

                    <FormField label="Recipient Gets" required>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <TFSelect
                          value={toCur}
                          onChange={(e) => setToCur(e.target.value)}
                          style={{ width: 100, flexShrink: 0 }}
                        >
                          {CURRENCIES.filter((c) => c !== fromCur).map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </TFSelect>
                        <div
                          style={{
                            flex: 1,
                            padding: "0.75rem 1rem",
                            background: "rgba(0,229,160,.06)",
                            border: "1px solid rgba(0,229,160,.2)",
                            borderRadius: 10,
                            fontFamily: "Syne",
                            fontWeight: 700,
                            color: "var(--green)",
                          }}
                        >
                          {fromAmount > 0
                            ? toAmount.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })
                            : "0.00"}
                        </div>
                      </div>
                    </FormField>

                    {fromAmount > 0 && (
                      <ExchangePreview
                        fromAmount={fromAmount}
                        fromCurrency={fromCur}
                        toAmount={toAmount}
                        toCurrency={toCur}
                        rate={rate}
                        fee={fee}
                        estimatedArrival={arrival}
                      />
                    )}

                    <ActionButton
                      variant="primary"
                      onClick={() => setStep(2)}
                      fullWidth
                      disabled={fromAmount <= 0}
                    >
                      Continue →
                    </ActionButton>
                  </>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <>
                    <div style={{ marginBottom: "1.25rem" }}>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--muted)",
                          marginBottom: "0.6rem",
                          fontWeight: 600,
                        }}
                      >
                        Recent Recipients
                      </div>
                      {filteredRec
                        .filter((r) => r.recent)
                        .map((r) => (
                          <div
                            key={r.id}
                            onClick={() => setSelRec(r)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              padding: "0.8rem",
                              borderRadius: 12,
                              border: `1px solid ${selRec?.id === r.id ? "rgba(26,108,255,.4)" : "var(--glass-border)"}`,
                              background:
                                selRec?.id === r.id
                                  ? "rgba(26,108,255,.1)"
                                  : "rgba(255,255,255,.03)",
                              cursor: "pointer",
                              marginBottom: "0.5rem",
                              transition: "all .2s",
                            }}
                          >
                            <Avatar initials={r.avatar} size={34} />
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  fontFamily: "Syne",
                                  fontWeight: 700,
                                  fontSize: "0.87rem",
                                }}
                              >
                                {r.name}
                              </div>
                              <div
                                style={{
                                  fontSize: "0.72rem",
                                  color: "var(--muted)",
                                }}
                              >
                                {r.phone} · {r.country}
                              </div>
                            </div>
                            <Badge variant="muted">{r.currency}</Badge>
                          </div>
                        ))}
                      <button
                        onClick={() => setNewRec(true)}
                        style={{
                          width: "100%",
                          padding: "0.7rem",
                          borderRadius: 12,
                          border: "1px dashed rgba(26,108,255,.3)",
                          background: "transparent",
                          color: "var(--electric)",
                          fontFamily: "Syne",
                          fontWeight: 600,
                          fontSize: "0.82rem",
                          cursor: "pointer",
                          marginTop: "0.25rem",
                        }}
                      >
                        + Add New Recipient
                      </button>
                    </div>

                    <FormField label="Transfer Note (optional)">
                      <TFInput
                        placeholder="e.g. School fees, rent…"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </FormField>

                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <ActionButton
                        variant="ghost"
                        onClick={() => setStep(1)}
                        fullWidth
                      >
                        ← Back
                      </ActionButton>
                      <ActionButton
                        variant="primary"
                        onClick={() => setStep(3)}
                        fullWidth
                        disabled={!selRec}
                      >
                        Review →
                      </ActionButton>
                    </div>
                  </>
                )}

                {/* Step 3 */}
                {step === 3 && selRec && (
                  <>
                    <div
                      style={{
                        padding: "1.25rem",
                        background: "rgba(26,108,255,.07)",
                        border: "1px solid rgba(26,108,255,.18)",
                        borderRadius: 16,
                        marginBottom: "1.25rem",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Syne",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          marginBottom: "1rem",
                        }}
                      >
                        Transfer Summary
                      </div>
                      <InfoRow
                        label="You Send"
                        value={`${fromCur} ${fromAmount.toLocaleString()}`}
                      />
                      <InfoRow
                        label="Exchange Rate"
                        value={`1 ${fromCur} = ${rate} ${toCur}`}
                      />
                      <InfoRow
                        label="Fee"
                        value={`${fromCur} ${fee.toLocaleString()}`}
                      />
                      <InfoRow
                        label="Recipient Gets"
                        value={`${toCur} ${toAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                        accent
                      />
                      <InfoRow label="Recipient" value={selRec.name} />
                      <InfoRow label="Destination" value={selRec.country} />
                      <InfoRow
                        label="Via"
                        value={selRec.bank ?? "Mobile Money"}
                      />
                      <InfoRow label="Arrives" value={arrival} last />
                    </div>
                    {note && (
                      <div
                        style={{
                          padding: "0.75rem 1rem",
                          background: "rgba(255,255,255,.04)",
                          borderRadius: 10,
                          fontSize: "0.82rem",
                          color: "var(--muted)",
                          marginBottom: "1rem",
                        }}
                      >
                        📝 Note: {note}
                      </div>
                    )}
                    <AlertBanner
                      type="warning"
                      message="Please double-check all details. Cross-border transfers cannot be reversed once sent."
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
                        onClick={() => setStep(2)}
                        fullWidth
                      >
                        ← Back
                      </ActionButton>
                      <ActionButton
                        variant="primary"
                        onClick={() => setDone(true)}
                        fullWidth
                      >
                        Send Now ✓
                      </ActionButton>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: "var(--green)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Transfer Sent!
                </div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    marginBottom: "0.4rem",
                  }}
                >
                  {fromCur} {fromAmount.toLocaleString()}
                </div>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.85rem",
                    marginBottom: "2rem",
                    lineHeight: 1.5,
                  }}
                >
                  {selRec?.name} will receive{" "}
                  <strong style={{ color: "var(--green)" }}>
                    {toCur}{" "}
                    {toAmount.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </strong>{" "}
                  in approximately {arrival}.
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <TransferTimeline status="processing" />
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <ActionButton
                    variant="ghost"
                    onClick={() => {
                      setDone(false);
                      setStep(1);
                      setFromAmt("");
                      setSelRec(null);
                      setNote("");
                    }}
                    fullWidth
                  >
                    New Transfer
                  </ActionButton>
                  <ActionButton
                    variant="primary"
                    onClick={() => setTab("history")}
                    fullWidth
                  >
                    View History
                  </ActionButton>
                </div>
              </div>
            )}
          </GlassCard>

          {/* Right side info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Saved recipients quick list */}
            <GlassCard hover={false}>
              <SectionHeader
                title="Saved Recipients"
                action={
                  <ActionButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setTab("recipients")}
                  >
                    View All →
                  </ActionButton>
                }
              />
              {mockRecipients.slice(0, 3).map((r) => (
                <div
                  key={r.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.7rem 0",
                    borderBottom: "1px solid rgba(100,160,255,.06)",
                  }}
                >
                  <Avatar initials={r.avatar} size={32} />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "Syne",
                        fontWeight: 600,
                        fontSize: "0.83rem",
                      }}
                    >
                      {r.name}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
                      {r.country} · {r.currency}
                    </div>
                  </div>
                  <ActionButton
                    variant="ghost"
                    size="xs"
                    onClick={() => {
                      setSelRec(r);
                      setStep(2);
                    }}
                  >
                    Send
                  </ActionButton>
                </div>
              ))}
            </GlassCard>

            {/* Rates mini */}
            <GlassCard hover={false}>
              <SectionHeader title="Quick Rates" />
              {EXCHANGE_RATES.slice(0, 4).map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.6rem 0",
                    borderBottom: "1px solid rgba(100,160,255,.06)",
                    fontSize: "0.83rem",
                  }}
                >
                  <span style={{ color: "var(--muted)" }}>
                    1 {r.from} → {r.to}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ fontFamily: "Syne", fontWeight: 700 }}>
                      {r.rate.toLocaleString()}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: r.change24h >= 0 ? "var(--green)" : "#ff6b6b",
                      }}
                    >
                      {r.change24h >= 0 ? "↑" : "↓"}
                      {Math.abs(r.change24h)}%
                    </span>
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>
        </div>
      )}

      {/* ── HISTORY TAB ── */}
      {tab === "history" && (
        <GlassCard hover={false}>
          <SectionHeader
            title="Transfer History"
            sub="All cross-border transactions"
          />
          {mockCrossBorderTransfers.map((t, i) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 0",
                borderBottom:
                  i < mockCrossBorderTransfers.length - 1
                    ? "1px solid rgba(100,160,255,.06)"
                    : "none",
                cursor: "pointer",
              }}
              onClick={() => setShowDet(t)}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(26,108,255,.1)",
                  border: "1px solid rgba(26,108,255,.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  flexShrink: 0,
                }}
              >
                🌍
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "0.87rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  To {t.recipient} · {t.country}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                  {timeAgo(t.createdAt)} · Ref: {t.reference}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  {t.fromCurrency} {t.fromAmount.toLocaleString()}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--green)",
                    marginBottom: "0.25rem",
                  }}
                >
                  → {t.toCurrency}{" "}
                  {t.toAmount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </div>
                <TransferStatusBadge status={t.status} />
              </div>
            </div>
          ))}
        </GlassCard>
      )}

      {/* ── RECIPIENTS TAB ── */}
      {tab === "recipients" && (
        <div>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <input
              value={recSearch}
              onChange={(e) => setRecSearch(e.target.value)}
              placeholder="🔍 Search recipients..."
              className="form-input"
              style={{ flex: 1, minWidth: 200 }}
            />
            <ActionButton variant="primary" onClick={() => setNewRec(true)}>
              + Add Recipient
            </ActionButton>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: "1rem",
            }}
          >
            {filteredRec.map((r) => (
              <GlassCard key={r.id} hover>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    marginBottom: "1rem",
                  }}
                >
                  <Avatar initials={r.avatar} size={44} />
                  <div>
                    <div style={{ fontFamily: "Syne", fontWeight: 700 }}>
                      {r.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                      {r.phone}
                    </div>
                  </div>
                  {r.recent && <Badge variant="green">Recent</Badge>}
                </div>
                <StatRow
                  items={[
                    { label: "Country", value: r.country },
                    { label: "Currency", value: r.currency },
                    { label: "Bank", value: r.bank ?? "Mobile Money" },
                    {
                      label: "Sent",
                      value: formatCurrency(r.totalSent, r.currency),
                      color: "var(--green)",
                    },
                  ]}
                />
                <div
                  style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}
                >
                  <ActionButton
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => {
                      setSelRec(r);
                      setStep(2);
                      setTab("send");
                    }}
                  >
                    Send Money
                  </ActionButton>
                  <ActionButton variant="ghost" size="sm">
                    Edit
                  </ActionButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* ── LIVE RATES TAB ── */}
      {tab === "rates" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "1rem",
          }}
        >
          {EXCHANGE_RATES.map((r, i) => (
            <GlassCard key={i} hover glow={r.change24h >= 0 ? "green" : "red"}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  {r.from} / {r.to}
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: r.change24h >= 0 ? "var(--green)" : "#ff6b6b",
                  }}
                >
                  {r.change24h >= 0 ? "↑" : "↓"} {Math.abs(r.change24h)}%
                </span>
              </div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  marginBottom: "0.35rem",
                }}
              >
                {r.rate.toLocaleString(undefined, { maximumFractionDigits: 4 })}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                1 {r.from} = {r.rate} {r.to} · Updated {timeAgo(r.lastUpdated)}
              </div>
              <div style={{ marginTop: "0.85rem" }}>
                <div
                  style={{
                    height: 3,
                    background: "rgba(255,255,255,.06)",
                    borderRadius: 2,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "60%",
                      background: r.change24h >= 0 ? "var(--green)" : "#ff6b6b",
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Transfer Detail Modal */}
      {showDet && (
        <Modal
          title="Transfer Details"
          onClose={() => setShowDet(null)}
          subtitle={`Reference: ${showDet.reference}`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              marginBottom: "1.5rem",
            }}
          >
            <Avatar initials={showDet.recipientAvatar} size={48} />
            <div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                {showDet.recipient}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                {showDet.country} · {showDet.recipientPhone}
              </div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <TransferStatusBadge status={showDet.status} />
            </div>
          </div>
          <InfoRow
            label="You Sent"
            value={`${showDet.fromCurrency} ${showDet.fromAmount.toLocaleString()}`}
          />
          <InfoRow
            label="They Received"
            value={`${showDet.toCurrency} ${showDet.toAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
            accent
          />
          <InfoRow label="Exchange Rate" value={`${showDet.rate}`} />
          <InfoRow
            label="Fee"
            value={`${showDet.fromCurrency} ${showDet.fee}`}
          />
          <InfoRow label="Payment Via" value={showDet.paymentMethod} />
          <InfoRow
            label="Bank"
            value={showDet.recipientBank ?? "Mobile Money"}
          />
          <InfoRow
            label="Initiated"
            value={new Date(showDet.createdAt).toLocaleString()}
          />
          {showDet.completedAt && (
            <InfoRow
              label="Completed"
              value={new Date(showDet.completedAt).toLocaleString()}
              last
            />
          )}
          <div style={{ marginTop: "1.5rem" }}>
            <SectionHeader title="Transfer Timeline" />
            <TransferTimeline status={showDet.status} />
          </div>
          {showDet.note && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,.04)",
                borderRadius: 10,
                fontSize: "0.82rem",
                color: "var(--muted)",
              }}
            >
              📝 {showDet.note}
            </div>
          )}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            <ActionButton
              variant="ghost"
              onClick={() => setShowDet(null)}
              fullWidth
            >
              Close
            </ActionButton>
            <ActionButton variant="primary" fullWidth>
              📥 Download Receipt
            </ActionButton>
          </div>
        </Modal>
      )}

      {/* Add New Recipient Modal */}
      {newRec && (
        <Modal title="Add New Recipient" onClose={() => setNewRec(false)}>
          <FormField label="Full Name" required>
            <TFInput placeholder="Chidi Obi" />
          </FormField>
          <FormField label="Phone Number" required>
            <TFInput type="tel" placeholder="+234 801 234 5678" />
          </FormField>
          <FormField label="Country" required>
            <TFSelect>
              {SUPPORTED_COUNTRIES.filter((c) => c.active).map((c) => (
                <option key={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </TFSelect>
          </FormField>
          <FormField label="Preferred Currency">
            <TFSelect>
              {["XAF", "NGN", "USDT", "GHS", "KES"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </TFSelect>
          </FormField>
          <FormField label="Bank / Mobile Money Provider">
            <TFInput placeholder="GTBank, MTN, Orange…" />
          </FormField>
          <FormField label="Account / Wallet Number">
            <TFInput placeholder="Optional" />
          </FormField>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <ActionButton
              variant="ghost"
              onClick={() => setNewRec(false)}
              fullWidth
            >
              Cancel
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={() => setNewRec(false)}
              fullWidth
            >
              Save Recipient ✓
            </ActionButton>
          </div>
        </Modal>
      )}
    </div>
  );
}
