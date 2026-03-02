"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function PasswordResetSentCard() {
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(window.localStorage.getItem("resetEmail") ?? "your email")
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f2f8ff] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[872px] rounded-[23px] border border-[#e7e8eb] bg-white px-12 py-28 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="mx-auto w-full max-w-[514px] rounded-[10px] bg-white">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#007bff]">
              <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h1 className="text-[22px] font-bold text-[rgba(0,0,0,0.7)]">
              Thank you, check your emails
            </h1>

            <p className="text-[14px] text-[rgba(48,48,48,0.83)]">
              We want to keep your account safe from anyone pretending to be you.
            </p>

            <p className="text-[14px] text-[rgba(48,48,48,0.83)]">
              We&apos;ve sent a verification email to {email}
            </p>

            <p className="text-[14px] text-[rgba(48,48,48,0.83)]">
              If the email doesn&apos;t land in your inbox, check your spam folder.
            </p>

            <Link
              href="/login"
              className="mt-4 h-[38px] w-[270px] flex items-center justify-center rounded-md bg-[#2e37a4] px-3 py-2 text-[14px] font-medium text-white"
            >
              Reset Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
