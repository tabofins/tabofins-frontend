export interface WalletBalance { currency: "XAF" | "NGN" | "USDT"; amount: number; usdEquivalent: number; change24h: number }
export interface Transaction { id: string; type: "credit" | "debit"; category: "transfer" | "njangi" | "savings" | "escrow" | "swap"; amount: number; currency: "XAF" | "NGN" | "USDT"; description: string; status: "completed" | "pending" | "failed"; timestamp: string; counterparty?: string }
export interface NjangiMember { id: string; name: string; avatar: string; position: number; hasPaid: boolean; isCurrentEater: boolean }
export interface Njangi { id: string; name: string; description: string; cycleAmount: number; currency: "XAF" | "NGN" | "USDT"; frequency: "weekly" | "biweekly" | "monthly"; members: NjangiMember[]; currentCycle: number; totalCycles: number; nextPayoutDate: string; myPosition: number; totalPool: number; status: "active" | "completed" | "pending"; penaltyRate: number; myContributionPaid: boolean }
export interface SavingsVault { id: string; name: string; targetAmount: number; currentAmount: number; currency: "XAF" | "NGN" | "USDT"; lockedUntil: string; autoContribute: boolean; autoAmount?: number; status: "active" | "locked" | "completed"; createdAt: string; emoji: string }
export interface Notification { id: string; type: "contribution" | "payout" | "security" | "transfer" | "system"; title: string; message: string; read: boolean; timestamp: string; actionUrl?: string }

export const mockUser = { id: "usr_001", name: "Amara Tanko", email: "amara.tanko@gmail.com", phone: "+237 677 123 456", country: "Cameroon", avatar: "AT", kycStatus: "verified" as const, trustScore: 94, joinedAt: "2024-09-15" };

export const mockBalances: WalletBalance[] = [
    { currency: "XAF", amount: 4250000, usdEquivalent: 7083, change24h: 2.4 },
    { currency: "NGN", amount: 185000, usdEquivalent: 115, change24h: -0.8 },
    { currency: "USDT", amount: 28430, usdEquivalent: 28430, change24h: 0.1 },
];

export const mockTransactions: Transaction[] = [
    { id: "tx_001", type: "credit", category: "njangi", amount: 750000, currency: "XAF", description: "Njangi payout — Famille Tanko", status: "completed", timestamp: "2025-06-04T14:30:00Z", counterparty: "Famille Tanko" },
    { id: "tx_002", type: "debit", category: "transfer", amount: 50000, currency: "NGN", description: "Transfer to Chidi Obi", status: "completed", timestamp: "2025-06-04T10:12:00Z", counterparty: "Chidi Obi" },
    { id: "tx_003", type: "debit", category: "savings", amount: 100000, currency: "XAF", description: "Auto-save — Emergency Fund", status: "completed", timestamp: "2025-06-03T08:00:00Z" },
    { id: "tx_004", type: "credit", category: "swap", amount: 500, currency: "USDT", description: "XAF to USDT swap", status: "completed", timestamp: "2025-06-02T16:45:00Z" },
    { id: "tx_005", type: "debit", category: "njangi", amount: 75000, currency: "XAF", description: "Njangi contribution — Staff Savings", status: "pending", timestamp: "2025-06-01T09:00:00Z" },
    { id: "tx_006", type: "credit", category: "transfer", amount: 200000, currency: "XAF", description: "Received from Marie Ndongo", status: "completed", timestamp: "2025-05-31T11:20:00Z", counterparty: "Marie Ndongo" },
    { id: "tx_007", type: "debit", category: "escrow", amount: 850, currency: "USDT", description: "Marketplace escrow — Electronics", status: "pending", timestamp: "2025-05-30T13:00:00Z" },
];

