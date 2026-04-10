"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"

const QUOTE_TEXT =
  "Keep your face always toward the sunshine – and shadows will fall behind you."
const QUOTE_AUTHOR = "Walt Whitman"

type SigninErrors = Partial<{
  email: string
  password: string
}>

export function SigninForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<SigninErrors>({})

  const clearError = (field: keyof SigninErrors) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev
      }
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const validate = (): SigninErrors => {
    const nextErrors: SigninErrors = {}

    if (!email.trim()) {
      nextErrors.email = "Email is required."
    } else if (!email.includes("@")) {
      nextErrors.email = "Enter a valid email address."
    }
    if (!password) {
      nextErrors.password = "Password is required."
    }

    return nextErrors
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setLoading(true)
    
    // TODO: Implement Supabase authentication
    console.log("Signin attempt:", { email, password })
    
    setLoading(false)
  }

  const handleGoogleSignin = () => {
    // TODO: Implement Google OAuth
    console.log("Google signin clicked")
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
            href="/"
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
            <div className="mb-8 flex flex-col items-center">
              <img
                src="/auth/medlink360-logo.png"
                alt="MedLink360"
                className="h-[85px] w-auto"
              />
            </div>

            <div className="mb-6 text-center">
              <h1 className="text-[23px] font-bold text-[color:var(--foreground)]">Login</h1>
              <p className="mt-2 text-[16px] text-[color:var(--grey-500)]">
                Please enter your details to sign in
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                  Email Address
                </label>
                <div
                  className={`flex items-center gap-2 rounded-[7px] border ${
                    errors.email ? "border-red-200" : "border-[color:var(--border-light)]"
                  } bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]`}
                >
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      clearError("email")
                    }}
                    placeholder="Enter Email Address"
                    className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                    aria-invalid={Boolean(errors.email)}
                    required
                  />
                </div>
                {errors.email && <p className="text-[12px] text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[16px] font-medium text-[color:var(--foreground)]">
                  Password
                </label>
                <div
                  className={`flex items-center justify-between gap-2 rounded-[7px] border ${
                    errors.password ? "border-red-200" : "border-[color:var(--border-light)]"
                  } bg-white px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]`}
                >
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      clearError("password")
                    }}
                    placeholder="************"
                    className="w-full text-[16px] text-[color:var(--foreground)] placeholder:text-[color:var(--grey-300)] focus:outline-none"
                    aria-invalid={Boolean(errors.password)}
                    required
                  />
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                </div>
                {errors.password && (
                  <p className="text-[12px] text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-[14px] text-[color:var(--grey-500)]">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[color:var(--brand-primary)]"
                  />
                  Remember me
                </label>
                <Link href="/forgot-password" className="text-[color:var(--brand-primary)]">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-[7px] bg-[color:var(--brand-primary)] text-[16px] font-medium text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[color:var(--border-light)]" />
              <span className="text-[15px] text-[color:var(--grey-500)]">OR</span>
              <div className="h-px flex-1 bg-[color:var(--border-light)]" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                className="flex h-12 items-center justify-center rounded-[7px] border border-[color:var(--border-light)] bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={handleGoogleSignin}
                className="flex h-12 items-center justify-center rounded-[7px] border border-[color:var(--border-light)] bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button
                type="button"
                className="flex h-12 items-center justify-center rounded-[7px] border border-[color:var(--border-light)] bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#000000">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              </button>
            </div>

            <p className="mt-6 text-center text-[16px] text-[color:var(--foreground)]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[color:var(--brand-primary)]">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
