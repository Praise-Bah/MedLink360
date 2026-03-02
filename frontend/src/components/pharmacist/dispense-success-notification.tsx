"use client"

interface DispenseSuccessNotificationProps {
  drugName: string
  onClose: () => void
}

export function DispenseSuccessNotification({
  drugName,
  onClose
}: DispenseSuccessNotificationProps) {
  return (
    <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right duration-300">
      <div className="flex items-center bg-white rounded-[5px] shadow-lg overflow-hidden w-[530px]">
        {/* Blue accent bar */}
        <div className="w-[10px] h-[76px] bg-[#007bff] flex-shrink-0" />
        
        {/* Content */}
        <div className="flex items-center gap-4 px-4 py-4 flex-1">
          {/* Success Icon */}
          <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full border-2 border-[#007bff] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#007bff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          {/* Text */}
          <div className="flex-1">
            <h3 className="text-[24px] font-normal text-[#212529]">Prescription Dispensed</h3>
            <p className="text-[16px] font-light text-[rgba(33,37,41,0.4)]">
              {drugName} has been dispensed successfully.
            </p>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#f8f9fa] rounded-full transition-colors flex-shrink-0"
          >
            <svg className="w-6 h-6 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
