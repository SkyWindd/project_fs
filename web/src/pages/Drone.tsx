import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Search, Wrench, Play, Pause } from "lucide-react"

interface Drone {
  drone_id: number
  current_location: string
  battery_level: number
  status: "idle" | "delivering" | "maintenance"
  last_maintenance: string
}

export const mockDrones: Drone[] = [
  {
    drone_id: 1,
    current_location: "Kho chính",
    battery_level: 95,
    status: "idle",
    last_maintenance: "2025-11-01T08:00:00Z",
  },
  {
    drone_id: 2,
    current_location: "Khu vực giao Tây Hồ",
    battery_level: 68,
    status: "delivering",
    last_maintenance: "2025-11-05T10:30:00Z",
  },
  {
    drone_id: 3,
    current_location: "Kho phụ",
    battery_level: 40,
    status: "maintenance",
    last_maintenance: "2025-10-28T09:15:00Z",
  },
]

export default function Drones() {
  const [drones, setDrones] = useState<Drone[]>(mockDrones)
  const [search, setSearch] = useState("")

  const filtered = drones.filter((drone) =>
    drone.drone_id.toString().includes(search)
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "idle":
        return "bg-green-100 text-green-700"
      case "delivering":
        return "bg-yellow-100 text-yellow-700"
      case "maintenance":
        return "bg-gray-200 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "idle":
        return "Sẵn sàng"
      case "delivering":
        return "Đang giao"
      case "maintenance":
        return "Bảo trì"
      default:
        return "Khác"
    }
  }

  const handleChangeStatus = (id: number, newStatus: Drone["status"]) => {
    setDrones((prev) =>
      prev.map((drone) =>
        drone.drone_id === id
          ? {
              ...drone,
              status: newStatus,
              last_maintenance:
                newStatus === "maintenance"
                  ? new Date().toISOString()
                  : drone.last_maintenance,
            }
          : drone
      )
    )
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">🚁 Quản lý Drone</h2>

      {/* Bộ lọc và tìm kiếm */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm theo mã Drone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Danh sách drone */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((drone) => (
          <Card
            key={drone.drone_id}
            className="hover:shadow-md transition-all duration-200 border border-gray-100 rounded-2xl"
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Drone #{drone.drone_id}
              </CardTitle>
              <Badge
                className={`${getStatusColor(
                  drone.status
                )} px-3 py-1 rounded-full text-xs font-medium`}
              >
                {getStatusLabel(drone.status)}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-3 text-sm text-gray-700">
              <p>
                <span className="font-medium">Vị trí:</span> {drone.current_location}
              </p>
              <p>
                <span className="font-medium">Pin:</span> {drone.battery_level}%
              </p>
              <p>
                <span className="font-medium">Lần bảo trì gần nhất:</span>{" "}
                {new Date(drone.last_maintenance).toLocaleString("vi-VN")}
              </p>

              <div className="flex gap-2 pt-2">
                {drone.status !== "maintenance" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleChangeStatus(drone.drone_id, "maintenance")}
                  >
                    <Wrench className="w-4 h-4 mr-1" />
                    Bảo trì
                  </Button>
                )}
                {drone.status === "maintenance" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleChangeStatus(drone.drone_id, "idle")}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Kích hoạt
                  </Button>
                )}
                {drone.status === "delivering" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleChangeStatus(drone.drone_id, "idle")}
                  >
                    <Pause className="w-4 h-4 mr-1" />
                    Hoàn tất giao
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
