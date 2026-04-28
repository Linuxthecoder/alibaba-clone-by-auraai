import React, { createContext, useContext, useState, useEffect } from 'react';
import db from '../lib/db';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = db.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const found = db.findOne('users', u => u.email === email && u.password === password);
    if (found) {
      db.setCurrentUser(found);
      setUser(found);
      return { success: true, user: found };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (data) => {
    const exists = db.findOne('users', u => u.email === data.email);
    if (exists) return { success: false, error: 'Email already registered' };
    
    const newUser = db.insert('users', {
      ...data,
      avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      verified: false,
      memberSince: new Date().toISOString().split('T')[0],
    });
    db.setCurrentUser(newUser);
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    db.logout();
    setUser(null);
  };

  const updateProfile = (updates) => {
    if (!user) return;
    const updated = db.update('users', user.id, updates);
    db.setCurrentUser(updated);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;

