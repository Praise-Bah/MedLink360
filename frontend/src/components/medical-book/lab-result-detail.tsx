"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface LabResultDetailProps {
  testType: "full-body" | "blood-test"
  onClose?: () => void
}

export function LabResultDetail({ testType, onClose }: LabResultDetailProps) {
  const [showMoreDetails, setShowMoreDetails] = useState(false)
  const router = useRouter()
  const isFullBody = testType === "full-body"

  const handleClose = () => {
    if (onClose) {
      onClose()
      return
    }
    router.back()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-[#007bff] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-[18px] font-semibold">
              Lab Reports &gt; {isFullBody ? "Full Body Test" : "Blood Test"}
            </h1>
          </div>
          <button 
            onClick={handleClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Status Badge and Title */}
        <div className="bg-[#007bff] text-white px-6 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[14px] font-medium">Normal</span>
              </div>
              {!isFullBody && (
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <svg className="w-4 h-4 text-[#ff6b6b]" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" />
                  </svg>
                  <span className="text-[14px] font-medium">Blood</span>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-[14px] mb-1">
                {isFullBody ? "Nov 20, 2025" : "24 Nov,2025"}
              </p>
              <div className="flex items-center gap-2 justify-end">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-[14px]">10</span>
              </div>
            </div>
          </div>
          <h2 className="text-[24px] font-semibold mt-4">
            {isFullBody ? "Complete Full Body Test" : "Complete Blood Count with Differential"}
          </h2>
          {!isFullBody && (
            <div className="flex items-center gap-2 mt-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Patient Info Card */}
          <div className="bg-[#f8f9fa] rounded-xl p-6 mb-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h3 className="text-[14px] font-semibold text-[#212529] mb-3">Lab Test ID. 78956</h3>
                <div className="space-y-2 text-[13px]">
                  <p className="text-[#5c5c5c]">Sample</p>
                  {!isFullBody && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#ff6b6b]" fill="currentColor" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="8" />
                      </svg>
                      <span className="text-[#212529]">Whole Blood</span>
                    </div>
                  )}
                  <p className="text-[#5c5c5c]">Test Date</p>
                  <p className="text-[#212529] font-medium">
                    {isFullBody ? "Nov 20, 2025" : "22 September, 2025"}
                  </p>
                  <p className="text-[#5c5c5c]">Report Date</p>
                  <p className="text-[#212529] font-medium">
                    {isFullBody ? "Nov 20, 2025" : "24 September, 2025"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-[14px] font-semibold text-[#212529] mb-3">Patient John Carter</h3>
                <div className="space-y-2 text-[13px]">
                  <p className="text-[#5c5c5c]">Sex</p>
                  <p className="text-[#212529] font-medium">Male</p>
                  <p className="text-[#5c5c5c]">Date Of Birth</p>
                  <p className="text-[#212529] font-medium">23.07.1994</p>
                  <p className="text-[#5c5c5c]">Age:</p>
                  <p className="text-[#212529] font-medium">31</p>
                </div>
              </div>

              <div>
                <h3 className="text-[14px] font-semibold text-[#212529] mb-3">Laboratory HealthLab Diagnostics.</h3>
                <div className="space-y-2 text-[13px]">
                  <p className="text-[#5c5c5c]">Prescriber:</p>
                  <p className="text-[#212529] font-medium">
                    {isFullBody ? "Dr. Michael Chen" : "Dr. Hermann Paul."}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowMoreDetails(!showMoreDetails)}
              className="flex items-center justify-between w-full mt-4 px-4 py-3 bg-[#e8f4ff] rounded-lg hover:bg-[#d4e9ff] transition-colors"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="text-[14px] font-medium text-[#007bff]">More Details</span>
              </div>
              <svg 
                className={`w-5 h-5 text-[#007bff] transition-transform ${showMoreDetails ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Results Table */}
          {isFullBody ? (
            <FullBodyTestResults />
          ) : (
            <BloodTestResults />
          )}
        </div>
      </div>
    </div>
  )
}

function FullBodyTestResults() {
  return (
    <div className="bg-white rounded-xl border border-[#e8e7e7]">
      <table className="w-full">
        <thead className="bg-[#f8f9fa] border-b border-[#e8e7e7]">
          <tr>
            <th className="px-4 py-3 text-left">
              <input type="checkbox" className="rounded border-gray-300" />
            </th>
            <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#212529] uppercase">#</th>
            <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#212529] uppercase">MARKER</th>
            <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#212529] uppercase">VALUE</th>
            <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#212529] uppercase">STATUS</th>
            <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#212529] uppercase">COMMENT</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e8e7e7]">
          <tr className="hover:bg-[#f8f9fa]">
            <td className="px-4 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">1</td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">Maximum body temperature</td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]">
              <div>97–99°F</div>
              <div className="text-[#212529] font-medium">98.5°F</div>
            </td>
            <td className="px-4 py-4">
              <span className="px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded-full text-[12px] font-medium">Normal</span>
            </td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]">Afebrile (no fever)</td>
          </tr>
          <tr className="hover:bg-[#f8f9fa]">
            <td className="px-4 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">2</td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">Blood pressure</td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]">
              <div>90–120 / 60–80 mm Hg</div>
              <div className="text-[#212529] font-medium">148/74 mm Hg</div>
            </td>
            <td className="px-4 py-4">
              <span className="px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded-full text-[12px] font-medium">Normal</span>
            </td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]">Mild systolic hypertension</td>
          </tr>
          <tr className="hover:bg-[#f8f9fa]">
            <td className="px-4 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">3</td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">Respiratory rate</td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]">
              <div>12–20 breaths/min</div>
              <div className="text-[#212529] font-medium">8.5 mg/dL</div>
            </td>
            <td className="px-4 py-4">
              <span className="px-3 py-1 bg-[#ffe5e5] text-[#ff6b6b] rounded-full text-[12px] font-medium">Low</span>
            </td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]">Mild tachypnea</td>
          </tr>
          <tr className="hover:bg-[#f8f9fa]">
            <td className="px-4 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">4</td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">Calcium</td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]">
              <div>8.5–10.5 mg/dL</div>
              <div className="text-[#212529] font-medium">No acute thoracic abnormality</div>
            </td>
            <td className="px-4 py-4">
              <span className="px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded-full text-[12px] font-medium">Normal</span>
            </td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]">Within normal limits</td>
          </tr>
          <tr className="hover:bg-[#f8f9fa]">
            <td className="px-4 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">5</td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">Blood urea nitrogen</td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]">
              <div>7–20 mg/dL</div>
            </td>
            <td className="px-4 py-4">
              <span className="px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded-full text-[12px] font-medium">Normal</span>
            </td>
            <td className="px-4 py-4 text-[14px] text-[#ff6b6b]">Normal renal function</td>
          </tr>
          <tr className="hover:bg-[#f8f9fa]">
            <td className="px-4 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">6</td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">Chest X-ray</td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]"></td>
            <td className="px-4 py-4">
              <span className="px-3 py-1 bg-[#e8f4ff] text-[#007bff] rounded-full text-[12px] font-medium">Info</span>
            </td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]"></td>
          </tr>
          <tr className="hover:bg-[#f8f9fa]">
            <td className="px-4 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">7</td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">Corey Stanton</td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]"></td>
            <td className="px-4 py-4">
              <span className="px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded-full text-[12px] font-medium">Normal</span>
            </td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]"></td>
          </tr>
          <tr className="hover:bg-[#f8f9fa]">
            <td className="px-4 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">8</td>
            <td className="px-4 py-4 text-[14px] text-[#212529]">CT chest with contrast</td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]"></td>
            <td className="px-4 py-4">
              <span className="px-3 py-1 bg-[#d4f5e0] text-[#10b981] rounded-full text-[12px] font-medium">Normal</span>
            </td>
            <td className="px-4 py-4 text-[14px] text-[#5c5c5c]"></td>
          </tr>
        </tbody>
      </table>
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8e7e7] bg-[#f8f9fa]">
        <p className="text-[13px] text-[#5c5c5c]">1-10 of 97</p>
        <div className="flex items-center gap-4">
          <select className="px-3 py-1 border border-[#e8e7e7] rounded text-[13px]">
            <option>Rows per page: 10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-white rounded">
              <svg className="w-5 h-5 text-[#5c5c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-[13px] text-[#212529]">1/10</span>
            <button className="p-1 hover:bg-white rounded">
              <svg className="w-5 h-5 text-[#5c5c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function BloodTestResults() {
  return (
    <div className="space-y-6">
      <h3 className="text-[16px] font-semibold text-[#212529]">RED BLOOD CELL COUNT AND INDICES</h3>
      
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-white rounded-xl border border-[#e8e7e7] p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <h4 className="text-[16px] font-semibold text-[#212529]">Red Blood Cell Count (RBC)</h4>
              <button className="p-1 hover:bg-gray-100 rounded-full">
                <svg className="w-5 h-5 text-[#5c5c5c]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <button className="px-4 py-2 bg-[#007bff] text-white rounded-lg text-[13px] font-medium hover:bg-[#0056b3] flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Normal
            </button>
          </div>

          <div className="flex items-center gap-6 mb-4">
            <div className="flex-1">
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div className="absolute left-0 top-0 h-full bg-[#007bff] rounded-full" style={{ width: '60%' }}></div>
                <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#007bff] rounded-full"></div>
                <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#007bff] rounded-full"></div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[13px] text-[#5c5c5c] mb-1">Reference Range:</p>
              <p className="text-[14px] font-medium text-[#212529]">4.5-5.5 million/μL</p>
            </div>
            <div className="text-right">
              <p className="text-[20px] font-semibold text-[#212529]">5.2</p>
              <p className="text-[13px] text-[#5c5c5c]">million/μL</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
