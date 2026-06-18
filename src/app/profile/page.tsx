"use client";
import { useState } from "react";
import Link from "next/link";
import { mockUser } from "@/src/lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  SectionHeader,
  FormField,
  TFInput,
} from "@/src/components/shared/UI";
import { Avatar } from "@/src/components/shared/AuthenticatedLayout";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      <PageHeader
        title="My Profile"
        sub="Manage your personal information and verification status."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Left — Profile card + Trust score */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <GlassCard hover={false} glow="blue">
            {/* Avatar & Name */}
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
                  marginBottom: "0.85rem",
                }}
              >
                {mockUser.email}
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
              </div>
            </div>

            {/* Quick info */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.65rem",
              }}
            >
              {[
                {
                  label: "Member Since",
                  value: new Date(mockUser.joinedAt).toLocaleDateString(
                    "en-GB",
                    { month: "short", year: "numeric" },
                  ),
                },
                { label: "KYC Status", value: "Verified ✓" },
                { label: "Phone", value: mockUser.phone },
                { label: "Country", value: mockUser.country },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: "0.65rem 0.85rem",
                    background: "rgba(255,255,255,.03)",
                    borderRadius: 10,
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.67rem",
                      color: "var(--muted)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Trust Score */}
          <GlassCard hover={false} glow="gold">
            <SectionHeader title="Trust Score" />
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
            >
              {/* SVG circle gauge */}
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
                    stroke="rgba(255,255,255,.06)"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke="url(#sg)"
                    strokeWidth="2.5"
                    strokeDasharray={`${mockUser.trustScore} ${100 - mockUser.trustScore}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f0b429" />
                      <stop offset="100%" stopColor="#00e5a0" />
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
                      background:
                        "linear-gradient(135deg,var(--gold2),var(--green))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {mockUser.trustScore}
                  </div>
                  <div style={{ fontSize: "0.6rem", color: "var(--muted)" }}>
                    / 100
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--gold2)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Excellent
                </div>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--muted)",
                    lineHeight: 1.5,
                  }}
                >
                  Your trust score is based on payment history, KYC completion,
                  and community standing.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.35rem",
                    marginTop: "0.75rem",
                  }}
                >
                  {[
                    ["KYC Verified", "100%"],
                    ["Payment History", "97%"],
                    ["Community", "85%"],
                  ].map(([l, v]) => (
                    <div
                      key={l}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.72rem",
                      }}
                    >
                      <span style={{ color: "var(--muted)" }}>{l}</span>
                      <span style={{ color: "var(--green)", fontWeight: 600 }}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right — Edit info + KYC + Account links */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Personal Information */}
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
                    {editing ? "Save Changes" : "✏️ Edit"}
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
              { label: "Email Address", value: mockUser.email, type: "email" },
              { label: "Phone Number", value: mockUser.phone, type: "tel" },
              { label: "Country", value: mockUser.country, type: "text" },
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
          </GlassCard>

          {/* KYC Verification */}
          <GlassCard hover={false} glow="green">
            <SectionHeader title="Identity Verification (KYC)" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.7rem",
              }}
            >
              {[
                { label: "National ID", detail: "Verified — Jun 2025" },
                {
                  label: "Selfie Verification",
                  detail: "Biometric match confirmed",
                },
                { label: "Address Proof", detail: "Utility bill accepted" },
                { label: "Phone Verification", detail: mockUser.phone },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    padding: "0.8rem 1rem",
                    background: "rgba(0,229,160,.05)",
                    border: "1px solid rgba(0,229,160,.15)",
                    borderRadius: 12,
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>✅</span>
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
                  <Badge variant="green">Verified</Badge>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Account shortcuts */}
          <GlassCard hover={false}>
            <SectionHeader title="Account & Security" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
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
                  icon: "🌐",
                  label: "Language",
                  sub: "English (default)",
                  href: "/settings",
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
                  <span style={{ color: "var(--muted)", fontSize: "1rem" }}>
                    ›
                  </span>
                </Link>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
