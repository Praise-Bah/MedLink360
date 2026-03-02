"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { ScanPatientQR } from "@/components/scan-qr/scan-patient-qr"

export default function QRAccess() {
  const [userRole, setUserRole] = useState<"nurse" | "pharmacist" | "doctor">("doctor")

  useEffect(() => {
    // Get user role from localStorage - use same key as AppShell
    const storedRole = localStorage.getItem("selectedRole") as "nurse" | "pharmacist" | "doctor" | null
    if (storedRole) {
      setUserRole(storedRole)
    }
  }, [])

  return (
    <AppShell>
      <ScanPatientQR userRole={userRole} />
    </AppShell>
  )
}
