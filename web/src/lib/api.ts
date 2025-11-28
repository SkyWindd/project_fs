const API_URL = import.meta.env.VITE_API_URL;

// 🟦 Lấy danh mục
export async function fetchCategories() {
  const res = await fetch(`${API_URL}/api/menu/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// 🟩 Lấy món ăn
export async function fetchMenuItems() {
  const res = await fetch(`${API_URL}/api/menu/items`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// 🟧 LOGIN
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Đăng nhập thất bại");
  return data;
}

// 🆕 REGISTER (THÊM HÀM NÀY)
export async function registerUser(data: {
  full_name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Đăng ký thất bại");
  return json;
}

export async function fetchUser(userId: number) {
  const res = await fetch(`${API_URL}/api/users/${userId}`);
  if (!res.ok) throw new Error("Không tải được thông tin user");
  return res.json();
}

// Lấy danh sách địa chỉ
export async function fetchUserAddresses(userId: number) {
  const res = await fetch(`${API_URL}/api/users/${userId}`);
  if (!res.ok) throw new Error("Không tải được địa chỉ");
  const user = await res.json();
  return user.addresses || [];
}

// Thêm địa chỉ
export async function addAddress(userId: number, address: any) {
  const res = await fetch(`${API_URL}/api/users/${userId}/address`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address }),
  });
  if (!res.ok) throw new Error("Không thêm được địa chỉ");
  return res.json();
}