"use client"

import Link from "next/link"
import { useState } from "react"

export function QRAccessPage() {
  const [selectedRecords, setSelectedRecords] = useState<string[]>([])
  const [expiryTime, setExpiryTime] = useState("24")

  const toggleRecord = (record: string) => {
    setSelectedRecords(prev => 
      prev.includes(record) 
        ? prev.filter(r => r !== record)
        : [...prev, record]
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Link
          href="/medical-book"
          className="h-10 w-10 rounded-lg border border-[#e2e4e5] flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-[24px] font-semibold text-[#212529]">QR Code Access</h1>
          <p className="text-[14px] text-[#5c5c5c]">Share your medical records securely</p>
        </div>
      </div>

      {/* QR Code Display Card */}
      <div className="bg-white rounded-xl border border-[#e8e7e7] shadow-sm p-8">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <h2 className="text-[20px] font-semibold text-[#212529] text-center mb-2">
              Your Medical Records QR Code
            </h2>
            <p className="text-[14px] text-[#5c5c5c] text-center">
              Scan this code to access selected medical records
            </p>
          </div>

          {/* QR Code Placeholder */}
          <div className="h-64 w-64 bg-white border-2 border-[#e8e7e7] rounded-xl flex items-center justify-center mb-6">
            <div className="text-center">
              <svg className="w-48 h-48 text-[#212529] mx-auto" viewBox="0 0 200 200" fill="currentColor">
                {/* QR Code pattern simulation */}
                <rect x="0" y="0" width="60" height="60" />
                <rect x="70" y="0" width="20" height="20" />
                <rect x="100" y="0" width="20" height="20" />
                <rect x="140" y="0" width="60" height="60" />
                <rect x="0" y="70" width="20" height="20" />
                <rect x="30" y="70" width="20" height="20" />
                <rect x="70" y="70" width="20" height="20" />
                <rect x="100" y="70" width="20" height="20" />
                <rect x="140" y="70" width="20" height="20" />
                <rect x="170" y="70" width="20" height="20" />
                <rect x="0" y="100" width="20" height="20" />
                <rect x="30" y="100" width="20" height="20" />
                <rect x="70" y="100" width="20" height="20" />
                <rect x="100" y="100" width="20" height="20" />
                <rect x="140" y="100" width="20" height="20" />
                <rect x="170" y="100" width="20" height="20" />
                <rect x="0" y="140" width="60" height="60" />
                <rect x="70" y="140" width="20" height="20" />
                <rect x="100" y="140" width="20" height="20" />
                <rect x="140" y="140" width="60" height="60" />
                <rect x="20" y="20" width="20" height="20" fill="white" />
                <rect x="160" y="20" width="20" height="20" fill="white" />
                <rect x="20" y="160" width="20" height="20" fill="white" />
                <rect x="160" y="160" width="20" height="20" fill="white" />
              </svg>
            </div>
          </div>

          {/* QR Code Info */}
          <div className="bg-[#f8f9fa] rounded-lg p-4 w-full max-w-md mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-[#5c5c5c]">Code ID:</span>
              <span className="text-[14px] font-medium text-[#212529]">MED-2025-8472</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-[#5c5c5c]">Generated:</span>
              <span className="text-[14px] font-medium text-[#212529]">Nov 29, 2025 12:15 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#5c5c5c]">Expires:</span>
              <span className="text-[14px] font-medium text-[#ff6b6b]">Nov 30, 2025 12:15 PM</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full max-w-md">
            <button className="flex-1 px-6 py-3 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors">
              Download QR Code
            </button>
            <button className="flex-1 px-6 py-3 bg-white border border-[#e2e4e5] text-[#212529] rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-colors">
              Share QR Code
            </button>
          </div>
        </div>
      </div>

      {/* Select Records to Share */}
      <div className="bg-white rounded-xl border border-[#e8e7e7] shadow-sm p-6">
        <h3 className="text-[18px] font-semibold text-[#212529] mb-4">Select Records to Share</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 border border-[#e2e4e5] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedRecords.includes("visit-history")}
                onChange={() => toggleRecord("visit-history")}
                className="h-5 w-5 text-[#007bff] rounded border-gray-300 focus:ring-[#007bff]"
              />
              <div>
                <p className="text-[14px] font-medium text-[#212529]">Visit History</p>
                <p className="text-[12px] text-[#5c5c5c]">All consultation records</p>
              </div>
            </div>
            <span className="text-[12px] text-[#5c5c5c]">12 records</span>
          </label>

          <label className="flex items-center justify-between p-4 border border-[#e2e4e5] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedRecords.includes("lab-results")}
                onChange={() => toggleRecord("lab-results")}
                className="h-5 w-5 text-[#007bff] rounded border-gray-300 focus:ring-[#007bff]"
              />
              <div>
                <p className="text-[14px] font-medium text-[#212529]">Lab Results</p>
                <p className="text-[12px] text-[#5c5c5c]">Blood tests, imaging, etc.</p>
              </div>
            </div>
            <span className="text-[12px] text-[#5c5c5c]">8 records</span>
          </label>

          <label className="flex items-center justify-between p-4 border border-[#e2e4e5] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedRecords.includes("prescriptions")}
                onChange={() => toggleRecord("prescriptions")}
                className="h-5 w-5 text-[#007bff] rounded border-gray-300 focus:ring-[#007bff]"
              />
              <div>
                <p className="text-[14px] font-medium text-[#212529]">Prescriptions</p>
                <p className="text-[12px] text-[#5c5c5c]">Current and past medications</p>
              </div>
            </div>
            <span className="text-[12px] text-[#5c5c5c]">5 records</span>
          </label>

          <label className="flex items-center justify-between p-4 border border-[#e2e4e5] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedRecords.includes("allergies")}
                onChange={() => toggleRecord("allergies")}
                className="h-5 w-5 text-[#007bff] rounded border-gray-300 focus:ring-[#007bff]"
              />
              <div>
                <p className="text-[14px] font-medium text-[#212529]">Allergies & Conditions</p>
                <p className="text-[12px] text-[#5c5c5c]">Known allergies and chronic conditions</p>
              </div>
            </div>
            <span className="text-[12px] text-[#5c5c5c]">3 items</span>
          </label>

          <label className="flex items-center justify-between p-4 border border-[#e2e4e5] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedRecords.includes("vital-signs")}
                onChange={() => toggleRecord("vital-signs")}
                className="h-5 w-5 text-[#007bff] rounded border-gray-300 focus:ring-[#007bff]"
              />
              <div>
                <p className="text-[14px] font-medium text-[#212529]">Vital Signs History</p>
                <p className="text-[12px] text-[#5c5c5c]">Blood pressure, heart rate, etc.</p>
              </div>
            </div>
            <span className="text-[12px] text-[#5c5c5c]">45 records</span>
          </label>
        </div>
      </div>

      {/* QR Code Settings */}
      <div className="bg-white rounded-xl border border-[#e8e7e7] shadow-sm p-6">
        <h3 className="text-[18px] font-semibold text-[#212529] mb-4">QR Code Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-[#212529] mb-2">
              Access Expiry Time
            </label>
            <select
              value={expiryTime}
              onChange={(e) => setExpiryTime(e.target.value)}
              className="w-full px-4 py-2 border border-[#e2e4e5] rounded-lg text-[14px] text-[#212529] focus:outline-none focus:border-[#007bff]"
            >
              <option value="1">1 hour</option>
              <option value="6">6 hours</option>
              <option value="24">24 hours</option>
              <option value="72">3 days</option>
              <option value="168">7 days</option>
            </select>
            <p className="text-[12px] text-[#5c5c5c] mt-1">
              The QR code will expire after this duration for security
            </p>
          </div>

          <div className="flex items-start gap-3 p-4 bg-[#fff3cd] border border-[#ffc107] rounded-lg">
            <svg className="w-5 h-5 text-[#856404] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-[13px] font-semibold text-[#856404] mb-1">Security Notice</p>
              <p className="text-[13px] text-[#856404]">
                Only share this QR code with trusted healthcare providers. 
                The code provides temporary access to your selected medical records.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Generate New QR Code Button */}
      <button className="w-full px-6 py-3 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors">
        Generate New QR Code
      </button>

      {/* Recent Access History */}
      <div className="bg-white rounded-xl border border-[#e8e7e7] shadow-sm p-6">
        <h3 className="text-[18px] font-semibold text-[#212529] mb-4">Recent Access History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#d4e9ff] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#007bff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#212529]">Dr. Sarah Johnson</p>
                <p className="text-[12px] text-[#5c5c5c]">Accessed: Visit History, Lab Results</p>
              </div>
            </div>
            <span className="text-[12px] text-[#5c5c5c]">2 hours ago</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#d4e9ff] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#007bff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#212529]">City Hospital Emergency</p>
                <p className="text-[12px] text-[#5c5c5c]">Accessed: All Records</p>
              </div>
            </div>
            <span className="text-[12px] text-[#5c5c5c]">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
