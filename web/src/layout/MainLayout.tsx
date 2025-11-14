import { useState } from "react"
import { Outlet, useLocation, Link } from "react-router-dom"
import Header from "../layout/Header"
import Footer from "../layout/Footer"

export default function MainLayout() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const location = useLocation()

  // ✅ Kiểm tra xem có đang ở trang thanh toán không
  const isCheckoutPage = location.pathname === "/checkout"

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🧭 Nếu KHÔNG ở checkout → hiển thị Header */}
      {!isCheckoutPage ? (
        <Header
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      ) : (
        // ✅ Nếu là trang checkout → chỉ hiển thị logo nhỏ ở trên cùng
        <div className="py-4 text-center border-b bg-white shadow-sm">
          <Link
            to="/"
            className="font-[Birthstone] text-red-600 text-2xl font-bold"
          >
            PIZZAHOUSE
          </Link>
        </div>
      )}

      {/* 🧱 Nội dung chính */}
      <main className="flex-1">
        <Outlet context={{ selectedCategory }} />
      </main>

      {/* 🦶 Footer chỉ hiển thị khi KHÔNG ở checkout */}
      {!isCheckoutPage && <Footer />}
    </div>
  )
}
