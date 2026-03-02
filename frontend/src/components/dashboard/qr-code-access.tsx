"use client"

import { useState } from "react"

type PermissionLevel = "view-only" | "full-access"
type CodeLifespan = "single-use" | "24-hours" | "7-days" | "permanent"

export function QRCodeAccessPage() {
  const [permissionLevel, setPermissionLevel] = useState<PermissionLevel>("view-only")
  const [codeLifespan, setCodeLifespan] = useState<CodeLifespan>("single-use")
  const [showPermissionDropdown, setShowPermissionDropdown] = useState(false)
  const [showLifespanDropdown, setShowLifespanDropdown] = useState(false)

  const permissionOptions = [
    { value: "view-only", label: "View Only" },
    { value: "full-access", label: "Full Access" },
  ]

  const lifespanOptions = [
    { value: "single-use", label: "Single Use" },
    { value: "24-hours", label: "24 Hours" },
    { value: "7-days", label: "7 Days" },
    { value: "permanent", label: "Permanent" },
  ]

  const getPermissionLabel = () => {
    return permissionOptions.find(opt => opt.value === permissionLevel)?.label || "View Only"
  }

  const getLifespanLabel = () => {
    return lifespanOptions.find(opt => opt.value === codeLifespan)?.label || "Single Use"
  }

  const handleDownload = () => {
    // TODO: Implement QR code download
    console.log("Downloading QR code...")
  }

  const handleRegenerate = () => {
    // TODO: Implement QR code regeneration
    console.log("Regenerating QR code...")
  }

  return (
    <div className="max-w-[800px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[24px] font-semibold text-[#212529] mb-2">QR Code Access</h1>
        <p className="text-[14px] text-[#6c757d]">
          Generate a QR code for quick access to your medical records
        </p>
      </div>

      {/* Permission Level */}
      <div className="mb-4">
        <label className="block text-[14px] font-medium text-[#212529] mb-2">
          Permission Level
        </label>
        <div className="relative">
          <button
            onClick={() => {
              setShowPermissionDropdown(!showPermissionDropdown)
              setShowLifespanDropdown(false)
            }}
            className="w-full bg-white border border-[#e9ecef] rounded-lg px-4 py-3 text-left flex items-center justify-between text-[16px] text-[#5a5a5a] hover:border-[#007bff] transition-colors"
          >
            <span>{getPermissionLabel()}</span>
            <svg className={`w-5 h-5 text-[#6c757d] transition-transform ${showPermissionDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showPermissionDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e9ecef] rounded-lg shadow-lg z-10">
              {permissionOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setPermissionLevel(option.value as PermissionLevel)
                    setShowPermissionDropdown(false)
                  }}
                  className={`w-full px-4 py-3 text-left text-[16px] hover:bg-[#f8f9fa] first:rounded-t-lg last:rounded-b-lg ${
                    permissionLevel === option.value ? "text-[#007bff] bg-[#f0f7ff]" : "text-[#5a5a5a]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-[12px] text-[#6c757d] mt-2">
          Healthcare providers can only view your medical records
        </p>
      </div>

      {/* Code Lifespan */}
      <div className="mb-6">
        <label className="block text-[14px] font-medium text-[#212529] mb-2">
          Code Lifespan
        </label>
        <div className="relative">
          <button
            onClick={() => {
              setShowLifespanDropdown(!showLifespanDropdown)
              setShowPermissionDropdown(false)
            }}
            className="w-full bg-white border border-[#e9ecef] rounded-lg px-4 py-3 text-left flex items-center justify-between text-[16px] text-[#5a5a5a] hover:border-[#007bff] transition-colors"
          >
            <span>{getLifespanLabel()}</span>
            <svg className={`w-5 h-5 text-[#6c757d] transition-transform ${showLifespanDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showLifespanDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e9ecef] rounded-lg shadow-lg z-10">
              {lifespanOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setCodeLifespan(option.value as CodeLifespan)
                    setShowLifespanDropdown(false)
                  }}
                  className={`w-full px-4 py-3 text-left text-[16px] hover:bg-[#f8f9fa] first:rounded-t-lg last:rounded-b-lg ${
                    codeLifespan === option.value ? "text-[#007bff] bg-[#f0f7ff]" : "text-[#5a5a5a]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-[12px] text-[#6c757d] mt-2">
          QR code remains valid until regenerated
        </p>
      </div>

      {/* QR Code Display */}
      <div className="bg-white border border-[#e9ecef] rounded-lg p-8 mb-6 flex items-center justify-center">
        <div className="w-[200px] h-[200px]">
          {/* QR Code SVG */}
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* QR Code pattern - simplified representation */}
            <rect x="0" y="0" width="200" height="200" fill="white"/>
            {/* Position detection patterns */}
            <rect x="10" y="10" width="50" height="50" fill="#000"/>
            <rect x="17" y="17" width="36" height="36" fill="white"/>
            <rect x="24" y="24" width="22" height="22" fill="#000"/>
            
            <rect x="140" y="10" width="50" height="50" fill="#000"/>
            <rect x="147" y="17" width="36" height="36" fill="white"/>
            <rect x="154" y="24" width="22" height="22" fill="#000"/>
            
            <rect x="10" y="140" width="50" height="50" fill="#000"/>
            <rect x="17" y="147" width="36" height="36" fill="white"/>
            <rect x="24" y="154" width="22" height="22" fill="#000"/>
            
            {/* Data modules - random pattern for visual */}
            <rect x="70" y="10" width="8" height="8" fill="#000"/>
            <rect x="86" y="10" width="8" height="8" fill="#000"/>
            <rect x="102" y="10" width="8" height="8" fill="#000"/>
            <rect x="118" y="10" width="8" height="8" fill="#000"/>
            
            <rect x="70" y="26" width="8" height="8" fill="#000"/>
            <rect x="94" y="26" width="8" height="8" fill="#000"/>
            <rect x="110" y="26" width="8" height="8" fill="#000"/>
            
            <rect x="78" y="42" width="8" height="8" fill="#000"/>
            <rect x="102" y="42" width="8" height="8" fill="#000"/>
            <rect x="118" y="42" width="8" height="8" fill="#000"/>
            
            <rect x="10" y="70" width="8" height="8" fill="#000"/>
            <rect x="26" y="70" width="8" height="8" fill="#000"/>
            <rect x="50" y="70" width="8" height="8" fill="#000"/>
            <rect x="70" y="70" width="8" height="8" fill="#000"/>
            <rect x="94" y="70" width="8" height="8" fill="#000"/>
            <rect x="118" y="70" width="8" height="8" fill="#000"/>
            <rect x="142" y="70" width="8" height="8" fill="#000"/>
            <rect x="166" y="70" width="8" height="8" fill="#000"/>
            <rect x="182" y="70" width="8" height="8" fill="#000"/>
            
            <rect x="10" y="86" width="8" height="8" fill="#000"/>
            <rect x="42" y="86" width="8" height="8" fill="#000"/>
            <rect x="78" y="86" width="8" height="8" fill="#000"/>
            <rect x="102" y="86" width="8" height="8" fill="#000"/>
            <rect x="134" y="86" width="8" height="8" fill="#000"/>
            <rect x="158" y="86" width="8" height="8" fill="#000"/>
            
            <rect x="10" y="102" width="8" height="8" fill="#000"/>
            <rect x="26" y="102" width="8" height="8" fill="#000"/>
            <rect x="50" y="102" width="8" height="8" fill="#000"/>
            <rect x="86" y="102" width="8" height="8" fill="#000"/>
            <rect x="110" y="102" width="8" height="8" fill="#000"/>
            <rect x="142" y="102" width="8" height="8" fill="#000"/>
            <rect x="174" y="102" width="8" height="8" fill="#000"/>
            
            <rect x="10" y="118" width="8" height="8" fill="#000"/>
            <rect x="42" y="118" width="8" height="8" fill="#000"/>
            <rect x="70" y="118" width="8" height="8" fill="#000"/>
            <rect x="94" y="118" width="8" height="8" fill="#000"/>
            <rect x="126" y="118" width="8" height="8" fill="#000"/>
            <rect x="150" y="118" width="8" height="8" fill="#000"/>
            <rect x="182" y="118" width="8" height="8" fill="#000"/>
            
            <rect x="70" y="142" width="8" height="8" fill="#000"/>
            <rect x="94" y="142" width="8" height="8" fill="#000"/>
            <rect x="118" y="142" width="8" height="8" fill="#000"/>
            <rect x="150" y="142" width="8" height="8" fill="#000"/>
            <rect x="174" y="142" width="8" height="8" fill="#000"/>
            
            <rect x="78" y="158" width="8" height="8" fill="#000"/>
            <rect x="102" y="158" width="8" height="8" fill="#000"/>
            <rect x="134" y="158" width="8" height="8" fill="#000"/>
            <rect x="158" y="158" width="8" height="8" fill="#000"/>
            <rect x="182" y="158" width="8" height="8" fill="#000"/>
            
            <rect x="70" y="174" width="8" height="8" fill="#000"/>
            <rect x="86" y="174" width="8" height="8" fill="#000"/>
            <rect x="110" y="174" width="8" height="8" fill="#000"/>
            <rect x="142" y="174" width="8" height="8" fill="#000"/>
            <rect x="166" y="174" width="8" height="8" fill="#000"/>
          </svg>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 bg-white border border-[#e9ecef] rounded-lg py-3 px-6 text-[14px] font-medium text-[#212529] hover:bg-[#f8f9fa] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </button>
        <button
          onClick={handleRegenerate}
          className="flex items-center justify-center gap-2 bg-white border border-[#e9ecef] rounded-lg py-3 px-6 text-[14px] font-medium text-[#212529] hover:bg-[#f8f9fa] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Regenerate
        </button>
      </div>

      {/* Security Information */}
      <div className="bg-[#f0f7ff] border border-[#cce5ff] rounded-lg p-4">
        <h3 className="text-[14px] font-semibold text-[#212529] mb-3">Security Information</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-[13px] text-[#495057]">
            <span className="text-[#007bff] mt-0.5">•</span>
            All QR code scans are logged with timestamps
          </li>
          <li className="flex items-start gap-2 text-[13px] text-[#495057]">
            <span className="text-[#007bff] mt-0.5">•</span>
            You will receive notifications when your QR code is used
          </li>
          <li className="flex items-start gap-2 text-[13px] text-[#495057]">
            <span className="text-[#007bff] mt-0.5">•</span>
            You can regenerate your QR code at any time to revoke access
          </li>
        </ul>
      </div>
    </div>
  )
}
