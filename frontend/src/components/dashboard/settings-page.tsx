"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type SettingsTab = "account" | "notification" | "security"

interface ToggleSwitchProps {
  enabled: boolean
  onToggle: () => void
}

function ToggleSwitch({ enabled, onToggle }: ToggleSwitchProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-[52px] h-[28px] rounded-full transition-colors ${
        enabled ? "bg-[#34c759]" : "bg-[#e9ecef]"
      }`}
    >
      <div
        className={`absolute top-[2px] w-[24px] h-[24px] bg-white rounded-full shadow transition-transform ${
          enabled ? "right-[2px]" : "left-[2px]"
        }`}
      />
    </button>
  )
}

export function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<SettingsTab>("account")
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [hasUploadedID, setHasUploadedID] = useState(false) // Track if patient uploaded ID during signup
  
  useEffect(() => {
    const role = localStorage.getItem("selectedRole")
    setUserRole(role)
    // Check if patient has uploaded ID - this would come from user profile data
    const idUploaded = localStorage.getItem("idVerificationCompleted") === "true"
    setHasUploadedID(idUploaded)
  }, [])
  
  // Account settings state
  const [phoneCode, setPhoneCode] = useState("+1")
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    phoneNumber: "456789456789",
    email: "sarah.j@email.com",
    status: "Female",
    dob: "13/08/1976",
    address1: "",
    address2: "",
    bio: userRole === "patient" ? "" : "Hi, I'm Dr. Michael Gannon, a highly esteemed cardiologist with over 10 years of experience in field. I am dedicated to providing exceptional cardiovascular care, tailoring each treatment to the unique needs of my patients. My approach combines cutting-edge technology with compassionate care to ensure the best possible outcomes. I specialize in diagnosing and managing complex heart conditions and am committed to improving overall heart health through both preventive and therapeutic strategies."
  })

  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState({
    appointmentReminders: true,
    medicalRecordUpdates: true,
    dailySummaryReports: true,
    emergencyAlerts: true,
    systemAlert: true,
    billingNotifications: true
  })

  const [pushNotifications, setPushNotifications] = useState({
    appointmentReminders: true,
    messageNotifications: true,
    dailySummaryReports: true,
    emergencyAlerts: true,
    systemAlert: true,
    billingNotifications: true
  })

  // Security settings state
  const [securityData, setSecurityData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const tabs = [
    { id: "account" as SettingsTab, label: "Account Setting" },
    { id: "notification" as SettingsTab, label: "Notification" },
    { id: "security" as SettingsTab, label: "Security" }
  ]

  const notificationItems = [
    { key: "appointmentReminders", label: "Appointment reminders", desc: "Confirmation, reminders, changes" },
    { key: "medicalRecordUpdates", label: "Medical Record Updates", desc: "New Test results, record changes" },
    { key: "dailySummaryReports", label: "Daily summary reports", desc: "Confirmation, reminders, changes" },
    { key: "emergencyAlerts", label: "Emergency alerts", desc: "Confirmation, reminders, changes" },
    { key: "systemAlert", label: "System Alert", desc: "Confirmation, reminders, changes" },
    { key: "billingNotifications", label: "Billing notifications", desc: "Confirmation, reminders, changes" }
  ]

  const pushNotificationItems = [
    { key: "appointmentReminders", label: "Appointment reminders", desc: "Confirmation, reminders, changes" },
    { key: "messageNotifications", label: "Message notifications", desc: "Confirmation, reminders, changes" },
    { key: "dailySummaryReports", label: "Daily summary reports", desc: "Confirmation, reminders, changes" },
    { key: "emergencyAlerts", label: "Emergency alerts", desc: "Confirmation, reminders, changes" },
    { key: "systemAlert", label: "System Alert", desc: "Confirmation, reminders, changes" },
    { key: "billingNotifications", label: "Billing notifications", desc: "Confirmation, reminders, changes" }
  ]

  return (
    <div className="max-w-[1000px] mx-auto">
      {/* Header */}
      <h1 className="text-[28px] font-semibold text-[#212529] mb-6">Settings</h1>

      {/* Tabs */}
      <div className="flex mb-8 bg-[#f8f9fa] rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 text-[14px] font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? "bg-[#007bff] text-white"
                : "text-[#212529] hover:bg-[#e9ecef]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Account Setting Tab */}
      {activeTab === "account" && (
        <div className="space-y-6">
          {/* Profile Pic Section */}
          <div className="border-b border-[#e7e8eb] pb-6">
            <div className="mb-4">
              <h2 className="text-[20px] font-semibold text-[#212529]">Your Profile Pic</h2>
              <p className="text-[14px] text-[#6c757d]">This will be displayed on your profile.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-[80px] h-[80px] rounded-full bg-[#e9ecef] overflow-hidden">
                <img 
                  src="/doctor-avatar.png" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='25' fill='%23cbd5e1'/%3E%3Ccircle cx='50' cy='110' r='45' fill='%23cbd5e1'/%3E%3C/svg%3E"
                  }}
                />
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] font-medium text-[#212529] hover:bg-[#f8f9fa] transition-colors">
                  Upload new Photo
                </button>
                <button className="px-4 py-2 bg-[#6c757d] text-white rounded-lg text-[14px] font-medium hover:bg-[#5a6268] transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Personal Info Section */}
          <div className="border-b border-[#e7e8eb] pb-6">
            <div className="flex gap-8">
              <div className="w-[200px] shrink-0">
                <h2 className="text-[20px] font-semibold text-[#212529]">Personal Info</h2>
                <p className="text-[14px] text-[#6c757d]">Add your personal info</p>
              </div>
              <div className="flex-1">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 text-[14px] font-medium text-[#007bff] hover:bg-[#f8f9fa] rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-medium text-[#212529] mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-[#e7e8eb] rounded-md text-[14px] focus:outline-none focus:border-[#007bff] ${!isEditing ? 'bg-[#f8f9fa] cursor-not-allowed' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#212529] mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-[#e7e8eb] rounded-md text-[14px] focus:outline-none focus:border-[#007bff] ${!isEditing ? 'bg-[#f8f9fa] cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-medium text-[#212529] mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex border border-[#e7e8eb] rounded-md overflow-hidden focus-within:border-[#007bff]">
                      <select
                        value={phoneCode}
                        onChange={(e) => setPhoneCode(e.target.value)}
                        className="px-2 py-2 text-[14px] bg-[#f8f9fa] border-r border-[#e7e8eb] focus:outline-none"
                      >
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+234">🇳🇬 +234</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+86">🇨🇳 +86</option>
                        <option value="+81">🇯🇵 +81</option>
                      </select>
                      <input
                        type="text"
                        value={profileData.phoneNumber}
                        onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                        disabled={!isEditing}
                        placeholder="+44 456789456789"
                        className={`flex-1 px-3 py-2 text-[14px] focus:outline-none ${!isEditing ? 'bg-[#f8f9fa] cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#212529] mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-[#e7e8eb] rounded-md text-[14px] focus:outline-none focus:border-[#007bff] ${!isEditing ? 'bg-[#f8f9fa] cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-medium text-[#212529] mb-1">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={profileData.status}
                      onChange={(e) => setProfileData({...profileData, status: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-[#e7e8eb] rounded-md text-[14px] focus:outline-none focus:border-[#007bff] ${!isEditing ? 'bg-[#f8f9fa] cursor-not-allowed' : 'bg-white'}`}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#212529] mb-1">
                      DOB <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.dob}
                      onChange={(e) => setProfileData({...profileData, dob: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-[#e7e8eb] rounded-md text-[14px] focus:outline-none focus:border-[#007bff] ${!isEditing ? 'bg-[#f8f9fa] cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* ID Verification Section - Only show for patients who haven't uploaded ID */}
          {userRole === "patient" && !hasUploadedID && (
            <div className="border-b border-[#e7e8eb] pb-6">
              <div className="flex gap-8">
                <div className="w-[200px] shrink-0">
                  <h2 className="text-[20px] font-semibold text-[#212529]">ID Verification</h2>
                  <p className="text-[14px] text-[#6c757d]">Complete your identity verification</p>
                </div>
                <div className="flex-1 space-y-6">
                  {/* Document Type Selection */}
                  <div>
                    <label className="block text-[14px] font-medium text-[#212529] mb-3">Select Document Type</label>
                    <div className="grid grid-cols-3 gap-4">
                      <button className="p-4 border-2 border-[#007bff] bg-[#f8f9ff] rounded-lg text-center hover:bg-[#e6f3ff] transition-colors">
                        <div className="w-8 h-8 mx-auto mb-2 text-[#007bff]">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                        </div>
                        <p className="text-[12px] font-medium text-[#007bff]">National ID</p>
                      </button>
                      <button className="p-4 border border-[#e7e8eb] rounded-lg text-center hover:border-[#007bff] hover:bg-[#f8f9ff] transition-colors">
                        <div className="w-8 h-8 mx-auto mb-2 text-[#6c757d]">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-[12px] text-[#6c757d]">Passport</p>
                      </button>
                      <button className="p-4 border border-[#e7e8eb] rounded-lg text-center hover:border-[#007bff] hover:bg-[#f8f9ff] transition-colors">
                        <div className="w-8 h-8 mx-auto mb-2 text-[#6c757d]">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <p className="text-[12px] text-[#6c757d]">Driver's License</p>
                      </button>
                    </div>
                  </div>

                  {/* Document Upload Areas */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Front of Document */}
                    <div>
                      <label className="block text-[14px] font-medium text-[#212529] mb-2">Front of Document</label>
                      <div className="border-2 border-dashed border-[#e7e8eb] rounded-lg p-6 text-center hover:border-[#007bff] hover:bg-[#f8f9ff] transition-colors cursor-pointer">
                        <div className="w-12 h-12 mx-auto mb-3 bg-[#f8f9fa] rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-[14px] font-medium text-[#212529] mb-1">Upload Front</p>
                        <p className="text-[12px] text-[#6c757d]">PNG, JPG up to 10MB</p>
                      </div>
                    </div>

                    {/* Back of Document */}
                    <div>
                      <label className="block text-[14px] font-medium text-[#212529] mb-2">Back of Document</label>
                      <div className="border-2 border-dashed border-[#e7e8eb] rounded-lg p-6 text-center hover:border-[#007bff] hover:bg-[#f8f9ff] transition-colors cursor-pointer">
                        <div className="w-12 h-12 mx-auto mb-3 bg-[#f8f9fa] rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-[14px] font-medium text-[#212529] mb-1">Upload Back</p>
                        <p className="text-[12px] text-[#6c757d]">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Selfie Verification */}
                  <div>
                    <label className="block text-[14px] font-medium text-[#212529] mb-2">Selfie Verification</label>
                    <div className="border-2 border-dashed border-[#e7e8eb] rounded-lg p-6 text-center hover:border-[#007bff] hover:bg-[#f8f9ff] transition-colors cursor-pointer">
                      <div className="w-16 h-16 mx-auto mb-3 bg-[#f8f9fa] rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-[14px] font-medium text-[#212529] mb-1">Take a Selfie</h3>
                      <p className="text-[12px] text-[#6c757d] mb-3">Make sure your face is clearly visible and matches your ID</p>
                      <button className="px-4 py-2 bg-[#007bff] text-white rounded-lg text-[12px] font-medium hover:bg-[#0056b3] transition-colors">
                        Take Photo
                      </button>
                    </div>
                  </div>

                  {/* Verification Instructions */}
                  <div className="bg-[#f8f9fa] rounded-lg p-4">
                    <h4 className="text-[14px] font-medium text-[#212529] mb-2">Verification Requirements:</h4>
                    <ul className="text-[12px] text-[#6c757d] space-y-1">
                      <li>• Document must be clear and legible</li>
                      <li>• All corners of the document must be visible</li>
                      <li>• No glare or shadows on the document</li>
                      <li>• Selfie must match the ID photo</li>
                      <li>• Document must be valid and not expired</li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button className="px-6 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors">
                      Submit for Verification
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bio & Other Info Section */}
          <div className="border-b border-[#e7e8eb] pb-6">
            <div className="flex gap-8">
              <div className="w-[200px] shrink-0">
                <h2 className="text-[20px] font-semibold text-[#212529]">Bio & Other info</h2>
                <p className="text-[14px] text-[#6c757d]">Add your bio & other info</p>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-medium text-[#212529] mb-1">Address 1</label>
                    <input
                      type="text"
                      value={profileData.address1}
                      onChange={(e) => setProfileData({...profileData, address1: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-[#e7e8eb] rounded-md text-[14px] focus:outline-none focus:border-[#007bff] ${!isEditing ? 'bg-[#f8f9fa] cursor-not-allowed' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#212529] mb-1">Address 2</label>
                    <input
                      type="text"
                      value={profileData.address2}
                      onChange={(e) => setProfileData({...profileData, address2: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-[#e7e8eb] rounded-md text-[14px] focus:outline-none focus:border-[#007bff] ${!isEditing ? 'bg-[#f8f9fa] cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
                <div>
                  {userRole !== "patient" && (
                    <textarea
                      rows={6}
                      placeholder="Write your bio..."
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-[#e7e8eb] rounded-md text-[14px] text-[#495057] italic focus:outline-none focus:border-[#007bff] resize-none leading-relaxed ${!isEditing ? 'bg-[#f8f9fa] cursor-not-allowed' : ''}`}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Security Section */}
          <div className="pt-2">
            <div className="flex gap-8 items-center">
              <div className="w-[200px] shrink-0">
                <h2 className="text-[20px] font-bold text-[#212529]">Account Security</h2>
                <p className="text-[14px] text-[#6c757d]">manage account security.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => router.push("/signup")}
                  className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#212529] hover:bg-[#f8f9fa] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#212529] text-white text-[14px] font-medium rounded-lg hover:bg-[#343a40] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete my account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Tab */}
      {activeTab === "notification" && (
        <div className="space-y-8">
          {/* Email Notifications */}
          <div className="border-b border-[#e7e8eb] pb-8">
            <div className="flex gap-8">
              <div className="w-[250px] shrink-0">
                <h2 className="text-[20px] font-semibold text-[#212529]">Email Notifications</h2>
                <p className="text-[14px] text-[#6c757d]">Get update and reminder email sent to your email</p>
              </div>
              <div className="flex-1 space-y-4">
                {notificationItems.map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div className="pl-4">
                      <p className="text-[16px] font-medium text-[#212529]">{item.label}</p>
                      <p className="text-[14px] text-[#575757]">{item.desc}</p>
                    </div>
                    <ToggleSwitch
                      enabled={emailNotifications[item.key as keyof typeof emailNotifications]}
                      onToggle={() => setEmailNotifications(prev => ({
                        ...prev,
                        [item.key]: !prev[item.key as keyof typeof prev]
                      }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Push Notifications */}
          <div>
            <div className="flex gap-8">
              <div className="w-[250px] shrink-0">
                <h2 className="text-[20px] font-semibold text-[#212529]">Push Notifications</h2>
                <p className="text-[14px] text-[#6c757d]">Receive alert on your mobile devices</p>
              </div>
              <div className="flex-1 space-y-4">
                {pushNotificationItems.map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div className="pl-4">
                      <p className="text-[16px] font-medium text-[#212529]">{item.label}</p>
                      <p className="text-[14px] text-[#575757]">{item.desc}</p>
                    </div>
                    <ToggleSwitch
                      enabled={pushNotifications[item.key as keyof typeof pushNotifications]}
                      onToggle={() => setPushNotifications(prev => ({
                        ...prev,
                        [item.key]: !prev[item.key as keyof typeof prev]
                      }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="max-w-[450px] space-y-4">
          <div>
            <label className="block text-[16px] font-medium text-[#575757] mb-2">Old Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={securityData.oldPassword}
              onChange={(e) => setSecurityData({...securityData, oldPassword: e.target.value})}
              className="w-full px-3 py-3 border border-[#a0a0a0b3] rounded-lg text-[16px] focus:outline-none focus:border-[#007bff]"
            />
          </div>
          <div>
            <label className="block text-[16px] font-medium text-[#575757] mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={securityData.newPassword}
              onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
              className="w-full px-3 py-3 border border-[#a0a0a0b3] rounded-lg text-[16px] focus:outline-none focus:border-[#007bff]"
            />
          </div>
          <div>
            <label className="block text-[16px] font-medium text-[#575757] mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={securityData.confirmPassword}
              onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
              className="w-full px-3 py-3 border border-[#a0a0a0b3] rounded-lg text-[16px] focus:outline-none focus:border-[#007bff]"
            />
          </div>
          <div className="w-full px-3 py-3 border border-[#a0a0a0b3] rounded-lg">
            <p className="text-[16px] font-medium text-[#6c757d]">Two Factor Authentication</p>
          </div>

          {/* Account Security Section */}
          <div className="pt-6 border-t border-[#e7e8eb] mt-6">
            <div className="flex gap-8 items-center">
              <div className="shrink-0">
                <h2 className="text-[20px] font-bold text-[#212529]">Account Security</h2>
                <p className="text-[14px] text-[#6c757d]">manage account security.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => router.push("/signup")}
                  className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#212529] hover:bg-[#f8f9fa] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#212529] text-white text-[14px] font-medium rounded-lg hover:bg-[#343a40] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete my account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
