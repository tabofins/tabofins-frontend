"use client";
import { useState } from "react";
import Link from "next/link";
import {
  mockUser,
  mockReferralTree,
  mockCommissions,
  mockLeaderboard,
  mockNotifications,
  formatCurrency,
} from "../../../lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  SectionHeader,
  StatCard,
  TabBar,
  Modal,
  ReferralCodeBlock,
  LeaderboardRow,
  AlertBanner,
  StatRow,
  InfoRow,
  ProgressBar,
} from "../../../components/shared/UI";
import { Avatar } from "../../../components/shared/AuthenticatedLayout";

const TIERS = [
  {
    name: "Bronze",
    min: 0,
    max: 4,
    icon: "🥉",
    color: "#cd7f32",
    rate: "5%",
    perks: ["XAF 5,000 signup bonus", "1% trade cashback"],
  },
  {
    name: "Silver",
    min: 5,
    max: 14,
    icon: "🥈",
    color: "#c0c0c0",
    rate: "7.5%",
    perks: ["XAF 5,000 signup bonus", "2% trade cashback", "Priority support"],
  },
  {
    name: "Gold",
    min: 15,
    max: 29,
    icon: "🥇",
    color: "#ffd700",
    rate: "10%",
    perks: ["XAF 5,000 signup bonus", "3% trade cashback", "Dedicated manager"],
  },
  {
    name: "Diamond",
    min: 30,
    max: 999,
    icon: "💎",
    color: "#b9f2ff",
    rate: "12%",
    perks: ["XAF 7,500 signup bonus", "5% trade cashback", "VIP dashboard"],
  },
];

function currentTier(referrals: number) {
  return (
    TIERS.find((t) => referrals >= t.min && referrals <= t.max) ?? TIERS[0]
  );
}
function nextTier(referrals: number) {
  const idx = TIERS.findIndex((t) => referrals >= t.min && referrals <= t.max);
  return idx >= 0 && idx < TIERS.length - 1 ? TIERS[idx + 1] : null;
}

