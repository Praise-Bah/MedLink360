"use client"

import { useState } from "react"

interface StaffMember {
  id: string
  name: string
  staffId: string
  role: string
  department: string
  joinDate: string
  status: "Active" | "On Leave" | "Inactive"
  phone: string
  email: string
  qualification: string
  experience: string
}

const staffMembers: StaffMember[] = [
  { id: "1", name: "Dr. James Wilson", staffId: "DRO025", role: "Cardiologist", department: "Cardiology", joinDate: "March 15, 2020", status: "Active", phone: "+1 234-567-8901", email: "james.wilson@hospital.com", qualification: "MBBS", experience: "4+ years" },
  { id: "2", name: "Dr. Emily Brown", staffId: "DRO024", role: "General Physician", department: "General Medicine", joinDate: "June 20, 2019", status: "Active", phone: "+1 234-567-8902", email: "emily.brown@hospital.com", qualification: "MD", experience: "3+ years" },
  { id: "3", name: "Nurse Sarah Davis", staffId: "NUR001", role: "Head Nurse", department: "Emergency", joinDate: "January 10, 2021", status: "Active", phone: "+1 234-567-8903", email: "sarah.davis@hospital.com", qualification: "RN", experience: "5+ years" },
  { id: "4", name: "Dr. Michael Chen", staffId: "DRO023", role: "Neurologist", department: "Neurology", joinDate: "August 5, 2018", status: "On Leave", phone: "+1 234-567-8904", email: "michael.chen@hospital.com", qualification: "MS", experience: "6+ years" },
  { id: "5", name: "Dr. Lisa Anderson", staffId: "DRO022", role: "Pediatrician", department: "Pediatrics", joinDate: "November 12, 2022", status: "Active", phone: "+1 234-567-8905", email: "lisa.anderson@hospital.com", qualification: "MBBS", experience: "2+ years" },
  { id: "6", name: "Tech. David Kim", staffId: "LAB001", role: "Lab Technician", department: "Laboratory", joinDate: "April 8, 2021", status: "Active", phone: "+1 234-567-8906", email: "david.kim@hospital.com", qualification: "BMLS", experience: "3+ years" },
  { id: "7", name: "Pharm. Jessica Moore", staffId: "PHA001", role: "Pharmacist", department: "Pharmacy", joinDate: "September 25, 2020", status: "Active", phone: "+1 234-567-8907", email: "jessica.moore@hospital.com", qualification: "B.Pharm", experience: "4+ years" },
]

export function StaffManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const itemsPerPage = 7

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === "All" || staff.role.includes(filterRole)
    return matchesSearch && matchesRole
  })

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage)
  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-[24px] font-semibold text-[#212529]">Staff Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#007bff] text-white px-4 py-2 rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Staff Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-5">
          <p className="text-[14px] text-[#6c757d] mb-1">Total Staff</p>
          <p className="text-[28px] font-bold text-[#212529]">89</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <p className="text-[14px] text-[#6c757d] mb-1">Doctors</p>
          <p className="text-[28px] font-bold text-[#007bff]">32</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <p className="text-[14px] text-[#6c757d] mb-1">Nurses</p>
          <p className="text-[28px] font-bold text-[#28a745]">41</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e7e8eb] p-5">
          <p className="text-[14px] text-[#6c757d] mb-1">Other Staff</p>
          <p className="text-[28px] font-bold text-[#ff9800]">16</p>
        </div>
      </div>

      {/* Staff List */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-[18px] font-medium text-[#212529]">Staff Directory</h2>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
              />
              <svg className="w-4 h-4 text-[#6c757d] absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
            >
              <option value="All">All Roles</option>
              <option value="Doctor">Doctors</option>
              <option value="Nurse">Nurses</option>
              <option value="Technician">Technicians</option>
              <option value="Pharmacist">Pharmacists</option>
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
                <th className="w-10 py-3 px-4">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#ced4da] text-[#007bff]" />
                </th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Doctor ID</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Doctor Name</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Department</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Qualification</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Experience</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Status</th>
                <th className="w-12 py-3 px-4" />
              </tr>
            </thead>
            <tbody>
              {paginatedStaff.map((staff) => (
                <tr key={staff.id} className="border-b border-[#f8f9fa] hover:bg-[#f8f9fa] transition-colors">
                  <td className="py-4 px-4 align-middle">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#ced4da] text-[#007bff]" />
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">#{staff.staffId}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#007bff] flex items-center justify-center text-white font-medium">
                        {staff.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-[#212529]">{staff.name}</p>
                        <p className="text-[12px] text-[#6c757d]">{staff.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{staff.department}</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{staff.qualification}</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{staff.experience}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                        staff.status === "Active"
                          ? "bg-[#d4edda] text-[#155724]"
                          : staff.status === "On Leave"
                          ? "bg-[#fff3cd] text-[#856404]"
                          : "bg-[#f8d7da] text-[#721c24]"
                      }`}
                    >
                      {staff.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 hover:bg-[#e9ecef] rounded-lg transition-colors" aria-label="More actions">
                      <svg className="w-4 h-4 text-[#6c757d]" viewBox="0 0 20 20" fill="currentColor">
                        <circle cx="10" cy="4" r="1.5" />
                        <circle cx="10" cy="10" r="1.5" />
                        <circle cx="10" cy="16" r="1.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-6">
          <p className="text-[14px] text-[#6c757d]">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredStaff.length)} of {filteredStaff.length} entries
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
