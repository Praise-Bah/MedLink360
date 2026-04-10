"use client"

import { useState } from "react"

interface Appointment {
  id: string
  patientName: string
  patientId: string
  doctorName: string
  department: string
  date: string
  time: string
  type: "Consultation" | "Follow-up" | "Emergency" | "Surgery"
  status: "Scheduled" | "Completed" | "Cancelled" | "In Progress"
}

const appointments: Appointment[] = [
  { id: "APT001", patientName: "Ralph Edwards", patientId: "MED-001", doctorName: "Dr. James Wilson", department: "Cardiology", date: "Jan 15, 2024", time: "09:00 AM", type: "Consultation", status: "Scheduled" },
  { id: "APT002", patientName: "Jerome Bell", patientId: "MED-002", doctorName: "Dr. Emily Brown", department: "General Medicine", date: "Jan 15, 2024", time: "09:30 AM", type: "Follow-up", status: "In Progress" },
  { id: "APT003", patientName: "Kathryn Murphy", patientId: "MED-003", doctorName: "Dr. Michael Chen", department: "Neurology", date: "Jan 15, 2024", time: "10:00 AM", type: "Consultation", status: "Scheduled" },
  { id: "APT004", patientName: "Jacob Jones", patientId: "MED-004", doctorName: "Dr. Lisa Anderson", department: "Pediatrics", date: "Jan 15, 2024", time: "10:30 AM", type: "Emergency", status: "Completed" },
  { id: "APT005", patientName: "Kristin Watson", patientId: "MED-005", doctorName: "Dr. James Wilson", department: "Cardiology", date: "Jan 15, 2024", time: "11:00 AM", type: "Surgery", status: "Scheduled" },
  { id: "APT006", patientName: "Cameron Williams", patientId: "MED-006", doctorName: "Dr. Emily Brown", department: "General Medicine", date: "Jan 15, 2024", time: "11:30 AM", type: "Follow-up", status: "Cancelled" },
  { id: "APT007", patientName: "Brooklyn Simmons", patientId: "MED-007", doctorName: "Dr. Michael Chen", department: "Neurology", date: "Jan 15, 2024", time: "02:00 PM", type: "Consultation", status: "Scheduled" },
]

export function AppointmentsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterType, setFilterType] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState("2024-01-15")
  const itemsPerPage = 7

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "All" || apt.status === filterStatus
    const matchesType = filterType === "All" || apt.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-[#cce5ff] text-[#004085]"
      case "Completed": return "bg-[#d4edda] text-[#155724]"
      case "Cancelled": return "bg-[#f8d7da] text-[#721c24]"
      case "In Progress": return "bg-[#fff3cd] text-[#856404]"
      default: return "bg-[#e2e3e5] text-[#383d41]"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Consultation": return "bg-[#e3f2fd] text-[#1565c0]"
      case "Follow-up": return "bg-[#e8f5e9] text-[#2e7d32]"
      case "Emergency": return "bg-[#ffebee] text-[#c62828]"
      case "Surgery": return "bg-[#f3e5f5] text-[#7b1fa2]"
      default: return "bg-[#e2e3e5] text-[#383d41]"
    }
  }

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-[24px] font-semibold text-[#212529]">Appointments Management</h1>
        <button className="bg-[#007bff] text-white px-4 py-2 rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Schedule Appointment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4">
          <p className="text-[14px] text-[#6c757d] mb-1">Today's Total</p>
          <p className="text-[24px] font-bold text-[#212529]">156</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4">
          <p className="text-[14px] text-[#6c757d] mb-1">Scheduled</p>
          <p className="text-[24px] font-bold text-[#007bff]">89</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4">
          <p className="text-[14px] text-[#6c757d] mb-1">In Progress</p>
          <p className="text-[24px] font-bold text-[#ffc107]">12</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4">
          <p className="text-[14px] text-[#6c757d] mb-1">Completed</p>
          <p className="text-[24px] font-bold text-[#28a745]">48</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4">
          <p className="text-[14px] text-[#6c757d] mb-1">Cancelled</p>
          <p className="text-[24px] font-bold text-[#dc3545]">7</p>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="text-[18px] font-medium text-[#212529]">Appointments</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 pl-10 pr-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
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
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
            >
              <option value="All">All Types</option>
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency">Emergency</option>
              <option value="Surgery">Surgery</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e8eb]">
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Appointment ID</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Patient</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Doctor</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Department</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Time</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Type</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Status</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAppointments.map((apt) => (
                <tr key={apt.id} className="border-b border-[#f8f9fa] hover:bg-[#f8f9fa] transition-colors">
                  <td className="py-4 px-4 text-[14px] text-[#007bff] font-medium">{apt.id}</td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-[14px] font-medium text-[#212529]">{apt.patientName}</p>
                      <p className="text-[12px] text-[#6c757d]">{apt.patientId}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{apt.doctorName}</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{apt.department}</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{apt.time}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-[12px] font-medium ${getTypeColor(apt.type)}`}>
                      {apt.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-[#e9ecef] rounded-lg transition-colors">
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
                      <button className="p-2 hover:bg-[#fce4ec] rounded-lg transition-colors">
                        <svg className="w-4 h-4 text-[#dc3545]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAppointments.length)} of {filteredAppointments.length} entries
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
