"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PrescriptionModal } from "./prescription-modal"
import { AddNoteModal } from "./add-note-modal"
import { UploadModal, UploadedFile } from "./upload-modal"
import { ConsultationFormModal, ConsultationNote } from "./consultation-form-modal"

interface PatientDetailProps {
  patientId?: string
}

interface Note {
  id: string
  content: string
  timestamp: string
  doctorName: string
}

export function PatientDetail({ patientId = "P-20035" }: PatientDetailProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"medications" | "lab-results" | "vitals" | "notes">("medications")
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false)
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false)
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])
  const [consultationNotes, setConsultationNotes] = useState<ConsultationNote[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const handleNoteSave = (noteContent: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: noteContent,
      timestamp: new Date().toISOString(),
      doctorName: "Dr. Emily Davies" // TODO: Get from auth context
    }
    setNotes([newNote, ...notes])
  }

  const handleConsultationSave = (consultationData: ConsultationNote) => {
    setConsultationNotes([consultationData, ...consultationNotes])
  }

  const handleFileUpload = (files: UploadedFile[]) => {
    setUploadedFiles([...files, ...uploadedFiles])
  }

  // Convert consultation notes to file format for display
  const consultationFiles: UploadedFile[] = consultationNotes.map(note => ({
    id: note.id,
    name: `Consultation_${note.patientName.replace(' ', '_')}_${new Date(note.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).replace(/\s/g, '_')}.pdf`,
    type: "document" as const,
    size: 0,
    uploadDate: note.createdDate,
    consultationData: note
  }))

  // Combine consultation files with uploaded files
  const allFiles = [...consultationFiles, ...uploadedFiles]

  // Sort files by date (newest first)
  const sortedFiles = [...allFiles].sort((a, b) => 
    new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
  )

  return (
    <div className="w-full max-w-none">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#f8f9fa] transition-colors"
        >
          <svg className="w-4 h-4 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-[30px] font-bold text-[#212529] tracking-[-0.75px]">Patient Details</h1>
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
            onClick={() => setIsAddNoteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] hover:bg-[#0056b3] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Add Note
          </button>
          <button 
            onClick={() => setIsConsultationFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#6c757d] hover:bg-[#f8f9fa] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New
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
          <span className="px-3 py-1 bg-[#fff3cd] text-[#856404] rounded-full text-[12px] font-medium">
            recovering
          </span>
        </div>

        <div className="grid grid-cols-5 gap-6 mb-4">
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Patient Name</p>
            <p className="text-[14px] font-medium text-[#212529]">Sarah Johnson</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Patient ID</p>
            <p className="text-[14px] font-medium text-[#212529]">{patientId}</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Email</p>
            <p className="text-[14px] font-medium text-[#212529]">sarah.j@email.com</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Age / Sex</p>
            <p className="text-[14px] font-medium text-[#212529]">45 / Male</p>
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
            <p className="text-[14px] font-medium text-[#212529]">O+</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Height</p>
            <p className="text-[14px] font-medium text-[#212529]">165 cm</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Condition</p>
            <p className="text-[14px] font-medium text-[#212529]">Post-operative care</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Address</p>
            <p className="text-[14px] font-medium text-[#212529]">123 Oak St, Boston, MA 02108</p>
          </div>
        </div>
      </div>

      {/* Medical Information Card */}
      <div className="bg-white rounded-xl border border-[#e7e8eb] p-6 mb-6">
        <h2 className="text-[18px] font-semibold text-[#212529] mb-4">Medical Information</h2>
        
        <div className="grid grid-cols-3 gap-6 mb-4">
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Primary Physician:</p>
            <p className="text-[14px] font-medium text-[#212529]">Dr. Emily Davies</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Known Allergies</p>
            <p className="text-[14px] font-medium text-[#212529]">Penicillin</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Chronic Conditions</p>
            <p className="text-[14px] font-medium text-[#212529]">Hypertension (Diagnosed: 01/10/2022)</p>
          </div>
        </div>

        <div>
          <p className="text-[12px] text-[#6c757d] mb-1">Current Medications</p>
          <p className="text-[14px] font-medium text-[#212529]">Atenolol 50mg daily, Metformin 50mg daily</p>
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
            <p className="text-[14px] font-medium text-[#212529]">2024-03-15</p>
          </div>
          <div>
            <p className="text-[12px] text-[#6c757d] mb-1">Next Appointment</p>
            <p className="text-[14px] font-medium text-[#212529]">2024-04-20</p>
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

      {/* Medications Tab Content */}
      {activeTab === "medications" && (
        <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#212529]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-[18px] font-semibold text-[#212529]">Previous Medication</h3>
            </div>
            <button 
              onClick={() => setIsPrescriptionModalOpen(true)}
              className="px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] hover:bg-[#0056b3] transition-colors"
            >
              New Prescription
            </button>
          </div>

          {/* Medications Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e7e8eb]">
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Drug</th>
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">DR.Name</th>
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Sizes</th>
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Instruction</th>
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#e7e8eb] hover:bg-[#f8f9fa] transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-12 bg-[#007bff] rounded"></div>
                      <span className="text-[14px] text-[#212529]">Tincture Belladonna</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#e3f2fd] flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-[14px] text-[#212529]">Dr. Mike Thomas</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">120 ml</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">take 5 milliliters three times a day before meals.</td>
                  <td className="py-4 px-4">
                    <button className="p-2 hover:bg-[#e9ecef] rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lab Results Tab Content */}
      {activeTab === "lab-results" && (
        <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
          <h3 className="text-[18px] font-semibold text-[#212529] mb-4">Lab Results</h3>
          <p className="text-[14px] text-[#6c757d]">No lab results available.</p>
        </div>
      )}

      {/* Vitals Tab Content */}
      {activeTab === "vitals" && (
        <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
          <h3 className="text-[18px] font-semibold text-[#212529] mb-4">Vitals</h3>
          <p className="text-[14px] text-[#6c757d]">No vitals data available.</p>
        </div>
      )}

      {/* Notes Tab Content */}
      {activeTab === "notes" && (
        <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[18px] font-semibold text-[#212529]">Clinical Notes</h3>
            <button 
              onClick={() => setIsAddNoteModalOpen(true)}
              className="px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] hover:bg-[#0056b3] transition-colors"
            >
              Add New Note
            </button>
          </div>

          {notes.length === 0 && allFiles.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-[16px] text-[#6c757d] mb-2">No notes or files yet</p>
              <p className="text-[14px] text-[#9ca3af]">Click "Add New Note" to create clinical notes or upload files</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Files Section (Consultation Notes + Uploaded Files) */}
              {allFiles.length > 0 && (
                <div>
                  <h4 className="text-[16px] font-semibold text-[#212529] mb-3">Documents & Files</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sortedFiles.map((file) => (
                      <div key={file.id} className="border border-[#e7e8eb] rounded-lg p-4 hover:border-[#007bff] transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#e3f2fd] flex items-center justify-center flex-shrink-0">
                            {file.type === "video" ? (
                              <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-medium text-[#212529] truncate">{file.name}</p>
                            <p className="text-[12px] text-[#6c757d] mt-1">
                              {new Date(file.uploadDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                            <p className="text-[12px] text-[#9ca3af]">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                          <button className="p-2 hover:bg-[#f8f9fa] rounded-lg transition-colors">
                            <svg className="w-4 h-4 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clinical Notes Section */}
              {notes.length > 0 && (
                <div>
                  <h4 className="text-[16px] font-semibold text-[#212529] mb-3">Clinical Notes</h4>
                  <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="border border-[#e7e8eb] rounded-lg p-4 hover:border-[#007bff] transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#e3f2fd] flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-[#212529]">{note.doctorName}</p>
                        <p className="text-[12px] text-[#6c757d]">
                          {new Date(note.timestamp).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-[#f8f9fa] rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-[#6c757d]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    </button>
                  </div>
                  <div 
                    className="text-[14px] text-[#212529] leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                </div>
              ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Prescription Modal */}
      <PrescriptionModal 
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        patientId={patientId}
      />

      {/* Add Note Modal */}
      <AddNoteModal 
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
        onSave={handleNoteSave}
        patientId={patientId}
      />

      {/* Consultation Form Modal */}
      <ConsultationFormModal 
        isOpen={isConsultationFormOpen}
        onClose={() => setIsConsultationFormOpen(false)}
        onSave={handleConsultationSave}
        patientName="Sarah Johnson"
        patientAge={45}
      />
    </div>
  )
}
