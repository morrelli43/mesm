export interface Sale {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  initials: string;
  amount: number;
  createdAt: string;
}

export interface RevenueData {
  month: string;
  total: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}