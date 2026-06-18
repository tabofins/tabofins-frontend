export default function Footer() {
  const cols = [
    {
      heading: "Platform",
      links: [
        "Digital Njangi",
        "Transfers",
        "Savings Vaults",
        "Escrow",
        "Crypto Swap",
      ],
    },
    {
      heading: "Company",
      links: ["About Us", "Careers", "Blog", "Press", "Contact"],
    },
    {
      heading: "Legal",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "KYC Policy",
        "Cookie Policy",
      ],
    },
  ];

  return (
    <footer
      style={{
        background: "rgba(4,13,31,.95)",
        borderTop: "1px solid var(--glass-border)",
        padding: "3rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
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
                fontSize: "1.1rem",
                color: "var(--text)",
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
              FinS
            </span>
          </div>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.85rem",
              maxWidth: 240,
              lineHeight: 1.6,
            }}
          >
            The future of cooperative finance — digital njangi, escrow
            protection, and cross-border transfers in one ecosystem.
          </p>
        </div>

        {/* Link columns */}
        {cols.map((col) => (
          <div key={col.heading}>
            <h5
              style={{
                fontFamily: "Syne",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: "1rem",
                letterSpacing: "0.05em",
              }}
            >
              {col.heading}
            </h5>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{
                      color: "var(--muted)",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      transition: "color .2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "var(--text)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "var(--muted)")
                    }
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "2rem auto 0",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--glass-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.8rem",
          color: "var(--muted)",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span>© 2025 TaboFins. All rights reserved.</span>
        <span>🇨🇲 Built for Africa&apos;s financial future</span>
      </div>
    </footer>
  );
}
