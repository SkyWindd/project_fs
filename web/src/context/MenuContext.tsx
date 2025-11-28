import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { fetchMenuItems } from "../lib/api";

interface MenuContextType {
  menuItems: any[];
  loading: boolean;
}

const MenuContext = createContext<MenuContextType>({
  menuItems: [],
  loading: true,
});

interface MenuProviderProps {
  children: ReactNode;
}

export function MenuProvider({ children }: MenuProviderProps) {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems().then((data) => {
      setMenuItems(data);
      setLoading(false);
    });
  }, []);

  return (
    <MenuContext.Provider value={{ menuItems, loading }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
