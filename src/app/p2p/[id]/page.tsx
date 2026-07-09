"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockP2POrders, formatCurrency } from "../../../lib/data";
import {
  GlassCard,
  ActionButton,
  Badge,
  SectionHeader,
  Modal,
  FormField,
  TFInput,
  InfoRow,
} from "../../../components/shared/UI";
import TradeTimeline from "../../../components/p2p/TradeTimeline";
import EscrowStatus from "../../../components/p2p/EscrowStatus";
import ChatPanel from "../../../components/shared/ChatPanel";
import { Avatar } from "../../../components/shared/AuthenticatedLayout";

export default function P2POrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const order =
    mockP2POrders.find((o) => o.id === params.id) ?? mockP2POrders[0];

  const [tradeStep, setTradeStep] = useState<1 | 2 | 3 | 4>(2);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showRelease, setShowRelease] = useState(false);
  const [showAppeal, setShowAppeal] = useState(false);
  const [released, setReleased] = useState(false);
  const [amount, setAmount] = useState("");

  const timelineSteps = [
    {
      label: "Order Created",
      sub:
        "Buyer placed an order for " +
        formatCurrency(order.available, order.currency),
      done: tradeStep > 1,
      active: tradeStep === 1,
    },
    {
      label: "Funds Locked in Escrow",
      sub: "Seller locked funds. Safe to make payment.",
      done: tradeStep > 2,
      active: tradeStep === 2,
    },
    {
      label: "Payment Made",
      sub: "Buyer confirmed payment via " + order.paymentMethods[0],
      done: tradeStep > 3,
      active: tradeStep === 3,
    },
    {
      label: "Funds Released",
      sub: released
        ? "Trade completed successfully."
        : "Awaiting seller release.",
      done: released,
      active: tradeStep === 4 && !released,
    },
  ];

  if (released) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "3rem 2rem",
            background: "var(--card-bg)",
            border: "1px solid rgba(0,229,160,.25)",
            borderRadius: 24,
            backdropFilter: "blur(16px)",
            maxWidth: 440,
            width: "100%",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
          <div
            style={{
              fontFamily: "Syne",
              fontSize: "1.5rem",
              fontWeight: 800,
              marginBottom: "0.5rem",
              background:
                "linear-gradient(135deg,var(--green),var(--electric))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Trade Complete!
          </div>
          <div
            style={{
              fontFamily: "Syne",
              fontSize: "1.8rem",
              fontWeight: 800,
              marginBottom: "0.4rem",
            }}
          >
            {formatCurrency(order.available, order.currency)}
          </div>
          <div
            style={{
              color: "var(--muted)",
              fontSize: "0.88rem",
              marginBottom: "2rem",
              lineHeight: 1.5,
            }}
          >
            Funds have been released to the buyer successfully.
            <br />
            Transaction is now complete.
          </div>
          <div
            style={{
              padding: "1rem",
              background: "rgba(0,229,160,.06)",
              border: "1px solid rgba(0,229,160,.2)",
              borderRadius: 12,
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                fontSize: "0.8rem",
              }}
            >
              {[
                ["Order ID", "#" + order.id.slice(-6).toUpperCase()],
                ["Trader", order.trader],
                ["Amount", formatCurrency(order.available, order.currency)],
                ["Payment", order.paymentMethods[0]],
              ].map(([l, v]) => (
                <div key={l}>
                  <div
                    style={{ color: "var(--muted)", marginBottom: "0.15rem" }}
                  >
                    {l}
                  </div>
                  <div style={{ fontFamily: "Syne", fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <ActionButton
              variant="ghost"
              onClick={() => router.push("/p2p")}
              style={{ flex: 1, justifyContent: "center" }}
            >
              Back to P2P
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={() => router.push("/wallet")}
              style={{ flex: 1, justifyContent: "center" }}
            >
              View Wallet
            </ActionButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/p2p"
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
        ← Back to P2P
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.4rem",
            }}
          >
            <h1
              style={{
                fontFamily: "Syne",
                fontSize: "clamp(1.4rem,3vw,1.9rem)",
                fontWeight: 800,
              }}
            >
              Trade #{order.id.slice(-6).toUpperCase()}
            </h1>
            <Badge variant={order.type === "buy" ? "blue" : "gold"}>
              {order.type.toUpperCase()}
            </Badge>
          </div>
          <p style={{ color: "var(--muted)", fontSize: "0.88rem" }}>
            {order.type === "buy" ? "Buying" : "Selling"} {order.currency} from{" "}
            {order.trader}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
          <ActionButton
            variant="danger"
            size="sm"
            onClick={() => setShowAppeal(true)}
          >
            ⚠️ Appeal
          </ActionButton>
          <ActionButton
            variant="ghost"
            size="sm"
            onClick={() => router.push("/p2p/dispute")}
          >
            Open Dispute
          </ActionButton>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Left column */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Escrow */}
          <EscrowStatus
            state={
              tradeStep === 1
                ? "pending"
                : tradeStep === 4
                  ? "releasing"
                  : "locked"
            }
            amount={formatCurrency(order.available, order.currency)}
            currency={order.currency}
          />

          {/* Order details */}
          <GlassCard hover={false}>
            <SectionHeader title="Order Details" />
            <InfoRow label="Trader" value={order.trader} />
            <InfoRow
              label="Amount"
              value={formatCurrency(order.available, order.currency)}
              accent
            />
            <InfoRow
              label="Price"
              value={`${order.price} ${order.priceUnit}`}
            />
            <InfoRow label="Payment Method" value={order.paymentMethods[0]} />
            <InfoRow
              label="Time Remaining"
              value={tradeStep >= 3 ? "Completed" : "14:32"}
            />
            <InfoRow
              label="Completion Rate"
              value={`${order.completionRate}%`}
              accent
            />

            {/* Trader profile */}
            <div
              style={{
                marginTop: "1.25rem",
                padding: "1rem",
                background: "rgba(255,255,255,.03)",
                borderRadius: 12,
                border: "1px solid var(--glass-border)",
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
              }}
            >
              <div style={{ position: "relative" }}>
                <Avatar initials={order.traderAvatar} size={42} />
                {order.online && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: "var(--green)",
                      border: "2px solid var(--navy)",
                    }}
                  />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  {order.trader}
                  {order.verified && <Badge variant="green">✓ Verified</Badge>}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    marginTop: "0.2rem",
                  }}
                >
                  {order.trades} trades · ★ {order.rating}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Actions */}
          <GlassCard hover={false}>
            <SectionHeader title="Trade Actions" />
            {tradeStep === 2 && (
              <>
                <div
                  style={{
                    padding: "1rem",
                    background: "rgba(240,180,41,.08)",
                    border: "1px solid rgba(240,180,41,.2)",
                    borderRadius: 12,
                    fontSize: "0.82rem",
                    color: "var(--muted)",
                    marginBottom: "1rem",
                    lineHeight: 1.55,
                  }}
                >
                  ⚡ Please enter the amount and confirm your payment after
                  sending. Do{" "}
                  <strong style={{ color: "var(--text)" }}>NOT</strong> click
                  confirm before paying.
                </div>
                <FormField label="Amount to send">
                  <TFInput
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </FormField>
                <ActionButton
                  variant="primary"
                  onClick={() => setShowConfirm(true)}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  ✓ I Have Paid
                </ActionButton>
              </>
            )}
            {tradeStep === 3 && (
              <>
                <div
                  style={{
                    padding: "1rem",
                    background: "rgba(0,229,160,.06)",
                    border: "1px solid rgba(0,229,160,.15)",
                    borderRadius: 12,
                    fontSize: "0.82rem",
                    color: "var(--muted)",
                    marginBottom: "1rem",
                    lineHeight: 1.55,
                  }}
                >
                  ✅ Payment confirmed. Waiting for seller to release funds.
                  This usually takes 2–10 minutes.
                </div>
                <ActionButton
                  variant="green"
                  onClick={() => setShowRelease(true)}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Release Funds
                </ActionButton>
              </>
            )}
            {tradeStep === 4 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "1.5rem",
                  color: "var(--green)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  ✅
                </div>
                <div style={{ fontFamily: "Syne", fontWeight: 700 }}>
                  Release in progress...
                </div>
              </div>
            )}
          </GlassCard>

          {/* Timeline */}
          <GlassCard hover={false}>
            <SectionHeader title="Trade Progress" />
            <TradeTimeline steps={timelineSteps} />
          </GlassCard>
        </div>

        {/* Right column — Chat */}
        <div>
          <GlassCard
            hover={false}
            style={{ padding: 0, overflow: "hidden", height: 560 }}
          >
            <ChatPanel
              embedded
              partnerName={order.trader}
              partnerAvatar={order.traderAvatar}
              subtitle={`P2P Trade #${order.id.slice(-6).toUpperCase()}`}
            />
          </GlassCard>
        </div>
      </div>

      {/* Confirm Payment Modal */}
      {showConfirm && (
        <Modal title="✅ Confirm Payment" onClose={() => setShowConfirm(false)}>
          <div
            style={{
              padding: "1rem",
              background: "rgba(255,107,107,.06)",
              border: "1px solid rgba(255,107,107,.18)",
              borderRadius: 12,
              marginBottom: "1.25rem",
              fontSize: "0.83rem",
              color: "var(--muted)",
              lineHeight: 1.6,
            }}
          >
            ⚠️{" "}
            <strong style={{ color: "#ff8080" }}>
              Only confirm if you have already sent the payment.
            </strong>{" "}
            False confirmation may result in account suspension.
          </div>
          <InfoRow
            label="Amount"
            value={
              amount
                ? `${amount} ${order.currency}`
                : formatCurrency(order.available, order.currency)
            }
            accent
          />
          <InfoRow label="Payment Method" value={order.paymentMethods[0]} />
          <InfoRow label="Recipient" value={order.trader} />
          <div
            style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}
          >
            <ActionButton
              variant="ghost"
              onClick={() => setShowConfirm(false)}
              style={{ flex: 1, justifyContent: "center" }}
            >
              Cancel
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={() => {
                setShowConfirm(false);
                setTradeStep(3);
              }}
              style={{ flex: 1, justifyContent: "center" }}
            >
              Confirm Payment ✓
            </ActionButton>
          </div>
        </Modal>
      )}

      {/* Release Funds Modal */}
      {showRelease && (
        <Modal title="💸 Release Funds" onClose={() => setShowRelease(false)}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>🔓</div>
            <div
              style={{
                fontFamily: "Syne",
                fontSize: "1.5rem",
                fontWeight: 800,
                marginBottom: "0.4rem",
              }}
            >
              {formatCurrency(order.available, order.currency)}
            </div>
            <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
              Releasing to {order.trader}
            </div>
          </div>
          <div
            style={{
              padding: "1rem",
              background: "rgba(0,229,160,.06)",
              border: "1px solid rgba(0,229,160,.15)",
              borderRadius: 12,
              fontSize: "0.82rem",
              color: "var(--muted)",
              marginBottom: "1.5rem",
              lineHeight: 1.5,
            }}
          >
            ✅ By releasing funds you confirm you have received the buyers
            payment in full. This action cannot be undone.
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <ActionButton
              variant="ghost"
              onClick={() => setShowRelease(false)}
              style={{ flex: 1, justifyContent: "center" }}
            >
              Cancel
            </ActionButton>
            <ActionButton
              variant="green"
              onClick={() => {
                setShowRelease(false);
                setTradeStep(4);
                setTimeout(() => setReleased(true), 1500);
              }}
              style={{ flex: 1, justifyContent: "center" }}
            >
              Release Funds ✓
            </ActionButton>
          </div>
        </Modal>
      )}

      {/* Appeal Modal */}
      {showAppeal && (
        <Modal title="⚠️ Submit Appeal" onClose={() => setShowAppeal(false)}>
          <div
            style={{
              padding: "0.9rem 1rem",
              background: "rgba(255,107,107,.06)",
              border: "1px solid rgba(255,107,107,.15)",
              borderRadius: 12,
              fontSize: "0.8rem",
              color: "var(--muted)",
              marginBottom: "1.25rem",
              lineHeight: 1.5,
            }}
          >
            Appeals are reviewed within 24 hours by a TaboFins moderator. Please
            provide clear evidence.
          </div>
          <FormField label="Reason for Appeal">
            <select
              className="form-input"
              style={{ appearance: "none" as const }}
            >
              <option>Seller is unresponsive</option>
              <option>Payment sent but not confirmed</option>
              <option>Wrong amount received</option>
              <option>Fraudulent activity suspected</option>
              <option>Other</option>
            </select>
          </FormField>
          <FormField label="Description">
            <textarea
              className="form-input"
              placeholder="Describe the issue in detail..."
              style={{ resize: "vertical", minHeight: 90 }}
            />
          </FormField>
          <FormField label="Evidence (screenshot description)">
            <div
              style={{
                padding: "1.5rem",
                border: "1px dashed rgba(26,108,255,.3)",
                borderRadius: 12,
                textAlign: "center",
                cursor: "pointer",
                color: "var(--muted)",
                fontSize: "0.82rem",
              }}
            >
              📎 Click to attach screenshot or proof of payment
            </div>
          </FormField>
          <ActionButton
            variant="danger"
            onClick={() => {
              setShowAppeal(false);
              router.push("/p2p/dispute");
            }}
            style={{ width: "100%", justifyContent: "center" }}
          >
            Submit Appeal
          </ActionButton>
        </Modal>
      )}
    </div>
  );
}
