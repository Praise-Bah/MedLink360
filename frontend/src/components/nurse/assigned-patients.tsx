"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface Patient {
  id: string
  name: string
  initials: string
  age: number
  gender: string
  room: string
  bed: string
  condition: string
  status: "critical" | "stable" | "recovering"
  admissionDate: string
  diagnosis: string
  doctor: string
}

export function AssignedPatientsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const scannedPatientId = searchParams.get("patient")
  
  const [activeTab, setActiveTab] = useState<"all" | "critical" | "stable">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const patients: Patient[] = [
    { 
      id: "PT001", 
      name: "Ateeq Rafiq", 
      initials: "AR", 
      age: 28, 
      gender: "Male", 
      room: "Ward 12A",
      bed: "Bed 3",
      condition: "Hypertension", 
      status: "stable",
      admissionDate: "Jan 15, 2024",
      diagnosis: "Stage 2 Hypertension",
      doctor: "Dr. Sarah Wilson"
    },
    { 
      id: "PT002", 
      name: "Michael Chen", 
      initials: "MC", 
      age: 45, 
      gender: "Male", 
      room: "Ward 12A",
      bed: "Bed 5",
      condition: "Diabetes Type 2", 
      status: "critical",
      admissionDate: "Jan 14, 2024",
      diagnosis: "Diabetic Ketoacidosis",
      doctor: "Dr. James Brown"
    },
    { 
      id: "PT003", 
      name: "Emma Wilson", 
      initials: "EW", 
      age: 32, 
      gender: "Female", 
      room: "Ward 12B",
      bed: "Bed 1",
      condition: "Asthma", 
      status: "recovering",
      admissionDate: "Jan 13, 2024",
      diagnosis: "Acute Asthma Attack",
      doctor: "Dr. Lisa Anderson"
    },
    { 
      id: "PT004", 
      name: "James Brown", 
      initials: "JB", 
      age: 52, 
      gender: "Male", 
      room: "Ward 12A",
      bed: "Bed 7",
      condition: "Arthritis", 
      status: "stable",
      admissionDate: "Jan 12, 2024",
      diagnosis: "Rheumatoid Arthritis",
      doctor: "Dr. Emily Davis"
    },
    { 
      id: "PT005", 
      name: "Lisa Anderson", 
      initials: "LA", 
      age: 39, 
      gender: "Female", 
      room: "Ward 12B",
      bed: "Bed 4",
      condition: "Migraine", 
      status: "stable",
      admissionDate: "Jan 16, 2024",
      diagnosis: "Chronic Migraine",
      doctor: "Dr. Robert Taylor"
    },
    { 
      id: "PT006", 
      name: "Robert Taylor", 
      initials: "RT", 
      age: 61, 
      gender: "Male", 
      room: "ICU",
      bed: "Bed 2",
      condition: "Post-Surgery", 
      status: "critical",
      admissionDate: "Jan 15, 2024",
      diagnosis: "Cardiac Bypass Recovery",
      doctor: "Dr. Sarah Wilson"
    },
  ]

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || 
                      (activeTab === "critical" && patient.status === "critical") ||
                      (activeTab === "stable" && (patient.status === "stable" || patient.status === "recovering"))
    return matchesSearch && matchesTab
  })

  const handlePatientClick = (patientId: string) => {
    router.push(`/assigned-patients/${patientId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-[#fef2f2] text-[#dc2626] border-[#fecaca]"
      case "stable": return "bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]"
      case "recovering": return "bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]"
      default: return "bg-[#f3f4f6] text-[#6b7280] border-[#e5e7eb]"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#212529]">Assigned Patients</h1>
          <p className="text-[14px] text-[#6c757d]">
            Manage and monitor your assigned patients
          </p>
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

      {/* Scanned Patient Alert */}
      {scannedPatientId && (
        <div className="bg-[#d1fae5] border border-[#10b981] rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#10b981] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-medium text-[#065f46]">Patient Scanned Successfully</p>
            <p className="text-[12px] text-[#047857]">Patient ID: {scannedPatientId} has been identified</p>
          </div>
          <button 
            onClick={() => handlePatientClick(scannedPatientId)}
            className="px-4 py-2 bg-[#10b981] text-white rounded-lg text-[14px] font-medium hover:bg-[#059669] transition-colors"
          >
            View Details
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#e9ecef] p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#e8f4fd] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[28px] font-bold text-[#212529]">{patients.length}</p>
              <p className="text-[14px] text-[#6c757d]">Total Assigned</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e9ecef] p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#fef2f2] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-[28px] font-bold text-[#212529]">{patients.filter(p => p.status === "critical").length}</p>
              <p className="text-[14px] text-[#6c757d]">Critical</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e9ecef] p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#f0fdf4] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[28px] font-bold text-[#212529]">{patients.filter(p => p.status === "stable" || p.status === "recovering").length}</p>
              <p className="text-[14px] text-[#6c757d]">Stable/Recovering</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-[#e9ecef] p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
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
              All Patients
            </button>
            <button
              onClick={() => setActiveTab("critical")}
              className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                activeTab === "critical"
                  ? "bg-[#dc2626] text-white"
                  : "text-[#6c757d] hover:bg-[#f8f9fa]"
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setActiveTab("stable")}
              className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                activeTab === "stable"
                  ? "bg-[#16a34a] text-white"
                  : "text-[#6c757d] hover:bg-[#f8f9fa]"
              }`}
            >
              Stable
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <svg className="w-5 h-5 text-[#6c757d] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[#e9ecef] rounded-lg text-[14px] w-64 focus:outline-none focus:border-[#007bff]"
            />
          </div>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => handlePatientClick(patient.id)}
            className={`bg-white rounded-xl border border-[#e9ecef] p-5 cursor-pointer hover:border-[#007bff] hover:shadow-md transition-all ${
              scannedPatientId === patient.id ? "border-[#10b981] border-2 shadow-md" : ""
            }`}
          >
            {/* Patient Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#007bff] flex items-center justify-center text-white text-[16px] font-semibold">
                  {patient.initials}
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-[#212529]">{patient.name}</p>
                  <p className="text-[12px] text-[#6c757d]">{patient.id}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[11px] font-medium border ${getStatusColor(patient.status)}`}>
                {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
              </span>
            </div>

            {/* Patient Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-[13px]">
                <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-[#6c757d]">{patient.room} • {patient.bed}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-[#212529]">{patient.diagnosis}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-[#6c757d]">{patient.doctor}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-[#e9ecef]">
              <button 
                onClick={(e) => { e.stopPropagation(); handlePatientClick(patient.id) }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#007bff] text-white rounded-lg text-[12px] font-medium hover:bg-[#0056b3] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Record Vitals
              </button>
              <button 
                onClick={(e) => e.stopPropagation()}
                className="p-2 border border-[#e9ecef] rounded-lg hover:bg-[#f8f9fa] transition-colors"
              >
                <svg className="w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
