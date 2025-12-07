const API_URL = import.meta.env.VITE_API_URL;

/* ------------------------------------------
   🛡️ HÀM authFetch TỰ ĐỘNG GỬI TOKEN
-------------------------------------------*/
function authFetch(url: string, options: any = {}) {
  const token = localStorage.getItem("token");

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });
}

/* ------------------------------------------
   🟦 CATEGORIES (KHÔNG CẦN TOKEN)
-------------------------------------------*/
export async function fetchCategories() {
  const res = await fetch(`${API_URL}/api/menu/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

/* ------------------------------------------
   🟩 MENU ITEMS (KHÔNG CẦN TOKEN)
-------------------------------------------*/
export async function fetchMenuItems() {
  const res = await fetch(`${API_URL}/api/menu/items`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

/* ------------------------------------------
   🧡 AUTH
-------------------------------------------*/

// LOGIN
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

// REGISTER
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

/* ------------------------------------------
   🧑 USER – CẦN TOKEN
-------------------------------------------*/

export async function fetchUser(userId: number) {
  const res = await authFetch(`${API_URL}/api/users/${userId}`);
  if (!res.ok) throw new Error("Không tải được thông tin user");
  return res.json();
}

export async function updateUserInfo(userId: number, data: any) {
  const res = await authFetch(`${API_URL}/api/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Cập nhật thông tin thất bại");
  return json;
}

/* ------------------------------------------
   📍 ADDRESS – CẦN TOKEN
-------------------------------------------*/

// Get address list
export async function fetchUserAddresses(userId: number) {
  const res = await authFetch(`${API_URL}/api/users/${userId}/address`);
  if (!res.ok) throw new Error("Không tải được danh sách địa chỉ");
  return res.json();
}

// Add address
export async function addAddress(userId: number, address: any) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/users/${userId}/address`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(address),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Không thêm được địa chỉ");
  return json;
}

// Edit address
export async function editAddress(
  userId: number,
  addressId: number,
  data: any
) {
  const res = await authFetch(
    `${API_URL}/api/users/${userId}/address/${addressId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Không cập nhật được địa chỉ");
  return res.json();
}

// Delete address
export async function deleteAddress(userId: number, addressId: number) {
  const res = await authFetch(
    `${API_URL}/api/users/${userId}/address/${addressId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Không xoá được địa chỉ");
  return res.json();
}

/* ------------------------------------------
   🏬 STORE (KHÔNG CẦN TOKEN)
-------------------------------------------*/
export async function fetchStores() {
  const res = await fetch(`${API_URL}/api/stores`);
  if (!res.ok) throw new Error("Failed to fetch stores");
  return res.json();
}

export async function fetchStoreMenu(storeId: number) {
  const res = await fetch(`${API_URL}/api/stores/${storeId}/menu`);
  if (!res.ok) throw new Error("Failed to fetch store menu");
  return res.json();
}

/* ------------------------------------------
   🛒 ORDERS – CẦN TOKEN
-------------------------------------------*/
export async function fetchOrdersByUser(userId: number) {
  const res = await authFetch(`${API_URL}/api/orders/user/${userId}`);
  if (!res.ok) throw new Error("Không tải được đơn hàng");
  return res.json();
}

export async function fetchOrdersByStatus(userId: number, status: string) {
  const res = await authFetch(
    `${API_URL}/api/orders/${userId}?status=${status}`
  );
  if (!res.ok) throw new Error("Không lấy được đơn hàng theo trạng thái");
  return res.json();
}

export async function createOrder(data: any) {
  const res = await authFetch(`${API_URL}/api/orders`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Không tạo được đơn hàng");

  return json;
}
