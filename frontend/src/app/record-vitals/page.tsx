"use client"

import { AppShell } from "@/components/layout/app-shell"
import { RecordVitalsPage } from "@/components/nurse/record-vitals"

export default function RecordVitals() {
  return (
    <AppShell>
      <RecordVitalsPage />
    </AppShell>
  )
}
