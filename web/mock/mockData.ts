// ========================================
// 🍕 MOCK DATA - FOOD DRONE DELIVERY APP
// Compatible with PostgreSQL schema v1.1
// Author: Quân Nguyễn + GPT
// ========================================

// ---------- INTERFACES ----------

export interface User {
  user_id: number;
  full_name: string;
  email: string;
  phone_number: string;
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
  customer_id: number;
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
  payment_method: "cash" | "credit_card" | "momo" | "zalopay" | "paypal";
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

// ---------- MOCK DATA ----------

export const mockUsers: User[] = [
  {
    user_id: 1,
    full_name: "Nguyễn Quân",
    email: "quan.nguyen@example.com",
    phone_number: "0987123456",
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
    name: "Pizza Hải sản",
    category_id: 1,
    description: "Pizza tôm mực phô mai thơm ngon",
    price: 159000,
    image_url: "/pizza/PizzaHaiSan.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 2,
    name: "Pizza Bò phô mai",
    category_id: 1,
    description: "Pizza thịt bò và phô mai béo ngậy",
    price: 169000,
    image_url: "/pizza/PizzaBoPhoMai.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 3,
    name: "Pizza Gà BBQ",
    category_id: 1,
    description: "Pizza gà nướng BBQ với nước sốt đậm đà",
    price: 149000,
    image_url: "/pizza/PizzaGaBBQ.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 4,
    name: "Pizza Rau củ",
    category_id: 1,
    description: "Pizza chay rau củ tươi ngon, thanh vị",
    price: 139000,
    image_url: "/pizza/PizzaRauCu.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 5,
    name: "Pizza Xúc xích Đức",
    category_id: 1,
    description: "Pizza xúc xích Đức và phô mai tan chảy",
    price: 159000,
    image_url: "/pizza/PizzaXucXichDuc.webp",
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
    image_url: "/sides/FrenchFries.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 7,
    name: "Gà viên chiên",
    category_id: 2,
    description: "Gà viên chiên xù giòn tan, thơm ngon",
    price: 49000,
    image_url: "/sides/ChickenBalls.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 8,
    name: "Khoai tây lắc phô mai",
    category_id: 2,
    description: "Khoai tây chiên lắc phô mai thơm ngậy",
    price: 45000,
    image_url: "/sides/CheeseFries.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 9,
    name: "Salad trộn dầu giấm",
    category_id: 2,
    description: "Salad tươi mát với dầu giấm chua dịu",
    price: 59000,
    image_url: "/sides/Salad.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 10,
    name: "Bánh mì bơ tỏi",
    category_id: 2,
    description: "Bánh mì nướng giòn với bơ tỏi thơm lừng",
    price: 35000,
    image_url: "/sides/GarlicBread.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },

  // 🧃 ĐỒ UỐNG
  {
    item_id: 11,
    name: "Trà Chanh Tươi",
    category_id: 3,
    description: "Trà chanh tươi mát lạnh, giải khát sảng khoái",
    price: 29000,
    image_url: "/drinks/TraChanh.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 12,
    name: "Coca-Cola",
    category_id: 3,
    description: "Coca-Cola lon 330ml mát lạnh",
    price: 19000,
    image_url: "/drinks/CocaCola.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 13,
    name: "Pepsi",
    category_id: 3,
    description: "Pepsi lon 330ml, vị đậm đà sảng khoái",
    price: 19000,
    image_url: "/drinks/Pepsi.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 14,
    name: "Nước Cam Ép",
    category_id: 3,
    description: "Nước cam ép nguyên chất, mát lạnh",
    price: 35000,
    image_url: "/drinks/OrangeJuice.webp",
    is_available: true,
    created_at: "2025-11-09T10:00:00Z",
    updated_at: "2025-11-09T10:00:00Z",
  },
  {
    item_id: 15,
    name: "Trà Sữa Trân Châu",
    category_id: 3,
    description: "Trà sữa trân châu béo ngậy, mát lạnh",
    price: 45000,
    image_url: "/drinks/TraSuaTranChau.webp",
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
    current_latitude: 10.754222,
    current_longitude: 106.667778,
    battery_level: 60,
    availability: "busy",
    current_order_id: 1,
    updated_at: "2025-11-09T10:00:00Z",
  },
];

export const mockOrders: Order[] = [
  {
    order_id: 1,
    customer_id: 1,
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
    customer_id: 1,
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
    payment_method: "cash",
    amount: 94000,
    provider_transaction_id: "CASH_002",
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
    latitude: 10.754222,
    longitude: 106.667778,
    altitude: 95.3,
    speed: 38.0,
    status: "enroute",
    timestamp: "2025-11-09T14:50:00Z",
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
};
