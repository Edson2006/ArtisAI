export interface Client {
  id: string;
  userId: string;
  name: string;
  email?: string;
  address?: string;
  phone?: string;
  totalSpent: number;
  quotesCount: number;
  createdAt: string;
  updatedAt: string;
}
