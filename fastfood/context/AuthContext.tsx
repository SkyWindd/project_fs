"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  user_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  role: "admin" | "customer";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updated: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load user từ AsyncStorage khi app khởi động
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("currentUser");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    })();
  }, []);

  // Đăng nhập
  const login = async (user: User) => {
    await AsyncStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  };

  // Đăng xuất
  const logout = async () => {
    await AsyncStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  // Cập nhật thông tin user
  const updateUser = async (updated: User) => {
    await AsyncStorage.setItem("currentUser", JSON.stringify(updated));
    setCurrentUser(updated);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook sử dụng
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
