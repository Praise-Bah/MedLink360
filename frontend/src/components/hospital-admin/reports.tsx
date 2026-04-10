"use client"

import { useState } from "react"

interface Report {
  id: string
  title: string
  type: "Financial" | "Operational" | "Clinical" | "Administrative"
  generatedBy: string
  generatedDate: string
  period: string
  status: "Ready" | "Processing" | "Scheduled"
  size: string
}

const reports: Report[] = [
  { id: "RPT001", title: "Monthly Revenue Report", type: "Financial", generatedBy: "System", generatedDate: "Jan 15, 2024", period: "December 2023", status: "Ready", size: "2.4 MB" },
  { id: "RPT002", title: "Patient Admission Statistics", type: "Operational", generatedBy: "Admin User", generatedDate: "Jan 14, 2024", period: "Q4 2023", status: "Ready", size: "1.8 MB" },
  { id: "RPT003", title: "Department Performance", type: "Clinical", generatedBy: "System", generatedDate: "Jan 14, 2024", period: "December 2023", status: "Ready", size: "3.2 MB" },
  { id: "RPT004", title: "Staff Attendance Report", type: "Administrative", generatedBy: "HR System", generatedDate: "Jan 13, 2024", period: "December 2023", status: "Ready", size: "1.1 MB" },
  { id: "RPT005", title: "Lab Test Analysis", type: "Clinical", generatedBy: "Lab System", generatedDate: "Jan 13, 2024", period: "December 2023", status: "Processing", size: "-" },
  { id: "RPT006", title: "Annual Financial Summary", type: "Financial", generatedBy: "System", generatedDate: "Jan 12, 2024", period: "2023", status: "Scheduled", size: "-" },
]

export function Reports() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "All" || report.type === filterType
    return matchesSearch && matchesType
  })

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage)
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Financial": return "bg-[#e8f5e9] text-[#2e7d32]"
      case "Operational": return "bg-[#e3f2fd] text-[#1565c0]"
      case "Clinical": return "bg-[#fce4ec] text-[#c62828]"
      case "Administrative": return "bg-[#fff3e0] text-[#e65100]"
      default: return "bg-[#e2e3e5] text-[#383d41]"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready": return "bg-[#d4edda] text-[#155724]"
      case "Processing": return "bg-[#cce5ff] text-[#004085]"
      case "Scheduled": return "bg-[#fff3cd] text-[#856404]"
      default: return "bg-[#e2e3e5] text-[#383d41]"
    }
  }

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-semibold text-[#212529]">Reports</h1>
        <button className="bg-[#007bff] text-white px-4 py-2 rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Generate Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#6c757d] mb-1">Total Reports</p>
              <p className="text-[28px] font-bold text-[#212529]">156</p>
            </div>
            <div className="w-12 h-12 bg-[#e3f2fd] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#6c757d] mb-1">This Month</p>
              <p className="text-[28px] font-bold text-[#28a745]">24</p>
            </div>
            <div className="w-12 h-12 bg-[#e8f5e9] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#28a745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#6c757d] mb-1">Processing</p>
              <p className="text-[28px] font-bold text-[#ffc107]">3</p>
            </div>
            <div className="w-12 h-12 bg-[#fff3e0] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#ffc107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#6c757d] mb-1">Scheduled</p>
              <p className="text-[28px] font-bold text-[#6c757d]">5</p>
            </div>
            <div className="w-12 h-12 bg-[#f5f5f5] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Report Generation */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-6">
        <h2 className="text-[18px] font-medium text-[#212529] mb-4">Quick Reports</h2>
        <div className="grid grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 border border-[#e7e8eb] rounded-lg hover:border-[#007bff] hover:bg-[#f8f9ff] transition-colors">
            <div className="w-12 h-12 bg-[#e8f5e9] rounded-lg flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#2e7d32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[14px] font-medium text-[#212529]">Financial Report</p>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-[#e7e8eb] rounded-lg hover:border-[#007bff] hover:bg-[#f8f9ff] transition-colors">
            <div className="w-12 h-12 bg-[#e3f2fd] rounded-lg flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#1565c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-[14px] font-medium text-[#212529]">Patient Report</p>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-[#e7e8eb] rounded-lg hover:border-[#007bff] hover:bg-[#f8f9ff] transition-colors">
            <div className="w-12 h-12 bg-[#fce4ec] rounded-lg flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#c62828]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-[14px] font-medium text-[#212529]">Department Report</p>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-[#e7e8eb] rounded-lg hover:border-[#007bff] hover:bg-[#f8f9ff] transition-colors">
            <div className="w-12 h-12 bg-[#fff3e0] rounded-lg flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#e65100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-[14px] font-medium text-[#212529]">Analytics Report</p>
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-medium text-[#212529]">Recent Reports</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff] w-56"
              />
              <svg className="w-4 h-4 text-[#6c757d] absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
            >
              <option value="All">All Types</option>
              <option value="Financial">Financial</option>
              <option value="Operational">Operational</option>
              <option value="Clinical">Clinical</option>
              <option value="Administrative">Administrative</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e8eb]">
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Report ID</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Title</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Type</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Period</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Generated</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Status</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Size</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReports.map((report) => (
                <tr key={report.id} className="border-b border-[#f8f9fa] hover:bg-[#f8f9fa] transition-colors">
                  <td className="py-4 px-4 text-[14px] text-[#007bff] font-medium">{report.id}</td>
                  <td className="py-4 px-4">
                    <p className="text-[14px] font-medium text-[#212529]">{report.title}</p>
                    <p className="text-[12px] text-[#6c757d]">By {report.generatedBy}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-[12px] font-medium ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{report.period}</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{report.generatedDate}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{report.size}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-[#e9ecef] rounded-lg transition-colors" title="View">
                        <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {report.status === "Ready" && (
                        <button className="p-2 hover:bg-[#e8f5e9] rounded-lg transition-colors" title="Download">
                          <svg className="w-4 h-4 text-[#28a745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-[14px] text-[#6c757d]">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredReports.length)} of {filteredReports.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-[14px] text-[#6c757d] hover:text-[#212529] disabled:opacity-50"
            >
              Previous
            </button>
            {[1, 2].map((page) => (
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
