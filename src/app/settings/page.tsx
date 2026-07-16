"use client";
import { useState } from "react";
import Link from "next/link";
import { mockUser } from "../../lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  SectionHeader,
  TabBar,
  Toggle,
  TFSelect,
  FormField,
  TFInput,
  AlertBanner,
  Modal,
  StatRow,
  Divider,
} from "../../components/shared/UI";
import { Avatar } from "../../components/shared/AuthenticatedLayout";

function SettingRow({
  icon,
  label,
  sub,
  right,
  onClick,
}: {
  icon: string;
  label: string;
  sub?: string;
  right?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.85rem",
        padding: "0.9rem 0",
        borderBottom: "1px solid rgba(100,160,255,.06)",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div
          style={{ fontFamily: "Syne", fontWeight: 600, fontSize: "0.87rem" }}
        >
          {label}
        </div>
        {sub && (
          <div
            style={{
              fontSize: "0.73rem",
              color: "var(--muted)",
              marginTop: "0.1rem",
            }}
          >
            {sub}
          </div>
        )}
      </div>
      {right && <div style={{ flexShrink: 0 }}>{right}</div>}
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");

  // Security
  const [twoFA, setTwoFA] = useState(mockUser.twoFA);
  const [biometric, setBiometric] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);

  // Notifications
  const [nContrib, setNContrib] = useState(true);
  const [nPayout, setNPayout] = useState(true);
  const [nTransfer, setNTransfer] = useState(true);
  const [nSecurity, setNSecurity] = useState(true);
  const [nMarketing, setNMarketing] = useState(false);
  const [nWeekly, setNWeekly] = useState(true);
  const [nP2P, setNP2P] = useState(true);
  const [nMarket, setNMarket] = useState(true);
  const [nReferral, setNReferral] = useState(true);

  // Privacy
  const [profilePublic, setProfilePublic] = useState(false);
  const [showTrades, setShowTrades] = useState(true);
  const [showRatings, setShowRatings] = useState(true);
  const [dataAnalytics, setDataAnalytics] = useState(true);

  // Appearance
  const [theme, setTheme] = useState(mockUser.theme);
  const [compact, setCompact] = useState(false);

  // Referral prefs
  const [refNotif, setRefNotif] = useState(true);
  const [autoShare, setAutoShare] = useState(false);

  // Wallet
  const [escrowDefault, setEscrowDefault] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  // App
  const [currency, setCurrency] = useState(mockUser.currency);
  const [language, setLanguage] = useState(mockUser.language);
  const [timezone, setTimezone] = useState("Africa/Douala");

  // Modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [saved, setSaved] = useState(false);

  function saveAll() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const DEVICES = [
    {
      name: "Chrome · Douala, CM",
      icon: "💻",
      last: "Active now",
      current: true,
    },
    {
      name: "iPhone 14 · Douala, CM",
      icon: "📱",
      last: "1 hour ago",
      current: false,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Settings"
        sub="Manage your account, security, preferences and more."
        action={
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {saved && (
              <span style={{ fontSize: "0.82rem", color: "var(--green)" }}>
                ✓ Saved!
              </span>
            )}
            <ActionButton variant="primary" onClick={saveAll}>
              Save Changes
            </ActionButton>
          </div>
        }
      />

      <TabBar
        tabs={[
          { id: "profile", label: "Profile", icon: "👤" },
          { id: "security", label: "Security", icon: "🔒" },
          { id: "notif", label: "Notifications", icon: "🔔" },
          { id: "privacy", label: "Privacy", icon: "👁️" },
          { id: "wallet", label: "Wallet", icon: "💳" },
          { id: "appearance", label: "Appearance", icon: "🎨" },
          { id: "language", label: "Language", icon: "🌐" },
          { id: "referral", label: "Referral", icon: "🎁" },
          { id: "kyc", label: "KYC", icon: "🪪" },
          { id: "devices", label: "Devices", icon: "📱" },
          { id: "support", label: "Support", icon: "💬" },
          { id: "about", label: "About", icon: "ℹ️" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {/* ── PROFILE ── */}
      {tab === "profile" && (
        <GlassCard hover={false}>
          <SectionHeader title="Profile Settings" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
              padding: "1rem",
              background: "rgba(255,255,255,.03)",
              borderRadius: 14,
              border: "1px solid var(--glass-border)",
            }}
          >
            <Avatar initials={mockUser.avatar} size={52} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "Syne", fontWeight: 700 }}>
                {mockUser.name}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                {mockUser.email}
              </div>
            </div>
            <ActionButton variant="ghost" size="sm">
              Change Photo
            </ActionButton>
          </div>
          <FormField label="Full Name">
            <TFInput defaultValue={mockUser.name} />
          </FormField>
          <FormField label="Email">
            <TFInput type="email" defaultValue={mockUser.email} />
          </FormField>
          <FormField label="Phone">
            <TFInput type="tel" defaultValue={mockUser.phone} />
          </FormField>
          <FormField label="City / Location">
            <TFInput defaultValue={mockUser.city} />
          </FormField>
          <FormField label="Occupation">
            <TFInput defaultValue={mockUser.occupation} />
          </FormField>
          <FormField label="Bio">
            <textarea
              className="form-input"
              defaultValue={mockUser.bio}
              style={{ resize: "vertical", minHeight: 80 }}
            />
          </FormField>
        </GlassCard>
      )}

      {/* ── SECURITY ── */}
      {tab === "security" && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <GlassCard hover={false}>
            <SectionHeader title="🔒 Authentication" />
            <SettingRow
              icon="🔐"
              label="Two-Factor Authentication"
              sub="Require OTP on every login"
              right={<Toggle on={twoFA} onChange={setTwoFA} />}
            />
            <SettingRow
              icon="👆"
              label="Biometric Login"
              sub="Use Face ID or fingerprint"
              right={<Toggle on={biometric} onChange={setBiometric} />}
            />
            <SettingRow
              icon="🔔"
              label="Login Alerts"
              sub="Get notified of new sign-ins"
              right={<Toggle on={loginAlerts} onChange={setLoginAlerts} />}
            />
            <SettingRow
              icon="⏱️"
              label="Auto Session Timeout"
              sub="Lock after 15 min inactivity"
              right={
                <Toggle on={sessionTimeout} onChange={setSessionTimeout} />
              }
            />
            <div
              style={{
                marginTop: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              <ActionButton
                variant="ghost"
                onClick={() => setShowPasswordModal(true)}
                fullWidth
              >
                🔑 Change Password
              </ActionButton>
              <ActionButton variant="ghost" fullWidth>
                📱 Manage Trusted Devices
              </ActionButton>
              <ActionButton variant="danger" fullWidth>
                🚪 Sign Out All Devices
              </ActionButton>
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <SectionHeader title="Payment Methods" />
            {[
              {
                icon: "📱",
                label: "MTN Mobile Money",
                number: "+237 677 123 456",
                default: true,
              },
              {
                icon: "🟠",
                label: "Orange Money",
                number: "+237 699 234 567",
                default: false,
              },
            ].map((pm, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  padding: "0.85rem 1rem",
                  background: "rgba(255,255,255,.03)",
                  borderRadius: 12,
                  border: "1px solid var(--glass-border)",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{pm.icon}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                    }}
                  >
                    {pm.label}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    {pm.number}
                  </div>
                </div>
                {pm.default && <Badge variant="green">Default</Badge>}
                <ActionButton variant="ghost" size="xs">
                  Remove
                </ActionButton>
              </div>
            ))}
            <ActionButton
              variant="ghost"
              fullWidth
              style={{ marginTop: "0.5rem" }}
            >
              + Add Payment Method
            </ActionButton>
          </GlassCard>
        </div>
      )}

      {/* ── NOTIFICATIONS ── */}
      {tab === "notif" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "1.5rem",
          }}
        >
          <GlassCard hover={false}>
            <SectionHeader title="Financial Alerts" />
            <SettingRow
              icon="💰"
              label="Contribution Reminders"
              sub="3 days before due"
              right={<Toggle on={nContrib} onChange={setNContrib} />}
            />
            <SettingRow
              icon="🎉"
              label="Payout Notifications"
              sub="When you receive payouts"
              right={<Toggle on={nPayout} onChange={setNPayout} />}
            />
            <SettingRow
              icon="↗️"
              label="Transfer Updates"
              sub="Status on your transfers"
              right={<Toggle on={nTransfer} onChange={setNTransfer} />}
            />
            <SettingRow
              icon="🛡️"
              label="Security Alerts"
              sub="Logins and account changes"
              right={<Toggle on={nSecurity} onChange={setNSecurity} />}
            />
          </GlassCard>
          <GlassCard hover={false}>
            <SectionHeader title="Activity Notifications" />
            <SettingRow
              icon="🔄"
              label="P2P Trade Updates"
              sub="Orders, matches, releases"
              right={<Toggle on={nP2P} onChange={setNP2P} />}
            />
            <SettingRow
              icon="🛍️"
              label="Marketplace Messages"
              sub="Offers and seller replies"
              right={<Toggle on={nMarket} onChange={setNMarket} />}
            />
            <SettingRow
              icon="🎁"
              label="Referral Commissions"
              sub="Earnings from referrals"
              right={<Toggle on={nReferral} onChange={setNReferral} />}
            />
            <SettingRow
              icon="📊"
              label="Weekly Summary"
              sub="Financial digest Monday"
              right={<Toggle on={nWeekly} onChange={setNWeekly} />}
            />
            <SettingRow
              icon="📢"
              label="Product Updates"
              sub="New features & news"
              right={<Toggle on={nMarketing} onChange={setNMarketing} />}
            />
          </GlassCard>
        </div>
      )}

      {/* ── PRIVACY ── */}
      {tab === "privacy" && (
        <GlassCard hover={false}>
          <SectionHeader title="👁️ Privacy Controls" />
          <SettingRow
            icon="👤"
            label="Public Profile"
            sub="Allow others to view your profile"
            right={<Toggle on={profilePublic} onChange={setProfilePublic} />}
          />
          <SettingRow
            icon="🔄"
            label="Show Trade History"
            sub="Visible on your public profile"
            right={<Toggle on={showTrades} onChange={setShowTrades} />}
          />
          <SettingRow
            icon="⭐"
            label="Show Ratings"
            sub="Display your review score publicly"
            right={<Toggle on={showRatings} onChange={setShowRatings} />}
          />
          <SettingRow
            icon="📊"
            label="Analytics Cookies"
            sub="Help improve TaboFins with usage data"
            right={<Toggle on={dataAnalytics} onChange={setDataAnalytics} />}
          />
          <Divider label="Data Management" />
          <ActionButton
            variant="ghost"
            fullWidth
            style={{ marginBottom: "0.6rem" }}
          >
            📥 Download My Data
          </ActionButton>
          <ActionButton
            variant="ghost"
            fullWidth
            style={{ marginBottom: "0.6rem" }}
          >
            🗑️ Clear Activity Log
          </ActionButton>
          <ActionButton
            variant="danger"
            fullWidth
            onClick={() => setShowDeleteModal(true)}
          >
            ⚠️ Delete Account
          </ActionButton>
        </GlassCard>
      )}

      {/* ── WALLET ── */}
      {tab === "wallet" && (
        <GlassCard hover={false}>
          <SectionHeader title="💳 Wallet Preferences" />
          <SettingRow
            icon="🛡️"
            label="Escrow by Default"
            sub="All P2P & marketplace transactions use escrow"
            right={<Toggle on={escrowDefault} onChange={setEscrowDefault} />}
          />
          <SettingRow
            icon="🤖"
            label="Smart Auto-Save"
            sub="Round up transactions and auto-save"
            right={<Toggle on={autoSave} onChange={setAutoSave} />}
          />
          <Divider label="Display Currency" />
          <FormField label="Default Currency">
            <TFSelect
              value={currency}
              onChange={(e) =>
                setCurrency(e.target.value as "XAF" | "NGN" | "USDT")
              }
            >
              <option value="XAF">XAF — Central African Franc</option>
              <option value="NGN">NGN — Nigerian Naira</option>
              <option value="USDT">USDT — Tether</option>
            </TFSelect>
          </FormField>
          <AlertBanner
            type="info"
            message="Changing display currency does not convert your wallet balances. It only affects how amounts are shown."
          />
        </GlassCard>
      )}

      {/* ── APPEARANCE ── */}
      {tab === "appearance" && (
        <GlassCard hover={false}>
          <SectionHeader title="🎨 Appearance" />
          <FormField label="Theme">
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {(["dark", "light"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  style={{
                    flex: 1,
                    padding: "1rem",
                    borderRadius: 14,
                    border:
                      theme === t
                        ? "1px solid rgba(26,108,255,.4)"
                        : "1px solid var(--glass-border)",
                    background:
                      theme === t
                        ? "rgba(26,108,255,.12)"
                        : "rgba(255,255,255,.03)",
                    cursor: "pointer",
                    transition: "all .2s",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>
                    {t === "dark" ? "🌙" : "☀️"}
                  </div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: theme === t ? "#7eb8ff" : "var(--muted)",
                    }}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </div>
                  {t === "dark" && (
                    <div style={{ fontSize: "0.68rem", color: "var(--muted)" }}>
                      Recommended
                    </div>
                  )}
                </button>
              ))}
            </div>
          </FormField>
          <Divider />
          <SettingRow
            icon="📐"
            label="Compact View"
            sub="Reduce spacing for more information density"
            right={<Toggle on={compact} onChange={setCompact} />}
          />
          <div style={{ marginTop: "1rem" }}>
            <FormField label="Timezone">
              <TFSelect
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option value="Africa/Douala">
                  Africa/Douala (WAT +01:00)
                </option>
                <option value="Africa/Lagos">Africa/Lagos (WAT +01:00)</option>
                <option value="Africa/Accra">Africa/Accra (GMT +00:00)</option>
                <option value="Africa/Nairobi">
                  Africa/Nairobi (EAT +03:00)
                </option>
                <option value="Europe/London">
                  Europe/London (GMT +00:00)
                </option>
                <option value="UTC">UTC</option>
              </TFSelect>
            </FormField>
          </div>
        </GlassCard>
      )}

      {/* ── LANGUAGE ── */}
      {tab === "language" && (
        <GlassCard hover={false}>
          <SectionHeader title="🌐 Language & Region" />
          <FormField label="App Language">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {[
                { code: "en", label: "English", flag: "🇬🇧", available: true },
                { code: "fr", label: "Français", flag: "🇫🇷", available: true },
                {
                  code: "pidgin",
                  label: "Pidgin English",
                  flag: "🇨🇲",
                  available: false,
                },
                { code: "oku", label: "Oku", flag: "🇨🇲", available: false },
              ].map((l) => (
                <div
                  key={l.code}
                  onClick={() => l.available && setLanguage(l.code)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.9rem 1rem",
                    borderRadius: 12,
                    border:
                      language === l.code
                        ? "1px solid rgba(26,108,255,.4)"
                        : "1px solid var(--glass-border)",
                    background:
                      language === l.code
                        ? "rgba(26,108,255,.1)"
                        : "rgba(255,255,255,.03)",
                    cursor: l.available ? "pointer" : "not-allowed",
                    transition: "all .2s",
                    opacity: l.available ? 1 : 0.55,
                  }}
                >
                  <span style={{ fontSize: "1.4rem" }}>{l.flag}</span>
                  <span
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      flex: 1,
                    }}
                  >
                    {l.label}
                  </span>
                  {language === l.code ? (
                    <Badge variant="blue">Active</Badge>
                  ) : !l.available ? (
                    <Badge variant="muted">Coming Soon</Badge>
                  ) : null}
                </div>
              ))}
            </div>
          </FormField>
          <p
            style={{
              fontSize: "0.78rem",
              color: "var(--muted)",
              marginTop: "1rem",
              lineHeight: 1.5,
            }}
          >
            Pidgin English and Oku are being developed through community
            contributions. Help translate at translate.tabofins.com.
          </p>
        </GlassCard>
      )}

      {/* ── REFERRAL PREFS ── */}
      {tab === "referral" && (
        <GlassCard hover={false}>
          <SectionHeader
            title="🎁 Referral Preferences"
            action={
              <Link href="/profile/referral">
                <ActionButton variant="primary" size="sm">
                  Full Dashboard →
                </ActionButton>
              </Link>
            }
          />
          <SettingRow
            icon="🔔"
            label="Referral Notifications"
            sub="Alerts when someone uses your code"
            right={<Toggle on={refNotif} onChange={setRefNotif} />}
          />
          <SettingRow
            icon="📤"
            label="Auto-share on Signup"
            sub="Suggest sharing your code after joining"
            right={<Toggle on={autoShare} onChange={setAutoShare} />}
          />
          <Divider label="Your Referral Code" />
          <div
            style={{
              padding: "1rem",
              background: "rgba(26,108,255,.07)",
              border: "1px solid rgba(26,108,255,.18)",
              borderRadius: 12,
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    marginBottom: "0.2rem",
                  }}
                >
                  Your code
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#7eb8ff",
                    letterSpacing: "0.1em",
                  }}
                >
                  {mockUser.referralCode}
                </div>
              </div>
              <ActionButton variant="ghost" size="sm">
                Copy
              </ActionButton>
            </div>
          </div>
          <AlertBanner
            type="info"
            message={`You earn 10% of every transaction fee from users you refer. Currently ${mockUser.totalReferrals} referrals · ${mockUser.referralEarnings.toLocaleString()} XAF earned.`}
          />
        </GlassCard>
      )}

      {/* ── KYC ── */}
      {tab === "kyc" && (
        <GlassCard hover={false}>
          <SectionHeader title="🪪 KYC & Compliance" />
          {[
            {
              label: "Identity Document",
              detail: "National ID · Verified Jun 2025",
              ok: true,
            },
            {
              label: "Selfie Verification",
              detail: "Biometric match 98.4%",
              ok: true,
            },
            {
              label: "Address Proof",
              detail: "Utility bill accepted",
              ok: true,
            },
            { label: "AML Screening", detail: "No flags detected", ok: true },
            { label: "PEP Check", detail: "Clear", ok: true },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                padding: "0.8rem 1rem",
                background: "rgba(0,229,160,.05)",
                border: "1px solid rgba(0,229,160,.12)",
                borderRadius: 12,
                marginBottom: "0.5rem",
              }}
            >
              <span>{item.ok ? "✅" : "❌"}</span>
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
              <Badge variant={item.ok ? "green" : "red"}>
                {item.ok ? "OK" : "Needed"}
              </Badge>
            </div>
          ))}
          <Link href="/kyc">
            <ActionButton
              variant="primary"
              fullWidth
              style={{ marginTop: "0.75rem" }}
            >
              Manage KYC →
            </ActionButton>
          </Link>
        </GlassCard>
      )}

      {/* ── DEVICES & SESSIONS ── */}
      {tab === "devices" && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <GlassCard hover={false}>
            <SectionHeader title="Active Sessions" />
            {DEVICES.map((d, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  padding: "0.9rem 1rem",
                  background: "rgba(255,255,255,.03)",
                  border: `1px solid ${d.current ? "rgba(0,229,160,.25)" : "var(--glass-border)"}`,
                  borderRadius: 12,
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontSize: "1.4rem" }}>{d.icon}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.87rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {d.name}
                    {d.current && <Badge variant="green">This device</Badge>}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    {d.last}
                  </div>
                </div>
                {!d.current && (
                  <ActionButton variant="danger" size="xs">
                    Revoke
                  </ActionButton>
                )}
              </div>
            ))}
            <ActionButton
              variant="danger"
              fullWidth
              style={{ marginTop: "0.75rem" }}
            >
              🚪 Revoke All Other Sessions
            </ActionButton>
          </GlassCard>

          <GlassCard hover={false}>
            <SectionHeader title="Login History" />
            {[
              {
                event: "Login",
                loc: "Douala, CM",
                device: "Chrome",
                time: "Just now",
                success: true,
              },
              {
                event: "Login",
                loc: "Douala, CM",
                device: "iPhone",
                time: "1 hour ago",
                success: true,
              },
              {
                event: "Failed Login",
                loc: "Unknown",
                device: "Chrome",
                time: "2 days ago",
                success: false,
              },
            ].map((e, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.7rem 0",
                  borderBottom:
                    i < 2 ? "1px solid rgba(100,160,255,.06)" : "none",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.84rem",
                    }}
                  >
                    {e.event}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    {e.loc} · {e.device} · {e.time}
                  </div>
                </div>
                <Badge variant={e.success ? "green" : "red"}>
                  {e.success ? "Success" : "Failed"}
                </Badge>
              </div>
            ))}
          </GlassCard>
        </div>
      )}

      {/* ── SUPPORT ── */}
      {tab === "support" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "1.25rem",
          }}
        >
          {[
            {
              icon: "💬",
              label: "Live Chat",
              sub: "Average 4-min response",
              action: "Start Chat",
            },
            {
              icon: "📧",
              label: "Email Support",
              sub: "support@tabofins.com",
              action: "Send Email",
            },
            {
              icon: "📚",
              label: "Help Centre",
              sub: "Guides, FAQs, tutorials",
              action: "Browse",
            },
            {
              icon: "🐛",
              label: "Report a Bug",
              sub: "Help us improve TaboFins",
              action: "Report",
            },
            {
              icon: "💡",
              label: "Feature Request",
              sub: "Suggest improvements",
              action: "Suggest",
            },
            {
              icon: "⚖️",
              label: "Dispute Support",
              sub: "For active trade disputes",
              action: "Open Ticket",
            },
          ].map((item) => (
            <GlassCard key={item.label} hover>
              <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>
                {item.icon}
              </div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  marginBottom: "0.3rem",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                  marginBottom: "1rem",
                }}
              >
                {item.sub}
              </div>
              <ActionButton variant="ghost" size="sm">
                {item.action}
              </ActionButton>
            </GlassCard>
          ))}
        </div>
      )}

      {/* ── ABOUT ── */}
      {tab === "about" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "1.5rem",
          }}
        >
          <GlassCard hover={false} glow="blue">
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: "linear-gradient(135deg,#0a3aff,#00e5a0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Syne",
                  fontWeight: 800,
                  fontSize: 20,
                  color: "#fff",
                  margin: "0 auto 1rem",
                }}
              >
                TFS
              </div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontSize: "1.3rem",
                  fontWeight: 800,
                }}
              >
                TaboFins
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.82rem",
                  marginTop: "0.25rem",
                }}
              >
                v1.0.0-beta
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.78rem",
                  marginTop: "0.5rem",
                }}
              >
                Built for Africa&apos;s financial future 🇨🇲
              </div>
            </div>
            <Divider />
            <StatRow
              items={[
                { label: "Version", value: "1.0.0 Beta" },
                { label: "Build", value: "2025.06.04" },
                { label: "Region", value: "Africa" },
                { label: "Servers", value: "Douala · Lagos" },
              ]}
            />
          </GlassCard>
          <GlassCard hover={false}>
            <SectionHeader title="Legal" />
            {[
              { label: "Privacy Policy", icon: "🔐" },
              { label: "Terms & Conditions", icon: "📋" },
              { label: "KYC & AML Policy", icon: "🪪" },
              { label: "Cookie Policy", icon: "🍪" },
              { label: "Escrow Terms", icon: "🔒" },
              { label: "Community Guidelines", icon: "🤝" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid rgba(100,160,255,.06)",
                  cursor: "pointer",
                }}
              >
                <span>{item.icon}</span>
                <span
                  style={{
                    flex: 1,
                    fontFamily: "Syne",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                  }}
                >
                  {item.label}
                </span>
                <span style={{ color: "var(--muted)" }}>›</span>
              </div>
            ))}
          </GlassCard>
        </div>
      )}

      {/* ── DELETE ACCOUNT MODAL ── */}
      {showDeleteModal && (
        <Modal
          title="⚠️ Delete Account"
          onClose={() => setShowDeleteModal(false)}
        >
          <AlertBanner
            type="error"
            title="This action is permanent"
            message="Deleting your account will permanently erase all your data, wallet balances, Njangi memberships, and transaction history. This cannot be undone."
          />
          <div style={{ marginTop: "1.25rem" }}>
            <FormField label="Type DELETE to confirm">
              <TFInput placeholder="DELETE" />
            </FormField>
            <FormField label="Reason (optional)">
              <TFSelect>
                <option>Privacy concerns</option>
                <option>Switching to another service</option>
                <option>No longer need the account</option>
                <option>Other</option>
              </TFSelect>
            </FormField>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <ActionButton
              variant="ghost"
              onClick={() => setShowDeleteModal(false)}
              fullWidth
            >
              Cancel
            </ActionButton>
            <ActionButton variant="danger" fullWidth>
              Delete My Account
            </ActionButton>
          </div>
        </Modal>
      )}

      {/* ── CHANGE PASSWORD MODAL ── */}
      {showPasswordModal && (
        <Modal
          title="🔑 Change Password"
          onClose={() => setShowPasswordModal(false)}
        >
          <FormField label="Current Password">
            <TFInput type="password" placeholder="••••••••" />
          </FormField>
          <FormField label="New Password">
            <TFInput type="password" placeholder="Create strong password" />
          </FormField>
          <FormField label="Confirm New Password">
            <TFInput type="password" placeholder="Repeat new password" />
          </FormField>
          <AlertBanner
            type="info"
            message="Password must be at least 10 characters and include uppercase, lowercase, a number and a symbol."
          />
          <div
            style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}
          >
            <ActionButton
              variant="ghost"
              onClick={() => setShowPasswordModal(false)}
              fullWidth
            >
              Cancel
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={() => setShowPasswordModal(false)}
              fullWidth
            >
              Update Password ✓
            </ActionButton>
          </div>
        </Modal>
      )}
    </div>
  );
}
