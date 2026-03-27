export interface TrackedWallet {
  address: string;
  label: string;
  tier: "high" | "medium" | "experimental";
  notes?: string;
}
