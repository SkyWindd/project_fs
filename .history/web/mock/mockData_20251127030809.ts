
// ---------- INTERFACES ----------

export interface User {
  user_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  role: "admin" | "customer";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Address {
  address_id: number;
  user_id: number;
  address_label: string;
  street: string;
  city: string;
  latitude: number;
  longitude: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  category_id: number;
  category_name: string;
}

export interface MenuItem { 
  item_id: number; 
  name: string; 
  category_id: number; 
  description: string; 
  price: number; 
  image_url: string; 
  is_available: boolean; 
  created_at: string; 
  updated_at: string; 
}

 

export interface Drone {
  drone_id: number;
  drone_code: string;
  model: string;
  max_payload: number;
  max_range_km: number;
  created_at: string;
}

export interface DroneStatus {
  status_id: number;
  drone_id: number;
  current_latitude: number;
  current_longitude: number;
  battery_level: number;
  availability: "available" | "busy" | "maintenance";
  current_order_id?: number | null;
  updated_at: string;
}

export interface Order {
  order_id: number;
  user_id: number;
  address_id: number;
  drone_id: number;
  total_amount: number;
  delivery_fee: number;
  discount: number;
  status: "pending" | "confirmed" | "delivering" | "completed" | "cancelled";
  assigned_time: string;
  created_at: string;
  updated_at: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  item_id: number;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Payment {
  payment_id: number;
  order_id: number;
  payment_method:  "banking" | "momo" | "vnpay";
  amount: number;
  provider_transaction_id: string;
  status: "pending" | "success" | "failed" | "refunded";
  transaction_time: string;
}

export interface Tracking {
  tracking_id: number;
  order_id: number;
  drone_id: number;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  status: "enroute" | "delivered" | "returning" | "error";
  timestamp: string;
}

// Interface lưu thông tin cửa hàng/chi nhánh
export interface Store {
  store_id: number;
  store_name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  phone_number: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ---------- MOCK DATA ----------

export const mockUsers: User[] = [
  {
    user_id: 1,
    full_name: "Nguyễn Quân",
    email: "quan.nguyen@example.com",
    phone_number: "0987123456",
    password: "123456",
    role: "customer",
    is_active: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    user_id: 2,
    full_name: "Admin System",
    email: "admin@example.com",
    phone_number: "0912345678",
    password: "123456",
    role: "admin",
    is_active: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
];

export const mockAddresses: Address[] = [
  {
    address_id: 1,
    user_id: 1,
    address_label: "Nhà riêng",
    street: "123 Nguyễn Huệ, Quận 1",
    city: "TP Hồ Chí Minh",
    latitude: 10.77653,
    longitude: 106.700981,
    is_default: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    address_id: 2,
    user_id: 1,
    address_label: "Công ty",
    street: "45 Trần Hưng Đạo, Quận 5",
    city: "TP Hồ Chí Minh",
    latitude: 10.754222,
    longitude: 106.667778,
    is_default: false,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
];

export const mockCategories: Category[] = [
  { category_id: 1, category_name: "Pizza" },
  { category_id: 2, category_name: "Món ăn kèm" },
  { category_id: 3, category_name: "Đồ uống" },
];

export const mockMenuItems: MenuItem[] = [
  // 🍕 PIZZA
  {
    item_id: 1,
    name: "Pizza Hải Sản Sốt Pesto",
    category_id: 1,
    description: "Tôm, mực, nghêu, nấm, xốt pesto truyền thống đặc trưng",
    price: 159000,
    image_url: "/pizza/PizzaHaiSanSotPesto.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 2,
    name: "Pizza Bò Sốt Cay Hàn Quốc",
    category_id: 1,
    description: "Hương vị thịt bò Úc thượng hạng, thơm hòa quyện xốt cay Hàn Quốc nồng nàn, phủ rau mầm và mè rang",
    price: 169000,
    image_url: "/pizza/PizzaBoSotCayHQ.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 3,
    name: "Pizza Thập Cẩm",
    category_id: 1,
    description: "Pepperoni, thịt bò, thịt xông khói, giăm bông, nấm, hành tây, ớt chuông, xốt cà chua, thơm.",
    price: 149000,
    image_url: "/pizza/PizzaThapCam.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 4,
    name: "Pizza Phô Mai Cao Cấp",
    category_id: 1,
    description: "Phô mai Mozzarella, mật ong, xốt cà chua. Ngon hơn với mật ong.",
    price: 139000,
    image_url: "/pizza/PizzaPhoMaiCaoCap.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 5,
    name: "Pizza Hawaiian",
    category_id: 1,
    description: "Giăm bông và thơm ngọt dịu trên nền xốt cà chua truyền thống và phô mai mozzarella",
    price: 159000,
    image_url: "/pizza/PizzaHawaiian.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },

  // 🍟 MÓN ĂN KÈM
  {
    item_id: 6,
    name: "Khoai tây chiên",
    category_id: 2,
    description: "Khoai tây chiên giòn rụm, vàng ươm",
    price: 39000,
    image_url: "/sides/KhoaiTayChien.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 7,
    name: "Mực chiên giòn",
    category_id: 2,
    description: "Mực khoanh tẩm bột chiên giòn",
    price: 49000,
    image_url: "/sides/MucChienGion.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 8,
    name: "Khoai tây chiên lắc phô mai",
    category_id: 2,
    description: "Khoai tây chiên & bột phô mai cheddar",
    price: 45000,
    image_url: "/sides/KhoaiTayChienLacPhoMai.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 9,
    name: "Phô mai chiên giòn",
    category_id: 2,
    description: "Phô mai chiên giòn",
    price: 59000,
    image_url: "/sides/PhoMaiChienGion.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 10,
    name: "Bánh mì bơ tỏi",
    category_id: 2,
    description: "Bánh mì nướng giòn cùng bơ tỏi",
    price: 35000,
    image_url: "/sides/BanhMiBoToi.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },

  // 🧃 ĐỒ UỐNG
  {
    item_id: 11,
    name: "Aquafina 500ml",
    category_id: 3,
    description: "Aquafina 500ml",
    price: 20000,
    image_url: "/drinks/AQUAFINA_500ML.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 12,
    name: "Pepsi Không Calo Lon 320ml",
    category_id: 3,
    description: "Pepsi Không Calo Lon 320ml",
    price: 35000,
    image_url: "/drinks/PEPSI_NOCALO_320ML.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 13,
    name: "Pepsi Lon 320ml",
    category_id: 3,
    description: "Pepsi Lon 320ml",
    price: 35000,
    image_url: "/drinks/PEPSI_320ML.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 14,
    name: "7Up Lon 320ml",
    category_id: 3,
    description: "7Up Lon 320ml",
    price: 35000,
    image_url: "/drinks/7UP_320ML.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 15,
    name: "Mirinda Orange Lon 320ml",
    category_id: 3,
    description: "Mirinda Orange Lon 320ml",
    price: 35000,
    image_url: "/drinks/MIRINDA_ORANGE_320ML.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
];


export const mockDrones: Drone[] = [
  {
    drone_id: 1,
    drone_code: "DRONE-A01",
    model: "DJI AirX",
    max_payload: 5.0,
    max_range_km: 10.0,
    created_at: "2025-11-09T10:00:00Z",
  },
  {
    drone_id: 2,
    drone_code: "DRONE-B02",
    model: "Flyer Pro",
    max_payload: 6.5,
    max_range_km: 12.0,
    created_at: "2025-11-09T10:00:00Z",
  },
];

export const mockDroneStatus: DroneStatus[] = [
  {
    status_id: 1,
    drone_id: 1,
    current_latitude: 10.77653,
    current_longitude: 106.700981,
    battery_level: 85,
    availability: "available",
    current_order_id: null,
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    status_id: 2,
    drone_id: 2,
    current_latitude: 10.77653,
    current_longitude: 106.700981,
    battery_level: 60,
    availability: "busy",
    current_order_id: 1,
    updated_at: "2025-11-09T10:00:00Z",
  },
];

export const mockOrders: Order[] = [
  {
    order_id: 1,
    user_id: 1,
    address_id: 1,
    drone_id: 1,
    total_amount: 188000,
    delivery_fee: 10000,
    discount: 0,
    status: "completed",
    assigned_time: "2025-11-09T10:00:00Z",
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    order_id: 2,
    user_id: 1,
    address_id: 2,
    drone_id: 2,
    total_amount: 89000,
    delivery_fee: 10000,
    discount: 5000,
    status: "delivering",
    assigned_time: "2025-11-09T14:30:00Z",
    created_at: "2025-11-09T14:30:00Z",
    updated_at: "2025-11-09T14:30:00Z",
  },
];

export const mockOrderDetails: OrderDetail[] = [
  { order_detail_id: 1, order_id: 1, item_id: 1, quantity: 1, price: 159000, subtotal: 159000 },
  { order_detail_id: 2, order_id: 1, item_id: 3, quantity: 1, price: 29000, subtotal: 29000 },
  { order_detail_id: 3, order_id: 2, item_id: 2, quantity: 1, price: 89000, subtotal: 89000 },
];

export const mockPayments: Payment[] = [
  {
    payment_id: 1,
    order_id: 1,
    payment_method: "momo",
    amount: 188000,
    provider_transaction_id: "MOMO_001",
    status: "success",
    transaction_time: "2025-11-09T10:15:00Z",
  },
  {
    payment_id: 2,
    order_id: 2,
    payment_method: "banking",
    amount: 94000,
    provider_transaction_id: "BANKING_002",
    status: "pending",
    transaction_time: "2025-11-09T14:45:00Z",
  },
];

export const mockTracking: Tracking[] = [
  {
    tracking_id: 1,
    order_id: 1,
    drone_id: 1,
    latitude: 10.77653,
    longitude: 106.700981,
    altitude: 120.5,
    speed: 40.2,
    status: "delivered",
    timestamp: "2025-11-09T10:20:00Z",
  },
  {
    tracking_id: 2,
    order_id: 2,
    drone_id: 2,
    latitude: 10.849112,
    longitude: 106.768520,
    altitude: 95.3,
    speed: 38.0,
    status: "enroute",
    timestamp: "2025-11-09T14:50:00Z"
  },
];

export const stores: Store[] = [
  {
    store_id: 1,
    store_name: "Chi nhánh Quận 1",
    address: "123 Nguyễn Huệ",
    city: "HCM",
    latitude: 10.7769,
    longitude: 106.7009,
    phone_number: "0909123456",
    is_active: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-10",
  },
  {
    store_id: 2,
    store_name: "Chi nhánh Quận 3",
    address: "456 Võ Văn Tần",
    city: "HCM",
    latitude: 10.7712,
    longitude: 106.6895,
    phone_number: "0909876543",
    is_active: false,
    created_at: "2024-01-05",
    updated_at: "2024-01-12",
  },
];


// ---------- EXPORT ALL ----------
export default {
  users: mockUsers,
  addresses: mockAddresses,
  categories: mockCategories,
  menuitems: mockMenuItems,
  drones: mockDrones,
  dronestatus: mockDroneStatus,
  orders: mockOrders,
  orderdetails: mockOrderDetails,
  payments: mockPayments,
  tracking: mockTracking,
  stores,
  storeMenuItems,
};
