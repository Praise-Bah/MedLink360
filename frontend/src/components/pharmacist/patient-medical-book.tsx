"use client"

import { useState } from "react"
import { ConfirmDispenseModal } from "./confirm-dispense-modal"
import { DispenseSuccessNotification } from "./dispense-success-notification"

interface Prescription {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  notes: string
  doctor: string
  date: string
  status: "pending" | "dispensed"
}

interface PatientMedicalBookProps {
  patientId: string
  patientName: string
  patientIdDisplay: string
  age: number
  gender: string
  bloodType: string
  allergies: string[]
  medicalHistory: string[]
  onBack?: () => void
}

export function PatientMedicalBook({
  patientId,
  patientName,
  patientIdDisplay,
  age,
  gender,
  bloodType,
  allergies,
  medicalHistory,
  onBack
}: PatientMedicalBookProps) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: "1",
      name: "Metformin 500mg",
      dosage: "500mg",
      frequency: "Twice daily",
      duration: "30 days",
      notes: "Take with meals",
      doctor: "Dr. James Wilson",
      date: "2025-11-28",
      status: "pending"
    },
    {
      id: "2",
      name: "Atorvastatin 20mg",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      duration: "30 days",
      notes: "Take with meals",
      doctor: "Dr. James Wilson",
      date: "2025-11-28",
      status: "pending"
    },
    {
      id: "3",
      name: "Lisinopril 10mg",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "30 days",
      notes: "Monitor blood pressure",
      doctor: "Dr. James Wilson",
      date: "2025-11-28",
      status: "pending"
    },
    {
      id: "4",
      name: "Atorvastatin 20mg",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      duration: "30 days",
      notes: "",
      doctor: "Dr. James Wilson",
      date: "2025-11-25",
      status: "dispensed"
    }
  ])

  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [lastDispensedDrug, setLastDispensedDrug] = useState("")

  const pendingPrescriptions = prescriptions.filter(p => p.status === "pending")
  const dispensedPrescriptions = prescriptions.filter(p => p.status === "dispensed")

  const handleConfirmDispense = (prescriptionId: string) => {
    const prescription = prescriptions.find(p => p.id === prescriptionId)
    if (prescription) {
      setSelectedPrescription(prescription)
      setShowConfirmModal(true)
    }
  }

  const handleDispenseConfirmed = () => {
    if (selectedPrescription) {
      setPrescriptions(prev =>
        prev.map(p =>
          p.id === selectedPrescription.id ? { ...p, status: "dispensed" as const } : p
        )
      )
      setLastDispensedDrug(selectedPrescription.name)
      setShowConfirmModal(false)
      setSelectedPrescription(null)
      setShowSuccessNotification(true)
      
      setTimeout(() => {
        setShowSuccessNotification(false)
      }, 4000)
    }
  }

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-[#f8f9fa] rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-[24px] font-semibold text-[#212529]">Patient Medical Book</h1>
      </div>

      {/* Patient Info Card */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <p className="text-[13px] font-semibold text-[#6c757d] mb-1">Patient Name</p>
              <p className="text-[16px] font-medium text-[#212529]">{patientName}</p>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#6c757d] mb-1">Age / Sex</p>
              <p className="text-[16px] font-medium text-[#212529]">{age} / {gender}</p>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#6c757d] mb-2">Allergies</p>
              <div className="flex flex-wrap gap-2">
                {allergies.map((allergy, i) => (
                  <span
                    key={i}
                    className="bg-[#ef1e1e] text-[#f4f4f4] text-[13px] font-medium px-4 py-2 rounded-lg"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#6c757d] mb-2">Medical History</p>
              <div className="flex flex-wrap gap-4">
                {medicalHistory.map((condition, i) => (
                  <span
                    key={i}
                    className="bg-[rgba(30,135,240,0.2)] text-[#212529] text-[13px] font-medium px-4 py-2"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <p className="text-[13px] font-semibold text-[#6c757d] mb-1">Patient ID</p>
              <p className="text-[16px] font-medium text-[#212529]">{patientIdDisplay}</p>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#6c757d] mb-1">Blood Type</p>
              <p className="text-[16px] font-medium text-[#212529]">{bloodType}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Prescriptions */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-6">
        <h2 className="text-[16px] font-medium text-black mb-4">
          Pending Prescriptions ({pendingPrescriptions.length})
        </h2>
        <div className="space-y-4">
          {pendingPrescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="bg-white rounded-lg border border-[#e7e8eb] shadow-[0px_0px_4px_0px_rgba(33,37,41,0.1)] p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Pill Icon */}
                  <div className="w-6 h-6 flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-[#007bff]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.73 14.87L14.87 19.73C14.39 20.21 13.76 20.5 13.06 20.5C12.36 20.5 11.73 20.21 11.25 19.73L4.27 12.75C3.79 12.27 3.5 11.64 3.5 10.94C3.5 10.24 3.79 9.61 4.27 9.13L9.13 4.27C9.61 3.79 10.24 3.5 10.94 3.5C11.64 3.5 12.27 3.79 12.75 4.27L19.73 11.25C20.21 11.73 20.5 12.36 20.5 13.06C20.5 13.76 20.21 14.39 19.73 14.87ZM10.94 5.5L5.5 10.94C5.5 10.94 5.5 10.94 5.5 10.94L12.5 17.94L17.94 12.5L10.94 5.5Z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-normal text-black mb-2">{prescription.name}</h3>
                    <div className="space-y-1 text-[16px] text-black font-light">
                      <p>Dosage: {prescription.dosage}</p>
                      <p>Frequency: {prescription.frequency}</p>
                      <p>Duration: {prescription.duration}</p>
                      <p>Notes: {prescription.notes}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-[14px] text-[#6c757d]">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{prescription.doctor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span>{prescription.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleConfirmDispense(prescription.id)}
                  className="bg-[#212529] text-white text-[16px] font-normal px-4 py-3 rounded-lg hover:bg-[#343a40] transition-colors"
                >
                  Confirm Dispense
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dispensed Prescriptions */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] shadow-[0px_4px_13px_0px_rgba(0,0,0,0.08)] p-6">
        <h2 className="text-[16px] font-medium text-black mb-4">
          Dispensed Prescriptions ({dispensedPrescriptions.length})
        </h2>
        <div className="space-y-4">
          {dispensedPrescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="bg-white rounded-lg shadow-[0px_0px_4px_0px_rgba(33,37,41,0.1)] px-4 py-5"
            >
              <div className="flex items-center gap-4">
                {/* Green Checkmark */}
                <div className="w-6 h-6 flex-shrink-0">
                  <svg className="w-6 h-6 text-[#28a745]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-[20px] font-normal text-black">{prescription.name}</h3>
                  <p className="text-[16px] font-light text-black">
                    {prescription.dosage} - {prescription.frequency}
                  </p>
                </div>
                <span className="bg-[#e3e3e3] border border-[#767676] text-[#1e1e1e] text-[16px] font-normal px-3 py-2 rounded-lg">
                  Dispensed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Dispense Modal */}
      {showConfirmModal && selectedPrescription && (
        <ConfirmDispenseModal
          patientName={patientName}
          drugName={selectedPrescription.name}
          dosage={selectedPrescription.dosage}
          frequency={selectedPrescription.frequency}
          duration={selectedPrescription.duration}
          onConfirm={handleDispenseConfirmed}
          onCancel={() => {
            setShowConfirmModal(false)
            setSelectedPrescription(null)
          }}
        />
      )}

      {/* Success Notification */}
      {showSuccessNotification && (
        <DispenseSuccessNotification
          drugName={lastDispensedDrug}
          onClose={() => setShowSuccessNotification(false)}
        />
      )}
    </div>
  )
}
