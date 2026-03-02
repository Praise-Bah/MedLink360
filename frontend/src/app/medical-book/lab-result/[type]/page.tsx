"use client"

import { use } from "react"
import { LabResultDetail } from "@/components/medical-book/lab-result-detail"

export default function LabResultDetailPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = use(params)
  const testType = type === "full-body" ? "full-body" : "blood-test"
  
  return <LabResultDetail testType={testType} />
}
