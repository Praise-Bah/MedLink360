"use client"

import Link from "next/link"

export function MedicalBookPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#212529] mb-2">Medical Book</h1>
          <p className="text-[16px] font-medium text-[#212529]">
            Your complete medical history and records in diary-like format
          </p>
        </div>
        <Link
          href="/medical-book/view-all"
          className="px-6 py-3 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View All
        </Link>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg border border-[#e2e4e5] p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="h-12 w-12 flex items-center justify-center">
              <svg className="w-12 h-12 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h2 className="text-[24px] font-semibold text-[#212529] mb-1">
                Upload Medical Records
              </h2>
              <p className="text-[16px] font-medium text-[#212529]">
                Add past records, documents.
              </p>
            </div>
          </div>
          <button className="px-6 py-3 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Old Records
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by doctor, diagnosis or symptoms..."
            className="w-full h-12 pl-12 pr-4 rounded-lg border border-[#e2e4e5] text-[14px] focus:outline-none focus:border-[#007bff] bg-white"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9ca3af]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="relative">
          <select className="h-12 pl-4 pr-10 rounded-lg border border-[#e2e4e5] text-[14px] text-[#212529] font-medium focus:outline-none focus:border-[#007bff] bg-white appearance-none cursor-pointer">
            <option>All Status</option>
            <option>Consulted</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <Link
          href="/medical-book/visit/1"
          className="block bg-white rounded-lg border border-[#e2e4e5] p-6 hover:border-[#007bff] transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="flex items-center justify-center text-[#212529]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#212529] mb-1">Nov 20, 2025</p>
                <p className="text-[14px] text-[#212529] mb-1">Dr. Sarah Johnson</p>
                <p className="text-[14px] text-[#212529]">Upper Respiratory Infection</p>
              </div>
            </div>
            <span className="px-4 py-1.5 bg-[#d4e9ff] text-[#007bff] rounded-md text-[13px] font-medium">
              Consulted
            </span>
          </div>
        </Link>

        <Link
          href="/medical-book/visit/2"
          className="block bg-white rounded-lg border border-[#e2e4e5] p-6 hover:border-[#007bff] transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="flex items-center justify-center text-[#212529]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#212529] mb-1">Oct 15, 2025</p>
                <p className="text-[14px] text-[#212529] mb-1">Dr. Michael Chen</p>
                <p className="text-[14px] text-[#212529]">Hypertension monitoring</p>
              </div>
            </div>
            <span className="px-4 py-1.5 bg-[#d4e9ff] text-[#007bff] rounded-md text-[13px] font-medium">
              Consulted
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
