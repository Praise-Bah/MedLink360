"use client"

import { useRouter } from "next/navigation"

export function LabResultsPage() {
  const router = useRouter()
  const results = [
    {
      title: "Blood Test",
      lab: "Laboratory:HealthLab Diagnostics.",
      prescriber: "Prescriber:Dr. Hermann Paul.",
      testDate: "22 September, 2025",
      reportDate: "24 September, 2025",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold text-[#212529]">Lab Reports</h1>
      </div>

      <div className="bg-white rounded-xl border border-[#e8e7e7]">
        {results.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="flex items-start justify-between px-6 py-5 border-b border-[#e8e7e7] last:border-b-0"
          >
            <div>
              <h3 className="text-[14px] font-semibold text-[#212529] mb-2">{item.title}</h3>
              <p className="text-[13px] text-[#5c5c5c]">{item.lab}</p>
              <p className="text-[13px] text-[#5c5c5c]">{item.prescriber}</p>
            </div>
            <div className="flex items-center gap-10">
              <div>
                <p className="text-[11px] text-[#5c5c5c]">Test Date</p>
                <p className="text-[13px] font-medium text-[#212529]">{item.testDate}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#5c5c5c]">Report Date</p>
                <p className="text-[13px] font-medium text-[#212529]">{item.reportDate}</p>
              </div>
              <button 
                onClick={() => router.push('/medical-book/lab-result/blood-test')}
                className="p-2 hover:bg-[#f1f5f9] rounded-lg"
              >
                <svg className="w-4 h-4 text-[#5c5c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
