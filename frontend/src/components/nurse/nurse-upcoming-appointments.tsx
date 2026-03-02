"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Appointment {
  id: string
  patientName: string
  patientId: string
  patientAvatar?: string
  doctorName: string
  doctorSpecialty: string
  date: string
  time: string
  duration: string
  type: "consultation" | "follow-up" | "check-up" | "procedure"
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show"
  room: string
  notes?: string
}

interface BookingFormData {
  patientName: string
  patientId: string
  doctorId: string
  date: string
  time: string
  type: string
  notes: string
}

const mockDoctors = [
  { id: "DR001", name: "Dr. James Wilson", specialty: "General Medicine" },
  { id: "DR002", name: "Dr. Sarah Chen", specialty: "Cardiology" },
  { id: "DR003", name: "Dr. Michael Brown", specialty: "Orthopedics" },
  { id: "DR004", name: "Dr. Emily Davis", specialty: "Pediatrics" },
]

const mockPatients = [
  { id: "PT001", name: "Sarah Johnson" },
  { id: "PT002", name: "Michael Chen" },
  { id: "PT003", name: "Emma Wilson" },
  { id: "PT004", name: "David Lee" },
]

const timeSlots = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
]

export function NurseUpcomingAppointments() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"upcoming" | "today" | "past">("upcoming")
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    patientName: "",
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    type: "consultation",
    notes: ""
  })

  const [rescheduleForm, setRescheduleForm] = useState({
    date: "",
    time: "",
    reason: ""
  })

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "APT001",
      patientName: "Sarah Johnson",
      patientId: "PT-10234",
      doctorName: "Dr. James Wilson",
      doctorSpecialty: "General Medicine",
      date: "2025-03-02",
      time: "09:00 AM",
      duration: "30 min",
      type: "consultation",
      status: "scheduled",
      room: "Room 101",
      notes: "Follow-up for hypertension management"
    },
    {
      id: "APT002",
      patientName: "Michael Chen",
      patientId: "PT-10235",
      doctorName: "Dr. Sarah Chen",
      doctorSpecialty: "Cardiology",
      date: "2025-03-02",
      time: "10:30 AM",
      duration: "45 min",
      type: "check-up",
      status: "scheduled",
      room: "Room 203",
      notes: "Annual cardiac evaluation"
    },
    {
      id: "APT003",
      patientName: "Emma Wilson",
      patientId: "PT-10236",
      doctorName: "Dr. Michael Brown",
      doctorSpecialty: "Orthopedics",
      date: "2025-03-02",
      time: "11:00 AM",
      duration: "30 min",
      type: "follow-up",
      status: "in-progress",
      room: "Room 105"
    },
    {
      id: "APT004",
      patientName: "David Lee",
      patientId: "PT-10237",
      doctorName: "Dr. Emily Davis",
      doctorSpecialty: "Pediatrics",
      date: "2025-03-02",
      time: "02:00 PM",
      duration: "30 min",
      type: "consultation",
      status: "scheduled",
      room: "Room 302"
    },
    {
      id: "APT005",
      patientName: "Lisa Park",
      patientId: "PT-10238",
      doctorName: "Dr. James Wilson",
      doctorSpecialty: "General Medicine",
      date: "2025-03-01",
      time: "03:00 PM",
      duration: "30 min",
      type: "check-up",
      status: "completed",
      room: "Room 101"
    },
    {
      id: "APT006",
      patientName: "Robert Kim",
      patientId: "PT-10239",
      doctorName: "Dr. Sarah Chen",
      doctorSpecialty: "Cardiology",
      date: "2025-03-03",
      time: "09:30 AM",
      duration: "45 min",
      type: "procedure",
      status: "scheduled",
      room: "Room 203",
      notes: "ECG and stress test"
    }
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <span className="px-2 py-1 bg-[#e8f4fd] text-[#007bff] rounded-full text-[11px] font-medium">Scheduled</span>
      case "in-progress":
        return <span className="px-2 py-1 bg-[#fff3cd] text-[#856404] rounded-full text-[11px] font-medium">In Progress</span>
      case "completed":
        return <span className="px-2 py-1 bg-[#d1fae5] text-[#059669] rounded-full text-[11px] font-medium">Completed</span>
      case "cancelled":
        return <span className="px-2 py-1 bg-[#fee2e2] text-[#dc2626] rounded-full text-[11px] font-medium">Cancelled</span>
      case "no-show":
        return <span className="px-2 py-1 bg-[#f3f4f6] text-[#6b7280] rounded-full text-[11px] font-medium">No Show</span>
      default:
        return null
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "consultation":
        return <span className="px-2 py-1 bg-[#dbeafe] text-[#1d4ed8] rounded text-[11px]">Consultation</span>
      case "follow-up":
        return <span className="px-2 py-1 bg-[#fef3c7] text-[#d97706] rounded text-[11px]">Follow-up</span>
      case "check-up":
        return <span className="px-2 py-1 bg-[#d1fae5] text-[#059669] rounded text-[11px]">Check-up</span>
      case "procedure":
        return <span className="px-2 py-1 bg-[#fce7f3] text-[#be185d] rounded text-[11px]">Procedure</span>
      default:
        return null
    }
  }

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.patientId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus
    
    const today = new Date().toISOString().split('T')[0]
    if (activeTab === "today") {
      return matchesSearch && matchesStatus && apt.date === "2025-03-02" // Mock today
    } else if (activeTab === "past") {
      return matchesSearch && matchesStatus && apt.status === "completed"
    }
    return matchesSearch && matchesStatus && apt.status !== "completed"
  })

  const handleViewDetail = (appointment: Appointment) => {
    // Navigate to appointment detail page
    router.push(`/nurse/appointment/${appointment.id}`)
  }

  const handleOpenDetailModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setShowDetailModal(true)
  }

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setRescheduleForm({ date: appointment.date, time: "", reason: "" })
    setShowRescheduleModal(true)
  }

  const handleBookAppointment = () => {
    if (!bookingForm.patientId || !bookingForm.doctorId || !bookingForm.date || !bookingForm.time) {
      return
    }

    const selectedDoctor = mockDoctors.find(d => d.id === bookingForm.doctorId)
    const selectedPatient = mockPatients.find(p => p.id === bookingForm.patientId)

    const newAppointment: Appointment = {
      id: `APT${String(appointments.length + 1).padStart(3, '0')}`,
      patientName: selectedPatient?.name || bookingForm.patientName,
      patientId: bookingForm.patientId,
      doctorName: selectedDoctor?.name || "",
      doctorSpecialty: selectedDoctor?.specialty || "",
      date: bookingForm.date,
      time: bookingForm.time,
      duration: "30 min",
      type: bookingForm.type as Appointment["type"],
      status: "scheduled",
      room: "TBD",
      notes: bookingForm.notes
    }

    setAppointments([...appointments, newAppointment])
    setShowBookingModal(false)
    setBookingForm({
      patientName: "",
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      type: "consultation",
      notes: ""
    })
  }

  const handleConfirmReschedule = () => {
    if (!selectedAppointment || !rescheduleForm.date || !rescheduleForm.time) return

    setAppointments(appointments.map(apt => 
      apt.id === selectedAppointment.id 
        ? { ...apt, date: rescheduleForm.date, time: rescheduleForm.time }
        : apt
    ))
    setShowRescheduleModal(false)
    setSelectedAppointment(null)
  }

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
    ))
    setShowDetailModal(false)
  }

  const handleMarkComplete = (appointmentId: string) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, status: "completed" } : apt
    ))
    setShowDetailModal(false)
  }

  return (
    <div className="w-full max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[30px] font-bold text-[#212529] tracking-[-0.75px]">Upcoming Appointments</h1>
          <p className="text-[16px] text-[#6c757d]">Manage patient appointments and schedules</p>
        </div>
        <button
          onClick={() => setShowBookingModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Book Appointment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#e7e8eb] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] text-[#6c757d]">Today's Appointments</p>
              <p className="text-[24px] font-bold text-[#212529]">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#e7e8eb] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#fff3cd] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] text-[#6c757d]">In Progress</p>
              <p className="text-[24px] font-bold text-[#212529]">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#e7e8eb] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#d1fae5] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] text-[#6c757d]">Completed Today</p>
              <p className="text-[24px] font-bold text-[#212529]">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#e7e8eb] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#fee2e2] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] text-[#6c757d]">Cancelled</p>
              <p className="text-[24px] font-bold text-[#212529]">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white rounded-xl border border-[#e7e8eb] p-6">
        <div className="flex items-center justify-between mb-6">
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                activeTab === "upcoming"
                  ? "bg-[#007bff] text-white"
                  : "text-[#6c757d] hover:bg-[#f8f9fa]"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("today")}
              className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                activeTab === "today"
                  ? "bg-[#007bff] text-white"
                  : "text-[#6c757d] hover:bg-[#f8f9fa]"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                activeTab === "past"
                  ? "bg-[#007bff] text-white"
                  : "text-[#6c757d] hover:bg-[#f8f9fa]"
              }`}
            >
              Past
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg className="w-4 h-4 text-[#6c757d] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search patient or doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] w-[250px] focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#6c757d] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e8eb]">
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Patient</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Doctor</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Date & Time</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Type</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Room</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Status</th>
                <th className="text-left py-3 px-4 text-[14px] font-medium text-[#6c757d]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-[#f8f9fa] hover:bg-[#f8f9fa] transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#e8f4fd] flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-[#212529]">{appointment.patientName}</p>
                        <p className="text-[12px] text-[#6c757d]">{appointment.patientId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-[14px] text-[#212529]">{appointment.doctorName}</p>
                    <p className="text-[12px] text-[#6c757d]">{appointment.doctorSpecialty}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-[14px] text-[#212529]">{appointment.date}</p>
                    <p className="text-[12px] text-[#6c757d]">{appointment.time} ({appointment.duration})</p>
                  </td>
                  <td className="py-4 px-4">{getTypeBadge(appointment.type)}</td>
                  <td className="py-4 px-4 text-[14px] text-[#212529]">{appointment.room}</td>
                  <td className="py-4 px-4">{getStatusBadge(appointment.status)}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetail(appointment)}
                        className="p-2 hover:bg-[#e8f4fd] rounded-lg transition-colors"
                        title="View Details"
                      >
                        <svg className="w-4 h-4 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {appointment.status === "scheduled" && (
                        <button
                          onClick={() => handleReschedule(appointment)}
                          className="p-2 hover:bg-[#fff3cd] rounded-lg transition-colors"
                          title="Reschedule"
                        >
                          <svg className="w-4 h-4 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-[#e7e8eb] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-[16px] text-[#6c757d]">No appointments found</p>
          </div>
        )}
      </div>

      {/* Book Appointment Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[500px] max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#e7e8eb]">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-bold text-[#212529]">Book New Appointment</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-[#f8f9fa] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#212529] mb-2">Patient</label>
                <select
                  value={bookingForm.patientId}
                  onChange={(e) => setBookingForm({ ...bookingForm, patientId: e.target.value })}
                  className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                >
                  <option value="">Select Patient</option>
                  {mockPatients.map((patient) => (
                    <option key={patient.id} value={patient.id}>{patient.name} ({patient.id})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#212529] mb-2">Doctor</label>
                <select
                  value={bookingForm.doctorId}
                  onChange={(e) => setBookingForm({ ...bookingForm, doctorId: e.target.value })}
                  className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                >
                  <option value="">Select Doctor</option>
                  {mockDoctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialty}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#212529] mb-2">Date</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#212529] mb-2">Time</label>
                  <select
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#212529] mb-2">Appointment Type</label>
                <select
                  value={bookingForm.type}
                  onChange={(e) => setBookingForm({ ...bookingForm, type: e.target.value })}
                  className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                >
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="check-up">Check-up</option>
                  <option value="procedure">Procedure</option>
                </select>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#212529] mb-2">Notes (Optional)</label>
                <textarea
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#007bff] resize-none"
                  placeholder="Add any notes about this appointment..."
                />
              </div>
            </div>
            <div className="p-6 border-t border-[#e7e8eb] flex justify-end gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="px-4 py-2 border border-[#e7e8eb] rounded-lg text-[14px] text-[#6c757d] hover:bg-[#f8f9fa] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                className="px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointment && (
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
                <p className="text-[14px] font-medium text-[#212529]">{selectedAppointment.patientName}</p>
                <p className="text-[12px] text-[#6c757d]">Current: {selectedAppointment.date} at {selectedAppointment.time}</p>
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
                onClick={handleConfirmReschedule}
                className="px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {showDetailModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[500px]">
            <div className="p-6 border-b border-[#e7e8eb]">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-bold text-[#212529]">Appointment Details</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-[#f8f9fa] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#e8f4fd] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[18px] font-semibold text-[#212529]">{selectedAppointment.patientName}</p>
                  <p className="text-[14px] text-[#6c757d]">{selectedAppointment.patientId}</p>
                </div>
                <div className="ml-auto">{getStatusBadge(selectedAppointment.status)}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#e7e8eb]">
                <div>
                  <p className="text-[12px] text-[#6c757d] mb-1">Doctor</p>
                  <p className="text-[14px] font-medium text-[#212529]">{selectedAppointment.doctorName}</p>
                  <p className="text-[12px] text-[#6c757d]">{selectedAppointment.doctorSpecialty}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#6c757d] mb-1">Room</p>
                  <p className="text-[14px] font-medium text-[#212529]">{selectedAppointment.room}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#6c757d] mb-1">Date & Time</p>
                  <p className="text-[14px] font-medium text-[#212529]">{selectedAppointment.date}</p>
                  <p className="text-[12px] text-[#6c757d]">{selectedAppointment.time} ({selectedAppointment.duration})</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#6c757d] mb-1">Type</p>
                  {getTypeBadge(selectedAppointment.type)}
                </div>
              </div>

              {selectedAppointment.notes && (
                <div className="pt-4 border-t border-[#e7e8eb]">
                  <p className="text-[12px] text-[#6c757d] mb-1">Notes</p>
                  <p className="text-[14px] text-[#212529]">{selectedAppointment.notes}</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-[#e7e8eb] flex justify-between">
              <div className="flex gap-2">
                {selectedAppointment.status === "scheduled" && (
                  <>
                    <button
                      onClick={() => handleCancelAppointment(selectedAppointment.id)}
                      className="px-4 py-2 border border-[#dc2626] text-[#dc2626] rounded-lg text-[14px] hover:bg-[#fee2e2] transition-colors"
                    >
                      Cancel Appointment
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailModal(false)
                        handleReschedule(selectedAppointment)
                      }}
                      className="px-4 py-2 border border-[#d97706] text-[#d97706] rounded-lg text-[14px] hover:bg-[#fff3cd] transition-colors"
                    >
                      Reschedule
                    </button>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                {selectedAppointment.status === "in-progress" && (
                  <button
                    onClick={() => handleMarkComplete(selectedAppointment.id)}
                    className="px-4 py-2 bg-[#059669] text-white rounded-lg text-[14px] font-medium hover:bg-[#047857] transition-colors"
                  >
                    Mark Complete
                  </button>
                )}
                <button
                  onClick={() => router.push(`/nurse/patient/${selectedAppointment.patientId.replace('PT-', 'PT')}`)}
                  className="px-4 py-2 bg-[#007bff] text-white rounded-lg text-[14px] font-medium hover:bg-[#0056b3] transition-colors"
                >
                  View Patient Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
