import { LabResultDetail } from "@/components/medical-book/lab-result-detail"

export default function LabResultDetailPage({ params }: { params: { type: string } }) {
  const testType = params.type === "full-body" ? "full-body" : "blood-test"
  
  return <LabResultDetail testType={testType} />
}
