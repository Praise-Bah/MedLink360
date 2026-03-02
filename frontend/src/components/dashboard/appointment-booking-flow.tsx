"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface AppointmentBookingFlowProps {
  onClose: () => void
}

type BookingStep = "date" | "details"

export function AppointmentBookingFlow({ onClose }: AppointmentBookingFlowProps) {
  const [step, setStep] = useState<BookingStep>("date")
  const [selectedDay, setSelectedDay] = useState(10)
  const [selectedTime, setSelectedTime] = useState("02:30pm")
  const router = useRouter()

  const handleConfirm = () => {
    onClose()
    router.push("/appointments/review-pay")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl border border-[#e8e7e7] shadow-2xl overflow-hidden">
        {step === "date" && (
          <div className="grid grid-cols-[300px_1fr]">
            <div className="p-6 border-r border-[#e8e7e7]">
              <button
                onClick={onClose}
                className="h-10 w-10 rounded-full border border-[#e2e4e5] flex items-center justify-center hover:bg-[#f8f9fa]"
              >
                <svg className="w-4 h-4 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="mt-8 space-y-6 text-[14px] text-[#5c5c5c]">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7a4 4 0 118 0v4h1a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a2 2 0 012-2h1V7z" />
                  </svg>
                  <span>Dr. Andrew Clark</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  <span>30 mins</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.343-4 3 0 1.1.666 2.07 1.667 2.6L9 17h6l-.667-3.4C15.334 13.07 16 12.1 16 11c0-1.657-1.79-3-4-3z" />
                  </svg>
                  <span>Fees: 1500frs</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-[18px] font-semibold text-[#212529] mb-4">Select Date and Time</h2>
              <div className="flex items-center justify-center gap-4 mb-4 text-[14px] text-[#212529]">
                <button className="h-8 w-8 rounded-full border border-[#e2e4e5] flex items-center justify-center">&lt;</button>
                <span>August 2023</span>
                <button className="h-8 w-8 rounded-full border border-[#e2e4e5] flex items-center justify-center">&gt;</button>
              </div>
              <div className="grid grid-cols-7 text-[12px] text-[#5c5c5c] mb-2">
                {"Mon Tue Wed Thu Fri Sat Sun".split(" ").map((d) => (
                  <div key={d} className="text-center">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2 text-[12px] text-[#212529]">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className="flex items-center justify-center h-9 rounded-full border border-transparent"
                  >
                    <span
                      className={
                        day === selectedDay
                          ? "bg-[#007bff] text-white h-9 w-9 rounded-full flex items-center justify-center"
                          : "h-9 w-9 flex items-center justify-center"
                      }
                    >
                      {day}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-6 border-t border-[#e8e7e7] pt-4">
                <p className="text-[13px] text-[#212529] mb-3">Thursday, {selectedDay}th August</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "10:30am",
                    "11:30am",
                    "02:30pm",
                    "03:00pm",
                    "03:30pm",
                    "04:30pm",
                    "05:00pm",
                    "05:30pm",
                  ].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`px-3 py-1.5 text-[12px] border rounded-md ${
                        slot === selectedTime
                          ? "border-[#007bff] text-[#007bff]"
                          : "border-[#e2e4e5] text-[#212529]"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setStep("details")}
                  className="h-10 px-8 bg-[#007bff] text-white rounded-lg text-[13px] font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="grid grid-cols-[300px_1fr]">
            <div className="p-6 border-r border-[#e8e7e7]">
              <button
                onClick={() => setStep("date")}
                className="h-10 w-10 rounded-full border border-[#e2e4e5] flex items-center justify-center hover:bg-[#f8f9fa]"
              >
                <svg className="w-4 h-4 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="mt-8 space-y-6 text-[14px] text-[#5c5c5c]">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7a4 4 0 118 0v4h1a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a2 2 0 012-2h1V7z" />
                  </svg>
                  <span>Dr. Andrew Clark</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  <span>30 mins</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.343-4 3 0 1.1.666 2.07 1.667 2.6L9 17h6l-.667-3.4C15.334 13.07 16 12.1 16 11c0-1.657-1.79-3-4-3z" />
                  </svg>
                  <span>Fees: 1500frs</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{selectedTime} - 03:00pm, Thursday, August {selectedDay}th</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-[18px] font-semibold text-[#212529] mb-4">Enter Details</h2>
              <div className="space-y-4 text-[13px] text-[#212529]">
                <div>
                  <label className="block mb-2">Patient’s Name</label>
                  <input className="w-full h-10 border border-[#e2e4e5] rounded-lg px-3" placeholder="Patient name" />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Pre-Appointment Health Questionnaire</label>
                  <label className="block mb-2 text-[#5c5c5c]">Reason for Visit</label>
                  <input className="w-full h-10 border border-[#e2e4e5] rounded-lg px-3" placeholder="E.g. Annual checkup, Follow-up consultation" />
                </div>
                <div>
                  <label className="block mb-2 text-[#5c5c5c]">Current Symptoms</label>
                  <input className="w-full h-10 border border-[#e2e4e5] rounded-lg px-3" placeholder="Describe your symptoms..." />
                </div>
                <div>
                  <label className="block mb-2 text-[#5c5c5c]">Medications Currently Taking</label>
                  <input className="w-full h-10 border border-[#e2e4e5] rounded-lg px-3" placeholder="List any medications..." />
                </div>
              </div>
              <div className="border-t border-[#e8e7e7] my-5"></div>
              <div className="space-y-3 text-[13px]">
                <p className="font-medium text-[#212529]">Payment Details</p>
                {[
                  "Paypal",
                  "Paytm",
                  "Credit Card",
                ].map((method, index) => (
                  <label key={method} className="flex items-center gap-2 text-[#212529]">
                    <input type="radio" name="payment" defaultChecked={index === 0} />
                    {method}
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={onClose} className="h-10 px-6 border border-[#007bff] text-[#007bff] rounded-lg text-[13px] font-medium">
                  Cancel
                </button>
                <button onClick={handleConfirm} className="h-10 px-6 bg-[#007bff] text-white rounded-lg text-[13px] font-medium">
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
