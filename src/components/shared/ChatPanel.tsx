"use client";
import { useState, useRef, useEffect } from "react";
import { mockMessages, ChatMessage } from "../../lib/data";
import { Avatar } from "../shared/AuthenticatedLayout";

interface ChatPanelProps {
  partnerName?: string;
  partnerAvatar?: string;
  subtitle?: string;
  contextId?: string;
  onClose?: () => void;
  embedded?: boolean;
  initialMessages?: ChatMessage[];
}

export default function ChatPanel({
  partnerName = "Support",
  partnerAvatar = "TF",
  subtitle,
  onClose,
  embedded = false,
  initialMessages,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages ?? mockMessages,
  );
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const REPLIES = [
    "Got it, let me check on that.",
    "Sure, I can help with that!",
    "Please give me a moment.",
    "That sounds good. Let me confirm.",
    "Thanks for letting me know.",
  ];

  function send() {
    if (!input.trim()) return;
    const msg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: "Amara Tanko",
      senderAvatar: "AT",
      senderId: "usr_001",
      content: input.trim(),
      timestamp: new Date().toISOString(),
      type: "text",
      read: true,
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
    setTyping(true);
    setTimeout(
      () => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `msg_${Date.now() + 1}`,
            sender: partnerName,
            senderAvatar: partnerAvatar,
            senderId: "partner",
            content: REPLIES[Math.floor(Math.random() * REPLIES.length)],
            timestamp: new Date().toISOString(),
            type: "text",
            read: false,
          },
        ]);
      },
      1400 + Math.random() * 800,
    );
  }

  const displayed = search
    ? messages.filter((m) =>
        m.content.toLowerCase().includes(search.toLowerCase()),
      )
    : messages;

  const containerStyle: React.CSSProperties = embedded
    ? {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 480,
      }
    : {
        position: "fixed",
        right: 24,
        bottom: 24,
        width: 360,
        height: 520,
        background:
          "linear-gradient(145deg,rgba(10,25,70,.97),rgba(5,15,40,.99))",
        border: "1px solid var(--glass-border)",
        borderRadius: 20,
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        zIndex: 150,
        boxShadow: "0 20px 60px rgba(0,0,0,.5)",
      };

  return (
    <div style={containerStyle}>
      {/* ── Header ── */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderBottom: "1px solid var(--glass-border)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          flexShrink: 0,
          background: "rgba(255,255,255,.02)",
        }}
      >
        <div style={{ position: "relative" }}>
          <Avatar initials={partnerAvatar} size={38} />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "var(--green)",
              border: "2px solid var(--navy)",
            }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "Syne",
              fontWeight: 700,
              fontSize: "0.9rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {partnerName}
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--green)" }}>
            {subtitle ?? "Online · Usually replies in minutes"}
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.35rem" }}>
          <button
            onClick={() => setShowSearch((s) => !s)}
            style={{
              background: "none",
              border: "none",
              color: "var(--muted)",
              cursor: "pointer",
              fontSize: "1rem",
              width: 30,
              height: 30,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            🔍
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              color: "var(--muted)",
              cursor: "pointer",
              fontSize: "1rem",
              width: 30,
              height: 30,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            📌
          </button>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "var(--muted)",
                cursor: "pointer",
                fontSize: "1.1rem",
                width: 30,
                height: 30,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Search bar ── */}
      {showSearch && (
        <div
          style={{
            padding: "0.6rem 1rem",
            borderBottom: "1px solid var(--glass-border)",
            flexShrink: 0,
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            style={{
              width: "100%",
              background: "rgba(255,255,255,.05)",
              border: "1px solid var(--glass-border)",
              borderRadius: 8,
              padding: "0.45rem 0.85rem",
              color: "var(--text)",
              fontFamily: "DM Sans,sans-serif",
              fontSize: "0.82rem",
              outline: "none",
            }}
          />
        </div>
      )}

      {/* ── Messages ── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {displayed.map((msg) => {
          const isMe = msg.senderId === "usr_001";
          const isSystem = msg.type === "system";

          if (isSystem)
            return (
              <div key={msg.id} style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    background: "rgba(255,255,255,.05)",
                    padding: "0.3rem 0.85rem",
                    borderRadius: 100,
                    display: "inline-block",
                    lineHeight: 1.5,
                  }}
                >
                  {msg.content}
                </span>
              </div>
            );

          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: isMe ? "row-reverse" : "row",
                gap: "0.5rem",
                alignItems: "flex-end",
              }}
            >
              {!isMe && <Avatar initials={msg.senderAvatar} size={26} />}
              <div style={{ maxWidth: "72%" }}>
                {msg.pinned && (
                  <div
                    style={{
                      fontSize: "0.62rem",
                      color: "var(--gold2)",
                      marginBottom: "0.2rem",
                      textAlign: isMe ? "right" : "left",
                    }}
                  >
                    📌 Pinned
                  </div>
                )}
                <div
                  style={{
                    background: isMe
                      ? "linear-gradient(135deg,var(--electric),#0052cc)"
                      : "rgba(255,255,255,.07)",
                    border: isMe ? "none" : "1px solid var(--glass-border)",
                    borderRadius: isMe
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                    padding: "0.65rem 0.95rem",
                  }}
                >
                  {msg.type === "offer" && msg.offerAmount && (
                    <div
                      style={{
                        background: "rgba(240,180,41,.15)",
                        border: "1px solid rgba(240,180,41,.25)",
                        borderRadius: 8,
                        padding: "0.4rem 0.75rem",
                        marginBottom: "0.4rem",
                        fontSize: "0.75rem",
                        color: "var(--gold2)",
                        fontFamily: "Syne",
                        fontWeight: 700,
                      }}
                    >
                      💰 Offer: {msg.offerAmount.toLocaleString()}{" "}
                      {msg.offerCurrency}
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: "0.83rem",
                      lineHeight: 1.5,
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.content}
                  </div>
                  <div
                    style={{
                      fontSize: "0.63rem",
                      color: isMe ? "rgba(255,255,255,.55)" : "var(--muted)",
                      marginTop: "0.3rem",
                      textAlign: "right",
                    }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {isMe && (
                      <span style={{ marginLeft: "0.3rem" }}>
                        {msg.read ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {typing && (
          <div
            style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}
          >
            <Avatar initials={partnerAvatar} size={26} />
            <div
              style={{
                background: "rgba(255,255,255,.07)",
                border: "1px solid var(--glass-border)",
                borderRadius: "16px 16px 16px 4px",
                padding: "0.6rem 0.95rem",
                display: "flex",
                gap: 4,
                alignItems: "center",
              }}
            >
              {[0, 0.2, 0.4].map((d, i) => (
                <div
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--muted)",
                    animation: `pulse 1s ${d}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div
        style={{
          padding: "0.75rem 1rem",
          borderTop: "1px solid var(--glass-border)",
          display: "flex",
          gap: "0.5rem",
          flexShrink: 0,
          background: "rgba(255,255,255,.02)",
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            color: "var(--muted)",
            cursor: "pointer",
            fontSize: "1.1rem",
            flexShrink: 0,
            width: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          📎
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Type a message..."
          style={{
            flex: 1,
            background: "rgba(255,255,255,.05)",
            border: "1px solid var(--glass-border)",
            borderRadius: 10,
            padding: "0.55rem 0.9rem",
            color: "var(--text)",
            fontFamily: "DM Sans,sans-serif",
            fontSize: "0.85rem",
            outline: "none",
          }}
        />
        <button
          onClick={send}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: "none",
            background: input.trim()
              ? "linear-gradient(135deg,var(--electric),#0052cc)"
              : "rgba(255,255,255,.06)",
            color: "#fff",
            cursor: input.trim() ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            flexShrink: 0,
            transition: "all .2s",
          }}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
