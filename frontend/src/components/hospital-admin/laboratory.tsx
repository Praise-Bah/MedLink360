"use client"

import { useState } from "react"

interface LabTest {
  id: string
  patientName: string
  patientId: string
  testType: string
  requestedBy: string
  requestDate: string
  sampleCollected: boolean
  status: "Pending" | "In Progress" | "Completed" | "Cancelled"
  priority: "Normal" | "Urgent" | "Critical"
  result?: string
}

const labTests: LabTest[] = [
  { id: "LAB001", patientName: "Ralph Edwards", patientId: "MED-001", testType: "Complete Blood Count", requestedBy: "Dr. James Wilson", requestDate: "Jan 15, 2024", sampleCollected: true, status: "Completed", priority: "Normal", result: "Normal" },
  { id: "LAB002", patientName: "Jerome Bell", patientId: "MED-002", testType: "Lipid Profile", requestedBy: "Dr. Emily Brown", requestDate: "Jan 15, 2024", sampleCollected: true, status: "In Progress", priority: "Normal" },
  { id: "LAB003", patientName: "Kathryn Murphy", patientId: "MED-003", testType: "Liver Function Test", requestedBy: "Dr. Michael Chen", requestDate: "Jan 15, 2024", sampleCollected: false, status: "Pending", priority: "Urgent" },
  { id: "LAB004", patientName: "Jacob Jones", patientId: "MED-004", testType: "Cardiac Enzymes", requestedBy: "Dr. Lisa Anderson", requestDate: "Jan 15, 2024", sampleCollected: true, status: "In Progress", priority: "Critical" },
  { id: "LAB005", patientName: "Kristin Watson", patientId: "MED-005", testType: "Thyroid Panel", requestedBy: "Dr. James Wilson", requestDate: "Jan 14, 2024", sampleCollected: true, status: "Completed", priority: "Normal", result: "Abnormal" },
  { id: "LAB006", patientName: "Cameron Williams", patientId: "MED-006", testType: "Urinalysis", requestedBy: "Dr. Emily Brown", requestDate: "Jan 14, 2024", sampleCollected: true, status: "Completed", priority: "Normal", result: "Normal" },
  { id: "LAB007", patientName: "Brooklyn Simmons", patientId: "MED-007", testType: "Blood Glucose", requestedBy: "Dr. Michael Chen", requestDate: "Jan 14, 2024", sampleCollected: false, status: "Cancelled", priority: "Normal" },
]

export function Laboratory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterPriority, setFilterPriority] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  const filteredTests = labTests.filter(test => {
    const matchesSearch = test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "All" || test.status === filterStatus
    const matchesPriority = filterPriority === "All" || test.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const totalPages = Math.ceil(filteredTests.length / itemsPerPage)
  const paginatedTests = filteredTests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-[#fff3cd] text-[#856404]"
      case "In Progress": return "bg-[#cce5ff] text-[#004085]"
      case "Completed": return "bg-[#d4edda] text-[#155724]"
      case "Cancelled": return "bg-[#f8d7da] text-[#721c24]"
      default: return "bg-[#e2e3e5] text-[#383d41]"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Normal": return "bg-[#e2e3e5] text-[#383d41]"
      case "Urgent": return "bg-[#fff3cd] text-[#856404]"
      case "Critical": return "bg-[#f8d7da] text-[#721c24]"
      default: return "bg-[#e2e3e5] text-[#383d41]"
    }
  }

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-semibold text-[#212529]">Laboratory Management</h1>
        <button className="bg-[#007bff] text-white px-4 py-2 rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Test Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4">
          <p className="text-[14px] text-[#6c757d] mb-1">Total Requests</p>
          <p className="text-[24px] font-bold text-[#212529]">256</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4">
          <p className="text-[14px] text-[#6c757d] mb-1">Pending</p>
          <p className="text-[24px] font-bold text-[#ffc107]">42</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4">
          <p className="text-[14px] text-[#6c757d] mb-1">In Progress</p>
          <p className="text-[24px] font-bold text-[#007bff]">38</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4">
          <p className="text-[14px] text-[#6c757d] mb-1">Completed</p>
          <p className="text-[24px] font-bold text-[#28a745]">168</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4">
          <p className="text-[14px] text-[#6c757d] mb-1">Critical</p>
          <p className="text-[24px] font-bold text-[#dc3545]">8</p>
        </div>
      </div>

      {/* Lab Tests Table */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-medium text-[#212529]">Lab Test Requests</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff] w-56"
              />
              <svg className="w-4 h-4 text-[#6c757d] absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
            >
              <option value="All">All Priority</option>
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
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
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Test ID</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Patient</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Test Type</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Requested By</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Date</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Priority</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Status</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTests.map((test) => (
                <tr key={test.id} className="border-b border-[#f8f9fa] hover:bg-[#f8f9fa] transition-colors">
                  <td className="py-4 px-4 text-[14px] text-[#007bff] font-medium">{test.id}</td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-[14px] font-medium text-[#212529]">{test.patientName}</p>
                      <p className="text-[12px] text-[#6c757d]">{test.patientId}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{test.testType}</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{test.requestedBy}</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{test.requestDate}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-[12px] font-medium ${getPriorityColor(test.priority)}`}>
                      {test.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${getStatusColor(test.status)}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-[#e9ecef] rounded-lg transition-colors" title="View Details">
                        <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {test.status === "Completed" && (
                        <button className="p-2 hover:bg-[#e8f5e9] rounded-lg transition-colors" title="Download Result">
                          <svg className="w-4 h-4 text-[#28a745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      )}
                      {test.status === "Pending" && (
                        <button className="p-2 hover:bg-[#e3f2fd] rounded-lg transition-colors" title="Collect Sample">
                          <svg className="w-4 h-4 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
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
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTests.length)} of {filteredTests.length} entries
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
