import { AppShell } from "@/components/layout/app-shell"
import { PendingPrescriptions } from "@/components/pharmacist/pending-prescriptions"

export default function PendingPrescriptionsPage() {
  return (
    <AppShell>
      <PendingPrescriptions />
    </AppShell>
  )
}
