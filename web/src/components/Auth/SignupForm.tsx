"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Field, FieldGroup, FieldLabel, FieldError } from "../ui/field"
import { toast } from "sonner"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { mockUsers } from "../../../mock/mockData"
import type { User as UserType } from "../../../mock/mockData"
import { useAuth } from "../../context/AuthContext" // ✅ Context đăng nhập

// ✅ Kiểm tra form bằng Zod
const signupSchema = z
  .object({
    name: z.string().min(2, "Tên phải ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
    confirmPassword: z.string().min(6, "Xác nhận mật khẩu phải ít nhất 6 ký tự"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupForm() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const navigate = useNavigate()
  const { login } = useAuth() // ✅ Lấy hàm login từ context

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onSubmit = (data: SignupFormValues) => {
    const existingUser = mockUsers.find((u) => u.email === data.email)
    if (existingUser) {
      toast.error("Email này đã được đăng ký trước đó ❌")
      return
    }

    // ✅ Tạo user mới
    const newUser: UserType = {
      user_id: mockUsers.length + 1,
      full_name: data.name,
      email: data.email,
      phone_number: "",
      password: data.password,
      role: "customer",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // ✅ Giả lập lưu user mới (mock local)
    const updatedUsers = [...mockUsers, newUser]
    localStorage.setItem("mockUsers", JSON.stringify(updatedUsers))

    // ✅ Đăng nhập user vừa tạo (qua context)
    login(newUser)
    toast.success(`Chào mừng ${newUser.full_name}! 🎉`)

    setTimeout(() => navigate("/"), 1000)
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-100 rounded-3xl bg-white/90 backdrop-blur-sm transition-all hover:shadow-xl">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-2xl font-bold text-gray-800 tracking-tight">
          Tạo tài khoản mới
        </CardTitle>
        <p className="text-sm text-gray-500 mt-1">
          Chỉ mất vài giây để tham gia cùng chúng tôi 🚀
        </p>
      </CardHeader>

      <CardContent className="space-y-6 pt-4 pb-6 px-2 sm:px-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
            {/* Họ & Tên */}
            <Field>
              <FieldLabel htmlFor="name">Họ & tên</FieldLabel>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Nguyễn Văn A"
                  className="pl-10 py-2.5 text-sm rounded-lg border-gray-200 focus:border-red-500 focus-visible:ring-red-500"
                />
              </div>
              {form.formState.errors.name && (
                <FieldError>{form.formState.errors.name.message}</FieldError>
              )}
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="you@example.com"
                  className="pl-10 py-2.5 text-sm rounded-lg border-gray-200 focus:border-red-500 focus-visible:ring-red-500"
                />
              </div>
              {form.formState.errors.email && (
                <FieldError>{form.formState.errors.email.message}</FieldError>
              )}
            </Field>

            {/* Mật khẩu */}
            <Field>
              <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...form.register("password")}
                  placeholder="••••••••"
                  className="pl-10 pr-10 py-2.5 text-sm rounded-lg border-gray-200 focus:border-red-500 focus-visible:ring-red-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {form.formState.errors.password && (
                <FieldError>{form.formState.errors.password.message}</FieldError>
              )}
            </Field>

            {/* Xác nhận mật khẩu */}
            <Field>
              <FieldLabel htmlFor="confirmPassword">Xác nhận mật khẩu</FieldLabel>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...form.register("confirmPassword")}
                  placeholder="••••••••"
                  className="pl-10 pr-10 py-2.5 text-sm rounded-lg border-gray-200 focus:border-red-500 focus-visible:ring-red-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <FieldError>
                  {form.formState.errors.confirmPassword.message}
                </FieldError>
              )}
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 rounded-lg text-sm font-medium shadow-md transition-all active:scale-[0.98]"
          >
            Đăng ký
          </Button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-3">
          Khi đăng ký, bạn đồng ý với{" "}
          <a href="#" className="text-red-600 font-medium hover:underline">
            Điều khoản dịch vụ
          </a>{" "}
          và{" "}
          <a href="#" className="text-red-600 font-medium hover:underline">
            Chính sách bảo mật
          </a>.
        </p>
      </CardContent>
    </Card>
  )
}
