"use client"

import { AppShell } from "@/components/layout/app-shell"
import { AssignedPatientsPage } from "@/components/nurse/assigned-patients"

export default function AssignedPatients() {
  return (
    <AppShell>
      <AssignedPatientsPage />
    </AppShell>
  )
}
