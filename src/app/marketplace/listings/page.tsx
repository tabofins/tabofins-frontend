"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockMarketItems, formatCurrency } from "../../../lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  SectionHeader,
  StatCard,
  Modal,
  ConfirmModal,
} from "../../../components/shared/UI";

export default function MyListingsPage() {
  const router = useRouter();
  const myItems = mockMarketItems.slice(0, 4);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleted, setDeleted] = useState<string[]>([]);

  const visible = myItems.filter((i) => !deleted.includes(i.id));

  return (
    <div>
      <PageHeader
        title="My Listings"
        sub="Manage all your marketplace listings."
        action={
          <div style={{ display: "flex", gap: "0.65rem" }}>
            <Link href="/marketplace">
              <ActionButton variant="ghost">Browse Market</ActionButton>
            </Link>
            <Link href="/marketplace">
              <ActionButton variant="primary">+ New Listing</ActionButton>
            </Link>
          </div>
        }
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          label="Active"
          value={String(visible.length)}
          icon="✅"
          glow="green"
        />
        <StatCard label="Views" value="1,082" icon="👁️" glow="blue" />
        <StatCard label="Inquiries" value="14" icon="💬" glow="gold" />
        <StatCard label="Offers" value="3" icon="💰" />
      </div>

      <GlassCard hover={false}>
        <SectionHeader title="Your Listings" />
        {visible.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2.5rem",
              color: "var(--muted)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
              📦
            </div>
            <div>No listings yet.</div>
          </div>
        ) : (
          visible.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                padding: "1rem 0",
                borderBottom:
                  i < visible.length - 1
                    ? "1px solid rgba(100,160,255,.06)"
                    : "none",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "rgba(26,108,255,.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  flexShrink: 0,
                }}
              >
                {item.mediaEmoji}
              </div>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}
                >
                  <Badge variant={item.condition === "new" ? "green" : "muted"}>
                    {item.condition}
                  </Badge>
                  {item.escrow && <Badge variant="blue">🔒 Escrow</Badge>}
                  <Badge variant="muted">👁️ {item.views}</Badge>
                  <Badge variant="muted">❤️ {item.likes}</Badge>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "var(--gold2)",
                }}
              >
                {formatCurrency(item.price, item.currency)}
              </div>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <ActionButton
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/marketplace/${item.id}`)}
                >
                  View
                </ActionButton>
                <ActionButton variant="ghost" size="sm">
                  Edit
                </ActionButton>
                <ActionButton
                  variant="danger"
                  size="sm"
                  onClick={() => setDeleteTarget(item.id)}
                >
                  Delete
                </ActionButton>
              </div>
            </div>
          ))
        )}
      </GlassCard>

      {deleteTarget && (
        <ConfirmModal
          title="Delete Listing"
          message="Are you sure you want to delete this listing? This action cannot be undone."
          confirmLabel="Yes, Delete"
          cancelLabel="Keep Listing"
          variant="danger"
          icon="🗑️"
          onConfirm={() => {
            setDeleted((d) => [...d, deleteTarget]);
            setDeleteTarget(null);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
