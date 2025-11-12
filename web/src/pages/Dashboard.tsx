import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { WelcomeCard } from "../components/Dashboard/WelcomeCard"
import { RecentOrdersTable } from "../components/Dashboard/RecentOrdersTable"
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"

export default function Dashboard() {
  const orderData = [
    { name: "T1", orders: 30 },
    { name: "T2", orders: 45 },
    { name: "T3", orders: 50 },
    { name: "T4", orders: 70 },
    { name: "T5", orders: 90 },
  ]

  const productData = [
    { name: "Pizza", sold: 50 },
    { name: "Burger", sold: 30 },
    { name: "Pasta", sold: 20 },
  ]

  const droneData = [
    { name: "Hoạt động", value: 8 },
    { name: "Bảo trì", value: 2 },
  ]

  const COLORS = ["#10b981", "#f97316"]

  return (
    <div className="space-y-8 px-4 md:px-6 pb-10 bg-gray-50 min-h-screen">
      {/* Thẻ chào mừng */}
      <WelcomeCard />

      {/* Biểu đồ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Biểu đồ cột - Đơn hàng */}
        <Card className="shadow-md rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800">Đơn hàng theo tháng</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={orderData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="orders" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Biểu đồ đường - Sản phẩm bán ra */}
        <Card className="shadow-md rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800">Sản phẩm bán ra</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={orderData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Biểu đồ tròn - Drone */}
        <Card className="shadow-md rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800">Trạng thái Drone</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center pt-2">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={droneData}
                  cx="55%"
                  cy="50%"
                  labelLine
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {droneData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bảng đơn hàng gần đây */}
      <div className="mt-8">
        <RecentOrdersTable />
      </div>
    </div>
  )
}
