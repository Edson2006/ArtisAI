export type QuoteStatus = "draft" | "sent" | "accepted" | "rejected" | "paid";

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unit?: string;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  userId: string;
  number: string; // e.g. DEV-2024-001
  clientName: string;
  clientEmail?: string;
  clientAddress?: string;
  items: QuoteItem[];
  subtotal: number;
  taxRate: number; // e.g. 20 for 20%
  taxAmount: number;
  total: number;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
  validUntil?: string;
  notes?: string;
}
