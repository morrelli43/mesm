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

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  phoneNumber: string;
  scooterBrand: string;
  scooterModel: string;
  issueDescription: string;
  serviceType: 'repair' | 'maintenance' | 'upgrade';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  location: string;
  scheduledDate: string;
  estimatedCost: number;
  createdAt: string;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: string;
  rating: number;
  status: 'available' | 'busy' | 'offline';
  location: string;
  avatarUrl: string | null;
  completedJobs: number;
  createdAt: string;
}

export interface Scooter {
  id: string;
  brand: string;
  model: string;
  year: number;
  condition: 'excellent' | 'very good' | 'good' | 'fair';
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  imageUrl: string | null;
  inStock: boolean;
  mileage: number;
  warranty: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}