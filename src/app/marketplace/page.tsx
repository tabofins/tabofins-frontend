"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  mockMarketItems,
  MARKET_CATEGORIES,
  formatCurrency,
  timeAgo,
} from "../../lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  SectionHeader,
  SearchInput,
  FilterPills,
  StatCard,
  Modal,
  FormField,
  TFInput,
  TFSelect,
  TFTextarea,
  MarketCard,
  AlertBanner,
  RatingStars,
} from "../../components/shared/UI";
import { Avatar } from "../../components/shared/AuthenticatedLayout";

const SORT_OPTIONS = [
  { id: "newest", label: "Newest" },
  { id: "price_asc", label: "Price ↑" },
  { id: "price_desc", label: "Price ↓" },
  { id: "rating", label: "Top Rated" },
  { id: "views", label: "Most Viewed" },
];

const CONDITION_OPTIONS = [
  { id: "all", label: "All Conditions" },
  { id: "new", label: "New" },
  { id: "used", label: "Used" },
  { id: "refurbished", label: "Refurbished" },
];

export default function MarketplacePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [condition, setCondition] = useState("all");
  const [escrowOnly, setEscrowOnly] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showCreate, setShowCreate] = useState(false);
  const [createDone, setCreateDone] = useState(false);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  const topCategories = MARKET_CATEGORIES.filter((c) => !c.parent).map((c) => ({
    id: c.id,
    label: c.name,
    icon: c.icon,
    count: c.count,
  }));

  const filterOptions = [
    { id: "all", label: "All Categories", icon: "🛒" },
    ...topCategories,
  ];

  let items = mockMarketItems.filter((item) => {
    if (
      search &&
      !item.title.toLowerCase().includes(search.toLowerCase()) &&
      !item.description.toLowerCase().includes(search.toLowerCase()) &&
      !item.seller.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (
      category !== "all" &&
      item.categoryParent !== category &&
      item.category !== category
    )
      return false;
    if (condition !== "all" && item.condition !== condition) return false;
    if (escrowOnly && !item.escrow) return false;
    return true;
  });

  items = [...items].sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "rating") return b.sellerRating - a.sellerRating;
    if (sort === "views") return b.views - a.views;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const featured = items.filter((i) => i.isFeatured);

  return (
    <div>
      <PageHeader
        title="Marketplace"
        sub="Buy and sell goods, services, jobs, property and more — with escrow protection."
        action={
          <div style={{ display: "flex", gap: "0.65rem" }}>
            <ActionButton
              variant="ghost"
              onClick={() => router.push("/marketplace/listings")}
            >
              My Listings
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={() => {
                setShowCreate(true);
                setCreateDone(false);
              }}
            >
              + Post Listing
            </ActionButton>
          </div>
        }
      />

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard label="Active Listings" value="2,341" icon="🛍️" glow="blue" />
        <StatCard label="Categories" value="35" icon="📂" glow="gold" />
        <StatCard label="Escrow Protected" value="78%" icon="🔒" glow="green" />
        <StatCard label="Sellers" value="1,204" icon="👤" />
      </div>

      {/* Featured */}
      {featured.length > 0 && category === "all" && !search && (
        <div style={{ marginBottom: "2rem" }}>
          <SectionHeader
            title="⭐ Featured Listings"
            sub="Hand-picked quality items"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
              gap: "1rem",
            }}
          >
            {featured.map((item) => (
              <MarketCard
                key={item.id}
                emoji={item.mediaEmoji}
                title={item.title}
                price={item.price}
                currency={item.currency}
                condition={item.condition}
                escrow={item.escrow}
                seller={item.seller}
                sellerRating={item.sellerRating}
                location={item.location}
                isFeatured
                onClick={() => router.push(`/marketplace/${item.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search + filters */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search listings…"
          style={{ flex: 1, minWidth: 220 }}
        />
        <TFSelect
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ width: 150 }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </TFSelect>
        <TFSelect
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          style={{ width: 160 }}
        >
          {CONDITION_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </TFSelect>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            cursor: "pointer",
            fontSize: "0.82rem",
            color: "var(--muted)",
            whiteSpace: "nowrap",
          }}
        >
          <div
            onClick={() => setEscrowOnly(!escrowOnly)}
            style={{
              width: 34,
              height: 19,
              borderRadius: 10,
              background: escrowOnly
                ? "var(--electric)"
                : "rgba(255,255,255,.1)",
              position: "relative",
              cursor: "pointer",
              transition: "background .25s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 2,
                left: escrowOnly ? 17 : 2,
                width: 15,
                height: 15,
                borderRadius: "50%",
                background: "#fff",
                transition: "left .25s",
              }}
            />
          </div>
          Escrow only
        </label>
        <div style={{ display: "flex", gap: "0.35rem" }}>
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "0.45rem 0.75rem",
                borderRadius: 8,
                border:
                  view === v
                    ? "1px solid rgba(26,108,255,.4)"
                    : "1px solid var(--glass-border)",
                background: view === v ? "rgba(26,108,255,.15)" : "transparent",
                color: view === v ? "#7eb8ff" : "var(--muted)",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              {v === "grid" ? "⊞" : "☰"}
            </button>
          ))}
        </div>
      </div>

      {/* Category pills */}
      <FilterPills
        options={filterOptions}
        active={category}
        onChange={setCategory}
      />

      {/* Results count */}
      <div
        style={{
          fontSize: "0.8rem",
          color: "var(--muted)",
          marginBottom: "1rem",
        }}
      >
        {items.length} listing{items.length !== 1 ? "s" : ""}
        {search ? ` for "${search}"` : ""}
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <GlassCard hover={false}>
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <div
              style={{
                fontFamily: "Syne",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              No listings found
            </div>
            <div
              style={{
                color: "var(--muted)",
                fontSize: "0.85rem",
                marginBottom: "1.5rem",
              }}
            >
              Try adjusting your search or filters.
            </div>
            <ActionButton
              variant="ghost"
              onClick={() => {
                setSearch("");
                setCategory("all");
                setCondition("all");
                setEscrowOnly(false);
              }}
            >
              Clear Filters
            </ActionButton>
          </div>
        </GlassCard>
      ) : view === "grid" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
            gap: "1rem",
          }}
        >
          {items.map((item) => (
            <MarketCard
              key={item.id}
              emoji={item.mediaEmoji}
              title={item.title}
              price={item.price}
              currency={item.currency}
              condition={item.condition}
              escrow={item.escrow}
              seller={item.seller}
              sellerRating={item.sellerRating}
              location={item.location}
              isFeatured={item.isFeatured}
              onClick={() => router.push(`/marketplace/${item.id}`)}
            />
          ))}
        </div>
      ) : (
        <GlassCard hover={false}>
          {items.map((item, i) => (
            <div
              key={item.id}
              onClick={() => router.push(`/marketplace/${item.id}`)}
              style={{
                display: "flex",
                gap: "1rem",
                padding: "1rem 0",
                borderBottom:
                  i < items.length - 1
                    ? "1px solid rgba(100,160,255,.06)"
                    : "none",
                cursor: "pointer",
                transition: "all .2s",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "rgba(255,255,255,.02)")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background = "")
              }
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 12,
                  background: "rgba(26,108,255,.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  flexShrink: 0,
                }}
              >
                {item.mediaEmoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {item.location} · {timeAgo(item.createdAt)}
                </div>
                <div
                  style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}
                >
                  <Badge variant={item.condition === "new" ? "green" : "muted"}>
                    {item.condition}
                  </Badge>
                  {item.escrow && <Badge variant="blue">🔒 Escrow</Badge>}
                  {item.isFeatured && <Badge variant="gold">⭐ Featured</Badge>}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
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
                <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                  {item.views} views
                </div>
                <RatingStars rating={item.sellerRating} size="0.68rem" />
              </div>
            </div>
          ))}
        </GlassCard>
      )}

      {/* Create Listing Modal */}
      {showCreate && (
        <Modal
          title="📦 Post a Listing"
          onClose={() => setShowCreate(false)}
          maxWidth={520}
        >
          {!createDone ? (
            <>
              <FormField label="Category" required>
                <TFSelect>
                  <optgroup label="Goods">
                    {MARKET_CATEGORIES.filter((c) => c.parent === "goods").map(
                      (c) => (
                        <option key={c.id}>
                          {c.icon} {c.name}
                        </option>
                      ),
                    )}
                  </optgroup>
                  <optgroup label="Services">
                    {MARKET_CATEGORIES.filter(
                      (c) => c.parent === "services",
                    ).map((c) => (
                      <option key={c.id}>
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Learning">
                    {MARKET_CATEGORIES.filter(
                      (c) => c.parent === "learning",
                    ).map((c) => (
                      <option key={c.id}>
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Jobs & Gigs">
                    {MARKET_CATEGORIES.filter((c) => c.parent === "jobs").map(
                      (c) => (
                        <option key={c.id}>
                          {c.icon} {c.name}
                        </option>
                      ),
                    )}
                  </optgroup>
                  <optgroup label="Property">
                    {MARKET_CATEGORIES.filter(
                      (c) => c.parent === "property",
                    ).map((c) => (
                      <option key={c.id}>
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Mobility">
                    {MARKET_CATEGORIES.filter(
                      (c) => c.parent === "mobility",
                    ).map((c) => (
                      <option key={c.id}>
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Events">
                    {MARKET_CATEGORIES.filter((c) => c.parent === "events").map(
                      (c) => (
                        <option key={c.id}>
                          {c.icon} {c.name}
                        </option>
                      ),
                    )}
                  </optgroup>
                </TFSelect>
              </FormField>

              <FormField label="Title" required>
                <TFInput placeholder="e.g. iPhone 14 Pro 256GB Space Black" />
              </FormField>

              <FormField label="Description" required>
                <TFTextarea
                  placeholder="Describe your item or service in detail…"
                  style={{ minHeight: 90 }}
                />
              </FormField>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                }}
              >
                <FormField label="Price" required>
                  <TFInput type="number" placeholder="0.00" />
                </FormField>
                <FormField label="Currency">
                  <TFSelect>
                    <option>XAF</option>
                    <option>NGN</option>
                    <option>USDT</option>
                  </TFSelect>
                </FormField>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                }}
              >
                <FormField label="Condition">
                  <TFSelect>
                    <option>New</option>
                    <option>Used</option>
                    <option>Refurbished</option>
                  </TFSelect>
                </FormField>
                <FormField label="Location">
                  <TFInput placeholder="City, Country" />
                </FormField>
              </div>

              {/* Media type */}
              <FormField label="Media Type">
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {(["image", "video"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setMediaType(t)}
                      style={{
                        flex: 1,
                        padding: "0.6rem",
                        borderRadius: 10,
                        border:
                          mediaType === t
                            ? "1px solid rgba(26,108,255,.4)"
                            : "1px solid var(--glass-border)",
                        background:
                          mediaType === t
                            ? "rgba(26,108,255,.12)"
                            : "transparent",
                        color: mediaType === t ? "#7eb8ff" : "var(--muted)",
                        fontFamily: "Syne",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                        cursor: "pointer",
                      }}
                    >
                      {t === "image" ? "📸 Images" : "🎥 Video (5 min max)"}
                    </button>
                  ))}
                </div>
              </FormField>

              <div
                style={{
                  padding: "1.5rem",
                  border: "1px dashed rgba(26,108,255,.3)",
                  borderRadius: 12,
                  textAlign: "center",
                  cursor: "pointer",
                  color: "var(--muted)",
                  marginBottom: "1rem",
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>
                  {mediaType === "image" ? "📸" : "🎥"}
                </div>
                <div style={{ fontSize: "0.82rem" }}>
                  {mediaType === "image"
                    ? "Upload up to 8 photos"
                    : "Upload a video (max 5 minutes) showing your product or service"}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    fontSize: "0.83rem",
                    color: "var(--text)",
                  }}
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ accentColor: "var(--electric)" }}
                  />
                  Enable Escrow Protection
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    fontSize: "0.83rem",
                    color: "var(--text)",
                  }}
                >
                  <input
                    type="checkbox"
                    style={{ accentColor: "var(--electric)" }}
                  />
                  Price Negotiable
                </label>
              </div>

              <AlertBanner
                type="info"
                message="Listings with escrow protection get 3× more inquiries and rank higher in search results."
              />

              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginTop: "0.75rem",
                }}
              >
                <ActionButton
                  variant="ghost"
                  onClick={() => setShowCreate(false)}
                  fullWidth
                >
                  Cancel
                </ActionButton>
                <ActionButton
                  variant="primary"
                  onClick={() => setCreateDone(true)}
                  fullWidth
                >
                  Post Listing ✓
                </ActionButton>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎉</div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  marginBottom: "0.5rem",
                }}
              >
                Listing Posted!
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "2rem",
                }}
              >
                Your listing is now live and visible to buyers.
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <ActionButton
                  variant="ghost"
                  onClick={() => setShowCreate(false)}
                  fullWidth
                >
                  Close
                </ActionButton>
                <ActionButton
                  variant="primary"
                  onClick={() => {
                    setShowCreate(false);
                    router.push("/marketplace/listings");
                  }}
                  fullWidth
                >
                  View My Listings
                </ActionButton>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
