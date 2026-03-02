"use client"

import { useState } from "react"
import Image from "next/image"

interface ConsultationFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (consultationData: ConsultationNote) => void
  patientName?: string
  patientAge?: number
  patientPhone?: string
  allergies?: string
  chronicDisease?: string
  bloodType?: string
  pastIllnesses?: string
}

export interface ConsultationNote {
  id: string
  patientName: string
  patientAge: number
  symptoms: string
  diagnosis: string
  advice: string
  requestLabTest: boolean
  labType: string
  priority: string
  createPrescription: boolean
  medicine: string
  prescription: string
  dosage: string
  duration: string
  createdDate: string
  doctorName: string
}

export function ConsultationFormModal({ 
  isOpen, 
  onClose, 
  onSave,
  patientName = "Sarah Johnson",
  patientAge = 34,
  patientPhone = "+1 (555) 123-4567",
  allergies = "Nuts, pollen",
  chronicDisease = "Asthma",
  bloodType = "B+",
  pastIllnesses = "Corona virus"
}: ConsultationFormModalProps) {
  const [symptoms, setSymptoms] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const [advice, setAdvice] = useState("")
  const [requestLabTest, setRequestLabTest] = useState(false)
  const [labType, setLabType] = useState("")
  const [priority, setPriority] = useState("")
  const [createPrescription, setCreatePrescription] = useState(false)
  const [medicine, setMedicine] = useState("")
  const [prescription, setPrescription] = useState("")
  const [dosage, setDosage] = useState("")
  const [duration, setDuration] = useState("")
  const [showVisitHistory, setShowVisitHistory] = useState(false)
  
  // Get current month
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' })

  const handleSave = () => {
    const consultationData: ConsultationNote = {
      id: Date.now().toString(),
      patientName,
      patientAge,
      symptoms,
      diagnosis,
      advice,
      requestLabTest,
      labType,
      priority,
      createPrescription,
      medicine,
      prescription,
      dosage,
      duration,
      createdDate: new Date().toISOString(),
      doctorName: "Dr. Emily Davies" // TODO: Get from auth context
    }
    
    onSave(consultationData)
    handleClose()
  }

  const handleClose = () => {
    // Reset form
    setSymptoms("")
    setDiagnosis("")
    setAdvice("")
    setRequestLabTest(false)
    setLabType("")
    setPriority("")
    setCreatePrescription(false)
    setMedicine("")
    setPrescription("")
    setDosage("")
    setDuration("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-[1200px] mx-4 my-8 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#e7e8eb]">
          <div>
            <h2 className="text-[20px] font-normal text-[#212529] uppercase">CONSULTATION NOTES</h2>
            <div className="flex items-center gap-4 mt-1 text-[14px] text-[#6c757d]">
              <span>Patient Record: {patientName}</span>
              <span>Age: {patientAge}</span>
            </div>
          </div>
          <div className="text-[20px] font-semibold italic text-[#212529]">
            Month: <span className="font-normal">{currentMonth}</span>
          </div>
        </div>

        <div className="flex max-h-[80vh]">
          {/* Left Sidebar - Patient Info */}
          <div className="w-[320px] bg-[#fafafa] p-6 overflow-y-auto border-r border-[#e7e8eb]">
            {/* Patient Avatar and Name */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#e3f2fd] flex items-center justify-center">
                <svg className="w-6 h-6 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-[16px] font-semibold text-[#212529]">{patientName}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p className="text-[14px] text-[#212529]">{patientPhone}</p>
            </div>

            {/* Visit History Dropdown */}
            <div className="mb-6">
              <button 
                onClick={() => setShowVisitHistory(!showVisitHistory)}
                className="w-full flex items-center justify-between px-4 py-2 bg-white border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] hover:bg-[#f8f9fa] transition-colors"
              >
                <span>Visit History</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${showVisitHistory ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Visit History Content */}
              {showVisitHistory && (
                <div className="mt-2 p-4 bg-white border border-[#e7e8eb] rounded-lg">
                  <div className="space-y-3">
                    <div className="pb-3 border-b border-[#e7e8eb]">
                      <p className="text-[12px] text-[#6c757d]">Last Visit</p>
                      <p className="text-[14px] text-[#212529] font-medium">March 15, 2024</p>
                      <p className="text-[12px] text-[#6c757d] mt-1">Reason: Regular checkup</p>
                    </div>
                    <div className="pb-3 border-b border-[#e7e8eb]">
                      <p className="text-[12px] text-[#6c757d]">Previous Visit</p>
                      <p className="text-[14px] text-[#212529] font-medium">January 10, 2024</p>
                      <p className="text-[12px] text-[#6c757d] mt-1">Reason: Follow-up</p>
                    </div>
                    <div>
                      <p className="text-[12px] text-[#6c757d]">First Visit</p>
                      <p className="text-[14px] text-[#212529] font-medium">October 5, 2023</p>
                      <p className="text-[12px] text-[#6c757d] mt-1">Reason: Initial consultation</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Patient Details */}
            <div className="space-y-4">
              <div>
                <p className="text-[12px] text-[#6c757d] mb-1">Allergies:</p>
                <p className="text-[14px] text-[#212529]">{allergies}</p>
              </div>
              <div>
                <p className="text-[12px] text-[#6c757d] mb-1">Chronic disease:</p>
                <p className="text-[14px] text-[#212529]">{chronicDisease}</p>
              </div>
              <div>
                <p className="text-[12px] text-[#6c757d] mb-1">Blood type:</p>
                <p className="text-[14px] text-[#212529]">{bloodType}</p>
              </div>
              <div>
                <p className="text-[12px] text-[#6c757d] mb-1">Past illnesses or injuries:</p>
                <p className="text-[14px] text-[#212529]">{pastIllnesses}</p>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="flex-1 p-8 overflow-y-auto">
            <h3 className="text-[18px] font-semibold text-[#212529] mb-6">Add Note Form</h3>

            <div className="space-y-6">
              {/* Symptoms */}
            <div className="mb-6">
              <label className="block text-[14px] font-medium text-[#212529] mb-2">
                Symptoms
              </label>
              <textarea
                placeholder="Type here"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#007bff] resize-none"
              />
            </div>

            {/* Diagnosis */}
            <div className="mb-6">
              <label className="block text-[14px] font-medium text-[#212529] mb-2">
                Diagnosis
              </label>
              <textarea
                placeholder="Type here"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#007bff] resize-none"
              />
            </div>

            {/* Advice */}
            <div className="mb-6">
              <label className="block text-[14px] font-medium text-[#212529] mb-2">
                Advice
              </label>
              <textarea
                placeholder="Type here"
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#007bff] resize-none"
              />
            </div>

            {/* Request Lab Test Toggle */}
            <div className="flex items-center justify-between mb-4">
              <label className="text-[14px] font-medium text-[#212529]">
                Request Lab Test?
              </label>
              <button
                onClick={() => setRequestLabTest(!requestLabTest)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  requestLabTest ? "bg-[#28a745]" : "bg-[#e7e8eb]"
                }`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  requestLabTest ? "translate-x-6" : ""
                }`} />
              </button>
            </div>

            {/* Lab Type */}
            {requestLabTest && (
              <>
                <div className="mb-4">
                  <label className="block text-[14px] font-medium text-[#212529] mb-2">
                    Lab Type
                  </label>
                  <select
                    value={labType}
                    onChange={(e) => setLabType(e.target.value)}
                    className="w-full px-4 py-3 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] focus:outline-none focus:border-[#007bff]"
                  >
                    <option value="">Select Lab Test</option>
                    <option value="Blood Test">Blood Test</option>
                    <option value="Urine Test">Urine Test</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="MRI">MRI</option>
                    <option value="CT Scan">CT Scan</option>
                  </select>
                </div>

                {/* Priority */}
                <div className="mb-6">
                  <label className="block text-[14px] font-medium text-[#212529] mb-2">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-3 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] focus:outline-none focus:border-[#007bff]"
                  >
                    <option value="">Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </>
            )}

            {/* Create Prescription Toggle */}
            <div className="flex items-center justify-between mb-4">
              <label className="text-[14px] font-medium text-[#212529]">
                Create Prescription?
              </label>
              <button
                onClick={() => setCreatePrescription(!createPrescription)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  createPrescription ? "bg-[#28a745]" : "bg-[#e7e8eb]"
                }`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  createPrescription ? "translate-x-6" : ""
                }`} />
              </button>
            </div>

            {/* Prescription Fields */}
            {createPrescription && (
              <>
                {/* Medicine Search */}
                <div className="mb-4">
                  <label className="block text-[14px] font-medium text-[#212529] mb-2">
                    Medicine
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Search medicine"
                      value={medicine}
                      onChange={(e) => setMedicine(e.target.value)}
                      className="flex-1 px-4 py-3 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#007bff]"
                    />
                    <button className="px-6 py-3 bg-[#007bff] text-white rounded-lg text-[14px] hover:bg-[#0056b3] transition-colors">
                      Search
                    </button>
                  </div>
                </div>

                {/* Write Prescription */}
                <div className="mb-4">
                  <label className="block text-[14px] font-medium text-[#212529] mb-2">
                    Write Prescription
                  </label>
                  <textarea
                    placeholder="Type here"
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#007bff] resize-none"
                  />
                </div>

                {/* Dosage and Duration */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-[14px] font-medium text-[#212529] mb-2">
                      Dosage
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={dosage}
                        onChange={(e) => setDosage(e.target.value)}
                        className="flex-1 px-4 py-3 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] focus:outline-none focus:border-[#007bff]"
                      />
                      <span className="text-[14px] text-[#6c757d]">mg</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#212529] mb-2">
                      Duration
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="flex-1 px-4 py-3 border border-[#e7e8eb] rounded-lg text-[14px] text-[#212529] focus:outline-none focus:border-[#007bff]"
                      />
                      <span className="text-[14px] text-[#6c757d]">days</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-[#e7e8eb]">
              <button
                onClick={handleClose}
                className="px-6 py-3 border border-[#007bff] text-[#007bff] rounded-lg text-[14px] hover:bg-[#f0f8ff] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-[#007bff] text-white rounded-lg text-[14px] hover:bg-[#0056b3] transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
