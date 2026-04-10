"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const QUOTE_TEXT = "Your health story helps us coordinate the right support."
const QUOTE_AUTHOR = "MedLink360 Team"

export function ProfileRolePatientForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    department: "",
    primaryHospital: "",
    hospitalHistory: "",
  })

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // TODO: Wire to profile completion API
    console.log("Patient role details submitted", formData)
    router.push("/verification-patient")
  }

  return (
    <div className="min-h-screen bg-[color:var(--background)] px-6 py-10">
      <div className="mx-auto grid w-full max-w-[1280px] items-stretch gap-6 lg:grid-cols-[minmax(0,754px)_minmax(0,523px)]">
        <div className="relative order-2 overflow-hidden rounded-[27px] lg:order-1">
          <img
            src="/auth/register-hero.png"
            alt="Healthcare professionals"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <Link
            href="/profile-step-two"
            className="absolute left-6 top-6 inline-flex items-center gap-2 text-white/90"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-lg font-medium">Back</span>
          </Link>
          <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/20 bg-gradient-to-b from-white/10 to-sky-300/20 px-5 py-4 backdrop-blur-sm">
            <p className="text-2xl italic leading-snug text-white">
              {QUOTE_TEXT} "- <span className="font-semibold">{QUOTE_AUTHOR}</span>"
            </p>
          </div>
        </div>

        <div className="order-1 flex items-center justify-center lg:order-2">
          <div className="w-full max-w-[523px] rounded-[23px] border border-[color:var(--border-light)] bg-white p-10 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-[color:var(--background)] px-3 py-1 text-[13px] text-[color:var(--grey-500)]">
                Step 3 of 3 • Patient History
              </div>
              <h1 className="mt-4 text-[23px] font-bold text-[color:var(--foreground)]">
                Care history
              </h1>
              <p className="mt-2 text-[16px] text-[color:var(--grey-500)]">
                Share your usual department and previous hospital visits for better continuity.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="h-2 w-8 rounded-full bg-[color:var(--brand-primary)]" />
                <span className="h-2 w-8 rounded-full bg-[color:var(--brand-primary)]" />
                <span className="h-2 w-8 rounded-full bg-[color:var(--brand-primary)]" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                  Preferred Department
                </label>
                <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(event) => handleChange("department", event.target.value)}
                    placeholder="e.g. Cardiology"
                    className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                  Primary Hospital or Clinic
                </label>
                <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <input
                    type="text"
                    value={formData.primaryHospital}
                    onChange={(event) => handleChange("primaryHospital", event.target.value)}
                    placeholder="Enter your main hospital"
                    className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                  Hospital History
                </label>
                <div className="flex items-start gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <svg className="mt-1 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <textarea
                    value={formData.hospitalHistory}
                    onChange={(event) => handleChange("hospitalHistory", event.target.value)}
                    placeholder="List prior hospitals, admissions, or ongoing care"
                    className="w-full resize-none text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                    rows={3}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-[7px] bg-[color:var(--brand-primary)] text-[16px] font-medium text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                Save and Continue
              </button>

              <Link
                href="/dashboard"
                className="flex h-11 w-full items-center justify-center rounded-[7px] border border-[color:var(--border-light)] bg-white text-[16px] font-medium text-[color:var(--foreground)]"
              >
                Skip for now
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
