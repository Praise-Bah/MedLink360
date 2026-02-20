"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface PatientRecord {
  id: string
  initials: string
  name: string
  patientId: string
  age: number
  gender: string
  condition: string
  status: "active" | "recovering" | "critical" | "discharged" | "follow-up"
  lastVisit: string
  phone: string
  email: string
}

export function PatientRecords() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [activeTab, setActiveTab] = useState<"patients" | "appointments">("patients")

  const handlePatientClick = (patientId: string) => {
    router.push(`/patients/${patientId}`)
  }

  const patientRecords: PatientRecord[] = [
    {
      id: "1",
      initials: "AT",
      name: "Ateeq Rafiq",
      patientId: "PT001",
      age: 28,
      gender: "Male",
      condition: "Hypertension",
      status: "active",
      lastVisit: "1/15/2024",
      phone: "+1 (555) 123-4567",
      email: "ateeq@email.com"
    },
    {
      id: "2",
      initials: "SJ",
      name: "Michael Chen",
      patientId: "PT002",
      age: 45,
      gender: "Male",
      condition: "Diabetes Type 2",
      status: "follow-up",
      lastVisit: "1/15/2024",
      phone: "+1 (555) 234-5678",
      email: "m.chen@email.com"
    },
    {
      id: "3",
      initials: "SJ",
      name: "Emma Wilson",
      patientId: "PT003",
      age: 28,
      gender: "Female",
      condition: "Asthma",
      status: "active",
      lastVisit: "1/15/2024",
      phone: "+1 (555) 345-6789",
      email: "emma@email.com"
    },
    {
      id: "4",
      initials: "SJ",
      name: "James Brown",
      patientId: "PT004",
      age: 52,
      gender: "Male",
      condition: "Arthritis",
      status: "discharged",
      lastVisit: "1/15/2024",
      phone: "+1 (555) 456-7890",
      email: "james@email.com"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#d4edda] text-[#155724]"
      case "recovering":
        return "bg-[#fff3cd] text-[#856404]"
      case "critical":
        return "bg-[#f8d7da] text-[#721c24]"
      case "discharged":
        return "bg-[#d1ecf1] text-[#0c5460]"
      case "follow-up":
        return "bg-[#fff3cd] text-[#856404]"
      default:
        return "bg-[#e9ecef] text-[#495057]"
    }
  }

  return (
    <div className="w-full max-w-none">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[16px] text-[#212529] mb-1">Manage and view all patient records</p>
        <h1 className="text-[30px] font-bold text-[#212529] tracking-[-0.75px]">Patients</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f8f9fa] border border-[#e7e8eb] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-[24px] font-semibold text-[#212529]">56</p>
              <p className="text-[14px] text-[#6c757d]">Total Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f8f9fa] border border-[#e7e8eb] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-[24px] font-semibold text-[#212529]">16</p>
              <p className="text-[14px] text-[#6c757d]">Stable</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f8f9fa] border border-[#e7e8eb] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-[24px] font-semibold text-[#212529]">3</p>
              <p className="text-[14px] text-[#6c757d]">Critical</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f8f9fa] border border-[#e7e8eb] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-[24px] font-semibold text-[#212529]">37</p>
              <p className="text-[14px] text-[#6c757d]">Recovering</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-[16px] font-semibold text-[#212529]">Today's Schedule</h3>
          </div>
          <p className="text-[14px] text-[#6c757d] mb-4">Your appointments for today</p>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#212529]">Morning</span>
              <span className="text-[14px] font-medium text-[#212529]">8 patients</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#212529]">Afternoon</span>
              <span className="text-[14px] font-medium text-[#212529]">12 patients</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#212529]">Evening</span>
              <span className="text-[14px] font-medium text-[#212529]">8 patients</span>
            </div>
          </div>
          <button className="w-full py-2 text-[14px] text-[#007bff] hover:bg-[#f8f9fa] rounded-lg transition-colors">
            View Full Schedule
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-[#28a745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-[16px] font-semibold text-[#212529]">Recent Activity</h3>
          </div>
          <p className="text-[14px] text-[#6c757d] mb-4">Latest patient updates</p>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[#28a745] mt-1.5"></div>
              <div className="flex-1">
                <p className="text-[14px] text-[#212529]">Lab results uploaded</p>
                <p className="text-[12px] text-[#6c757d]">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ffc107] mt-1.5"></div>
              <div className="flex-1">
                <p className="text-[14px] text-[#212529]">Appointment rescheduled</p>
                <p className="text-[12px] text-[#6c757d]">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[#007bff] mt-1.5"></div>
              <div className="flex-1">
                <p className="text-[14px] text-[#212529]">New patient registered</p>
                <p className="text-[12px] text-[#6c757d]">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-[#17a2b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-[16px] font-semibold text-[#212529]">Performance</h3>
          </div>
          <p className="text-[14px] text-[#6c757d] mb-4">This month's metrics</p>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#212529]">Patient Satisfaction</span>
              <span className="text-[14px] font-medium text-[#28a745]">4.8/5.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#212529]">Attendance Rate</span>
              <span className="text-[14px] font-medium text-[#28a745]">94%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#212529]">New Patients</span>
              <span className="text-[14px] font-medium text-[#007bff]">+18%</span>
            </div>
          </div>
          <button className="w-full py-2 text-[14px] text-[#007bff] hover:bg-[#f8f9fa] rounded-lg transition-colors">
            View Analytics
          </button>
        </div>
      </div>

      {/* Patient Records Table */}
      <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-semibold text-[#212529]">Patient Records</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
              />
              <svg className="w-5 h-5 text-[#6c757d] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#6c757d] hover:bg-[#f8f9fa] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {statusFilter}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e8eb]">
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Patient</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">ID</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Age/Gender</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Condition</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Status</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Last Visit</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patientRecords.map((patient) => (
                <tr 
                  key={patient.id} 
                  onClick={() => handlePatientClick(patient.patientId)}
                  className="border-b border-[#e7e8eb] hover:bg-[#f8f9fa] transition-colors cursor-pointer"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#e3f2fd] flex items-center justify-center text-[14px] font-medium text-[#007bff]">
                        {patient.initials}
                      </div>
                      <span className="text-[14px] text-[#212529]">{patient.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{patient.patientId}</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{patient.age} / {patient.gender}</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{patient.condition}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{patient.lastVisit}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => handlePatientClick(patient.patientId)}
                        className="p-2 hover:bg-[#e9ecef] rounded-lg transition-colors" 
                        title="View"
                      >
                        <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-[#e9ecef] rounded-lg transition-colors" title="Edit">
                        <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-[#e9ecef] rounded-lg transition-colors" title="More">
                        <svg className="w-4 h-4 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[#e7e8eb]">
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
            onClick={() => setActiveTab("appointments")}
            className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
              activeTab === "appointments" 
                ? "bg-[#007bff] text-white" 
                : "text-[#6c757d] hover:bg-[#f8f9fa]"
            }`}
          >
            Appointments
          </button>
          <button className="ml-auto flex items-center gap-2 px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#6c757d] hover:bg-[#f8f9fa] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Advanced Filters
          </button>
        </div>

        {/* Appointments Tab Content */}
        {activeTab === "appointments" && (
          <div className="mt-6">
            <h3 className="text-[18px] font-semibold text-[#212529] mb-4">Today's Appointments</h3>
            <div className="space-y-4">
              {/* Appointment Card 1 */}
              <div className="border border-[#e7e8eb] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-[16px] font-semibold text-[#212529]">Sarah Johnson</h4>
                    <p className="text-[14px] text-[#6c757d]">PT001</p>
                    <div className="flex items-center gap-4 mt-2 text-[14px] text-[#6c757d]">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        10:30 AM
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        General Check-up
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Dr. Smith
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border border-[#e7e8eb] text-[#6c757d] rounded-lg text-[14px] hover:bg-[#f8f9fa] transition-colors">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 border border-[#e7e8eb] text-[#6c757d] rounded-lg text-[14px] hover:bg-[#f8f9fa] transition-colors">
                      View Details
                    </button>
                    <span className="px-3 py-1 bg-[#d4edda] text-[#155724] rounded-full text-[12px] font-medium">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>

              {/* Appointment Card 2 */}
              <div className="border border-[#e7e8eb] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-[16px] font-semibold text-[#212529]">Michael Chen</h4>
                    <p className="text-[14px] text-[#6c757d]">PT002</p>
                    <div className="flex items-center gap-4 mt-2 text-[14px] text-[#6c757d]">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        10:30 AM
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        General Check-up
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Dr. Smith
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border border-[#e7e8eb] text-[#6c757d] rounded-lg text-[14px] hover:bg-[#f8f9fa] transition-colors">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 border border-[#e7e8eb] text-[#6c757d] rounded-lg text-[14px] hover:bg-[#f8f9fa] transition-colors">
                      View Details
                    </button>
                    <span className="px-3 py-1 bg-[#fff3cd] text-[#856404] rounded-full text-[12px] font-medium">
                      Pending
                    </span>
                  </div>
                </div>
              </div>

              {/* Appointment Card 3 */}
              <div className="border border-[#e7e8eb] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-[16px] font-semibold text-[#212529]">Ateeq Rafiq</h4>
                    <p className="text-[14px] text-[#6c757d]">PT003</p>
                    <div className="flex items-center gap-4 mt-2 text-[14px] text-[#6c757d]">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        11:00 AM
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        General Check-up
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Dr. Smith
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border border-[#e7e8eb] text-[#6c757d] rounded-lg text-[14px] hover:bg-[#f8f9fa] transition-colors">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 border border-[#e7e8eb] text-[#6c757d] rounded-lg text-[14px] hover:bg-[#f8f9fa] transition-colors">
                      View Details
                    </button>
                    <span className="px-3 py-1 bg-[#d4edda] text-[#155724] rounded-full text-[12px] font-medium">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
