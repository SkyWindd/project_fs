import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ✅ Định dạng giờ: giữ nguyên mock (Z), còn giờ thực thì chuyển sang múi giờ VN
export const formatDateTime = (isoString: string) => {
  const isUTC = isoString.endsWith("Z")

  if (isUTC) {
    const [date, time] = isoString.replace("Z", "").split("T")
    const [year, month, day] = date.split("-")
    return `${time} ${day}/${month}/${year}`
  }

  return new Date(isoString).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  })
}

