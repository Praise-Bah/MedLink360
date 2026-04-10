"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const QUOTE_TEXT = "Connection details help us reach you when it matters most."
const QUOTE_AUTHOR = "MedLink360 Team"

export function ProfileStepTwoForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    emergencyContactName: "",
    emergencyContactPhone: "",
    relationship: "",
    addressLine: "",
    city: "",
    region: "",
    country: "",
    postalCode: "",
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
    console.log("Profile step 2 submitted", formData)

    if (typeof window !== "undefined") {
      const storedRole = window.localStorage.getItem("selectedRole")
      const providerRoles = ["doctor", "nurse", "pharmacist", "lab-technician"]
      if (storedRole && providerRoles.includes(storedRole)) {
        router.push("/profile-role-provider")
      } else {
        router.push("/profile-role-patient")
      }
      return
    }

    router.push("/profile-role-patient")
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
            href="/profile-step-one"
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
                Step 2 of 3 • Contacts & Address
              </div>
              <h1 className="mt-4 text-[23px] font-bold text-[color:var(--foreground)]">
                Stay connected
              </h1>
              <p className="mt-2 text-[16px] text-[color:var(--grey-500)]">
                Add emergency contacts and your home address for safer care delivery.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="h-2 w-8 rounded-full bg-[color:var(--brand-primary)]" />
                <span className="h-2 w-8 rounded-full bg-[color:var(--brand-primary)]" />
                <span className="h-2 w-2 rounded-full bg-[color:var(--border-light)]" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                    Emergency Contact Name
                  </label>
                  <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                    <input
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(event) => handleChange("emergencyContactName", event.target.value)}
                      placeholder="Enter full name"
                      className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                    Emergency Contact Phone
                  </label>
                  <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                    <input
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={(event) => handleChange("emergencyContactPhone", event.target.value)}
                      placeholder="e.g. +237 680 000 000"
                      className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                  Relationship
                </label>
                <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <input
                    type="text"
                    value={formData.relationship}
                    onChange={(event) => handleChange("relationship", event.target.value)}
                    placeholder="e.g. Parent, Spouse, Sibling"
                    className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                  Home Address
                </label>
                <div className="flex items-start gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <svg className="mt-1 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <textarea
                    value={formData.addressLine}
                    onChange={(event) => handleChange("addressLine", event.target.value)}
                    placeholder="Street address, building, or landmark"
                    className="w-full resize-none text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                    rows={2}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                    City
                  </label>
                  <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(event) => handleChange("city", event.target.value)}
                      placeholder="Enter city"
                      className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                    Region/State
                  </label>
                  <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                    <input
                      type="text"
                      value={formData.region}
                      onChange={(event) => handleChange("region", event.target.value)}
                      placeholder="Enter region"
                      className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                    Country
                  </label>
                  <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(event) => handleChange("country", event.target.value)}
                      placeholder="Enter country"
                      className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                    Postal Code
                  </label>
                  <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(event) => handleChange("postalCode", event.target.value)}
                      placeholder="e.g. 00237"
                      className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-[7px] bg-[color:var(--brand-primary)] text-[16px] font-medium text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                Continue to Step 3
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
