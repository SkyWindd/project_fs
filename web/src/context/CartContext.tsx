import React, { createContext, useContext, useState, type ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  size?: string
  crust?: string
  quantity: number
  price: number
  image_url?: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // ✅ Thêm sản phẩm (nếu trùng thì tăng số lượng)
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (p) => p.id === item.id && p.size === item.size && p.crust === item.crust
      )
      if (existing) {
        return prev.map((p) =>
          p === existing ? { ...p, quantity: p.quantity + item.quantity } : p
        )
      }
      return [...prev, item]
    })
  }

  // ✅ Xóa sản phẩm
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  // ✅ Cập nhật số lượng
  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    )
  }

  // ✅ Xóa toàn bộ giỏ hàng
  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ✅ Custom hook
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
