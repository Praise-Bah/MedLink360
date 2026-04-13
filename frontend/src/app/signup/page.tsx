"use client"

import { Suspense } from "react"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>}>
      <SignupForm />
    </Suspense>
  )
}
