"use client"

interface ConfirmDispenseModalProps {
  patientName: string
  drugName: string
  dosage: string
  frequency: string
  duration: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDispenseModal({
  patientName,
  drugName,
  dosage,
  frequency,
  duration,
  onConfirm,
  onCancel
}: ConfirmDispenseModalProps) {
  const currentDate = new Date().toISOString().split('T')[0]
  const pharmacistName = "John Smith"
  const location = "Main Street Pharmacy"

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-[0px_0px_4px_0px_rgba(33,37,41,0.1)] w-[600px] p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-[20px] font-medium text-[#212529] mb-2">
              Confirm Drug Dispensing
            </h2>
            <p className="text-[15px] font-extralight text-[#212529]">
              Please confirm that you are dispensing this medication to {patientName}.
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-[#f8f9fa] rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drug Details */}
        <div className="space-y-4 mb-6">
          <div className="px-2">
            <p className="text-[13px] font-light text-[#6c757d] mb-1">Drug Name</p>
            <p className="text-[16px] font-normal text-[#212529]">{drugName}</p>
          </div>
          <div className="px-2">
            <p className="text-[13px] font-light text-[#6c757d] mb-1">Dosage & Frequency</p>
            <p className="text-[16px] font-normal text-[#212529]">{dosage} - {frequency}</p>
          </div>
          <div className="px-2">
            <p className="text-[13px] font-light text-[#6c757d] mb-1">Duration</p>
            <p className="text-[16px] font-normal text-[#212529]">{duration}</p>
          </div>
        </div>

        {/* Dispensing Record */}
        <div className="border-t border-[rgba(33,37,41,0.35)] pt-5 mb-6">
          <div className="space-y-4 px-4">
            <p className="text-[15px] font-extralight text-[#212529]">Dispensing Record</p>
            <p className="text-[15px] font-extralight text-[#212529]">Date: {currentDate}</p>
            <p className="text-[15px] font-extralight text-[#212529]">Pharmacist: {pharmacistName}</p>
            <p className="text-[15px] font-extralight text-[#212529]">Location: {location}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-3 text-[16px] font-normal text-[#303030] hover:bg-[#f8f9fa] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#212529] border border-[#212529] text-white text-[16px] font-normal px-4 py-3 rounded-lg hover:bg-[#343a40] transition-colors"
          >
            Confirm Dispense
          </button>
        </div>
      </div>
    </div>
  )
}
