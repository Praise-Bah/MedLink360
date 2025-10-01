"use client"

import { useState } from "react"

export function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    marketingEmails: false,
    twoFactorAuth: false,
    dataSharing: true,
    profileVisibility: "private"
  })

  const handleToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }))
  }

  const handleSelectChange = (setting: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 z-10">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-lg">MedLink360</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <a href="/dashboard" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Dashboard Overview</span>
          </a>
          <a href="/appointments" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Appointments</span>
          </a>
          <a href="/medical-book" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Medical Book</span>
          </a>
          <a href="/notifications" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Notifications</span>
          </a>
          <a href="/profile" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Profile</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-white bg-white/20 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Settings</span>
          </a>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-20 left-6 right-6">
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">D</span>
            </div>
            <div>
              <p className="font-medium text-sm">Divina237</p>
              <p className="text-xs text-white/70">Patient</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="absolute bottom-6 left-6 right-6">
          <button className="w-full bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content - Empty */}
      <div className="ml-64 min-h-screen bg-gray-50">
        {/* Empty content area */}
      </div>
    </div>
  )
}
