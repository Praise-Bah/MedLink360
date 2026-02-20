"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function AppointmentSummary() {
  const [showDetails, setShowDetails] = useState(false)
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => router.push("/appointments")}
              className="h-9 w-9 rounded-lg border border-[#e2e4e5] flex items-center justify-center hover:bg-[#f8f9fa]"
            >
              <svg className="w-4 h-4 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-[14px] text-[#5c5c5c]">Appointments</span>
          </div>
          <h1 className="text-[22px] font-semibold text-[#212529]">Appointments</h1>
          <p className="text-[14px] text-[#5c5c5c]">Book, view, and manage your healthcare appointments</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search any doctors, specialties, or reasons..."
            className="w-full h-12 pl-11 pr-4 rounded-lg border border-[#e2e4e5] text-[14px] focus:outline-none focus:border-[#007bff] bg-white"
          />
        </div>
        <div className="relative">
          <select className="h-12 pl-4 pr-10 rounded-lg border border-[#e2e4e5] text-[14px] text-[#212529] font-medium focus:outline-none focus:border-[#007bff] bg-white appearance-none cursor-pointer">
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <button className="h-12 px-6 bg-[#007bff] text-white rounded-lg text-[14px] font-medium">Book Appointment</button>
      </div>

      <div className="bg-white rounded-xl border border-[#e8e7e7] p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-full bg-[#e8f1ff]"></div>
            <div>
              <h3 className="text-[16px] font-semibold text-[#212529]">Dr. Andrew Clark</h3>
              <p className="text-[12px] text-[#5c5c5c]">Green Central General Hospital</p>
              <p className="text-[12px] text-[#5c5c5c]">Cardiologist 10 yrs of experience</p>
              <div className="flex items-center gap-3 mt-2 text-[12px] text-[#5c5c5c]">
                <span>2025-09-15 at 10:30am</span>
                <span>St. Mary's Hospital 123 Medical Center, Room 205</span>
              </div>
            </div>
          </div>
          <span className="px-3 py-1 text-[11px] text-[#10b981] bg-[#d4f5e0] rounded-full">Confirmed</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 text-[12px] text-[#5c5c5c]">
          <div>
            <p className="text-[#212529] font-medium">Type:</p>
            <p>Follow- Up</p>
          </div>
          <div>
            <p className="text-[#212529] font-medium">Reason:</p>
            <p>i feel pain that spreads from my chest to my arms</p>
          </div>
          <div>
            <p className="text-[#212529] font-medium">Notes:</p>
            <p>Bring recent blood pressure readings</p>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => setShowDetails(true)}
            className="px-4 py-2 text-[12px] border border-[#e2e4e5] rounded-lg"
          >
            View Details
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl bg-white rounded-2xl border border-[#e8e7e7] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-[#007bff] text-white">
              <button
                onClick={() => setShowDetails(false)}
                className="h-8 w-8 rounded-full border border-white/40 flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-[16px] font-semibold">Appointment Details</h2>
              <button onClick={() => setShowDetails(false)} className="text-white">×</button>
            </div>
            <div className="p-6 space-y-4 text-[13px] text-[#212529]">
              <div className="flex items-center gap-2">
                <span className="font-medium">Name:</span>
                <span>John Carter</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Doctor Name:</span>
                <span>Dr. Andrew Clark</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Hospital:</span>
                <span>Green Central General Hospital</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Amount:</span>
                <span>1500frs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Date &amp; Time:</span>
                <span>02:30pm - 03:00pm, Thursday, August 10th</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium">Current Symptoms:</span>
                <span>Mild chest congestion and persistent dry cough for the past 6 days</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium">Medications Currently Taking:</span>
                <div>
                  <p>Loratadine 10 mg — once daily for allergies</p>
                  <p>Acetaminophen 500 mg — as needed for discomfort (usually once a day)</p>
                  <p>Vitamin D3 supplement — 1000 IU daily</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium">Reason for Visit:</span>
                <span>Follow-up consultation after recent upper respiratory infection</span>
              </div>
            </div>
            <div className="flex justify-center gap-4 px-6 pb-6">
              <button
                onClick={() => setShowDetails(false)}
                className="h-10 px-10 border border-[#007bff] text-[#007bff] rounded-lg text-[13px] font-medium"
              >
                Done
              </button>
              <button className="h-10 px-8 bg-[#007bff] text-white rounded-lg text-[13px] font-medium">
                Book another appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
