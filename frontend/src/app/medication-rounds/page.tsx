"use client"

import { AppShell } from "@/components/layout/app-shell"
import { MedicationRoundsPage } from "@/components/nurse/medication-rounds"

export default function MedicationRounds() {
  return (
    <AppShell>
      <MedicationRoundsPage />
    </AppShell>
  )
}
