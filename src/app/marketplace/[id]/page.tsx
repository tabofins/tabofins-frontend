"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockMarketItems, formatCurrency } from "../../../lib/data";
import {
  GlassCard,
  ActionButton,
  Badge,
  SectionHeader,
  AlertBanner,
  RatingStars,
  Modal,
  FormField,
  TFInput,
  TFSelect,
  TFTextarea,
  InfoRow,
  StatRow,
} from "../../../components/shared/UI";
import { Avatar } from "../../../components/shared/AuthenticatedLayout";
import ChatPanel from "../../../components/shared/ChatPanel";

export default function MarketItemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const item =
    mockMarketItems.find((i) => i.id === params.id) ?? mockMarketItems[0];
  const related = mockMarketItems
    .filter((i) => i.id !== item.id && i.category === item.category)
    .slice(0, 3);

  const [liked, setLiked] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [offerSent, setOfferSent] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");

  return (
    <div>
      <Link
        href="/marketplace"
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
        ← Back to Marketplace
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "1.75rem",
        }}
      >
        {/* Left — image + details */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {/* Main image */}
          <GlassCard hover={false} style={{ padding: 0, overflow: "hidden" }}>
            <div
              style={{
                height: 280,
                background:
                  "linear-gradient(135deg,rgba(10,30,90,.7),rgba(5,15,50,.9))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "6rem",
                position: "relative",
              }}
            >
              {item.mediaEmoji}
              {item.mediaType === "video" && (
                <div style={{ position: "absolute", bottom: 16, right: 16 }}>
                  <Badge variant="blue">🎥 Video listing</Badge>
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  display: "flex",
                  gap: "0.4rem",
                }}
              >
                {item.isFeatured && <Badge variant="gold">⭐ Featured</Badge>}
                {item.escrow && <Badge variant="green">🔒 Escrow</Badge>}
              </div>
            </div>
            {/* Thumbnail strip */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,.02)",
              }}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 8,
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid var(--glass-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    cursor: "pointer",
                  }}
                >
                  {item.mediaEmoji}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Seller profile */}
          <GlassCard hover={false} glow="blue">
            <SectionHeader title="Seller Profile" />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                marginBottom: "1.1rem",
              }}
            >
              <Avatar initials={item.sellerAvatar} size={48} />
              <div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  {item.seller}
                </div>
                <RatingStars rating={item.sellerRating} />
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    marginTop: "0.2rem",
                  }}
                >
                  {item.sellerSales} sales · {item.location}
                </div>
              </div>
            </div>
            <StatRow
              items={[
                {
                  label: "Rating",
                  value: `${item.sellerRating}/5.0`,
                  color: "var(--gold2)",
                  icon: "⭐",
                },
                {
                  label: "Total Sales",
                  value: String(item.sellerSales),
                  color: "var(--green)",
                },
                { label: "Location", value: item.location },
                { label: "Country", value: item.country },
              ]}
            />
          </GlassCard>

          {/* Related items */}
          {related.length > 0 && (
            <GlassCard hover={false}>
              <SectionHeader title="Related Listings" />
              {related.map((r, i) => (
                <div
                  key={r.id}
                  onClick={() => router.push(`/marketplace/${r.id}`)}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    padding: "0.7rem 0",
                    borderBottom:
                      i < related.length - 1
                        ? "1px solid rgba(100,160,255,.06)"
                        : "none",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "rgba(26,108,255,.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                      flexShrink: 0,
                    }}
                  >
                    {r.mediaEmoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "Syne",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {r.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "Syne",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        color: "var(--gold2)",
                      }}
                    >
                      {formatCurrency(r.price, r.currency)}
                    </div>
                  </div>
                </div>
              ))}
            </GlassCard>
          )}
        </div>

        {/* Right — details + chat */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {/* Main info */}
          <GlassCard hover={false}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <h1
                style={{
                  fontFamily: "Syne",
                  fontSize: "clamp(1.1rem,2.5vw,1.4rem)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  flex: 1,
                }}
              >
                {item.title}
              </h1>
              <button
                onClick={() => setLiked(!liked)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                }}
              >
                {liked ? "❤️" : "🤍"}
              </button>
            </div>

            <div
              style={{
                fontFamily: "Syne",
                fontSize: "2rem",
                fontWeight: 800,
                color: "var(--gold2)",
                marginBottom: "0.5rem",
              }}
            >
              {formatCurrency(item.price, item.currency)}
              {item.negotiable && (
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    fontWeight: 400,
                    marginLeft: "0.5rem",
                  }}
                >
                  · Negotiable
                </span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginBottom: "1.25rem",
              }}
            >
              <Badge variant={item.condition === "new" ? "green" : "muted"}>
                {item.condition}
              </Badge>
              {item.escrow && <Badge variant="blue">🔒 Escrow</Badge>}
              {item.isFeatured && <Badge variant="gold">⭐ Featured</Badge>}
              <Badge variant="muted">📍 {item.location}</Badge>
              <Badge variant="muted">👁️ {item.views} views</Badge>
              <Badge variant="muted">❤️ {item.likes + (liked ? 1 : 0)}</Badge>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  marginBottom: "0.6rem",
                }}
              >
                Description
              </div>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.85rem",
                  lineHeight: 1.65,
                }}
              >
                {item.description}
              </p>
            </div>

            {item.tags.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                  marginBottom: "1.25rem",
                }}
              >
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--electric)",
                      background: "rgba(26,108,255,.1)",
                      border: "1px solid rgba(26,108,255,.2)",
                      borderRadius: 6,
                      padding: "0.15rem 0.5rem",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <InfoRow label="Category" value={item.category} />
            <InfoRow label="Condition" value={item.condition} />
            <InfoRow label="Stock" value={`${item.stock} available`} accent />
            <InfoRow
              label="Listed"
              value={new Date(item.createdAt).toLocaleDateString()}
              last
            />

            {item.escrow && (
              <AlertBanner
                type="success"
                title="Escrow Protected"
                message="Payment is held securely until you confirm receipt of the item. Safe to buy."
              />
            )}

            <div
              style={{
                display: "flex",
                gap: "0.65rem",
                marginTop: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              <ActionButton
                variant="primary"
                fullWidth
                onClick={() => setShowChat(true)}
              >
                💬 Chat with Seller
              </ActionButton>
              <ActionButton
                variant="gold"
                fullWidth
                onClick={() => setShowOffer(true)}
              >
                💰 Make an Offer
              </ActionButton>
            </div>
            <button
              onClick={() => setShowReport(true)}
              style={{
                width: "100%",
                marginTop: "0.6rem",
                background: "none",
                border: "none",
                color: "var(--muted)",
                fontSize: "0.75rem",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              🚩 Report this listing
            </button>
          </GlassCard>

          {/* Chat panel */}
          {showChat && (
            <GlassCard hover={false} noPad style={{ overflow: "hidden" }}>
              <ChatPanel
                embedded
                partnerName={item.seller}
                partnerAvatar={item.sellerAvatar}
                subtitle={`Re: ${item.title}`}
                onClose={() => setShowChat(false)}
              />
            </GlassCard>
          )}
          {!showChat && (
            <button
              onClick={() => setShowChat(true)}
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: 14,
                border: "1px dashed rgba(26,108,255,.3)",
                background: "transparent",
                color: "var(--electric)",
                fontFamily: "Syne",
                fontWeight: 600,
                fontSize: "0.88rem",
                cursor: "pointer",
              }}
            >
              💬 Open Chat with {item.seller}
            </button>
          )}
        </div>
      </div>

      {/* Offer Modal */}
      {showOffer && (
        <Modal title="💰 Make an Offer" onClose={() => setShowOffer(false)}>
          {!offerSent ? (
            <>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "var(--gold2)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Listed at {formatCurrency(item.price, item.currency)}
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                  Enter your offer price below
                </div>
              </div>
              <FormField label="Your Offer Amount" required>
                <TFInput
                  type="number"
                  placeholder={String(Math.round(item.price * 0.9))}
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  icon="💰"
                />
              </FormField>
              <FormField label="Message to Seller">
                <TFTextarea
                  placeholder="Explain your offer or ask a question…"
                  style={{ minHeight: 70 }}
                />
              </FormField>
              {item.escrow && (
                <AlertBanner
                  type="success"
                  message="If accepted, payment will be secured in escrow until you confirm receipt."
                />
              )}
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginTop: "0.75rem",
                }}
              >
                <ActionButton
                  variant="ghost"
                  onClick={() => setShowOffer(false)}
                  fullWidth
                >
                  Cancel
                </ActionButton>
                <ActionButton
                  variant="gold"
                  onClick={() => setOfferSent(true)}
                  fullWidth
                  disabled={!offerAmount}
                >
                  Send Offer
                </ActionButton>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📨</div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                }}
              >
                Offer Sent!
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "1.5rem",
                }}
              >
                Your offer of{" "}
                <strong style={{ color: "var(--gold2)" }}>
                  {formatCurrency(parseFloat(offerAmount), item.currency)}
                </strong>{" "}
                has been sent to {item.seller}. You will be notified when they
                respond.
              </div>
              <ActionButton
                variant="primary"
                onClick={() => {
                  setShowOffer(false);
                  setOfferSent(false);
                  setShowChat(true);
                }}
                fullWidth
              >
                Open Chat
              </ActionButton>
            </div>
          )}
        </Modal>
      )}

      {/* Report Modal */}
      {showReport && (
        <Modal title="🚩 Report Listing" onClose={() => setShowReport(false)}>
          {!reportSent ? (
            <>
              <FormField label="Reason">
                <TFSelect>
                  <option>Fraudulent listing</option>
                  <option>Wrong category</option>
                  <option>Prohibited item</option>
                  <option>Misleading description</option>
                  <option>Price manipulation</option>
                  <option>Other</option>
                </TFSelect>
              </FormField>
              <FormField label="Additional Details">
                <TFTextarea
                  placeholder="Provide more context…"
                  style={{ minHeight: 80 }}
                />
              </FormField>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <ActionButton
                  variant="ghost"
                  onClick={() => setShowReport(false)}
                  fullWidth
                >
                  Cancel
                </ActionButton>
                <ActionButton
                  variant="danger"
                  onClick={() => setReportSent(true)}
                  fullWidth
                >
                  Submit Report
                </ActionButton>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                Report Submitted
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.85rem",
                  marginBottom: "1.5rem",
                }}
              >
                Our team will review this listing within 24 hours.
              </div>
              <ActionButton
                variant="ghost"
                onClick={() => setShowReport(false)}
                fullWidth
              >
                Close
              </ActionButton>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
