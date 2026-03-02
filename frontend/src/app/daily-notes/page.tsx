"use client"

import { AppShell } from "@/components/layout/app-shell"
import { DailyNotesPage } from "@/components/nurse/daily-notes"

export default function DailyNotes() {
  return (
    <AppShell>
      <DailyNotesPage />
    </AppShell>
  )
}
