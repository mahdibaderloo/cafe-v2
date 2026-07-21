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
