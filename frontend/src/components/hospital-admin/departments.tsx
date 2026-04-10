"use client"

import { useState } from "react"

interface Department {
  id: string
  name: string
  head: string
  totalStaff: number
  doctors: number
  nurses: number
  patients: number
  appointmentsToday: number
  status: "Active" | "Inactive"
  floor: string
  phone: string
}

const departments: Department[] = [
  { id: "1", name: "Cardiology", head: "Dr. James Wilson", totalStaff: 15, doctors: 5, nurses: 8, patients: 234, appointmentsToday: 28, status: "Active", floor: "3rd Floor", phone: "+1 234-567-8901" },
  { id: "2", name: "General Medicine", head: "Dr. Emily Brown", totalStaff: 22, doctors: 8, nurses: 12, patients: 456, appointmentsToday: 45, status: "Active", floor: "1st Floor", phone: "+1 234-567-8902" },
  { id: "3", name: "Neurology", head: "Dr. Michael Chen", totalStaff: 12, doctors: 4, nurses: 6, patients: 178, appointmentsToday: 18, status: "Active", floor: "4th Floor", phone: "+1 234-567-8903" },
  { id: "4", name: "Pediatrics", head: "Dr. Lisa Anderson", totalStaff: 18, doctors: 6, nurses: 10, patients: 312, appointmentsToday: 32, status: "Active", floor: "2nd Floor", phone: "+1 234-567-8904" },
  { id: "5", name: "Orthopedics", head: "Dr. Robert Taylor", totalStaff: 14, doctors: 5, nurses: 7, patients: 198, appointmentsToday: 22, status: "Active", floor: "3rd Floor", phone: "+1 234-567-8905" },
  { id: "6", name: "Emergency", head: "Dr. Sarah Davis", totalStaff: 25, doctors: 8, nurses: 15, patients: 89, appointmentsToday: 56, status: "Active", floor: "Ground Floor", phone: "+1 234-567-8906" },
  { id: "7", name: "Radiology", head: "Dr. Kevin White", totalStaff: 10, doctors: 3, nurses: 5, patients: 145, appointmentsToday: 38, status: "Active", floor: "Basement", phone: "+1 234-567-8907" },
  { id: "8", name: "Ophthalmology", head: "Dr. Jennifer Lee", totalStaff: 8, doctors: 3, nurses: 4, patients: 167, appointmentsToday: 15, status: "Inactive", floor: "2nd Floor", phone: "+1 234-567-8908" },
]

export function Departments() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalStaff = departments.reduce((acc, dept) => acc + dept.totalStaff, 0)
  const totalDoctors = departments.reduce((acc, dept) => acc + dept.doctors, 0)
  const totalNurses = departments.reduce((acc, dept) => acc + dept.nurses, 0)
  const totalPatients = departments.reduce((acc, dept) => acc + dept.patients, 0)

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-semibold text-[#212529]">Departments</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#007bff] text-white px-4 py-2 rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Department
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#6c757d] mb-1">Total Departments</p>
              <p className="text-[28px] font-bold text-[#212529]">{departments.length}</p>
            </div>
            <div className="w-12 h-12 bg-[#e3f2fd] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#6c757d] mb-1">Total Staff</p>
              <p className="text-[28px] font-bold text-[#28a745]">{totalStaff}</p>
            </div>
            <div className="w-12 h-12 bg-[#e8f5e9] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#28a745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#6c757d] mb-1">Total Doctors</p>
              <p className="text-[28px] font-bold text-[#007bff]">{totalDoctors}</p>
            </div>
            <div className="w-12 h-12 bg-[#e3f2fd] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#6c757d] mb-1">Total Patients</p>
              <p className="text-[28px] font-bold text-[#ff9800]">{totalPatients}</p>
            </div>
            <div className="w-12 h-12 bg-[#fff3e0] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#ff9800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-medium text-[#212529]">All Departments</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff] w-64"
            />
            <svg className="w-4 h-4 text-[#6c757d] absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {filteredDepartments.map((dept) => (
            <div
              key={dept.id}
              className="border border-[#e7e8eb] rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[18px] font-semibold text-[#212529]">{dept.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      dept.status === "Active" ? "bg-[#d4edda] text-[#155724]" : "bg-[#f8d7da] text-[#721c24]"
                    }`}>
                      {dept.status}
                    </span>
                  </div>
                  <p className="text-[14px] text-[#6c757d]">{dept.head}</p>
                </div>
                <button className="p-2 hover:bg-[#f8f9fa] rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="6" r="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="12" cy="18" r="2"/>
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-[20px] font-bold text-[#212529]">{dept.totalStaff}</p>
                  <p className="text-[12px] text-[#6c757d]">Staff</p>
                </div>
                <div className="text-center">
                  <p className="text-[20px] font-bold text-[#007bff]">{dept.doctors}</p>
                  <p className="text-[12px] text-[#6c757d]">Doctors</p>
                </div>
                <div className="text-center">
                  <p className="text-[20px] font-bold text-[#28a745]">{dept.nurses}</p>
                  <p className="text-[12px] text-[#6c757d]">Nurses</p>
                </div>
                <div className="text-center">
                  <p className="text-[20px] font-bold text-[#ff9800]">{dept.patients}</p>
                  <p className="text-[12px] text-[#6c757d]">Patients</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#e7e8eb]">
                <div className="flex items-center gap-4 text-[13px] text-[#6c757d]">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                    </svg>
                    {dept.floor}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {dept.phone}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[13px]">
                  <span className="text-[#6c757d]">Today:</span>
                  <span className="font-semibold text-[#007bff]">{dept.appointmentsToday} appointments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
