"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const QUOTE_TEXT =
  "Every detail you share helps us deliver safer and more personal care."
const QUOTE_AUTHOR = "MedLink360 Team"

export function ProfileStepOneForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    itin: "",
  })
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // TODO: Wire to profile completion API
    console.log("Profile step 1 submitted", { ...formData, agreeToTerms })
    router.push("/profile-step-two")
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
            href="/account-created"
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
                Step 1 of 3 • Personal Data
              </div>
              <h1 className="mt-4 text-[23px] font-bold text-[color:var(--foreground)]">
                Complete your profile
              </h1>
              <p className="mt-2 text-[16px] text-[color:var(--grey-500)]">
                Tell us a little about yourself so we can personalize your care journey.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="h-2 w-8 rounded-full bg-[color:var(--brand-primary)]" />
                <span className="h-2 w-2 rounded-full bg-[color:var(--border-light)]" />
                <span className="h-2 w-2 rounded-full bg-[color:var(--border-light)]" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                    First Name
                  </label>
                  <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(event) => handleChange("firstName", event.target.value)}
                      placeholder="Enter first name"
                      className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                    Last Name
                  </label>
                  <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(event) => handleChange("lastName", event.target.value)}
                      placeholder="Enter last name"
                      className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) => handleChange("email", event.target.value)}
                      placeholder="Enter email address"
                      className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(event) => handleChange("phone", event.target.value)}
                      placeholder="e.g. +237 680 000 000"
                      className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                    Date of Birth
                  </label>
                  <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                    <input
                      type="text"
                      value={formData.dateOfBirth}
                      onChange={(event) => handleChange("dateOfBirth", event.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                    Gender
                  </label>
                  <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                    <select
                      value={formData.gender}
                      onChange={(event) => handleChange("gender", event.target.value)}
                      className="w-full bg-transparent text-[16px] text-[color:var(--foreground)] focus:outline-none"
                      required
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                  ITIN / National ID
                </label>
                <div className="flex items-center gap-2 rounded-[7px] border border-[color:var(--border-light)] bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <input
                    type="text"
                    value={formData.itin}
                    onChange={(event) => handleChange("itin", event.target.value)}
                    placeholder="Enter your ITIN or national ID"
                    className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                    required
                  />
                </div>
                <p className="text-[13px] text-[color:var(--grey-500)]">
                  Used for verification only and stored securely in your profile.
                </p>
              </div>

              <label className="flex items-start gap-3 text-[15px] text-[color:var(--grey-500)]">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(event) => setAgreeToTerms(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[color:var(--brand-primary)]"
                  required
                />
                <span>
                  I confirm that the information above is accurate and agree to the
                  <span className="text-[color:var(--brand-primary)]"> Data Protection Policy</span>.
                </span>
              </label>

              <button
                type="submit"
                className="h-11 w-full rounded-[7px] bg-[color:var(--brand-primary)] text-[16px] font-medium text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                Continue to Step 2
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
