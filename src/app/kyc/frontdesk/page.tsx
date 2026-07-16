"use client";
import { useState } from "react";
import {
  mockKYCQueue,
  mockFrontDeskAgents,
  mockAdminStats,
  KYCDoc,
  timeAgo,
} from "../../../lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  SectionHeader,
  StatCard,
  Modal,
  FormField,
  TFTextarea,
  TFSelect,
  SearchInput,
  AlertBanner,
  StatRow,
  AvatarStack,
} from "../../../components/shared/UI";
import { Avatar } from "../../../components/shared/AuthenticatedLayout";

type Filter = "all" | "pending" | "approved" | "rejected";

const RISK_LABEL: Record<
  number,
  { label: string; variant: "green" | "gold" | "red" }
> = {
  0: { label: "Low Risk", variant: "green" },
  1: { label: "Medium Risk", variant: "gold" },
  2: { label: "High Risk", variant: "red" },
};
function riskTier(score: number): 0 | 1 | 2 {
  if (score < 10) return 0;
  if (score < 20) return 1;
  return 2;
}

function PriorityBadge({ submittedAt }: { submittedAt: string }) {
  const hours = (Date.now() - new Date(submittedAt).getTime()) / 3_600_000;
  if (hours > 12) return <Badge variant="red">🔴 Urgent</Badge>;
  if (hours > 4) return <Badge variant="orange">🟡 High</Badge>;
  return <Badge variant="green">🟢 Normal</Badge>;
}

