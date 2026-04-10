"use client"

import { useState } from "react"
import { ConfirmDispenseModal } from "./confirm-dispense-modal"
import { DispenseSuccessNotification } from "./dispense-success-notification"

interface Prescription {
  id: string
  patientName: string
  patientId: string
  drugName: string
  dosage: string
  frequency: string
  duration: string
  notes: string
  doctorName: string
  date: string
  status: "pending" | "dispensed"
}

const initialPrescriptions: Prescription[] = [
  {
    id: "RX001",
    patientName: "James Will",
    patientId: "PT-10234",
    drugName: "Metformin 500mg",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "30 days",
    notes: "Take with meals",
    doctorName: "Dr. James Wilson",
    date: "2025-11-28",
    status: "pending"
  },
  {
    id: "RX002",
    patientName: "Sarah Johnson",
    patientId: "PT-10235",
    drugName: "Atorvastatin 20mg",
    dosage: "20mg",
    frequency: "Twice daily",
    duration: "30 days",
    notes: "Take with meals",
    doctorName: "Dr. James Wilson",
    date: "2025-11-28",
    status: "pending"
  },
  {
    id: "RX003",
    patientName: "Michael Chen",
    patientId: "PT-10236",
    drugName: "Lisinopril 10mg",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "30 days",
    notes: "Take in the morning",
    doctorName: "Dr. Emily Brown",
    date: "2025-11-27",
    status: "pending"
  }
]

export function PendingPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions)
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successDrug, setSuccessDrug] = useState("")

  const pendingPrescriptions = prescriptions.filter(p => p.status === "pending")

  const handleConfirmDispense = (prescription: Prescription) => {
    setSelectedPrescription(prescription)
  }

  const handleConfirm = () => {
    if (selectedPrescription) {
      setPrescriptions(prev =>
        prev.map(p =>
          p.id === selectedPrescription.id ? { ...p, status: "dispensed" as const } : p
        )
      )
      setSuccessDrug(selectedPrescription.drugName)
      setSelectedPrescription(null)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-semibold text-[#212529]">Pending Prescriptions</h1>
      </div>

      {/* Pending Prescriptions Section */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-[18px] font-medium text-[#212529]">Pending Prescriptions</h2>
          <span className="text-[14px] text-[#6c757d]">({pendingPrescriptions.length})</span>
        </div>

        <div className="space-y-4">
          {pendingPrescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="bg-white rounded-lg shadow-[0px_0px_4px_0px_rgba(33,37,41,0.1)] p-5"
            >
              <div className="flex items-start justify-between">
                {/* Left Content */}
                <div className="flex items-start gap-4">
                  {/* Pill Icon */}
                  <div className="w-[50px] h-[43px] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#007bff]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.73 14.87L14.87 19.73C14.1 20.5 13.1 20.88 12.07 20.88C11.04 20.88 10.04 20.5 9.27 19.73L4.27 14.73C2.73 13.19 2.73 10.71 4.27 9.17L9.13 4.31C9.9 3.54 10.9 3.16 11.93 3.16C12.96 3.16 13.96 3.54 14.73 4.31L19.73 9.31C21.27 10.85 21.27 13.33 19.73 14.87ZM11.93 4.66C11.3 4.66 10.7 4.9 10.24 5.36L5.38 10.22C4.46 11.14 4.46 12.66 5.38 13.58L10.38 18.58C10.84 19.04 11.44 19.28 12.07 19.28C12.7 19.28 13.3 19.04 13.76 18.58L18.62 13.72C19.54 12.8 19.54 11.28 18.62 10.36L13.62 5.36C13.16 4.9 12.56 4.66 11.93 4.66Z"/>
                      <path d="M12 12L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>

                  {/* Prescription Details */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-[20px] font-normal text-black mb-1">{prescription.drugName}</h3>
                      <div className="flex items-center gap-2 text-[16px] font-light text-black">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Patient Name : {prescription.patientName}</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-[16px] font-light text-black">
                      <p>Dosage: {prescription.dosage}</p>
                      <p>Frequency: {prescription.frequency}</p>
                      <p>Duration: {prescription.duration}</p>
                      <p>Notes: {prescription.notes}</p>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2 text-[16px] font-light text-black">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{prescription.doctorName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[16px] font-light text-black">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={1.5}/>
                          <path d="M16 2v4M8 2v4M3 10h18" strokeWidth={1.5} strokeLinecap="round"/>
                        </svg>
                        <span>{prescription.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={() => handleConfirmDispense(prescription)}
                  className="bg-[#212529] text-white text-[16px] font-normal px-4 py-3 rounded-lg hover:bg-[#343a40] transition-colors"
                >
                  Confirm Dispense
                </button>
              </div>
            </div>
          ))}

          {pendingPrescriptions.length === 0 && (
            <div className="text-center py-12 text-[#6c757d]">
              <svg className="w-16 h-16 mx-auto mb-4 text-[#e9ecef]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[18px] font-medium">No pending prescriptions</p>
              <p className="text-[14px]">All prescriptions have been dispensed</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Dispense Modal */}
      {selectedPrescription && (
        <ConfirmDispenseModal
          patientName={selectedPrescription.patientName}
          drugName={selectedPrescription.drugName}
          dosage={selectedPrescription.dosage}
          frequency={selectedPrescription.frequency}
          duration={selectedPrescription.duration}
          onConfirm={handleConfirm}
          onCancel={() => setSelectedPrescription(null)}
        />
      )}

      {/* Success Notification */}
      {showSuccess && (
        <DispenseSuccessNotification
          drugName={successDrug}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  )
}
