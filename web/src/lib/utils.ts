import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ✅ Định dạng giờ: giữ nguyên mock (Z), còn giờ thực thì chuyển sang múi giờ VN
export function formatDateTime(value?: string) {
  // Nếu không có giá trị → trả fallback
  if (!value || typeof value !== "string") return "Không có dữ liệu";

  try {
    // Một số MongoDB timestamp không có 'Z' → ta convert bình thường
    const date = new Date(value);

    if (isNaN(date.getTime())) return "Không hợp lệ";

    return date.toLocaleString("vi-VN", {
      hour12: false,
    });
  } catch (e) {
    return "Không hợp lệ";
  }
}

