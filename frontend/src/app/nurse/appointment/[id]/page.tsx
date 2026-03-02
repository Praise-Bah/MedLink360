"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"

interface AppointmentDetail {
  id: string
  patientName: string
  patientId: string
  patientAge: number
  patientGender: string
  patientPhone: string
  patientEmail: string
  doctorName: string
  doctorSpecialty: string
  date: string
  time: string
  duration: string
  type: "consultation" | "follow-up" | "check-up" | "procedure"
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show"
  room: string
  chiefComplaint?: string
  notes?: string
  vitalsRecorded: boolean
  lastVitals?: {
    temperature: string
    bloodPressure: string
    heartRate: string
    respiratoryRate: string
    oxygenSaturation: string
    recordedAt: string
  }
}

const mockAppointmentData: Record<string, AppointmentDetail> = {
  "APT001": {
    id: "APT001",
    patientName: "Sarah Johnson",
    patientId: "PT-10234",
    patientAge: 34,
    patientGender: "Female",
    patientPhone: "+1 (555) 123-4567",
    patientEmail: "sarah.j@email.com",
    doctorName: "Dr. James Wilson",
    doctorSpecialty: "General Medicine",
    date: "2025-03-02",
    time: "09:00 AM",
    duration: "30 min",
    type: "consultation",
    status: "scheduled",
    room: "Room 101",
    chiefComplaint: "Follow-up for hypertension management. Patient reports occasional dizziness.",
    notes: "Patient has been on Lisinopril 10mg for 3 months. Review medication effectiveness.",
    vitalsRecorded: true,
    lastVitals: {
      temperature: "98.6°F",
      bloodPressure: "142/88 mmHg",
      heartRate: "78 bpm",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%",
      recordedAt: "2025-03-02 08:45 AM"
    }
  },
  "default": {
    id: "APT000",
    patientName: "Patient Name",
    patientId: "PT-00000",
    patientAge: 30,
    patientGender: "Unknown",
    patientPhone: "+1 (555) 000-0000",
    patientEmail: "patient@email.com",
    doctorName: "Dr. Unknown",
    doctorSpecialty: "General Medicine",
    date: "2025-03-02",
    time: "09:00 AM",
    duration: "30 min",
    type: "consultation",
    status: "scheduled",
    room: "TBD",
    vitalsRecorded: false
  }
}

