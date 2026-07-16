"use client";
import { useState } from "react";
import Link from "next/link";
import {
  mockUser,
  mockReputation,
  mockCommissions,
  mockReferralTree,
  formatCurrency,
} from "../../lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  SectionHeader,
  StatCard,
  FormField,
  TFInput,
  AlertBanner,
  StatRow,
  InfoRow,
  ProgressBar,
  ReferralCodeBlock,
} from "../../components/shared/UI";
import { Avatar } from "../../components/shared/AuthenticatedLayout";

const LEVEL_COLORS: Record<string, string> = {
  Bronze: "#cd7f32",
  Silver: "#c0c0c0",
  Gold: "#ffd700",
  Platinum: "#b9f2ff",
};

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  }

  const levelColor = LEVEL_COLORS[mockReputation.level] ?? "var(--gold2)";
  const referralLink = `https://tabofins.com/join?ref=${mockUser.referralCode}`;
  const totalReferralEarned = mockCommissions
    .filter((c) => c.status === "paid")
    .reduce((s, c) => s + c.amount, 0);

  return (
    <div>
      <PageHeader
        title="My Profile"
        sub="Manage your personal information, reputation, and referrals."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "1.5rem",
        }}
      >
        {/* ── Left column ── */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Identity card */}
          <GlassCard hover={false} glow="blue">
            <div
              style={{
                textAlign: "center",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid var(--glass-border)",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginBottom: "1rem",
                }}
              >
                <Avatar initials={mockUser.avatar} size={80} />
                <button
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "var(--electric)",
                    border: "2px solid var(--navy)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                  }}
                >
                  ✏️
                </button>
              </div>
              <h2
                style={{
                  fontFamily: "Syne",
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  marginBottom: "0.25rem",
                }}
              >
                {mockUser.name}
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.82rem",
                  marginBottom: "0.35rem",
                }}
              >
                {mockUser.occupation}
              </p>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.8rem",
                  marginBottom: "0.85rem",
                }}
              >
                {mockUser.city}, {mockUser.country}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Badge variant="green">✓ KYC Verified</Badge>
                <Badge variant="blue">🇨🇲 {mockUser.country}</Badge>
                <Badge variant="gold">{mockReputation.level} Member</Badge>
              </div>
            </div>

            {/* Bio */}
            {mockUser.bio && (
              <div
                style={{
                  marginBottom: "1.25rem",
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                {mockUser.bio}
              </div>
            )}

            {/* Quick stats */}
            <StatRow
              items={[
                {
                  label: "Member Since",
                  value: new Date(mockUser.joinedAt).toLocaleDateString(
                    "en-GB",
                    { month: "short", year: "numeric" },
                  ),
                },
                { label: "KYC", value: "Verified ✓", color: "var(--green)" },
                {
                  label: "Trust Score",
                  value: `${mockUser.trustScore}/100`,
                  color: "var(--gold2)",
                },
                {
                  label: "Success Rate",
                  value: `${mockReputation.successRate}%`,
                  color: "var(--green)",
                },
                {
                  label: "Total Trades",
                  value: String(mockReputation.totalTrades),
                },
                {
                  label: "Avg Response",
                  value: mockReputation.avgResponseTime,
                },
              ]}
            />
          </GlassCard>

          {/* Trust Score */}
          <GlassCard hover={false} glow="gold">
            <SectionHeader title="Trust Score" />
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
            >
              <div
                style={{
                  position: "relative",
                  width: 100,
                  height: 100,
                  flexShrink: 0,
                }}
              >
                <svg
                  viewBox="0 0 36 36"
                  style={{
                    width: "100%",
                    height: "100%",
                    transform: "rotate(-90deg)",
                  }}
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke="rgba(255,255,255,.07)"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke="url(#tsg)"
                    strokeWidth="2.5"
                    strokeDasharray={`${mockUser.trustScore} ${100 - mockUser.trustScore}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="tsg" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={levelColor} />
                      <stop offset="100%" stopColor="var(--green)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 800,
                      fontSize: "1.5rem",
                      color: levelColor,
                    }}
                  >
                    {mockUser.trustScore}
                  </div>
                  <div style={{ fontSize: "0.6rem", color: "var(--muted)" }}>
                    / 100
                  </div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: levelColor,
                    marginBottom: "0.4rem",
                  }}
                >
                  {mockReputation.level} Standing
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.35rem",
                  }}
                >
                  {[
                    {
                      label: "KYC Score",
                      value: "100%",
                      color: "var(--green)",
                    },
                    {
                      label: "Payment History",
                      value: `${mockReputation.successRate}%`,
                      color: "var(--green)",
                    },
                    {
                      label: "Positive Reviews",
                      value: String(mockReputation.positiveReviews),
                      color: "var(--green)",
                    },
                    {
                      label: "Disputes Lost",
                      value: String(mockReputation.disputesLost),
                      color:
                        mockReputation.disputesLost > 0
                          ? "#ff8080"
                          : "var(--green)",
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.75rem",
                      }}
                    >
                      <span style={{ color: "var(--muted)" }}>{row.label}</span>
                      <span
                        style={{
                          color: row.color,
                          fontWeight: 600,
                          fontFamily: "Syne",
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    marginTop: "0.75rem",
                  }}
                >
                  {mockReputation.badges.map((b) => (
                    <Badge key={b} variant="blue">
                      {b}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* KYC Status */}
          <GlassCard hover={false} glow="green">
            <SectionHeader
              title="Identity Verification (KYC)"
              action={
                <Link href="/kyc">
                  <ActionButton variant="ghost" size="sm">
                    Manage
                  </ActionButton>
                </Link>
              }
            />
            {[
              { label: "National ID", detail: "Verified — Jun 2025" },
              { label: "Selfie + Liveness", detail: "Biometric 98.4% match" },
              { label: "Proof of Address", detail: "Utility bill accepted" },
              { label: "Phone Verification", detail: mockUser.phone },
              { label: "Email Verification", detail: mockUser.email },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  padding: "0.75rem 1rem",
                  background: "rgba(0,229,160,.05)",
                  border: "1px solid rgba(0,229,160,.15)",
                  borderRadius: 12,
                  marginBottom: "0.5rem",
                }}
              >
                <span>✅</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    {item.detail}
                  </div>
                </div>
                <Badge variant="green">OK</Badge>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* ── Right column ── */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Edit personal info */}
          <GlassCard hover={false}>
            <SectionHeader
              title="Personal Information"
              action={
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  {saved && (
                    <span
                      style={{ fontSize: "0.78rem", color: "var(--green)" }}
                    >
                      ✓ Saved!
                    </span>
                  )}
                  <ActionButton
                    variant="ghost"
                    size="sm"
                    onClick={() => (editing ? handleSave() : setEditing(true))}
                  >
                    {editing ? "Save" : "✏️ Edit"}
                  </ActionButton>
                  {editing && (
                    <ActionButton
                      variant="danger"
                      size="sm"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </ActionButton>
                  )}
                </div>
              }
            />
            {[
              { label: "Full Name", value: mockUser.name, type: "text" },
              { label: "Email", value: mockUser.email, type: "email" },
              { label: "Phone", value: mockUser.phone, type: "tel" },
              { label: "Country", value: mockUser.country, type: "text" },
              { label: "City", value: mockUser.city, type: "text" },
              { label: "Occupation", value: mockUser.occupation, type: "text" },
            ].map((f) => (
              <FormField key={f.label} label={f.label}>
                <TFInput
                  type={f.type}
                  defaultValue={f.value}
                  readOnly={!editing}
                  style={{
                    opacity: editing ? 1 : 0.65,
                    background: editing ? undefined : "rgba(255,255,255,.03)",
                    cursor: editing ? "text" : "default",
                  }}
                />
              </FormField>
            ))}
            <FormField label="Bio">
              <textarea
                readOnly={!editing}
                defaultValue={mockUser.bio}
                className="form-input"
                style={{
                  resize: "vertical",
                  minHeight: 70,
                  opacity: editing ? 1 : 0.65,
                  background: editing ? undefined : "rgba(255,255,255,.03)",
                }}
              />
            </FormField>
          </GlassCard>

          {/* Platform preferences */}
          <GlassCard hover={false}>
            <SectionHeader title="Platform Preferences" />
            <StatRow
              items={[
                {
                  label: "Language",
                  value:
                    mockUser.language === "en" ? "English" : mockUser.language,
                },
                { label: "Default Currency", value: mockUser.currency },
                {
                  label: "Theme",
                  value: mockUser.theme === "dark" ? "Dark (Premium)" : "Light",
                },
                {
                  label: "2FA",
                  value: mockUser.twoFA ? "Enabled ✓" : "Disabled",
                  color: mockUser.twoFA ? "var(--green)" : "#ff8080",
                },
                {
                  label: "Email Verified",
                  value: mockUser.emailVerified ? "Yes" : "No",
                  color: mockUser.emailVerified ? "var(--green)" : "#ff8080",
                },
                {
                  label: "Phone Verified",
                  value: mockUser.phoneVerified ? "Yes" : "No",
                  color: mockUser.phoneVerified ? "var(--green)" : "#ff8080",
                },
              ]}
            />
            <ActionButton
              variant="ghost"
              size="sm"
              style={{ marginTop: "1rem" }}
            >
              <Link
                href="/settings"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                ⚙️ Manage in Settings →
              </Link>
            </ActionButton>
          </GlassCard>

          {/* Referral snapshot */}
          <GlassCard hover={false} glow="gold">
            <SectionHeader
              title="Referral Overview"
              action={
                <Link href="/profile/referral">
                  <ActionButton variant="primary" size="sm">
                    Full Dashboard →
                  </ActionButton>
                </Link>
              }
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              {[
                {
                  label: "Total Referrals",
                  value: String(mockUser.totalReferrals),
                  color: "#7eb8ff",
                },
                {
                  label: "Total Earned",
                  value: formatCurrency(mockUser.referralEarnings, "XAF"),
                  color: "var(--gold2)",
                },
                {
                  label: "This Month",
                  value: formatCurrency(totalReferralEarned, "XAF"),
                  color: "var(--green)",
                },
                {
                  label: "Active Network",
                  value: String(
                    mockReferralTree.filter((r) => r.status === "active")
                      .length,
                  ),
                  color: "var(--green)",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    padding: "0.75rem",
                    background: "rgba(255,255,255,.03)",
                    borderRadius: 10,
                    border: "1px solid var(--glass-border)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      color: s.color,
                      marginBottom: "0.2rem",
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "var(--muted)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <ReferralCodeBlock
              code={mockUser.referralCode}
              link={referralLink}
            />
          </GlassCard>

          {/* Account actions */}
          <GlassCard hover={false}>
            <SectionHeader title="Account & Security" />
            {[
              {
                icon: "🔒",
                label: "Change Password",
                sub: "Last changed 3 months ago",
                href: "/settings",
              },
              {
                icon: "🔐",
                label: "Two-Factor Authentication",
                sub: "Enabled via SMS",
                href: "/settings",
              },
              {
                icon: "📱",
                label: "Trusted Devices",
                sub: "2 active sessions",
                href: "/settings",
              },
              {
                icon: "🪪",
                label: "KYC Status",
                sub: "Verified — Full access",
                href: "/kyc",
              },
              {
                icon: "🎁",
                label: "Referral Programme",
                sub: `${mockUser.totalReferrals} referrals · ${formatCurrency(mockUser.referralEarnings, "XAF")} earned`,
                href: "/profile/referral",
              },
              {
                icon: "🚪",
                label: "Sign Out All Devices",
                sub: "Revoke all active sessions",
                href: "/",
                danger: true,
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  padding: "0.85rem 1rem",
                  background: "rgba(255,255,255,.03)",
                  borderRadius: 12,
                  border: "1px solid var(--glass-border)",
                  textDecoration: "none",
                  transition: "all .2s",
                  marginBottom: "0.5rem",
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(26,108,255,.3)")
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "")
                }
              >
                <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: (item as { danger?: boolean }).danger
                        ? "#ff8080"
                        : "var(--text)",
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    {item.sub}
                  </div>
                </div>
                <span style={{ color: "var(--muted)" }}>›</span>
              </Link>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
