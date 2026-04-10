"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Patient {
  id: string
  name: string
  medicalId: string
  registrationDate: string
  department: string
  visits: number
  status: "Active" | "Inactive"
}

const patients: Patient[] = [
  { id: "1", name: "Ralph Edwards", medicalId: "mdl0129", registrationDate: "January 6, 2024", department: "Cardiology", visits: 111, status: "Active" },
  { id: "2", name: "Jerome Bell", medicalId: "mdl0130", registrationDate: "January 6, 2024", department: "General Medicine", visits: 567, status: "Active" },
  { id: "3", name: "Kathryn Murphy", medicalId: "mdl0131", registrationDate: "January 11, 2024", department: "Cardiology", visits: 908, status: "Active" },
  { id: "4", name: "Jacob Jones", medicalId: "mdl0132", registrationDate: "January 9, 2024", department: "Gastroenterology", visits: 608, status: "Active" },
  { id: "5", name: "Kristin Watson", medicalId: "mdl0133", registrationDate: "January 9, 2024", department: "Gastroenterology", visits: 370, status: "Inactive" },
  { id: "6", name: "Cody Fisher", medicalId: "mdl0134", registrationDate: "January 12, 2024", department: "Neurology", visits: 245, status: "Active" },
  { id: "7", name: "Savannah Nguyen", medicalId: "mdl0135", registrationDate: "January 15, 2024", department: "Pediatrics", visits: 189, status: "Active" },
]

export function AdminDashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.medicalId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage)
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#e3f2fd] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <p className="text-[32px] font-bold text-[#212529]">1,234</p>
          <p className="text-[14px] text-[#6c757d]">Total Patients</p>
        </div>

        <div className="bg-white rounded-lg border border-[#e7e8eb] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#e8f5e9] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#28a745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <p className="text-[32px] font-bold text-[#212529]">89</p>
          <p className="text-[14px] text-[#6c757d]">Medical Staff</p>
        </div>

        <div className="bg-white rounded-lg border border-[#e7e8eb] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#fff3e0] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#ff9800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="text-[32px] font-bold text-[#212529]">156</p>
          <p className="text-[14px] text-[#6c757d]">Appointments Today</p>
        </div>

        <div className="bg-white rounded-lg border border-[#e7e8eb] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#fce4ec] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#e91e63]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <p className="text-[32px] font-bold text-[#212529]">12</p>
          <p className="text-[14px] text-[#6c757d]">Departments</p>
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-[20px] font-semibold text-[#212529]">Patient List</h2>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
              />
              <svg className="w-4 h-4 text-[#6c757d] absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] hover:bg-[#f8f9fa]">
              <span>Sort by</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] hover:bg-[#f8f9fa]">
              <span>Export</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] hover:bg-[#f8f9fa]">
              <span>Filter</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e8eb]">
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Patient Name</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Medical ID</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Registration Date</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Department</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Visits</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-[#f8f9fa] hover:bg-[#f8f9fa] transition-colors cursor-pointer"
                  onClick={() => router.push(`/admin/patients/${patient.id}`)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#e9ecef] flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-[14px] font-medium text-[#212529]">{patient.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{patient.medicalId}</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{patient.registrationDate}</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{patient.department}</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{patient.visits}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                      patient.status === "Active"
                        ? "bg-[#d4edda] text-[#155724]"
                        : "bg-[#f8d7da] text-[#721c24]"
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center text-[14px] text-[#6c757d] hover:bg-[#f8f9fa] rounded disabled:opacity-50"
          >
            &lt;
          </button>
          {[1, 2, 3, 4].map((page) => (
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
          <span className="text-[14px] text-[#6c757d]">...</span>
          <button
            onClick={() => setCurrentPage(40)}
            className="w-8 h-8 flex items-center justify-center text-[14px] text-[#6c757d] hover:bg-[#f8f9fa] rounded"
          >
            40
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="w-8 h-8 flex items-center justify-center text-[14px] text-[#6c757d] hover:bg-[#f8f9fa] rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}
