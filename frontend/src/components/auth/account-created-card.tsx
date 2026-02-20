"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const ROLE_LABELS: Record<string, string> = {
  patient: "Patient",
  doctor: "Doctor",
  nurse: "Nurse",
  pharmacist: "Pharmacist",
  "lab-technician": "Lab Technician",
}

export function AccountCreatedCard() {
  const [roleLabel, setRoleLabel] = useState("your role")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = window.localStorage.getItem("selectedRole")
      if (storedRole && ROLE_LABELS[storedRole]) {
        setRoleLabel(ROLE_LABELS[storedRole])
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[color:var(--background)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full items-center justify-center">
        <div className="w-full max-w-[872px] rounded-[23px] border border-[color:var(--border-light)] bg-white px-12 py-20 text-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="mx-auto flex w-full max-w-[514px] flex-col items-center gap-4 rounded-[10px] border border-[color:var(--border-light)] bg-white px-8 py-10 text-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#007bff]/10">
              <svg className="h-12 w-12 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-[22px] font-bold text-[rgba(0,0,0,0.7)]">
              Account created successfully
            </h1>
            <p className="text-[14px] text-[rgba(48,48,48,0.83)]">
              Your MedLink360 account is ready. Let&apos;s finish your {roleLabel.toLowerCase()} setup.
            </p>
            <div className="mt-2 flex w-full flex-col gap-3">
              <Link
                href="/profile-step-one"
                className="flex h-11 items-center justify-center rounded-[7px] bg-[color:var(--brand-primary)] text-[16px] font-medium text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                Continue profile setup
              </Link>
              <Link
                href="/dashboard"
                className="flex h-11 items-center justify-center rounded-[7px] border border-[color:var(--border-light)] bg-white text-[16px] font-medium text-[color:var(--foreground)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                Skip for now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
