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

// User profile data
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth?: string;
  createdAt: string;
}

// User's scooter data
export interface UserScooter {
  id: string;
  userId: string;
  make: string;
  model: string;
  serialNumber?: string;
  customMake?: string;
  customModel?: string;
  lastRepairDate?: string;
  lastServiceDate?: string;
  isServiceDue: boolean;
  createdAt: string;
}

// Appointment data for users
export interface UserAppointment {
  id: string;
  userId: string;
  scooterId: string;
  scooterInfo: {
    make: string;
    model: string;
  };
  serviceType: 'workshop' | 'mobile';
  issueDescription: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  scheduledDate: string;
  scheduledTime: string;
  location?: string;
  technicianName?: string;
  conversationHistory?: string[];
  invoiceTotal?: number;
  invoiceItems?: Array<{
    description: string;
    cost: number;
  }>;
  canEdit: boolean; // true if within 30 minutes of booking
  createdAt: string;
  completedAt?: string;
}