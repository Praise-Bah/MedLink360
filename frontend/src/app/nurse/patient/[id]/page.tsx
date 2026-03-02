"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { AppShell } from "@/components/layout/app-shell"
import { NursePatientMedicalBook } from "@/components/nurse/nurse-patient-medical-book"

const patientData: Record<string, {
  name: string
  idDisplay: string
  age: number
  gender: string
  bloodType: string
  allergies: string[]
  medicalHistory: string[]
}> = {
  "PT001": {
    name: "Sarah Johnson",
    idDisplay: "PT-10234",
    age: 34,
    gender: "Female",
    bloodType: "O+",
    allergies: ["Nuts", "Pollen", "Sulfa drugs"],
    medicalHistory: ["Hypertension", "Type 2 Diabetes"]
  },
  "PT002": {
    name: "Michael Chen",
    idDisplay: "PT-10235",
    age: 45,
    gender: "Male",
    bloodType: "A+",
    allergies: ["Penicillin"],
    medicalHistory: ["Asthma", "High Cholesterol"]
  },
  "PT003": {
    name: "Emma Wilson",
    idDisplay: "PT-10236",
    age: 28,
    gender: "Female",
    bloodType: "B+",
    allergies: [],
    medicalHistory: ["Migraine"]
  },
  "default": {
    name: "Ateeq Rafiq",
    idDisplay: "PT-10234",
    age: 28,
    gender: "Male",
    bloodType: "O+",
    allergies: ["Sulfa drugs"],
    medicalHistory: ["Stage 2 Hypertension"]
  }
}

export default function NursePatientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const patient = patientData[id] || patientData["default"]

  return (
    <AppShell>
      <NursePatientMedicalBook
        patientId={id}
        patientName={patient.name}
        patientIdDisplay={patient.idDisplay}
        age={patient.age}
        gender={patient.gender}
        bloodType={patient.bloodType}
        allergies={patient.allergies}
        medicalHistory={patient.medicalHistory}
        onBack={() => router.push("/dashboard")}
      />
    </AppShell>
  )
}
