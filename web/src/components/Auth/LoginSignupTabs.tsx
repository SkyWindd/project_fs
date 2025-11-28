"use client"

import React, { useEffect, useState } from "react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs"
import { useSearchParams } from "react-router-dom"

export default function LoginSignupTabs() {
  const [tab, setTab] = useState<"login" | "signup">("login")
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const param = searchParams.get("tab")
    if (param === "login" || param === "signup") setTab(param)
  }, [searchParams])

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Wrapper card */}
      <div
        className="
          bg-white border border-gray-100 rounded-3xl shadow-lg
          px-6 sm:px-10 py-8 sm:py-10
          transition-all duration-300
          hover:shadow-2xl hover:-translate-y-0.5
          backdrop-blur-md
        "
      >
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as "login" | "signup")}
          className="w-full"
        >
          {/* Header Tabs */}
          <TabsList
            className="
              w-full grid grid-cols-2 p-1.5
              bg-gray-100 border border-gray-200
              rounded-full shadow-inner
            "
          >
            <TabsTrigger
              value="login"
              className="
                py-2.5 text-sm sm:text-base font-medium
                rounded-full transition-all duration-200
                text-gray-700 hover:text-red-600
                
                data-[state=active]:bg-white
                data-[state=active]:text-red-600
                data-[state=active]:font-semibold
                data-[state=active]:shadow-md
              "
            >
              Đăng nhập
            </TabsTrigger>

            <TabsTrigger
              value="signup"
              className="
                py-2.5 text-sm sm:text-base font-medium
                rounded-full transition-all duration-200
                text-gray-700 hover:text-red-600
                
                data-[state=active]:bg-white
                data-[state=active]:text-red-600
                data-[state=active]:font-semibold
                data-[state=active]:shadow-md
              "
            >
              Đăng ký
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <div className="mt-8 animate-fadeIn">
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>

            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-xs text-gray-500 tracking-wide">
        © 2025 
        <span className="font-semibold text-red-600"> FoodDrone</span> —
        Giao pizza nhanh, nóng, ngon 🍕
      </div>
    </div>
  )
}
