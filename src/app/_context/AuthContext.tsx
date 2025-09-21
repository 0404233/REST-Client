'use client';

import { onAuthStateChanged, onIdTokenChanged, type User } from 'firebase/auth';
import { auth } from 'firebase/firebase';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { redirect } from 'i18n/navigation';
import { useLocale } from 'next-intl';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  logout: async () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();

  const logout = async () => {
    await auth.signOut();
    redirect({ href: '/', locale });
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const expirationTime = new Date(tokenResult.expirationTime).getTime();
        const currentTime = Date.now();

        if (expirationTime < currentTime) {
          await logout();
        }
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeToken();
    };
  }, []);

  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
