"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Patient {
  id: string
  name: string
  medicalId: string
  registrationDate: string
  department: string
  status: "Active" | "Inactive"
  roomNumber: string
}

const patients: Patient[] = [
  { id: "1", name: "Ralph Edwards", medicalId: "mdl0129", registrationDate: "January 6, 2024", department: "General Medicine", status: "Active", roomNumber: "275" },
  { id: "2", name: "Jerome Bell", medicalId: "mdl0130", registrationDate: "January 6, 2024", department: "Cardiology", status: "Active", roomNumber: "234" },
  { id: "3", name: "Kathryn Murphy", medicalId: "mdl0131", registrationDate: "January 11, 2024", department: "Cardiology", status: "Active", roomNumber: "908" },
  { id: "4", name: "Jacob Jones", medicalId: "mdl0132", registrationDate: "January 9, 2024", department: "Gastroenterology", status: "Active", roomNumber: "235" },
  { id: "5", name: "Kristin Watson", medicalId: "mdl0133", registrationDate: "January 9, 2024", department: "Gastroenterology", status: "Inactive", roomNumber: "111" },
  { id: "6", name: "Cody Fisher", medicalId: "mdl0134", registrationDate: "January 12, 2024", department: "Neurology", status: "Active", roomNumber: "567" },
  { id: "7", name: "Savannah Nguyen", medicalId: "mdl0135", registrationDate: "January 15, 2024", department: "Pediatrics", status: "Active", roomNumber: "320" },
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
      {/* Header / Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-[24px] font-semibold text-[#212529]">Admin Dashboard</h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button className="px-4 py-2 rounded-full border border-[#e7e8eb] bg-white text-[13px] text-[#6c757d] flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M5 11h14M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Last Update: Jan 2024 to Oct 2024
          </button>
          <button className="px-4 py-2 rounded-lg border border-[#e7e8eb] text-[14px] text-[#212529] bg-white hover:bg-[#f8f9fa] flex items-center gap-2">
            <span>Export to CSV</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button className="px-4 py-2 rounded-lg bg-[#007bff] text-white text-[14px] font-medium hover:bg-[#0056b3] flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Billing Insights */}
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[13px] text-[#6c757d] mb-1">Billing Insights</p>
              <p className="text-[26px] font-bold text-[#212529]">120</p>
              <p className="text-[12px] text-[#6c757d]">Total Cases</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#e3f2fd] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex justify-between text-[12px] text-[#6c757d] mt-2">
            <div>
              <p>Consultation</p>
              <p className="font-semibold text-[#212529]">$62,000.22</p>
            </div>
            <div>
              <p>Surgery</p>
              <p className="font-semibold text-[#212529]">$31,245.00</p>
            </div>
            <div>
              <p>Diagnostics</p>
              <p className="font-semibold text-[#212529]">$15,452.60</p>
            </div>
          </div>
        </div>

        {/* Patient Record */}
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[13px] text-[#6c757d] mb-1">Patient Record</p>
              <p className="text-[26px] font-bold text-[#212529]">720</p>
              <p className="text-[12px] text-[#28a745]">+142 increase vs last month</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#28a745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="flex justify-between text-[12px] text-[#6c757d] mt-2">
            <div>
              <p>Inpatients</p>
              <p className="font-semibold text-[#212529]">120</p>
            </div>
            <div>
              <p>Outpatients</p>
              <p className="font-semibold text-[#212529]">420</p>
            </div>
            <div>
              <p>Emergency</p>
              <p className="font-semibold text-[#212529]">180</p>
            </div>
          </div>
        </div>

        {/* Surgeries Performed */}
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[13px] text-[#6c757d] mb-1">Surgeries Performed</p>
              <p className="text-[26px] font-bold text-[#212529]">480</p>
              <p className="text-[12px] text-[#6c757d]">11% vs last month</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#fce4ec] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#e91e63]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <div className="flex justify-between text-[12px] text-[#6c757d] mt-2">
            <div>
              <p>Completed</p>
              <p className="font-semibold text-[#212529]">356</p>
            </div>
            <div>
              <p>Scheduled</p>
              <p className="font-semibold text-[#212529]">98</p>
            </div>
            <div>
              <p>Cancelled</p>
              <p className="font-semibold text-[#212529]">26</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Line Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-medium text-[#212529]">Patient In / Out</h2>
            <button className="px-3 py-1.5 rounded-full border border-[#e7e8eb] text-[12px] text-[#6c757d] hover:bg-[#f8f9fa]">
              View Details
            </button>
          </div>
          <div className="h-56 md:h-64 rounded-lg border border-dashed border-[#e0e7ff] bg-[#f8fafc] flex items-center justify-center text-[12px] text-[#9ca3af]">
            Line chart placeholder
          </div>
        </div>

        {/* Donut Report Card */}
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-medium text-[#212529]">Report</h2>
            <button className="px-3 py-1.5 rounded-full border border-[#e7e8eb] text-[12px] text-[#6c757d] hover:bg-[#f8f9fa]">
              Add Report
            </button>
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="relative flex items-center justify-center w-32 h-32">
              <div className="w-32 h-32 rounded-full border-[10px] border-[#ffe4d6] border-t-[#ff6f3c] border-r-[#ffb347] border-b-[#ffd6a5]" />
              <div className="absolute flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white">
                <p className="text-[20px] font-bold text-[#ff6f3c]">70%</p>
                <p className="text-[11px] text-[#6c757d]">Total Case</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-[12px] text-[#6c757d]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff6f3c]" />
                <span>Urgent</span>
              </div>
              <span>35% done</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffd166]" />
                <span>Low</span>
              </div>
              <span>15% done</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4dabf7]" />
                <span>Moderate</span>
              </div>
              <span>25% done</span>
            </div>
          </div>
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
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">ID Number</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Admission Date</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Assigned Department</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Room Number</th>
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
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{patient.roomNumber}</td>
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
