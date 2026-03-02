"use client"

import { useState } from "react"

interface StatCardProps {
  icon: React.ReactNode
  iconBg: string
  title: string
  value: string
  trend: string
  trendUp: boolean
}

function StatCard({ icon, iconBg, title, value, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-[#e7e8eb] shadow-sm">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-[12px] text-[#6c757d] mb-1">{title}</p>
          <p className="text-[24px] font-bold text-[#212529]">{value}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[11px] text-[#6c757d]">This week</span>
            <span className={`text-[11px] flex items-center gap-0.5 ${trendUp ? "text-green-500" : "text-red-500"}`}>
              {trendUp ? "↑" : "↓"} {trend}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface AppointmentRequestProps {
  name: string
  date: string
  type: string
}

function AppointmentRequestCard({ name, date, type }: AppointmentRequestProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-[#e7e8eb]">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-[#e9ecef] overflow-hidden flex items-center justify-center">
          <svg className="w-6 h-6 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-[14px] font-semibold text-[#212529]">{name}</h4>
          <p className="text-[12px] text-[#6c757d]">{date}</p>
          <p className="text-[12px] text-[#6c757d]">{type}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button className="flex-1 py-1.5 text-[12px] font-medium text-[#dc3545] border border-[#dc3545] rounded-full hover:bg-red-50 transition-colors">
          Reject
        </button>
        <button className="flex-1 py-1.5 text-[12px] font-medium text-[#007bff] border border-[#007bff] rounded-full hover:bg-blue-50 transition-colors">
          Accept
        </button>
      </div>
    </div>
  )
}

interface ScheduleItemProps {
  type: string
  typeBorderColor: string
  name: string
  dateTime: string
  meetingType: "video" | "in-person"
}

function ScheduleItem({ type, typeBorderColor, name, dateTime, meetingType }: ScheduleItemProps) {
  return (
    <div className={`flex items-center py-3 border-l-2 ${typeBorderColor} pl-3`}>
      <div className="flex items-center gap-2 w-[180px]">
        <div className="w-7 h-7 rounded-md bg-[#f8f9fa] flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
        </div>
        <span className="text-[13px] text-[#212529]">{type}</span>
      </div>
      <div className="flex items-center gap-2 w-[150px]">
        <div className="w-7 h-7 rounded-full bg-[#e9ecef] flex items-center justify-center">
          <svg className="w-4 h-4 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <span className="text-[13px] text-[#212529]">{name}</span>
      </div>
      <span className="text-[13px] text-[#6c757d] w-[180px]">{dateTime}</span>
      <div className="w-7 h-7 rounded-md bg-[#f8f9fa] flex items-center justify-center">
        {meetingType === "video" ? (
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

export function DoctorDashboardContent() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const [monthIndex, setMonthIndex] = useState(2)
  const [year, setYear] = useState(2022)
  const [selectedDate, setSelectedDate] = useState(31)

  const getDaysInMonth = (targetYear: number, targetMonth: number) =>
    new Date(targetYear, targetMonth + 1, 0).getDate()

  const shiftMonth = (delta: number, dayOverride?: number) => {
    let nextMonth = monthIndex + delta
    let nextYear = year

    if (nextMonth < 0) {
      nextMonth = 11
      nextYear -= 1
    }

    if (nextMonth > 11) {
      nextMonth = 0
      nextYear += 1
    }

    const daysInNextMonth = getDaysInMonth(nextYear, nextMonth)
    const nextSelected = Math.min(dayOverride ?? selectedDate, daysInNextMonth)

    setMonthIndex(nextMonth)
    setYear(nextYear)
    setSelectedDate(nextSelected)
  }

  const prevMonth = monthIndex === 0 ? 11 : monthIndex - 1
  const prevMonthYear = monthIndex === 0 ? year - 1 : year
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth)
  const daysInCurrentMonth = getDaysInMonth(year, monthIndex)
  const firstDayIndex = new Date(year, monthIndex, 1).getDay()
  const startOffset = (firstDayIndex + 6) % 7
  const totalCells = 42
  const eventDays = monthIndex === 2 && year === 2022 ? new Set([1, 3, 7, 9, 24]) : new Set<number>()

  const calendarDays = [] as Array<{
    day: number
    monthOffset: -1 | 0 | 1
    isToday: boolean
    hasEvent: boolean
  }>

  for (let i = startOffset; i > 0; i -= 1) {
    const day = daysInPrevMonth - i + 1
    calendarDays.push({
      day,
      monthOffset: -1,
      isToday: false,
      hasEvent: false
    })
  }

  const today = new Date()

  for (let day = 1; day <= daysInCurrentMonth; day += 1) {
    const isToday =
      today.getFullYear() === year && today.getMonth() === monthIndex && today.getDate() === day

    calendarDays.push({
      day,
      monthOffset: 0,
      isToday,
      hasEvent: eventDays.has(day)
    })
  }

  const remainingCells = totalCells - calendarDays.length

  for (let day = 1; day <= remainingCells; day += 1) {
    calendarDays.push({
      day,
      monthOffset: 1,
      isToday: false,
      hasEvent: false
    })
  }

  const monthLabel = `${months[monthIndex]}, ${year}`

  const patientData = [
    { age: "8-15", count: 17 },
    { age: "16-20", count: 45 },
    { age: "21-29", count: 85 },
    { age: "30-45", count: 135 },
    { age: "46-60", count: 35 },
    { age: "61-80", count: 10 }
  ]

  const appointmentRequests = [
    { name: "Uthman ibn Hunaif", date: "6th Feb, 10:00 am - 11:45 am", type: "Individual counselling" },
    { name: "Uthman ibn Hunaif", date: "6th Feb, 10:00 am - 11:45 am", type: "Individual counselling" },
    { name: "Uthman ibn Hunaif", date: "6th Feb, 10:00 am - 11:45 am", type: "Individual counselling" },
    { name: "Uthman ibn Hunaif", date: "6th Feb, 10:00 am - 11:45 am", type: "Individual counselling" }
  ]

  const scheduleItems = [
    { type: "Individual Counselling", name: "Kadin Herwitz", dateTime: "7th Feb, 11:00 am - 7:45 pm.", meetingType: "video" as const, borderColor: "border-l-[#dc3545]" },
    { type: "Couple Counselling", name: "Soysür Fahri", dateTime: "7th Feb, 11:00 am - 7:45 pm.", meetingType: "video" as const, borderColor: "border-l-[#ffc107]" },
    { type: "Teen Counselling", name: "Ender Nardan", dateTime: "7th Feb, 11:00 am - 7:45 pm.", meetingType: "video" as const, borderColor: "border-l-[#007bff]" },
    { type: "Family Counselling", name: "Selvi Yoranel", dateTime: "7th Feb, 11:00 am - 7:45 pm.", meetingType: "in-person" as const, borderColor: "border-l-[#dc3545]" }
  ]

  const maxCount = Math.max(...patientData.map(d => d.count))

  return (
    <div className="w-full max-w-none">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-[#212529]">Welcome DR John Carter,</h1>
        <p className="text-[14px] text-[#6c757d]">I hope you're in a good mood because there are 56 patients waiting for you</p>
      </div>

      <div className="flex gap-6">
        {/* Left Column */}
        <div className="flex-1">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard
              icon={<svg className="w-5 h-5 text-[#007bff]" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>}
              iconBg="bg-blue-100"
              title="Total Counselling"
              value="2.9k"
              trend="20%"
              trendUp={false}
            />
            <StatCard
              icon={<svg className="w-5 h-5 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>}
              iconBg="bg-gray-100"
              title="Overall Booking"
              value="3.2k"
              trend="20%"
              trendUp={false}
            />
            <StatCard
              icon={<svg className="w-5 h-5 text-[#007bff]" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>}
              iconBg="bg-blue-100"
              title="New Appointments"
              value="56"
              trend="20%"
              trendUp={false}
            />
            <StatCard
              icon={<svg className="w-5 h-5 text-[#17a2b8]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>}
              iconBg="bg-cyan-100"
              title="Canceled Appointments"
              value="31"
              trend="20%"
              trendUp={false}
            />
            <StatCard
              icon={<svg className="w-5 h-5 text-[#007bff]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>}
              iconBg="bg-blue-100"
              title="Total Visitors"
              value="144,7k"
              trend="20%"
              trendUp={false}
            />
            <StatCard
              icon={<svg className="w-5 h-5 text-[#28a745]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>}
              iconBg="bg-green-100"
              title="Appointments Today"
              value="19"
              trend="20%"
              trendUp={false}
            />
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl border border-[#e7e8eb] p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold text-[#212529]">Upcoming Appointments</h2>
              <div className="flex items-center gap-2 px-3 py-1.5 border border-[#e7e8eb] rounded-lg text-[12px] text-[#6c757d]">
                This Month
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-[#f8f9fa] rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  className="w-8 h-8 rounded-full border border-[#e7e8eb] flex items-center justify-center bg-white"
                  onClick={() => shiftMonth(-1)}
                  aria-label="Previous month"
                >
                  <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-[14px] font-medium text-[#007bff]">{monthLabel}</span>
                <button
                  className="w-8 h-8 rounded-full border border-[#e7e8eb] flex items-center justify-center bg-white"
                  onClick={() => shiftMonth(1)}
                  aria-label="Next month"
                >
                  <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={day} className={`text-[12px] font-medium ${i >= 5 ? "text-[#007bff]" : "text-[#212529]"}`}>
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((item, index) => {
                  const isOtherMonth = item.monthOffset !== 0
                  const isSelected = !isOtherMonth && selectedDate === item.day

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (item.monthOffset === -1) {
                          shiftMonth(-1, item.day)
                          return
                        }

                        if (item.monthOffset === 1) {
                          shiftMonth(1, item.day)
                          return
                        }

                        setSelectedDate(item.day)
                      }}
                      className={`h-8 text-[12px] rounded-full flex items-center justify-center relative transition-colors ${
                        isOtherMonth
                          ? "text-[#adb5bd]"
                          : item.isToday
                          ? "bg-[#007bff] text-white"
                          : isSelected
                          ? "bg-[#212529] text-white"
                          : "text-[#212529] hover:bg-[#e9ecef]"
                      }`}
                    >
                      {item.day}
                      {item.hasEvent && !item.isToday && !isSelected && !isOtherMonth && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#007bff] rounded-full" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Schedule Lists */}
          <div className="bg-white rounded-xl border border-[#e7e8eb] p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold text-[#212529]">Schedule Lists</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 border border-[#e7e8eb] rounded-lg text-[12px] text-[#6c757d]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[#007bff] text-white rounded-lg text-[12px] font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New
                </button>
              </div>
            </div>

            <div className="flex items-center py-2 text-[12px] font-medium text-[#6c757d] border-b border-[#e7e8eb]">
              <span className="w-[180px] pl-3">Appoint for</span>
              <span className="w-[150px]">Name</span>
              <span className="w-[180px]">Date & Time</span>
              <span>Type</span>
            </div>

            <div className="divide-y divide-[#e7e8eb]">
              {scheduleItems.map((item, index) => (
                <ScheduleItem
                  key={index}
                  type={item.type}
                  typeBorderColor={item.borderColor}
                  name={item.name}
                  dateTime={item.dateTime}
                  meetingType={item.meetingType}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[400px] shrink-0">
          {/* Patients Overview Chart */}
          <div className="bg-white rounded-xl border border-[#e7e8eb] p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-semibold text-[#212529]">Patients Overview</h2>
              <div className="flex items-center gap-2 px-3 py-1.5 border border-[#e7e8eb] rounded-lg text-[12px] text-[#6c757d]">
                This Month
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Y-axis labels and chart */}
            <div className="flex gap-2">
              <div className="flex flex-col justify-between text-[11px] text-[#6c757d] h-[150px] py-1">
                <span>150</span>
                <span>100</span>
                <span>50</span>
                <span>20</span>
                <span>0</span>
              </div>
              <div className="flex-1 flex items-end gap-2 h-[150px]">
                {patientData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white border border-[#e7e8eb] rounded px-1.5 py-0.5 text-[10px] font-medium text-[#212529] shadow-sm">
                        {item.count}
                      </div>
                      <div 
                        className="w-full bg-[#007bff] rounded-t-md"
                        style={{ height: `${(item.count / maxCount) * 120}px` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* X-axis labels */}
            <div className="flex gap-2 mt-2 ml-8">
              {patientData.map((item, index) => (
                <div key={index} className="flex-1 text-center text-[10px] text-[#6c757d]">
                  {item.age}
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Requests */}
          <div className="bg-white rounded-xl border border-[#e7e8eb] p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-semibold text-[#212529]">Appoint Request</h2>
              <button className="text-[12px] text-[#007bff] hover:underline">See All</button>
            </div>

            <div className="space-y-3">
              {appointmentRequests.map((request, index) => (
                <AppointmentRequestCard
                  key={index}
                  name={request.name}
                  date={request.date}
                  type={request.type}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
