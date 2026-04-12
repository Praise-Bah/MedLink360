"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/common/Button"

interface InvitationData {
  email: string
  role: string
  role_display: string
  hospital_name: string | null
  full_name: string
  expires_at: string
  is_valid: boolean
}

export function AcceptInvitationForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [invitation, setInvitation] = useState<InvitationData | null>(null)
  const [success, setSuccess] = useState(false)

  // Form fields
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!token) {
      setError("No invitation token provided.")
      setLoading(false)
      return
    }

    // Verify token
    verifyToken(token)
  }, [token])

  const verifyToken = async (tokenValue: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/accounts/invitations/verify/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token: tokenValue })
      // })
      
      // Simulate API response for now
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock invitation data
      setInvitation({
        email: "admin@hospital.com",
        role: "hospital_admin",
        role_display: "Hospital Administrator",
        hospital_name: "City General Hospital",
        full_name: "Dr. John Mensah",
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        is_valid: true
      })
      
      setLoading(false)
    } catch (err) {
      setError("Invalid or expired invitation link.")
      setLoading(false)
    }
  }

  const validatePassword = () => {
    if (password.length < 8) {
      return "Password must be at least 8 characters"
    }
    if (password !== passwordConfirm) {
      return "Passwords do not match"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const passwordError = validatePassword()
    if (passwordError) {
      setError(passwordError)
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/accounts/invitations/accept/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     token,
      //     first_name: firstName,
      //     last_name: lastName,
      //     phone_number: phoneNumber,
      //     password,
      //     password_confirm: passwordConfirm
      //   })
      // })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSuccess(true)
    } catch (err) {
      setError("Failed to create account. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying invitation...</p>
        </div>
      </div>
    )
  }

  // Error state (invalid/expired token)
  if (error && !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Invitation</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push("/")} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Go to Homepage
          </Button>
        </div>
      </div>
    )
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-6">
            Your {invitation?.role_display} account has been created successfully.
            {invitation?.hospital_name && (
              <span className="block mt-2">
                You are now the administrator of <strong>{invitation.hospital_name}</strong>.
              </span>
            )}
          </p>
          <Button onClick={() => router.push("/login")} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Sign In to Your Account
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-6">
            <img 
              src="/medlink360_logo_cropped.png" 
              alt="MedLink360" 
              className="h-10 object-contain"
            />
            <p className="text-xs text-gray-500 mt-1">A Healthcare Management Platform</p>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Complete Your Registration</h1>
            <p className="text-gray-600 text-sm">
              You've been invited to join as a {invitation?.role_display}
            </p>
          </div>

          {/* Invitation Info Card */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">{invitation?.email}</p>
                <p className="text-xs text-blue-700">{invitation?.role_display}</p>
                {invitation?.hospital_name && (
                  <p className="text-xs text-blue-600 mt-1">{invitation.hospital_name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mensah"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+237 XX XXX XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="Min. 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Re-enter password"
              />
              {password && passwordConfirm && password !== passwordConfirm && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 mt-4"
              disabled={submitting}
            >
              {submitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center p-12">
        <div className="text-white max-w-md text-center">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome to MedLink360</h2>
          <p className="text-blue-100 mb-8">
            You're just one step away from accessing your administrator dashboard 
            and managing your healthcare facility.
          </p>
          <div className="bg-white/10 rounded-lg p-6 text-left">
            <h3 className="font-semibold mb-3">As an administrator, you can:</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Manage hospital staff accounts
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Verify doctors, nurses, and technicians
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Monitor facility operations
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Access analytics and reports
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