export default function NurseAppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showRecordVitalsModal, setShowRecordVitalsModal] = useState(false)
  const [appointmentStatus, setAppointmentStatus] = useState<string>("scheduled")

  const appointment = mockAppointmentData[id] || mockAppointmentData["default"]

  const [vitalsForm, setVitalsForm] = useState({
    temperature: "",
    bloodPressure: "",
    heartRate: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    notes: ""
  })

  const [rescheduleForm, setRescheduleForm] = useState({
    date: appointment.date,
    time: "",
    reason: ""
  })

  const timeSlots = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <span className="px-3 py-1 bg-[#e8f4fd] text-[#007bff] rounded-full text-[12px] font-medium">Scheduled</span>
      case "in-progress":
        return <span className="px-3 py-1 bg-[#fff3cd] text-[#856404] rounded-full text-[12px] font-medium">In Progress</span>
      case "completed":
        return <span className="px-3 py-1 bg-[#d1fae5] text-[#059669] rounded-full text-[12px] font-medium">Completed</span>
      case "cancelled":
        return <span className="px-3 py-1 bg-[#fee2e2] text-[#dc2626] rounded-full text-[12px] font-medium">Cancelled</span>
      default:
        return null
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "consultation":
        return <span className="px-2 py-1 bg-[#dbeafe] text-[#1d4ed8] rounded text-[12px]">Consultation</span>
      case "follow-up":
        return <span className="px-2 py-1 bg-[#fef3c7] text-[#d97706] rounded text-[12px]">Follow-up</span>
      case "check-up":
        return <span className="px-2 py-1 bg-[#d1fae5] text-[#059669] rounded text-[12px]">Check-up</span>
      case "procedure":
        return <span className="px-2 py-1 bg-[#fce7f3] text-[#be185d] rounded text-[12px]">Procedure</span>
      default:
        return null
    }
  }

  const handleStartAppointment = () => {
    setAppointmentStatus("in-progress")
  }

  const handleCompleteAppointment = () => {
    setAppointmentStatus("completed")
  }

  const handleCancelAppointment = () => {
    setAppointmentStatus("cancelled")
  }

  const handleRecordVitals = () => {
    // Save vitals logic here
    setShowRecordVitalsModal(false)
  }

  const handleReschedule = () => {
    // Reschedule logic here
    setShowRescheduleModal(false)
    router.push("/appointments")
  }

  return (
    <AppShell>
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
            <h1 className="text-[30px] font-bold text-[#212529] tracking-[-0.75px]">Appointment Details</h1>
            <p className="text-[16px] text-[#6c757d]">View and manage appointment information</p>
          </div>
          <div className="flex items-center gap-3">
            {appointmentStatus === "scheduled" && (
              <>
                <button
                  onClick={() => setShowRescheduleModal(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-[#d97706] text-[#d97706] rounded-lg text-[14px] hover:bg-[#fff3cd] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Reschedule
                </button>
                <button
                  onClick={handleStartAppointment}
                  className="flex items-center gap-2 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Appointment
                </button>
              </>
            )}
            {appointmentStatus === "in-progress" && (
              <button
                onClick={handleCompleteAppointment}
                className="flex items-center gap-2 px-4 py-2 bg-[#059669] text-white rounded-lg text-[14px] font-medium hover:bg-[#047857] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Complete Appointment
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Patient & Appointment Info */}
          <div className="col-span-2 space-y-6">
            {/* Patient Information Card */}
            <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[18px] font-semibold text-[#212529]">Patient Information</h2>
                <button
                  onClick={() => router.push(`/nurse/patient/${appointment.patientId.replace('PT-', 'PT')}`)}
                  className="text-[14px] text-[#007bff] hover:underline"
                >
                  View Medical Record →
                </button>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[#e8f4fd] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[12px] text-[#6c757d] mb-1">Patient Name</p>
                    <p className="text-[14px] font-medium text-[#212529]">{appointment.patientName}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#6c757d] mb-1">Patient ID</p>
                    <p className="text-[14px] font-medium text-[#212529]">{appointment.patientId}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#6c757d] mb-1">Age / Gender</p>
                    <p className="text-[14px] font-medium text-[#212529]">{appointment.patientAge} / {appointment.patientGender}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#6c757d] mb-1">Phone</p>
                    <p className="text-[14px] font-medium text-[#212529]">{appointment.patientPhone}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#6c757d] mb-1">Email</p>
                    <p className="text-[14px] font-medium text-[#212529]">{appointment.patientEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Details Card */}
            <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[18px] font-semibold text-[#212529]">Appointment Details</h2>
                {getStatusBadge(appointmentStatus)}
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-[12px] text-[#6c757d] mb-1">Doctor</p>
                  <p className="text-[14px] font-medium text-[#212529]">{appointment.doctorName}</p>
                  <p className="text-[12px] text-[#6c757d]">{appointment.doctorSpecialty}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#6c757d] mb-1">Date & Time</p>
                  <p className="text-[14px] font-medium text-[#212529]">{appointment.date}</p>
                  <p className="text-[12px] text-[#6c757d]">{appointment.time} ({appointment.duration})</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#6c757d] mb-1">Room</p>
                  <p className="text-[14px] font-medium text-[#212529]">{appointment.room}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#6c757d] mb-1">Type</p>
                  {getTypeBadge(appointment.type)}
                </div>
              </div>

              {appointment.chiefComplaint && (
                <div className="pt-4 border-t border-[#e7e8eb]">
                  <p className="text-[12px] text-[#6c757d] mb-2">Chief Complaint</p>
                  <p className="text-[14px] text-[#212529] bg-[#f8f9fa] rounded-lg p-3">{appointment.chiefComplaint}</p>
                </div>
              )}

              {appointment.notes && (
                <div className="pt-4">
                  <p className="text-[12px] text-[#6c757d] mb-2">Notes</p>
                  <p className="text-[14px] text-[#212529]">{appointment.notes}</p>
                </div>
              )}
            </div>

            {/* Vitals Card */}
            <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[18px] font-semibold text-[#212529]">Vital Signs</h2>
                <button
                  onClick={() => setShowRecordVitalsModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Record Vitals
                </button>
              </div>

              {appointment.vitalsRecorded && appointment.lastVitals ? (
                <div>
                  <p className="text-[12px] text-[#6c757d] mb-4">Last recorded: {appointment.lastVitals.recordedAt}</p>
                  <div className="grid grid-cols-5 gap-4">
                    <div className="bg-[#f8f9fa] rounded-lg p-4 text-center">
                      <p className="text-[12px] text-[#6c757d] mb-1">Temperature</p>
                      <p className="text-[18px] font-semibold text-[#212529]">{appointment.lastVitals.temperature}</p>
                    </div>
                    <div className="bg-[#f8f9fa] rounded-lg p-4 text-center">
                      <p className="text-[12px] text-[#6c757d] mb-1">Blood Pressure</p>
                      <p className="text-[18px] font-semibold text-[#212529]">{appointment.lastVitals.bloodPressure}</p>
                    </div>
                    <div className="bg-[#f8f9fa] rounded-lg p-4 text-center">
                      <p className="text-[12px] text-[#6c757d] mb-1">Heart Rate</p>
                      <p className="text-[18px] font-semibold text-[#212529]">{appointment.lastVitals.heartRate}</p>
                    </div>
                    <div className="bg-[#f8f9fa] rounded-lg p-4 text-center">
                      <p className="text-[12px] text-[#6c757d] mb-1">Respiratory</p>
                      <p className="text-[18px] font-semibold text-[#212529]">{appointment.lastVitals.respiratoryRate}</p>
                    </div>
                    <div className="bg-[#f8f9fa] rounded-lg p-4 text-center">
                      <p className="text-[12px] text-[#6c757d] mb-1">O2 Saturation</p>
                      <p className="text-[18px] font-semibold text-[#212529]">{appointment.lastVitals.oxygenSaturation}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-[#e7e8eb] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-[14px] text-[#6c757d]">No vitals recorded yet</p>
                  <p className="text-[12px] text-[#6c757d]">Click "Record Vitals" to add vital signs</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
              <h2 className="text-[18px] font-semibold text-[#212529] mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/nurse/patient/${appointment.patientId.replace('PT-', 'PT')}`)}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-[#e7e8eb] rounded-lg hover:bg-[#f8f9fa] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] font-medium text-[#212529]">View Medical Record</p>
                    <p className="text-[12px] text-[#6c757d]">Access patient's full medical book</p>
                  </div>
                </button>

                <button
                  onClick={() => setShowRecordVitalsModal(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-[#e7e8eb] rounded-lg hover:bg-[#f8f9fa] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#d1fae5] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] font-medium text-[#212529]">Record Vitals</p>
                    <p className="text-[12px] text-[#6c757d]">Add new vital signs reading</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 border border-[#e7e8eb] rounded-lg hover:bg-[#f8f9fa] transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#fef3c7] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] font-medium text-[#212529]">Add Nursing Note</p>
                    <p className="text-[12px] text-[#6c757d]">Document observations</p>
                  </div>
                </button>

                {appointmentStatus === "scheduled" && (
                  <button
                    onClick={handleCancelAppointment}
                    className="w-full flex items-center gap-3 px-4 py-3 border border-[#fee2e2] rounded-lg hover:bg-[#fee2e2] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#fee2e2] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-[14px] font-medium text-[#dc2626]">Cancel Appointment</p>
                      <p className="text-[12px] text-[#6c757d]">Cancel this appointment</p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Appointment Timeline */}
            <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
              <h2 className="text-[18px] font-semibold text-[#212529] mb-4">Activity Timeline</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f4fd] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#212529]">Appointment Scheduled</p>
                    <p className="text-[12px] text-[#6c757d]">Feb 28, 2025 at 10:30 AM</p>
                  </div>
                </div>
                {appointment.vitalsRecorded && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#d1fae5] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#212529]">Vitals Recorded</p>
                      <p className="text-[12px] text-[#6c757d]">{appointment.lastVitals?.recordedAt}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Record Vitals Modal */}
      {showRecordVitalsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[500px]">
            <div className="p-6 border-b border-[#e7e8eb]">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-bold text-[#212529]">Record Vital Signs</h2>
                <button
                  onClick={() => setShowRecordVitalsModal(false)}
                  className="p-2 hover:bg-[#f8f9fa] rounded-lg transition-colors"
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
                  <label className="block text-[14px] font-medium text-[#212529] mb-2">Temperature (°F)</label>
                  <input
                    type="text"
                    value={vitalsForm.temperature}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, temperature: e.target.value })}
                    placeholder="e.g., 98.6"
                    className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#212529] mb-2">Blood Pressure (mmHg)</label>
                  <input
                    type="text"
                    value={vitalsForm.bloodPressure}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, bloodPressure: e.target.value })}
                    placeholder="e.g., 120/80"
                    className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#212529] mb-2">Heart Rate (bpm)</label>
                  <input
                    type="text"
                    value={vitalsForm.heartRate}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, heartRate: e.target.value })}
                    placeholder="e.g., 72"
                    className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#212529] mb-2">Respiratory Rate (/min)</label>
                  <input
                    type="text"
                    value={vitalsForm.respiratoryRate}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, respiratoryRate: e.target.value })}
                    placeholder="e.g., 16"
                    className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#212529] mb-2">Oxygen Saturation (%)</label>
                <input
                  type="text"
                  value={vitalsForm.oxygenSaturation}
                  onChange={(e) => setVitalsForm({ ...vitalsForm, oxygenSaturation: e.target.value })}
                  placeholder="e.g., 98"
                  className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#212529] mb-2">Notes (Optional)</label>
                <textarea
                  value={vitalsForm.notes}
                  onChange={(e) => setVitalsForm({ ...vitalsForm, notes: e.target.value })}
                  rows={2}
                  placeholder="Any additional observations..."
                  className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff] resize-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-[#e7e8eb] flex justify-end gap-3">
              <button
                onClick={() => setShowRecordVitalsModal(false)}
                className="px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#6c757d] hover:bg-[#f8f9fa] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRecordVitals}
                className="px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
              >
                Save Vitals
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[450px]">
            <div className="p-6 border-b border-[#e7e8eb]">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-bold text-[#212529]">Reschedule Appointment</h2>
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="p-2 hover:bg-[#f8f9fa] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-[#f8f9fa] rounded-lg p-4">
                <p className="text-[14px] font-medium text-[#212529]">{appointment.patientName}</p>
                <p className="text-[12px] text-[#6c757d]">Current: {appointment.date} at {appointment.time}</p>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#212529] mb-2">New Date</label>
                <input
                  type="date"
                  value={rescheduleForm.date}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, date: e.target.value })}
                  className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#212529] mb-2">New Time</label>
                <select
                  value={rescheduleForm.time}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, time: e.target.value })}
                  className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                >
                  <option value="">Select Time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#212529] mb-2">Reason for Rescheduling</label>
                <textarea
                  value={rescheduleForm.reason}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, reason: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff] resize-none"
                  placeholder="Enter reason..."
                />
              </div>
            </div>
            <div className="p-6 border-t border-[#e7e8eb] flex justify-end gap-3">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#6c757d] hover:bg-[#f8f9fa] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                className="px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  )
}
