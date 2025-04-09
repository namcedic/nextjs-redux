'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import api from 'src/lib/api';
import { useRouter } from 'next/navigation';
import { log } from 'console';

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
     const accessToken = localStorage.getItem('accessToken');

    api.get('auth/me',{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const login = async (email: string, password: string) => {
    const loginResp  = await api.post('auth/login', { email, password });
    const accessToken = loginResp.data.accessToken
    localStorage.setItem('accessToken', accessToken)

    const res = await api.get('auth/me',{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setUser({id:res.data.id, email: res.data.email});
    router.push('/dashboard');
  };

  const register = async (email: string, password: string) => {
    await api.post('auth/register', { email, password });
    router.push('/login');
  };

  const logout = async () => {
  const accessToken = localStorage.getItem('accessToken');
  await api.post('auth/logout', {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  localStorage.removeItem('accessToken');
  setUser(null);
  router.push('/login');
};

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
