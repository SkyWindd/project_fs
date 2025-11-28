import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { fetchCategories } from "../lib/api";

// 1️⃣ Định nghĩa kiểu Category từ DB
export interface Category {
  category_id: number;
  category_name: string;
}

// 2️⃣ Kiểu dữ liệu trong context
interface CategoryContextType {
  categories: Category[];
  loading: boolean;
}

// 3️⃣ Context với default value
const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  loading: true,
});

// 4️⃣ Định nghĩa props provider
interface CategoryProviderProps {
  children: ReactNode;
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);      // ⭐ Data đã có đúng category_id, category_name
        setLoading(false);
      })
      .catch(() => {
        setCategories([]);
        setLoading(false);
      });
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
}

// 5️⃣ Custom hook
export function useCategories() {
  return useContext(CategoryContext);
}
