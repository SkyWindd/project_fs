import { useState, useEffect } from "react"
import { useResponsive } from "../hooks/useResponsive"
import { useCategories } from "../context/CategoryContext"   // ⭐ Lấy categories từ DB
import HeaderTop from "../components/Header/HeaderTop"
import HeaderBottom from "../components/Header/HeaderBottom"

interface HeaderProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}



export default function Header({ selectedCategory, onSelectCategory }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false)
  const { categories, loading } = useCategories()
  const { isMobile } = useResponsive()
  const [scrolled, setScrolled] = useState(false)

  // ✅ Theo dõi cuộn trang để thêm hiệu ứng header sticky
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (loading) return null
 
  return (
    <header
      className={`w-full border-b bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md border-gray-300" : "shadow-sm border-gray-200"
      }`}
    >
      {/* 🔝 Header trên cùng (logo, giỏ hàng, đăng nhập, v.v.) */}
      <HeaderTop scrolled={scrolled} />

      {/* 🔻 Header dưới (danh mục + search) */}
      <HeaderBottom
        categories={categories.map((c) => ({
          category_id: c.category_id,
          category_name: c.category_name,
        }))}
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch(!showSearch)}
        onSelectCategory={onSelectCategory}
        selectedCategory={selectedCategory}
      />
    </header>
  )
}
