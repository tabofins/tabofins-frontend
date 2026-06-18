"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  mode: "login" | "signup";
  onClose: () => void;
  onSwitch: (mode: "login" | "signup") => void;
}

const STEPS = ["Personal Info", "Contact", "Security", "Country"];

export default function AuthModal({ mode, onClose, onSwitch }: AuthModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  // Reset step when mode changes
  useEffect(() => {
    setStep(1);
    setSubmitted(false);
  }, [mode]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const totalSteps = STEPS.length;
  const pct = step === 1 ? 5 : ((step - 1) / (totalSteps - 1)) * 100;

  function handleSubmit() {
    // LOGIN
    if (mode === "login") {
      router.push("/dashboard");
      return;
    }

    // SIGNUP FINISHED
    if (step === totalSteps) {
      alert("Account created successfully. Please sign in.");
      onSwitch("login");
      return;
    }

    // NEXT SIGNUP STEP
    setStep((s) => s + 1);
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(4,13,31,0.85)",
        backdropFilter: "blur(16px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(145deg,rgba(10,25,70,.92),rgba(5,15,40,.96))",
          border: "1px solid rgba(26,108,255,.25)",
          borderRadius: 24,
          padding: "2.5rem",
          width: "100%",
          maxWidth: 420,
          position: "relative",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            color: "var(--muted)",
            fontSize: "1.3rem",
            cursor: "pointer",
            width: 32,
            height: 32,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "linear-gradient(135deg,#0a3aff,#00e5a0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Syne",
              fontWeight: 800,
              fontSize: 15,
              color: "#fff",
              margin: "0 auto 0.75rem",
            }}
          >
            TFS
          </div>
          <h2
            style={{
              fontFamily: "Syne",
              fontSize: "1.6rem",
              fontWeight: 700,
              marginBottom: "0.4rem",
            }}
          >
            {mode === "login" ? "Welcome back" : "Join TaboFins"}
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            {mode === "login"
              ? "Secure financial gateway — your identity is protected."
              : `Step ${step} of ${totalSteps} — ${STEPS[step - 1]}`}
          </p>
        </div>

        {/* Step indicators (signup only) */}
        {mode === "signup" && (
          <>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "center",
                marginBottom: "1.5rem",
              }}
            >
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`step-dot ${i === step - 1 ? "active" : i < step - 1 ? "done" : ""}`}
                />
              ))}
            </div>
            {/* Progress bar */}
            <div
              style={{
                height: 4,
                background: "rgba(255,255,255,.08)",
                borderRadius: 2,
                overflow: "hidden",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  borderRadius: 2,
                  background:
                    "linear-gradient(90deg,var(--electric),var(--green))",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </>
        )}

        {/* Fields */}
        {!submitted && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            {mode === "login" && (
              <>
                <Field
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                />
                <Field
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.82rem",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "var(--muted)",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ accentColor: "var(--electric)" }}
                    />
                    Remember me
                  </label>
                  <a
                    href="#"
                    style={{ color: "var(--electric)", textDecoration: "none" }}
                  >
                    Forgot password?
                  </a>
                </div>
              </>
            )}

            {mode === "signup" && step === 1 && (
              <Field label="Full name" type="text" placeholder="Amara Tanko" />
            )}
            {mode === "signup" && step === 2 && (
              <>
                <Field
                  label="Email address"
                  type="email"
                  placeholder="amara@example.com"
                />
                <Field
                  label="Phone number"
                  type="tel"
                  placeholder="+237 6XX XXX XXX"
                />
              </>
            )}
            {mode === "signup" && step === 3 && (
              <>
                <Field
                  label="Password"
                  type="password"
                  placeholder="Create strong password"
                />
                <Field
                  label="Confirm password"
                  type="password"
                  placeholder="Repeat password"
                />
              </>
            )}
            {mode === "signup" && step === 4 && (
              <>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "var(--muted)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Country of residence
                  </label>
                  <select
                    className="form-input"
                    style={{ appearance: "none" as const }}
                  >
                    <option value="">Select your country...</option>
                    <option>Cameroon 🇨🇲</option>
                    <option>Nigeria 🇳🇬</option>
                    <option>Ghana 🇬🇭</option>
                    <option>Kenya 🇰🇪</option>
                    <option>Other</option>
                  </select>
                </div>
                <div
                  style={{
                    background: "rgba(26,108,255,.08)",
                    border: "1px solid rgba(26,108,255,.2)",
                    borderRadius: 10,
                    padding: "1rem",
                    fontSize: "0.82rem",
                    color: "var(--muted)",
                  }}
                >
                  🪪{" "}
                  <strong style={{ color: "var(--text)" }}>
                    KYC Required:
                  </strong>{" "}
                  Identity verification is mandatory to protect all cooperative
                  financial activities. You will be guided through this after
                  signup.
                </div>
              </>
            )}
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "0.9rem",
            borderRadius: 10,
            fontFamily: "Syne, sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: "pointer",
            border: "none",
            background: submitted
              ? "linear-gradient(135deg,var(--green),#00a875)"
              : "linear-gradient(135deg,var(--electric),#0052cc)",
            color: "#fff",
            boxShadow: "0 4px 24px rgba(26,108,255,.4)",
            transition: "all 0.25s",
            marginBottom: "0.75rem",
          }}
        >
          {submitted
            ? mode === "login"
              ? "✓ Signed In!"
              : "✓ Account Created!"
            : mode === "login"
              ? "Sign In Securely"
              : step < totalSteps
                ? "Continue →"
                : "Create Account"}
        </button>

        {/* Back button (signup) */}
        {mode === "signup" && step > 1 && !submitted && (
          <button
            onClick={() => setStep((s) => s - 1)}
            style={{
              width: "100%",
              background: "none",
              border: "1px solid var(--glass-border)",
              color: "var(--muted)",
              borderRadius: 10,
              padding: "0.75rem",
              fontFamily: "Syne, sans-serif",
              cursor: "pointer",
              marginBottom: "0.75rem",
            }}
          >
            ← Back
          </button>
        )}

        {/* Secure badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            justifyContent: "center",
            fontSize: "0.75rem",
            color: "var(--muted)",
            marginTop: "0.75rem",
          }}
        >
          🔒{" "}
          {mode === "login"
            ? "End-to-end encrypted · 256-bit SSL"
            : "Your data is encrypted and never sold"}
        </div>

        {/* Switch mode */}
        {!submitted && (
          <p
            style={{
              textAlign: "center",
              fontSize: "0.85rem",
              color: "var(--muted)",
              marginTop: "1.5rem",
            }}
          >
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => onSwitch("signup")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--electric)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                  }}
                >
                  Create one →
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => onSwitch("login")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--electric)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                  }}
                >
                  Sign in →
                </button>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "0.8rem",
          fontWeight: 500,
          color: "var(--muted)",
          marginBottom: "0.5rem",
          letterSpacing: "0.03em",
        }}
      >
        {label}
      </label>
      <input className="form-input" type={type} placeholder={placeholder} />
    </div>
  );
}