export const mockNjangis: Njangi[] = [
    {
        id: "nj_001", name: "Famille Tanko", description: "Family rotating savings group", cycleAmount: 150000, currency: "XAF", frequency: "monthly", currentCycle: 3, totalCycles: 8, nextPayoutDate: "2025-07-01", myPosition: 5, totalPool: 1200000, status: "active", penaltyRate: 5, myContributionPaid: true,
        members: [
            { id: "m1", name: "Amara Tanko", avatar: "AT", position: 5, hasPaid: true, isCurrentEater: false },
            { id: "m2", name: "Marie Ndongo", avatar: "MN", position: 1, hasPaid: true, isCurrentEater: false },
            { id: "m3", name: "Pierre Fon", avatar: "PF", position: 2, hasPaid: true, isCurrentEater: false },
            { id: "m4", name: "Cecile Bah", avatar: "CB", position: 3, hasPaid: true, isCurrentEater: true },
            { id: "m5", name: "Joseph Lum", avatar: "JL", position: 4, hasPaid: false, isCurrentEater: false },
            { id: "m6", name: "Rachel Eno", avatar: "RE", position: 6, hasPaid: false, isCurrentEater: false },
            { id: "m7", name: "Daniel Mbi", avatar: "DM", position: 7, hasPaid: false, isCurrentEater: false },
            { id: "m8", name: "Grace Yuh", avatar: "GY", position: 8, hasPaid: false, isCurrentEater: false },
        ]
    },
    {
        id: "nj_002", name: "Staff Savings", description: "Office colleagues monthly contributions", cycleAmount: 75000, currency: "XAF", frequency: "monthly", currentCycle: 1, totalCycles: 6, nextPayoutDate: "2025-06-30", myPosition: 2, totalPool: 450000, status: "active", penaltyRate: 10, myContributionPaid: false,
        members: [
            { id: "s1", name: "Amara Tanko", avatar: "AT", position: 2, hasPaid: false, isCurrentEater: false },
            { id: "s2", name: "Fiona Che", avatar: "FC", position: 1, hasPaid: true, isCurrentEater: true },
            { id: "s3", name: "Brice Ngum", avatar: "BN", position: 3, hasPaid: false, isCurrentEater: false },
            { id: "s4", name: "Alice Tabi", avatar: "AB", position: 4, hasPaid: false, isCurrentEater: false },
            { id: "s5", name: "Emile Shu", avatar: "ES", position: 5, hasPaid: false, isCurrentEater: false },
            { id: "s6", name: "Nadia Fru", avatar: "NF", position: 6, hasPaid: false, isCurrentEater: false },
        ]
    },
];

export const mockVaults: SavingsVault[] = [
    { id: "sv_001", name: "Emergency Fund", targetAmount: 2000000, currentAmount: 1200000, currency: "XAF", lockedUntil: "2025-12-31", autoContribute: true, autoAmount: 100000, status: "active", createdAt: "2025-01-01", emoji: "🛡️" },
    { id: "sv_002", name: "New Laptop", targetAmount: 850, currentAmount: 420, currency: "USDT", lockedUntil: "2025-09-01", autoContribute: true, autoAmount: 50, status: "active", createdAt: "2025-03-15", emoji: "💻" },
    { id: "sv_003", name: "Holiday 2025", targetAmount: 500000, currentAmount: 500000, currency: "XAF", lockedUntil: "2025-07-01", autoContribute: false, status: "locked", createdAt: "2025-01-10", emoji: "✈️" },
];

export const mockNotifications: Notification[] = [
    { id: "n1", type: "contribution", title: "Contribution Due", message: "Your XAF 75,000 contribution to Staff Savings is due in 3 days.", read: false, timestamp: "2025-06-04T09:00:00Z", actionUrl: "/njangi/nj_002" },
    { id: "n2", type: "payout", title: "Njangi Payout Received", message: "You received XAF 750,000 from Famille Tanko njangi.", read: false, timestamp: "2025-06-04T14:30:00Z" },
    { id: "n3", type: "security", title: "New Login Detected", message: "A new login was detected from Douala, Cameroon.", read: true, timestamp: "2025-06-03T22:15:00Z" },
    { id: "n4", type: "transfer", title: "Transfer Successful", message: "NGN 50,000 sent to Chidi Obi successfully.", read: true, timestamp: "2025-06-04T10:12:00Z" },
    { id: "n5", type: "system", title: "KYC Verified", message: "Your identity has been successfully verified.", read: true, timestamp: "2025-05-20T11:00:00Z" },
];

export function formatCurrency(amount: number, currency: string): string {
    if (currency === "USDT") return amount.toLocaleString() + " USDT";
    if (currency === "NGN") return "₦" + amount.toLocaleString();
    return "XAF " + amount.toLocaleString();
}
export function timeAgo(timestamp: string): string {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return mins + "m ago";
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + "h ago";
    return Math.floor(hrs / 24) + "d ago";
}
export function pct(current: number, target: number): number {
    return Math.min(100, Math.round((current / target) * 100));
}