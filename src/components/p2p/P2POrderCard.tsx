"use client";
import { Avatar } from "../../components/shared/AuthenticatedLayout";
import { Badge, ActionButton } from "../../components/shared/UI";
import { P2POrder, formatCurrency } from "../../lib/data";
import { useRouter } from "next/navigation";

interface Props {
  order: P2POrder;
  side: "buy" | "sell";
}

export default function P2POrderCard({ order, side }: Props) {
  const router = useRouter();
  const isBuy = side === "buy";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1.5fr 1.5fr 2fr 1.2fr",
        gap: "1rem",
        alignItems: "center",
        padding: "1.1rem 1.5rem",
        background: "var(--card-bg)",
        border: "1px solid var(--glass-border)",
        borderRadius: 16,
        backdropFilter: "blur(16px)",
        transition: "all .2s",
        marginBottom: "0.65rem",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(26,108,255,.35)";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "";
      }}
    >
      {/* Trader */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ position: "relative" }}>
          <Avatar initials={order.traderAvatar} size={38} />
          {order.online && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--green)",
                border: "2px solid var(--navy)",
              }}
            />
          )}
        </div>
        <div>
          <div
            style={{
              fontFamily: "Syne",
              fontWeight: 700,
              fontSize: "0.88rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            {order.trader}
            {order.verified && (
              <span style={{ fontSize: "0.7rem", color: "var(--green)" }}>
                ✓
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              color: "var(--muted)",
              marginTop: "0.1rem",
            }}
          >
            {order.trades} trades · {order.completionRate}% completion
          </div>
          <div style={{ display: "flex", gap: "0.3rem", marginTop: "0.3rem" }}>
            {"★★★★★".split("").map((s, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.65rem",
                  color:
                    i < Math.round(order.rating)
                      ? "var(--gold2)"
                      : "var(--muted)",
                }}
              >
                ★
              </span>
            ))}
            <span
              style={{
                fontSize: "0.68rem",
                color: "var(--muted)",
                marginLeft: "0.2rem",
              }}
            >
              {order.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div>
        <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1rem" }}>
          {order.price.toLocaleString()}{" "}
          <span
            style={{
              fontSize: "0.72rem",
              color: "var(--muted)",
              fontWeight: 400,
            }}
          >
            {order.priceUnit}
          </span>
        </div>
        <div
          style={{
            fontSize: "0.7rem",
            color: "var(--muted)",
            marginTop: "0.2rem",
          }}
        >
          Available: {formatCurrency(order.available, order.currency)}
        </div>
      </div>

      {/* Limits */}
      <div>
        <div
          style={{
            fontSize: "0.78rem",
            color: "var(--muted)",
            marginBottom: "0.2rem",
          }}
        >
          Limit
        </div>
        <div
          style={{ fontFamily: "Syne", fontSize: "0.82rem", fontWeight: 600 }}
        >
          {formatCurrency(order.minLimit, order.currency)}
        </div>
        <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
          — {formatCurrency(order.maxLimit, order.currency)}
        </div>
      </div>

      {/* Payment */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {order.paymentMethods.map((pm) => (
          <span
            key={pm}
            style={{
              padding: "0.2rem 0.55rem",
              background: "rgba(26,108,255,.1)",
              border: "1px solid rgba(26,108,255,.2)",
              borderRadius: 6,
              fontSize: "0.65rem",
              fontFamily: "Syne",
              fontWeight: 600,
              color: "#7eb8ff",
            }}
          >
            {pm}
          </span>
        ))}
      </div>

      {/* Action */}
      <ActionButton
        variant={isBuy ? "primary" : "gold"}
        size="sm"
        onClick={() => router.push(`/p2p/${order.id}`)}
      >
        {isBuy ? "Buy" : "Sell"} {order.currency}
      </ActionButton>
    </div>
  );
}
