import { createContext, useContext } from "react";

export const CategoryContext = createContext({
  selectedCategory: "Tất cả",
  setSelectedCategory: (cat: string) => {},
});

export function useCategory() {
  return useContext(CategoryContext);
}
