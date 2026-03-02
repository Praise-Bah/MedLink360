import { AppShell } from "@/components/layout/app-shell"
import { PatientRecords } from "@/components/patients/patient-records"

export default function PatientsPage() {
  return (
    <AppShell>
      <PatientRecords />
    </AppShell>
  )
}
