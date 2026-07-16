// ============================================================
// TaboFins — Complete Mock Data Layer
// lib/data.ts
// ============================================================

// ── SUPPORTED CURRENCIES ─────────────────────────────────────────────────

export interface Currency {
    code: "XAF" | "NGN" | "USDT" | "GHS" | "KES" | "USD" | "EUR";
    name: string;
    symbol: string;
    flag: string;
    decimals: number;
    active: boolean;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
    { code: "XAF", name: "Central African Franc", symbol: "XAF", flag: "🇨🇲", decimals: 0, active: true },
    { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬", decimals: 2, active: true },
    { code: "USDT", name: "Tether (Stable)", symbol: "$", flag: "💵", decimals: 2, active: true },
    { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", flag: "🇬🇭", decimals: 2, active: true },
    { code: "KES", name: "Kenyan Shilling", symbol: "KSh", flag: "🇰🇪", decimals: 2, active: true },
    { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", decimals: 2, active: false },
    { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", decimals: 2, active: false },
];

// ── SUPPORTED COUNTRIES ───────────────────────────────────────────────────

export interface Country {
    code: string;
    name: string;
    flag: string;
    currency: "XAF" | "NGN" | "USDT" | "GHS" | "KES";
    dialCode: string;
    active: boolean;
}

export const SUPPORTED_COUNTRIES: Country[] = [
    { code: "CM", name: "Cameroon", flag: "🇨🇲", currency: "XAF", dialCode: "+237", active: true },
    { code: "NG", name: "Nigeria", flag: "🇳🇬", currency: "NGN", dialCode: "+234", active: true },
    { code: "GH", name: "Ghana", flag: "🇬🇭", currency: "GHS", dialCode: "+233", active: true },
    { code: "KE", name: "Kenya", flag: "🇰🇪", currency: "KES", dialCode: "+254", active: true },
    { code: "SN", name: "Senegal", flag: "🇸🇳", currency: "XAF", dialCode: "+221", active: true },
    { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮", currency: "XAF", dialCode: "+225", active: false },
    { code: "TZ", name: "Tanzania", flag: "🇹🇿", currency: "KES", dialCode: "+255", active: false },
];

// ── LIVE EXCHANGE RATES ───────────────────────────────────────────────────

export interface ExchangeRate {
    from: string;
    to: string;
    rate: number;
    change24h: number;
    lastUpdated: string;
}

export const EXCHANGE_RATES: ExchangeRate[] = [
    { from: "USDT", to: "XAF", rate: 620, change24h: 0.4, lastUpdated: "2025-06-04T15:00:00Z" },
    { from: "USDT", to: "NGN", rate: 1610, change24h: -0.2, lastUpdated: "2025-06-04T15:00:00Z" },
    { from: "USDT", to: "GHS", rate: 15.6, change24h: 0.1, lastUpdated: "2025-06-04T15:00:00Z" },
    { from: "USDT", to: "KES", rate: 129, change24h: -0.5, lastUpdated: "2025-06-04T15:00:00Z" },
    { from: "XAF", to: "NGN", rate: 2.60, change24h: 0.3, lastUpdated: "2025-06-04T15:00:00Z" },
    { from: "NGN", to: "XAF", rate: 0.385, change24h: -0.3, lastUpdated: "2025-06-04T15:00:00Z" },
    { from: "XAF", to: "GHS", rate: 0.0252, change24h: 0.1, lastUpdated: "2025-06-04T15:00:00Z" },
    { from: "NGN", to: "GHS", rate: 0.0097, change24h: -0.1, lastUpdated: "2025-06-04T15:00:00Z" },
];

export function getRate(from: string, to: string): number {
    if (from === to) return 1;
    const direct = EXCHANGE_RATES.find((r) => r.from === from && r.to === to);
    if (direct) return direct.rate;
    const inverse = EXCHANGE_RATES.find((r) => r.from === to && r.to === from);
    if (inverse) return 1 / inverse.rate;
    return 1;
}

// ── TYPES ─────────────────────────────────────────────────────────────────

export type CurrencyCode = "XAF" | "NGN" | "USDT" | "GHS";
export type TxStatus = "completed" | "pending" | "failed" | "cancelled";
export type KYCStatus = "verified" | "pending" | "rejected" | "unverified";
export type NjangiStatus = "active" | "completed" | "pending" | "paused";
export type VaultStatus = "active" | "locked" | "completed" | "withdrawn";
export type P2PStatus = "open" | "matched" | "paid" | "released" | "disputed" | "cancelled" | "filled";
export type DisputeStatus = "open" | "under_review" | "resolved" | "escalated";

// ── USER PROFILE ──────────────────────────────────────────────────────────

export interface User {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    countryCode: string;
    city: string;
    address: string;
    avatar: string;
    kycStatus: KYCStatus;
    trustScore: number;
    joinedAt: string;
    referralCode: string;
    referredBy?: string;
    bio: string;
    occupation: string;
    totalTrades: number;
    successRate: number;
    isAdmin: boolean;
    isFrontDesk: boolean;
    language: string;
    currency: CurrencyCode;
    theme: "dark" | "light";
    twoFA: boolean;
    emailVerified: boolean;
    phoneVerified: boolean;
    totalReferrals: number;
    referralEarnings: number;
}

export const mockUser: User = {
    id: "usr_001",
    name: "Tabotino J.",
    firstName: "Tabotino",
    lastName: "J.",
    email: "tabotino@gmail.com",
    phone: "+237 677 123 456",
    country: "Cameroon",
    countryCode: "CM",
    city: "Douala",
    address: "Akwa, Douala, Cameroon",
    avatar: "TJ",
    kycStatus: "verified",
    trustScore: 94,
    joinedAt: "2024-09-15",
    referralCode: "TABO-AT-7X9K",
    bio: "Finance professional based in Douala. Passionate about cooperative savings and fintech innovation.",
    occupation: "Crypto Enthusiast",
    totalTrades: 47,
    successRate: 98,
    isAdmin: false,
    isFrontDesk: false,
    language: "en",
    currency: "XAF",
    theme: "dark",
    twoFA: true,
    emailVerified: true,
    phoneVerified: true,
    totalReferrals: 12,
    referralEarnings: 60000,
};

// ── USER REPUTATION ───────────────────────────────────────────────────────

export interface UserReputation {
    userId: string;
    trustScore: number;
    totalTrades: number;
    successRate: number;
    avgResponseTime: string;
    positiveReviews: number;
    negativeReviews: number;
    disputesRaised: number;
    disputesLost: number;
    memberSince: string;
    badges: string[];
    level: "Bronze" | "Silver" | "Gold" | "Platinum";
}

export const mockReputation: UserReputation = {
    userId: "usr_001",
    trustScore: 94,
    totalTrades: 47,
    successRate: 98,
    avgResponseTime: "4 min",
    positiveReviews: 45,
    negativeReviews: 2,
    disputesRaised: 1,
    disputesLost: 0,
    memberSince: "September 2024",
    badges: ["Early Adopter", "Verified Trader", "Top Saver", "Njangi Champion"],
    level: "Gold",
};

// ── WALLET BALANCES ───────────────────────────────────────────────────────

export interface WalletBalance {
    id: string;
    currency: CurrencyCode;
    amount: number;
    usdEquivalent: number;
    lockedAmount: number;
    escrowAmount: number;
    change24h: number;
    address?: string;
    type: "main" | "savings" | "escrow" | "reserve" | "external";
    label: string;
}

export const mockBalances: WalletBalance[] = [
    { id: "wal_001", currency: "XAF", amount: 4_250_000,  usdEquivalent: 7083, lockedAmount: 150_000, escrowAmount: 300_000, change24h: 2.4, address: "TFS-XAF-AT001", type: "main", label: "Main XAF Wallet" },
    { id: "wal_002", currency: "NGN", amount: 185_000, usdEquivalent: 115, lockedAmount: 0, escrowAmount: 0, change24h: -0.8, address: "TFS-NGN-AT001", type: "main", label: "Main NGN Wallet" },
    { id: "wal_003", currency: "USDT", amount: 28_430, usdEquivalent: 28430, lockedAmount: 850, escrowAmount: 1_200, change24h: 0.1, address: "TFS-USDT-AT001", type: "main", label: "Main USDT Wallet" },
];

export interface SystemWallet {
    id: string;
    label: string;
    currency: CurrencyCode;
    balance: number;
    purpose: string;
}

export const mockSystemWallets: SystemWallet[] = [
    { id: "sw_001", label: "Platform Reserve", currency: "XAF", balance: 48_500_000, purpose: "System liquidity reserve" },
    { id: "sw_002", label: "Penalty Pool", currency: "XAF", balance: 1_240_000, purpose: "Collected penalties (30% system)" },
    { id: "sw_003", label: "Escrow Pool", currency: "USDT", balance: 184_200, purpose: "Active escrow holdings" },
    { id: "sw_004", label: "Referral Rewards", currency: "XAF", balance: 3_800_000, purpose: "Pending referral commission pool" },
];

export interface GroupWallet {
    njangiId: string;
    currency: CurrencyCode;
    pool: number;
    reserve: number;
    penaltyPool: number;
    lastUpdated: string;
}

export const mockGroupWallets: GroupWallet[] = [
    { njangiId: "nj_001", currency: "XAF", pool: 1_200_000, reserve: 45_000, penaltyPool: 7_500, lastUpdated: "2025-06-04T08:00:00Z" },
    { njangiId: "nj_002", currency: "XAF", pool: 450_000, reserve: 22_500, penaltyPool: 0, lastUpdated: "2025-06-04T08:00:00Z" },
];

export interface SavingsWallet {
    vaultId: string;
    currency: CurrencyCode;
    balance: number;
    interest: number;
    lastAdded: string;
}

export const mockSavingsWallets: SavingsWallet[] = [
    { vaultId: "sv_001", currency: "XAF", balance: 1_200_000, interest: 4_500, lastAdded: "2025-06-03T08:00:00Z" },
    { vaultId: "sv_002", currency: "USDT", balance: 420, interest: 0.84, lastAdded: "2025-06-01T08:00:00Z" },
    { vaultId: "sv_003", currency: "XAF", balance: 500_000, interest: 10_200, lastAdded: "2025-05-01T08:00:00Z" },
    { vaultId: "sv_004", currency: "XAF", balance: 2_100_000, interest: 22_000, lastAdded: "2025-06-03T08:00:00Z" },
];

// ── TRANSACTIONS ──────────────────────────────────────────────────────────

export interface Transaction {
    id: string;
    type: "credit" | "debit";
    category: "transfer" | "njangi" | "savings" | "escrow" | "swap" | "p2p" | "marketplace" | "referral" | "penalty" | "interest" | "crossborder";
    amount: number;
    currency: CurrencyCode;
    description: string;
    status: TxStatus;
    timestamp: string;
    counterparty?: string;
    reference: string;
    fee: number;
    note?: string;
}

export const mockTransactions: Transaction[] = [
    { id: "tx_001", type: "credit", category: "njangi", amount: 750_000, currency: "XAF", description: "Njangi payout — Famille Tanko", status: "completed", timestamp: "2025-06-04T14:30:00Z", counterparty: "Famille Tanko", reference: "NJ-750001", fee: 0 },
    { id: "tx_002", type: "debit", category: "transfer", amount: 50_000, currency: "NGN", description: "Transfer to Chidi Obi", status: "completed", timestamp: "2025-06-04T10:12:00Z", counterparty: "Chidi Obi", reference: "TF-500002", fee: 500 },
    { id: "tx_003", type: "debit", category: "savings", amount: 100_000, currency: "XAF", description: "Auto-save — Emergency Fund", status: "completed", timestamp: "2025-06-03T08:00:00Z", reference: "SV-100003", fee: 0 },
    { id: "tx_004", type: "credit", category: "swap", amount: 500, currency: "USDT", description: "XAF to USDT swap", status: "completed", timestamp: "2025-06-02T16:45:00Z", reference: "SW-500004", fee: 2.5 },
    { id: "tx_005", type: "debit", category: "njangi", amount: 75_000, currency: "XAF", description: "Njangi contribution — Staff Savings", status: "pending", timestamp: "2025-06-01T09:00:00Z", reference: "NJ-750005", fee: 0 },
    { id: "tx_006", type: "credit", category: "transfer", amount: 200_000, currency: "XAF", description: "Received from Marie Ndongo", status: "completed", timestamp: "2025-05-31T11:20:00Z", counterparty: "Marie Ndongo", reference: "TF-200006", fee: 0 },
    { id: "tx_007", type: "debit", category: "escrow", amount: 850, currency: "USDT", description: "Marketplace escrow — Electronics", status: "pending", timestamp: "2025-05-30T13:00:00Z", reference: "ES-850007", fee: 0 },
    { id: "tx_008", type: "credit", category: "p2p", amount: 300_000, currency: "XAF", description: "P2P Buy — from Brice Ngum", status: "completed", timestamp: "2025-05-29T09:00:00Z", counterparty: "Brice Ngum", reference: "P2-300008", fee: 1_500 },
    { id: "tx_009", type: "credit", category: "referral", amount: 5_000, currency: "XAF", description: "Referral bonus — Grace Yuh joined", status: "completed", timestamp: "2025-06-02T12:00:00Z", counterparty: "Grace Yuh", reference: "RF-500009", fee: 0 },
    { id: "tx_010", type: "debit", category: "crossborder", amount: 100, currency: "USDT", description: "Cross-border to Chidi Obi (Nigeria)", status: "completed", timestamp: "2025-05-28T14:00:00Z", counterparty: "Chidi Obi", reference: "CB-100010", fee: 1 },
    { id: "tx_011", type: "credit", category: "interest", amount: 4_500, currency: "XAF", description: "Monthly interest — Emergency Fund", status: "completed", timestamp: "2025-06-01T00:00:00Z", reference: "IN-450011", fee: 0 },
    { id: "tx_012", type: "debit", category: "penalty", amount: 3_750, currency: "XAF", description: "Njangi late penalty — Staff Savings", status: "completed", timestamp: "2025-05-15T09:00:00Z", reference: "PE-375012", fee: 0 },
];

// ── NJANGI ────────────────────────────────────────────────────────────────

export interface NjangiMember {
    id: string;
    name: string;
    avatar: string;
    position: number;
    hasPaid: boolean;
    isCurrentEater: boolean;
    phone: string;
    joinedAt: string;
    missedCycles: number;
    penaltiesOwed: number;
    consistencyScore: number;
    isAdmin: boolean;
    country: string;
}

export interface ContributionRecord {
    memberId: string;
    memberName: string;
    avatar: string;
    cycle: number;
    amount: number;
    currency: CurrencyCode;
    paidAt: string | null;
    status: "paid" | "pending" | "late" | "missed";
    penaltyPaid: number;
}

export interface Penalty {
    id: string;
    njangiId: string;
    memberId: string;
    memberName: string;
    avatar: string;
    cycle: number;
    amount: number;
    breakdown: { system: number; beneficiary: number; reserve: number };
    reason: string;
    date: string;
    paid: boolean;
}

export interface Njangi {
    id: string;
    name: string;
    description: string;
    cycleAmount: number;
    currency: CurrencyCode;
    frequency: "weekly" | "biweekly" | "monthly";
    members: NjangiMember[];
    currentCycle: number;
    totalCycles: number;
    nextPayoutDate: string;
    myPosition: number;
    totalPool: number;
    status: NjangiStatus;
    penaltyRate: number;
    myContributionPaid: boolean;
    reserveWallet: number;
    penaltyPool: number;
    createdAt: string;
    adminId: string;
    rules: string;
    isPaused: boolean;
    pauseReason?: string;
    conflictActive: boolean;
}

export const mockNjangis: Njangi[] = [
    {
        id: "nj_001",
        name: "Famille Tanko",
        description: "Family rotating savings group — monthly contributions for household goals.",
        cycleAmount: 150_000,
        currency: "XAF",
        frequency: "monthly",
        currentCycle: 3,
        totalCycles: 8,
        nextPayoutDate: "2025-07-01",
        myPosition: 5,
        totalPool: 1_200_000,
        status: "active",
        penaltyRate: 5,
        myContributionPaid: true,
        reserveWallet: 45_000,
        penaltyPool: 7_500,
        createdAt: "2025-01-15",
        adminId: "usr_001",
        rules: "Payments due by 1st of each month. 5% penalty applies after 3-day grace period.",
        isPaused: false,
        conflictActive: false,
        members: [
            { id: "m1", name: "Tabotino J.", avatar: "TJ", position: 5, hasPaid: true, isCurrentEater: false, phone: "+237 677 123 456", joinedAt: "2025-01-15", missedCycles: 0, penaltiesOwed: 0, consistencyScore: 100, isAdmin: true, country: "Cameroon" },
            { id: "m2", name: "Marie Ndongo", avatar: "MN", position: 1, hasPaid: true, isCurrentEater: false, phone: "+237 677 234 567", joinedAt: "2025-01-15", missedCycles: 0, penaltiesOwed: 0, consistencyScore: 100, isAdmin: false, country: "Cameroon" },
            { id: "m3", name: "Pierre Fon", avatar: "PF", position: 2, hasPaid: true, isCurrentEater: false, phone: "+237 677 345 678", joinedAt: "2025-01-15", missedCycles: 0, penaltiesOwed: 0, consistencyScore: 100, isAdmin: false, country: "Cameroon" },
            { id: "m4", name: "Cecile Bah", avatar: "CB", position: 3, hasPaid: true, isCurrentEater: true, phone: "+237 677 456 789", joinedAt: "2025-01-15", missedCycles: 0, penaltiesOwed: 0, consistencyScore: 97, isAdmin: false, country: "Cameroon" },
            { id: "m5", name: "Joseph Lum", avatar: "JL", position: 4, hasPaid: false, isCurrentEater: false, phone: "+237 677 567 890", joinedAt: "2025-01-15", missedCycles: 1, penaltiesOwed: 7_500, consistencyScore: 75, isAdmin: false, country: "Cameroon" },
            { id: "m6", name: "Rachel Eno", avatar: "RE", position: 6, hasPaid: false, isCurrentEater: false, phone: "+237 677 678 901", joinedAt: "2025-01-15", missedCycles: 0, penaltiesOwed: 0, consistencyScore: 92, isAdmin: false, country: "Cameroon" },
            { id: "m7", name: "Daniel Mbi", avatar: "DM", position: 7, hasPaid: false, isCurrentEater: false, phone: "+237 677 789 012", joinedAt: "2025-01-15", missedCycles: 0, penaltiesOwed: 0, consistencyScore: 88, isAdmin: false, country: "Cameroon" },
            { id: "m8", name: "Grace Yuh", avatar: "GY", position: 8, hasPaid: false, isCurrentEater: false, phone: "+237 677 890 123", joinedAt: "2025-01-15", missedCycles: 0, penaltiesOwed: 0, consistencyScore: 100, isAdmin: false, country: "Cameroon" },
        ],
    },
    {
        id: "nj_002",
        name: "Staff Savings",
        description: "Office colleagues monthly contribution pool for shared goals.",
        cycleAmount: 75_000,
        currency: "XAF",
        frequency: "monthly",
        currentCycle: 1,
        totalCycles: 6,
        nextPayoutDate: "2025-06-30",
        myPosition: 2,
        totalPool: 450_000,
        status: "active",
        penaltyRate: 10,
        myContributionPaid: false,
        reserveWallet: 22_500,
        penaltyPool: 0,
        createdAt: "2025-05-01",
        adminId: "usr_010",
        rules: "Contributions due by 28th. 10% penalty after 48-hour grace. Admin can pause for disputes.",
        isPaused: false,
        conflictActive: true,
        members: [
            { id: "s1", name: "Tabotino J.", avatar: "TJ", position: 2, hasPaid: false, isCurrentEater: false, phone: "+237 677 123 456", joinedAt: "2025-05-01", missedCycles: 0, penaltiesOwed: 0, consistencyScore: 100, isAdmin: false, country: "Cameroon" },
            { id: "s2", name: "Fiona Che", avatar: "FC", position: 1, hasPaid: true, isCurrentEater: true, phone: "+237 677 112 233", joinedAt: "2025-05-01", missedCycles: 0, penaltiesOwed: 0, consistencyScore: 100, isAdmin: true, country: "Cameroon" },
            { id: "s3", name: "Brice Ngum", avatar: "BN", position: 3, hasPaid: false, isCurrentEater: false, phone: "+237 677 223 344", joinedAt: "2025-05-01", missedCycles: 0, penaltiesOwed: 0, consistencyScore: 95, isAdmin: false, country: "Cameroon" },
            { id: "s4", name: "Alice Tabi", avatar: "AB", position: 4, hasPaid: false, isCurrentEater: false, phone: "+237 677 334 455", joinedAt: "2025-05-01", missedCycles: 1, penaltiesOwed: 7_500, consistencyScore: 70, isAdmin: false, country: "Cameroon" },
            { id: "s5", name: "Emile Shu", avatar: "ES", position: 5, hasPaid: false, isCurrentEater: false, phone: "+237 677 445 566", joinedAt: "2025-05-01", missedCycles: 0, penaltiesOwed: 0, consistencyScore: 85, isAdmin: false, country: "Cameroon" },
            { id: "s6", name: "Nadia Fru", avatar: "NF", position: 6, hasPaid: false, isCurrentEater: false, phone: "+237 677 556 677", joinedAt: "2025-05-01", missedCycles: 0, penaltiesOwed: 0, consistencyScore: 90, isAdmin: false, country: "Cameroon" },
        ],
    },
];

export const mockContributionHistory: ContributionRecord[] = [
    { memberId: "m1", memberName: "Amara Tanko", avatar: "AT", cycle: 1, amount: 150_000, currency: "XAF", paidAt: "2025-02-01T09:00:00Z", status: "paid", penaltyPaid: 0 },
    { memberId: "m2", memberName: "Marie Ndongo", avatar: "MN", cycle: 1, amount: 150_000, currency: "XAF", paidAt: "2025-02-01T07:30:00Z", status: "paid", penaltyPaid: 0 },
    { memberId: "m3", memberName: "Pierre Fon", avatar: "PF", cycle: 1, amount: 150_000, currency: "XAF", paidAt: "2025-02-03T10:00:00Z", status: "late", penaltyPaid: 7_500 },
    { memberId: "m5", memberName: "Joseph Lum", avatar: "JL", cycle: 2, amount: 150_000, currency: "XAF", paidAt: null, status: "missed", penaltyPaid: 0 },
    { memberId: "m4", memberName: "Cecile Bah", avatar: "CB", cycle: 2, amount: 150_000, currency: "XAF", paidAt: "2025-03-01T08:00:00Z", status: "paid", penaltyPaid: 0 },
    { memberId: "m1", memberName: "Amara Tanko", avatar: "AT", cycle: 3, amount: 150_000, currency: "XAF", paidAt: "2025-04-01T09:00:00Z", status: "paid", penaltyPaid: 0 },
    { memberId: "m6", memberName: "Rachel Eno", avatar: "RE", cycle: 3, amount: 150_000, currency: "XAF", paidAt: "2025-04-02T11:00:00Z", status: "late", penaltyPaid: 7_500 },
];

export const mockPenalties: Penalty[] = [
    {
        id: "pen_001",
        njangiId: "nj_001",
        memberId: "m5",
        memberName: "Joseph Lum",
        avatar: "JL",
        cycle: 2,
        amount: 7_500,
        breakdown: { system: 2_250, beneficiary: 2_250, reserve: 3_000 },
        reason: "Missed cycle 2 contribution — 5% of XAF 150,000",
        date: "2025-03-05T00:00:00Z",
        paid: false,
    },
    {
        id: "pen_002",
        njangiId: "nj_001",
        memberId: "m3",
        memberName: "Pierre Fon",
        avatar: "PF",
        cycle: 1,
        amount: 7_500,
        breakdown: { system: 2_250, beneficiary: 2_250, reserve: 3_000 },
        reason: "Late payment cycle 1 — 5% of XAF 150,000",
        date: "2025-02-04T00:00:00Z",
        paid: true,
    },
    {
        id: "pen_003",
        njangiId: "nj_002",
        memberId: "s4",
        memberName: "Alice Tabi",
        avatar: "AB",
        cycle: 1,
        amount: 7_500,
        breakdown: { system: 2_250, beneficiary: 2_250, reserve: 3_000 },
        reason: "Missed cycle 1 — 10% of XAF 75,000",
        date: "2025-06-03T00:00:00Z",
        paid: false,
    },
];

// ── SAVINGS ───────────────────────────────────────────────────────────────

export interface SavingsVault {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    currency: CurrencyCode;
    lockedUntil: string;
    autoContribute: boolean;
    autoAmount?: number;
    autoFrequency?: "daily" | "weekly" | "monthly";
    status: VaultStatus;
    createdAt: string;
    emoji: string;
    type: "personal" | "group";
    interestRate: number;
    interestEarned: number;
    earlyPenalty: number;
    members?: GroupSavingsMember[];
    goal?: string;
    withdrawalHistory?: WithdrawalRecord[];
}

export interface GroupSavingsMember {
    id: string;
    name: string;
    avatar: string;
    contributed: number;
    joinedAt: string;
    isAdmin: boolean;
}

export interface WithdrawalRecord {
    id: string;
    amount: number;
    date: string;
    penalty: number;
    net: number;
    reason: string;
    status: "completed" | "pending";
}

export const mockVaults: SavingsVault[] = [
    {
        id: "sv_001",
        name: "Emergency Fund",
        targetAmount: 2_000_000,
        currentAmount: 1_200_000,
        currency: "XAF",
        lockedUntil: "2025-12-31",
        autoContribute: true,
        autoAmount: 100_000,
        autoFrequency: "monthly",
        status: "active",
        createdAt: "2025-01-01",
        emoji: "🛡️",
        type: "personal",
        interestRate: 4.5,
        interestEarned: 4_500,
        earlyPenalty: 2,
        goal: "6-month expense buffer",
        withdrawalHistory: [],
    },
    {
        id: "sv_002",
        name: "New Laptop",
        targetAmount: 850,
        currentAmount: 420,
        currency: "USDT",
        lockedUntil: "2025-09-01",
        autoContribute: true,
        autoAmount: 50,
        autoFrequency: "monthly",
        status: "active",
        createdAt: "2025-03-15",
        emoji: "💻",
        type: "personal",
        interestRate: 2.0,
        interestEarned: 0.84,
        earlyPenalty: 5,
        goal: "MacBook Pro M3",
        withdrawalHistory: [],
    },
    {
        id: "sv_003",
        name: "Holiday 2025",
        targetAmount: 500_000,
        currentAmount: 500_000,
        currency: "XAF",
        lockedUntil: "2025-07-01",
        autoContribute: false,
        status: "locked",
        createdAt: "2025-01-10",
        emoji: "✈️",
        type: "personal",
        interestRate: 3.0,
        interestEarned: 10_200,
        earlyPenalty: 10,
        goal: "Summer vacation",
        withdrawalHistory: [],
    },
    {
        id: "sv_004",
        name: "Community School Fund",
        targetAmount: 5_000_000,
        currentAmount: 2_100_000,
        currency: "XAF",
        lockedUntil: "2026-01-01",
        autoContribute: true,
        autoAmount: 200_000,
        autoFrequency: "monthly",
        status: "active",
        createdAt: "2024-11-01",
        emoji: "🏫",
        type: "group",
        interestRate: 5.0,
        interestEarned: 22_000,
        earlyPenalty: 50,
        goal: "Build school library in Bamenda",
        members: [
            { id: "gsm_1", name: "Amara Tanko", avatar: "AT", contributed: 600_000, joinedAt: "2024-11-01", isAdmin: true },
            { id: "gsm_2", name: "Marie Ndongo", avatar: "MN", contributed: 400_000, joinedAt: "2024-11-05", isAdmin: false },
            { id: "gsm_3", name: "Pierre Fon", avatar: "PF", contributed: 500_000, joinedAt: "2024-11-10", isAdmin: false },
            { id: "gsm_4", name: "Grace Yuh", avatar: "GY", contributed: 350_000, joinedAt: "2024-12-01", isAdmin: false },
            { id: "gsm_5", name: "Daniel Mbi", avatar: "DM", contributed: 250_000, joinedAt: "2024-12-15", isAdmin: false },
        ],
        withdrawalHistory: [
            { id: "wd_001", amount: 100_000, date: "2025-03-15", penalty: 0, net: 100_000, reason: "Book purchase advance", status: "completed" },
        ],
    },
];

// ── P2P ORDERS ────────────────────────────────────────────────────────────

export interface P2POrder {
    id: string;
    type: "buy" | "sell";
    trader: string;
    traderAvatar: string;
    traderId: string;
    rating: number;
    completionRate: number;
    verified: boolean;
    online: boolean;
    currency: CurrencyCode;
    price: number;
    priceUnit: string;
    available: number;
    minLimit: number;
    maxLimit: number;
    paymentMethods: string[];
    trades: number;
    status: P2PStatus;
    createdAt: string;
    instructions?: string;
    paymentWindow: number;
}

export const mockP2POrders: P2POrder[] = [
    {
        id: "p2p_001", type: "sell", trader: "Brice Ngum", traderAvatar: "BN", traderId: "usr_010",
        rating: 4.9, completionRate: 98, verified: true, online: true,
        currency: "XAF", price: 1, priceUnit: "XAF", available: 500_000, minLimit: 10_000, maxLimit: 500_000,
        paymentMethods: ["MTN Mobile Money", "Orange Money"],
        trades: 142, status: "open", createdAt: "2025-06-04T10:00:00Z",
        instructions: "Send to MTN 677XXXXXX. Send proof in chat immediately.", paymentWindow: 15,
    },
    {
        id: "p2p_002", type: "sell", trader: "Fiona Che", traderAvatar: "FC", traderId: "usr_011",
        rating: 4.7, completionRate: 95, verified: true, online: true,
        currency: "XAF", price: 1, priceUnit: "XAF", available: 300_000, minLimit: 5_000, maxLimit: 300_000,
        paymentMethods: ["Bank Transfer", "MTN Mobile Money"],
        trades: 87, status: "open", createdAt: "2025-06-04T09:00:00Z",
        instructions: "Bank transfer to Afriland First Bank. Reference your username.", paymentWindow: 30,
    },
    {
        id: "p2p_003", type: "sell", trader: "Daniel Mbi", traderAvatar: "DM", traderId: "usr_012",
        rating: 4.5, completionRate: 91, verified: true, online: false,
        currency: "USDT", price: 620, priceUnit: "XAF/USDT", available: 1_200, minLimit: 10, maxLimit: 1_200,
        paymentMethods: ["MTN Mobile Money"],
        trades: 55, status: "open", createdAt: "2025-06-03T14:00:00Z",
        paymentWindow: 30,
    },
    {
        id: "p2p_004", type: "buy", trader: "Rachel Eno", traderAvatar: "RE", traderId: "usr_013",
        rating: 4.8, completionRate: 97, verified: true, online: true,
        currency: "NGN", price: 1, priceUnit: "NGN", available: 200_000, minLimit: 5_000, maxLimit: 200_000,
        paymentMethods: ["Bank Transfer"],
        trades: 203, status: "open", createdAt: "2025-06-04T08:00:00Z",
        paymentWindow: 15,
    },
    {
        id: "p2p_005", type: "buy", trader: "Joseph Lum", traderAvatar: "JL", traderId: "usr_014",
        rating: 4.3, completionRate: 88, verified: false, online: false,
        currency: "USDT", price: 618, priceUnit: "XAF/USDT", available: 500, minLimit: 20, maxLimit: 500,
        paymentMethods: ["Orange Money", "Bank Transfer"],
        trades: 31, status: "open", createdAt: "2025-06-02T16:00:00Z",
        paymentWindow: 60,
    },
    {
        id: "p2p_006", type: "sell", trader: "Emile Shu", traderAvatar: "ES", traderId: "usr_015",
        rating: 4.6, completionRate: 93, verified: true, online: true,
        currency: "NGN", price: 1, priceUnit: "NGN", available: 500_000, minLimit: 10_000, maxLimit: 500_000,
        paymentMethods: ["Bank Transfer"],
        trades: 74, status: "open", createdAt: "2025-06-04T11:00:00Z",
        paymentWindow: 30,
    },
];

// ── ESCROW TRADES ─────────────────────────────────────────────────────────

export interface EscrowTrade {
    id: string;
    orderId: string;
    buyer: string;
    buyerAvatar: string;
    seller: string;
    sellerAvatar: string;
    currency: CurrencyCode;
    amount: number;
    status: "locked" | "releasing" | "released" | "disputed" | "refunded";
    lockedAt: string;
    releasedAt?: string;
    paymentMethod: string;
    reference: string;
}

export const mockEscrowTrades: EscrowTrade[] = [
    {
        id: "esc_001", orderId: "p2p_001",
        buyer: "Amara Tanko", buyerAvatar: "AT",
        seller: "Brice Ngum", sellerAvatar: "BN",
        currency: "XAF", amount: 300_000,
        status: "locked", lockedAt: "2025-06-04T14:00:00Z",
        paymentMethod: "MTN Mobile Money", reference: "ESC-XAF-001",
    },
    {
        id: "esc_002", orderId: "p2p_003",
        buyer: "Fiona Che", buyerAvatar: "FC",
        seller: "Daniel Mbi", sellerAvatar: "DM",
        currency: "USDT", amount: 500,
        status: "released", lockedAt: "2025-06-03T10:00:00Z", releasedAt: "2025-06-03T10:45:00Z",
        paymentMethod: "MTN Mobile Money", reference: "ESC-USDT-002",
    },
];

// ── DISPUTES ──────────────────────────────────────────────────────────────

export interface Dispute {
    id: string;
    tradeId: string;
    raisedBy: string;
    avatar: string;
    against: string;
    againstAvatar: string;
    reason: string;
    description: string;
    status: DisputeStatus;
    raisedAt: string;
    resolvedAt?: string;
    moderator?: string;
    resolution?: string;
    amount: number;
    currency: CurrencyCode;
}

export const mockDisputes: Dispute[] = [
    {
        id: "dsp_001",
        tradeId: "esc_001",
        raisedBy: "Amara Tanko", avatar: "AT",
        against: "Brice Ngum", againstAvatar: "BN",
        reason: "Seller unresponsive after payment",
        description: "Sent XAF 300,000 to MTN 677XXXXXX. Seller has not released funds after 30 minutes.",
        status: "under_review",
        raisedAt: "2025-06-04T14:30:00Z",
        moderator: "Agent Kalu",
        amount: 300_000,
        currency: "XAF",
    },
];

// ── MARKETPLACE ───────────────────────────────────────────────────────────

export interface MarketCategory {
    id: string;
    name: string;
    icon: string;
    parent?: string;
    count: number;
}

export const MARKET_CATEGORIES: MarketCategory[] = [
    // Goods
    { id: "goods", name: "Goods", icon: "📦", count: 842 },
    { id: "electronics", name: "Electronics", icon: "📱", parent: "goods", count: 234 },
    { id: "fashion", name: "Fashion", icon: "👗", parent: "goods", count: 187 },
    { id: "furniture", name: "Home & Furniture", icon: "🛋️", parent: "goods", count: 95 },
    { id: "beauty", name: "Beauty & Cosmetics", icon: "💄", parent: "goods", count: 110 },
    { id: "groceries", name: "Groceries", icon: "🛒", parent: "goods", count: 63 },
    { id: "agricultural", name: "Agricultural", icon: "🌾", parent: "goods", count: 48 },
    { id: "books", name: "Books", icon: "📚", parent: "goods", count: 72 },
    // Services
    { id: "services", name: "Services", icon: "🛠️", count: 519 },
    { id: "hairdressing", name: "Hairdressing", icon: "💇", parent: "services", count: 44 },
    { id: "cleaning", name: "Cleaning", icon: "🧹", parent: "services", count: 38 },
    { id: "photography", name: "Photography", icon: "📸", parent: "services", count: 55 },
    { id: "catering", name: "Catering", icon: "🍽️", parent: "services", count: 62 },
    { id: "tailoring", name: "Tailoring", icon: "🧵", parent: "services", count: 33 },
    { id: "electrical", name: "Electrical Repairs", icon: "⚡", parent: "services", count: 27 },
    { id: "plumbing", name: "Plumbing", icon: "🔧", parent: "services", count: 19 },
    { id: "fitness", name: "Fitness Trainers", icon: "💪", parent: "services", count: 41 },
    { id: "nurses", name: "Licensed Nurses", icon: "🏥", parent: "services", count: 14 },
    // Learning
    { id: "learning", name: "Learning", icon: "🎓", count: 178 },
    { id: "tutors", name: "Home Tutors", icon: "📖", parent: "learning", count: 88 },
    { id: "courses", name: "Online Courses", icon: "💻", parent: "learning", count: 56 },
    { id: "ebooks", name: "E-Books", icon: "📱", parent: "learning", count: 34 },
    // Jobs
    { id: "jobs", name: "Jobs & Gigs", icon: "💼", count: 321 },
    { id: "fulltime", name: "Full-time Jobs", icon: "🏢", parent: "jobs", count: 92 },
    { id: "freelance", name: "Freelance Projects", icon: "🧑‍💻", parent: "jobs", count: 145 },
    { id: "tasks", name: "One-time Tasks", icon: "✅", parent: "jobs", count: 84 },
    // Property
    { id: "property", name: "Property", icon: "🏠", count: 214 },
    { id: "rent", name: "Houses for Rent", icon: "🔑", parent: "property", count: 88 },
    { id: "sale", name: "Houses for Sale", icon: "🏡", parent: "property", count: 56 },
    { id: "land", name: "Land", icon: "🌍", parent: "property", count: 34 },
    { id: "shortstay", name: "Short Stays", icon: "🛏️", parent: "property", count: 36 },
    // Mobility
    { id: "mobility", name: "Mobility", icon: "🚗", count: 97 },
    { id: "carrental", name: "Car Rental", icon: "🚘", parent: "mobility", count: 32 },
    { id: "logistics", name: "Logistics", icon: "🚚", parent: "mobility", count: 41 },
    // Events
    { id: "events", name: "Events & Tickets", icon: "🎫", count: 63 },
    { id: "concerts", name: "Concerts", icon: "🎵", parent: "events", count: 18 },
    { id: "conferences", name: "Conferences", icon: "🎤", parent: "events", count: 22 },
    { id: "sports", name: "Sports Events", icon: "⚽", parent: "events", count: 23 },
];

export interface MarketItem {
    id: string;
    title: string;
    price: number;
    currency: CurrencyCode;
    category: string;
    categoryParent: string;
    mediaType: "image" | "video";
    mediaEmoji: string;
    seller: string;
    sellerAvatar: string;
    sellerId: string;
    sellerRating: number;
    sellerSales: number;
    location: string;
    country: string;
    description: string;
    condition: "new" | "used" | "refurbished";
    escrow: boolean;
    createdAt: string;
    views: number;
    likes: number;
    isFeatured: boolean;
    negotiable: boolean;
    stock: number;
    tags: string[];
}

export const mockMarketItems: MarketItem[] = [
    {
        id: "mk_001", title: "iPhone 14 Pro — 256GB Space Black",
        price: 650, currency: "USDT", category: "electronics", categoryParent: "goods",
        mediaType: "image", mediaEmoji: "📱",
        seller: "Grace Yuh", sellerAvatar: "GY", sellerId: "usr_008", sellerRating: 4.8, sellerSales: 23,
        location: "Douala", country: "Cameroon",
        description: "Excellent condition. Original charger and box included. 8 months old, no scratches. Battery health 94%. Can negotiate slightly.",
        condition: "used", escrow: true, createdAt: "2025-06-01", views: 234, likes: 18, isFeatured: true, negotiable: true, stock: 1,
        tags: ["iPhone", "Apple", "Smartphone", "14 Pro"],
    },
    {
        id: "mk_002", title: "Samsung 65-inch 4K QLED Smart TV",
        price: 450_000, currency: "XAF", category: "electronics", categoryParent: "goods",
        mediaType: "image", mediaEmoji: "📺",
        seller: "Pierre Fon", sellerAvatar: "PF", sellerId: "usr_003", sellerRating: 4.6, sellerSales: 11,
        location: "Yaoundé", country: "Cameroon",
        description: "2023 Samsung QLED 4K. Remote, stand, and original box included. Works perfectly. No dead pixels.",
        condition: "used", escrow: true, createdAt: "2025-05-28", views: 87, likes: 7, isFeatured: false, negotiable: false, stock: 1,
        tags: ["Samsung", "TV", "4K", "Smart TV"],
    },
    {
        id: "mk_003", title: "Brand New Loncin 7KVA Generator",
        price: 380_000, currency: "XAF", category: "electronics", categoryParent: "goods",
        mediaType: "image", mediaEmoji: "⚡",
        seller: "Emile Shu", sellerAvatar: "ES", sellerId: "usr_005", sellerRating: 4.9, sellerSales: 44,
        location: "Bafoussam", country: "Cameroon",
        description: "Sealed box. Never used. Loncin 7KVA with remote start. 1-year manufacturer warranty. Receipt available.",
        condition: "new", escrow: true, createdAt: "2025-06-03", views: 156, likes: 22, isFeatured: true, negotiable: false, stock: 3,
        tags: ["Generator", "Loncin", "Power", "7KVA"],
    },
    {
        id: "mk_004", title: "L-Shaped Executive Office Desk",
        price: 85_000, currency: "XAF", category: "furniture", categoryParent: "goods",
        mediaType: "image", mediaEmoji: "🪑",
        seller: "Alice Tabi", sellerAvatar: "AB", sellerId: "usr_004", sellerRating: 4.4, sellerSales: 6,
        location: "Limbe", country: "Cameroon",
        description: "Good condition L-shaped desk. Minor edge wear. Very sturdy dark wood. Fits corner office setup.",
        condition: "used", escrow: false, createdAt: "2025-05-25", views: 43, likes: 3, isFeatured: false, negotiable: true, stock: 1,
        tags: ["Desk", "Office", "Furniture", "Executive"],
    },
    {
        id: "mk_005", title: "MacBook Pro M2 — 16GB 512GB Silver",
        price: 1_200, currency: "USDT", category: "electronics", categoryParent: "goods",
        mediaType: "image", mediaEmoji: "💻",
        seller: "Nadia Fru", sellerAvatar: "NF", sellerId: "usr_006", sellerRating: 4.7, sellerSales: 17,
        location: "Douala", country: "Cameroon",
        description: "2023 MacBook Pro M2. Perfect condition. AppleCare+ until June 2026. Comes with original charger.",
        condition: "used", escrow: true, createdAt: "2025-06-02", views: 312, likes: 41, isFeatured: true, negotiable: false, stock: 1,
        tags: ["MacBook", "Apple", "Laptop", "M2"],
    },
    {
        id: "mk_006", title: "Handwoven Kente Fabric — 6 Yards",
        price: 25_000, currency: "XAF", category: "fashion", categoryParent: "goods",
        mediaType: "image", mediaEmoji: "🎨",
        seller: "Marie Ndongo", sellerAvatar: "MN", sellerId: "usr_002", sellerRating: 5.0, sellerSales: 89,
        location: "Bamenda", country: "Cameroon",
        description: "Traditional handwoven kente. Rich multi-colour design. Perfect for ceremonies and cultural events. Can customise colours.",
        condition: "new", escrow: false, createdAt: "2025-06-04", views: 67, likes: 14, isFeatured: false, negotiable: true, stock: 10,
        tags: ["Kente", "Fabric", "Traditional", "Fashion"],
    },
    {
        id: "mk_007", title: "Professional Photography — Events",
        price: 50_000, currency: "XAF", category: "photography", categoryParent: "services",
        mediaType: "video", mediaEmoji: "📸",
        seller: "Daniel Mbi", sellerAvatar: "DM", sellerId: "usr_007", sellerRating: 4.8, sellerSales: 65,
        location: "Douala", country: "Cameroon",
        description: "Professional event photography. Full-day coverage, 300+ edited photos, delivered within 48h. Weddings, birthdays, corporate.",
        condition: "new", escrow: true, createdAt: "2025-05-30", views: 189, likes: 32, isFeatured: true, negotiable: true, stock: 999,
        tags: ["Photography", "Events", "Wedding", "Professional"],
    },
    {
        id: "mk_008", title: "Mathematics Home Tutor — GCSE/A-Level",
        price: 15_000, currency: "XAF", category: "tutors", categoryParent: "learning",
        mediaType: "video", mediaEmoji: "📖",
        seller: "Rachel Eno", sellerAvatar: "RE", sellerId: "usr_006", sellerRating: 4.9, sellerSales: 38,
        location: "Yaoundé", country: "Cameroon",
        description: "Certified Math tutor with 8 years experience. Specialises in GCSE, A-Level, and university entrance. Online or in-person.",
        condition: "new", escrow: true, createdAt: "2025-06-02", views: 94, likes: 11, isFeatured: false, negotiable: false, stock: 999,
        tags: ["Tutor", "Mathematics", "GCSE", "Education"],
    },
    {
        id: "mk_009", title: "3-Bedroom Apartment for Rent — Bonanjo",
        price: 120_000, currency: "XAF", category: "rent", categoryParent: "property",
        mediaType: "image", mediaEmoji: "🏠",
        seller: "Brice Ngum", sellerAvatar: "BN", sellerId: "usr_010", sellerRating: 4.5, sellerSales: 12,
        location: "Bonanjo, Douala", country: "Cameroon",
        description: "Modern 3-bed, 2-bath apartment. Fully tiled, 24/7 security, parking. 6-month minimum lease. Water and electricity included.",
        condition: "new", escrow: true, createdAt: "2025-06-01", views: 441, likes: 56, isFeatured: true, negotiable: true, stock: 1,
        tags: ["Apartment", "Rent", "Douala", "Bonanjo"],
    },
    {
        id: "mk_010", title: "Toyota Corolla 2018 — Automatic",
        price: 7_500_000, currency: "XAF", category: "sale", categoryParent: "goods",
        mediaType: "image", mediaEmoji: "🚗",
        seller: "Joseph Lum", sellerAvatar: "JL", sellerId: "usr_005", sellerRating: 4.2, sellerSales: 4,
        location: "Yaoundé", country: "Cameroon",
        description: "2018 Toyota Corolla LE. 62,000 km. Full service history. Clean interior. Silver metallic. No accidents.",
        condition: "used", escrow: true, createdAt: "2025-05-29", views: 538, likes: 74, isFeatured: true, negotiable: true, stock: 1,
        tags: ["Toyota", "Corolla", "Car", "Automobile"],
    },
];

// ── CROSS-BORDER TRANSFERS ────────────────────────────────────────────────

export interface CrossBorderTransfer {
    id: string;
    fromCurrency: CurrencyCode;
    toCurrency: CurrencyCode;
    fromAmount: number;
    toAmount: number;
    fee: number;
    rate: number;
    recipient: string;
    recipientAvatar: string;
    recipientPhone: string;
    recipientBank?: string;
    country: string;
    status: "pending" | "processing" | "completed" | "failed";
    createdAt: string;
    completedAt?: string;
    estimatedArrival: string;
    reference: string;
    paymentMethod: string;
    note?: string;
}

export const mockCrossBorderTransfers: CrossBorderTransfer[] = [
    {
        id: "cb_001",
        fromCurrency: "XAF", toCurrency: "NGN",
        fromAmount: 130_000, toAmount: 49_800,
        fee: 650, rate: 0.385,
        recipient: "Chidi Obi", recipientAvatar: "CO",
        recipientPhone: "+234 801 234 5678", recipientBank: "GTBank",
        country: "Nigeria",
        status: "completed",
        createdAt: "2025-06-04T10:12:00Z", completedAt: "2025-06-04T10:18:00Z",
        estimatedArrival: "Instant",
        reference: "CB-XAF-NGN-001",
        paymentMethod: "Bank Transfer",
    },
    {
        id: "cb_002",
        fromCurrency: "USDT", toCurrency: "XAF",
        fromAmount: 100, toAmount: 61_800,
        fee: 1, rate: 620,
        recipient: "Marie Ndongo", recipientAvatar: "MN",
        recipientPhone: "+237 677 234 567", recipientBank: "Afriland First Bank",
        country: "Cameroon",
        status: "processing",
        createdAt: "2025-06-04T15:00:00Z",
        estimatedArrival: "5–10 min",
        reference: "CB-USDT-XAF-002",
        paymentMethod: "MTN Mobile Money",
    },
    {
        id: "cb_003",
        fromCurrency: "NGN", toCurrency: "GHS",
        fromAmount: 50_000, toAmount: 475,
        fee: 500, rate: 0.0095,
        recipient: "Kwame Asante", recipientAvatar: "KA",
        recipientPhone: "+233 244 567 890", recipientBank: "GCB Bank",
        country: "Ghana",
        status: "completed",
        createdAt: "2025-05-30T09:00:00Z", completedAt: "2025-05-30T09:22:00Z",
        estimatedArrival: "15–30 min",
        reference: "CB-NGN-GHS-003",
        paymentMethod: "Bank Transfer",
        note: "Send to Kwame for shared project",
    },
];

export interface Recipient {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    country: string;
    currency: CurrencyCode;
    bank?: string;
    accountNo?: string;
    recent: boolean;
    savedAt: string;
    totalSent: number;
}

export const mockRecipients: Recipient[] = [
    { id: "r1", name: "Chidi Obi", avatar: "CO", phone: "+234 801 234 5678", country: "Nigeria", currency: "NGN", bank: "GTBank", accountNo: "014XXXXXX", recent: true, savedAt: "2025-06-04", totalSent: 250_000 },
    { id: "r2", name: "Marie Ndongo", avatar: "MN", phone: "+237 677 234 567", country: "Cameroon", currency: "XAF", bank: "Afriland First Bank", accountNo: "001XXXXXX", recent: true, savedAt: "2025-06-02", totalSent: 800_000 },
    { id: "r3", name: "Kwame Asante", avatar: "KA", phone: "+233 244 567 890", country: "Ghana", currency: "USDT", recent: false, savedAt: "2025-05-15", totalSent: 1_500 },
    { id: "r4", name: "Fatima Diallo", avatar: "FD", phone: "+221 77 234 5678", country: "Senegal", currency: "XAF", bank: "CBAO", recent: false, savedAt: "2025-04-20", totalSent: 350_000 },
];

// ── CHAT MESSAGES ─────────────────────────────────────────────────────────

export interface ChatMessage {
    id: string;
    sender: string;
    senderAvatar: string;
    senderId: string;
    content: string;
    timestamp: string;
    type: "text" | "image" | "file" | "system" | "offer";
    read: boolean;
    pinned?: boolean;
    offerAmount?: number;
    offerCurrency?: CurrencyCode;
}

export interface Conversation {
    id: string;
    with: string;
    withAvatar: string;
    withId: string;
    context: "marketplace" | "p2p" | "njangi" | "crossborder" | "general";
    contextId?: string;
    contextLabel?: string;
    lastMessage: string;
    lastAt: string;
    unread: number;
    online: boolean;
    pinned: boolean;
}

export const mockConversations: Conversation[] = [
    { id: "conv_001", with: "Grace Yuh", withAvatar: "GY", withId: "usr_008", context: "marketplace", contextId: "mk_001", contextLabel: "iPhone 14 Pro", lastMessage: "Yes escrow is fine. Let me create the order.", lastAt: "2025-06-04T08:06:00Z", unread: 1, online: true, pinned: true },
    { id: "conv_002", with: "Brice Ngum", withAvatar: "BN", withId: "usr_010", context: "p2p", contextId: "p2p_001", contextLabel: "P2P Trade #P001", lastMessage: "Send to MTN 677XXXXXX right away.", lastAt: "2025-06-04T14:10:00Z", unread: 2, online: true, pinned: false },
    { id: "conv_003", with: "Famille Tanko", withAvatar: "FT", withId: "nj_001", context: "njangi", contextId: "nj_001", contextLabel: "Famille Tanko", lastMessage: "Admin: Cycle 3 payout confirmed for Cecile 🎉", lastAt: "2025-06-04T14:35:00Z", unread: 0, online: false, pinned: true },
    { id: "conv_004", with: "Chidi Obi", withAvatar: "CO", withId: "r1", context: "crossborder", contextId: "cb_001", contextLabel: "NGN Transfer", lastMessage: "Received it, thank you!", lastAt: "2025-06-04T10:25:00Z", unread: 0, online: false, pinned: false },
];

export const mockMessages: ChatMessage[] = [
    { id: "msg_001", sender: "Grace Yuh", senderAvatar: "GY", senderId: "usr_008", content: "Hello! Is the iPhone still available?", timestamp: "2025-06-04T08:00:00Z", type: "text", read: true },
    { id: "msg_002", sender: "Amara Tanko", senderAvatar: "AT", senderId: "usr_001", content: "Yes it is! I can meet in Douala anytime this week.", timestamp: "2025-06-04T08:02:00Z", type: "text", read: true },
    { id: "msg_003", sender: "Grace Yuh", senderAvatar: "GY", senderId: "usr_008", content: "Can you do 620 USDT with escrow?", timestamp: "2025-06-04T08:05:00Z", type: "text", read: true, offerAmount: 620, offerCurrency: "USDT" },
    { id: "msg_004", sender: "Amara Tanko", senderAvatar: "AT", senderId: "usr_001", content: "Yes escrow is fine. Let me create the order.", timestamp: "2025-06-04T08:06:00Z", type: "text", read: false },
    { id: "msg_005", sender: "System", senderAvatar: "TF", senderId: "system", content: "Escrow order created. Funds locked. Release on confirmation.", timestamp: "2025-06-04T08:07:00Z", type: "system", read: false, pinned: true },
];

// ── NOTIFICATIONS ─────────────────────────────────────────────────────────

export type NotificationType =
    | "contribution" | "payout" | "security" | "transfer"
    | "system" | "p2p" | "marketplace" | "referral"
    | "savings" | "kyc" | "dispute" | "crossborder";

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    read: boolean;
    timestamp: string;
    actionUrl?: string;
    icon?: string;
    priority: "low" | "medium" | "high";
}

export const mockNotifications: Notification[] = [
    { id: "n01", type: "contribution", priority: "high", title: "Contribution Due", message: "Your XAF 75,000 contribution to Staff Savings is due in 3 days.", read: false, timestamp: "2025-06-04T09:00:00Z", actionUrl: "/njangi/nj_002", icon: "💰" },
    { id: "n02", type: "payout", priority: "high", title: "Njangi Payout Received", message: "You received XAF 750,000 from Famille Tanko. Congrats Cecile! 🎉", read: false, timestamp: "2025-06-04T14:30:00Z", actionUrl: "/njangi/nj_001", icon: "🎉" },
    { id: "n03", type: "security", priority: "high", title: "New Login Detected", message: "A new login was detected from Douala, Cameroon on Chrome.", read: true, timestamp: "2025-06-03T22:15:00Z", actionUrl: "/settings", icon: "🛡️" },
    { id: "n04", type: "transfer", priority: "medium", title: "Transfer Successful", message: "NGN 50,000 sent to Chidi Obi. Reference: TF-500002.", read: true, timestamp: "2025-06-04T10:12:00Z", actionUrl: "/wallet", icon: "↗️" },
    { id: "n05", type: "kyc", priority: "low", title: "KYC Verified ✓", message: "Your identity has been successfully verified. Full access unlocked.", read: true, timestamp: "2025-05-20T11:00:00Z", actionUrl: "/kyc", icon: "🪪" },
    { id: "n06", type: "p2p", priority: "high", title: "P2P Order Matched", message: "Your buy order of XAF 300,000 has been matched with Brice Ngum.", read: false, timestamp: "2025-06-03T16:00:00Z", actionUrl: "/p2p/p2p_001", icon: "🔄" },
    { id: "n07", type: "marketplace", priority: "medium", title: "New Message on Listing", message: "Grace Yuh sent a message about iPhone 14 Pro.", read: false, timestamp: "2025-06-04T08:00:00Z", actionUrl: "/marketplace/mk_001", icon: "🛍️" },
    { id: "n08", type: "referral", priority: "medium", title: "Referral Bonus Earned 🎁", message: "Grace Yuh joined TaboFins using your code. You earned XAF 5,000!", read: true, timestamp: "2025-06-02T12:00:00Z", actionUrl: "/profile", icon: "🎁" },
    { id: "n09", type: "savings", priority: "low", title: "Auto-Save Deducted", message: "XAF 100,000 auto-saved to Emergency Fund vault.", read: true, timestamp: "2025-06-03T08:00:00Z", actionUrl: "/savings", icon: "🔒" },
    { id: "n10", type: "dispute", priority: "high", title: "Dispute Assigned", message: "Agent Kalu has been assigned to your dispute DSP-20250604-001.", read: false, timestamp: "2025-06-04T15:00:00Z", actionUrl: "/p2p/dispute", icon: "⚖️" },
    { id: "n11", type: "crossborder", priority: "medium", title: "Transfer Delivered", message: "XAF 130,000 → NGN 49,800 delivered to Chidi Obi in 6 minutes.", read: true, timestamp: "2025-06-04T10:18:00Z", actionUrl: "/crossborder", icon: "🌍" },
    { id: "n12", type: "contribution", priority: "medium", title: "Penalty Applied", message: "A 5% late penalty of XAF 7,500 was applied to Joseph Lum in Famille Tanko.", read: true, timestamp: "2025-06-03T09:00:00Z", actionUrl: "/njangi/nj_001", icon: "⚠️" },
    { id: "n13", type: "p2p", priority: "low", title: "Trade History Updated", message: "Your completed P2P trades now show on your profile.", read: true, timestamp: "2025-06-02T10:00:00Z", actionUrl: "/p2p", icon: "🔄" },
    { id: "n14", type: "marketplace", priority: "low", title: "Listing Views Milestone", message: "Your MacBook listing reached 300 views!", read: true, timestamp: "2025-06-03T14:00:00Z", actionUrl: "/marketplace", icon: "👁️" },
    { id: "n15", type: "referral", priority: "low", title: "Referral Tier Upgraded", message: "You've reached Silver tier with 12 referrals. Bonus rate now 3.5%.", read: false, timestamp: "2025-06-04T07:00:00Z", actionUrl: "/profile", icon: "🏅" },
];

// ── REFERRAL SYSTEM ───────────────────────────────────────────────────────

export interface ReferralUser {
    id: string;
    name: string;
    avatar: string;
    joinedAt: string;
    status: "active" | "pending" | "inactive";
    earnings: number;
    level: number;
    referrals: number;
}

export interface CommissionRecord {
    id: string;
    from: string;
    avatar: string;
    type: "signup" | "trade" | "njangi" | "savings";
    amount: number;
    currency: CurrencyCode;
    date: string;
    status: "paid" | "pending";
}

export interface LeaderboardEntry {
    rank: number;
    name: string;
    avatar: string;
    referrals: number;
    earnings: number;
    currency: CurrencyCode;
    badge: string;
    isMe: boolean;
}

export const mockReferralTree: ReferralUser[] = [
    { id: "ref_01", name: "Grace Yuh", avatar: "GY", joinedAt: "2025-06-02", status: "active", earnings: 5_000, level: 1, referrals: 3 },
    { id: "ref_02", name: "Daniel Mbi", avatar: "DM", joinedAt: "2025-05-20", status: "active", earnings: 5_000, level: 1, referrals: 1 },
    { id: "ref_03", name: "Rachel Eno", avatar: "RE", joinedAt: "2025-05-18", status: "active", earnings: 5_000, level: 1, referrals: 2 },
    { id: "ref_04", name: "Emile Shu", avatar: "ES", joinedAt: "2025-04-10", status: "active", earnings: 5_000, level: 1, referrals: 0 },
    { id: "ref_05", name: "Fiona Che", avatar: "FC", joinedAt: "2025-04-05", status: "inactive", earnings: 5_000, level: 1, referrals: 0 },
    { id: "ref_06", name: "Blessing O.", avatar: "BO", joinedAt: "2025-06-01", status: "active", earnings: 2_500, level: 2, referrals: 0 },
    { id: "ref_07", name: "Emmanuel T.", avatar: "ET", joinedAt: "2025-06-02", status: "pending", earnings: 0, level: 2, referrals: 0 },
];

export const mockCommissions: CommissionRecord[] = [
    { id: "cm_01", from: "Grace Yuh", avatar: "GY", type: "signup", amount: 5_000, currency: "XAF", date: "2025-06-02", status: "paid" },
    { id: "cm_02", from: "Daniel Mbi", avatar: "DM", type: "trade", amount: 1_500, currency: "XAF", date: "2025-05-25", status: "paid" },
    { id: "cm_03", from: "Rachel Eno", avatar: "RE", type: "signup", amount: 5_000, currency: "XAF", date: "2025-05-18", status: "paid" },
    { id: "cm_04", from: "Rachel Eno", avatar: "RE", type: "njangi", amount: 2_000, currency: "XAF", date: "2025-06-01", status: "paid" },
    { id: "cm_05", from: "Emile Shu", avatar: "ES", type: "signup", amount: 5_000, currency: "XAF", date: "2025-04-10", status: "paid" },
    { id: "cm_06", from: "Fiona Che", avatar: "FC", type: "signup", amount: 5_000, currency: "XAF", date: "2025-04-05", status: "paid" },
    { id: "cm_07", from: "Grace Yuh", avatar: "GY", type: "savings", amount: 800, currency: "XAF", date: "2025-06-03", status: "pending" },
];

export const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: "Ngozi Adeyemi", avatar: "NA", referrals: 48, earnings: 240_000, currency: "XAF", badge: "🥇", isMe: false },
    { rank: 2, name: "Kwame Asante", avatar: "KA", referrals: 35, earnings: 175_000, currency: "XAF", badge: "🥈", isMe: false },
    { rank: 3, name: "Fatou Diallo", avatar: "FD", referrals: 29, earnings: 145_000, currency: "XAF", badge: "🥉", isMe: false },
    { rank: 4, name: "Pierre Fon", avatar: "PF", referrals: 22, earnings: 110_000, currency: "XAF", badge: "🏅", isMe: false },
    { rank: 5, name: "Brice Ngum", avatar: "BN", referrals: 18, earnings: 90_000, currency: "XAF", badge: "🏅", isMe: false },
    { rank: 11, name: "Tabotino J.", avatar: "TJ", referrals: 12, earnings: 60_000, currency: "XAF", badge: "🎖️", isMe: true },
];

// ── KYC ───────────────────────────────────────────────────────────────────

export interface KYCStep {
    id: string;
    label: string;
    status: "completed" | "verified" | "pending" | "rejected" ;
    updatedAt: string | null;
    note?: string;
}

export interface KYCDoc {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    userEmail: string;
    userPhone: string;
    submittedAt: string;
    reviewedAt?: string;
    status: KYCStatus;
    idType: string;
    country: string;
    idNumber?: string;
    idFrontEmoji: string;
    selfieEmoji: string;
    address: string;
    reviewedBy?: string;
    rejectReason?: string;
    riskScore: number;
}

export const mockKYCSteps: KYCStep[] = [
    { id: "kyc_step_1", label: "Email Verification", status: "completed", updatedAt: "2024-09-15T10:00:00Z" },
    { id: "kyc_step_2", label: "Phone Verification", status: "completed", updatedAt: "2024-09-15T10:05:00Z" },
    { id: "kyc_step_3", label: "Identity Document", status: "completed", updatedAt: "2025-05-20T11:00:00Z" },
    { id: "kyc_step_4", label: "Selfie Verification", status: "completed", updatedAt: "2025-05-20T11:02:00Z" },
    { id: "kyc_step_5", label: "Address Verification", status: "completed", updatedAt: "2025-05-20T11:10:00Z" },
    { id: "kyc_step_6", label: "AML Screening", status: "completed", updatedAt: "2025-05-20T11:30:00Z" },
];

export const mockKYCQueue: KYCDoc[] = [
    { id: "kyc_001", userId: "usr_020", userName: "Emmanuel Tah", userAvatar: "ET", userEmail: "emmanuel@gmail.com", userPhone: "+237 677 100 001", submittedAt: "2025-06-04T07:00:00Z", status: "pending", idType: "National ID", country: "Cameroon", idFrontEmoji: "🪪", selfieEmoji: "🤳", address: "Akwa, Douala, Cameroon", riskScore: 12 },
    { id: "kyc_002", userId: "usr_021", userName: "Blessing Okafor", userAvatar: "BO", userEmail: "blessing@gmail.com", userPhone: "+234 801 200 002", submittedAt: "2025-06-04T06:30:00Z", status: "pending", idType: "Passport", country: "Nigeria", idFrontEmoji: "🛂", selfieEmoji: "🤳", address: "Victoria Island, Lagos", riskScore: 8 },
    { id: "kyc_003", userId: "usr_022", userName: "Fatima Diallo", userAvatar: "FD", userEmail: "fatima@gmail.com", userPhone: "+221 77 300 003", submittedAt: "2025-06-03T22:00:00Z", reviewedAt: "2025-06-04T08:00:00Z", status: "pending", idType: "National ID", country: "Senegal", idFrontEmoji: "🪪", selfieEmoji: "🤳", address: "Plateau, Dakar, Senegal", reviewedBy: "Agent Kalu", riskScore: 5 },
    { id: "kyc_004", userId: "usr_023", userName: "Kevin Njoku", userAvatar: "KN", userEmail: "kevin@gmail.com", userPhone: "+234 802 400 004", submittedAt: "2025-06-03T18:00:00Z", reviewedAt: "2025-06-04T07:00:00Z", status: "rejected", idType: "Driver License", country: "Nigeria", idFrontEmoji: "🪪", selfieEmoji: "🤳", address: "Ikeja, Lagos, Nigeria", reviewedBy: "Agent Kalu", rejectReason: "ID image blurry. Please resubmit.", riskScore: 22 },
    { id: "kyc_005", userId: "usr_024", userName: "Aisha Bello", userAvatar: "AB", userEmail: "aisha@gmail.com", userPhone: "+234 803 500 005", submittedAt: "2025-06-04T09:00:00Z", status: "pending", idType: "National ID", country: "Nigeria", idFrontEmoji: "🪪", selfieEmoji: "🤳", address: "Abuja, FCT, Nigeria", riskScore: 6 },
    { id: "kyc_006", userId: "usr_025", userName: "Kofi Mensah", userAvatar: "KM", userEmail: "kofi@gmail.com", userPhone: "+233 244 600 006", submittedAt: "2025-06-04T05:00:00Z", status: "pending", idType: "Passport", country: "Ghana", idFrontEmoji: "🛂", selfieEmoji: "🤳", address: "East Legon, Accra, Ghana", riskScore: 3 },
];

// ── FRONT DESK / ADMIN ────────────────────────────────────────────────────

export interface FrontDeskAgent {
    id: string;
    name: string;
    avatar: string;
    reviewed: number;
    approved: number;
    rejected: number;
    avgReviewTime: string;
    onDuty: boolean;
}

export const mockFrontDeskAgents: FrontDeskAgent[] = [
    { id: "agent_001", name: "Agent Kalu", avatar: "AK", reviewed: 142, approved: 128, rejected: 14, avgReviewTime: "4.2 min", onDuty: true },
    { id: "agent_002", name: "Agent Njideka", avatar: "AN", reviewed: 98, approved: 89, rejected: 9, avgReviewTime: "5.8 min", onDuty: true },
    { id: "agent_003", name: "Agent Obinna", avatar: "AO", reviewed: 67, approved: 61, rejected: 6, avgReviewTime: "6.1 min", onDuty: false },
];

export interface AdminStats {
    totalUsers: number;
    verifiedUsers: number;
    pendingKYC: number;
    activeNjangis: number;
    totalEscrow: number;
    totalVolume30d: number;
    activeDisputes: number;
    platformRevenue30d: number;
    newUsersToday: number;
    p2pTradesTotal: number;
}

export const mockAdminStats: AdminStats = {
    totalUsers: 12_847,
    verifiedUsers: 9_234,
    pendingKYC: 48,
    activeNjangis: 1_203,
    totalEscrow: 184_200,
    totalVolume30d: 2_840_000_000,
    activeDisputes: 7,
    platformRevenue30d: 28_400_000,
    newUsersToday: 84,
    p2pTradesTotal: 34_782,
};

// ── DASHBOARD STATISTICS ──────────────────────────────────────────────────

export interface DashboardStats {
    totalBalanceUSD: number;
    totalBalanceXAF: number;
    activeNjangis: number;
    totalSavings: number;
    pendingContribs: number;
    trustScore: number;
    completedTrades: number;
    referralEarnings: number;
    monthlyChange: number;
    savingsChange: number;
}

export const mockDashboardStats: DashboardStats = {
    totalBalanceUSD: 35_628,
    totalBalanceXAF: 22_090_360,
    activeNjangis: 2,
    totalSavings: 3_220_000,
    pendingContribs: 1,
    trustScore: 94,
    completedTrades: 47,
    referralEarnings: 60_000,
    monthlyChange: 8.4,
    savingsChange: 12.1,
};

// ── CHARTS & ANALYTICS ────────────────────────────────────────────────────

export interface ChartDataPoint {
    label: string;
    value: number;
    value2?: number;
}

export const mockBalanceHistory: ChartDataPoint[] = [
    { label: "Jan", value: 8_500_000 },
    { label: "Feb", value: 11_200_000 },
    { label: "Mar", value: 9_800_000 },
    { label: "Apr", value: 14_300_000 },
    { label: "May", value: 18_700_000 },
    { label: "Jun", value: 22_090_360 },
];

export const mockSavingsGrowth: ChartDataPoint[] = [
    { label: "Jan", value: 500_000 },
    { label: "Feb", value: 800_000 },
    { label: "Mar", value: 1_100_000 },
    { label: "Apr", value: 1_800_000 },
    { label: "May", value: 2_600_000 },
    { label: "Jun", value: 3_220_000 },
];

export const mockP2PVolume: ChartDataPoint[] = [
    { label: "Mon", value: 1_200_000, value2: 800_000 },
    { label: "Tue", value: 2_400_000, value2: 1_100_000 },
    { label: "Wed", value: 1_800_000, value2: 2_200_000 },
    { label: "Thu", value: 3_100_000, value2: 1_400_000 },
    { label: "Fri", value: 4_500_000, value2: 3_800_000 },
    { label: "Sat", value: 2_200_000, value2: 1_900_000 },
    { label: "Sun", value: 1_000_000, value2: 700_000 },
];

export const mockCategorySpend: ChartDataPoint[] = [
    { label: "Njangi", value: 750_000 },
    { label: "Transfers", value: 350_000 },
    { label: "Savings", value: 200_000 },
    { label: "P2P", value: 300_000 },
    { label: "Marketplace", value: 150_000 },
    { label: "Other", value: 50_000 },
];

// ── QUICK ACTIONS ─────────────────────────────────────────────────────────

export interface QuickAction {
    id: string;
    label: string;
    icon: string;
    href: string;
    color: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
    { id: "qa_1", label: "Send Money", icon: "↗️", href: "/crossborder", color: "var(--electric)" },
    { id: "qa_2", label: "Join Njangi", icon: "🤝", href: "/njangi", color: "var(--gold2)" },
    { id: "qa_3", label: "P2P Trade", icon: "🔄", href: "/p2p", color: "var(--green)" },
    { id: "qa_4", label: "Save Money", icon: "🔒", href: "/savings", color: "#7eb8ff" },
    { id: "qa_5", label: "Marketplace", icon: "🛍️", href: "/marketplace", color: "var(--gold2)" },
    { id: "qa_6", label: "Deposit", icon: "💳", href: "/wallet", color: "var(--electric)" },
];

// ── SIDEBAR NAVIGATION ────────────────────────────────────────────────────

export interface NavItem {
    href: string;
    icon: string;
    label: string;
    badge?: number;
    group?: string;
}

export const SIDEBAR_NAV: NavItem[] = [
    { href: "/dashboard", icon: "⊞", label: "Dashboard", group: "main" },
    { href: "/wallet", icon: "💳", label: "Wallet", group: "finance" },
    { href: "/njangi", icon: "🤝", label: "Njangi", group: "finance" },
    { href: "/savings", icon: "🔒", label: "Savings", group: "finance" },
    { href: "/p2p", icon: "🔄", label: "P2P Exchange", group: "trade" },
    { href: "/crossborder", icon: "🌍", label: "Cross Border", group: "trade" },
    { href: "/marketplace", icon: "🛍️", label: "Marketplace", group: "trade" },
    { href: "/notifications", icon: "🔔", label: "Notifications", group: "account" },
    { href: "/profile", icon: "👤", label: "Profile", group: "account" },
    { href: "/settings", icon: "⚙️", label: "Settings", group: "account" },
];

// ── TERMS & CONDITIONS ────────────────────────────────────────────────────

export interface TermsSection {
    id: string;
    title: string;
    icon: string;
    content: TermsParagraph[];
}

export interface TermsParagraph {
    heading?: string;
    body: string;
}

export const TERMS_SECTIONS: TermsSection[] = [
    {
        id: "privacy", title: "Privacy Policy", icon: "🔐",
        content: [
            { heading: "What We Collect", body: "We collect your name, email, phone number, government-issued identity documents, and financial transaction data. This data is necessary to operate the TaboFins platform and comply with applicable financial regulations." },
            { heading: "How We Use It", body: "Your data is used exclusively to operate your account, process transactions, verify your identity, prevent fraud, and improve our services. We do not sell your personal data to third parties." },
            { heading: "Data Security", body: "All data is encrypted at rest and in transit using industry-standard AES-256 and TLS 1.3 protocols. Our infrastructure is hosted on ISO-27001 certified servers." },
            { heading: "Data Retention", body: "We retain transaction records for 7 years as required by financial regulations. You may request deletion of non-essential data by contacting support@tabofins.com." },
            { heading: "Your Rights", body: "You have the right to access, correct, port, or request deletion of your data. You may also object to processing in certain circumstances. Contact us to exercise these rights." },
        ],
    },
    {
        id: "community", title: "Community Rules", icon: "🤝",
        content: [
            { heading: "Respect", body: "All members must treat each other with respect. Harassment, threats, hate speech, or discrimination of any kind will result in immediate account suspension." },
            { heading: "Honesty", body: "Misrepresentation of yourself, your products, or your financial position is prohibited. Listing fake goods or services will result in permanent ban and possible legal action." },
            { heading: "Fair Trading", body: "All P2P and marketplace transactions must be conducted in good faith. Attempting to circumvent escrow or conduct transactions outside the platform is prohibited." },
            { heading: "Group Conduct", body: "Njangi group members are expected to contribute on time and communicate openly. Deliberate defaults without communication may result in expulsion and penalty enforcement." },
        ],
    },
    {
        id: "kyc", title: "KYC Policy", icon: "🪪",
        content: [
            { heading: "Why KYC Is Required", body: "TaboFins is a regulated financial platform. We are required by law to verify the identity of all users before allowing access to financial services including njangi, transfers, and P2P trading." },
            { heading: "What You Must Submit", body: "You must submit a valid government-issued photo ID (National ID, Passport, or Driver's License), a live selfie, and proof of address. All documents must be clear, unaltered, and not expired." },
            { heading: "Processing Time", body: "KYC is typically reviewed within 30 minutes during business hours. Complex cases may take up to 24 hours. You will be notified by email and in-app notification." },
            { heading: "Rejection & Resubmission", body: "If your KYC is rejected, you will receive a specific reason. You may resubmit corrected documents immediately. Repeated submissions with fraudulent documents will result in a permanent ban." },
            { heading: "Enhanced Due Diligence", body: "Users performing high-value transactions (above XAF 5,000,000 or equivalent) may be subject to additional verification including source of funds documentation." },
        ],
    },
    {
        id: "escrow", title: "Escrow Policy", icon: "🔒",
        content: [
            { heading: "How Escrow Works", body: "When a P2P or marketplace trade is initiated, the seller's funds are locked in a TaboFins escrow account. The buyer then makes payment. Upon buyer confirmation, funds are released to the buyer. This protects both parties." },
            { heading: "Release Conditions", body: "Funds are released only when the seller confirms receipt of payment or a moderator authorises release after a dispute. Automatic release occurs 24 hours after buyer confirms if seller does not respond." },
            { heading: "Escrow Fees", body: "Escrow is free for all marketplace and P2P transactions under XAF 1,000,000 equivalent. A 0.5% fee applies to transactions above this threshold." },
            { heading: "Refund Policy", body: "If a trade fails or a dispute is resolved in the buyer's favour, funds are returned to the seller's wallet within 1 business day." },
        ],
    },
    {
        id: "disputes", title: "Dispute Resolution", icon: "⚖️",
        content: [
            { heading: "Raising a Dispute", body: "Either party may raise a dispute within 24 hours of a trade being marked as paid. Disputes must include evidence such as payment receipts, screenshots, or transaction references." },
            { heading: "Moderation Process", body: "A TaboFins moderator will review all evidence within 24 hours. Both parties will be given equal opportunity to present their case via the dispute chat." },
            { heading: "Njangi Conflicts", body: "Group administrators may pause a Njangi during active conflicts. The system will enforce a mediation period of up to 72 hours before admin resolution." },
            { heading: "Penalty for False Claims", body: "Members found to have raised a dispute in bad faith or submitted fabricated evidence will face a penalty of 10% of the disputed amount and a trust score reduction." },
            { heading: "Final Decision", body: "Moderator decisions are final. In cases of significant amounts (above XAF 500,000 equivalent) users may escalate to the TaboFins Legal & Compliance team." },
        ],
    },
    {
        id: "njangi_rules", title: "Njangi Rules", icon: "🤝",
        content: [
            { heading: "Penalty Structure", body: "Late contributions incur a 5% penalty of the contribution amount. This is distributed as follows: 30% to the system, 30% to the current cycle beneficiary, and 40% to the group reserve wallet." },
            { heading: "Reserve Wallet", body: "The reserve wallet accumulates 40% of all penalties. At the end of the Njangi (when the last member receives their payout), the reserve wallet balance is distributed equally among all members." },
            { heading: "Missed Contributions", body: "Missing two consecutive cycles without prior communication may result in expulsion from the group by admin vote. Any funds owed remain as a debt tracked by the system." },
            { heading: "Pausing a Njangi", body: "Only the group admin may pause a Njangi. During a pause, no contributions are due and no penalties accrue. The cycle timeline is extended by the duration of the pause." },
            { heading: "Leaving a Group Savings", body: "Members who leave a group savings vault forfeit 50% of their contributed amount. 25% is redistributed to remaining members and 25% goes to the platform." },
        ],
    },
];

// ── HELPER FUNCTIONS ──────────────────────────────────────────────────────

export function formatCurrency(amount: number, currency: string): string {
    if (currency === "USDT") return amount.toLocaleString(undefined, { maximumFractionDigits: 2 }) + " USDT";
    if (currency === "NGN") return "₦" + amount.toLocaleString();
    if (currency === "GHS") return "₵" + amount.toLocaleString(undefined, { maximumFractionDigits: 2 });
    if (currency === "KES") return "KSh " + amount.toLocaleString(undefined, { maximumFractionDigits: 2 });
    return "XAF " + amount.toLocaleString();
}

export function timeAgo(timestamp: string): string {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function pct(current: number, target: number): number {
    return Math.min(100, Math.round((current / target) * 100));
}

export function penaltyBreakdown(amount: number): { system: number; beneficiary: number; reserve: number } {
    return {
        system: Math.round(amount * 0.30),
        beneficiary: Math.round(amount * 0.30),
        reserve: Math.round(amount * 0.40),
    };
}

export function calcTransferFee(amount: number, currency: string): number {
    if (currency === "USDT") return Math.max(0.5, amount * 0.005);
    return Math.max(500, Math.round(amount * 0.005));
}

export function estimatedArrival(fromCountry: string, toCountry: string): string {
    if (fromCountry === toCountry) return "Instant";
    const sameRegion = ["Cameroon", "Senegal", "Côte d'Ivoire"].includes(fromCountry) &&
        ["Cameroon", "Senegal", "Côte d'Ivoire"].includes(toCountry);
    if (sameRegion) return "1–5 minutes";
    return "5–30 minutes";
}