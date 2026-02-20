"use client"

import Link from "next/link"

export function PasswordResetSuccessCard() {
  return (
    <div className="min-h-screen bg-[#f2f8ff] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[872px] rounded-[23px] border border-[#e7e8eb] bg-white px-12 py-28 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex flex-col items-center gap-9">
          <div className="w-full max-w-[514px] rounded-[10px] bg-white">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#007bff]">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h1 className="text-[22px] font-bold text-[rgba(0,0,0,0.7)]">
                Welcome back, your account is restored
              </h1>

              <p className="text-[14px] text-[rgba(48,48,48,0.83)]">
                Thank you for trusting with us.
              </p>

              <p className="text-[14px] text-[rgba(48,48,48,0.83)]">
                Your new password has been successfully.
              </p>

              <p className="text-[14px] text-[rgba(48,48,48,0.83)]">
                You can correct or complete your profile information in your account.
              </p>
            </div>
          </div>

          <Link
            href="/login"
            className="flex h-[45px] w-[535px] items-center justify-center rounded-[7px] bg-[#007bff] px-4 py-2 text-[16px] font-medium text-[#f4f4f4] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
          >
            Go Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
