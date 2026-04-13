"use client"

import { useState } from "react"

interface Note {
  id: string
  patientId: string
  patientName: string
  patientInitials: string
  content: string
  timestamp: string
  nurse: string
  type: "observation" | "medication" | "procedure" | "general"
}

export function DailyNotesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "my-notes">("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newNote, setNewNote] = useState<{
    patientId: string
    content: string
    type: Note["type"]
  }>({
    patientId: "",
    content: "",
    type: "general",
  })

  const notes: Note[] = [
    {
      id: "N001",
      patientId: "PT001",
      patientName: "Ateeq Rafiq",
      patientInitials: "AR",
      content: "Patient stable. BP readings showing improvement after medication adjustment. Continue monitoring every 4 hours. Patient reports no discomfort.",
      timestamp: "Today, 08:30 AM",
      nurse: "Sarah Johnson",
      type: "observation"
    },
    {
      id: "N002",
      patientId: "PT002",
      patientName: "Michael Chen",
      patientInitials: "MC",
      content: "Administered insulin as prescribed. Blood glucose level: 145 mg/dL. Patient tolerated medication well.",
      timestamp: "Today, 08:00 AM",
      nurse: "Sarah Johnson",
      type: "medication"
    },
    {
      id: "N003",
      patientId: "PT003",
      patientName: "Emma Wilson",
      patientInitials: "EW",
      content: "Wound dressing changed. Incision site clean, no signs of infection. Patient reports mild discomfort, pain level 3/10.",
      timestamp: "Today, 07:45 AM",
      nurse: "Emily Davis",
      type: "procedure"
    },
    {
      id: "N004",
      patientId: "PT001",
      patientName: "Ateeq Rafiq",
      patientInitials: "AR",
      content: "Night shift handover: Patient rested well. All vitals stable throughout the night.",
      timestamp: "Today, 06:00 AM",
      nurse: "Emily Davis",
      type: "general"
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "observation": return "bg-[#eff6ff] text-[#2563eb]"
      case "medication": return "bg-[#f0fdf4] text-[#16a34a]"
      case "procedure": return "bg-[#fef3c7] text-[#d97706]"
      default: return "bg-[#f3f4f6] text-[#6b7280]"
    }
  }

  const handleAddNote = () => {
    console.log("Adding note:", newNote)
    setShowAddModal(false)
    setNewNote({ patientId: "", content: "", type: "general" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#212529]">Daily Notes</h1>
          <p className="text-[14px] text-[#6c757d]">View and manage nursing notes for your patients</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Note
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#e9ecef] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#212529]">{notes.length}</p>
              <p className="text-[12px] text-[#6c757d]">Total Notes Today</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#e9ecef] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#eff6ff] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#212529]">{notes.filter(n => n.type === "observation").length}</p>
              <p className="text-[12px] text-[#6c757d]">Observations</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#e9ecef] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#f0fdf4] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#212529]">{notes.filter(n => n.type === "medication").length}</p>
              <p className="text-[12px] text-[#6c757d]">Medications</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#e9ecef] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#fef3c7] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#212529]">{notes.filter(n => n.type === "procedure").length}</p>
              <p className="text-[12px] text-[#6c757d]">Procedures</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
            activeTab === "all"
              ? "bg-[#007bff] text-white"
              : "text-[#6c757d] hover:bg-[#f8f9fa]"
          }`}
        >
          All Notes
        </button>
        <button
          onClick={() => setActiveTab("my-notes")}
          className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
            activeTab === "my-notes"
              ? "bg-[#007bff] text-white"
              : "text-[#6c757d] hover:bg-[#f8f9fa]"
          }`}
        >
          My Notes
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes
          .filter(note => activeTab === "all" || note.nurse === "Sarah Johnson")
          .map((note) => (
          <div key={note.id} className="bg-white rounded-xl border border-[#e9ecef] p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#007bff] flex items-center justify-center text-white text-[16px] font-semibold">
                {note.patientInitials}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <p className="text-[16px] font-semibold text-[#212529]">{note.patientName}</p>
                    <span className={`px-2 py-1 rounded-full text-[11px] font-medium ${getTypeColor(note.type)}`}>
                      {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#6c757d]">{note.timestamp}</p>
                </div>
                <p className="text-[14px] text-[#212529] mb-3">{note.content}</p>
                <p className="text-[12px] text-[#6c757d]">Recorded by: {note.nurse}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg mx-4">
            <div className="p-6 border-b border-[#e9ecef]">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold text-[#212529]">Add Note</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-[#f8f9fa] rounded-lg"
                >
                  <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Patient</label>
                <select
                  value={newNote.patientId}
                  onChange={(e) => setNewNote({ ...newNote, patientId: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                >
                  <option value="">Select patient</option>
                  <option value="PT001">Ateeq Rafiq - Ward 12A</option>
                  <option value="PT002">Michael Chen - Ward 12A</option>
                  <option value="PT003">Emma Wilson - Ward 12B</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Note Type</label>
                <select
                  value={newNote.type}
                  onChange={(e) => setNewNote({ ...newNote, type: e.target.value as Note["type"] })}
                  className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff]"
                >
                  <option value="general">General</option>
                  <option value="observation">Observation</option>
                  <option value="medication">Medication</option>
                  <option value="procedure">Procedure</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#6c757d] mb-1">Note Content</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Enter your note..."
                  rows={5}
                  className="w-full px-3 py-2 border border-[#e9ecef] rounded-lg text-[14px] focus:outline-none focus:border-[#007bff] resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-[#e9ecef] flex items-center gap-3">
              <button
                onClick={() => setShowAddModal(false)}
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
