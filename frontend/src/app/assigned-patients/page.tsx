"use client"

import { Suspense } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { AssignedPatientsPage } from "@/components/nurse/assigned-patients"

export default function AssignedPatients() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-6 text-center text-gray-500">Loading...</div>}>
        <AssignedPatientsPage />
      </Suspense>
    </AppShell>
  )
}
