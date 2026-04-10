"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface PatientRecord {
  id: string
  name: string
  medicalId: string
  age: number
  gender: string
  bloodType: string
  lastVisit: string
  primaryDoctor: string
  diagnosis: string
  status: "Active" | "Discharged" | "Critical"
}

const patientRecords: PatientRecord[] = [
  { id: "1", name: "Ralph Edwards", medicalId: "MED-2024-001", age: 45, gender: "Male", bloodType: "A+", lastVisit: "Jan 15, 2024", primaryDoctor: "Dr. James Wilson", diagnosis: "Hypertension", status: "Active" },
  { id: "2", name: "Jerome Bell", medicalId: "MED-2024-002", age: 32, gender: "Male", bloodType: "O+", lastVisit: "Jan 14, 2024", primaryDoctor: "Dr. Emily Brown", diagnosis: "Diabetes Type 2", status: "Active" },
  { id: "3", name: "Kathryn Murphy", medicalId: "MED-2024-003", age: 28, gender: "Female", bloodType: "B+", lastVisit: "Jan 13, 2024", primaryDoctor: "Dr. Michael Chen", diagnosis: "Migraine", status: "Discharged" },
  { id: "4", name: "Jacob Jones", medicalId: "MED-2024-004", age: 55, gender: "Male", bloodType: "AB+", lastVisit: "Jan 12, 2024", primaryDoctor: "Dr. Lisa Anderson", diagnosis: "Cardiac Arrhythmia", status: "Critical" },
  { id: "5", name: "Kristin Watson", medicalId: "MED-2024-005", age: 41, gender: "Female", bloodType: "A-", lastVisit: "Jan 11, 2024", primaryDoctor: "Dr. James Wilson", diagnosis: "Gastritis", status: "Active" },
  { id: "6", name: "Cameron Williams", medicalId: "MED-2024-006", age: 38, gender: "Male", bloodType: "O-", lastVisit: "Jan 10, 2024", primaryDoctor: "Dr. Emily Brown", diagnosis: "Pneumonia", status: "Active" },
  { id: "7", name: "Brooklyn Simmons", medicalId: "MED-2024-007", age: 29, gender: "Female", bloodType: "B-", lastVisit: "Jan 9, 2024", primaryDoctor: "Dr. Michael Chen", diagnosis: "Asthma", status: "Discharged" },
]

export function PatientRecords() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  const filteredRecords = patientRecords.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.medicalId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "All" || record.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-[24px] font-semibold text-[#212529]">Patient Records</h1>
        <button className="bg-[#007bff] text-white px-4 py-2 rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Patient
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#6c757d] mb-1">Total Patients</p>
              <p className="text-[28px] font-bold text-[#212529]">1,234</p>
            </div>
            <div className="w-12 h-12 bg-[#e3f2fd] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#6c757d] mb-1">Active Patients</p>
              <p className="text-[28px] font-bold text-[#28a745]">892</p>
            </div>
            <div className="w-12 h-12 bg-[#e8f5e9] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#28a745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#6c757d] mb-1">Critical Cases</p>
              <p className="text-[28px] font-bold text-[#dc3545]">23</p>
            </div>
            <div className="w-12 h-12 bg-[#fce4ec] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#dc3545]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#6c757d] mb-1">Discharged Today</p>
              <p className="text-[28px] font-bold text-[#6c757d]">45</p>
            </div>
            <div className="w-12 h-12 bg-[#f5f5f5] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Records Table */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-[18px] font-medium text-[#212529]">All Patient Records</h2>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
              />
              <svg className="w-4 h-4 text-[#6c757d] absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Discharged">Discharged</option>
              <option value="Critical">Critical</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] hover:bg-[#f8f9fa]">
              <span>Export</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e8eb]">
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Patient</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Medical ID</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Age/Gender</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Blood Type</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Last Visit</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Diagnosis</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Status</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-[#f8f9fa] hover:bg-[#f8f9fa] transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#e9ecef] flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-[#212529]">{record.name}</p>
                        <p className="text-[12px] text-[#6c757d]">{record.primaryDoctor}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#007bff] font-medium">{record.medicalId}</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{record.age} / {record.gender}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-[#fce4ec] text-[#c62828] rounded text-[12px] font-medium">
                      {record.bloodType}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{record.lastVisit}</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{record.diagnosis}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                      record.status === "Active"
                        ? "bg-[#d4edda] text-[#155724]"
                        : record.status === "Critical"
                        ? "bg-[#f8d7da] text-[#721c24]"
                        : "bg-[#e2e3e5] text-[#383d41]"
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/admin/patients/${record.id}`)}
                        className="p-2 hover:bg-[#e9ecef] rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-[#e9ecef] rounded-lg transition-colors">
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

        {/* Pagination */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-6">
          <p className="text-[14px] text-[#6c757d]">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-[14px] text-[#6c757d] hover:text-[#212529] disabled:opacity-50"
            >
              Previous
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center text-[14px] rounded ${
                  currentPage === page
                    ? "bg-[#007bff] text-white"
                    : "text-[#6c757d] hover:bg-[#f8f9fa]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 text-[14px] text-[#6c757d] hover:text-[#212529] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
