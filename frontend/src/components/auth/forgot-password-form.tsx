"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function ForgotPasswordForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Implement forgot password logic
    console.log("Password reset requested for:", email)
    
    // Store email for next screen
    if (typeof window !== "undefined") {
      window.localStorage.setItem("resetEmail", email)
    }
    
    router.push("/password-reset-sent")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f2f8ff] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[872px] rounded-[23px] border border-[#e7e8eb] bg-white px-12 py-28 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="mx-auto w-full max-w-[514px] rounded-[10px] bg-white">
          <div className="flex flex-col items-center gap-5">
            <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#007bff]">
              <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h1 className="text-[22px] font-bold text-[rgba(0,0,0,0.7)]">
              Forgot Password
            </h1>

            <form onSubmit={handleSubmit} className="w-full space-y-5">
              <div className="space-y-1">
                <label className="text-[14px] font-medium text-[#0a1b39]">
                  Email Address
                </label>
                <div className="flex items-center gap-2 rounded-md border border-[#e7e8eb] bg-white px-3 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email Address"
                    className="w-full text-[14px] text-[#9da4b0] placeholder:text-[#9da4b0] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="h-[38px] w-full rounded-md bg-[#2e37a4] px-3 py-2 text-[14px] font-medium text-white"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>

              <p className="text-center text-[14px] text-[#212529]">
                Return to{" "}
                <Link href="/login" className="text-[#007bff]">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
