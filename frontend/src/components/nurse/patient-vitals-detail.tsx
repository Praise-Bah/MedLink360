"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

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

interface PatientVitalsDetailProps {
  patientId: string
}

export function PatientVitalsDetail({ patientId }: PatientVitalsDetailProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"vitals" | "medications" | "notes">("vitals")
  const [showRecordModal, setShowRecordModal] = useState(false)
  const [newVitals, setNewVitals] = useState({
    temperature: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    notes: ""
  })

  const patient = {
    id: patientId,
    name: "Ateeq Rafiq",
    initials: "AR",
    age: 28,
    gender: "Male",
    room: "Ward 12A",
    bed: "Bed 3",
    bloodType: "O+",
    allergies: ["Penicillin", "Aspirin"],
    status: "stable" as const,
    admissionDate: "Jan 15, 2024",
    diagnosis: "Stage 2 Hypertension",
    doctor: "Dr. Sarah Wilson",
    phone: "+1 234 567 890",
    emergencyContact: "John Rafiq - Brother (+1 234 567 891)"
  }

  const vitalRecords: VitalRecord[] = [
    {
      id: "V001",
      timestamp: "Today, 08:00 AM",
      temperature: "98.6°F",
      bloodPressure: "140/90 mmHg",
      heartRate: "78 bpm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%",
      recordedBy: "Nurse Sarah Johnson"
    },
    {
      id: "V002",
      timestamp: "Today, 04:00 AM",
      temperature: "98.4°F",
      bloodPressure: "145/92 mmHg",
      heartRate: "82 bpm",
      respiratoryRate: "18/min",
      oxygenSaturation: "97%",
      recordedBy: "Nurse Emily Davis"
    },
    {
      id: "V003",
      timestamp: "Yesterday, 08:00 PM",
      temperature: "99.1°F",
      bloodPressure: "150/95 mmHg",
      heartRate: "85 bpm",
      respiratoryRate: "18/min",
      oxygenSaturation: "96%",
      recordedBy: "Nurse Sarah Johnson"
    },
  ]

  const medications = [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", time: "08:00 AM", status: "given" },
    { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", time: "08:00 AM", status: "given" },
    { name: "Metoprolol", dosage: "25mg", frequency: "Twice daily", time: "02:00 PM", status: "pending" },
    { name: "Aspirin", dosage: "81mg", frequency: "Once daily", time: "08:00 PM", status: "pending" },
  ]

  const handleRecordVitals = () => {
    console.log("Recording vitals:", newVitals)
    setShowRecordModal(false)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-[#fef2f2] text-[#dc2626]"
      case "stable": return "bg-[#f0fdf4] text-[#16a34a]"
      case "recovering": return "bg-[#eff6ff] text-[#2563eb]"
      default: return "bg-[#f3f4f6] text-[#6b7280]"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-[#f8f9fa] rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-[24px] font-bold text-[#212529]">Patient Details</h1>
          <p className="text-[14px] text-[#6c757d]">View and manage patient information</p>
        </div>
        <button 
          onClick={() => setShowRecordModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Record Vitals
        </button>
      </div>

      {/* Patient Info Card */}
      <div className="bg-white rounded-xl border border-[#e9ecef] p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-[#007bff] flex items-center justify-center text-white text-[28px] font-semibold">
            {patient.initials}
          </div>

          {/* Info */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-[20px] font-bold text-[#212529]">{patient.name}</h2>
                <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${getStatusColor(patient.status)}`}>
                  {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                </span>
              </div>
              <p className="text-[14px] text-[#6c757d] mb-1">ID: {patient.id}</p>
              <p className="text-[14px] text-[#6c757d]">{patient.age} years • {patient.gender} • Blood Type: {patient.bloodType}</p>
            </div>

            <div>
              <p className="text-[12px] text-[#6c757d] mb-1">Location</p>
              <p className="text-[14px] font-medium text-[#212529]">{patient.room} • {patient.bed}</p>
              <p className="text-[12px] text-[#6c757d] mt-3 mb-1">Admission Date</p>
              <p className="text-[14px] font-medium text-[#212529]">{patient.admissionDate}</p>
            </div>

            <div>
              <p className="text-[12px] text-[#6c757d] mb-1">Diagnosis</p>
              <p className="text-[14px] font-medium text-[#212529]">{patient.diagnosis}</p>
              <p className="text-[12px] text-[#6c757d] mt-3 mb-1">Attending Physician</p>
              <p className="text-[14px] font-medium text-[#212529]">{patient.doctor}</p>
            </div>
          </div>
        </div>

        {/* Allergies Warning */}
        {patient.allergies.length > 0 && (
          <div className="mt-4 p-3 bg-[#fef2f2] border border-[#fecaca] rounded-lg flex items-center gap-3">
            <svg className="w-5 h-5 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-[12px] font-medium text-[#dc2626]">Known Allergies</p>
              <p className="text-[14px] text-[#991b1b]">{patient.allergies.join(", ")}</p>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#e9ecef] pb-2">
        <button
          onClick={() => setActiveTab("vitals")}
          className={`px-4 py-2 rounded-t-lg text-[14px] font-medium transition-colors ${
            activeTab === "vitals"
              ? "bg-[#007bff] text-white"
              : "text-[#6c757d] hover:bg-[#f8f9fa]"
          }`}
        >
          Vital Signs
        </button>
        <button
          onClick={() => setActiveTab("medications")}
          className={`px-4 py-2 rounded-t-lg text-[14px] font-medium transition-colors ${
            activeTab === "medications"
              ? "bg-[#007bff] text-white"
              : "text-[#6c757d] hover:bg-[#f8f9fa]"
          }`}
        >
          Medications
        </button>
        <button
          onClick={() => setActiveTab("notes")}
          className={`px-4 py-2 rounded-t-lg text-[14px] font-medium transition-colors ${
            activeTab === "notes"
              ? "bg-[#007bff] text-white"
              : "text-[#6c757d] hover:bg-[#f8f9fa]"
          }`}
        >
          Nursing Notes
        </button>
      </div>

      {/* Vitals Tab */}
      {activeTab === "vitals" && (
        <div className="space-y-4">
          {/* Latest Vitals Summary */}
          <div className="bg-white rounded-xl border border-[#e9ecef] p-6">
            <h3 className="text-[16px] font-semibold text-[#212529] mb-4">Latest Vital Signs</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 bg-[#f8f9fa] rounded-lg text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#fef2f2] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-[20px] font-bold text-[#212529]">78</p>
                <p className="text-[12px] text-[#6c757d]">Heart Rate (bpm)</p>
              </div>
              <div className="p-4 bg-[#f8f9fa] rounded-lg text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#eff6ff] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-[20px] font-bold text-[#212529]">140/90</p>
                <p className="text-[12px] text-[#6c757d]">Blood Pressure</p>
              </div>
              <div className="p-4 bg-[#f8f9fa] rounded-lg text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#fef3c7] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                </div>
                <p className="text-[20px] font-bold text-[#212529]">98.6°F</p>
                <p className="text-[12px] text-[#6c757d]">Temperature</p>
              </div>
              <div className="p-4 bg-[#f8f9fa] rounded-lg text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#f0fdf4] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-[20px] font-bold text-[#212529]">98%</p>
                <p className="text-[12px] text-[#6c757d]">O2 Saturation</p>
              </div>
              <div className="p-4 bg-[#f8f9fa] rounded-lg text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#f3e8ff] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#7c3aed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
                <p className="text-[20px] font-bold text-[#212529]">16</p>
                <p className="text-[12px] text-[#6c757d]">Resp Rate (/min)</p>
              </div>
            </div>
          </div>

          {/* Vital History */}
          <div className="bg-white rounded-xl border border-[#e9ecef]">
            <div className="p-4 border-b border-[#e9ecef]">
              <h3 className="text-[16px] font-semibold text-[#212529]">Vital Signs History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e9ecef] bg-[#f8f9fa]">
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">Time</th>
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">Temp</th>
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">BP</th>
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">HR</th>
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">RR</th>
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">SpO2</th>
                    <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">Recorded By</th>
                  </tr>
                </thead>
                <tbody>
                  {vitalRecords.map((record) => (
                    <tr key={record.id} className="border-b border-[#f8f9fa] hover:bg-[#f8f9fa]">
                      <td className="py-3 px-4 text-[13px] text-[#212529]">{record.timestamp}</td>
                      <td className="py-3 px-4 text-[13px] text-[#212529]">{record.temperature}</td>
                      <td className="py-3 px-4 text-[13px] text-[#212529]">{record.bloodPressure}</td>
                      <td className="py-3 px-4 text-[13px] text-[#212529]">{record.heartRate}</td>
                      <td className="py-3 px-4 text-[13px] text-[#212529]">{record.respiratoryRate}</td>
                      <td className="py-3 px-4 text-[13px] text-[#212529]">{record.oxygenSaturation}</td>
                      <td className="py-3 px-4 text-[13px] text-[#6c757d]">{record.recordedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Medications Tab */}
      {activeTab === "medications" && (
        <div className="bg-white rounded-xl border border-[#e9ecef]">
          <div className="p-4 border-b border-[#e9ecef]">
            <h3 className="text-[16px] font-semibold text-[#212529]">Current Medications</h3>
          </div>
          <div className="p-4 space-y-3">
            {medications.map((med, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-[#e9ecef] rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    med.status === "given" ? "bg-[#f0fdf4]" : "bg-[#fef3c7]"
                  }`}>
                    <svg className={`w-5 h-5 ${med.status === "given" ? "text-[#16a34a]" : "text-[#d97706]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#212529]">{med.name} - {med.dosage}</p>
                    <p className="text-[12px] text-[#6c757d]">{med.frequency} • Next: {med.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${
                    med.status === "given" ? "bg-[#d1fae5] text-[#059669]" : "bg-[#fef3c7] text-[#d97706]"
                  }`}>
                    {med.status === "given" ? "Given" : "Pending"}
                  </span>
                  {med.status === "pending" && (
                    <button className="px-3 py-1 bg-[#007bff] text-white rounded-lg text-[12px] font-medium hover:bg-[#0056b3] transition-colors">
                      Mark Given
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === "notes" && (
        <div className="bg-white rounded-xl border border-[#e9ecef] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-semibold text-[#212529]">Nursing Notes</h3>
            <button className="flex items-center gap-2 px-3 py-2 bg-[#007bff] text-white rounded-lg text-[12px] font-medium hover:bg-[#0056b3] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Note
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-[#e9ecef] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[12px] font-medium text-[#007bff]">Nurse Sarah Johnson</p>
                <p className="text-[12px] text-[#6c757d]">Today, 08:30 AM</p>
              </div>
              <p className="text-[14px] text-[#212529]">Patient stable. BP readings showing improvement after medication adjustment. Continue monitoring every 4 hours. Patient reports no discomfort.</p>
            </div>
            <div className="p-4 border border-[#e9ecef] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[12px] font-medium text-[#007bff]">Nurse Emily Davis</p>
                <p className="text-[12px] text-[#6c757d]">Yesterday, 10:00 PM</p>
              </div>
              <p className="text-[14px] text-[#212529]">Night shift handover: Patient resting well. All medications administered as scheduled. Slight elevation in temperature noted, continued monitoring recommended.</p>
            </div>
          </div>
        </div>
      )}

      {/* Record Vitals Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#e9ecef]">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold text-[#212529]">Record Vital Signs</h3>
                <button 
                  onClick={() => setShowRecordModal(false)}
                  className="p-2 hover:bg-[#f8f9fa] rounded-lg"
                >
                  <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-[14px] text-[#6c757d] mt-1">Recording for: {patient.name}</p>
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
                  <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Respiratory Rate (/min)</label>
                  <input
                    type="text"
                    value={newVitals.respiratoryRate}
                    onChange={(e) => setNewVitals({ ...newVitals, respiratoryRate: e.target.value })}
                    placeholder="16"
                    className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                  />
                </div>
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

            <div className="p-6 border-t border-[#e9ecef] flex items-center gap-3">
              <button
                onClick={() => setShowRecordModal(false)}
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
    </div>
  )
}
