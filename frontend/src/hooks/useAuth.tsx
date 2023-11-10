"use client"

// hooks/useAuth.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextProps {
  user: { token: string; email: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ token: string; email: string } | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ token: string; email: string } | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const email = Cookies.get('email');

    if (token && email) {
      setUser({ token, email });
    } else {
      setUser(null);
    }
  }, []);

  const contextValue: AuthContextProps = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
