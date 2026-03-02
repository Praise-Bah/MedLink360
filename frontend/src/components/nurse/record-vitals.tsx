"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Patient {
  id: string
  name: string
  initials: string
  room: string
  bed: string
  lastVitals: string
}

export function RecordVitalsPage() {
  const router = useRouter()
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [vitals, setVitals] = useState({
    temperature: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    weight: "",
    notes: ""
  })

  const patients: Patient[] = [
    { id: "PT001", name: "Ateeq Rafiq", initials: "AR", room: "Ward 12A", bed: "Bed 3", lastVitals: "2 hours ago" },
    { id: "PT002", name: "Michael Chen", initials: "MC", room: "Ward 12A", bed: "Bed 5", lastVitals: "4 hours ago" },
    { id: "PT003", name: "Emma Wilson", initials: "EW", room: "Ward 12B", bed: "Bed 1", lastVitals: "1 hour ago" },
    { id: "PT004", name: "James Brown", initials: "JB", room: "Ward 12A", bed: "Bed 7", lastVitals: "3 hours ago" },
    { id: "PT005", name: "Lisa Anderson", initials: "LA", room: "Ward 12B", bed: "Bed 4", lastVitals: "5 hours ago" },
  ]

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = () => {
    if (!selectedPatient) return
    console.log("Recording vitals for:", selectedPatient.name, vitals)
    // Reset form
    setVitals({
      temperature: "",
      bloodPressureSystolic: "",
      bloodPressureDiastolic: "",
      heartRate: "",
      respiratoryRate: "",
      oxygenSaturation: "",
      weight: "",
      notes: ""
    })
    setSelectedPatient(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#212529]">Record Vitals</h1>
          <p className="text-[14px] text-[#6c757d]">Record patient vital signs</p>
        </div>
        <button 
          onClick={() => router.push("/qr-access")}
          className="flex items-center gap-2 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          Scan Patient QR
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Selection */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-[#e9ecef] p-6">
          <h3 className="text-[16px] font-semibold text-[#212529] mb-4">Select Patient</h3>
          
          {/* Search */}
          <div className="relative mb-4">
            <svg className="w-5 h-5 text-[#6c757d] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
            />
          </div>

          {/* Patient List */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedPatient?.id === patient.id
                    ? "bg-[#007bff] text-white"
                    : "bg-[#f8f9fa] hover:bg-[#e9ecef]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-medium ${
                    selectedPatient?.id === patient.id
                      ? "bg-white text-[#007bff]"
                      : "bg-[#007bff] text-white"
                  }`}>
                    {patient.initials}
                  </div>
                  <div className="flex-1">
                    <p className={`text-[14px] font-medium ${
                      selectedPatient?.id === patient.id ? "text-white" : "text-[#212529]"
                    }`}>{patient.name}</p>
                    <p className={`text-[12px] ${
                      selectedPatient?.id === patient.id ? "text-white/80" : "text-[#6c757d]"
                    }`}>{patient.room} • {patient.bed}</p>
                  </div>
                </div>
                <p className={`text-[11px] mt-2 ${
                  selectedPatient?.id === patient.id ? "text-white/70" : "text-[#6c757d]"
                }`}>Last vitals: {patient.lastVitals}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vitals Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#e9ecef] p-6">
          {selectedPatient ? (
            <>
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#e9ecef]">
                <div className="w-14 h-14 rounded-full bg-[#007bff] flex items-center justify-center text-white text-[18px] font-semibold">
                  {selectedPatient.initials}
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-[#212529]">{selectedPatient.name}</h3>
                  <p className="text-[14px] text-[#6c757d]">{selectedPatient.id} • {selectedPatient.room} • {selectedPatient.bed}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Temperature (°F)</label>
                  <input
                    type="text"
                    value={vitals.temperature}
                    onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                    placeholder="98.6"
                    className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Heart Rate (bpm)</label>
                  <input
                    type="text"
                    value={vitals.heartRate}
                    onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                    placeholder="72"
                    className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Blood Pressure (mmHg)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={vitals.bloodPressureSystolic}
                      onChange={(e) => setVitals({ ...vitals, bloodPressureSystolic: e.target.value })}
                      placeholder="120"
                      className="flex-1 px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                    />
                    <span className="text-[#6c757d]">/</span>
                    <input
                      type="text"
                      value={vitals.bloodPressureDiastolic}
                      onChange={(e) => setVitals({ ...vitals, bloodPressureDiastolic: e.target.value })}
                      placeholder="80"
                      className="flex-1 px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#6c757d] mb-1">O2 Saturation (%)</label>
                  <input
                    type="text"
                    value={vitals.oxygenSaturation}
                    onChange={(e) => setVitals({ ...vitals, oxygenSaturation: e.target.value })}
                    placeholder="98"
                    className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Respiratory Rate (/min)</label>
                  <input
                    type="text"
                    value={vitals.respiratoryRate}
                    onChange={(e) => setVitals({ ...vitals, respiratoryRate: e.target.value })}
                    placeholder="16"
                    className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Weight (kg)</label>
                  <input
                    type="text"
                    value={vitals.weight}
                    onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                    placeholder="70"
                    className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Notes (Optional)</label>
                <textarea
                  value={vitals.notes}
                  onChange={(e) => setVitals({ ...vitals, notes: e.target.value })}
                  placeholder="Additional observations..."
                  rows={3}
                  className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff] resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="flex-1 px-4 py-3 border border-[#e9ecef] text-[#6c757d] rounded-lg text-[14px] font-medium hover:bg-[#f8f9fa] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-3 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
                >
                  Save Vitals
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <div className="w-16 h-16 rounded-full bg-[#f8f9fa] flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-[16px] font-medium text-[#212529] mb-2">Select a Patient</h3>
              <p className="text-[14px] text-[#6c757d]">Choose a patient from the list or scan their QR code to record vitals</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