export default function ReferralPage() {
  const [tab, setTab] = useState("overview");
  const [showInvite, setShowInvite] = useState(false);

  const tier = currentTier(mockUser.totalReferrals);
  const next = nextTier(mockUser.totalReferrals);
  const toNext = next ? next.min - mockUser.totalReferrals : 0;
  const tierPct = next
    ? ((mockUser.totalReferrals - tier.min) / (next.min - tier.min)) * 100
    : 100;

  const referralLink = `https://tabofins.com/join?ref=${mockUser.referralCode}`;

  const totalPending = mockCommissions
    .filter((c) => c.status === "pending")
    .reduce((s, c) => s + c.amount, 0);
  const totalPaid = mockCommissions
    .filter((c) => c.status === "paid")
    .reduce((s, c) => s + c.amount, 0);

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <Link
          href="/profile"
          style={{
            color: "var(--muted)",
            textDecoration: "none",
            fontSize: "0.82rem",
          }}
        >
          ← Back to Profile
        </Link>
      </div>
      <PageHeader
        title="Referral Programme"
        sub="Earn 10% of every transaction fee from users you refer — forever."
        action={
          <ActionButton variant="primary" onClick={() => setShowInvite(true)}>
            🎁 Invite Friends
          </ActionButton>
        }
      />

      {/* Tier hero */}
      <GlassCard
        hover={false}
        glow="gold"
        style={{ marginBottom: "2rem", padding: "2rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span style={{ fontSize: "2.5rem" }}>{tier.icon}</span>
              <div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: tier.color,
                  }}
                >
                  {tier.name} Tier
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                  {next
                    ? `${toNext} more referral${toNext !== 1 ? "s" : ""} to reach ${next.name}`
                    : "You are at the top tier! 🎉"}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <Badge variant="gold">{tier.rate} commission rate</Badge>
              <Badge variant="green">
                {mockUser.totalReferrals} referrals total
              </Badge>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "Syne",
                fontSize: "0.72rem",
                color: "var(--muted)",
                marginBottom: "0.4rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Total Earned
            </div>
            <div
              style={{
                fontFamily: "Syne",
                fontSize: "2rem",
                fontWeight: 800,
                color: "var(--gold2)",
              }}
            >
              {formatCurrency(mockUser.referralEarnings, "XAF")}
            </div>
          </div>
        </div>
        {next && (
          <div style={{ marginTop: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginBottom: "0.4rem",
              }}
            >
              <span>{tier.name}</span>
              <span>
                {next.name} ({next.min} referrals)
              </span>
            </div>
            <ProgressBar value={tierPct} color="gold" height={8} animated />
          </div>
        )}
      </GlassCard>

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
          label="Total Referrals"
          value={String(mockUser.totalReferrals)}
          icon="👥"
          glow="blue"
        />
        <StatCard
          label="Earnings Paid"
          value={`XAF ${(totalPaid / 1000).toFixed(0)}K`}
          icon="💰"
          glow="gold"
        />
        <StatCard
          label="Pending"
          value={`XAF ${totalPending.toLocaleString()}`}
          icon="⏳"
          glow="green"
        />
        <StatCard label="Commission Rate" value={tier.rate} icon="📊" />
      </div>

      <TabBar
        tabs={[
          { id: "overview", label: "Overview", icon: "📊" },
          { id: "tree", label: "My Network", icon: "🌳" },
          { id: "commissions", label: "Commissions", icon: "💰" },
          { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
          { id: "tiers", label: "Tier Perks", icon: "🎁" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {/* ── OVERVIEW ── */}
      {tab === "overview" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Code + link */}
          <GlassCard hover={false}>
            <SectionHeader title="Your Referral Code & Link" />
            <ReferralCodeBlock
              code={mockUser.referralCode}
              link={referralLink}
            />
            <div
              style={{
                marginTop: "1rem",
                padding: "0.9rem",
                background: "rgba(255,255,255,.03)",
                borderRadius: 12,
                border: "1px solid var(--glass-border)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  marginBottom: "0.35rem",
                }}
              >
                QR Code
              </div>
              <div
                style={{
                  width: 120,
                  height: 120,
                  background: "rgba(255,255,255,.06)",
                  borderRadius: 12,
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                }}
              >
                🔲
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "var(--muted)",
                  marginTop: "0.5rem",
                }}
              >
                Scan to join TaboFins
              </div>
              <ActionButton
                variant="ghost"
                size="sm"
                style={{ marginTop: "0.5rem" }}
              >
                📥 Download QR
              </ActionButton>
            </div>
          </GlassCard>

          {/* How it works */}
          <GlassCard hover={false} glow="blue">
            <SectionHeader title="How Your Earnings Work" />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                {
                  step: "1",
                  icon: "🔗",
                  title: "Share your link",
                  desc: "Send your unique referral link or code to friends, family, or your community.",
                },
                {
                  step: "2",
                  icon: "👤",
                  title: "Friend signs up",
                  desc: "They create a verified account using your referral code.",
                },
                {
                  step: "3",
                  icon: "💳",
                  title: "They transact",
                  desc: "Every time they pay a transaction fee on TaboFins you earn your commission.",
                },
                {
                  step: "4",
                  icon: "💰",
                  title: `You earn ${tier.rate}`,
                  desc: `You receive ${tier.rate} of every platform fee collected from their transactions — forever.`,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    display: "flex",
                    gap: "0.85rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background:
                        "linear-gradient(135deg,var(--electric),#0052cc)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "Syne",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <AlertBanner
              type="info"
              message="Commissions are credited to your TaboFins wallet within 24 hours of each qualifying transaction."
              style={{ marginTop: "1rem" }}
            />
          </GlassCard>
        </div>
      )}

      {/* ── NETWORK TREE ── */}
      {tab === "tree" && (
        <GlassCard hover={false}>
          <SectionHeader
            title="My Referral Network"
            sub={`${mockUser.totalReferrals} total referrals across 2 levels`}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {mockReferralTree.map((ref) => (
              <div
                key={ref.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.9rem 1.1rem",
                  background: "rgba(255,255,255,.03)",
                  borderRadius: 14,
                  border: "1px solid var(--glass-border)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    color: "var(--muted)",
                    width: 24,
                    flexShrink: 0,
                  }}
                >
                  L{ref.level}
                </div>
                <Avatar initials={ref.avatar} size={36} />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 700,
                      fontSize: "0.87rem",
                    }}
                  >
                    {ref.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    Joined {new Date(ref.joinedAt).toLocaleDateString()} ·{" "}
                    {ref.referrals} sub-referrals
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: "var(--gold2)",
                    }}
                  >
                    {formatCurrency(ref.earnings, "XAF")}
                  </div>
                  <Badge
                    variant={
                      ref.status === "active"
                        ? "green"
                        : ref.status === "pending"
                          ? "gold"
                          : "muted"
                    }
                  >
                    {ref.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* ── COMMISSIONS ── */}
      {tab === "commissions" && (
        <GlassCard hover={false}>
          <SectionHeader
            title="Commission History"
            sub="Earnings from referred users' transaction fees"
          />
          {mockCommissions.map((c, i) => (
            <div
              key={c.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.85rem 0",
                borderBottom:
                  i < mockCommissions.length - 1
                    ? "1px solid rgba(100,160,255,.06)"
                    : "none",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "rgba(240,180,41,.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  flexShrink: 0,
                }}
              >
                💰
              </div>
              <Avatar initials={c.avatar} size={30} />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  {c.from} · {c.type} commission
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                  {c.date}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    color: "var(--gold2)",
                  }}
                >
                  +{formatCurrency(c.amount, c.currency)}
                </div>
                <Badge variant={c.status === "paid" ? "green" : "gold"}>
                  {c.status}
                </Badge>
              </div>
            </div>
          ))}
        </GlassCard>
      )}

      {/* ── LEADERBOARD ── */}
      {tab === "leaderboard" && (
        <GlassCard hover={false}>
          <SectionHeader
            title="Top Referrers This Month"
            sub="Rankings reset on the 1st of each month"
          />
          {mockLeaderboard.map((entry) => (
            <LeaderboardRow
              key={entry.rank}
              rank={entry.rank}
              name={entry.name}
              avatar={entry.avatar}
              value={formatCurrency(entry.earnings, entry.currency)}
              valueLabel={`${entry.referrals} referrals`}
              badge={entry.badge}
              isMe={entry.isMe}
            />
          ))}
        </GlassCard>
      )}

      {/* ── TIER PERKS ── */}
      {tab === "tiers" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "1.25rem",
          }}
        >
          {TIERS.map((t) => {
            const isCurrentTier = t.name === tier.name;
            return (
              <GlassCard
                key={t.name}
                hover
                glow={isCurrentTier ? "gold" : undefined}
                style={{
                  border: isCurrentTier ? `1px solid ${t.color}55` : undefined,
                }}
              >
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                    {t.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      color: t.color,
                    }}
                  >
                    {t.name}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                    {t.min}–{t.max === 999 ? "∞" : t.max} referrals
                  </div>
                  {isCurrentTier && <Badge variant="gold">Current Tier</Badge>}
                </div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontSize: "1.8rem",
                    fontWeight: 800,
                    textAlign: "center",
                    color: t.color,
                    marginBottom: "1rem",
                  }}
                >
                  {t.rate}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                >
                  of every platform fee earned from your referrals
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.45rem",
                  }}
                >
                  {t.perks.map((perk) => (
                    <div
                      key={perk}
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        fontSize: "0.78rem",
                        color: "var(--text)",
                      }}
                    >
                      <span style={{ color: "var(--green)", flexShrink: 0 }}>
                        ✓
                      </span>
                      {perk}
                    </div>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* Invite modal */}
      {showInvite && (
        <Modal title="🎁 Invite Friends" onClose={() => setShowInvite(false)}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎉</div>
            <div
              style={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: "1rem",
                marginBottom: "0.3rem",
              }}
            >
              Earn {tier.rate} on every fee they pay
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
              Share your code and earn commissions forever.
            </div>
          </div>
          <ReferralCodeBlock code={mockUser.referralCode} link={referralLink} />
          <div
            style={{
              marginTop: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {[
              { icon: "📱", label: "Share via WhatsApp", color: "#25D366" },
              { icon: "✈️", label: "Share via Telegram", color: "#229ED9" },
              {
                icon: "✉️",
                label: "Share via Email",
                color: "var(--electric)",
              },
              { icon: "📋", label: "Copy Message", color: "var(--muted)" },
            ].map((item) => (
              <button
                key={item.label}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: 10,
                  border: "1px solid var(--glass-border)",
                  background: "rgba(255,255,255,.03)",
                  color: "var(--text)",
                  fontFamily: "Syne",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  transition: "all .2s",
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(26,108,255,.4)")
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor =
                    "")
                }
              >
                <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
