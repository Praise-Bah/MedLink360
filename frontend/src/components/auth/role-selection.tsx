"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const roles = [
  {
    id: "patient",
    title: "Patient",
    description: "Access medical records, book appointments, manage health",
  },
  {
    id: "doctor",
    title: "Doctor",
    description: "Manages patients, creates medical records, and prescribes medications.",
  },
  {
    id: "nurse",
    title: "Nurse",
    description: "Documents care, manages appointments, and monitors patients.",
  },
  {
    id: "pharmacist",
    title: "Pharmacist",
    description: "Dispenses medications and manages pharmacy operations.",
  },
  {
    id: "lab-technician",
    title: "Lab Technician",
    description: "Processes lab tests, uploads results, and manages the test queue.",
  },
]

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const router = useRouter()

  const handleSelect = (roleId: string) => {
    setSelectedRole(roleId)
    console.log("Role selected:", roleId)
    if (typeof window !== "undefined") {
      window.localStorage.setItem("selectedRole", roleId)
    }
    router.push(`/signup?role=${encodeURIComponent(roleId)}`)
  }

  return (
    <div className="min-h-screen bg-[color:var(--background)] px-6 py-12">
      <div className="mx-auto w-full max-w-[1253px] rounded-[23px] border border-[color:var(--border-light)] bg-white px-7 py-12 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <Link href="/entry" className="inline-flex items-center gap-2 text-[20px] text-[#212529]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Back</span>
        </Link>

        <div className="mt-6">
          <h1 className="text-[23px] font-bold text-[#212529]">Choose Your Role</h1>
          <p className="mt-2 text-[16px] text-[rgba(33,37,41,0.78)]">
            Select the role that best describes you
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {roles.map((role) => {
            const isSelected = selectedRole === role.id
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleSelect(role.id)}
                className={`flex w-full flex-col justify-center gap-1 rounded-[7px] border px-4 py-4 text-left shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition ${
                  isSelected
                    ? "border-[color:var(--brand-primary)]"
                    : "border-[color:var(--border-light)]"
                }`}
              >
                <span className="text-[16px] font-medium text-[#212529]">
                  {role.title}
                </span>
                <span className="text-[14px] text-[rgba(33,37,41,0.78)]">
                  {role.description}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
