"use client"

interface Prescription {
  id: string
  drugName: string
  dosage: string
  frequency: string
  duration: string
  notes: string
  patientName: string
  patientId: string
  date: string
  pharmacist?: string
  location?: string
  status: "pending" | "prescribed"
}

interface ConfirmPrescriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  prescription: Prescription
}

export function ConfirmPrescriptionModal({
  isOpen,
  onClose,
  onConfirm,
  prescription
}: ConfirmPrescriptionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-[600px] mx-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#e7e8eb]">
          <h2 className="text-[24px] font-semibold text-[#212529]">
            Confirm Drug Prescriptions
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f8f9fa] transition-colors"
          >
            <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <p className="text-[14px] text-[#6c757d] mb-6">
            Please confirm that you are Prescribed this medication to {prescription.patientName}
          </p>

          {/* Drug Details */}
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-[12px] text-[#6c757d] mb-1">Drug Name</p>
              <p className="text-[16px] font-semibold text-[#212529]">{prescription.drugName}</p>
            </div>

            <div>
              <p className="text-[12px] text-[#6c757d] mb-1">Dosage & Frequency</p>
              <p className="text-[16px] text-[#212529]">{prescription.drugName}</p>
            </div>

            <div>
              <p className="text-[12px] text-[#6c757d] mb-1">Duration</p>
              <p className="text-[16px] text-[#212529]">{prescription.duration}</p>
            </div>
          </div>

          {/* Prescription Record */}
          <div className="bg-[#f8f9fa] rounded-lg p-4 space-y-2">
            <p className="text-[14px] font-semibold text-[#212529] mb-3">Prescriptions Record</p>
            <div className="space-y-2 text-[14px]">
              <div className="flex items-start gap-2">
                <span className="text-[#6c757d] min-w-[100px]">Date:</span>
                <span className="text-[#212529]">2025-12-02</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#6c757d] min-w-[100px]">Pharmacist:</span>
                <span className="text-[#212529]">John Smith</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#6c757d] min-w-[100px]">Location:</span>
                <span className="text-[#212529]">Main Street Pharmacy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-6 border-t border-[#e7e8eb]">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-[#e7e8eb] text-[#6c757d] rounded-lg text-[14px] hover:bg-[#f8f9fa] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-[#212529] text-white rounded-lg text-[14px] hover:bg-[#000000] transition-colors"
          >
            Confirm Prescriptions
          </button>
        </div>
      </div>
    </div>
  )
}
