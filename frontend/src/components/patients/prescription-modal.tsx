"use client"

import { useState } from "react"

interface PrescriptionModalProps {
  isOpen: boolean
  onClose: () => void
  patientId?: string
}

export function PrescriptionModal({ isOpen, onClose, patientId }: PrescriptionModalProps) {
  const [drug, setDrug] = useState("")
  const [dosage, setDosage] = useState("")
  const [duration, setDuration] = useState("")
  const [selectedPharmacy, setSelectedPharmacy] = useState("")
  const [showPharmacyDropdown, setShowPharmacyDropdown] = useState(false)

  const pharmacies = [
    "Almond Pharmacy",
    "St Peters and Pauls Pharmacy",
    "Juli Pharmacy",
    "Crux Pharmacy",
    "Beneze Pharmacy"
  ]

  const handleSubmit = () => {
    // TODO: Implement prescription submission logic
    console.log({
      drug,
      dosage,
      duration,
      pharmacy: selectedPharmacy,
      patientId
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-[600px] mx-4 p-8 shadow-xl">
        <h2 className="text-[24px] font-semibold text-[#212529] mb-6">Prescription</h2>

        {/* Drug Field */}
        <div className="mb-6">
          <label className="block text-[14px] font-medium text-[#212529] mb-2">
            Drug
          </label>
          <input
            type="text"
            placeholder="Type here"
            value={drug}
            onChange={(e) => setDrug(e.target.value)}
            className="w-full px-4 py-3 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#007bff]"
          />
        </div>

        {/* Dosage Field */}
        <div className="mb-6">
          <label className="block text-[14px] font-medium text-[#212529] mb-2">
            Dosage
          </label>
          <input
            type="text"
            placeholder="Type here"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="w-full px-4 py-3 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#007bff]"
          />
        </div>

        {/* Duration Field */}
        <div className="mb-6">
          <label className="block text-[14px] font-medium text-[#212529] mb-2">
            Duration
          </label>
          <input
            type="text"
            placeholder="Type here"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-3 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#007bff]"
          />
        </div>

        {/* Assign Pharmacy Dropdown */}
        <div className="mb-8">
          <label className="block text-[14px] font-medium text-[#212529] mb-2">
            Assign Pharmacy
          </label>
          <div className="relative">
            <button
              onClick={() => setShowPharmacyDropdown(!showPharmacyDropdown)}
              className="w-full px-4 py-3 border border-[#e7e8eb] rounded-lg text-[14px] text-left flex items-center justify-between hover:border-[#007bff] transition-colors"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className={selectedPharmacy ? "text-[#212529]" : "text-[#9ca3af]"}>
                  {selectedPharmacy || "Select Assign Pharmacy"}
                </span>
              </div>
              <svg 
                className={`w-4 h-4 text-[#212529] transition-transform ${showPharmacyDropdown ? "rotate-180" : ""}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showPharmacyDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e7e8eb] rounded-lg shadow-lg z-10 overflow-hidden">
                {pharmacies.map((pharmacy, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedPharmacy(pharmacy)
                      setShowPharmacyDropdown(false)
                    }}
                    className="w-full px-4 py-3 text-[14px] text-[#212529] text-left hover:bg-[#f8f9fa] transition-colors"
                  >
                    {pharmacy}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-[#007bff] text-white rounded-lg text-[16px] font-medium hover:bg-[#0056b3] transition-colors"
        >
          Submit Prescription
        </button>
      </div>
    </div>
  )
}
