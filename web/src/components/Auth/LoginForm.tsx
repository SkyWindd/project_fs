"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Field, FieldLabel, FieldError, FieldGroup } from "../ui/field"
import { toast } from "sonner"
import { Lock, Mail, Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { mockUsers } from "../../../mock/mockData"
import { useAuth } from "../../context/AuthContext" // ✅ Dùng context

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()
  const { login } = useAuth() // ✅ Lấy hàm login từ context
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data: LoginFormValues) => {
    const user = mockUsers.find(
      (u) => u.email === data.email && u.password === data.password
    )

    if (user) {
      if (!user.is_active) {
        toast.warning("Tài khoản của bạn đã bị khóa 🚫")
        return
      }

      // ✅ Gọi context để lưu user (tự động cập nhật UI)
      login(user)
      toast.success(`Xin chào ${user.full_name}! 🎉`)

      setTimeout(() => {
        navigate(user.role === "admin" ? "/admin" : "/")
      }, 1200)
    } else {
      toast.error("Sai email hoặc mật khẩu ❌")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-100 rounded-3xl bg-white/90 backdrop-blur-sm transition-all hover:shadow-xl">
      {/* Header */}
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-2xl font-bold text-gray-800 tracking-tight">
          👋 Chào mừng bạn trở lại
        </CardTitle>
        <p className="text-sm text-gray-500 mt-1">
          Đăng nhập để tiếp tục mua sắm cùng chúng tôi
        </p>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-6 pt-4 pb-6 px-2 sm:px-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-5"
        >
          <FieldGroup>
            {/* Email */}
            <Field>
              <FieldLabel
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </FieldLabel>
              <div className="relative mt-2">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...form.register("email")}
                  className="pl-10 py-2.5 text-sm rounded-lg border-gray-200 focus:border-red-500 focus-visible:ring-red-500"
                />
              </div>
              {form.formState.errors.email && (
                <FieldError errors={[form.formState.errors.email]} />
              )}
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </FieldLabel>
              <div className="relative mt-2">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...form.register("password")}
                  className="pl-10 pr-10 py-2.5 text-sm rounded-lg border-gray-200 focus:border-red-500 focus-visible:ring-red-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {form.formState.errors.password && (
                <FieldError errors={[form.formState.errors.password]} />
              )}
            </Field>
          </FieldGroup>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 rounded-lg text-sm font-medium shadow-md transition-all active:scale-[0.98]"
          >
            Đăng nhập
          </Button>
        </form>

        {/* Forgot password */}
        <div className="text-center text-xs text-gray-500 mt-4">
          Quên mật khẩu?{" "}
          <a
            href="#"
            className="text-red-600 hover:underline font-medium ml-1"
          >
            Khôi phục ngay
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
