import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { LocationProvider } from "./context/LocationContext"
import { Toaster } from "sonner"
import { AuthProvider } from "./context/AuthContext"
import { CategoryProvider } from "./context/CategoryContext"   // ⭐ THÊM DÒNG NÀY
import { MenuProvider } from "./context/MenuContext"
export default function App() {
  return (
    <>
      {/* Toast toàn app */}
      <Toaster
        position="top-center"
        richColors
        expand
        style={{ zIndex: 99999 }}
      />

      {/* ⭐ Bao toàn bộ Router bằng tất cả Provider cần thiết */}
      <AuthProvider>
        <LocationProvider>
          <CategoryProvider>     
             <MenuProvider>
                <RouterProvider router={router} />
             </MenuProvider>
          </CategoryProvider>
        </LocationProvider>
      </AuthProvider>
    </>
  )
}
