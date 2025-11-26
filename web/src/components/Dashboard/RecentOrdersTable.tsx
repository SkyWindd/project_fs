import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"

// Kiểu dữ liệu đơn hàng chi tiết
interface OrderDetail {
  order_detail_id: number
  order_id: number
  item_id: number
  quantity: number
  price: number
  subtotal: number
}

// Dữ liệu mẫu
const mockOrderDetails: OrderDetail[] = [
  { order_detail_id: 1, order_id: 1, item_id: 1, quantity: 1, price: 159000, subtotal: 159000 },
  { order_detail_id: 2, order_id: 1, item_id: 3, quantity: 1, price: 29000, subtotal: 29000 },
  { order_detail_id: 3, order_id: 2, item_id: 2, quantity: 1, price: 89000, subtotal: 89000 },
]

export const RecentOrdersTable = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Đơn hàng gần đây</CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID chi tiết</TableHead>
              <TableHead>ID đơn hàng</TableHead>
              <TableHead>ID sản phẩm</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Đơn giá</TableHead>
              <TableHead className="text-right">Tạm tính</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {mockOrderDetails.map((order) => (
              <TableRow key={order.order_detail_id}>
                <TableCell>{order.order_detail_id}</TableCell>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.item_id}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.price.toLocaleString("vi-VN")}₫</TableCell>
                <TableCell className="text-right font-medium">
                  {order.subtotal.toLocaleString("vi-VN")}₫
                </TableCell>
              </TableRow>
            ))}

            {/* Hàng tổng cộng */}
            <TableRow className="font-semibold">
              <TableCell colSpan={5} className="text-right">
                Tổng cộng
              </TableCell>
              <TableCell className="text-right">
                {mockOrderDetails
                  .reduce((sum, o) => sum + o.subtotal, 0)
                  .toLocaleString("vi-VN")}
                ₫
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
