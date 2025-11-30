// src/context/StoreContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { fetchStores } from "../lib/api";

interface Store {
  store_id: number;
  store_name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  phone_number: string;
  is_active: boolean;
}

interface StoreContextType {
  stores: Store[];
  selectedStore: Store | null;
  setSelectedStore: (s: Store | null) => void;
}

interface StoreProviderProps {
  children: React.ReactNode;
}

const LS_KEY = "selectedStore_v1";

const StoreContext = createContext<StoreContextType>({
  stores: [],
  selectedStore: null,
  setSelectedStore: () => {},
});

export function StoreProvider({ children }: StoreProviderProps) {
  const [stores, setStores] = useState<Store[]>([]);

  // 🟦 đọc từ localStorage khi load context lần đầu
  const [selectedStore, setSelectedStoreState] = useState<Store | null>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw) as Store;
    } catch (e) {
      console.warn("Failed to parse selectedStore from localStorage", e);
    }
    return null;
  });

  // 🟩 load danh sách store khi app khởi động
  useEffect(() => {
    let mounted = true;

    fetchStores()
      .then((data) => {
        if (!mounted) return;

        const list = Array.isArray(data) ? data : data?.stores ?? [];
        setStores(list);

        // ❗Không tự chọn store nếu bạn muốn user tự chọn thủ công
        // Nếu muốn auto-select: bật dòng dưới
        // if (!selectedStore && list.length > 0) setSelectedStore(list[0]);
      })
      .catch((err) => {
        console.error("❌ Failed to load stores:", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // 🟥 hàm chọn store + lưu vào localStorage
  const setSelectedStore = (s: Store | null) => {
    try {
      if (s === null) localStorage.removeItem(LS_KEY);
      else localStorage.setItem(LS_KEY, JSON.stringify(s));
    } catch (e) {
      console.warn("Failed to persist selected store", e);
    }
    setSelectedStoreState(s);
  };

  return (
    <StoreContext.Provider value={{ stores, selectedStore, setSelectedStore }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
