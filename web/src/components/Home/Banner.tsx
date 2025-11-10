import React from "react"

export default function Banner() {
  return (
    <section className="relative bg-gradient-to-r from-orange-400 to-red-500 text-white py-16 rounded-2xl mt-4 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow">
          Giao đồ ăn bằng Drone 🚁
        </h1>
        <p className="text-lg md:text-xl mb-6 opacity-90">
          Giao hàng siêu tốc, an toàn và tiện lợi – chỉ với vài chạm!
        </p>
      </div>
    </section>
  )
}
