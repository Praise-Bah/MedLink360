"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const tabs = ["Overview", "Lab Reports", "Appointments", "Prescription"] as const

type TabKey = (typeof tabs)[number]

export function MedicalBookViewAll() {
  const [activeTab, setActiveTab] = useState<TabKey>("Overview")
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#e2e4e5] text-[13px] text-[#212529] hover:bg-[#f8f9fa]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-full text-[14px] font-medium transition-colors ${
              activeTab === tab
                ? "bg-[#007bff] text-white"
                : "bg-[#f1f5f9] text-[#212529] hover:bg-[#e8f0fe]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="grid grid-cols-[360px_1fr] gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#d9f6e5] rounded-xl p-4 shadow-sm">
                <p className="text-[13px] text-[#212529] mb-2">Blood Status</p>
                <p className="text-[20px] font-semibold text-[#212529]">120<span className="text-[12px] font-normal">/85</span></p>
                <div className="h-16 mt-3 bg-white/60 rounded-lg"></div>
              </div>
              <div className="bg-[#dfe9f7] rounded-xl p-4 shadow-sm">
                <p className="text-[13px] text-[#212529] mb-2">Hemoglobin Level</p>
                <p className="text-[20px] font-semibold text-[#212529]">17.2<span className="text-[12px] font-normal">g/dl</span></p>
                <div className="h-16 mt-3 bg-white/60 rounded-lg"></div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#e8e7e7] p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-semibold text-[#212529]">Lab Test &amp; Prescriptions</h3>
                <button className="px-3 py-1.5 text-[12px] border border-[#e2e4e5] rounded-full text-[#212529]">View All</button>
              </div>
              <div className="space-y-3">
                {[
                  { title: "Blood Test Results", subtitle: "Dr Roberts" },
                  { title: "CT Scan", subtitle: "Dr Roberts" },
                  { title: "Ultrasonography", subtitle: "Labid Hospital" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between p-3 bg-[#f8fafc] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#e8f1ff] flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-[#212529]">{item.title}</p>
                        <p className="text-[12px] text-[#5c5c5c]">{item.subtitle}</p>
                      </div>
                    </div>
                    <button className="h-8 w-8 rounded-lg bg-[#007bff] text-white flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#e8e7e7] p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-semibold text-[#212529]">Medicines</h3>
                <button className="px-3 py-1.5 text-[12px] border border-[#e2e4e5] rounded-full text-[#212529]">View All</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "Vitamin B", color: "bg-[#d9f6e5]" },
                  { name: "Vitamin B", color: "bg-[#e6f5d0]" },
                  { name: "Vitamin B", color: "bg-[#d7c6ff]" },
                ].map((item, index) => (
                  <div key={`${item.name}-${index}`} className={`${item.color} rounded-lg p-3`}>
                    <p className="text-[11px] font-semibold text-[#212529]">{item.name}</p>
                    <p className="text-[10px] text-[#5c5c5c]">Capsule · 10mg</p>
                    <div className="h-12 mt-2 bg-white/60 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black rounded-xl p-4 text-white relative overflow-hidden">
              <span className="inline-block px-2 py-1 text-[10px] bg-[#1e90ff] rounded-full">AI ANALYTICS</span>
              <h3 className="text-[16px] font-semibold mt-3">Vertebral Fractures</h3>
              <p className="text-[12px] text-white/80 mt-1">The AI report is generated based on the images of the diseased.</p>
              <div className="h-28 mt-3 bg-white/10 rounded-lg"></div>
            </div>
          </div>

          <div className="relative bg-white rounded-2xl border border-[#e8e7e7] min-h-[740px]">
            <div className="absolute right-8 top-8 flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={`marker-${index}`} className="h-16 w-16 rounded-lg bg-[#e8f1ff] border border-[#cfe0ff]"></div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[520px] w-[300px] bg-[#f8f9fa] rounded-xl border border-[#e8e7e7]"></div>
            </div>
            <div className="absolute left-8 bottom-8 flex items-center gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <button key={`action-${index}`} className="h-9 w-9 rounded-full border border-[#e2e4e5] bg-white"></button>
              ))}
            </div>
            <div className="absolute right-8 bottom-8 bg-white border border-[#e8e7e7] rounded-xl p-3">
              <p className="text-[12px] font-semibold text-[#212529] mb-2">Body Mass Index</p>
              <div className="h-10 w-56 bg-[#f1f5f9] rounded"></div>
              <div className="flex justify-end gap-2 mt-2">
                <span className="px-2 py-1 text-[10px] bg-[#212529] text-white rounded">Weight</span>
                <span className="px-2 py-1 text-[10px] bg-[#f1f5f9] text-[#212529] rounded">Height</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Lab Reports" && (
        <div className="bg-white rounded-xl border border-[#e8e7e7] p-6">
          <div className="space-y-8">
            {[
              {
                title: "Full Body Test",
                lab: "Laboratory: HealthLab Diagnostics.",
                prescriber: "Prescriber: Dr. Michael Chen",
                testDate: "Nov 20, 2025",
                reportDate: "Nov 20, 2025",
              },
              {
                title: "Blood Test",
                lab: "Laboratory:HealthLab Diagnostics.",
                prescriber: "Prescriber: Dr. Hermann Paul.",
                testDate: "22 September, 2025",
                reportDate: "24 September, 2025",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start justify-between border-b border-[#e8e7e7] pb-6">
                <div>
                  <h3 className="text-[14px] font-semibold text-[#212529] mb-2">{item.title}</h3>
                  <p className="text-[13px] text-[#5c5c5c]">{item.lab}</p>
                  <p className="text-[13px] text-[#5c5c5c]">{item.prescriber}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-10">
                    <div>
                      <p className="text-[11px] text-[#5c5c5c]">Test Date</p>
                      <p className="text-[13px] font-medium text-[#212529]">{item.testDate}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#5c5c5c]">Report Date</p>
                      <p className="text-[13px] font-medium text-[#212529]">{item.reportDate}</p>
                    </div>
                    <button className="p-2 hover:bg-[#f1f5f9] rounded-lg">
                      <svg className="w-4 h-4 text-[#5c5c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
