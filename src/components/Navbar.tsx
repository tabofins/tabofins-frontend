"use client";

import Link from "next/link";

interface NavbarProps {
  onLogin: () => void;
  onSignup: () => void;
}

export default function Navbar({ onLogin, onSignup }: NavbarProps) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(4,13,31,0.75)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--glass-border)",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "linear-gradient(135deg,#0a3aff,#00e5a0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: 13,
            color: "#fff",
            letterSpacing: "-0.5px",
          }}
        >
          TFS
        </div>
        <span
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "var(--text)",
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg,var(--electric),var(--gold))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tabo
          </span>
          FinS
        </span>
      </div>

      {/* Links */}
      <ul
        style={{
          display: "flex",
          gap: "2rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
        className="nav-links-desktop"
      >
        {[
          ["Njangi", "#njangi"],
          ["Transfers", "#transfers"],
          ["Savings", "#savings"],
          ["Security", "#trust"],
          ["Ecosystem", "#ecosystem"],
        ].map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                fontSize: "0.9rem",
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          onClick={onLogin}
          className="btn-ghost"
          style={{
            padding: "0.55rem 1.25rem",
            borderRadius: 8,
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          Log in
        </button>
        <button
          onClick={onSignup}
          className="btn-primary"
          style={{
            padding: "0.55rem 1.25rem",
            borderRadius: 8,
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
            border: "none",
          }}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
