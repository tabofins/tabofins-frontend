"use client";
import { useState, useEffect } from "react";
import {
  mockBalances,
  mockTransactions,
  EXCHANGE_RATES,
  getRate,
  formatCurrency,
  timeAgo,
} from "../../lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  SectionHeader,
  StatCard,
  AlertBanner,
  Modal,
  FormField,
  TFInput,
  TFSelect,
  InfoRow,
  MiniBarChart,
  TransactionRow,
} from "./../../components/shared/UI";

const POPULAR_PAIRS = [
  { from: "XAF", to: "USDT", vol: "XAF 142M", change: 0.4 },
  { from: "NGN", to: "XAF", vol: "NGN 28M", change: -0.2 },
  { from: "USDT", to: "NGN", vol: "USDT 89K", change: 0.1 },
  { from: "XAF", to: "NGN", vol: "XAF 56M", change: 0.3 },
];

const CHART_DATA = [
  310_000, 340_000, 328_000, 355_000, 370_000, 360_000, 388_000, 395_000,
  410_000, 398_000, 420_000, 615_000,
];

const RECENT_SWAPS = [
  {
    pair: "XAF → USDT",
    from: "XAF 310,000",
    to: "500 USDT",
    time: "2 min ago",
    status: "completed",
  },
  {
    pair: "NGN → XAF",
    from: "₦50,000",
    to: "XAF 19,250",
    time: "14 min ago",
    status: "completed",
  },
  {
    pair: "USDT → XAF",
    from: "200 USDT",
    to: "XAF 123,400",
    time: "1h ago",
    status: "completed",
  },
  {
    pair: "XAF → NGN",
    from: "XAF 100,000",
    to: "₦38,500",
    time: "2h ago",
    status: "completed",
  },
];

