import { AppShell } from "@/components/layout/app-shell"
import { PatientDetail } from "@/components/patients/patient-detail"

interface PatientDetailPageProps {
  params: {
    id: string
  }
}

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  return (
    <AppShell>
      <PatientDetail patientId={params.id} />
    </AppShell>
  )
}
