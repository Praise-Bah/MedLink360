"use client"

import { use } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { PatientDetail } from "@/components/patients/patient-detail"

export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  return (
    <AppShell>
      <PatientDetail patientId={id} />
    </AppShell>
  )
}