export default function SwapPage() {
  const [fromCur, setFromCur] = useState("XAF");
  const [toCur, setToCur] = useState("USDT");
  const [fromAmt, setFromAmt] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [showConfirm, setShowConfirm] = useState(false);
  const [swapDone, setSwapDone] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const fromAmount = parseFloat(fromAmt) || 0;
  const rate = getRate(fromCur, toCur);
  const fee = fromAmount * 0.005;
  const netAmount = fromAmount - fee;
  const toAmount = netAmount * rate;
  const priceImpact =
    fromAmount > 1_000_000 ? 0.12 : fromAmount > 100_000 ? 0.05 : 0.01;
  const minReceived = toAmount * (1 - parseFloat(slippage) / 100);

  const rateInfo = EXCHANGE_RATES.find(
    (r) => r.from === fromCur && r.to === toCur,
  );
  const fromBalance = mockBalances.find((b) => b.currency === fromCur);

  function flip() {
    setFromCur(toCur);
    setToCur(fromCur);
    setFromAmt("");
  }

  const swapTx = mockTransactions.filter((t) => t.category === "swap");

  return (
    <div>
      <PageHeader
        title="Currency Swap"
        sub="Swap between XAF, NGN, and USDT instantly."
        action={
          <ActionButton variant="ghost" onClick={() => setShowHistory(true)}>
            📋 Swap History
          </ActionButton>
        }
      />

      {/* P2P fulfillment notice */}
      <AlertBanner
        type="warning"
        title="⚡ P2P-Powered Swaps"
        message="Swaps are currently fulfilled through our P2P marketplace until dedicated platform liquidity is available. This means your swap is matched with a real counterparty and protected by escrow. Rates may vary slightly from market price."
        style={{ marginBottom: "2rem" }}
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
        <StatCard label="24h Volume" value="XAF 2.8B" icon="📊" glow="blue" />
        <StatCard label="Active Pairs" value="6" icon="💱" glow="gold" />
        <StatCard label="Avg Fill Time" value="~3 min" icon="⚡" glow="green" />
        <StatCard label="Your Swaps" value={String(swapTx.length)} icon="🔄" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "1.75rem",
        }}
      >
        {/* Swap card */}
        <div>
          <GlassCard hover={false} glow="blue">
            <SectionHeader title="Swap Currencies" />

            {/* From */}
            <div
              style={{
                padding: "1.1rem",
                background: "rgba(255,255,255,.04)",
                borderRadius: 14,
                border: "1px solid var(--glass-border)",
                marginBottom: "0.4rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.6rem",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                  You pay
                </span>
                {fromBalance && (
                  <button
                    onClick={() => setFromAmt(String(fromBalance.amount))}
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--electric)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Syne",
                    }}
                  >
                    Max: {formatCurrency(fromBalance.amount, fromCur)}
                  </button>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <TFSelect
                  value={fromCur}
                  onChange={(e) => setFromCur(e.target.value)}
                  style={{ width: 110 }}
                >
                  {["XAF", "NGN", "USDT"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </TFSelect>
                <input
                  type="number"
                  value={fromAmt}
                  onChange={(e) => setFromAmt(e.target.value)}
                  placeholder="0.00"
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontFamily: "Syne",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    color: "var(--text)",
                    textAlign: "right",
                  }}
                />
              </div>
            </div>

            {/* Flip button */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0.25rem 0",
              }}
            >
              <button
                onClick={flip}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,var(--electric),#0052cc)",
                  border: "2px solid var(--navy)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  color: "#fff",
                  transition: "all .25s",
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.transform =
                    "rotate(180deg)")
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.transform = "")
                }
              >
                ⇅
              </button>
            </div>

            {/* To */}
            <div
              style={{
                padding: "1.1rem",
                background: "rgba(0,229,160,.06)",
                borderRadius: 14,
                border: "1px solid rgba(0,229,160,.2)",
                marginTop: "0.4rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  marginBottom: "0.6rem",
                }}
              >
                You receive
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <TFSelect
                  value={toCur}
                  onChange={(e) => setToCur(e.target.value)}
                  style={{ width: 110 }}
                >
                  {["XAF", "NGN", "USDT"]
                    .filter((c) => c !== fromCur)
                    .map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                </TFSelect>
                <div
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontFamily: "Syne",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    color: "var(--green)",
                  }}
                >
                  {toAmount > 0
                    ? toAmount.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })
                    : "0.00"}
                </div>
              </div>
            </div>

            {/* Rate details */}
            {fromAmount > 0 && (
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(255,255,255,.03)",
                  borderRadius: 12,
                  border: "1px solid var(--glass-border)",
                  marginBottom: "1.25rem",
                }}
              >
                <InfoRow
                  label="Exchange Rate"
                  value={`1 ${fromCur} = ${rate.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${toCur}`}
                />
                <InfoRow
                  label="Network Fee"
                  value={`${fromCur} ${fee.toLocaleString(undefined, { maximumFractionDigits: 2 })} (0.5%)`}
                />
                <InfoRow
                  label="Price Impact"
                  value={`${priceImpact.toFixed(2)}%`}
                />
                <InfoRow label="Slippage Tolerance" value={`${slippage}%`} />
                <InfoRow
                  label="Minimum Received"
                  value={`${minReceived.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${toCur}`}
                  accent
                  last
                />
              </div>
            )}

            {/* Slippage */}
            <div style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  marginBottom: "0.5rem",
                }}
              >
                Slippage Tolerance
              </div>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                {["0.1", "0.5", "1.0", "2.0"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSlippage(s)}
                    style={{
                      flex: 1,
                      padding: "0.45rem",
                      borderRadius: 8,
                      border:
                        slippage === s
                          ? "1px solid rgba(26,108,255,.4)"
                          : "1px solid var(--glass-border)",
                      background:
                        slippage === s ? "rgba(26,108,255,.15)" : "transparent",
                      color: slippage === s ? "#7eb8ff" : "var(--muted)",
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.78rem",
                      cursor: "pointer",
                    }}
                  >
                    {s}%
                  </button>
                ))}
              </div>
            </div>

            {priceImpact >= 0.1 && (
              <AlertBanner
                type="warning"
                message={`High price impact: ${priceImpact.toFixed(2)}%. Consider splitting into smaller swaps.`}
                style={{ marginBottom: "0.75rem" }}
              />
            )}

            <ActionButton
              variant="primary"
              fullWidth
              onClick={() => setShowConfirm(true)}
              disabled={fromAmount <= 0}
            >
              {fromAmount > 0
                ? `Swap ${fromCur} → ${toCur}`
                : "Enter amount to swap"}
            </ActionButton>
          </GlassCard>
        </div>

        {/* Right column */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Chart placeholder */}
          <GlassCard hover={false}>
            <SectionHeader
              title={`${fromCur}/${toCur} Price Chart`}
              sub="Indicative — updated every 30 seconds"
              action={
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  {["1H", "1D", "1W"].map((p) => (
                    <button
                      key={p}
                      style={{
                        padding: "0.25rem 0.55rem",
                        borderRadius: 6,
                        border:
                          p === "1D"
                            ? "1px solid rgba(26,108,255,.4)"
                            : "1px solid var(--glass-border)",
                        background:
                          p === "1D" ? "rgba(26,108,255,.15)" : "transparent",
                        color: p === "1D" ? "#7eb8ff" : "var(--muted)",
                        fontFamily: "Syne",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        cursor: "pointer",
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              }
            />
            <div style={{ marginBottom: "0.75rem" }}>
              <div
                style={{
                  fontFamily: "Syne",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                }}
              >
                {rate.toLocaleString(undefined, { maximumFractionDigits: 4 })}{" "}
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    fontWeight: 400,
                  }}
                >
                  {toCur}
                </span>
              </div>
              {rateInfo && (
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: rateInfo.change24h >= 0 ? "var(--green)" : "#ff6b6b",
                  }}
                >
                  {rateInfo.change24h >= 0 ? "↑" : "↓"}{" "}
                  {Math.abs(rateInfo.change24h)}% (24h)
                </div>
              )}
            </div>
            <MiniBarChart
              data={CHART_DATA}
              height={80}
              color="var(--electric)"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.68rem",
                color: "var(--muted)",
                marginTop: "0.4rem",
              }}
            >
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </GlassCard>

          {/* Popular pairs */}
          <GlassCard hover={false}>
            <SectionHeader title="Popular Pairs" />
            {POPULAR_PAIRS.map((pair, i) => (
              <div
                key={i}
                onClick={() => {
                  setFromCur(pair.from as "XAF" | "NGN" | "USDT");
                  setToCur(pair.to as "XAF" | "NGN" | "USDT");
                }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem 0.9rem",
                  borderRadius: 10,
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid var(--glass-border)",
                  marginBottom: "0.5rem",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(26,108,255,.3)")
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor = "")
                }
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 700,
                      fontSize: "0.87rem",
                    }}
                  >
                    {pair.from}/{pair.to}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
                    Vol: {pair.vol}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    {getRate(pair.from, pair.to).toLocaleString(undefined, {
                      maximumFractionDigits: 4,
                    })}
                  </div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: pair.change >= 0 ? "var(--green)" : "#ff6b6b",
                    }}
                  >
                    {pair.change >= 0 ? "↑" : "↓"} {Math.abs(pair.change)}%
                  </div>
                </div>
              </div>
            ))}
          </GlassCard>

          {/* Recent swaps */}
          <GlassCard hover={false}>
            <SectionHeader title="Recent Swaps (Platform)" />
            {RECENT_SWAPS.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.7rem 0",
                  borderBottom:
                    i < RECENT_SWAPS.length - 1
                      ? "1px solid rgba(100,160,255,.06)"
                      : "none",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                    }}
                  >
                    {s.pair}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
                    {s.from} → {s.to}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Badge variant="green">✓ Filled</Badge>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--muted)",
                      marginTop: "0.2rem",
                    }}
                  >
                    {s.time}
                  </div>
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>

      {/* Confirm Swap Modal */}
      {showConfirm && (
        <Modal title="🔄 Confirm Swap" onClose={() => setShowConfirm(false)}>
          {!swapDone ? (
            <>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "Syne",
                        fontSize: "1.6rem",
                        fontWeight: 800,
                      }}
                    >
                      {fromAmt}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                      {fromCur}
                    </div>
                  </div>
                  <span style={{ fontSize: "1.5rem" }}>→</span>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "Syne",
                        fontSize: "1.6rem",
                        fontWeight: 800,
                        color: "var(--green)",
                      }}
                    >
                      {toAmount.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                      {toCur}
                    </div>
                  </div>
                </div>
              </div>
              <InfoRow label="Rate" value={`1 ${fromCur} = ${rate} ${toCur}`} />
              <InfoRow
                label="Fee"
                value={`${fromCur} ${fee.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
              />
              <InfoRow
                label="Price Impact"
                value={`${priceImpact.toFixed(2)}%`}
              />
              <InfoRow
                label="Minimum Received"
                value={`${minReceived.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${toCur}`}
                accent
              />
              <InfoRow label="Fulfilled via" value="P2P Escrow" last />
              <AlertBanner
                type="info"
                message="This swap will be matched with a P2P trader. Rate locked for 30 seconds."
                style={{ margin: "1rem 0" }}
              />
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <ActionButton
                  variant="ghost"
                  onClick={() => setShowConfirm(false)}
                  fullWidth
                >
                  Cancel
                </ActionButton>
                <ActionButton
                  variant="primary"
                  onClick={() => setSwapDone(true)}
                  fullWidth
                >
                  Confirm Swap ✓
                </ActionButton>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                }}
              >
                Swap Complete!
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "1.5rem",
                }}
              >
                You received{" "}
                <strong style={{ color: "var(--green)" }}>
                  {toAmount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}{" "}
                  {toCur}
                </strong>
              </div>
              <ActionButton
                variant="primary"
                onClick={() => {
                  setSwapDone(false);
                  setShowConfirm(false);
                  setFromAmt("");
                }}
                fullWidth
              >
                Done
              </ActionButton>
            </div>
          )}
        </Modal>
      )}

      {/* Swap History Modal */}
      {showHistory && (
        <Modal
          title="📋 Swap History"
          onClose={() => setShowHistory(false)}
          maxWidth={500}
        >
          {swapTx.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                color: "var(--muted)",
              }}
            >
              No swap history yet.
            </div>
          ) : (
            swapTx.map((tx, i) => (
              <TransactionRow
                key={tx.id}
                type={tx.type}
                category={tx.category}
                description={tx.description}
                amount={tx.amount}
                currency={tx.currency}
                status={tx.status}
                timestamp={tx.timestamp}
                last={i === swapTx.length - 1}
              />
            ))
          )}
        </Modal>
      )}
    </div>
  );
}
