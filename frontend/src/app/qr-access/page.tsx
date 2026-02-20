import { AppShell } from "@/components/layout/app-shell"
import { ScanPatientQR } from "@/components/scan-qr/scan-patient-qr"

export default function QRAccess() {
  return (
    <AppShell>
      <ScanPatientQR />
    </AppShell>
  )
}
