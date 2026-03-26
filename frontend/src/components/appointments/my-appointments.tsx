"use client"

import { useState } from "react"

interface AppointmentItem {
  id: string
  type: string
  typeBorderColor: string
  typeIcon: React.ReactNode
  patientName: string
  patientAvatar: string
  dateTime: string
  meetingType: "video" | "in-person"
}

interface CalendarEvent {
  id: string
  title: string
  time: string
  duration: number // in hours
  day: number // day of week (0-6)
  startHour: number
  type: "appointment" | "personal" | "other"
  color: string
}

function AppointmentRow({ appointment }: { appointment: AppointmentItem }) {
  return (
    <div className={`flex items-center py-3 border-l-2 ${appointment.typeBorderColor} pl-3 border-b border-[#f8f9fa] hover:bg-[#f8f9fa] transition-colors`}>
      <div className="flex items-center gap-2 w-[180px]">
        <div className="w-7 h-7 rounded-md bg-[#f8f9fa] flex items-center justify-center">
          {appointment.typeIcon}
        </div>
        <span className="text-[14px] text-[#212529]">{appointment.type}</span>
      </div>
      <div className="flex items-center gap-2 w-[180px]">
        <div className="w-7 h-7 rounded-full bg-[#e9ecef] overflow-hidden flex items-center justify-center">
          <svg className="w-4 h-4 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <span className="text-[14px] text-[#212529]">{appointment.patientName}</span>
      </div>
      <span className="text-[14px] text-[#6c757d] w-[200px]">{appointment.dateTime}</span>
      <div className="w-7 h-7 rounded-md bg-[#f8f9fa] flex items-center justify-center">
        {appointment.meetingType === "video" ? (
          <svg className="w-4 h-4 text-[#007bff]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
        ) : (
          <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>
      <button className="ml-auto p-1">
        <svg className="w-5 h-5 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      </button>
    </div>
  )
}

function CalendarEventBlock({ event }: { event: CalendarEvent }) {
  const height = event.duration * 40 // 40px per hour
  const top = (event.startHour - 8) * 40 // Start at 8 AM

  return (
    <div 
      className={`absolute ${event.color} rounded-md p-2 text-white text-[10px] font-medium shadow-sm cursor-pointer hover:opacity-90 transition-opacity`}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        width: '90%',
        left: '5%'
      }}
    >
      <div className="truncate">{event.title}</div>
      <div className="text-[9px] opacity-80">{event.time}</div>
    </div>
  )
}

export function MyAppointments() {
  const [selectedMonth, setSelectedMonth] = useState("This Month")

  const appointmentsList: AppointmentItem[] = [
    {
      id: "1",
      type: "Individual Counselling",
      typeBorderColor: "border-l-[#dc3545]",
      typeIcon: <svg className="w-3.5 h-3.5 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>,
      patientName: "Kadin Herwitz",
      patientAvatar: "/avatar1.png",
      dateTime: "7th Feb, 11:00 am - 7:45 pm.",
      meetingType: "video"
    },
    {
      id: "2",
      type: "Couple Counselling",
      typeBorderColor: "border-l-[#ffc107]",
      typeIcon: <svg className="w-3.5 h-3.5 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2c0 1.11-.89 2-2 2s-2-.89-2-2zM4 4c0-1.11.89-2 2-2s2 .89 2 2c0 1.11-.89 2-2 2S4 5.11 4 4zm5.5 3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM.5 17.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5S2.83 16 2 16s-1.5.67-1.5 1.5z"/></svg>,
      patientName: "Soysür Fahri",
      patientAvatar: "/avatar2.png",
      dateTime: "7th Feb, 11:00 am - 7:45 pm.",
      meetingType: "video"
    },
    {
      id: "3",
      type: "Individual Counselling",
      typeBorderColor: "border-l-[#dc3545]",
      typeIcon: <svg className="w-3.5 h-3.5 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>,
      patientName: "Kadin Herwitz",
      patientAvatar: "/avatar3.png",
      dateTime: "7th Feb, 11:00 am - 7:45 pm.",
      meetingType: "video"
    },
    {
      id: "4",
      type: "Couple Counselling",
      typeBorderColor: "border-l-[#ffc107]",
      typeIcon: <svg className="w-3.5 h-3.5 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2c0 1.11-.89 2-2 2s-2-.89-2-2zM4 4c0-1.11.89-2 2-2s2 .89 2 2c0 1.11-.89 2-2 2S4 5.11 4 4zm5.5 3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM.5 17.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5S2.83 16 2 16s-1.5.67-1.5 1.5z"/></svg>,
      patientName: "Soysür Fahri",
      patientAvatar: "/avatar4.png",
      dateTime: "7th Feb, 11:00 am - 7:45 pm.",
      meetingType: "video"
    }
  ]

  const calendarEvents: CalendarEvent[] = [
    { id: "1", title: "Dinner! 🍽", time: "Everyone", duration: 1, day: 2, startHour: 18, type: "personal", color: "bg-[#28a745]" },
    { id: "2", title: "Brain Surgery", time: "", duration: 2, day: 3, startHour: 14, type: "appointment", color: "bg-[#dc3545]" },
    { id: "3", title: "Check-out 🏨", time: "", duration: 1, day: 4, startHour: 16, type: "other", color: "bg-[#007bff]" },
    { id: "4", title: "Check-in 🏨", time: "", duration: 1, day: 1, startHour: 10, type: "other", color: "bg-[#ffc107]" },
    { id: "5", title: "Education", time: "", duration: 1.5, day: 0, startHour: 13, type: "appointment", color: "bg-[#17a2b8]" },
    { id: "6", title: "Education", time: "", duration: 2, day: 4, startHour: 9, type: "appointment", color: "bg-[#6f42c1]" }
  ]

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM

  return (
    <div className="w-full max-w-none">
      <div className="flex gap-6">
        {/* Left Column - Schedule Lists */}
        <div className="flex-1">
          {/* Schedule Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-[20px] font-bold text-[#212529]">Schedule</h2>
                <p className="text-[14px] text-[#6c757d]">Take a look to your schedule for the week</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#6c757d] bg-white">
                This Month
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Schedule Lists Section */}
          <div className="bg-white rounded-xl border border-[#e7e8eb] p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-semibold text-[#212529]">Schedule Lists</h3>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#6c757d] hover:bg-[#f8f9fa] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New
                </button>
              </div>
            </div>

            {/* Table Header */}
            <div className="flex items-center py-3 text-[14px] font-semibold text-[#6c757d] border-b border-[#e7e8eb] mb-2">
              <span className="w-[180px] pl-12">Appoint for</span>
              <span className="w-[180px]">Name</span>
              <span className="w-[200px]">Date & Time</span>
              <span>Type</span>
            </div>

            {/* Appointments List */}
            <div className="space-y-1">
              {appointmentsList.map((appointment) => (
                <AppointmentRow key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </div>

          {/* Weekly Calendar */}
          <div className="bg-white rounded-xl border border-[#e7e8eb] p-4 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-semibold text-[#212529]">Weekly Calendar</h3>
              <div className="flex items-center gap-2 px-3 py-1.5 border border-[#e7e8eb] rounded-lg text-[12px] text-[#6c757d]">
                This Month
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="relative">
              {/* Day Headers */}
              <div className="grid grid-cols-8 gap-0 mb-2">
                <div className="w-12"></div> {/* Empty space for time column */}
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-[12px] font-medium text-[#212529] py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Time Grid */}
              <div className="grid grid-cols-8 gap-0 border border-[#f1f3f4] rounded-lg overflow-hidden">
                {hours.map((hour, hourIndex) => (
                  <div key={hourIndex} className="contents">
                    {/* Time Label */}
                    <div className="w-12 h-10 flex items-center justify-center text-[10px] text-[#6c757d] border-r border-[#f1f3f4] bg-[#f8f9fa]">
                      {hour}:00
                    </div>
                    {/* Day Cells */}
                    {weekDays.map((_, dayIndex) => (
                      <div 
                        key={`${hour}-${dayIndex}`} 
                        className="relative h-10 border-r border-b border-[#f1f3f4] hover:bg-[#f8f9fa] transition-colors"
                      >
                        {/* Calendar Events */}
                        {calendarEvents
                          .filter(event => event.day === dayIndex && event.startHour === hour)
                          .map(event => (
                            <CalendarEventBlock key={event.id} event={event} />
                          ))
                        }
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
