"use client"

import { useState } from "react"

interface NursePatientMedicalBookProps {
  patientId: string
  patientName: string
  patientIdDisplay: string
  age: number
  gender: string
  bloodType: string
  allergies: string[]
  medicalHistory: string[]
  onBack: () => void
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  notes: string
  prescribedBy: string
  prescribedDate: string
  status: "pending" | "administered" | "held"
  nextDue?: string
}

interface VitalRecord {
  id: string
  timestamp: string
  temperature: string
  bloodPressure: string
  heartRate: string
  respiratoryRate: string
  oxygenSaturation: string
  recordedBy: string
}

interface Note {
  id: string
  content: string
  timestamp: string
  nurseName: string
  type: "observation" | "medication" | "procedure" | "general"
}

export function NursePatientMedicalBook({
  patientId,
  patientName,
  patientIdDisplay,
  age,
  gender,
  bloodType,
  allergies,
  medicalHistory,
  onBack
}: NursePatientMedicalBookProps) {
  const [activeTab, setActiveTab] = useState<"medications" | "lab-results" | "vitals" | "notes">("medications")
  const [showRecordVitalsModal, setShowRecordVitalsModal] = useState(false)
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "MED001",
      name: "Metformin 500mg",
      dosage: "500mg",
      frequency: "Twice daily",
      duration: "30 days",
      notes: "Take with meals",
      prescribedBy: "Dr. James Wilson",
      prescribedDate: "2025-11-28",
      status: "pending",
      nextDue: "10:00 AM"
    },
    {
      id: "MED002",
      name: "Atorvastatin 20mg",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      duration: "30 days",
      notes: "Monitor for muscle pain",
      prescribedBy: "Dr. James Wilson",
      prescribedDate: "2025-11-28",
      status: "pending",
      nextDue: "8:00 PM"
    },
    {
      id: "MED003",
      name: "Lisinopril 10mg",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "Ongoing",
      notes: "For blood pressure control",
      prescribedBy: "Dr. Sarah Chen",
      prescribedDate: "2025-11-20",
      status: "administered"
    }
  ])

  const [vitals] = useState<VitalRecord[]>([
    {
      id: "V001",
      timestamp: "Today, 08:00 AM",
      temperature: "98.6°F",
      bloodPressure: "128/82",
      heartRate: "78 bpm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%",
      recordedBy: "Sarah Johnson, RN"
    },
    {
      id: "V002",
      timestamp: "Yesterday, 08:00 PM",
      temperature: "98.4°F",
      bloodPressure: "130/85",
      heartRate: "75 bpm",
      respiratoryRate: "15/min",
      oxygenSaturation: "97%",
      recordedBy: "Emily Davis, RN"
    }
  ])

  const [newVitals, setNewVitals] = useState({
    temperature: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    notes: ""
  })

  const [newNote, setNewNote] = useState("")

  const handleAdministerMedication = (medId: string) => {
    setMedications(medications.map(med => 
      med.id === medId ? { ...med, status: "administered" as const } : med
    ))
  }

  const handleHoldMedication = (medId: string) => {
    setMedications(medications.map(med => 
      med.id === medId ? { ...med, status: "held" as const } : med
    ))
  }

  const handleRecordVitals = () => {
    console.log("Recording vitals:", newVitals)
    setShowRecordVitalsModal(false)
    setNewVitals({
      temperature: "",
      bloodPressureSystolic: "",
      bloodPressureDiastolic: "",
      heartRate: "",
      respiratoryRate: "",
      oxygenSaturation: "",
      notes: ""
    })
  }

  const handleAddNote = () => {
    console.log("Adding note:", newNote)
    setShowAddNoteModal(false)
    setNewNote("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "administered":
        return <span className="px-2 py-1 bg-[#d1fae5] text-[#059669] rounded-full text-[11px] font-medium">Administered</span>
      case "held":
        return <span className="px-2 py-1 bg-[#fef3c7] text-[#d97706] rounded-full text-[11px] font-medium">Held</span>
      default:
        return <span className="px-2 py-1 bg-[#e8f4fd] text-[#007bff] rounded-full text-[11px] font-medium">Pending</span>
    }
  }

  return (
    <div className="w-full max-w-none">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#f8f9fa] transition-colors"
        >
          <svg className="w-4 h-4 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-[30px] font-bold text-[#212529] tracking-[-0.75px]">Patient Medical Book</h1>
          <p className="text-[16px] text-[#212529]">Complete medical record and history</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#6c757d] hover:bg-[#f8f9fa] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
          <button 
            onClick={() => setShowAddNoteModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] hover:bg-[#0056b3] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Add Note
          </button>
          <button 
            onClick={() => setShowRecordVitalsModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#6c757d] hover:bg-[#f8f9fa] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Record Vitals
          </button>
        </div>
      </div>

      {/* Patient Information Card */}
      <div className="bg-white rounded-xl border border-[#e7e8eb] p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="text-[18px] font-semibold text-[#212529]">Patient Information</h2>
          </div>
          <span className="px-3 py-1 bg-[#d1fae5] text-[#059669] rounded-full text-[12px] font-medium">
            stable
          </span>
        </div>

        <div className="grid grid-cols-5 gap-6 mb-4">
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Patient Name</p>
            <p className="text-[14px] font-medium text-[#212529]">{patientName}</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Patient ID</p>
            <p className="text-[14px] font-medium text-[#212529]">{patientIdDisplay}</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Email</p>
            <p className="text-[14px] font-medium text-[#212529]">sarah.j@email.com</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Age / Sex</p>
            <p className="text-[14px] font-medium text-[#212529]">{age} / {gender}</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Phone</p>
            <p className="text-[14px] font-medium text-[#212529]">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6">
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Weight</p>
            <p className="text-[14px] font-medium text-[#212529]">62 kg</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Blood Group</p>
            <p className="text-[14px] font-medium text-[#212529]">{bloodType}</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Height</p>
            <p className="text-[14px] font-medium text-[#212529]">165 cm</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Room / Bed</p>
            <p className="text-[14px] font-medium text-[#212529]">Ward 12A / Bed 3</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Admission Date</p>
            <p className="text-[14px] font-medium text-[#212529]">2025-02-25</p>
          </div>
        </div>
      </div>

      {/* Medical Information Card */}
      <div className="bg-white rounded-xl border border-[#e7e8eb] p-6 mb-6">
        <h2 className="text-[18px] font-semibold text-[#212529] mb-4">Medical Information</h2>
        
        <div className="grid grid-cols-3 gap-6 mb-4">
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Primary Physician</p>
            <p className="text-[14px] font-medium text-[#212529]">Dr. James Wilson</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-2">Known Allergies</p>
            <div className="flex flex-wrap gap-2">
              {allergies.length > 0 ? allergies.map((allergy, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-[#fee2e2] text-[#dc2626] rounded-full text-[12px] font-medium"
                >
                  {allergy}
                </span>
              )) : (
                <p className="text-[14px] text-[#212529]">None known</p>
              )}
            </div>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-2">Chronic Conditions</p>
            <div className="flex flex-wrap gap-2">
              {medicalHistory.map((condition, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-[#e8f4fd] text-[#007bff] rounded-full text-[12px] font-medium border border-[#007bff]"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-[12px] text-[#6c757d] mb-1">Current Medications</p>
          <p className="text-[14px] font-medium text-[#212529]">Metformin 500mg twice daily, Atorvastatin 20mg daily, Lisinopril 10mg daily</p>
        </div>
      </div>

      {/* Other Information Card */}
      <div className="bg-white rounded-xl border border-[#e7e8eb] p-6 mb-6">
        <h2 className="text-[18px] font-semibold text-[#212529] mb-4">Other Information</h2>
        
        <div className="grid grid-cols-5 gap-6">
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Next of Kin Name</p>
            <p className="text-[14px] font-medium text-[#212529]">John Johnson</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Relationship</p>
            <p className="text-[14px] font-medium text-[#212529]">Spouse</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Phone</p>
            <p className="text-[14px] font-medium text-[#212529]">+1 (555) 123-4568</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Last Visit</p>
            <p className="text-[14px] font-medium text-[#212529]">2025-02-28</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Attending Nurse</p>
            <p className="text-[14px] font-medium text-[#212529]">Sarah Johnson, RN</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button 
          onClick={() => setActiveTab("medications")}
          className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
            activeTab === "medications" 
              ? "bg-[#007bff] text-white" 
              : "text-[#6c757d] hover:bg-[#f8f9fa]"
          }`}
        >
          Medications
        </button>
        <button 
          onClick={() => setActiveTab("lab-results")}
          className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
            activeTab === "lab-results" 
              ? "bg-[#007bff] text-white" 
              : "text-[#6c757d] hover:bg-[#f8f9fa]"
          }`}
        >
          Lab Results
        </button>
        <button 
          onClick={() => setActiveTab("vitals")}
          className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
            activeTab === "vitals" 
              ? "bg-[#007bff] text-white" 
              : "text-[#6c757d] hover:bg-[#f8f9fa]"
          }`}
        >
          Vitals
        </button>
        <button 
          onClick={() => setActiveTab("notes")}
          className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
            activeTab === "notes" 
              ? "bg-[#007bff] text-white" 
              : "text-[#6c757d] hover:bg-[#f8f9fa]"
          }`}
        >
          Notes
        </button>
      </div>

      {/* Medications Tab */}
      {activeTab === "medications" && (
        <div className="bg-white rounded-xl border border-[#e9ecef]">
          <div className="p-4 border-b border-[#e9ecef] flex items-center justify-between">
            <h3 className="text-[16px] font-semibold text-[#212529]">
              Pending Medications ({medications.filter(m => m.status === "pending").length})
            </h3>
          </div>
          <div className="divide-y divide-[#e9ecef]">
            {medications.map((med) => (
              <div key={med.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#e8f4fd] flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[16px] font-semibold text-[#212529]">{med.name}</p>
                        {getStatusBadge(med.status)}
                      </div>
                      <p className="text-[13px] text-[#007bff]">Dosage: {med.dosage}</p>
                      <p className="text-[13px] text-[#007bff]">Frequency: {med.frequency}</p>
                      <p className="text-[13px] text-[#007bff]">Duration: {med.duration}</p>
                      <p className="text-[13px] text-[#007bff]">Notes: {med.notes}</p>
                      <div className="flex items-center gap-4 mt-2 text-[12px] text-[#6c757d]">
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {med.prescribedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {med.prescribedDate}
                        </span>
                        {med.nextDue && (
                          <span className="flex items-center gap-1 text-[#d97706] font-medium">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Next due: {med.nextDue}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {med.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleHoldMedication(med.id)}
                        className="px-4 py-2 border border-[#d97706] text-[#d97706] rounded-lg text-[13px] font-medium hover:bg-[#fef3c7] transition-colors"
                      >
                        Hold
                      </button>
                      <button
                        onClick={() => handleAdministerMedication(med.id)}
                        className="px-4 py-2 bg-[#007bff] text-white rounded-lg text-[13px] font-medium hover:bg-[#0056b3] transition-colors"
                      >
                        Administer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lab Results Tab */}
      {activeTab === "lab-results" && (
        <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
          <h3 className="text-[18px] font-semibold text-[#212529] mb-4">Lab Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e7e8eb]">
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Test Name</th>
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Result</th>
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Normal Range</th>
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Date</th>
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#e7e8eb] hover:bg-[#f8f9fa]">
                  <td className="py-4 px-4 text-[14px] text-[#212529]">Blood Glucose (Fasting)</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">126 mg/dL</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">70-100 mg/dL</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">2025-02-28</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-[#fef3c7] text-[#d97706] rounded-full text-[11px] font-medium">High</span>
                  </td>
                </tr>
                <tr className="border-b border-[#e7e8eb] hover:bg-[#f8f9fa]">
                  <td className="py-4 px-4 text-[14px] text-[#212529]">HbA1c</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">7.2%</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">&lt;5.7%</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">2025-02-28</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-[#fef3c7] text-[#d97706] rounded-full text-[11px] font-medium">High</span>
                  </td>
                </tr>
                <tr className="border-b border-[#e7e8eb] hover:bg-[#f8f9fa]">
                  <td className="py-4 px-4 text-[14px] text-[#212529]">Total Cholesterol</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">195 mg/dL</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">&lt;200 mg/dL</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">2025-02-28</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-[#d1fae5] text-[#059669] rounded-full text-[11px] font-medium">Normal</span>
                  </td>
                </tr>
                <tr className="border-b border-[#e7e8eb] hover:bg-[#f8f9fa]">
                  <td className="py-4 px-4 text-[14px] text-[#212529]">Blood Pressure</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">142/88 mmHg</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">&lt;120/80 mmHg</td>
                  <td className="py-4 px-4 text-[14px] text-[#6c757d]">2025-02-28</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-[#fee2e2] text-[#dc2626] rounded-full text-[11px] font-medium">High</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vitals Tab */}
      {activeTab === "vitals" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowRecordVitalsModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Record Vitals
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#e9ecef]">
            <div className="p-4 border-b border-[#e9ecef]">
              <h3 className="text-[16px] font-semibold text-[#212529]">Vital Signs History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f8f9fa] border-b border-[#e9ecef]">
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">Date/Time</th>
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">Temp</th>
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">BP</th>
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">HR</th>
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">RR</th>
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">O2 Sat</th>
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">Recorded By</th>
                  </tr>
                </thead>
                <tbody>
                  {vitals.map((vital) => (
                    <tr key={vital.id} className="border-b border-[#f8f9fa]">
                      <td className="py-3 px-4 text-[13px] text-[#212529]">{vital.timestamp}</td>
                      <td className="py-3 px-4 text-[13px] text-[#212529]">{vital.temperature}</td>
                      <td className="py-3 px-4 text-[13px] text-[#212529]">{vital.bloodPressure}</td>
                      <td className="py-3 px-4 text-[13px] text-[#212529]">{vital.heartRate}</td>
                      <td className="py-3 px-4 text-[13px] text-[#212529]">{vital.respiratoryRate}</td>
                      <td className="py-3 px-4 text-[13px] text-[#212529]">{vital.oxygenSaturation}</td>
                      <td className="py-3 px-4 text-[13px] text-[#6c757d]">{vital.recordedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === "notes" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddNoteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Note
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#e9ecef] p-6">
            <div className="space-y-4">
              <div className="p-4 bg-[#f8f9fa] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[14px] font-medium text-[#212529]">Sarah Johnson, RN</p>
                  <p className="text-[12px] text-[#6c757d]">Today, 08:30 AM</p>
                </div>
                <p className="text-[14px] text-[#6c757d]">
                  Patient stable. BP readings showing improvement after medication adjustment. Continue monitoring every 4 hours. Patient reports no discomfort.
                </p>
              </div>
              <div className="p-4 bg-[#f8f9fa] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[14px] font-medium text-[#212529]">Emily Davis, RN</p>
                  <p className="text-[12px] text-[#6c757d]">Yesterday, 11:00 PM</p>
                </div>
                <p className="text-[14px] text-[#6c757d]">
                  Night shift: Patient rested well. All vitals stable. No complaints of pain or discomfort. Medications administered as scheduled.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Record Vitals Modal */}
      {showRecordVitalsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg mx-4">
            <div className="p-6 border-b border-[#e9ecef]">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold text-[#212529]">Record Vital Signs</h3>
                <button 
                  onClick={() => setShowRecordVitalsModal(false)}
                  className="p-2 hover:bg-[#f8f9fa] rounded-lg"
                >
                  <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Temperature (°F)</label>
                  <input
                    type="text"
                    value={newVitals.temperature}
                    onChange={(e) => setNewVitals({ ...newVitals, temperature: e.target.value })}
                    placeholder="98.6"
                    className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Heart Rate (bpm)</label>
                  <input
                    type="text"
                    value={newVitals.heartRate}
                    onChange={(e) => setNewVitals({ ...newVitals, heartRate: e.target.value })}
                    placeholder="72"
                    className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Blood Pressure (mmHg)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newVitals.bloodPressureSystolic}
                    onChange={(e) => setNewVitals({ ...newVitals, bloodPressureSystolic: e.target.value })}
                    placeholder="120"
                    className="flex-1 px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                  />
                  <span className="text-[#6c757d]">/</span>
                  <input
                    type="text"
                    value={newVitals.bloodPressureDiastolic}
                    onChange={(e) => setNewVitals({ ...newVitals, bloodPressureDiastolic: e.target.value })}
                    placeholder="80"
                    className="flex-1 px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-[#6c757d] mb-1">O2 Saturation (%)</label>
                  <input
                    type="text"
                    value={newVitals.oxygenSaturation}
                    onChange={(e) => setNewVitals({ ...newVitals, oxygenSaturation: e.target.value })}
                    placeholder="98"
                    className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Respiratory Rate (/min)</label>
                  <input
                    type="text"
                    value={newVitals.respiratoryRate}
                    onChange={(e) => setNewVitals({ ...newVitals, respiratoryRate: e.target.value })}
                    placeholder="16"
                    className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Notes (Optional)</label>
                <textarea
                  value={newVitals.notes}
                  onChange={(e) => setNewVitals({ ...newVitals, notes: e.target.value })}
                  placeholder="Additional observations..."
                  rows={3}
                  className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff] resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-[#e9ecef] flex gap-3">
              <button
                onClick={() => setShowRecordVitalsModal(false)}
                className="flex-1 px-4 py-2 border border-[#e9ecef] text-[#6c757d] rounded-lg text-[14px] font-medium hover:bg-[#f8f9fa] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRecordVitals}
                className="flex-1 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
              >
                Save Vitals
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showAddNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg mx-4">
            <div className="p-6 border-b border-[#e9ecef]">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold text-[#212529]">Add Nursing Note</h3>
                <button 
                  onClick={() => setShowAddNoteModal(false)}
                  className="p-2 hover:bg-[#f8f9fa] rounded-lg"
                >
                  <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Note</label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter your nursing note..."
                rows={6}
                className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff] resize-none"
              />
            </div>

            <div className="p-6 border-t border-[#e9ecef] flex gap-3">
              <button
                onClick={() => setShowAddNoteModal(false)}
                className="flex-1 px-4 py-2 border border-[#e9ecef] text-[#6c757d] rounded-lg text-[14px] font-medium hover:bg-[#f8f9fa] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="flex-1 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
