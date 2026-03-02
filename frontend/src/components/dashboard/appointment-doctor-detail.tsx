"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { AppointmentBookingFlow } from "@/components/dashboard/appointment-booking-flow"

export function AppointmentDoctorDetail() {
  const router = useRouter()
  const [showBookingFlow, setShowBookingFlow] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="h-9 w-9 rounded-lg border border-[#e2e4e5] flex items-center justify-center hover:bg-[#f8f9fa]"
        >
          <svg className="w-4 h-4 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-[14px] text-[#5c5c5c]">Doctors</span>
      </div>

      <div className="bg-white rounded-xl border border-[#e8e7e7] p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[#e8f1ff]"></div>
            <div>
              <p className="text-[13px] text-[#5c5c5c]">#DT2002</p>
              <h2 className="text-[18px] font-semibold text-[#212529]">Dr. Andrew Clark</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-1 text-[11px] text-[#007bff] bg-[#e8f1ff] rounded-full">Cardiologist</span>
                <span className="px-2 py-1 text-[11px] text-[#10b981] bg-[#d4f5e0] rounded-full">Available</span>
              </div>
              <p className="text-[12px] text-[#5c5c5c] mt-2">MBBS, MRCP (UK), CCT, FRCP DM (Doctorate of Medicine)</p>
              <p className="text-[12px] text-[#5c5c5c] mt-1">Clinic : Green Central General Hospital</p>
            </div>
          </div>
          <div className="text-right space-y-3">
            <div>
              <p className="text-[12px] text-[#5c5c5c]">Consultation Charge</p>
              <p className="text-[14px] font-semibold text-[#212529]">$25 / 30 Min</p>
            </div>
            <button
              onClick={() => setShowBookingFlow(true)}
              className="px-5 py-2 bg-[#007bff] text-white rounded-lg text-[13px] font-medium hover:bg-[#0056b3]"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_280px] gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#e8e7e7] p-5">
            <h3 className="text-[14px] font-semibold text-[#212529] mb-3">Availability</h3>
            <div className="grid grid-cols-5 gap-3 text-center text-[12px] text-[#212529]">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                <div key={day} className="border-b border-[#e8e7e7] pb-2 font-medium">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-3 mt-3">
              {[
                "11:30 AM - 12:30 PM",
                "12:30 PM - 01:30 PM",
                "02:30 PM - 03:30 PM",
                "04:30 PM - 05:30 PM",
                "06:00 PM - 07:30 PM",
                "07:00 PM - 08:30 PM",
                "09:00 PM - 11:00 PM",
                "11:00 PM - 11:30 PM",
              ].map((slot, index) => (
                <div key={slot} className="col-span-1">
                  <span className="inline-block w-full text-center px-2 py-1 text-[11px] bg-[#f1f5f9] rounded-md text-[#212529]">
                    {slot}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#e8f4ff] rounded-xl p-5">
            <h3 className="text-[14px] font-semibold text-[#212529] mb-2">About</h3>
            <p className="text-[13px] text-[#5c5c5c] leading-relaxed">
              Dr. Mick Thompson has been practicing family medicine for over 5 years. He has extensive experience
              in managing chronic illnesses, preventive care, and treating a wide range of medical conditions for
              patients of all ages. Dr. Mick Thompson is dedicated to providing patient-centered care and emphasizes
              building long-term relationships with her patients.
            </p>
            <button className="mt-3 text-[12px] text-[#212529] font-medium flex items-center gap-1">
              See More
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#e8e7e7] p-5">
            <h3 className="text-[14px] font-semibold text-[#212529] mb-4">Education Information</h3>
            <div className="space-y-4 text-[13px]">
              <div>
                <p className="font-semibold text-[#212529]">Boston Medicine Institution - MD</p>
                <p className="text-[#5c5c5c]">25 May 1990 - 29 Jan 1992</p>
              </div>
              <div>
                <p className="font-semibold text-[#212529]">Harvard Medical School, Boston - MBBS</p>
                <p className="text-[#5c5c5c]">25 May 1985 - 29 Jan 1990</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-[13px] font-semibold text-[#212529] mb-3">Professional Experience</h4>
              <div className="space-y-3 text-[13px]">
                <div>
                  <p className="font-semibold text-[#212529]">Mayo Clinic</p>
                  <p className="text-[#5c5c5c]">Dec 2014 - 29 Jan 2022</p>
                  <p className="text-[#5c5c5c]">Located in Rochester, Minnesota, specializing in Cardiology.</p>
                </div>
                <div>
                  <p className="font-semibold text-[#212529]">Cleveland Clinic</p>
                  <p className="text-[#5c5c5c]">Feb 2004 - 29 Jan 2010</p>
                  <p className="text-[#5c5c5c]">Located in Cleveland, Ohio, specializing in Cardiology.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e8e7e7] p-5 h-fit">
          <h3 className="text-[14px] font-semibold text-[#212529] mb-4">About</h3>
          <div className="space-y-4 text-[12px] text-[#5c5c5c]">
            <div>
              <p className="text-[#212529] font-medium">Medical Licence Number</p>
              <p>ML566659898</p>
            </div>
            <div>
              <p className="text-[#212529] font-medium">Phone Number</p>
              <p>+1 54546 45648</p>
            </div>
            <div>
              <p className="text-[#212529] font-medium">Email Address</p>
              <p>MICK@example.com</p>
            </div>
            <div>
              <p className="text-[#212529] font-medium">DOB</p>
              <p>25 Jan 1990</p>
            </div>
            <div>
              <p className="text-[#212529] font-medium">Blood Group</p>
              <p>o +ve</p>
            </div>
            <div>
              <p className="text-[#212529] font-medium">Year of Experience</p>
              <p>+15 Years</p>
            </div>
            <div>
              <p className="text-[#212529] font-medium">Gender</p>
              <p>Male</p>
            </div>
          </div>
        </div>
      </div>
      {showBookingFlow && (
        <AppointmentBookingFlow onClose={() => setShowBookingFlow(false)} />
      )}
    </div>
  )
}
