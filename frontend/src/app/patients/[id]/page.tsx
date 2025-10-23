import { PatientDetails } from "@/components/patients/patient-details"

interface PatientDetailPageProps {
  params: {
    id: string
  }
}

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  return <PatientDetails patientId={params.id} />
}
