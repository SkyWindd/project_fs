import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "../layout/Header"
import Footer from "../layout/Footer"

export default function MainLayout() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <main className="flex-1">
        <Outlet context={{ selectedCategory }} />
      </main>
      <Footer />
    </div>
  )
}
