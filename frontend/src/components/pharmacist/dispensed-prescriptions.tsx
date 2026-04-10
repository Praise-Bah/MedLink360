"use client"

import { useState } from "react"

interface DispensedPrescription {
  id: string
  patientName: string
  patientId: string
  drugName: string
  dosage: string
  frequency: string
  dispensedDate: string
}

const dispensedPrescriptions: DispensedPrescription[] = [
  {
    id: "RX101",
    patientName: "Michael Chen",
    patientId: "PT-10235",
    drugName: "Atorvastatin 20mg",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    dispensedDate: "2025-11-28"
  },
  {
    id: "RX102",
    patientName: "Emily Rodriguez",
    patientId: "PT-10236",
    drugName: "Atorvastatin 20mg",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    dispensedDate: "2025-11-28"
  },
  {
    id: "RX103",
    patientName: "David Williams",
    patientId: "PT-10237",
    drugName: "Amoxicillin 500mg",
    dosage: "500mg",
    frequency: "Once daily at bedtime",
    dispensedDate: "2025-11-27"
  },
  {
    id: "RX104",
    patientName: "Lisa Anderson",
    patientId: "PT-10238",
    drugName: "Ibuprofen 400mg",
    dosage: "400mg",
    frequency: "Once daily at bedtime",
    dispensedDate: "2025-11-27"
  }
]

export function DispensedPrescriptions() {
  const [prescriptions] = useState<DispensedPrescription[]>(dispensedPrescriptions)

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-semibold text-[#212529]">Dispensed Prescriptions</h1>
      </div>

      {/* Dispensed Prescriptions Section */}
      <div className="bg-white rounded-lg border border-[#e7e8eb] p-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-[18px] font-medium text-[#212529]">Dispensed Prescriptions</h2>
          <span className="text-[14px] text-[#6c757d]">({prescriptions.length})</span>
        </div>

        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="bg-white rounded-lg shadow-[0px_0px_4px_0px_rgba(33,37,41,0.1)] p-5"
            >
              <div className="flex items-center gap-4">
                {/* Green Checkmark */}
                <div className="w-6 h-6 flex-shrink-0">
                  <svg className="w-6 h-6 text-[#28a745]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>

                {/* Prescription Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div className="text-[16px] font-light text-black">
                      <span>Patient Name : {prescription.patientName}</span>
                      <p className="text-[14px] text-[#6c757d]">{prescription.patientId}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-normal text-black">{prescription.drugName}</h3>
                    <p className="text-[16px] font-light text-black">{prescription.dosage} - {prescription.frequency}</p>
                  </div>
                </div>

                {/* Dispensed Badge */}
                <button
                  disabled
                  className="bg-[#e3e3e3] text-[#1e1e1e] text-[16px] font-normal px-4 py-3 rounded-lg cursor-default border border-[#767676]"
                >
                  Dispensed
                </button>
              </div>
            </div>
          ))}

          {prescriptions.length === 0 && (
            <div className="text-center py-12 text-[#6c757d]">
              <svg className="w-16 h-16 mx-auto mb-4 text-[#e9ecef]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-[18px] font-medium">No dispensed prescriptions</p>
              <p className="text-[14px]">Dispensed prescriptions will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
