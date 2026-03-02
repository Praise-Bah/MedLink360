"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function VerificationEmailCard() {
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(window.localStorage.getItem("signupEmail") ?? "")
    }
  }, [])

  const displayEmail = email || "your email address"

  return (
    <div className="min-h-screen bg-[color:var(--background)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full items-center justify-center">
        <div className="w-full max-w-[872px] rounded-[23px] border border-[color:var(--border-light)] bg-white px-12 py-20 text-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="mx-auto flex w-full max-w-[514px] flex-col items-center gap-4 rounded-[10px] border border-[color:var(--border-light)] bg-white px-8 py-10 text-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#007bff]/10">
              <svg className="h-12 w-12 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              We&apos;ve sent a verification email to {displayEmail}.
            </p>
            <p className="text-[14px] text-[rgba(48,48,48,0.83)]">
              If the email doesn&apos;t land in your inbox, check your spam folder.
            </p>
            <div className="mt-3 flex w-full flex-col gap-3">
              <Link
                href="/account-created"
                className="flex h-11 items-center justify-center rounded-[7px] bg-[color:var(--brand-primary)] text-[16px] font-medium text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                I&apos;ve verified my email
              </Link>
              <Link
                href="/login"
                className="flex h-11 items-center justify-center rounded-[7px] border border-[color:var(--border-light)] bg-white text-[16px] font-medium text-[color:var(--foreground)]"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
