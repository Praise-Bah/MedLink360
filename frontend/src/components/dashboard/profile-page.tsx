"use client"

import { useState } from "react"

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Divino",
    lastName: "",
    email: "divino90@gmail.com",
    phone: "+237 777777777",
    dateOfBirth: "12/10/1998",
    sex: "female",
    maritalStatus: "single",
    address: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
            <span className="text-lg">📊</span>
            <span>Dashboard Overview</span>
          </a>
          <a href="/appointments" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg">📅</span>
            <span>Appointments</span>
          </a>
          <a href="/medical-book" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg">📋</span>
            <span>Medical Book</span>
          </a>
          <a href="/notifications" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg">🔔</span>
            <span>Notifications</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-white bg-white/20 rounded-lg px-4 py-3">
            <span className="text-lg">👤</span>
            <span>Profile</span>
          </a>
          <a href="/settings" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg">⚙️</span>
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
              <p className="font-medium text-sm">Divino237</p>
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

      {/* Main Content */}
      <div className="ml-64 min-h-screen overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Picture Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-blue-600 mb-4">Profile Picture</h2>
                
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                      <img 
                        src="/api/placeholder/128/128" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Divino 237</h3>
                  <p className="text-gray-600 mb-4">Patient ID: #1234</p>
                  
                  {isEditing && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Upload Photo
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-blue-600 mb-4">Personal Information</h2>
                <p className="text-gray-600 mb-6">Update your personal details and contact information</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="text"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  {/* Sex */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
                    <select
                      value={formData.sex}
                      onChange={(e) => handleInputChange('sex', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      <option value="female">female</option>
                      <option value="male">male</option>
                    </select>
                  </div>

                  {/* Marital Status */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
                    <select
                      value={formData.maritalStatus}
                      onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      <option value="single">single</option>
                      <option value="married">married</option>
                      <option value="divorced">divorced</option>
                      <option value="widowed">widowed</option>
                    </select>
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                      placeholder="Enter your full address"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-100">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ID Verification Section */}
          <div className="mt-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Manage your personal information and ID verification</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ID Upload Area */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-300 transition-colors">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload ID Document</h3>
                  <p className="text-gray-600 mb-4">Upload a clear photo of your government-issued ID</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Choose File
                  </button>
                </div>

                {/* Verification Status */}
                <div className="border border-gray-200 rounded-xl p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Pending</h3>
                    <p className="text-gray-600 mb-4">Your ID verification is currently being processed</p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">Expected completion: 2-3 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
