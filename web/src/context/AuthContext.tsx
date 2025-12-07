"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface User {
  user_id: number
  full_name: string
  email: string
  phone_number: string
  role: "admin" | "customer"
  is_active: boolean
  created_at: string
  updated_at: string
}

interface AuthContextType {
  currentUser: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (updatedUser: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // Load user + token khi app mở
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    const savedToken = localStorage.getItem("token")

    if (savedUser) setCurrentUser(JSON.parse(savedUser))
    if (savedToken) setToken(savedToken)
  }, [])

  // Đăng nhập → LƯU TOKEN + USER
  const login = (user: User, token: string) => {
    localStorage.setItem("currentUser", JSON.stringify(user))
    localStorage.setItem("token", token)

    setCurrentUser(user)
    setToken(token)
  }

  // Đăng xuất → XOÁ TOKEN + USER
  const logout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")

    setCurrentUser(null)
    setToken(null)
  }

  // Cập nhật thông tin user
  const updateUser = (updatedUser: User) => {
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    setCurrentUser(updatedUser)
  }

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
