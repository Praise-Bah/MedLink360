"use client"

import { useState } from "react"

interface MedicationRound {
  id: string
  patientId: string
  patientName: string
  patientInitials: string
  room: string
  bed: string
  medication: string
  dosage: string
  route: string
  scheduledTime: string
  status: "pending" | "given" | "missed" | "refused"
}

export function MedicationRoundsPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "completed" | "all">("pending")
  const [selectedRound, setSelectedRound] = useState<MedicationRound | null>(null)

  const [rounds, setRounds] = useState<MedicationRound[]>([
    { id: "MR001", patientId: "PT001", patientName: "Ateeq Rafiq", patientInitials: "AR", room: "Ward 12A", bed: "Bed 3", medication: "Lisinopril", dosage: "10mg", route: "Oral", scheduledTime: "08:00 AM", status: "given" },
    { id: "MR002", patientId: "PT001", patientName: "Ateeq Rafiq", patientInitials: "AR", room: "Ward 12A", bed: "Bed 3", medication: "Amlodipine", dosage: "5mg", route: "Oral", scheduledTime: "08:00 AM", status: "given" },
    { id: "MR003", patientId: "PT002", patientName: "Michael Chen", patientInitials: "MC", room: "Ward 12A", bed: "Bed 5", medication: "Metformin", dosage: "500mg", route: "Oral", scheduledTime: "08:00 AM", status: "given" },
    { id: "MR004", patientId: "PT002", patientName: "Michael Chen", patientInitials: "MC", room: "Ward 12A", bed: "Bed 5", medication: "Insulin Glargine", dosage: "20 units", route: "Subcutaneous", scheduledTime: "10:00 AM", status: "pending" },
    { id: "MR005", patientId: "PT003", patientName: "Emma Wilson", patientInitials: "EW", room: "Ward 12B", bed: "Bed 1", medication: "Salbutamol", dosage: "2 puffs", route: "Inhaler", scheduledTime: "10:00 AM", status: "pending" },
    { id: "MR006", patientId: "PT004", patientName: "James Brown", patientInitials: "JB", room: "Ward 12A", bed: "Bed 7", medication: "Methotrexate", dosage: "15mg", route: "Oral", scheduledTime: "12:00 PM", status: "pending" },
    { id: "MR007", patientId: "PT005", patientName: "Lisa Anderson", patientInitials: "LA", room: "Ward 12B", bed: "Bed 4", medication: "Sumatriptan", dosage: "50mg", route: "Oral", scheduledTime: "12:00 PM", status: "pending" },
    { id: "MR008", patientId: "PT001", patientName: "Ateeq Rafiq", patientInitials: "AR", room: "Ward 12A", bed: "Bed 3", medication: "Metoprolol", dosage: "25mg", route: "Oral", scheduledTime: "02:00 PM", status: "pending" },
  ])

  const handleMarkGiven = (roundId: string) => {
    setRounds(rounds.map(r => 
      r.id === roundId ? { ...r, status: "given" as const } : r
    ))
    setSelectedRound(null)
  }

  const handleMarkRefused = (roundId: string) => {
    setRounds(rounds.map(r => 
      r.id === roundId ? { ...r, status: "refused" as const } : r
    ))
    setSelectedRound(null)
  }

  const filteredRounds = rounds.filter(round => {
    if (activeTab === "pending") return round.status === "pending"
    if (activeTab === "completed") return round.status === "given" || round.status === "refused"
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "given": return "bg-[#d1fae5] text-[#059669]"
      case "pending": return "bg-[#fef3c7] text-[#d97706]"
      case "refused": return "bg-[#fee2e2] text-[#dc2626]"
      case "missed": return "bg-[#e5e7eb] text-[#6b7280]"
      default: return "bg-[#f3f4f6] text-[#6b7280]"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#212529]">Medication Rounds</h1>
          <p className="text-[14px] text-[#6c757d]">Manage and track medication administration</p>
        </div>
        <div className="flex items-center gap-2 text-[14px] text-[#6c757d]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Current Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#e9ecef] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#fef3c7] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#212529]">{rounds.filter(r => r.status === "pending").length}</p>
              <p className="text-[12px] text-[#6c757d]">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#e9ecef] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#d1fae5] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#212529]">{rounds.filter(r => r.status === "given").length}</p>
              <p className="text-[12px] text-[#6c757d]">Given</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#e9ecef] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#fee2e2] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#212529]">{rounds.filter(r => r.status === "refused").length}</p>
              <p className="text-[12px] text-[#6c757d]">Refused</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#e9ecef] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#212529]">{rounds.length}</p>
              <p className="text-[12px] text-[#6c757d]">Total Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
            activeTab === "pending"
              ? "bg-[#d97706] text-white"
              : "text-[#6c757d] hover:bg-[#f8f9fa]"
          }`}
        >
          Pending ({rounds.filter(r => r.status === "pending").length})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
            activeTab === "completed"
              ? "bg-[#059669] text-white"
              : "text-[#6c757d] hover:bg-[#f8f9fa]"
          }`}
        >
          Completed ({rounds.filter(r => r.status === "given" || r.status === "refused").length})
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
            activeTab === "all"
              ? "bg-[#007bff] text-white"
              : "text-[#6c757d] hover:bg-[#f8f9fa]"
          }`}
        >
          All ({rounds.length})
        </button>
      </div>

      {/* Medication Rounds Table */}
      <div className="bg-white rounded-xl border border-[#e9ecef]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e9ecef] bg-[#f8f9fa]">
                <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">Patient</th>
                <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">Location</th>
                <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">Medication</th>
                <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">Dosage</th>
                <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">Route</th>
                <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">Scheduled</th>
                <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6c757d]">Status</th>
                <th className="text-right py-3 px-4 text-[12px] font-medium text-[#6c757d]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRounds.map((round) => (
                <tr key={round.id} className="border-b border-[#f8f9fa] hover:bg-[#f8f9fa]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#007bff] flex items-center justify-center text-white text-[12px] font-medium">
                        {round.patientInitials}
                      </div>
                      <span className="text-[13px] font-medium text-[#212529]">{round.patientName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[13px] text-[#6c757d]">{round.room} • {round.bed}</td>
                  <td className="py-3 px-4 text-[13px] font-medium text-[#212529]">{round.medication}</td>
                  <td className="py-3 px-4 text-[13px] text-[#212529]">{round.dosage}</td>
                  <td className="py-3 px-4 text-[13px] text-[#6c757d]">{round.route}</td>
                  <td className="py-3 px-4 text-[13px] text-[#212529]">{round.scheduledTime}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-[11px] font-medium ${getStatusColor(round.status)}`}>
                      {round.status.charAt(0).toUpperCase() + round.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {round.status === "pending" && (
                        <>
                          <button 
                            onClick={() => handleMarkGiven(round.id)}
                            className="px-3 py-1 bg-[#059669] text-white rounded text-[11px] font-medium hover:bg-[#047857] transition-colors"
                          >
                            Mark Given
                          </button>
                          <button 
                            onClick={() => setSelectedRound(round)}
                            className="p-1 hover:bg-[#f0f0f0] rounded transition-colors"
                          >
                            <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </>
                      )}
                      {round.status !== "pending" && (
                        <button className="p-1 hover:bg-[#f0f0f0] rounded transition-colors">
                          <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Modal */}
      {selectedRound && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-[#e9ecef]">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold text-[#212529]">Medication Options</h3>
                <button 
                  onClick={() => setSelectedRound(null)}
                  className="p-2 hover:bg-[#f8f9fa] rounded-lg"
                >
                  <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-[#f8f9fa] rounded-lg p-4 mb-6">
                <p className="text-[14px] font-medium text-[#212529]">{selectedRound.patientName}</p>
                <p className="text-[12px] text-[#6c757d]">{selectedRound.medication} - {selectedRound.dosage}</p>
                <p className="text-[12px] text-[#6c757d]">Scheduled: {selectedRound.scheduledTime}</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleMarkGiven(selectedRound.id)}
                  className="w-full px-4 py-3 bg-[#059669] text-white rounded-lg text-[14px] font-medium hover:bg-[#047857] transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Given
                </button>
                <button
                  onClick={() => handleMarkRefused(selectedRound.id)}
                  className="w-full px-4 py-3 bg-[#dc2626] text-white rounded-lg text-[14px] font-medium hover:bg-[#b91c1c] transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Patient Refused
                </button>
                <button
                  onClick={() => setSelectedRound(null)}
                  className="w-full px-4 py-3 border border-[#e9ecef] text-[#6c757d] rounded-lg text-[14px] font-medium hover:bg-[#f8f9fa] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
