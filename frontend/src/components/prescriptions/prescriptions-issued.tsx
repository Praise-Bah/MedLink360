"use client"

import { useState } from "react"
import { ConfirmPrescriptionModal } from "./confirm-prescription-modal"
import { SuccessNotification } from "./success-notification"

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

export function PrescriptionsIssued() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: "1",
      drugName: "Atorvastatin 20mg",
      dosage: "500mg",
      frequency: "Twice daily",
      duration: "30 days",
      notes: "Take with meals",
      patientName: "Mercy Johnson",
      patientId: "P-20035",
      date: "2025-11-28",
      status: "pending"
    },
    {
      id: "2",
      drugName: "Metformin 500mg",
      dosage: "500mg",
      frequency: "Twice daily",
      duration: "30 days",
      notes: "Take with meals",
      patientName: "Anna Wilson",
      patientId: "P-20036",
      date: "2025-11-28",
      status: "pending"
    },
    {
      id: "3",
      drugName: "Atorvastatin 20mg",
      dosage: "500mg",
      frequency: "Twice daily",
      duration: "30 days",
      notes: "Take with meals",
      patientName: "James Wilson",
      patientId: "P-20037",
      date: "2025-11-28",
      pharmacist: "John Smith",
      location: "Main Street Pharmacy",
      status: "prescribed"
    }
  ])

  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const pendingPrescriptions = prescriptions.filter(p => p.status === "pending")
  const prescribedPrescriptions = prescriptions.filter(p => p.status === "prescribed")

  const handleConfirmClick = (prescription: Prescription) => {
    setSelectedPrescription(prescription)
    setShowConfirmModal(true)
  }

  const handleConfirmPrescription = () => {
    if (selectedPrescription) {
      setPrescriptions(prescriptions.map(p => 
        p.id === selectedPrescription.id 
          ? { ...p, status: "prescribed" as const, pharmacist: "John Smith", location: "Main Street Pharmacy" }
          : p
      ))
      setShowConfirmModal(false)
      setSuccessMessage(`${selectedPrescription.drugName} has been Prescribed successfully.`)
      setShowSuccess(true)
      
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    }
  }

  return (
    <div className="w-full max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold text-[#212529]">Patient Prescriptions Issued</h1>
      </div>

      {/* Pending Prescriptions Section */}
      <div className="mb-8">
        <h2 className="text-[18px] font-semibold text-[#212529] mb-4">
          Pending Prescriptions ({pendingPrescriptions.length})
        </h2>

        <div className="space-y-4">
          {pendingPrescriptions.map((prescription) => (
            <div 
              key={prescription.id}
              className="bg-white border border-[#e7e8eb] rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Pill Icon */}
                  <div className="w-10 h-10 rounded-full bg-[#e3f2fd] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>

                  {/* Prescription Details */}
                  <div className="flex-1">
                    <h3 className="text-[18px] font-semibold text-[#212529] mb-3">
                      {prescription.drugName}
                    </h3>
                    <div className="space-y-1 text-[14px] text-[#6c757d]">
                      <p>Dosage: {prescription.dosage}</p>
                      <p>Frequency: {prescription.frequency}</p>
                      <p>Duration: {prescription.duration}</p>
                      <p>Notes: {prescription.notes}</p>
                    </div>

                    {/* Patient Info */}
                    <div className="flex items-center gap-4 mt-4 text-[14px] text-[#6c757d]">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{prescription.patientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{prescription.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={() => handleConfirmClick(prescription)}
                  className="px-6 py-2 bg-[#212529] text-white rounded-lg text-[14px] hover:bg-[#000000] transition-colors flex-shrink-0"
                >
                  Confirm Prescriptions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prescribed Section */}
      <div>
        <h2 className="text-[18px] font-semibold text-[#212529] mb-4">
          Prescriptions Prescribed ({prescribedPrescriptions.length})
        </h2>

        <div className="space-y-4">
          {prescribedPrescriptions.map((prescription) => (
            <div 
              key={prescription.id}
              className="bg-white border border-[#e7e8eb] rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Pill Icon */}
                  <div className="w-10 h-10 rounded-full bg-[#e3f2fd] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>

                  {/* Prescription Details */}
                  <div className="flex-1">
                    <h3 className="text-[18px] font-semibold text-[#212529] mb-3">
                      {prescription.drugName}
                    </h3>
                    <div className="space-y-1 text-[14px] text-[#6c757d]">
                      <p>Dosage: {prescription.dosage}</p>
                      <p>Frequency: {prescription.frequency}</p>
                      <p>Duration: {prescription.duration}</p>
                      <p>Notes: {prescription.notes}</p>
                    </div>

                    {/* Patient Info */}
                    <div className="flex items-center gap-4 mt-4 text-[14px] text-[#6c757d]">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{prescription.patientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{prescription.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prescribed Badge */}
                <div className="px-6 py-2 border border-[#e7e8eb] text-[#6c757d] rounded-lg text-[14px] flex-shrink-0">
                  Prescribed
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedPrescription && (
        <ConfirmPrescriptionModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmPrescription}
          prescription={selectedPrescription}
        />
      )}

      {/* Success Notification */}
      <SuccessNotification
        isVisible={showSuccess}
        message={successMessage}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  )
}
