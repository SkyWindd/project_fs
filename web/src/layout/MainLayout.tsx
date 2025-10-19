import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 mt-[120px]">
            <div className="text-center text-gray-500 p-6">MainLayout đang hoạt động</div>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}
