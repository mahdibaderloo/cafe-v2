export interface FormValues {
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  token: string;
  username: string;
  email: string;
  image: string;
  role: string;
}

export interface NavOption {
  id: number;
  title: string;
  icon: string;
  path: string;
}

export interface DashboardStats {
  totalOrders: number;
  monthlySales: number;
  topProduct: string;
  topProductCount: number;
  averageOrderValue: number;
}

export interface Admin {
  id: number;
  email: string;
  username: string;
  role: string;
  image: string;
  token: string;
}

export interface AdminStore {
  admin: Admin | null;
  isAuthenticated: boolean;
  setAdmin: (admin: Admin) => void;
  logout: () => void;
  updateAdmin: (data: Partial<Admin>) => void;
}

export interface DiscountResponse {
  id: number;
  type: string;
  code: string;
  createdAt: string;
  isActive: boolean;
  expiresAt: string;
  maxUsage: number;
  usedCount: number;
  discountValue: number;
}

export interface DiscountRequest {
  type: string;
  code: string;
  expiresAt: string;
  maxUsage: number;
  discountValue: number;
}
