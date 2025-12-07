import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react"
import { toast } from "sonner"

export interface CartItem {
  item_id: number
  name: string
  size?: string
  crust?: string
  quantity: number
  price: number
  image_url?: string
   category_id?: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (item_id: number) => void
  updateQuantity: (item_id: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 🧩 Thời gian hết hạn: 15 phút (đơn vị ms)
  const CART_EXPIRATION = 15 * 60 * 1000

  // ✅ Hàm lưu giỏ hàng + thời gian vào localStorage
  const saveCart = (items: CartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(items))
    localStorage.setItem("cartTimestamp", Date.now().toString())
  }

  // ✅ Hàm reset lại đếm ngược xoá giỏ hàng
  const resetExpirationTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      clearCart(true)
    }, CART_EXPIRATION)
  }

  // ✅ Khôi phục giỏ hàng từ localStorage khi load trang
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems")
    const savedTime = localStorage.getItem("cartTimestamp")

    if (savedCart && savedTime) {
      const diff = Date.now() - parseInt(savedTime, 10)
      if (diff < CART_EXPIRATION) {
        setCartItems(JSON.parse(savedCart))
        resetExpirationTimer()
      } else {
        // ⏰ Quá 30 phút → xoá
        clearCart(true)
      }
    }
  }, [])

  // ✅ Mỗi khi giỏ hàng thay đổi → lưu và reset timer
  useEffect(() => {
    if (cartItems.length > 0) {
      saveCart(cartItems)
      resetExpirationTimer()
    }
  }, [cartItems])

  // ✅ Thêm sản phẩm (nếu trùng thì tăng số lượng)
  // Thêm vào giỏ
const addToCart = (item: CartItem) => {
  setCartItems((prev) => {
    const existing = prev.find(
      (p) =>
        p.item_id === item.item_id && // ← FIX
        p.size === item.size &&
        p.crust === item.crust
    );

    if (existing) {
      return prev.map((p) =>
        p === existing ? { ...p, quantity: p.quantity + item.quantity } : p
      );
    }

    return [...prev, item];
  });
};

// Xóa
const removeFromCart = (item_id: number) => {
  setCartItems((prev) => prev.filter((item) => item.item_id !== item_id));
};

// Cập nhật số lượng
const updateQuantity = (item_id: number, quantity: number) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.item_id === item_id
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    )
  );
};


  // ✅ Xoá toàn bộ giỏ hàng
  const clearCart = (expired = false) => {
    setCartItems([])
    localStorage.removeItem("cartItems")
    localStorage.removeItem("cartTimestamp")
    if (expired)
      toast.warning("Giỏ hàng của bạn đã hết hạn sau 30 phút không hoạt động ⚠️")
  }

  // ✅ Xoá timer khi unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ✅ Custom hook
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context)
    throw new Error("useCart must be used within a CartProvider")
  return context
}
