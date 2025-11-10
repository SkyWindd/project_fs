import React from "react"
import { useOutletContext } from "react-router-dom"
import Banner from "../components/Home/Banner"
import ProductGrid from "../components/Home/ProductGrid"
import mockData from "../../mock/mockData"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"

interface ContextType {
  selectedCategory: string
}

export default function Home() {
  const { selectedCategory } = useOutletContext<ContextType>()

  // ✅ Lấy dữ liệu từ mockData
  const products = mockData.menuitems
  const categories = mockData.categories

  // ✅ Lọc sản phẩm theo danh mục
  const filteredProducts =
    selectedCategory === "Tất cả"
      ? products
      : products.filter((p) => {
          const category = categories.find(
            (c) => c.category_id === p.category_id
          )
          return (
            category &&
            category.category_name.toLowerCase() ===
              selectedCategory.toLowerCase()
          )
        })

  // ✅ Animation
  const fadeVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 🔶 Banner */}
      <div className="mb-10">
        <Banner />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-12 space-y-16">
        <AnimatePresence mode="wait">
          {/* 🔹 Khi chọn 1 danh mục cụ thể */}
          {selectedCategory !== "Tất cả" ? (
            <motion.div
              key={selectedCategory}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-100"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 flex items-center gap-2">
                <span className="h-6 w-1.5 bg-orange-500 rounded-full"></span>
                {selectedCategory}
              </h2>

              <ProductGrid products={filteredProducts} />
            </motion.div>
          ) : (
            /* 🔹 Khi chọn “Tất cả” => hiển thị từng nhóm danh mục */
            <motion.div
              key="all-categories"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-12"
            >
              {categories.map((cat) => {
                const items = products.filter(
                  (p) => p.category_id === cat.category_id
                )
                if (items.length === 0) return null
                return (
                  <motion.div
                    key={cat.category_id}
                    variants={fadeVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: cat.category_id * 0.05 }}
                    className="bg-white shadow-sm rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                        <span className="h-5 w-1.5 bg-orange-500 rounded-full"></span>
                        {cat.category_name}
                      </h2>
                    </div>

                    <ProductGrid products={items} />
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
