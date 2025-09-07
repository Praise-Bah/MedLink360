"use client"

import { useState } from "react"
import { Button } from "@/components/common/Button"
import Link from "next/link"

export function SigninForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-2/5 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="mb-6">
            <div className="flex items-center mb-1">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-lg font-bold text-gray-800">MedLink360</span>
            </div>
            <p className="text-xs text-gray-500">A Healthcare Management Platform</p>
          </div>

          {/* Header */}
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h1>
            <p className="text-gray-600 text-xs">Sign in to your MedLink360 account</p>
          </div>

          {/* Google Signin Button */}
          <button
            onClick={handleGoogleSignin}
            className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors mb-4 text-sm"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                placeholder="divinako963@gmail.com"
              />
            </div>
            
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                placeholder="xxxxxxxxxxxxxxxx"
              />
            </div>
            
            {/* Sign In Button */}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 mt-4 text-sm"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          
          {/* Create Account Link */}
          <div className="mt-3 text-center">
            <span className="text-xs text-gray-600">Don't have an account? </span>
            <Link href="/signup" className="text-xs text-blue-600 hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Healthcare professionals image */}
      <div className="w-7/10 relative h-[100vh]">
        <img 
          src="/Rectangle15.png" 
          alt="Healthcare professionals" 
          className="w-full h-full object-contain"
          style={{ objectPosition: 'center center', border: 'solid', backgroundColor: '#0080FF' }}
        />
      </div>
    </div>
  )
}
