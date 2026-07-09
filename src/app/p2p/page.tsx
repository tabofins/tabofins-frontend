"use client";
import { useState } from "react";
import {
  mockP2POrders,
  mockTransactions,
  formatCurrency,
  timeAgo,
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
} from "../../components/shared/UI";
import P2POrderCard from "../../components/p2p/P2POrderCard";

const CURRENCIES = ["XAF", "NGN", "USDT"] as const;
const PAYMENT_METHODS = [
  "All",
  "MTN Mobile Money",
  "Orange Money",
  "Bank Transfer",
];

export default function P2PPage() {
  const [tab, setTab] = useState<"buy" | "sell" | "orders" | "history">("buy");
  const [currency, setCurrency] = useState<"XAF" | "NGN" | "USDT">("XAF");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [createDone, setCreateDone] = useState(false);

  const filteredOrders = mockP2POrders
    .filter((o) => {
      if (tab !== "buy" && tab !== "sell") return false;
      if (o.currency !== currency) return false;
      if (o.type === "sell" && tab === "buy") return true;
      if (o.type === "buy" && tab === "sell") return true;
      return false;
    })
    .filter((o) => {
      if (verifiedOnly && !o.verified) return false;
      if (onlineOnly && !o.online) return false;
      if (paymentFilter !== "All" && !o.paymentMethods.includes(paymentFilter))
        return false;
      return true;
    });

  const myOrders = mockP2POrders.slice(0, 2);
  const p2pTx = mockTransactions.filter((t) => t.category === "p2p");

  return (
    <div>
      <PageHeader
        title="P2P Exchange"
        sub="Trade currencies peer-to-peer with full escrow protection."
        action={
          <ActionButton
            variant="primary"
            onClick={() => {
              setShowCreate(true);
              setCreateStep(1);
              setCreateDone(false);
            }}
          >
            + Post Order
          </ActionButton>
        }
      />

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard label="Available Orders" value="47" icon="📋" glow="blue" />
        <StatCard label="My Active Trades" value="2" icon="🔄" glow="gold" />
        <StatCard label="Completed Trades" value="18" icon="✅" glow="green" />
        <StatCard label="Escrow Protected" value="100%" icon="🔒" glow="blue" />
      </div>

      {/* Tabs */}
      <TabBar
        tabs={[
          { id: "buy", label: "Buy", icon: "📥" },
          { id: "sell", label: "Sell", icon: "📤" },
          { id: "orders", label: "My Orders", icon: "📋" },
          { id: "history", label: "History", icon: "🕐" },
        ]}
        active={tab}
        onChange={(id) => setTab(id as typeof tab)}
      />

      {/* Buy / Sell tabs */}
      {(tab === "buy" || tab === "sell") && (
        <>
          {/* Currency + Filters */}
          <GlassCard
            hover={false}
            style={{ marginBottom: "1.5rem", padding: "1.25rem 1.5rem" }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* Currency selector */}
              <div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    marginBottom: "0.4rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Currency
                </div>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  {CURRENCIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      style={{
                        padding: "0.45rem 1rem",
                        borderRadius: 9,
                        border:
                          currency === c
                            ? "1px solid rgba(26,108,255,.5)"
                            : "1px solid var(--glass-border)",
                        background:
                          currency === c
                            ? "rgba(26,108,255,.18)"
                            : "transparent",
                        color: currency === c ? "#7eb8ff" : "var(--muted)",
                        fontFamily: "Syne",
                        fontWeight: 700,
                        fontSize: "0.82rem",
                        cursor: "pointer",
                        transition: "all .2s",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment method */}
              <div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    marginBottom: "0.4rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Payment Method
                </div>
                <div
                  style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}
                >
                  {PAYMENT_METHODS.map((pm) => (
                    <button
                      key={pm}
                      onClick={() => setPaymentFilter(pm)}
                      style={{
                        padding: "0.4rem 0.85rem",
                        borderRadius: 9,
                        border:
                          paymentFilter === pm
                            ? "1px solid rgba(26,108,255,.4)"
                            : "1px solid var(--glass-border)",
                        background:
                          paymentFilter === pm
                            ? "rgba(26,108,255,.12)"
                            : "transparent",
                        color:
                          paymentFilter === pm ? "#7eb8ff" : "var(--muted)",
                        fontFamily: "Syne",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        transition: "all .2s",
                      }}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div
                style={{ display: "flex", gap: "1.25rem", marginLeft: "auto" }}
              >
                {[
                  {
                    label: "Verified only",
                    val: verifiedOnly,
                    set: setVerifiedOnly,
                  },
                  { label: "Online now", val: onlineOnly, set: setOnlineOnly },
                ].map(({ label, val, set }) => (
                  <label
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                    }}
                  >
                    <div
                      onClick={() => set(!val)}
                      style={{
                        width: 36,
                        height: 20,
                        borderRadius: 10,
                        background: val
                          ? "var(--electric)"
                          : "rgba(255,255,255,.1)",
                        position: "relative",
                        transition: "background .25s",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 2,
                          left: val ? 18 : 2,
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: "#fff",
                          transition: "left .25s",
                        }}
                      />
                    </div>
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Column headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr 1.5fr 2fr 1.2fr",
              gap: "1rem",
              padding: "0.5rem 1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            {["Advertiser", "Price", "Limit", "Payment", "Trade"].map((h) => (
              <div
                key={h}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Orders */}
          {filteredOrders.length === 0 ? (
            <GlassCard
              hover={false}
              style={{ textAlign: "center", padding: "3rem" }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                📭
              </div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  marginBottom: "0.4rem",
                }}
              >
                No orders found
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                Try changing your filters or currency.
              </div>
            </GlassCard>
          ) : (
            filteredOrders.map((order) => (
              <P2POrderCard key={order.id} order={order} side={tab} />
            ))
          )}
        </>
      )}

      {/* My Orders tab */}
      {tab === "orders" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {myOrders.map((order) => (
            <GlassCard
              key={order.id}
              hover={false}
              onClick={() => (window.location.href = `/p2p/${order.id}`)}
              style={{ cursor: "pointer" }}
            >
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <Badge variant={order.type === "buy" ? "blue" : "gold"}>
                      {order.type.toUpperCase()}
                    </Badge>
                    <span
                      style={{
                        fontFamily: "Syne",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                      }}
                    >
                      {order.currency}
                    </span>
                    <Badge variant="green">Escrow Locked</Badge>
                  </div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {formatCurrency(order.available, order.currency)}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                    With {order.trader} · {order.paymentMethods[0]}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--muted)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Time remaining
                  </div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 800,
                      fontSize: "1.3rem",
                      color: "var(--gold2)",
                    }}
                  >
                    14:32
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    Payment window
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* History tab */}
      {tab === "history" && (
        <GlassCard hover={false}>
          <SectionHeader
            title="Trade History"
            sub="All completed and cancelled P2P trades"
          />
          {p2pTx.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "2.5rem",
                color: "var(--muted)",
              }}
            >
              No trade history yet.
            </div>
          ) : (
            p2pTx.map((tx, i) => (
              <div
                key={tx.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.9rem 0",
                  borderBottom:
                    i < p2pTx.length - 1
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
                  🔄
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
                    {timeAgo(tx.timestamp)}{" "}
                    {tx.counterparty ? `· ${tx.counterparty}` : ""}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 700,
                      color:
                        tx.type === "credit" ? "var(--green)" : "var(--text)",
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
            ))
          )}
        </GlassCard>
      )}

      {/* Create Order Modal */}
      {showCreate && (
        <Modal title="📋 Post P2P Order" onClose={() => setShowCreate(false)}>
          {/* Progress */}
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              marginBottom: "1.5rem",
            }}
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

          {!createDone ? (
            <>
              {createStep === 1 && (
                <>
                  <FormField label="Order Type">
                    <TFSelect>
                      <option>Buy</option>
                      <option>Sell</option>
                    </TFSelect>
                  </FormField>
                  <FormField label="Currency">
                    <TFSelect>
                      <option>XAF</option>
                      <option>NGN</option>
                      <option>USDT</option>
                    </TFSelect>
                  </FormField>
                  <FormField label="Total Amount">
                    <TFInput type="number" placeholder="500,000" />
                  </FormField>
                  <ActionButton
                    variant="primary"
                    onClick={() => setCreateStep(2)}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Continue →
                  </ActionButton>
                </>
              )}
              {createStep === 2 && (
                <>
                  <FormField label="Price per unit">
                    <TFInput type="number" placeholder="1" />
                  </FormField>
                  <FormField label="Minimum Limit">
                    <TFInput type="number" placeholder="10,000" />
                  </FormField>
                  <FormField label="Maximum Limit">
                    <TFInput type="number" placeholder="500,000" />
                  </FormField>
                  <FormField label="Payment Window (minutes)">
                    <TFSelect>
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>60 minutes</option>
                    </TFSelect>
                  </FormField>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <ActionButton
                      variant="ghost"
                      onClick={() => setCreateStep(1)}
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      ← Back
                    </ActionButton>
                    <ActionButton
                      variant="primary"
                      onClick={() => setCreateStep(3)}
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      Continue →
                    </ActionButton>
                  </div>
                </>
              )}
              {createStep === 3 && (
                <>
                  <FormField label="Accepted Payment Methods">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      {[
                        "MTN Mobile Money",
                        "Orange Money",
                        "Bank Transfer",
                      ].map((pm) => (
                        <label
                          key={pm}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            padding: "0.6rem 0.9rem",
                            background: "rgba(255,255,255,.03)",
                            borderRadius: 10,
                            border: "1px solid var(--glass-border)",
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{ accentColor: "var(--electric)" }}
                          />
                          {pm}
                        </label>
                      ))}
                    </div>
                  </FormField>
                  <FormField label="Trade Instructions (optional)">
                    <textarea
                      className="form-input"
                      placeholder="e.g. Send payment to MTN number 677XXXXXX and mark as paid..."
                      style={{ resize: "vertical", minHeight: 70 }}
                    />
                  </FormField>
                  <div
                    style={{
                      padding: "0.9rem 1rem",
                      background: "rgba(0,229,160,.06)",
                      border: "1px solid rgba(0,229,160,.15)",
                      borderRadius: 12,
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      marginBottom: "1rem",
                      lineHeight: 1.5,
                    }}
                  >
                    🔒 Your funds will be locked in escrow once a buyer/seller
                    matches your order.
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <ActionButton
                      variant="ghost"
                      onClick={() => setCreateStep(2)}
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      ← Back
                    </ActionButton>
                    <ActionButton
                      variant="primary"
                      onClick={() => setCreateDone(true)}
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      Post Order ✓
                    </ActionButton>
                  </div>
                </>
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
              <h3
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                }}
              >
                Order Posted!
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "1.5rem",
                }}
              >
                Your P2P order is now live. You'll be notified when a trader
                matches it.
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