export default function FrontDeskPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [preview, setPreview] = useState<KYCDoc | null>(null);
  const [rejectModal, setRejectModal] = useState<KYCDoc | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectType, setRejectType] = useState("blurry_id");
  const [localQueue, setLocalQueue] = useState<KYCDoc[]>(mockKYCQueue);

  const filtered = localQueue.filter((doc) => {
    const matchSearch =
      doc.userName.toLowerCase().includes(search.toLowerCase()) ||
      doc.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      doc.country.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || doc.status === filter;
    return matchSearch && matchFilter;
  });

  function approve(id: string) {
    setLocalQueue((q) =>
      q.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "approved" as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: "Agent Kalu",
            }
          : d,
      ),
    );
    setPreview(null);
  }

  function reject(id: string) {
    setLocalQueue((q) =>
      q.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "rejected" as const,
              rejectReason,
              reviewedAt: new Date().toISOString(),
              reviewedBy: "Agent Kalu",
            }
          : d,
      ),
    );
    setRejectModal(null);
    setPreview(null);
    setRejectReason("");
  }

  const pending = localQueue.filter((d) => d.status === "pending").length;
  const approved = localQueue.filter((d) => d.status === "approved").length;
  const rejected = localQueue.filter((d) => d.status === "rejected").length;

  return (
    <div>
      <PageHeader
        title="KYC Front Desk"
        sub="Review and verify identity submissions from TaboFins users."
      />

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          label="Pending Review"
          value={String(pending)}
          icon="⏳"
          glow="gold"
        />
        <StatCard
          label="Approved Today"
          value={String(approved)}
          icon="✅"
          glow="green"
        />
        <StatCard
          label="Rejected Today"
          value={String(rejected)}
          icon="❌"
          glow="red"
        />
        <StatCard
          label="Total Users"
          value={String(mockAdminStats.totalUsers.toLocaleString())}
          icon="👥"
          glow="blue"
        />
      </div>

      {/* Agent status */}
      <GlassCard hover={false} style={{ marginBottom: "2rem" }}>
        <SectionHeader title="On-Duty Agents" />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {mockFrontDeskAgents.map((agent) => (
            <div
              key={agent.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,.03)",
                borderRadius: 12,
                border: "1px solid var(--glass-border)",
                flex: 1,
                minWidth: 200,
              }}
            >
              <div style={{ position: "relative" }}>
                <Avatar initials={agent.avatar} size={36} />
                {agent.onDuty && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 9,
                      height: 9,
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
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  {agent.name}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
                  {agent.reviewed} reviewed · avg {agent.avgReviewTime}
                </div>
              </div>
              <Badge variant={agent.onDuty ? "green" : "muted"}>
                {agent.onDuty ? "On Duty" : "Off"}
              </Badge>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Queue */}
      <GlassCard hover={false}>
        <SectionHeader
          title="Verification Queue"
          sub={`${filtered.length} submission${filtered.length !== 1 ? "s" : ""}`}
        />

        {/* Search + filter */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search name, email, country…"
            style={{ flex: 1, minWidth: 200 }}
          />
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {(["all", "pending", "approved", "rejected"] as Filter[]).map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "0.42rem 0.85rem",
                    borderRadius: 8,
                    border:
                      filter === f
                        ? "1px solid rgba(26,108,255,.4)"
                        : "1px solid var(--glass-border)",
                    background:
                      filter === f ? "rgba(26,108,255,.15)" : "transparent",
                    color: filter === f ? "#7eb8ff" : "var(--muted)",
                    fontFamily: "Syne",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {f}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2.5rem",
              color: "var(--muted)",
            }}
          >
            No submissions match your filters.
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {filtered.map((doc) => {
              const tier = riskTier(doc.riskScore);
              const risk = RISK_LABEL[tier];
              return (
                <div
                  key={doc.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    background: "rgba(255,255,255,.03)",
                    borderRadius: 14,
                    border: "1px solid var(--glass-border)",
                    flexWrap: "wrap",
                    transition: "all .2s",
                    cursor: "pointer",
                  }}
                  onClick={() => setPreview(doc)}
                  onMouseOver={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(26,108,255,.35)")
                  }
                  onMouseOut={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = "")
                  }
                >
                  <Avatar initials={doc.userAvatar} size={40} />
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div
                      style={{
                        fontFamily: "Syne",
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {doc.userName}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                      {doc.userEmail} · {doc.country}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <Badge
                      variant={
                        doc.status === "approved"
                          ? "green"
                          : doc.status === "rejected"
                            ? "red"
                            : "gold"
                      }
                    >
                      {doc.status}
                    </Badge>
                    <Badge variant={risk.variant}>{risk.label}</Badge>
                    <PriorityBadge submittedAt={doc.submittedAt} />
                    <span
                      style={{ fontSize: "0.72rem", color: "var(--muted)" }}
                    >
                      {timeAgo(doc.submittedAt)}
                    </span>
                  </div>
                  {doc.status === "pending" && (
                    <div
                      style={{ display: "flex", gap: "0.5rem" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ActionButton
                        variant="green"
                        size="sm"
                        onClick={() => approve(doc.id)}
                      >
                        ✓ Approve
                      </ActionButton>
                      <ActionButton
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setRejectModal(doc);
                          setPreview(null);
                        }}
                      >
                        ✕ Reject
                      </ActionButton>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </GlassCard>

      {/* Applicant Preview Modal */}
      {preview && (
        <Modal
          title="Applicant Review"
          onClose={() => setPreview(null)}
          maxWidth={560}
          subtitle={`Submitted ${timeAgo(preview.submittedAt)}`}
        >
          {/* Header */}
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
            <Avatar initials={preview.userAvatar} size={52} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                }}
              >
                {preview.userName}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                {preview.userEmail}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  marginTop: "0.15rem",
                }}
              >
                {preview.userPhone} · {preview.country}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
                alignItems: "flex-end",
              }}
            >
              <Badge
                variant={
                  preview.status === "approved"
                    ? "green"
                    : preview.status === "rejected"
                      ? "red"
                      : "gold"
                }
              >
                {preview.status}
              </Badge>
              <Badge variant={RISK_LABEL[riskTier(preview.riskScore)].variant}>
                {RISK_LABEL[riskTier(preview.riskScore)].label}
              </Badge>
              <PriorityBadge submittedAt={preview.submittedAt} />
            </div>
          </div>

          {/* Verification score */}
          <div
            style={{
              padding: "0.9rem 1rem",
              background: "rgba(26,108,255,.07)",
              border: "1px solid rgba(26,108,255,.18)",
              borderRadius: 12,
              marginBottom: "1.25rem",
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
                  fontWeight: 600,
                  fontSize: "0.83rem",
                }}
              >
                Verification Score
              </span>
              <span
                style={{
                  fontFamily: "Syne",
                  fontWeight: 800,
                  color:
                    preview.riskScore < 10
                      ? "var(--green)"
                      : preview.riskScore < 20
                        ? "var(--gold2)"
                        : "#ff8080",
                }}
              >
                {100 - preview.riskScore}/100
              </span>
            </div>
            <div
              style={{
                height: 6,
                background: "rgba(255,255,255,.08)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${100 - preview.riskScore}%`,
                  background:
                    preview.riskScore < 10
                      ? "var(--green)"
                      : preview.riskScore < 20
                        ? "var(--gold2)"
                        : "#ff8080",
                  borderRadius: 3,
                }}
              />
            </div>
          </div>

          {/* Document details */}
          <StatRow
            items={[
              { label: "ID Type", value: preview.idType },
              { label: "Country", value: preview.country },
              { label: "Address", value: preview.address },
              {
                label: "Risk Score",
                value: String(preview.riskScore),
                color:
                  preview.riskScore < 10
                    ? "var(--green)"
                    : preview.riskScore < 20
                      ? "var(--gold2)"
                      : "#ff8080",
              },
            ]}
          />

          {/* Document previews */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
              margin: "1.25rem 0",
            }}
          >
            {[
              { label: "ID Front", emoji: preview.idFrontEmoji },
              { label: "Selfie", emoji: preview.selfieEmoji },
            ].map((doc) => (
              <div
                key={doc.label}
                style={{
                  padding: "1.5rem",
                  background: "rgba(26,108,255,.07)",
                  border: "1px solid rgba(26,108,255,.18)",
                  borderRadius: 14,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                  {doc.emoji}
                </div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                  }}
                >
                  {doc.label}
                </div>
                <ActionButton
                  variant="ghost"
                  size="xs"
                  style={{ marginTop: "0.5rem" }}
                >
                  Preview
                </ActionButton>
              </div>
            ))}
          </div>

          {preview.rejectReason && (
            <AlertBanner
              type="error"
              title="Previous Rejection Reason"
              message={preview.rejectReason}
            />
          )}
          {preview.reviewedBy && (
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginBottom: "1rem",
              }}
            >
              Reviewed by {preview.reviewedBy} on{" "}
              {preview.reviewedAt
                ? new Date(preview.reviewedAt).toLocaleString()
                : "—"}
            </div>
          )}

          {/* Actions */}
          {preview.status === "pending" && (
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <ActionButton
                variant="ghost"
                onClick={() => setPreview(null)}
                fullWidth
              >
                Close
              </ActionButton>
              <ActionButton
                variant="danger"
                onClick={() => {
                  setRejectModal(preview);
                  setPreview(null);
                }}
                fullWidth
              >
                ✕ Reject
              </ActionButton>
              <ActionButton
                variant="green"
                onClick={() => approve(preview.id)}
                fullWidth
              >
                ✓ Approve
              </ActionButton>
            </div>
          )}
          {preview.status !== "pending" && (
            <ActionButton
              variant="ghost"
              onClick={() => setPreview(null)}
              fullWidth
            >
              Close
            </ActionButton>
          )}
        </Modal>
      )}

      {/* Reject Modal */}
      {rejectModal && (
        <Modal
          title="✕ Reject KYC Submission"
          onClose={() => setRejectModal(null)}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
              padding: "0.85rem",
              background: "rgba(255,107,107,.06)",
              borderRadius: 12,
              border: "1px solid rgba(255,107,107,.18)",
            }}
          >
            <Avatar initials={rejectModal.userAvatar} size={36} />
            <div>
              <div style={{ fontFamily: "Syne", fontWeight: 700 }}>
                {rejectModal.userName}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                {rejectModal.userEmail}
              </div>
            </div>
          </div>
          <FormField label="Rejection Reason (Category)">
            <TFSelect
              value={rejectType}
              onChange={(e) => setRejectType(e.target.value)}
            >
              <option value="blurry_id">
                ID image is blurry or unreadable
              </option>
              <option value="expired_id">ID document has expired</option>
              <option value="selfie_mismatch">
                Selfie does not match ID photo
              </option>
              <option value="partial_id">
                ID partially obscured or cropped
              </option>
              <option value="wrong_doc">Wrong document type submitted</option>
              <option value="suspected_fraud">Suspected document fraud</option>
              <option value="address_mismatch">
                Address does not match records
              </option>
              <option value="other">Other (specify below)</option>
            </TFSelect>
          </FormField>
          <FormField label="Detailed Reason for User" required>
            <TFTextarea
              placeholder="Explain what the user needs to fix and how to resubmit correctly…"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              style={{ minHeight: 100 }}
            />
          </FormField>
          <AlertBanner
            type="warning"
            message="The user will receive this rejection reason via notification and email, and will be able to resubmit."
          />
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            <ActionButton
              variant="ghost"
              onClick={() => setRejectModal(null)}
              fullWidth
            >
              Cancel
            </ActionButton>
            <ActionButton
              variant="danger"
              onClick={() => reject(rejectModal.id)}
              fullWidth
              disabled={!rejectReason.trim()}
            >
              Confirm Rejection
            </ActionButton>
          </div>
        </Modal>
      )}
    </div>
  );
}
