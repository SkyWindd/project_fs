import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid, Platform, Alert } from "react-native";
import { useToast } from "../components/Toast/Toast";
export interface CartItem {
  id: number;
  name: string;
  size?: string;
  crust?: string;
  quantity: number;
  price: number;
  image_url?: string;
  category_id?: number;
  note?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: (expired?: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { show } = useToast();
  // ⏳ Thời gian hết hạn giỏ hàng: 15 phút
  const CART_EXPIRATION = 15 * 60 * 1000;

  // 📦 Lưu giỏ hàng vào AsyncStorage
  const saveCart = async (items: CartItem[]) => {
    try {
      await AsyncStorage.setItem("cartItems", JSON.stringify(items));
      await AsyncStorage.setItem("cartTimestamp", Date.now().toString());
    } catch (err) {
      console.log("Lỗi lưu giỏ hàng:", err);
    }
  };

  const resetExpirationTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      clearCart(true);
    }, CART_EXPIRATION);
  };

  // 🔄 Khôi phục giỏ hàng khi mở app
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem("cartItems");
        const savedTime = await AsyncStorage.getItem("cartTimestamp");

        if (savedCart && savedTime) {
          const diff = Date.now() - parseInt(savedTime, 10);

          if (diff < CART_EXPIRATION) {
            setCartItems(JSON.parse(savedCart));
            resetExpirationTimer();
          } else {
            clearCart(true);
          }
        }
      } catch (err) {
        console.log("Lỗi đọc giỏ hàng:", err);
      }
    };

    loadCart();
  }, []);

  // 🔁 Mỗi khi cartItems thay đổi → lưu & reset timer
  useEffect(() => {
    if (cartItems.length > 0) {
      saveCart(cartItems);
      resetExpirationTimer();
    }
  }, [cartItems]);

  // ➕ Thêm sản phẩm
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === item.id &&
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

    show("Đã thêm vào giỏ hàng");
  };

  // ❌ Xoá sản phẩm
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔄 Update số lượng
  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // 🗑 Xoá toàn bộ giỏ hàng
  const clearCart = async (expired = false) => {
    setCartItems([]);
    await AsyncStorage.removeItem("cartItems");
    await AsyncStorage.removeItem("cartTimestamp");

    if (expired) showToast("Giỏ hàng đã hết hạn sau 15 phút không hoạt động");
  };

  // 🔊 Toast mobile
  const showToast = (msg: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  // 🧹 Clear timer khi unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
  );
};

// Hook sử dụng Cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartProvider");
  return context;
};
