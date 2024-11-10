export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'warehouse' | 'client';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}