import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { LocationProvider } from "./context/LocationContext"
import { Toaster } from "sonner"
import { AuthProvider } from "./context/AuthContext"
import { CategoryProvider } from "./context/CategoryContext"   
import { MenuProvider } from "./context/MenuContext"
import { StoreProvider } from "./context/StoreContext" 
import { StoreMenuProvider } from "./context/StoreMenuContext"        
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
                <StoreProvider>
                  <StoreMenuProvider>
                  <RouterProvider router={router} />
                  </StoreMenuProvider>
                </StoreProvider>
             </MenuProvider>
          </CategoryProvider>
        </LocationProvider>
      </AuthProvider>
    </>
  )
}