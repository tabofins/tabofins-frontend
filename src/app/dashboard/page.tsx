"use client";
import Link from "next/link";
import {
  mockUser,
  mockBalances,
  mockTransactions,
  mockNjangis,
  mockVaults,
  formatCurrency,
  timeAgo,
  pct,
} from "../../lib/data";
import {
  StatCard,
  GlassCard,
  SectionHeader,
  ActionButton,
  Badge,
  ProgressBar,
} from "../../components/shared/UI";

export default function DashboardPage() {
  const totalUSD = mockBalances.reduce((s, b) => s + b.usdEquivalent, 0);
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: "2rem" }}>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.88rem",
            marginBottom: "0.25rem",
          }}
        >
          {greeting} 👋
        </p>
        <h1
          style={{
            fontFamily: "Syne",
            fontSize: "clamp(1.6rem,3vw,2.2rem)",
            fontWeight: 800,
            letterSpacing: "-0.5px",
          }}
        >
          Welcome back,{" "}
          <span className="blue-text">{mockUser.name.split(" ")[0]}</span>
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.88rem",
            marginTop: "0.3rem",
          }}
        >
          Here is your financial overview for today.
        </p>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          label="Total Balance"
          value={"$" + totalUSD.toLocaleString()}
          sub="All currencies"
          icon="💼"
          change={2.4}
          glow="blue"
        />
        <StatCard
          label="Active Njangis"
          value={String(
            mockNjangis.filter((n) => n.status === "active").length,
          )}
          sub="2 contributions due"
          icon="🤝"
          glow="gold"
        />
        <StatCard
          label="Total Savings"
          value="XAF 1.7M"
          sub="Across 3 vaults"
          icon="🔒"
          change={8.1}
          glow="green"
        />
        <StatCard
          label="Trust Score"
          value={mockUser.trustScore + "/100"}
          sub="KYC verified"
          icon="⭐"
          glow="gold"
        />
      </div>

      {/* Balances + Transactions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <GlassCard hover={false}>
          <SectionHeader
            title="Wallet Balances"
            action={
              <Link
                href="/wallet"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--electric)",
                  textDecoration: "none",
                }}
              >
                View all →
              </Link>
            }
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
          >
            {mockBalances.map((b) => {
              const accent =
                b.currency === "XAF"
                  ? "var(--gold2)"
                  : b.currency === "NGN"
                    ? "var(--green)"
                    : "#7eb8ff";
              return (
                <div
                  key={b.currency}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1rem",
                    background: "rgba(255,255,255,.03)",
                    borderRadius: 12,
                    border: "1px solid var(--glass-border)",
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
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,.06)",
                        border: "1px solid var(--glass-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Syne",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        color: accent,
                      }}
                    >
                      {b.currency}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "Syne",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                        }}
                      >
                        {formatCurrency(b.amount, b.currency)}
                      </div>
                      <div
                        style={{ fontSize: "0.72rem", color: "var(--muted)" }}
                      >
                        approx. ${b.usdEquivalent.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: b.change24h >= 0 ? "var(--green)" : "#ff6b6b",
                    }}
                  >
                    {b.change24h >= 0 ? "↑" : "↓"} {Math.abs(b.change24h)}%
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.25rem" }}>
            <ActionButton
              variant="primary"
              size="sm"
              style={{ flex: 1, justifyContent: "center" }}
            >
              + Deposit
            </ActionButton>
            <ActionButton
              variant="ghost"
              size="sm"
              style={{ flex: 1, justifyContent: "center" }}
            >
              Send
            </ActionButton>
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <SectionHeader
            title="Recent Transactions"
            action={
              <Link
                href="/wallet"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--electric)",
                  textDecoration: "none",
                }}
              >
                View all →
              </Link>
            }
          />
          {mockTransactions.slice(0, 5).map((tx, i) => (
            <div
              key={tx.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.7rem 0",
                borderBottom:
                  i < 4 ? "1px solid rgba(100,160,255,.06)" : "none",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background:
                    tx.type === "credit"
                      ? "rgba(0,229,160,.12)"
                      : "rgba(255,107,107,.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
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
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {tx.description}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
                  {timeAgo(tx.timestamp)}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color:
                      tx.type === "credit" ? "var(--green)" : "var(--text)",
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
      </div>

      {/* Njangis + Savings */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <GlassCard hover={false}>
          <SectionHeader
            title="Active Njangis"
            action={
              <Link
                href="/njangi"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--electric)",
                  textDecoration: "none",
                }}
              >
                Manage →
              </Link>
            }
          />
          {mockNjangis.map((nj) => (
            <Link
              key={nj.id}
              href={"/njangi/" + nj.id}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(255,255,255,.03)",
                  borderRadius: 14,
                  border: "1px solid var(--glass-border)",
                  transition: "all .2s",
                  cursor: "pointer",
                  marginBottom: "0.85rem",
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(26,108,255,.35)")
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor = "")
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "var(--text)",
                    }}
                  >
                    {nj.name}
                  </span>
                  <Badge variant={nj.myContributionPaid ? "green" : "gold"}>
                    {nj.myContributionPaid ? "Paid" : "Due"}
                  </Badge>
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Cycle {nj.currentCycle}/{nj.totalCycles} · {nj.members.length}{" "}
                  members
                </div>
                <ProgressBar
                  value={pct(nj.currentCycle, nj.totalCycles)}
                  color="blue"
                />
              </div>
            </Link>
          ))}
        </GlassCard>

        <GlassCard hover={false}>
          <SectionHeader
            title="Savings Vaults"
            action={
              <Link
                href="/savings"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--electric)",
                  textDecoration: "none",
                }}
              >
                Manage →
              </Link>
            }
          />
          {mockVaults.map((v) => (
            <div
              key={v.id}
              style={{
                padding: "1rem",
                background: "rgba(255,255,255,.03)",
                borderRadius: 14,
                border: "1px solid var(--glass-border)",
                marginBottom: "0.85rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  {v.emoji} {v.name}
                </span>
                <Badge variant={v.status === "locked" ? "muted" : "green"}>
                  {v.status}
                </Badge>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  marginBottom: "0.5rem",
                }}
              >
                <span>{formatCurrency(v.currentAmount, v.currency)}</span>
                <span>{pct(v.currentAmount, v.targetAmount)}%</span>
              </div>
              <ProgressBar
                value={pct(v.currentAmount, v.targetAmount)}
                color={v.status === "locked" ? "muted" : "green"}
              />
            </div>
          ))}
        </GlassCard>
      </div>

      {/* Insights */}
      <GlassCard hover={false}>
        <SectionHeader
          title="Financial Insights"
          sub="Personalized tips based on your activity"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              icon: "💡",
              title: "Portfolio Concentration",
              text: "83% of your assets are currently held in USDT, making it your largest single holding.",
              color: "var(--gold2)",
            },
            {
              icon: "🎯",
              title: "Njangi On Track",
              text: "Your Famille Tanko njangi is 37.5% complete. Keep your perfect record!",
              color: "var(--green)",
            },
            {
              icon: "📈",
              title: "Savings Milestone",
              text: "Emergency Fund is 60% full — XAF 800,000 away from goal.",
              color: "#7eb8ff",
            },
          ].map((ins) => (
            <div
              key={ins.title}
              style={{
                padding: "1.1rem",
                background: "rgba(255,255,255,.03)",
                borderRadius: 14,
                border: "1px solid var(--glass-border)",
              }}
            >
              <div style={{ fontSize: "1.4rem", marginBottom: "0.6rem" }}>
                {ins.icon}
              </div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  marginBottom: "0.35rem",
                  color: ins.color,
                }}
              >
                {ins.title}
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                {ins.text}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
