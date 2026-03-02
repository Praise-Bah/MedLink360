import { AppShell } from "@/components/layout/app-shell"
import { PrescriptionsPage } from "@/components/medical-book/prescriptions"

export default function PrescriptionsRoute() {
  return (
    <AppShell>
      <PrescriptionsPage />
    </AppShell>
  )
}
