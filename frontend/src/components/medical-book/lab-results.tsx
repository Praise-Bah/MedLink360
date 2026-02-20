"use client"

import Link from "next/link"

export function LabResultsPage() {
  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Link
          href="/medical-book"
          className="h-10 w-10 rounded-lg border border-[#e2e4e5] flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-[24px] font-semibold text-[#212529]">Lab Results</h1>
          <p className="text-[14px] text-[#5c5c5c]">Complete Blood Count Test</p>
        </div>
      </div>

      {/* Test Information Card */}
      <div className="bg-white rounded-xl border border-[#e8e7e7] shadow-sm p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-[20px] font-semibold text-[#212529] mb-2">Blood Test Results</h2>
            <div className="flex items-center gap-4 text-[14px] text-[#5c5c5c]">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Nov 15, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>MedLink Lab Center</span>
              </div>
            </div>
          </div>
          <span className="px-4 py-1.5 bg-[#d4f5e0] text-[#10b981] rounded-md text-[13px] font-medium">
            Completed
          </span>
        </div>

        {/* Test Results Table */}
        <div className="overflow-hidden rounded-lg border border-[#e8e7e7]">
          <table className="w-full">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#212529] uppercase tracking-wider">
                  Test Name
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#212529] uppercase tracking-wider">
                  Result
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#212529] uppercase tracking-wider">
                  Reference Range
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#212529] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#e8e7e7]">
              <tr>
                <td className="px-6 py-4 text-[14px] text-[#212529]">Hemoglobin</td>
                <td className="px-6 py-4 text-[14px] font-medium text-[#212529]">14.5 g/dL</td>
                <td className="px-6 py-4 text-[14px] text-[#5c5c5c]">13.5 - 17.5 g/dL</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded-full text-[12px] font-medium">
                    Normal
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-[14px] text-[#212529]">White Blood Cells</td>
                <td className="px-6 py-4 text-[14px] font-medium text-[#212529]">7,200 /μL</td>
                <td className="px-6 py-4 text-[14px] text-[#5c5c5c]">4,000 - 11,000 /μL</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded-full text-[12px] font-medium">
                    Normal
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-[14px] text-[#212529]">Red Blood Cells</td>
                <td className="px-6 py-4 text-[14px] font-medium text-[#212529]">4.8 M/μL</td>
                <td className="px-6 py-4 text-[14px] text-[#5c5c5c]">4.5 - 5.5 M/μL</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded-full text-[12px] font-medium">
                    Normal
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-[14px] text-[#212529]">Platelets</td>
                <td className="px-6 py-4 text-[14px] font-medium text-[#212529]">250,000 /μL</td>
                <td className="px-6 py-4 text-[14px] text-[#5c5c5c]">150,000 - 400,000 /μL</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded-full text-[12px] font-medium">
                    Normal
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-[14px] text-[#212529]">Hematocrit</td>
                <td className="px-6 py-4 text-[14px] font-medium text-[#212529]">42%</td>
                <td className="px-6 py-4 text-[14px] text-[#5c5c5c]">38 - 50%</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded-full text-[12px] font-medium">
                    Normal
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-[14px] text-[#212529]">MCV</td>
                <td className="px-6 py-4 text-[14px] font-medium text-[#212529]">88 fL</td>
                <td className="px-6 py-4 text-[14px] text-[#5c5c5c]">80 - 100 fL</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded-full text-[12px] font-medium">
                    Normal
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl border border-[#e8e7e7] shadow-sm p-6">
        <h3 className="text-[18px] font-semibold text-[#212529] mb-4">Summary</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#d4f5e0] rounded-lg p-4">
            <p className="text-[12px] text-[#5c5c5c] mb-1">Total Tests</p>
            <p className="text-[24px] font-semibold text-[#10b981]">6</p>
          </div>
          <div className="bg-[#d4f5e0] rounded-lg p-4">
            <p className="text-[12px] text-[#5c5c5c] mb-1">Normal</p>
            <p className="text-[24px] font-semibold text-[#10b981]">6</p>
          </div>
          <div className="bg-[#f8f9fa] rounded-lg p-4">
            <p className="text-[12px] text-[#5c5c5c] mb-1">Abnormal</p>
            <p className="text-[24px] font-semibold text-[#5c5c5c]">0</p>
          </div>
        </div>
        <p className="text-[14px] text-[#5c5c5c] leading-relaxed">
          All test results are within normal reference ranges. Complete blood count shows healthy levels 
          of red blood cells, white blood cells, and platelets. No immediate concerns identified.
        </p>
      </div>

      {/* Doctor's Interpretation */}
      <div className="bg-white rounded-xl border border-[#e8e7e7] shadow-sm p-6">
        <h3 className="text-[18px] font-semibold text-[#212529] mb-4">Doctor's Interpretation</h3>
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-[#d4e9ff] flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-[#007bff]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#212529] mb-1">Dr. Michael Chen</p>
            <p className="text-[12px] text-[#5c5c5c] mb-3">Hematologist</p>
            <p className="text-[14px] text-[#5c5c5c] leading-relaxed">
              The complete blood count results are excellent and indicate good overall health. 
              All blood cell counts are within optimal ranges. Continue maintaining a healthy lifestyle 
              with balanced nutrition and regular exercise. Recommend routine follow-up in 6 months.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 px-6 py-3 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors">
          Download Report
        </button>
        <button className="flex-1 px-6 py-3 bg-white border border-[#e2e4e5] text-[#212529] rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-colors">
          Share with Doctor
        </button>
      </div>
    </div>
  )
}
