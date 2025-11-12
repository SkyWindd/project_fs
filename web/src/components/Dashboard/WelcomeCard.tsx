import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";

export const WelcomeCard = () => {
  return (
    <Card className="p-6">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-semibold">Chào mừng quay trở lại!</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-gray-600">
          Đây là trang quản trị hệ thống DronePizza. Bạn có thể xem nhanh thông số, đơn hàng gần đây và quản lý sản phẩm/​drone.
        </p>
      </CardContent>
    </Card>
  );
};
