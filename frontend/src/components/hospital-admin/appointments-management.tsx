"use client"

import { useState } from "react"

interface Appointment {
  id: string
  patientName: string
  patientId: string
  doctorName: string
  department: string
  date: string
  time: string
  type: "Consultation" | "Follow-up" | "Emergency" | "Surgery"
  status: "Scheduled" | "Completed" | "Cancelled" | "In Progress"
  day: number
}

const appointments: Appointment[] = [
  { id: "APT001", patientName: "Ralph Edwards", patientId: "MED-001", doctorName: "Dr. James Wilson", department: "Cardiology", date: "Apr 3, 2023", time: "08:00 - 16:00", type: "Consultation", status: "Scheduled", day: 1 },
  { id: "APT002", patientName: "Jerome Bell", patientId: "MED-002", doctorName: "Dr. Emily Brown", department: "General Medicine", date: "Apr 3, 2023", time: "09:00 - 11:00", type: "Surgery", status: "In Progress", day: 2 },
  { id: "APT003", patientName: "Kathryn Murphy", patientId: "MED-003", doctorName: "Dr. Michael Chen", department: "Neurology", date: "Apr 4, 2023", time: "10:00 - 12:00", type: "Consultation", status: "Scheduled", day: 3 },
  { id: "APT004", patientName: "Jacob Jones", patientId: "MED-004", doctorName: "Dr. Lisa Anderson", department: "Pediatrics", date: "Apr 4, 2023", time: "13:00 - 15:00", type: "Emergency", status: "Completed", day: 4 },
  { id: "APT005", patientName: "Kristin Watson", patientId: "MED-005", doctorName: "Dr. James Wilson", department: "Cardiology", date: "Apr 5, 2023", time: "08:00 - 16:00", type: "Surgery", status: "Scheduled", day: 5 },
  { id: "APT006", patientName: "Cameron Williams", patientId: "MED-006", doctorName: "Dr. Emily Brown", department: "General Medicine", date: "Apr 6, 2023", time: "09:30 - 11:30", type: "Follow-up", status: "Cancelled", day: 6 },
  { id: "APT007", patientName: "Brooklyn Simmons", patientId: "MED-007", doctorName: "Dr. Michael Chen", department: "Neurology", date: "Apr 7, 2023", time: "14:00 - 16:00", type: "Consultation", status: "Scheduled", day: 7 },
]

export function AppointmentsManagement() {
  const [selectedType, setSelectedType] = useState<string>("All")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Consultation": return "bg-[#e3f2fd] text-[#1565c0]"
      case "Follow-up": return "bg-[#e8f5e9] text-[#2e7d32]"
      case "Emergency": return "bg-[#ffebee] text-[#c62828]"
      case "Surgery": return "bg-[#f3e5f5] text-[#7b1fa2]"
      default: return "bg-[#e2e3e5] text-[#383d41]"
    }
  }

  const typeFilters = [
    { value: "All", label: "Full Day (All Types)" },
    { value: "Consultation", label: "Consultation" },
    { value: "Surgery", label: "Surgery (Full day)" },
    { value: "Follow-up", label: "Follow-up" },
    { value: "Emergency", label: "Emergency" },
  ]

  const filteredAppointments =
    selectedType === "All"
      ? appointments
      : appointments.filter((apt) => apt.type === selectedType)

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#212529]">Calendar</h1>
          <p className="text-[12px] text-[#6c757d]">Home &gt; Calendar</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-9 h-9 rounded-full border border-[#e2e4e7] flex items-center justify-center text-[#6c757d] hover:bg-[#f8f9fa]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-full border border-[#e2e4e7] flex items-center justify-center text-[#6c757d] hover:bg-[#f8f9fa]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {typeFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setSelectedType(filter.value)}
              className={`px-3 py-1.5 rounded-full border text-[13px] transition-colors ${
                selectedType === filter.value
                  ? "bg-[#007bff] text-white border-[#007bff]"
                  : "bg-white text-[#212529] border-[#e0e3ea] hover:bg-[#f8f9ff]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[13px] text-[#6c757d]">Category:</span>
          <select className="px-3 py-2 border border-[#e2e4e7] rounded-lg text-[13px] text-[#212529] focus:outline-none focus:border-[#007bff]">
            <option>Multiply</option>
            <option>Doctor</option>
            <option>Department</option>
          </select>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-6 relative">
        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            {/* Days header */}
            <div className="grid grid-cols-7 gap-4 mb-4 text-center">
              {daysOfWeek.map((dayName, index) => (
                <div key={dayName} className="text-[13px]">
                  <div className="text-[#212529] font-medium mb-1">{index + 1}</div>
                  <div className="text-[#6c757d]">{dayName}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-4 min-h-[420px] md:min-h-[520px] lg:min-h-[560px]">
              {daysOfWeek.map((_, index) => {
                const dayIndex = index + 1
                const dayAppointments = filteredAppointments.filter((apt) => apt.day === dayIndex)

                return (
                  <div
                    key={dayIndex}
                    className="relative bg-[#f8fafc] rounded-lg border border-dashed border-[#e0e7ff] p-2 sm:p-3"
                  >
                    {dayAppointments.map((apt) => (
                      <button
                        key={apt.id}
                        type="button"
                        onClick={() => setSelectedAppointment(apt)}
                        className={`w-full text-left rounded-lg px-3 py-2 mb-2 shadow-sm text-[12px] ${getTypeColor(
                          apt.type
                        )}`}
                      >
                        <p className="text-[11px] opacity-80">{apt.time}</p>
                        <p className="text-[13px] font-medium">{apt.patientName}</p>
                        <p className="text-[11px] opacity-80">{apt.doctorName}</p>
                      </button>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {selectedAppointment && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#28a745]" />
                  <div>
                    <p className="text-[15px] font-semibold text-[#212529]">{selectedAppointment.type}</p>
                    <p className="text-[12px] text-[#6c757d]">{selectedAppointment.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full border border-[#e2e4e7] flex items-center justify-center text-[#6c757d] hover:bg-[#f8f9fa]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full border border-[#ffe0e3] flex items-center justify-center text-[#dc3545] hover:bg-[#fff5f5]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAppointment(null)}
                    className="w-8 h-8 rounded-full border border-[#e2e4e7] flex items-center justify-center text-[#6c757d] hover:bg-[#f8f9fa]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-[13px] text-[#212529]">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3M5 11h14M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{selectedAppointment.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{selectedAppointment.doctorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.5 20.5L12 21l6.5-.5L12 4z"
                    />
                  </svg>
                  <span>{selectedAppointment.department}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
