"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function PharmacistDashboardContent() {
  const router = useRouter()
  const [pharmacyOpen, setPharmacyOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("Daily")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("Newest")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const patients = [
    { id: "RPT0025", name: "James Carter", gender: "Male", prescriptions: "3 prescriptions", date: "17 Jun 2025" },
    { id: "RPT0024", name: "Emily Davis", gender: "Female", prescriptions: "5 prescriptions", date: "10 Jun 2025" },
    { id: "RPT0023", name: "Michael Johnson", gender: "Male", prescriptions: "6 prescriptions", date: "22 May 2025" },
    { id: "RPT0022", name: "Olivia Miller", gender: "Female", prescriptions: "6 prescriptions", date: "15 May 2025" },
    { id: "RPT0021", name: "David Smith", gender: "Male", prescriptions: "1 prescriptions", date: "30 Apr 2025" },
    { id: "RPT0020", name: "Sophia Wilson", gender: "Female", prescriptions: "2 prescriptions", date: "25 Apr 2025" },
    { id: "RPT0019", name: "Daniel Williams", gender: "Male", prescriptions: "4 prescriptions", date: "13 Mar 2025" },
    { id: "RPT0018", name: "Isabella Anderson", gender: "Female", prescriptions: "1 prescriptions", date: "16 Feb 2025" },
    { id: "RPT0017", name: "William Brown", gender: "Male", prescriptions: "3 prescriptions", date: "20 Jan 2025" },
    { id: "RPT0016", name: "Charlotte Taylor", gender: "Female", prescriptions: "4 prescriptions", date: "15 Jan 2025" }
  ]

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Ministry Alert */}
      <div className="bg-[#f8d7da] border border-[#f5c6cb] rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-6 h-6 flex-shrink-0 mt-1">
            <svg className="w-6 h-6 text-[#721c24]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-[16px] font-semibold text-[#721c24] mb-2">
              Ministry of Health Update
            </h3>
            <p className="text-[14px] text-[#721c24] mb-2">
              New guidelines for controlled substance dispensing effective immediately. All pharmacists must verify patient ID for Schedule II medications.
            </p>
            <p className="text-[12px] text-[#721c24] opacity-80">Posted: 2025-12-01</p>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#212529] mb-2">Welcome pharmacist Carter,</h1>
          <p className="text-[16px] text-[#6c757d]">I hope you're in a good mood because there are lot of patients waiting for you</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[16px] font-medium text-[#212529]">PHARMACY STATUS</span>
          <div className="flex items-center gap-2">
            <span
              className={`text-[14px] font-medium ${
                pharmacyOpen ? "text-[#28a745]" : "text-[#6c757d]"
              }`}
            >
              {pharmacyOpen ? "OPEN" : "CLOSED"}
            </span>
            <button
              onClick={() => setPharmacyOpen(!pharmacyOpen)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                pharmacyOpen ? "bg-[#28a745]" : "bg-[#6c757d]"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  pharmacyOpen ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Drug Dispensing Summary */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-[20px] font-semibold text-[#212529]">Drug Dispensing Summary</h2>
          <div className="flex flex-wrap bg-[#f8f9fa] rounded-lg p-1 gap-1">
            {["Daily", "Weekly", "Monthly", "Yearly"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[14px] font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-[#007bff] text-white"
                    : "text-[#6c757d] hover:text-[#212529]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {[
            { category: "Antibiotics", count: 45, percentage: 45 },
            { category: "Artemether", count: 60, percentage: 60 },
            { category: "Cardiovascular", count: 28, percentage: 28 },
            { category: "Diabetes", count: 19, percentage: 19 },
            { category: "Pain Relief", count: 80, percentage: 80 },
            { category: "Respiratory", count: 10, percentage: 10 },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] font-medium text-[#212529]">
                  {item.category}
                </span>
                <span className="text-[16px] font-semibold text-[#212529]">
                  {item.count}
                </span>
              </div>
              <div className="w-full h-3 bg-[#e9ecef] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#007bff] rounded-full transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="text-[36px] font-bold text-[#212529] mb-2">191</div>
            <div className="text-[14px] text-[#6c757d]">Total Dispensed</div>
          </div>
          <div className="text-center">
            <div className="text-[36px] font-bold text-[#212529] mb-2">5</div>
            <div className="text-[14px] text-[#6c757d]">Drug Categories</div>
          </div>
          <div className="text-center">
            <div className="text-[36px] font-bold text-[#212529] mb-2">38</div>
            <div className="text-[14px] text-[#6c757d]">Average per Type</div>
          </div>
        </div>
      </div>

      {/* Patient Queue */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-[20px] font-semibold text-[#212529]">Patient Queue</h2>
            <span className="bg-[#007bff] text-white text-[12px] font-medium px-2 py-1 rounded-full">
              {filteredPatients.length}
            </span>
          </div>
          <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center md:gap-4">
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff] w-full md:w-64"
              />
              <svg className="w-4 h-4 text-[#6c757d] absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
            >
              <option value="Newest">Sort by: Newest</option>
              <option value="Oldest">Sort by: Oldest</option>
              <option value="Name">Sort by: Name</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e8eb]">
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">
                  ID <span className="ml-1">↕</span>
                </th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">
                  Patient Name <span className="ml-1">↕</span>
                </th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">
                  Gender
                </th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">
                  Prescriptions <span className="ml-1">↕</span>
                </th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">
                  Prescriptions Date <span className="ml-1">↕</span>
                </th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">
                  
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPatients.map((patient, index) => (
                <tr 
                  key={patient.id} 
                  className="border-b border-[#f8f9fa] hover:bg-[#f8f9fa] transition-colors cursor-pointer"
                  onClick={() => router.push(`/pharmacist/patient/${patient.id}`)}
                >
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{patient.id}</td>
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
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{patient.gender}</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{patient.prescriptions}</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">{patient.date}</td>
                  <td className="py-4 px-4">
                    <button 
                      className="text-[#6c757d] hover:text-[#212529] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/pharmacist/patient/${patient.id}`)
                      }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="6" r="2"/>
                        <circle cx="12" cy="12" r="2"/>
                        <circle cx="12" cy="18" r="2"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-6">
          <div className="flex items-center gap-2 text-[14px] text-[#6c757d]">
            <span>Showing</span>
            <select className="border border-[#e7e8eb] rounded px-2 py-1 text-[14px]">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>Results</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-[14px] text-[#6c757d] hover:text-[#212529] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 text-[14px] rounded transition-colors ${
                  currentPage === page
                    ? "bg-[#007bff] text-white"
                    : "text-[#6c757d] hover:text-[#212529] hover:bg-[#f8f9fa]"
                }`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 text-[14px] text-[#6c757d] hover:text-[#212529] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
