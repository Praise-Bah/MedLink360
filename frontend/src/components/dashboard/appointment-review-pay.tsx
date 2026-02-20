"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export function AppointmentReviewPay() {
  const router = useRouter()
  const [showToast, setShowToast] = useState(false)

  const handlePay = () => {
    setShowToast(true)
    setTimeout(() => {
      router.push("/appointments/summary")
    }, 800)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="h-10 w-10 rounded-full border border-[#e2e4e5] flex items-center justify-center hover:bg-[#f8f9fa]"
        >
          <svg className="w-4 h-4 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-[14px] text-[#5c5c5c]">Appointments</span>
      </div>
      <div className="grid grid-cols-[320px_1fr] gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#e8e7e7] p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-[#e8f1ff] mb-3"></div>
              <h2 className="text-[18px] font-semibold text-[#212529]">Dr. Andrew Clark</h2>
              <p className="text-[13px] text-[#5c5c5c]">Cardiologist</p>
              <p className="text-[13px] text-[#5c5c5c]">Green Central General Hospital</p>
              <p className="text-[12px] text-[#5c5c5c] mt-2">MBBS, MRCP (UK), CCT, FRCP DM</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[12px] text-[#5c5c5c] mt-6">
              <div className="bg-[#f8f9fa] rounded-lg p-3">
                <p className="text-[#212529] font-medium">Total Experience</p>
                <p>05+ Years</p>
              </div>
              <div className="bg-[#f8f9fa] rounded-lg p-3">
                <p className="text-[#212529] font-medium">Rating</p>
                <p>4.9 (500)</p>
              </div>
            </div>
            <div className="bg-[#f8f9fa] rounded-lg p-3 mt-4 text-[13px]">
              <p className="text-[#212529] font-medium">1500frs</p>
              <p className="text-[#5c5c5c]">Consultation fee</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#e8e7e7] p-6">
            <h3 className="text-[14px] font-semibold text-[#212529] mb-3">Promo Code</h3>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 h-10 rounded-full border border-[#e2e4e5] px-4 text-[13px]"
                placeholder="Promo Code"
              />
              <button className="h-10 px-6 rounded-full bg-[#212529] text-white text-[13px]">Apply</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e8e7e7] p-6">
          <h2 className="text-[20px] font-semibold text-[#212529] mb-1">Review &amp; Pay</h2>
          <p className="text-[16px] font-semibold text-[#212529] mb-4">Appointment</p>

          <div className="space-y-4">
            <div>
              <p className="text-[12px] text-[#5c5c5c] mb-2">Patient Info</p>
              <div className="flex items-center justify-between bg-[#f8f9fa] rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#e8f1ff]"></div>
                  <div>
                    <p className="text-[13px] font-medium text-[#212529]">Ezra Belcher</p>
                    <p className="text-[11px] text-[#5c5c5c]">Pine Valley, Seattle, USA</p>
                  </div>
                </div>
                <span className="text-[11px] text-[#007bff] bg-[#e8f1ff] px-2 py-1 rounded-full">Myself</span>
              </div>
              <button className="mt-2 text-[11px] text-[#5c5c5c] border border-dashed border-[#cbd5f5] px-3 py-1 rounded-full">
                click and upload prescriptions.
              </button>
            </div>

            <div>
              <p className="text-[12px] text-[#5c5c5c] mb-2">Schedule</p>
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-semibold text-[#212529]">Time &amp; Date</p>
                <button className="text-[#9ca3af]">✎</button>
              </div>
              <div className="flex items-center gap-6 text-[13px] text-[#5c5c5c] mt-3">
                <span>10:00 AM</span>
                <span>17 Dec, 2025</span>
              </div>
            </div>

            <div>
              <h4 className="text-[14px] font-semibold text-[#212529] mb-3">Bill Details</h4>
              <div className="space-y-2 text-[13px] text-[#5c5c5c]">
                <div className="flex justify-between">
                  <span>Consultation Fees:</span>
                  <span>1500frs</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking Fees</span>
                  <span>0frs</span>
                </div>
                <div className="flex justify-between">
                  <span>Promo applied</span>
                  <span>0frs</span>
                </div>
              </div>
              <div className="flex justify-between mt-4 text-[16px] font-semibold text-[#212529]">
                <span>Total Pay</span>
                <span>1500frs</span>
              </div>
            </div>

            <div>
              <p className="text-[12px] text-[#5c5c5c] mb-3">Pay with</p>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#212529]">**** 5789</span>
                <button className="px-4 py-2 rounded-full bg-[#212529] text-white text-[12px]">Change</button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handlePay}
              className="h-12 px-10 bg-[#007bff] text-white rounded-full text-[14px] font-medium"
            >
              Pay 1500frs
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-white border border-[#e8e7e7] rounded-xl shadow-lg px-5 py-3 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#e8f7ef] flex items-center justify-center text-[#10b981]">✓</div>
          <div>
            <p className="text-[14px] font-semibold text-[#212529]">Appointment Successfully</p>
            <p className="text-[12px] text-[#5c5c5c]">Visit Dr. Andrew Clark on 2025-09-15 at 10:30am</p>
          </div>
          <button onClick={() => setShowToast(false)} className="ml-2 text-[#5c5c5c]">×</button>
        </div>
      )}
    </div>
  )
}
