import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "./StoreContext";
import { fetchStoreMenu } from "../lib/api";

interface StoreMenuContextType {
  storeMenu: any[];
  loading: boolean;
}

const StoreMenuContext = createContext<StoreMenuContextType>({
  storeMenu: [],
  loading: true,
});

interface StoreMenuProviderProps {
  children: React.ReactNode;
}

export function StoreMenuProvider({ children }: StoreMenuProviderProps) {
  const { selectedStore } = useStore();
  const [storeMenu, setStoreMenu] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);

    fetchStoreMenu(selectedStore.store_id)
      .then((data) => setStoreMenu(data))
      .finally(() => setLoading(false));
  }, [selectedStore]);

  return (
    <StoreMenuContext.Provider value={{ storeMenu, loading }}>
      {children}
    </StoreMenuContext.Provider>
  );
}

export const useStoreMenu = () => useContext(StoreMenuContext);
