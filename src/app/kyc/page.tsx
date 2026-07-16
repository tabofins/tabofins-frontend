"use client";
import { useState } from "react";
import { mockKYCSteps } from "../../lib/data";
import type { KYCStatus } from "../../lib/data"; // adjust the path if needed

import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  SectionHeader,
  AlertBanner,
  StatRow,
  KYCTracker,
  DropZone,
  Modal,
  FormField,
  TFInput,
  TFSelect,
  ProgressBar,
} from "../../components/shared/UI";

type DocType =
  | "id"
  | "passport"
  | "license"
  | "address"
  | "selfie"
  | "facescan";

const DOC_STATES: Record<
  DocType,
  "completed" | "pending" | "rejected" | "not_started"
> = {
  id: "completed",
  passport: "not_started",
  license: "not_started",
  address: "completed",
  selfie: "completed",
  facescan: "pending",
};

const FACE_SCAN_STEPS = ["Front", "Left", "Right", "Up", "Down"];

export default function KYCPage() {
  const [activeUpload, setActiveUpload] = useState<DocType | null>(null);
  const [faceScanStep, setFaceScanStep] = useState(0);
  const [faceScanDone, setFaceScanDone] = useState(false);
  const [showResubmit, setShowResubmit] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const overallStatus = "verified" as "verified" | "pending" | "rejected"; // mock — could be "pending" | "rejected" | "verified"
  const completedSteps = mockKYCSteps.filter(
    (s) => s.status === "completed" || s.status === "verified",
  ).length;
  const progressPct = Math.round((completedSteps / mockKYCSteps.length) * 100);

  const STATUS_META = {
    verified: {
      label: "Identity Verified",
      icon: "✅",
      color: "var(--green)",
      badge: "green" as const,
    },
    pending: {
      label: "Under Review",
      icon: "⏳",
      color: "var(--gold2)",
      badge: "gold" as const,
    },
    rejected: {
      label: "Verification Failed",
      icon: "❌",
      color: "#ff8080",
      badge: "red" as const,
    },
  };
  const meta = STATUS_META[overallStatus];

  return (
    <div>
      <PageHeader
        title="Identity Verification"
        sub="Complete KYC to unlock all TaboFins features."
      />

      {/* Overall status hero card */}
      <GlassCard
        hover={false}
        glow={
          overallStatus === "verified"
            ? "green"
            : overallStatus === "rejected"
              ? "red"
              : "gold"
        }
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
              <span style={{ fontSize: "2.5rem" }}>{meta.icon}</span>
              <div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: meta.color,
                  }}
                >
                  {meta.label}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    marginTop: "0.2rem",
                  }}
                >
                  {overallStatus === "verified"
                    ? "Full platform access granted. Submitted 20 May 2025."
                    : overallStatus === "pending"
                      ? "Estimated approval: 30 minutes during business hours."
                      : "One or more documents were rejected. Please resubmit."}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
              <Badge variant={meta.badge}>{meta.label}</Badge>
              {overallStatus === "verified" && (
                <Badge variant="blue">🔒 Full Access</Badge>
              )}
              {overallStatus === "rejected" && (
                <Badge variant="muted">⏱ Avg 30 min</Badge>
              )}
            </div>
          </div>

          {/* Progress circle */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                position: "relative",
                width: 90,
                height: 90,
                margin: "0 auto",
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
                  stroke={meta.color}
                  strokeWidth="2.5"
                  strokeDasharray={`${progressPct} ${100 - progressPct}`}
                  strokeLinecap="round"
                />
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
                    fontSize: "1.1rem",
                    color: meta.color,
                  }}
                >
                  {progressPct}%
                </div>
                <div style={{ fontSize: "0.58rem", color: "var(--muted)" }}>
                  complete
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--muted)",
                marginTop: "0.4rem",
              }}
            >
              {completedSteps}/{mockKYCSteps.length} steps done
            </div>
          </div>
        </div>

        {/* Rejected message */}
        {overallStatus === "rejected" && (
          <div
            style={{
              marginTop: "1.25rem",
              padding: "1rem",
              background: "rgba(255,107,107,.08)",
              border: "1px solid rgba(255,107,107,.22)",
              borderRadius: 12,
            }}
          >
            <div
              style={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "#ff8080",
                marginBottom: "0.4rem",
              }}
            >
              ❌ Rejection Reason
            </div>
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--muted)",
                lineHeight: 1.55,
              }}
            >
              Your selfie image was blurry and the ID document was partially
              obscured. Please retake your selfie in a well-lit area and ensure
              your ID is fully visible alongside your face.
            </p>
            <ActionButton
              variant="danger"
              size="sm"
              style={{ marginTop: "0.75rem" }}
              onClick={() => setShowResubmit(true)}
            >
              Resubmit Documents
            </ActionButton>
          </div>
        )}
      </GlassCard>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Left — checklist + timeline */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Verification checklist */}
          <GlassCard hover={false}>
            <SectionHeader
              title="Verification Checklist"
              sub="Complete all steps to gain full access"
            />
            <KYCTracker
              steps={mockKYCSteps.map((s) => ({
                id: s.id,
                label: s.label,
                status: s.status === "verified" ? "completed" : s.status,
                note: s.updatedAt
                  ? `Completed ${new Date(s.updatedAt).toLocaleDateString()}`
                  : undefined,
              }))}
            />
          </GlassCard>

          {/* Security notice */}
          <GlassCard hover={false}>
            <SectionHeader title="🔒 Security Notice" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {[
                {
                  icon: "🛡️",
                  text: "Your documents are encrypted with AES-256 and never stored unencrypted.",
                },
                {
                  icon: "👁️",
                  text: "Documents are reviewed only by certified TaboFins verification agents.",
                },
                {
                  icon: "🗑️",
                  text: "Raw document images are deleted after verification is complete.",
                },
                {
                  icon: "📜",
                  text: "Verification is required by financial regulations in all markets we serve.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    padding: "0.75rem",
                    background: "rgba(255,255,255,.03)",
                    borderRadius: 10,
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <span style={{ fontSize: "1rem", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Estimated times */}
          <GlassCard hover={false} glow="blue">
            <SectionHeader title="⏱ Estimated Approval Times" />
            <StatRow
              items={[
                {
                  label: "Standard",
                  value: "15–30 min",
                  color: "var(--green)",
                },
                {
                  label: "Peak Hours",
                  value: "1–2 hours",
                  color: "var(--gold2)",
                },
                { label: "Weekend", value: "2–4 hours", color: "var(--muted)" },
                {
                  label: "Complex Case",
                  value: "Up to 24h",
                  color: "var(--muted)",
                },
              ]}
            />
          </GlassCard>
        </div>

        {/* Right — document uploads */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Government ID */}
          <GlassCard
            hover={false}
            glow={DOC_STATES.id === "completed" ? "green" : "blue"}
          >
            <SectionHeader
              title="Government ID"
              action={
                <Badge
                  variant={
                    DOC_STATES.id === "completed"
                      ? "green"
                      : DOC_STATES.id === "rejected"
                        ? "red"
                        : "muted"
                  }
                >
                  {DOC_STATES.id}
                </Badge>
              }
            />
            <FormField label="ID Type">
              <TFSelect>
                <option>National Identity Card</option>
                <option>International Passport</option>
                <option>Driver&apos;s License</option>
              </TFSelect>
            </FormField>
            {DOC_STATES.id === "completed" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem",
                  background: "rgba(0,229,160,.07)",
                  border: "1px solid rgba(0,229,160,.2)",
                  borderRadius: 12,
                }}
              >
                <span style={{ fontSize: "2rem" }}>🪪</span>
                <div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "var(--green)",
                    }}
                  >
                    National ID uploaded ✓
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    Verified 20 May 2025 · ID: CM-XXXXXXXXXXX
                  </div>
                </div>
              </div>
            ) : (
              <>
                <DropZone
                  label="Upload Front of ID"
                  hint="JPG, PNG or PDF · Max 5MB"
                  icon="🪪"
                />
                <div style={{ margin: "0.5rem 0" }} />
                <DropZone
                  label="Upload Back of ID"
                  hint="JPG, PNG or PDF · Max 5MB"
                  icon="🪪"
                />
              </>
            )}
          </GlassCard>

          {/* Selfie with ID */}
          <GlassCard
            hover={false}
            glow={DOC_STATES.selfie === "completed" ? "green" : "blue"}
          >
            <SectionHeader
              title="Selfie with ID"
              action={
                <Badge
                  variant={
                    DOC_STATES.selfie === "completed" ? "green" : "muted"
                  }
                >
                  {DOC_STATES.selfie}
                </Badge>
              }
            />
            <AlertBanner
              type="info"
              message="Hold your ID card beside your face so both your face and the ID photo are clearly visible in the same photo."
            />
            {DOC_STATES.selfie === "completed" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem",
                  background: "rgba(0,229,160,.07)",
                  border: "1px solid rgba(0,229,160,.2)",
                  borderRadius: 12,
                  marginTop: "0.75rem",
                }}
              >
                <span style={{ fontSize: "2rem" }}>🤳</span>
                <div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "var(--green)",
                    }}
                  >
                    Selfie uploaded ✓
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    Biometric match: 98.4% · Verified 20 May 2025
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: "0.75rem" }}>
                <DropZone
                  label="Upload Selfie with ID"
                  hint="Clear, well-lit photo · Face and ID both visible · Max 8MB"
                  icon="🤳"
                />
              </div>
            )}
          </GlassCard>

          {/* Face Scan */}
          <GlassCard hover={false} glow={faceScanDone ? "green" : "blue"}>
            <SectionHeader
              title="Face Scan (Liveness Check)"
              action={
                <Badge variant={faceScanDone ? "green" : "gold"}>
                  {faceScanDone ? "completed" : "pending"}
                </Badge>
              }
            />
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--muted)",
                marginBottom: "1rem",
                lineHeight: 1.55,
              }}
            >
              Turn your head in each direction as indicated. This confirms you
              are a real person and matches your ID photo.
            </p>
            {!faceScanDone ? (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  {FACE_SCAN_STEPS.map((s, i) => (
                    <div key={s} style={{ flex: 1, textAlign: "center" }}>
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "1",
                          borderRadius: 10,
                          background:
                            i < faceScanStep
                              ? "rgba(0,229,160,.15)"
                              : i === faceScanStep
                                ? "rgba(26,108,255,.15)"
                                : "rgba(255,255,255,.04)",
                          border: `1px solid ${i < faceScanStep ? "rgba(0,229,160,.3)" : i === faceScanStep ? "rgba(26,108,255,.3)" : "var(--glass-border)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.3rem",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {i < faceScanStep
                          ? "✓"
                          : i === faceScanStep
                            ? "👤"
                            : "○"}
                      </div>
                      <div
                        style={{
                          fontSize: "0.62rem",
                          color:
                            i <= faceScanStep ? "var(--text)" : "var(--muted)",
                        }}
                      >
                        {s}
                      </div>
                    </div>
                  ))}
                </div>
                <ProgressBar
                  value={(faceScanStep / FACE_SCAN_STEPS.length) * 100}
                  color="blue"
                  height={4}
                />
                <div style={{ marginTop: "0.75rem" }}>
                  {faceScanStep < FACE_SCAN_STEPS.length ? (
                    <ActionButton
                      variant="primary"
                      fullWidth
                      onClick={() => {
                        if (faceScanStep < FACE_SCAN_STEPS.length - 1)
                          setFaceScanStep((s) => s + 1);
                        else setFaceScanDone(true);
                      }}
                    >
                      {faceScanStep === 0
                        ? "Start Face Scan"
                        : `Captured ${FACE_SCAN_STEPS[faceScanStep - 1]} — Next: ${FACE_SCAN_STEPS[faceScanStep]}`}
                    </ActionButton>
                  ) : null}
                </div>
              </>
            ) : (
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(0,229,160,.07)",
                  border: "1px solid rgba(0,229,160,.2)",
                  borderRadius: 12,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  ✅
                </div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    color: "var(--green)",
                  }}
                >
                  Face scan complete
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    marginTop: "0.2rem",
                  }}
                >
                  All 5 angles captured successfully
                </div>
              </div>
            )}
          </GlassCard>

          {/* Proof of Address */}
          <GlassCard
            hover={false}
            glow={DOC_STATES.address === "completed" ? "green" : "blue"}
          >
            <SectionHeader
              title="Proof of Address"
              action={
                <Badge
                  variant={
                    DOC_STATES.address === "completed" ? "green" : "muted"
                  }
                >
                  {DOC_STATES.address}
                </Badge>
              }
            />
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--muted)",
                marginBottom: "0.85rem",
                lineHeight: 1.5,
              }}
            >
              Accepted: utility bill, bank statement, or official government
              letter. Must be dated within the last 3 months.
            </p>
            {DOC_STATES.address === "completed" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem",
                  background: "rgba(0,229,160,.07)",
                  border: "1px solid rgba(0,229,160,.2)",
                  borderRadius: 12,
                }}
              >
                <span style={{ fontSize: "2rem" }}>📄</span>
                <div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "var(--green)",
                    }}
                  >
                    Utility bill uploaded ✓
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    Akwa, Douala, Cameroon · April 2025
                  </div>
                </div>
              </div>
            ) : (
              <DropZone
                label="Upload Proof of Address"
                hint="Utility bill, bank statement · Dated within 3 months · Max 5MB"
                icon="📄"
              />
            )}
          </GlassCard>

          {/* Upload history */}
          <GlassCard hover={false}>
            <SectionHeader
              title="Upload History"
              action={
                <ActionButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(true)}
                >
                  View All
                </ActionButton>
              }
            />
            {[
              {
                doc: "National ID (Front)",
                date: "20 May 2025 11:00",
                status: "Verified",
              },
              {
                doc: "Selfie with ID",
                date: "20 May 2025 11:02",
                status: "Verified",
              },
              {
                doc: "Utility Bill",
                date: "20 May 2025 11:10",
                status: "Verified",
              },
            ].map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.65rem 0",
                  borderBottom:
                    i < 2 ? "1px solid rgba(100,160,255,.06)" : "none",
                  fontSize: "0.82rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Syne",
                      fontWeight: 600,
                      marginBottom: "0.15rem",
                    }}
                  >
                    {h.doc}
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: "0.72rem" }}>
                    {h.date}
                  </div>
                </div>
                <Badge variant="green">{h.status}</Badge>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>

      {/* Resubmit Modal */}
      {showResubmit && (
        <Modal
          title="📤 Resubmit Documents"
          onClose={() => setShowResubmit(false)}
        >
          <AlertBanner
            type="warning"
            title="What went wrong"
            message="Your selfie was blurry and the ID document was partially obscured. Please follow the tips below."
          />
          <div
            style={{
              margin: "1rem 0",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {[
              "Use a well-lit room — avoid backlighting",
              "Hold your ID steady next to your face",
              "Ensure both your face and ID text are clearly readable",
              "Use your phone camera (not a screen recording)",
            ].map((tip) => (
              <div
                key={tip}
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                }}
              >
                <span>💡</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
          <DropZone
            label="Upload New Selfie with ID"
            hint="Clear, well-lit · Both face and ID visible"
            icon="🤳"
          />
          <div style={{ marginTop: "0.75rem" }} />
          <DropZone
            label="Upload New ID Front"
            hint="All corners visible, no glare"
            icon="🪪"
          />
          <ActionButton
            variant="primary"
            fullWidth
            style={{ marginTop: "1rem" }}
            onClick={() => setShowResubmit(false)}
          >
            Submit for Review ✓
          </ActionButton>
        </Modal>
      )}
    </div>
  );
}
