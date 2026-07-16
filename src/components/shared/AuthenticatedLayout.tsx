"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockUser, mockNotifications } from "../../lib/data";

const NAV = [
  { href: "/dashboard", icon: "⊞", label: "Dashboard" },
  { href: "/wallet", icon: "💳", label: "Wallet" },
  { href: "/njangi", icon: "🤝", label: "Njangi" },
  { href: "/savings", icon: "🔒", label: "Savings" },
  { href: "/p2p", icon: "💸", label: "P2P" },
  { href: "/crossborder", icon: "🌍", label: "Crossborder" },
  { href: "/marketplace", icon: "🏪", label: "Marketplace" },
  { href: "/notifications", icon: "🔔", label: "Notifications" },
  { href: "/profile", icon: "👤", label: "Profile" },
  { href: "/settings", icon: "⚙️", label: "Settings" },
  //{ href: "/kyc/frontdesk", icon: "🔄", label: "FrontdeskStaff" },
];

export function Avatar({
  initials,
  size = 36,
}: {
  initials: string;
  size?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg,var(--electric),var(--green))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Syne",
        fontWeight: 700,
        fontSize: size * 0.34,
        color: "#fff",
        flexShrink: 0,
        letterSpacing: "-0.5px",
      }}
    >
      {initials.slice(0, 2)}
    </div>
  );
}

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unread = mockNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    const h = () => {
      setNotifOpen(false);
      setProfileOpen(false);
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", background: "var(--navy)" }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.6)",
            zIndex: 49,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className="sidebar-desktop"
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : "-260px",
          width: 240,
          height: "100vh",
          background:
            "linear-gradient(180deg,rgba(7,15,42,.98),rgba(4,13,31,.98))",
          borderRight: "1px solid var(--glass-border)",
          backdropFilter: "blur(20px)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          transition: "left .28s cubic-bezier(.4,0,.2,1)",
          overflowY: "auto",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "1.5rem 1.5rem 1rem",
            borderBottom: "1px solid var(--glass-border)",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "linear-gradient(135deg,#0a3aff,#00e5a0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Syne",
                fontWeight: 800,
                fontSize: 13,
                color: "#fff",
              }}
            >
              TFS
            </div>
            <span
              style={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: "1.05rem",
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(90deg,var(--electric),var(--gold))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Tabo
              </span>
              <span style={{ color: "var(--text)" }}>FinS</span>
            </span>
          </Link>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "1rem 0.75rem" }}>
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  padding: "0.7rem 0.9rem",
                  borderRadius: 10,
                  marginBottom: "0.2rem",
                  textDecoration: "none",
                  background: active
                    ? "linear-gradient(135deg,rgba(26,108,255,.2),rgba(26,108,255,.06))"
                    : "transparent",
                  border: active
                    ? "1px solid rgba(26,108,255,.25)"
                    : "1px solid transparent",
                  color: active ? "var(--text)" : "var(--muted)",
                  fontSize: "0.88rem",
                  fontFamily: "Syne,sans-serif",
                  fontWeight: active ? 600 : 400,
                  transition: "all .2s",
                }}
              >
                <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                {item.label}
                {item.href === "/notifications" && unread > 0 && (
                  <span
                    style={{
                      marginLeft: "auto",
                      background: "var(--electric)",
                      color: "#fff",
                      borderRadius: 100,
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      padding: "0.15rem 0.45rem",
                    }}
                  >
                    {unread}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid var(--glass-border)",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <Avatar initials={mockUser.avatar} size={34} />
            <div style={{ flex: 1, overflow: "hidden" }}>
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
                {mockUser.name}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "var(--green)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--green)",
                    display: "inline-block",
                  }}
                />
                Verified
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          marginLeft: 0,
        }}
      >
        {/* Top bar */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
            height: 64,
            background: "rgba(4,13,31,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--glass-border)",
          }}
        >
          <button
            className="topbar-hamburger"
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text)",
              fontSize: "1.4rem",
              cursor: "pointer",
              display: "flex",
            }}
          >
            &#9776;
          </button>

          <div
            style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "1rem" }}
          >
            {NAV.find((n) => pathname.startsWith(n.href))?.label ?? "TaboFins"}
          </div>

          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            {/* Notif */}
            <div
              style={{ position: "relative" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setNotifOpen((o) => !o);
                  setProfileOpen(false);
                }}
                style={{
                  background: "var(--glass)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: 10,
                  width: 38,
                  height: 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                  color: "var(--text)",
                  fontSize: "1rem",
                }}
              >
                🔔
                {unread > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--electric)",
                      border: "2px solid var(--navy)",
                    }}
                  />
                )}
              </button>
              {notifOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 8px)",
                    width: 310,
                    background:
                      "linear-gradient(145deg,rgba(10,25,70,.97),rgba(5,15,40,.99))",
                    border: "1px solid var(--glass-border)",
                    borderRadius: 16,
                    backdropFilter: "blur(20px)",
                    zIndex: 99,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "1rem 1.25rem",
                      borderBottom: "1px solid var(--glass-border)",
                      fontFamily: "Syne",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    Notifications
                  </div>
                  <div style={{ maxHeight: 320, overflowY: "auto" }}>
                    {mockNotifications.slice(0, 5).map((n) => (
                      <div
                        key={n.id}
                        style={{
                          padding: "0.8rem 1.25rem",
                          borderBottom: "1px solid rgba(100,160,255,.06)",
                          background: n.read
                            ? "transparent"
                            : "rgba(26,108,255,.05)",
                          display: "flex",
                          gap: "0.75rem",
                        }}
                      >
                        <span style={{ fontSize: "1.1rem" }}>
                          {n.type === "contribution"
                            ? "💰"
                            : n.type === "payout"
                              ? "🎉"
                              : n.type === "security"
                                ? "🛡️"
                                : n.type === "transfer"
                                  ? "↗️"
                                  : "📢"}
                        </span>
                        <div>
                          <div
                            style={{
                              fontFamily: "Syne",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              marginBottom: "0.15rem",
                            }}
                          >
                            {n.title}
                          </div>
                          <div
                            style={{
                              fontSize: "0.73rem",
                              color: "var(--muted)",
                              lineHeight: 1.4,
                            }}
                          >
                            {n.message}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/notifications"
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "0.8rem",
                      fontSize: "0.8rem",
                      color: "var(--electric)",
                      textDecoration: "none",
                      borderTop: "1px solid var(--glass-border)",
                    }}
                  >
                    View all
                  </Link>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div
              style={{ position: "relative" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setProfileOpen((o) => !o);
                  setNotifOpen(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Avatar initials={mockUser.avatar} size={34} />
              </button>
              {profileOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 8px)",
                    width: 190,
                    background:
                      "linear-gradient(145deg,rgba(10,25,70,.97),rgba(5,15,40,.99))",
                    border: "1px solid var(--glass-border)",
                    borderRadius: 14,
                    backdropFilter: "blur(20px)",
                    zIndex: 99,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "1rem",
                      borderBottom: "1px solid var(--glass-border)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Syne",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                      }}
                    >
                      {mockUser.name}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                      {mockUser.email}
                    </div>
                  </div>
                  {[
                    { href: "/profile", label: "👤  Profile" },
                    { href: "/settings", label: "⚙️  Settings" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        display: "block",
                        padding: "0.7rem 1rem",
                        fontSize: "0.84rem",
                        color: "var(--muted)",
                        textDecoration: "none",
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/"
                    style={{
                      display: "block",
                      padding: "0.7rem 1rem",
                      fontSize: "0.84rem",
                      color: "#ff8080",
                      textDecoration: "none",
                      borderTop: "1px solid var(--glass-border)",
                    }}
                  >
                    🚪 Log out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page */}
        <main
          style={{
            flex: 1,
            padding: "1.75rem 1.5rem",
            maxWidth: 1200,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {children}
        </main>
      </div>

      <style>{`
        @media(min-width:768px){
          .sidebar-desktop{left:0!important;position:sticky!important;top:0;height:100vh;flex-shrink:0}
          .topbar-hamburger{display:none!important}
        }
      `}</style>
    </div>
  );
}
