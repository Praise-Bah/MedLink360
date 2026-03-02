"use client"

import { AppShell } from "@/components/layout/app-shell"
import { useEffect, useState } from "react"
import { PatientDashboardContent } from "@/components/dashboard/patient-dashboard-content"
import { DoctorDashboardContent } from "@/components/dashboard/doctor-dashboard-content"
import { NurseDashboardContent } from "@/components/dashboard/nurse-dashboard-content"
import { LabDashboardContent } from "@/components/dashboard/lab-dashboard-content"
import { PharmacistDashboardContent } from "@/components/dashboard/pharmacist-dashboard-content"

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = window.localStorage.getItem("selectedRole")
      setUserRole(role)
    }
  }, [])

  const renderDashboardContent = () => {
    switch (userRole) {
      case "patient":
        return <PatientDashboardContent />
      case "doctor":
        return <DoctorDashboardContent />
      case "nurse":
        return <NurseDashboardContent />
      case "lab-technician":
        return <LabDashboardContent />
      case "pharmacist":
        return <PharmacistDashboardContent />
      default:
        return (
          <div className="bg-white rounded-lg border border-[#e2e4e5] p-6 text-center">
            <h2 className="text-[24px] font-bold text-[#242731] mb-2">
              Welcome to MedLink360
            </h2>
            <p className="text-[14px] text-[#575f6e]">
              Please select a role to view your dashboard
            </p>
          </div>
        )
    }
  }

  return (
    <AppShell>
      {renderDashboardContent()}
    </AppShell>
  )
}
