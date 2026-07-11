"use client";
import { useState } from "react";
import {
  mockBalances,
  mockTransactions,
  mockSystemWallets,
  EXCHANGE_RATES,
  SUPPORTED_CURRENCIES,
  formatCurrency,
  timeAgo,
  getRate,
} from "../../lib/data";
import {
  GlassCard,
  PageHeader,
  ActionButton,
  Badge,
  SectionHeader,
  TabBar,
  StatCard,
  Modal,
  FormField,
  TFInput,
  TFSelect,
  AlertBanner,
  WalletCard,
  ExchangePreview,
  InfoRow,
  TransactionRow,
  Divider,
  DropZone,
} from "../../components/shared/UI";

type ModalType =
  | "deposit"
  | "withdraw"
  | "transfer"
  | "swap"
  | "create"
  | "connect"
  | null;

export default function WalletPage() {
  const [modal, setModal] = useState<ModalType>(null);
  const [showTxHistory, setShowTxHistory] = useState(false);
  const [txFilter, setTxFilter] = useState<"all" | "credit" | "debit">("all");
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [fromCur, setFromCur] = useState("XAF");
  const [toCur, setToCur] = useState("USDT");
  const [swapAmount, setSwapAmount] = useState("");

  const totalUSD = mockBalances.reduce((s, b) => s + b.usdEquivalent, 0);
  const totalLocked = mockBalances.reduce((s, b) => s + b.lockedAmount, 0);
  const totalEscrow = mockBalances.reduce((s, b) => s + b.escrowAmount, 0);

  const filteredTx = mockTransactions.filter(
    (tx) => txFilter === "all" || tx.type === txFilter,
  );

  const swapAmt = parseFloat(swapAmount) || 0;
  const swapRate = getRate(fromCur, toCur);
  const swapOut = swapAmt * swapRate;
  const swapFee = swapAmt * 0.005;

  function openModal(type: ModalType) {
    setModal(type);
    setStep(1);
    setDone(false);
  }

  return (
    <div>
      <PageHeader
        title="Wallet"
        sub="Manage your multi-currency balances, transfers, and live exchange rates."
        action={
          <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
            <ActionButton variant="ghost" onClick={() => openModal("create")}>
              + Create Wallet
            </ActionButton>
            <ActionButton variant="ghost" onClick={() => openModal("connect")}>
              🔗 Connect External
            </ActionButton>
            
          </div>
        }
      />

      {/* Quick Actions */}
      <GlassCard hover={false} style={{ marginBottom: "2rem" }}>
        <SectionHeader title="Quick Actions" />
        <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
          <ActionButton variant="primary" onClick={() => openModal("deposit")}>
            💳 Deposit
          </ActionButton>
          <ActionButton variant="ghost" onClick={() => openModal("withdraw")}>
            🏧 Withdraw
          </ActionButton>
          <ActionButton variant="ghost" onClick={() => openModal("transfer")}>
            ↗️ Send Money
          </ActionButton>
          <ActionButton variant="ghost" onClick={() => openModal("swap")}>
            🔄 Swap Currency
          </ActionButton>
        </div>
      </GlassCard>

      {/* Overview stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          label="Total Balance"
          value={`$${totalUSD.toLocaleString()}`}
          sub="All currencies"
          icon="💼"
          glow="blue"
          change={2.4}
        />
        <StatCard
          label="Locked Funds"
          value={`XAF ${totalLocked.toLocaleString()}`}
          sub="Njangis & savings"
          icon="🔒"
          glow="gold"
        />
        <StatCard
          label="In Escrow"
          value={`~$${totalEscrow.toLocaleString()}`}
          sub="Active trades"
          icon="🛡️"
          glow="green"
        />
        <StatCard
          label="Currencies"
          value={String(mockBalances.length)}
          sub="Active wallets"
          icon="💱"
        />
      </div>

      {/* Wallet cards */}
      <SectionHeader
        title="Your Wallets"
        sub="Real-time balances with live exchange placeholder"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        {mockBalances.map((b) => (
          <WalletCard
            key={b.id}
            currency={b.currency}
            amount={b.amount}
            lockedAmount={b.lockedAmount}
            escrowAmount={b.escrowAmount}
            change24h={b.change24h}
            label={b.label}
          />
        ))}
      </div>

      {/* Live conversion preview */}
      <GlassCard hover={false} style={{ marginBottom: "2rem" }}>
        <SectionHeader
          title="💱 Live Conversion"
          sub="Indicative rates — locked at time of transaction"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
            gap: "1rem",
          }}
        >
          {EXCHANGE_RATES.slice(0, 6).map((r, i) => (
            <div
              key={i}
              style={{
                padding: "0.85rem 1rem",
                background: "rgba(255,255,255,.03)",
                borderRadius: 12,
                border: "1px solid var(--glass-border)",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "var(--muted)",
                  marginBottom: "0.3rem",
                }}
              >
                1 {r.from} =
              </div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 800,
                  fontSize: "1rem",
                }}
              >
                {r.rate.toLocaleString(undefined, { maximumFractionDigits: 4 })}{" "}
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    fontWeight: 400,
                  }}
                >
                  {r.to}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: r.change24h >= 0 ? "var(--green)" : "#ff6b6b",
                  marginTop: "0.2rem",
                }}
              >
                {r.change24h >= 0 ? "↑" : "↓"} {Math.abs(r.change24h)}% 24h
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Transaction History (toggle) */}
      <GlassCard hover={false}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: showTxHistory ? "1.25rem" : 0,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: "1.05rem",
              }}
            >
              Transaction History
            </h2>
            <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
              {mockTransactions.length} transactions
            </p>
          </div>
          <ActionButton
            variant={showTxHistory ? "ghost" : "primary"}
            size="sm"
            onClick={() => setShowTxHistory((s) => !s)}
          >
            {showTxHistory ? "Hide History" : "View History"}
          </ActionButton>
        </div>

        {showTxHistory && (
          <>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "1.25rem",
              }}
            >
              {(["all", "credit", "debit"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTxFilter(f)}
                  style={{
                    padding: "0.38rem 0.85rem",
                    borderRadius: 8,
                    border:
                      txFilter === f
                        ? "1px solid rgba(26,108,255,.4)"
                        : "1px solid var(--glass-border)",
                    background:
                      txFilter === f ? "rgba(26,108,255,.15)" : "transparent",
                    color: txFilter === f ? "#7eb8ff" : "var(--muted)",
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    fontFamily: "Syne",
                    fontWeight: 600,
                  }}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            {filteredTx.map((tx, i) => (
              <TransactionRow
                key={tx.id}
                type={tx.type}
                category={tx.category}
                description={tx.description}
                amount={tx.amount}
                currency={tx.currency}
                status={tx.status}
                timestamp={tx.timestamp}
                counterparty={tx.counterparty}
                last={i === filteredTx.length - 1}
              />
            ))}
          </>
        )}
      </GlassCard>

      {/* ── MODALS ── */}

      {/* Deposit */}
      {modal === "deposit" && (
        <Modal title="💳 Deposit Funds" onClose={() => setModal(null)}>
          {!done ? (
            <>
              {step === 1 && (
                <>
                  <FormField label="Select Wallet">
                    <TFSelect>
                      <option>XAF Wallet</option>
                      <option>NGN Wallet</option>
                      <option>USDT Wallet</option>
                    </TFSelect>
                  </FormField>
                  <FormField label="Amount" required>
                    <TFInput type="number" placeholder="0.00" icon="💰" />
                  </FormField>
                  <FormField label="Payment Method">
                    <TFSelect>
                      <option>MTN Mobile Money</option>
                      <option>Orange Money</option>
                      <option>Bank Transfer</option>
                      <option>USDT Transfer</option>
                    </TFSelect>
                  </FormField>
                  <AlertBanner
                    type="info"
                    message="Deposits via mobile money are instant. Bank transfers may take 1–2 business days."
                  />
                  <ActionButton
                    variant="primary"
                    onClick={() => setStep(2)}
                    fullWidth
                    style={{ marginTop: "0.5rem" }}
                  >
                    Continue →
                  </ActionButton>
                </>
              )}
              {step === 2 && (
                <>
                  <div
                    style={{
                      padding: "1.25rem",
                      background: "rgba(26,108,255,.08)",
                      border: "1px solid rgba(26,108,255,.2)",
                      borderRadius: 14,
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Syne",
                        fontWeight: 700,
                        marginBottom: "0.75rem",
                      }}
                    >
                      Deposit Summary
                    </div>
                    <InfoRow label="Amount" value="XAF 50,000" accent />
                    <InfoRow label="Method" value="MTN Mobile Money" />
                    <InfoRow label="Fee" value="XAF 0" />
                    <InfoRow label="You Get" value="XAF 50,000" accent last />
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <ActionButton
                      variant="ghost"
                      onClick={() => setStep(1)}
                      fullWidth
                    >
                      ← Back
                    </ActionButton>
                    <ActionButton
                      variant="primary"
                      onClick={() => setDone(true)}
                      fullWidth
                    >
                      Confirm Deposit ✓
                    </ActionButton>
                  </div>
                </>
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                }}
              >
                Deposit Confirmed
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "1.5rem",
                }}
              >
                Your funds will appear in your wallet shortly.
              </div>
              <ActionButton
                variant="primary"
                onClick={() => setModal(null)}
                fullWidth
              >
                Done
              </ActionButton>
            </div>
          )}
        </Modal>
      )}

      {/* Withdraw */}
      {modal === "withdraw" && (
        <Modal title="🏧 Withdraw Funds" onClose={() => setModal(null)}>
          {!done ? (
            <>
              <FormField label="From Wallet">
                <TFSelect>
                  <option>XAF — 4,250,000</option>
                  <option>NGN — ₦185,000</option>
                  <option>USDT — 28,430</option>
                </TFSelect>
              </FormField>
              <FormField label="Amount" required>
                <TFInput type="number" placeholder="0.00" icon="💸" />
              </FormField>
              <FormField label="Withdrawal Method">
                <TFSelect>
                  <option>MTN Mobile Money</option>
                  <option>Orange Money</option>
                  <option>Bank Transfer</option>
                </TFSelect>
              </FormField>
              <FormField label="Account Number / Phone">
                <TFInput placeholder="+237 677 XXX XXX" />
              </FormField>
              <AlertBanner
                type="warning"
                message="Withdrawals over XAF 500,000 require 2FA verification and may take up to 2 hours."
              />
              <div
                style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}
              >
                <ActionButton
                  variant="ghost"
                  onClick={() => setModal(null)}
                  fullWidth
                >
                  Cancel
                </ActionButton>
                <ActionButton
                  variant="primary"
                  onClick={() => setDone(true)}
                  fullWidth
                >
                  Withdraw ✓
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
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                }}
              >
                Withdrawal Submitted
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "1.5rem",
                }}
              >
                Funds will arrive in 5–30 minutes.
              </div>
              <ActionButton
                variant="primary"
                onClick={() => setModal(null)}
                fullWidth
              >
                Done
              </ActionButton>
            </div>
          )}
        </Modal>
      )}

      {/* Transfer */}
      {modal === "transfer" && (
        <Modal title="↗️ Send Money" onClose={() => setModal(null)}>
          {!done ? (
            <>
              <FormField label="From Wallet">
                <TFSelect>
                  <option>XAF — 4,250,000</option>
                  <option>NGN — ₦185,000</option>
                  <option>USDT — 28,430</option>
                </TFSelect>
              </FormField>
              <FormField
                label="Recipient (email, phone, or @username)"
                required
              >
                <TFInput placeholder="amara@tabofins.com" icon="👤" />
              </FormField>
              <FormField label="Amount" required>
                <TFInput type="number" placeholder="0.00" icon="💰" />
              </FormField>
              <FormField label="Note (optional)">
                <TFInput placeholder="e.g. Rent payment, school fees…" />
              </FormField>
              <AlertBanner
                type="info"
                message="Transfers to TaboFins users are instant and free. External transfers may have a small fee."
              />
              <div
                style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}
              >
                <ActionButton
                  variant="ghost"
                  onClick={() => setModal(null)}
                  fullWidth
                >
                  Cancel
                </ActionButton>
                <ActionButton
                  variant="primary"
                  onClick={() => setDone(true)}
                  fullWidth
                >
                  Send ✓
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
                Transfer Sent!
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "1.5rem",
                }}
              >
                The recipient has been notified.
              </div>
              <ActionButton
                variant="primary"
                onClick={() => setModal(null)}
                fullWidth
              >
                Done
              </ActionButton>
            </div>
          )}
        </Modal>
      )}

      {/* Swap */}
      {modal === "swap" && (
        <Modal title="🔄 Swap Currency" onClose={() => setModal(null)}>
          {!done ? (
            <>
              <FormField label="From">
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <TFSelect
                    value={fromCur}
                    onChange={(e) => setFromCur(e.target.value)}
                    style={{ width: 110, flexShrink: 0 }}
                  >
                    {["XAF", "NGN", "USDT"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </TFSelect>
                  <TFInput
                    type="number"
                    placeholder="0.00"
                    value={swapAmount}
                    onChange={(e) => setSwapAmount(e.target.value)}
                  />
                </div>
              </FormField>

              <div
                style={{
                  textAlign: "center",
                  fontSize: "1.3rem",
                  margin: "0.5rem 0",
                }}
              >
                ⇅
              </div>

              <FormField label="To">
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <TFSelect
                    value={toCur}
                    onChange={(e) => setToCur(e.target.value)}
                    style={{ width: 110, flexShrink: 0 }}
                  >
                    {["XAF", "NGN", "USDT"]
                      .filter((c) => c !== fromCur)
                      .map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                  </TFSelect>
                  <div
                    style={{
                      flex: 1,
                      padding: "0.75rem 1rem",
                      background: "rgba(0,229,160,.06)",
                      border: "1px solid rgba(0,229,160,.2)",
                      borderRadius: 10,
                      fontFamily: "Syne",
                      fontWeight: 700,
                      color: "var(--green)",
                    }}
                  >
                    {swapAmt > 0
                      ? swapOut.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })
                      : "0.00"}
                  </div>
                </div>
              </FormField>

              {swapAmt > 0 && (
                <ExchangePreview
                  fromAmount={swapAmt}
                  fromCurrency={fromCur}
                  toAmount={swapOut}
                  toCurrency={toCur}
                  rate={swapRate}
                  fee={swapFee}
                  estimatedArrival="Instant"
                />
              )}

              <AlertBanner
                type="info"
                message="Swap rate is locked for 30 seconds after you confirm. Large swaps may experience slight slippage."
              />

              <div
                style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}
              >
                <ActionButton
                  variant="ghost"
                  onClick={() => setModal(null)}
                  fullWidth
                >
                  Cancel
                </ActionButton>
                <ActionButton
                  variant="primary"
                  onClick={() => setDone(true)}
                  fullWidth
                  disabled={swapAmt <= 0}
                >
                  Confirm Swap ✓
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
                Swap Complete!
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "1.5rem",
                }}
              >
                Swapped {swapAmt.toLocaleString()} {fromCur} →{" "}
                {swapOut.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                {toCur}
              </div>
              <ActionButton
                variant="primary"
                onClick={() => setModal(null)}
                fullWidth
              >
                Done
              </ActionButton>
            </div>
          )}
        </Modal>
      )}

      {/* Create Wallet */}
      {modal === "create" && (
        <Modal title="+ Create New Wallet" onClose={() => setModal(null)}>
          {!done ? (
            <>
              <AlertBanner
                type="info"
                message="You can create additional wallets for different currencies. Each wallet has its own balance and transaction history."
              />
              <FormField label="Currency" required>
                <TFSelect>
                  {SUPPORTED_CURRENCIES.filter((c) => c.active).map((c) => (
                    <option key={c.code}>
                      {c.flag} {c.name} ({c.code})
                    </option>
                  ))}
                </TFSelect>
              </FormField>
              <FormField label="Wallet Label">
                <TFInput placeholder="e.g. Business XAF, Savings USDT" />
              </FormField>
              <ActionButton
                variant="primary"
                onClick={() => setDone(true)}
                fullWidth
              >
                Create Wallet ✓
              </ActionButton>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                Wallet Created!
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "1.5rem",
                }}
              >
                Your new wallet is ready to receive funds.
              </div>
              <ActionButton
                variant="primary"
                onClick={() => setModal(null)}
                fullWidth
              >
                Done
              </ActionButton>
            </div>
          )}
        </Modal>
      )}

      {/* Connect External Wallet */}
      {modal === "connect" && (
        <Modal
          title="🔗 Connect External Wallet"
          onClose={() => setModal(null)}
        >
          {!done ? (
            <>
              <AlertBanner
                type="warning"
                message="Only connect wallets you fully control. TaboFins does not have access to your private keys."
              />
              <FormField label="Wallet Type">
                <TFSelect>
                  <option>USDT (TRC-20 / TRON)</option>
                  <option>USDT (ERC-20 / Ethereum)</option>
                  <option>USDT (BEP-20 / BSC)</option>
                  <option>Bitcoin (BTC)</option>
                </TFSelect>
              </FormField>
              <FormField label="Wallet Address" required>
                <TFInput placeholder="T9xxxxxxxxxxxxxxxxxxxxxxxxxxx" />
              </FormField>
              <FormField label="Wallet Label">
                <TFInput placeholder="e.g. My Binance Wallet" />
              </FormField>
              <Divider label="Or import via" />
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                {["MetaMask", "Trust Wallet", "Phantom"].map((w) => (
                  <button
                    key={w}
                    style={{
                      flex: 1,
                      padding: "0.65rem",
                      borderRadius: 10,
                      border: "1px solid var(--glass-border)",
                      background: "rgba(255,255,255,.03)",
                      color: "var(--muted)",
                      fontFamily: "Syne",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      cursor: "pointer",
                    }}
                  >
                    {w}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <ActionButton
                  variant="ghost"
                  onClick={() => setModal(null)}
                  fullWidth
                >
                  Cancel
                </ActionButton>
                <ActionButton
                  variant="primary"
                  onClick={() => setDone(true)}
                  fullWidth
                >
                  Connect ✓
                </ActionButton>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔗</div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                Wallet Connected!
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  marginBottom: "1.5rem",
                }}
              >
                Your external wallet is now linked. Balances sync every 5
                minutes.
              </div>
              <ActionButton
                variant="primary"
                onClick={() => setModal(null)}
                fullWidth
              >
                Done
              </ActionButton>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
