"use client"

import { useState } from "react"
import { LabResultDetail } from "@/components/medical-book/lab-result-detail"

export function VisitDetailsPage() {
  const [activeTab, setActiveTab] = useState<"clinical" | "lab" | "prescriptions" | "vitals">("clinical")
  const [activeLabDetail, setActiveLabDetail] = useState<"full-body" | "blood-test" | null>(null)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-[28px] font-semibold text-[#212529] mb-2">Medical Book</h1>
        <p className="text-[14px] text-[#5c5c5c]">Your complete medical history and records in diary-like format</p>
      </div>

      {/* Upload Medical Records Section */}
      <div className="bg-white rounded-xl border border-[#e8e7e7] shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-[#f8f9fa] flex items-center justify-center">
              <svg className="w-7 h-7 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-[#212529] mb-1">Upload Medical Records</h2>
              <p className="text-[14px] text-[#5c5c5c]">Add past records, documents.</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Old Records
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by doctor, diagnosis or symptoms..."
            className="w-full pl-10 pr-4 py-2.5 border border-[#e2e4e5] rounded-lg text-[14px] text-[#212529] placeholder-[#9ca3af] focus:outline-none focus:border-[#007bff]"
          />
        </div>
        <button className="px-4 py-2.5 border border-[#e2e4e5] rounded-lg text-[14px] text-[#212529] hover:bg-gray-50 transition-colors flex items-center gap-2">
          All Status
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Visit Details Card */}
      <div className="bg-white rounded-xl border border-[#e8e7e7] shadow-sm overflow-hidden">
        {/* Visit Header */}
        <div className="px-6 py-4 border-b border-[#e8e7e7] flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-semibold text-[#212529] mb-1">Visit Details</h2>
            <p className="text-[14px] text-[#5c5c5c]">Nov 20, 2025</p>
          </div>
          <span className="px-4 py-1.5 bg-[#d4e9ff] text-[#007bff] rounded-md text-[13px] font-medium">
            Consulted
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#e8e7e7]">
          <button
            onClick={() => setActiveTab("clinical")}
            className={`flex-1 px-6 py-4 text-[14px] font-medium transition-colors ${
              activeTab === "clinical"
                ? "text-[#007bff] bg-[#f0f7ff] border-b-2 border-[#007bff]"
                : "text-[#5c5c5c] hover:bg-[#f8f9fa]"
            }`}
          >
            Clinical Notes
          </button>
          <button
            onClick={() => setActiveTab("lab")}
            className={`flex-1 px-6 py-4 text-[14px] font-medium transition-colors ${
              activeTab === "lab"
                ? "text-[#007bff] bg-[#f0f7ff] border-b-2 border-[#007bff]"
                : "text-[#5c5c5c] hover:bg-[#f8f9fa]"
            }`}
          >
            Lab Results
          </button>
          <button
            onClick={() => setActiveTab("prescriptions")}
            className={`flex-1 px-6 py-4 text-[14px] font-medium transition-colors ${
              activeTab === "prescriptions"
                ? "text-[#007bff] bg-[#f0f7ff] border-b-2 border-[#007bff]"
                : "text-[#5c5c5c] hover:bg-[#f8f9fa]"
            }`}
          >
            Prescriptions
          </button>
          <button
            onClick={() => setActiveTab("vitals")}
            className={`flex-1 px-6 py-4 text-[14px] font-medium transition-colors ${
              activeTab === "vitals"
                ? "text-[#007bff] bg-[#f0f7ff] border-b-2 border-[#007bff]"
                : "text-[#5c5c5c] hover:bg-[#f8f9fa]"
            }`}
          >
            Vitals
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "clinical" && (
            <div className="space-y-6">
              {/* Healthcare Provider */}
              <div>
                <h3 className="text-[14px] font-semibold text-[#212529] mb-2">Healthcare Provider</h3>
                <p className="text-[14px] text-[#5c5c5c]">Dr. Michael Chen</p>
                <p className="text-[14px] text-[#5c5c5c]">Green Central General Hospital</p>
              </div>

              {/* Symptoms */}
              <div>
                <h3 className="text-[14px] font-semibold text-[#212529] mb-2">Symptoms</h3>
                <p className="text-[14px] text-[#5c5c5c]">Persistent cough, fever</p>
              </div>

              {/* Diagnosis */}
              <div>
                <h3 className="text-[14px] font-semibold text-[#212529] mb-2">Diagnosis</h3>
                <p className="text-[14px] text-[#5c5c5c]">Upper Respiratory Infection</p>
              </div>
            </div>
          )}

          {activeTab === "lab" && (
            <div className="space-y-4">
              {/* Lab Test 1 */}
              <div className="flex items-start justify-between p-4 border border-[#e8e7e7] rounded-lg hover:bg-[#f8f9fa] transition-colors">
                <div className="flex-1">
                  <h4 className="text-[16px] font-semibold text-[#212529] mb-2">Full Body Test</h4>
                  <p className="text-[14px] text-[#5c5c5c] mb-1">Laboratory: HealthLab Diagnostics.</p>
                  <p className="text-[14px] text-[#5c5c5c]">Prescriber: Dr. Michael Chen</p>
                </div>
                <div className="text-right mr-4">
                  <p className="text-[13px] text-[#5c5c5c] mb-1">Test Date</p>
                  <p className="text-[14px] font-medium text-[#212529] mb-2">Nov 20, 2025</p>
                  <p className="text-[13px] text-[#5c5c5c] mb-1">Report Date</p>
                  <p className="text-[14px] font-medium text-[#212529]">Nov 20, 2025</p>
                </div>
                <button
                  onClick={() => setActiveLabDetail("full-body")}
                  className="p-2 hover:bg-[#e8e7e7] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-[#5c5c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>

              {/* Lab Test 2 */}
              <div className="flex items-start justify-between p-4 border border-[#e8e7e7] rounded-lg hover:bg-[#f8f9fa] transition-colors">
                <div className="flex-1">
                  <h4 className="text-[16px] font-semibold text-[#212529] mb-2">Blood Test</h4>
                  <p className="text-[14px] text-[#5c5c5c] mb-1">Laboratory: HealthLab Diagnostics.</p>
                  <p className="text-[14px] text-[#5c5c5c]">Prescriber: Dr. Hermann Paul.</p>
                </div>
                <div className="text-right mr-4">
                  <p className="text-[13px] text-[#5c5c5c] mb-1">Test Date</p>
                  <p className="text-[14px] font-medium text-[#212529] mb-2">22 September, 2025</p>
                  <p className="text-[13px] text-[#5c5c5c] mb-1">Report Date</p>
                  <p className="text-[14px] font-medium text-[#212529]">24 September, 2025</p>
                </div>
                <button
                  onClick={() => setActiveLabDetail("blood-test")}
                  className="p-2 hover:bg-[#e8e7e7] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-[#5c5c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {activeTab === "prescriptions" && (
            <div className="space-y-4">
              {/* Prescription Card */}
              <div className="flex items-start gap-4 p-4 border border-[#e8e7e7] rounded-lg">
                <div className="h-12 w-12 rounded-lg bg-[#d4e9ff] flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-[18px] font-semibold text-[#212529] mb-3">Metformin 500mg</h4>
                  <div className="space-y-2 text-[14px]">
                    <p className="text-[#5c5c5c]"><span className="font-medium text-[#212529]">Dosage:</span> 500mg</p>
                    <p className="text-[#5c5c5c]"><span className="font-medium text-[#212529]">Frequency:</span> Twice daily</p>
                    <p className="text-[#5c5c5c]"><span className="font-medium text-[#212529]">Duration:</span> 30 days</p>
                    <p className="text-[#5c5c5c]"><span className="font-medium text-[#212529]">Notes:</span> Take with meals</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-[13px] text-[#5c5c5c]">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Dr. James Wilson</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>2025-11-28</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "vitals" && (
            <div className="space-y-6">
              {/* Vitals Header */}
              <h3 className="text-[18px] font-semibold text-[#212529]">Vitals</h3>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-6 gap-4">
                <div className="border border-[#e8e7e7] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#d4e9ff] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#007bff]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9z" />
                      </svg>
                    </div>
                    <span className="text-[12px] text-[#5c5c5c]">Weight</span>
                  </div>
                  <p className="text-[20px] font-semibold text-[#212529]">100 <span className="text-[14px] font-normal text-[#5c5c5c]">kg</span></p>
                </div>

                <div className="border border-[#e8e7e7] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#d4e9ff] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#007bff]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9z" />
                      </svg>
                    </div>
                    <span className="text-[12px] text-[#5c5c5c]">Height</span>
                  </div>
                  <p className="text-[20px] font-semibold text-[#212529]">184 <span className="text-[14px] font-normal text-[#5c5c5c]">cm</span></p>
                </div>

                <div className="border border-[#e8e7e7] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#d4e9ff] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#007bff]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9z" />
                      </svg>
                    </div>
                    <span className="text-[12px] text-[#5c5c5c]">BMI</span>
                  </div>
                  <p className="text-[20px] font-semibold text-[#212529]">19.2 <span className="text-[14px] font-normal text-[#5c5c5c]">kg/cm</span></p>
                </div>

                <div className="border border-[#e8e7e7] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#d4e9ff] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#007bff]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9z" />
                      </svg>
                    </div>
                    <span className="text-[12px] text-[#5c5c5c]">Pulse</span>
                  </div>
                  <p className="text-[20px] font-semibold text-[#212529]">97<span className="text-[14px] font-normal text-[#5c5c5c]">%</span></p>
                </div>

                <div className="border border-[#e8e7e7] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#d4e9ff] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#007bff]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9z" />
                      </svg>
                    </div>
                    <span className="text-[12px] text-[#5c5c5c]">SPO2</span>
                  </div>
                  <p className="text-[20px] font-semibold text-[#212529]">98<span className="text-[14px] font-normal text-[#5c5c5c]">%</span></p>
                </div>

                <div className="border border-[#e8e7e7] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#d4e9ff] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#007bff]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9z" />
                      </svg>
                    </div>
                    <span className="text-[12px] text-[#5c5c5c]">Temperature</span>
                  </div>
                  <p className="text-[20px] font-semibold text-[#212529]">101<span className="text-[14px] font-normal text-[#5c5c5c]">°c</span></p>
                </div>
              </div>

              {/* Detailed Vitals with Charts */}
              <div className="grid grid-cols-3 gap-6">
                {/* Blood Pressure */}
                <div className="border border-[#e8e7e7] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-full bg-[#ffe5e5] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#ff6b6b]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-[#212529]">Blood Pressure</h4>
                      <p className="text-[11px] text-[#5c5c5c]">Patient Vital Monitoring</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded text-[11px] font-medium">Normal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div>
                      <p className="text-[10px] text-[#5c5c5c] mb-1">Current Value</p>
                      <p className="text-[16px] font-semibold text-[#212529]">120/80</p>
                      <p className="text-[10px] text-[#5c5c5c]">mmHg</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#5c5c5c] mb-1">24h Average</p>
                      <p className="text-[16px] font-semibold text-[#212529]">122</p>
                      <p className="text-[10px] text-[#5c5c5c]">mmHg</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#5c5c5c] mb-1">Last Updated</p>
                      <p className="text-[11px] font-medium text-[#212529]">2 min ago</p>
                      <p className="text-[10px] text-[#5c5c5c]">Auto-synced</p>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-t from-[#d4f5e0] to-transparent rounded"></div>
                </div>

                {/* Heart Rate */}
                <div className="border border-[#e8e7e7] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-full bg-[#ffe5e5] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#ff6b6b]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-[#212529]">Heart Rate</h4>
                      <p className="text-[11px] text-[#5c5c5c]">Patient Vital Monitoring</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded text-[11px] font-medium">Normal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div>
                      <p className="text-[10px] text-[#5c5c5c] mb-1">Current Value</p>
                      <p className="text-[16px] font-semibold text-[#212529]">72</p>
                      <p className="text-[10px] text-[#5c5c5c]">bpm</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#5c5c5c] mb-1">24h Average</p>
                      <p className="text-[16px] font-semibold text-[#212529]">72</p>
                      <p className="text-[10px] text-[#5c5c5c]">bpm</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#5c5c5c] mb-1">Last Updated</p>
                      <p className="text-[11px] font-medium text-[#212529]">1 min ago</p>
                      <p className="text-[10px] text-[#5c5c5c]">Auto-synced</p>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-t from-[#ffe5e5] to-transparent rounded"></div>
                </div>

                {/* Blood Sugar */}
                <div className="border border-[#e8e7e7] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-full bg-[#fff3cd] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#ffc107]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-[#212529]">Blood Sugar</h4>
                      <p className="text-[11px] text-[#5c5c5c]">Patient Vital Monitoring</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded text-[11px] font-medium">Normal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div>
                      <p className="text-[10px] text-[#5c5c5c] mb-1">Current Value</p>
                      <p className="text-[16px] font-semibold text-[#212529]">95</p>
                      <p className="text-[10px] text-[#5c5c5c]">mg/dl</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#5c5c5c] mb-1">24h Average</p>
                      <p className="text-[16px] font-semibold text-[#212529]">95</p>
                      <p className="text-[10px] text-[#5c5c5c]">mg/dl</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#5c5c5c] mb-1">Last Updated</p>
                      <p className="text-[11px] font-medium text-[#212529]">1 min ago</p>
                      <p className="text-[10px] text-[#5c5c5c]">Auto-synced</p>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-t from-[#fff3cd] to-transparent rounded"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeLabDetail && (
        <LabResultDetail
          testType={activeLabDetail}
          onClose={() => setActiveLabDetail(null)}
        />
      )}
    </div>
  )
}
