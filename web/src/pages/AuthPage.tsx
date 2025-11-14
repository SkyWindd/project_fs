import React from "react"
import LoginSignupTabs from "../components/Auth/LoginSignupTabs"

export default function AuthPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-start pt-20 pb-8 px-4">
      <LoginSignupTabs />
    </div>
  )
}
