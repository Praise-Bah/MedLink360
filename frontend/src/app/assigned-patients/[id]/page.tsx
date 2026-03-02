"use client"

import { use } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { PatientVitalsDetail } from "@/components/nurse/patient-vitals-detail"

export default function AssignedPatientDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  return (
    <AppShell>
      <PatientVitalsDetail patientId={id} />
    </AppShell>
  )
}
