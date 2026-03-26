"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { MyAppointments } from "@/components/appointments/my-appointments"
import { NurseUpcomingAppointments } from "@/components/nurse/nurse-upcoming-appointments"
import { AppointmentsPage } from "@/components/dashboard/appointments-page"

export default function Appointments() {
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const role = localStorage.getItem("selectedRole")
    setUserRole(role)
  }, [])

  return (
    <AppShell>
      {userRole === "nurse" ? (
        <NurseUpcomingAppointments />
      ) : userRole === "patient" ? (
        <AppointmentsPage />
      ) : (
        <MyAppointments />
      )}
    </AppShell>
  )
}
