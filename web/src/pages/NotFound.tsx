import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-gray-600 mb-4">Trang bạn tìm không tồn tại</p>
      <Button onClick={() => navigate("/")}>Quay lại trang chủ</Button>
    </div>
  )
}
