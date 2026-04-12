"use client"

import Link from "next/link"

export function AppointmentsPage() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Andrew Clark",
      specialty: "Cardiology",
      hospital: "#Green Central General Hospital",
      experience: "4+ Years",
      appointments: "200",
      email: "andrew@example.com",
      phone: "+1 75964 25493",
      slots: "12 Slot",
    },
    {
      id: 2,
      name: "Dr. Katherine Brooks",
      specialty: "Cardiology",
      hospital: "#Northern Regional Hospital",
      experience: "3+ Years",
      appointments: "350",
      email: "katherine@example.com",
      phone: "+1 24586 03958",
      slots: "12 Slot",
    },
    {
      id: 3,
      name: "Dr. Benjamin Harris",
      specialty: "Cardiology",
      hospital: "#Northern Regional Hospital",
      experience: "6+ Years",
      appointments: "400",
      email: "benjamin@example.com",
      phone: "+1 83217 65984",
      slots: "12 Slot",
    },
    {
      id: 4,
      name: "Dr. Laura Mitchell",
      specialty: "Cardiology",
      hospital: "#Green Central General Hospital",
      experience: "2+ Years",
      appointments: "150",
      email: "laura@example.com",
      phone: "+1 91745 36289",
      slots: "12 Slot",
    },
    {
      id: 5,
      name: "Dr. Samuel Turner",
      specialty: "Cardiology",
      hospital: "#Eastern Medical Center",
      experience: "4+ Years",
      appointments: "510",
      email: "samuel@example.com",
      phone: "+1 61957 84230",
      slots: "12 Slot",
    },
    {
      id: 6,
      name: "Dr. Victoria Evans",
      specialty: "Cardiology",
      hospital: "#Green Central General Hospital",
      experience: "3+ Years",
      appointments: "480",
      email: "victoria@example.com",
      phone: "+1 84736 50912",
      slots: "12 Slot",
    },
    {
      id: 7,
      name: "Dr. Daniel Foster",
      specialty: "Cardiology",
      hospital: "#Green Central General Hospital",
      experience: "5+ Years",
      appointments: "460",
      email: "daniel@example.com",
      phone: "+1 70325 67849",
      slots: "12 Slot",
    },
    {
      id: 8,
      name: "Dr. Amelia Scott",
      specialty: "Cardiology",
      hospital: "#Green Central General Hospital",
      experience: "3+ Years",
      appointments: "220",
      email: "amelia@example.com",
      phone: "+1 56214 89375",
      slots: "12 Slot",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] font-semibold text-[#212529]">Appointments</h1>
        <p className="text-[14px] text-[#5c5c5c]">Search for doctors, nurses, or hospitals</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search any doctors, specialties, or hospital..."
            className="w-full h-12 pl-11 pr-4 rounded-lg border border-[#e2e4e5] text-[14px] focus:outline-none focus:border-[#007bff] bg-white"
          />
        </div>
        <div className="relative">
          <select className="h-12 pl-4 pr-10 rounded-lg border border-[#e2e4e5] text-[14px] text-[#212529] font-medium focus:outline-none focus:border-[#007bff] bg-white appearance-none cursor-pointer">
            <option>All Status</option>
            <option>Available</option>
            <option>Booked</option>
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <button className="h-12 px-6 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors">
          Book Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {doctors.map((doctor) => (
          <Link
            key={doctor.id}
            href="/appointments/doctor"
            className="bg-white rounded-xl border border-[#e8e7e7] p-4 shadow-sm hover:border-[#007bff] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 text-[11px] text-[#007bff] bg-[#e8f1ff] rounded-full">{doctor.hospital}</span>
                <button className="text-[#9ca3af] hover:text-[#212529]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-center text-center mb-4">
                <div className="h-16 w-16 rounded-full bg-[#e8f1ff] mb-3"></div>
                <p className="text-[14px] font-semibold text-[#212529]">{doctor.name}</p>
                <p className="text-[12px] text-[#5c5c5c]">{doctor.specialty}</p>
              </div>
              <div className="grid grid-cols-2 border border-[#e8e7e7] rounded-lg overflow-hidden mb-4">
                <div className="p-2 text-center">
                  <p className="text-[11px] text-[#5c5c5c]">Experience</p>
                  <p className="text-[12px] font-semibold text-[#212529]">{doctor.experience}</p>
                </div>
                <div className="p-2 text-center border-l border-[#e8e7e7]">
                  <p className="text-[11px] text-[#5c5c5c]">Appointments</p>
                  <p className="text-[12px] font-semibold text-[#212529]">{doctor.appointments}</p>
                </div>
              </div>
              <div className="space-y-2 text-[12px] text-[#5c5c5c]">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 10H5a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2z" />
                  </svg>
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{doctor.phone}</span>
                </div>
              </div>
              <span className="inline-block mt-3 px-3 py-1 text-[11px] text-[#10b981] bg-[#d4f5e0] rounded-full">{doctor.slots}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
