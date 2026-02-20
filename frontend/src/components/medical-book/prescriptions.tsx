"use client"

import { useState } from "react"

interface Prescription {
  id: number
  name: string
  dosage: string
  frequency: string
  duration: string
  notes: string
  patientName: string
  doctor: string
  date: string
  status: "pending" | "prescribed"
}

const initialPrescriptions: Prescription[] = [
  {
    id: 1,
    name: "Atorvastatin 20mg",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "30 days",
    notes: "Take with meals",
    patientName: "Mercy Johnson",
    doctor: "Dr. James Wilson",
    date: "2025-11-28",
    status: "pending",
  },
  {
    id: 2,
    name: "Metformin 500mg",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "30 days",
    notes: "Take with meals",
    patientName: "Anna Wilson",
    doctor: "Dr. James Wilson",
    date: "2025-11-28",
    status: "pending",
  },
  {
    id: 3,
    name: "Atorvastatin 20mg",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "30 days",
    notes: "Take with meals",
    patientName: "James Wilson",
    doctor: "Dr. James Wilson",
    date: "2025-11-28",
    status: "prescribed",
  },
]

export function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions)
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successDrug, setSuccessDrug] = useState("")

  const pendingPrescriptions = prescriptions.filter(p => p.status === "pending")
  const prescribedPrescriptions = prescriptions.filter(p => p.status === "prescribed")

  const handleConfirmClick = (prescription: Prescription) => {
    setSelectedPrescription(prescription)
  }

  const handleConfirm = () => {
    if (selectedPrescription) {
      setPrescriptions(prev =>
        prev.map(p =>
          p.id === selectedPrescription.id ? { ...p, status: "prescribed" as const } : p
        )
      )
      setSuccessDrug(selectedPrescription.name)
      setSelectedPrescription(null)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }

  return (
    <div className="w-full max-w-none">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white border border-[#e7e8eb] rounded-xl shadow-lg px-6 py-4 flex items-center gap-4 min-w-[420px]">
            <div className="w-10 h-10 rounded-full bg-[#007bff] flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-semibold text-[#212529]">Drug Prescriptions Successfully</p>
              <p className="text-[14px] text-[#6c757d]">{successDrug} has been Prescribed successfully.</p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="p-1 hover:bg-[#f8f9fa] rounded-full transition-colors">
              <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Page Title */}
      <h1 className="text-[28px] font-semibold text-[#212529] mb-8">Patient Prescriptions Issued</h1>

      {/* Pending Prescriptions */}
      <div className="mb-8">
        <h2 className="text-[18px] font-semibold text-[#212529] mb-4">
          Pending Prescriptions ({pendingPrescriptions.length})
        </h2>

        <div className="bg-white rounded-xl border border-[#f1f3f5] shadow-[0px_4px_13px_0px_rgba(0,0,0,0.08)]">
          {pendingPrescriptions.length === 0 ? (
            <div className="px-6 py-12 text-center text-[14px] text-[#6c757d]">
              No pending prescriptions
            </div>
          ) : (
            pendingPrescriptions.map((item, index) => (
              <div key={item.id} className="px-6 py-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-9 w-9 rounded-full bg-[#e8f1ff] flex items-center justify-center flex-shrink-0">
                      <svg className="h-4 w-4 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="text-[13px] text-[#212529]">
                      <p className="text-[15px] font-medium mb-2">{item.name}</p>
                      <div className="space-y-1">
                        <p>Dosage: {item.dosage}</p>
                        <p>Frequency: {item.frequency}</p>
                        <p>Duration: {item.duration}</p>
                        <p>Notes: {item.notes}</p>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-[12px]">
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{item.patientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleConfirmClick(item)}
                    className="h-9 px-4 bg-[#212529] text-white text-[12px] rounded-lg hover:bg-[#000] transition-colors flex-shrink-0"
                  >
                    Confirm Prescriptions
                  </button>
                </div>
                {index < pendingPrescriptions.length - 1 && (
                  <div className="mt-5 border-t border-[#f1f3f5]"></div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Prescriptions Prescribed */}
      <div>
        <h2 className="text-[18px] font-semibold text-[#212529] mb-4">
          Prescriptions Prescribed ({prescribedPrescriptions.length})
        </h2>

        <div className="bg-white rounded-xl border border-[#f1f3f5] shadow-[0px_4px_13px_0px_rgba(0,0,0,0.08)]">
          {prescribedPrescriptions.length === 0 ? (
            <div className="px-6 py-12 text-center text-[14px] text-[#6c757d]">
              No confirmed prescriptions yet
            </div>
          ) : (
            prescribedPrescriptions.map((item, index) => (
              <div key={item.id} className="px-6 py-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-9 w-9 rounded-full bg-[#e8f1ff] flex items-center justify-center flex-shrink-0">
                      <svg className="h-4 w-4 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="text-[13px] text-[#212529]">
                      <p className="text-[15px] font-medium mb-2">{item.name}</p>
                      <div className="space-y-1">
                        <p>Dosage: {item.dosage}</p>
                        <p>Frequency: {item.frequency}</p>
                        <p>Duration: {item.duration}</p>
                        <p>Notes: {item.notes}</p>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-[12px]">
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{item.patientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="h-9 px-4 border border-[#e7e8eb] text-[#6c757d] text-[12px] rounded-lg flex items-center">
                    Prescribed
                  </span>
                </div>
                {index < prescribedPrescriptions.length - 1 && (
                  <div className="mt-5 border-t border-[#f1f3f5]"></div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confirm Prescription Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[600px]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <h2 className="text-[22px] font-semibold text-[#212529]">Confirm Drug Prescriptions</h2>
              <button
                onClick={() => setSelectedPrescription(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f8f9fa] transition-colors"
              >
                <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 pb-6">
              <p className="text-[14px] text-[#6c757d] mb-6">
                Please confirm that you are Prescribed this medication to {selectedPrescription.patientName}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-[12px] text-[#6c757d]">Drug Name</p>
                  <p className="text-[16px] font-semibold text-[#212529] mt-1">{selectedPrescription.name}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#6c757d]">Dosage & Frequency</p>
                  <p className="text-[16px] text-[#212529] mt-1">{selectedPrescription.dosage} - {selectedPrescription.frequency}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#6c757d]">Duration</p>
                  <p className="text-[16px] text-[#212529] mt-1">{selectedPrescription.duration}</p>
                </div>
              </div>

              <div className="border-t border-[#e7e8eb] pt-4">
                <p className="text-[14px] font-medium text-[#212529] mb-3">Prescriptions Record</p>
                <div className="space-y-2 text-[14px]">
                  <p className="text-[#212529]">Date: {new Date().toISOString().split('T')[0]}</p>
                  <p className="text-[#212529]">Pharmacist: John Smith</p>
                  <p className="text-[#212529]">Location: Main Street Pharmacy</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-[#e7e8eb]">
              <button
                onClick={() => setSelectedPrescription(null)}
                className="px-6 py-2 text-[14px] text-[#212529] hover:bg-[#f8f9fa] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-5 py-2 bg-[#212529] text-white rounded-lg text-[14px] hover:bg-[#000] transition-colors"
              >
                Confirm Prescriptions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
