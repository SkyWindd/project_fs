import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { LocationProvider } from "./context/LocationContext" // ✅ thêm dòng này
export default function App() {
  return (
    <LocationProvider>
      <RouterProvider router={router} />
    </LocationProvider>
  )
}
