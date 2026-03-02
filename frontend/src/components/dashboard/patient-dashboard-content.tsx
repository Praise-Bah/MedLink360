"use client"

import Link from "next/link"

export function PatientDashboardContent() {
  return (
    <div className="flex gap-6">
      {/* Main Content - Left Side */}
      <div className="flex-1 space-y-5">
        {/* Emergency Information Banner */}
        <div className="bg-[#fef3e6] border border-[#f5d9b8] rounded-xl p-4">
          <p className="text-[#212529] font-semibold text-[16px] mb-1">Emergency Information</p>
          <p className="text-[#d97706] text-[14px]">Health advisory: Seasonal flu vaccination campaign is ongoing. Visit your nearest clinic.</p>
        </div>

        {/* Welcome Section */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[24px] font-semibold text-[#212529] mb-2">Welcome John Carter,</h1>
            <p className="text-[16px] font-medium text-[#212529]">You have an appointment tomorrow with Dr Tina Murphay</p>
          </div>
          <Link
            href="/appointments"
            className="px-6 py-3 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
          >
            Book Appointment
          </Link>
        </div>

        {/* Health Metrics - First Row */}
        <div className="grid grid-cols-3 gap-5">
          <HealthMetricCard
            title="Blood Sugar"
            value="80"
            unit="mg / dL"
            status="Normal"
            bgColor="bg-[#f8debd]"
            statusBg="bg-[#f8debd]"
            icon="glucose"
          />
          <HealthMetricCard
            title="Heart Rate"
            value="98"
            unit="bpm"
            status="Normal"
            bgColor="bg-[#fbf0f3]"
            statusBg="bg-[#fbf0f3]"
            icon="heart"
          />
          <HealthMetricCard
            title="Blood Pressure"
            value="102"
            subValue=" / 72"
            unit="mmhg"
            status="Normal"
            bgColor="bg-[#d4e9ff]"
            statusBg="bg-[#d4e9ff]"
            icon="pressure"
          />
        </div>

        {/* Health Metrics - Second Row */}
        <div className="grid grid-cols-2 gap-5">
          <HealthMetricCard
            title="Body Temperature"
            value="99"
            unit="°F"
            status="Normal"
            bgColor="bg-[#ffd4d4]"
            statusBg="bg-[#ffd4d4]"
            icon="temperature"
          />
          <HealthMetricCard
            title="Respiratory Rate"
            value="15"
            unit="rpm"
            status="Normal"
            bgColor="bg-[#ead4ff]"
            statusBg="bg-[#ead4ff]"
            icon="respiratory"
          />
        </div>

        {/* Allergies and Chronic Conditions */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-[24px] font-semibold text-[#212529] mb-4">Allergies</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-6 py-2.5 bg-[#ffd4e5] text-[#212529] rounded-lg text-[14px] font-medium">
                Penicillin
              </span>
              <span className="px-6 py-2.5 bg-[#ffd4e5] text-[#212529] rounded-lg text-[14px] font-medium">
                Peanuts
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-[24px] font-semibold text-[#212529] mb-4">Chronic Conditions</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-6 py-2.5 bg-[#d4e9ff] text-[#212529] rounded-lg text-[14px] font-medium">
                Hypertension
              </span>
            </div>
          </div>
        </div>

        {/* Blood Pressure History Chart */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-[16px] font-semibold text-[#242731]">Blood Pressure History</h3>
            <svg className="w-4 h-4 text-[#575f6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="bg-white rounded-xl border border-[#e2e4e5] p-6">
            <div className="h-48 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[11px] text-[#9ca3af] pr-2">
                <span>1000</span>
                <span>500</span>
                <span>0</span>
              </div>
              {/* Chart area */}
              <div className="ml-10 h-full flex items-end justify-around">
                <BloodPressureBar value={60} />
                <BloodPressureBar value={45} />
                <BloodPressureBar value={70} />
                <BloodPressureBar value={55} />
                <BloodPressureBar value={40} />
                <BloodPressureBar value={65} />
              </div>
              {/* X-axis labels */}
              <div className="ml-10 flex justify-around text-[11px] text-[#9ca3af] mt-2">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Mental Health Chart */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-[16px] font-semibold text-[#242731]">Overall Mental Health</h3>
            <svg className="w-4 h-4 text-[#575f6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="bg-white rounded-xl border border-[#e2e4e5] p-6">
            <div className="h-48 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[11px] text-[#9ca3af] pr-2">
                <span>100</span>
                <span>90</span>
                <span>80</span>
                <span>70</span>
                <span>60</span>
                <span>50</span>
              </div>
              {/* Line chart visualization */}
              <div className="ml-10 h-full relative">
                <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                  {/* Mood line - Blue */}
                  <polyline
                    fill="none"
                    stroke="#007bff"
                    strokeWidth="2"
                    points="0,120 80,100 160,80 240,60 320,40 400,30"
                  />
                  {/* Sleep Quality line - Green */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    points="0,130 80,110 160,90 240,70 320,50 400,45"
                  />
                  {/* Sugar Level line - Orange */}
                  <polyline
                    fill="none"
                    stroke="#ff9f43"
                    strokeWidth="2"
                    points="0,140 80,120 160,100 240,80 320,60 400,55"
                  />
                  {/* Heart Rate line - Red */}
                  <polyline
                    fill="none"
                    stroke="#ff6b6b"
                    strokeWidth="2"
                    points="0,145 80,125 160,105 240,85 320,70 400,65"
                  />
                </svg>
                {/* Data point labels */}
                <div className="absolute right-0 top-0 text-[11px] space-y-1">
                  <div className="text-[#007bff]">123.2</div>
                  <div className="text-[#10b981]">125.2</div>
                  <div className="text-[#ff9f43]">110.8</div>
                </div>
              </div>
              {/* X-axis labels */}
              <div className="ml-10 flex justify-around text-[11px] text-[#9ca3af] mt-4">
                <span>MOOD</span>
                <span>SLEEP QUALITY</span>
                <span>SUGAR LEVEL</span>
                <span>HEART RATE</span>
              </div>
            </div>
            {/* Legend */}
            <div className="flex gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#007bff]"></div>
                <span className="text-[11px] text-[#575f6e]">Mood</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
                <span className="text-[11px] text-[#575f6e]">Sleep Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff9f43]"></div>
                <span className="text-[11px] text-[#575f6e]">Sugar Level</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff6b6b]"></div>
                <span className="text-[11px] text-[#575f6e]">Heart Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-[#e2e4e5] rounded-lg text-[13px] text-[#575f6e] flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Light
          </button>
          <button className="px-4 py-2 bg-[#242731] rounded-lg text-[13px] text-white flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            Dark
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-[#e2e4e5] p-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full overflow-hidden mb-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                alt="John Carter"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-[16px] font-bold text-[#242731]">John Carter</h3>
            <p className="text-[13px] text-[#575f6e] mb-4">30 Years</p>
            
            <div className="flex justify-center gap-6 text-center">
              <div>
                <p className="text-[12px] text-[#575f6e]">Blood</p>
                <p className="text-[14px] font-semibold text-[#007bff]">AB+</p>
              </div>
              <div>
                <p className="text-[12px] text-[#575f6e]">Height</p>
                <p className="text-[14px] font-semibold text-[#007bff]">160cm</p>
              </div>
              <div>
                <p className="text-[12px] text-[#575f6e]">Weight</p>
                <p className="text-[14px] font-semibold text-[#007bff]">54kg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Plans */}
        <div className="bg-white rounded-xl border border-[#e2e4e5] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#007bff]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <h3 className="text-[14px] font-semibold text-[#242731]">Health Plans</h3>
            </div>
            <svg className="w-4 h-4 text-[#575f6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <ul className="text-[12px] text-[#575f6e] space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#007bff]">•</span>
              Drink 8 Litr of water daily
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#007bff]">•</span>
              Do 30 minutes exercise after dinner
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#007bff]">•</span>
              Make sure you do 10 pushups when doing your workout
            </li>
          </ul>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl border border-[#e2e4e5] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold text-[#242731]">Upcoming Appointments</h3>
            <svg className="w-4 h-4 text-[#575f6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>

          {/* Mini Calendar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-medium text-[#242731]">March, 2022</span>
              <div className="flex gap-1">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4 text-[#575f6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4 text-[#575f6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
              <div className="text-[#575f6e] font-medium py-1">Mon</div>
              <div className="text-[#575f6e] font-medium py-1">Tue</div>
              <div className="text-[#575f6e] font-medium py-1">Wed</div>
              <div className="text-[#575f6e] font-medium py-1">Thu</div>
              <div className="text-[#575f6e] font-medium py-1">Fri</div>
              <div className="text-[#ff6b6b] font-medium py-1">Sat</div>
              <div className="text-[#ff6b6b] font-medium py-1">Sun</div>
              
              {/* Calendar days */}
              {[...Array(35)].map((_, i) => {
                const day = i - 0
                const isSelected = day === 29
                const hasAppointment = day === 28 || day === 29 || day === 30
                const isWeekend = (i + 1) % 7 === 6 || (i + 1) % 7 === 0
                return (
                  <div
                    key={i}
                    className={`py-1.5 rounded-full text-[11px] ${
                      isSelected
                        ? "bg-[#007bff] text-white font-semibold"
                        : hasAppointment
                        ? "text-[#007bff] font-medium"
                        : day >= 1 && day <= 31
                        ? isWeekend ? "text-[#ff6b6b]" : "text-[#242731]"
                        : "text-[#d1d5db]"
                    }`}
                  >
                    {day >= 1 && day <= 31 ? day : ""}
                  </div>
                )
              })}
            </div>
            {/* Appointment indicators */}
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#007bff]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff9f43]"></div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-xl border border-[#e2e4e5] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-[14px] font-semibold text-[#242731]">Appointments</h3>
            </div>
            <svg className="w-4 h-4 text-[#575f6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>

          <div className="space-y-3">
            <AppointmentCard
              title="Full Body Check-up"
              doctor="Doctor Dhakal"
              time="10:00 AM"
              date="Mon 20-4-2024"
              avatarColor="bg-[#007bff]"
            />
            <AppointmentCard
              title="Heart Surgery"
              doctor="Doctor Dhakal"
              time="10:00 AM"
              date="Mon 20-4-2024"
              avatarColor="bg-[#10b981]"
            />
            <AppointmentCard
              title="Skin Therapy Consultation"
              doctor="Dr. Michael"
              time="10:00 AM"
              date="Mon 20-4-2024"
              avatarColor="bg-[#ff9f43]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function HealthMetricCard({
  title,
  value,
  subValue,
  unit,
  status,
  bgColor,
  statusBg,
  icon,
}: {
  title: string
  value: string
  subValue?: string
  unit: string
  status: string
  bgColor: string
  statusBg: string
  icon: string
}) {
  const getIcon = () => {
    switch (icon) {
      case "glucose":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#212529" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        )
      case "heart":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#212529">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        )
      case "pressure":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#212529" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        )
      case "temperature":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#212529" strokeWidth="2">
            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
          </svg>
        )
      case "respiratory":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#212529" strokeWidth="2">
            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/>
            <path d="M12 2v7m0 4v9"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[#e8e7e7] shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[16px] font-semibold text-[#212529]">{title}</span>
        <div className={`h-14 w-14 ${bgColor} rounded-xl flex items-center justify-center`}>
          {getIcon()}
        </div>
      </div>

      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-[32px] font-normal text-[#272927]">{value}</span>
        {subValue && (
          <span className="text-[16px] font-bold text-[#818181]">{subValue}</span>
        )}
        <span className="text-[16px] font-bold text-[#818181] ml-1">{unit}</span>
      </div>

      <span className={`inline-block px-2 py-1 ${statusBg} text-[#212529] rounded text-[12px] font-semibold mb-4`}>
        {status}
      </span>

      {/* Wave chart placeholder */}
      <div className="h-20 mt-2">
        <svg className="w-full h-full" viewBox="0 0 173 83" preserveAspectRatio="none">
          <path
            d="M0,50 Q20,30 40,45 T80,40 T120,50 T160,45 L173,48"
            fill="none"
            stroke={bgColor === "bg-[#f8debd]" ? "#f8debd" : bgColor === "bg-[#fbf0f3]" ? "#fbf0f3" : bgColor === "bg-[#d4e9ff]" ? "#d4e9ff" : bgColor === "bg-[#ffd4d4]" ? "#ffd4d4" : "#ead4ff"}
            strokeWidth="2"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  )
}

function BloodPressureBar({ value }: { value: number }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1">
      <div 
        className="w-full bg-gradient-to-t from-[#007bff] to-[#60a5fa] rounded-t-sm"
        style={{ height: `${value}%` }}
      />
    </div>
  )
}

function AppointmentCard({
  title,
  doctor,
  time,
  date,
  avatarColor,
}: {
  title: string
  doctor: string
  time: string
  date: string
  avatarColor: string
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#f8fafc] rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 ${avatarColor} rounded-full flex items-center justify-center`}>
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#242731]">{title}</p>
          <p className="text-[11px] text-[#575f6e]">{doctor}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[11px] font-medium text-[#242731]">{time}</p>
        <p className="text-[11px] text-[#575f6e]">{date}</p>
      </div>
      <div className="flex gap-1">
        <button className="h-7 w-7 rounded bg-[#ffebeb] hover:bg-[#ffd4d4] flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-[#ff6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button className="h-7 w-7 rounded bg-[#d4f5e0] hover:bg-[#b8ecc9] flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
