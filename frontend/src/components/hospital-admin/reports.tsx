"use client"

import { useState } from "react"

interface Service {
  id: string
  name: string
  department: string
  price: string
  status: "Active" | "Inactive"
}

const services: Service[] = [
  { id: "SRV001", name: "General Consultation", department: "General Medicine", price: "$200", status: "Active" },
  { id: "SRV002", name: "Dental Cleaning", department: "Dentistry", price: "$180", status: "Active" },
  { id: "SRV003", name: "Eye Checkup", department: "Ophthalmology", price: "$150", status: "Active" },
  { id: "SRV004", name: "X-Ray", department: "Radiology", price: "$80", status: "Inactive" },
  { id: "SRV005", name: "Physiotherapy Session", department: "Physiotherapy", price: "$130", status: "Active" },
  { id: "SRV006", name: "Cardiac Screening", department: "Cardiology", price: "$300", status: "Active" },
  { id: "SRV007", name: "Skin Allergy Test", department: "Dermatology", price: "$220", status: "Active" },
  { id: "SRV008", name: "Blood Test", department: "Pathology", price: "$150", status: "Active" },
  { id: "SRV009", name: "ENT Consultation", department: "ENT", price: "$230", status: "Inactive" },
  { id: "SRV010", name: "Nutrition Counseling", department: "Nutrition", price: "$250", status: "Active" },
]

export function Reports() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage)
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#d4edda] text-[#155724]"
      case "Inactive":
        return "bg-[#f8d7da] text-[#721c24]"
      default:
        return "bg-[#e2e3e5] text-[#383d41]"
    }
  }

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-[24px] font-semibold text-[#212529]">Services</h1>
          <span className="inline-flex items-center rounded-full bg-[#f1f5f9] px-3 py-1 text-[12px] font-medium text-[#0f172a]">
            Total Services : 565
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="relative">
            <button className="flex items-center gap-1 px-3 py-2 border border-[#e2e4e7] rounded-lg text-[13px] text-[#212529] bg-white hover:bg-[#f8f9fa]">
              <span>Export</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <button className="bg-[#007bff] text-white px-4 py-2 rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Services
          </button>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-4 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="relative w-full md:max-w-sm">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e2e4e7] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
            />
            <svg className="w-4 h-4 text-[#6c757d] absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-[#e2e4e7] rounded-lg text-[13px] text-[#212529] hover:bg-[#f8f9fa]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filter</span>
            </button>

            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-2 border border-[#e2e4e7] rounded-lg text-[13px] text-[#212529] bg-white hover:bg-[#f8f9fa]">
                <span>Sort By : Recent</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e8eb]">
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Service Name</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Department</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Price</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Status</th>
                <th className="w-10 py-3 px-4" />
              </tr>
            </thead>
            <tbody>
              {paginatedServices.map((service) => (
                <tr key={service.id} className="border-b border-[#f8f9fa] hover:bg-[#f8f9fa] transition-colors">
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{service.name}</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{service.department}</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{service.price}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${getStatusColor(service.status)}`}>
                      {service.status}
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
          <div className="flex items-center gap-2 text-[14px] text-[#6c757d]">
            <span>Show</span>
            <button className="px-2 py-1 border border-[#e2e4e7] rounded text-[#212529] bg-white">10</button>
            <span>Results</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center text-[13px] text-[#6c757d] hover:bg-[#f8f9fa] rounded disabled:opacity-50"
            >
              &lt;
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center text-[13px] rounded ${
                  currentPage === page
                    ? "bg-[#007bff] text-white"
                    : "text-[#6c757d] hover:bg-[#f8f9fa]"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="px-1 text-[13px] text-[#6c757d]">...</span>
            <button className="w-8 h-8 flex items-center justify-center text-[13px] text-[#6c757d] hover:bg-[#f8f9fa] rounded">
              12
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="w-8 h-8 flex items-center justify-center text-[13px] text-[#6c757d] hover:bg-[#f8f9fa] rounded disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
