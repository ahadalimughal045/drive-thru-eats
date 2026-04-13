'use client';
import { createContext, useContext, useState, useEffect } from 'react';

export type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (credentials: { email: string; password?: string }) => Promise<{ success: boolean; error?: string; detail?: string }>;
  register: (userData: { name: string; email: string; password?: string }) => Promise<{ success: boolean; error?: string; detail?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('dte_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const login = async (credentials: { email: string; password?: string }) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('dte_user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, error: data.error, detail: data.detail };
    } catch (e) {
      return { success: false, error: 'Connection failed' };
    }
  };

  const register = async (userData: { name: string; email: string; password?: string }) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('dte_user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, error: data.error, detail: data.detail };
    } catch (e) {
      return { success: false, error: 'Connection failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dte_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
