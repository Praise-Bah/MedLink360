"use client"

import { useState } from "react"

export function NurseDashboardContent() {
  const [activeTab, setActiveTab] = useState<"patients" | "incoming">("patients")

  const patients = [
    { id: "PT001", name: "Ateeq Rafiq", initials: "AT", age: 28, gender: "Male", condition: "Hypertension", status: "active", lastVisit: "1/15/2024" },
    { id: "PT002", name: "Michael Chen", initials: "SJ", age: 45, gender: "Male", condition: "Diabetes Type 2", status: "follow-up", lastVisit: "1/15/2024" },
    { id: "PT003", name: "Emma Wilson", initials: "SJ", age: 28, gender: "Female", condition: "Asthma", status: "active", lastVisit: "1/15/2024" },
    { id: "PT004", name: "James Brown", initials: "SJ", age: 52, gender: "Male", condition: "Arthritis", status: "discharged", lastVisit: "1/15/2024" },
    { id: "PT005", name: "Lisa Anderson", initials: "SJ", age: 39, gender: "Female", condition: "Migraine", status: "active", lastVisit: "1/15/2024" },
  ]

  const scheduleData = [
    { day: "1/1", dayName: "Sun", events: [
      { time: "19:00", label: "Check-in", color: "bg-[#10b981]" },
      { time: "20:00", label: "Check-up", color: "bg-[#3b82f6]" },
    ]},
    { day: "1/2", dayName: "Mon", events: [
      { time: "08:00", label: "Check-up", color: "bg-[#ef4444]" },
      { time: "09:00", label: "Coffee", color: "bg-[#f59e0b]" },
      { time: "14:00", label: "Lunch", color: "bg-[#10b981]" },
      { time: "16:00", label: "Check-up patient", color: "bg-[#3b82f6]" },
      { time: "20:00", label: "Ass to doctor at Brain Surgery", color: "bg-[#06b6d4]" },
    ]},
    { day: "1/3", dayName: "Tue", events: [
      { time: "08:00", label: "Check-up", color: "bg-[#3b82f6]" },
      { time: "14:00", label: "Vitamins", color: "bg-[#ef4444]" },
      { time: "17:00", label: "Check-up", color: "bg-[#10b981]" },
    ]},
    { day: "1/4", dayName: "Wed", events: [
      { time: "08:00", label: "Block event", color: "bg-[#ef4444]", wide: true },
      { time: "17:00", label: "Lunch", color: "bg-[#3b82f6]" },
      { time: "20:00", label: "Dinner", color: "bg-[#10b981]" },
    ]},
    { day: "1/5", dayName: "Thu", events: [
      { time: "10:00", label: "Ass to doctor at Brain Surgery", color: "bg-[#f59e0b]", wide: true },
      { time: "17:00", label: "Check-up", color: "bg-[#3b82f6]" },
      { time: "19:00", label: "Check-up patient", color: "bg-[#ef4444]" },
    ]},
    { day: "1/6", dayName: "Fri", events: [
      { time: "08:00", label: "Vitamins", color: "bg-[#ef4444]" },
      { time: "19:00", label: "Ass to doctor at Brain Surgery", color: "bg-[#10b981]", wide: true },
    ]},
    { day: "1/7", dayName: "Sat", events: [
      { time: "08:00", label: "Vitamins", color: "bg-[#f59e0b]" },
      { time: "12:00", label: "Check-out", color: "bg-[#6b7280]" },
      { time: "17:00", label: "Education", color: "bg-[#3b82f6]" },
    ]},
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#212529]">
            Welcome Sarah Johnson - <span className="font-normal text-[#6c757d]">Registered Nurse</span>
          </h1>
          <p className="text-[14px] text-[#6c757d]">
            I hope you're in a good mood because there are 56 patients waiting for you
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button className="px-4 py-2 border border-[#007bff] text-[#007bff] rounded-lg text-[14px] font-medium hover:bg-[#007bff] hover:text-white transition-colors">
            Day Shift
          </button>
          <span className="text-[14px] text-[#6c757d]">General Ward</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Patients */}
        <div className="bg-white rounded-xl border border-[#e9ecef] p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[28px] font-bold text-[#212529]">2.9k</p>
              <p className="text-[14px] text-[#6c757d]">Active Patients</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[12px]">
            <span className="text-[#6c757d]">This week</span>
            <span className="text-[#dc3545] flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              20%
            </span>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-xl border border-[#e9ecef] p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#e6f7f0] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[28px] font-bold text-[#212529]">131</p>
              <p className="text-[14px] text-[#6c757d]">Today's Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[12px]">
            <span className="text-[#6c757d]">This week</span>
            <span className="text-[#dc3545] flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              20%
            </span>
          </div>
        </div>

        {/* Urgent Alerts */}
        <div className="bg-white rounded-xl border border-[#e9ecef] p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#fef3f2] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-[28px] font-bold text-[#212529]">Urgent Alerts</p>
              <p className="text-[14px] text-[#6c757d]">Urgent Alerts</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[12px]">
            <span className="text-[#6c757d]">This week</span>
            <span className="text-[#dc3545] flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              20%
            </span>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-xl border border-[#e9ecef] p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#f3e8ff] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <p className="text-[28px] font-bold text-[#212529]">13</p>
              <p className="text-[14px] text-[#6c757d]">Pending Tasks</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[12px]">
            <span className="text-[#6c757d]">This week</span>
            <span className="text-[#dc3545] flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              20%
            </span>
          </div>
        </div>
      </div>

      {/* Patients Overview Chart */}
      <div className="bg-white rounded-xl border border-[#e9ecef] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[18px] font-semibold text-[#212529]">Patients Overview</h3>
          <button className="flex items-center gap-2 px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] text-[#212529]">
            This Month
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {/* Bar Chart */}
        <div className="flex items-end gap-4 h-48 mt-8">
          {[
            { label: "8-15", value: 17, height: 52 },
            { label: "16-20", value: 45, height: 80 },
            { label: "21-29", value: 85, height: 110 },
            { label: "30-45", value: 135, height: 145 },
            { label: "46-60", value: 35, height: 72 },
            { label: "61-80", value: 10, height: 30 },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <div className="relative flex flex-col items-center">
                <span className="text-[12px] font-medium text-[#212529] mb-1">{item.value}</span>
                <div 
                  className="w-14 bg-[#3b82f6] rounded-t-lg"
                  style={{ height: `${item.height}px` }}
                />
              </div>
              <span className="text-[12px] text-[#6c757d]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white rounded-xl border border-[#e9ecef] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[18px] font-semibold text-[#212529]">Schedule</h3>
            <p className="text-[14px] text-[#6c757d]">Take a look to your schedule for the week</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] text-[#212529]">
            This Month
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Schedule Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Time Headers */}
            <div className="grid grid-cols-[60px_repeat(14,1fr)] gap-1 mb-2">
              <div></div>
              {["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map((time, i) => (
                <div key={i} className="text-[10px] text-[#6c757d] text-center">{time}</div>
              ))}
            </div>

            {/* Days */}
            {scheduleData.map((day, dayIndex) => (
              <div key={dayIndex} className="grid grid-cols-[60px_repeat(14,1fr)] gap-1 mb-2 items-center">
                <div className="text-[12px] text-[#212529] font-medium">
                  {day.day}<br/>
                  <span className="text-[#6c757d] font-normal">({day.dayName})</span>
                </div>
                {Array(14).fill(null).map((_, slotIndex) => {
                  const event = day.events.find(e => {
                    const hour = parseInt(e.time.split(":")[0])
                    return hour === slotIndex + 7
                  })
                  return (
                    <div key={slotIndex} className="h-8 bg-[#f8f9fa] rounded relative">
                      {event && (
                        <div className={`absolute inset-0 ${event.color} rounded px-1 flex items-center justify-center`}>
                          <span className="text-[8px] text-white truncate">{event.label}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Records */}
      <div className="bg-white rounded-xl border border-[#e9ecef]">
        {/* Header */}
        <div className="p-4 border-b border-[#e9ecef]">
          <span className="text-[14px] font-medium text-[#212529]">60 Patients at Ward12A</span>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between p-4 border-b border-[#e9ecef]">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("patients")}
              className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                activeTab === "patients"
                  ? "bg-[#007bff] text-white"
                  : "text-[#6c757d] hover:bg-[#f8f9fa]"
              }`}
            >
              Patients
            </button>
            <button
              onClick={() => setActiveTab("incoming")}
              className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                activeTab === "incoming"
                  ? "bg-[#007bff] text-white"
                  : "text-[#6c757d] hover:bg-[#f8f9fa]"
              }`}
            >
              Incoming Patients
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#e9ecef] rounded-lg text-[14px] text-[#212529] hover:bg-[#f8f9fa] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Advanced Filters
          </button>
        </div>

        {/* Table */}
        <div className="p-6">
          <h4 className="text-[18px] font-semibold text-[#212529] mb-4">Patient Records</h4>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e9ecef]">
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Patient</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">ID</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Age/Gender</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Condition</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Status</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Last Visit</th>
                <th className="text-right py-3 px-4 text-[14px] font-medium text-[#6c757d]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-[#f8f9fa] hover:bg-[#f8f9fa] transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#007bff] flex items-center justify-center text-white text-[14px] font-medium">
                        {patient.initials}
                      </div>
                      <span className="text-[14px] font-medium text-[#212529]">{patient.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{patient.id}</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{patient.age} / {patient.gender}</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{patient.condition}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                      patient.status === "active" ? "bg-[#d1fae5] text-[#059669]" :
                      patient.status === "follow-up" ? "bg-[#fef3c7] text-[#d97706]" :
                      "bg-[#e5e7eb] text-[#6b7280]"
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{patient.lastVisit}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-[#f0f0f0] rounded-lg transition-colors">
                        <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-[#f0f0f0] rounded-lg transition-colors">
                        <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
