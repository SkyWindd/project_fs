"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface User {
  user_id: number
  full_name: string
  email: string
  phone_number: string
  password: string
  role: "admin" | "customer"
  is_active: boolean
  created_at: string
  updated_at: string
}

interface AuthContextType {
  currentUser: User | null
  login: (user: User) => void
  logout: () => void
  updateUser: (updatedUser: User) => void // ✅ thêm mới
}

// ✅ Tạo context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ✅ Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // 🔹 Load user từ localStorage khi app khởi động
  useEffect(() => {
    const stored = localStorage.getItem("currentUser")
    if (stored) setCurrentUser(JSON.parse(stored))
  }, [])

  // 🔹 Đăng nhập
  const login = (user: User) => {
    localStorage.setItem("currentUser", JSON.stringify(user))
    setCurrentUser(user)
  }

  // 🔹 Đăng xuất
  const logout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
  }

  // 🔹 Cập nhật thông tin user
  const updateUser = (updatedUser: User) => {
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    setCurrentUser(updatedUser)
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// ✅ Custom hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
