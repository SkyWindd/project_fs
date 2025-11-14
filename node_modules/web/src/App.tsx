import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { LocationProvider } from "./context/LocationContext"
import { Toaster } from "sonner"
import { AuthProvider } from "./context/AuthContext"

export default function App() {
  return (
    <>
      {/* ✅ Toast thông báo toàn app */}
      <Toaster
        position="top-center"
        richColors
        expand
        style={{ zIndex: 99999 }}
      />

      {/* ✅ Bao toàn bộ router trong các provider */}
      <AuthProvider>
        <LocationProvider>
          <RouterProvider router={router} />
        </LocationProvider>
      </AuthProvider>
    </>
  )
}
