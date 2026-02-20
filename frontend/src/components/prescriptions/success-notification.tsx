"use client"

interface SuccessNotificationProps {
  isVisible: boolean
  message: string
  onClose: () => void
}

export function SuccessNotification({
  isVisible,
  message,
  onClose
}: SuccessNotificationProps) {
  if (!isVisible) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-white border border-[#e7e8eb] rounded-xl shadow-lg px-6 py-4 flex items-center gap-4 min-w-[400px]">
        {/* Success Icon */}
        <div className="w-12 h-12 rounded-full bg-[#007bff] flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="text-[16px] font-semibold text-[#212529] mb-1">
            Drug Prescriptions Successfully
          </p>
          <p className="text-[14px] text-[#6c757d]">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f8f9fa] transition-colors flex-shrink-0"
        >
          <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
