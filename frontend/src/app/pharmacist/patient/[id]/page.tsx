"use client"

import { useParams, useRouter } from "next/navigation"
import { AppShell } from "@/components/layout/app-shell"
import { PatientMedicalBook } from "@/components/pharmacist/patient-medical-book"

const patientData: Record<string, {
  name: string
  idDisplay: string
  age: number
  gender: string
  bloodType: string
  allergies: string[]
  medicalHistory: string[]
}> = {
  "RPT0025": {
    name: "James Carter",
    idDisplay: "PT-10234",
    age: 45,
    gender: "Male",
    bloodType: "A+",
    allergies: ["Penicillin"],
    medicalHistory: ["Hypertension", "Asthma"]
  },
  "RPT0024": {
    name: "Emily Davis",
    idDisplay: "PT-10235",
    age: 32,
    gender: "Female",
    bloodType: "B+",
    allergies: ["Sulfa drugs"],
    medicalHistory: ["Type 2 Diabetes"]
  },
  "RPT0023": {
    name: "Michael Johnson",
    idDisplay: "PT-10236",
    age: 58,
    gender: "Male",
    bloodType: "O-",
    allergies: ["Aspirin", "Ibuprofen"],
    medicalHistory: ["Heart Disease", "Hypertension"]
  },
  "RPT0022": {
    name: "Olivia Miller",
    idDisplay: "PT-10237",
    age: 28,
    gender: "Female",
    bloodType: "AB+",
    allergies: [],
    medicalHistory: ["Anxiety"]
  },
  "RPT0021": {
    name: "David Smith",
    idDisplay: "PT-10238",
    age: 67,
    gender: "Male",
    bloodType: "A-",
    allergies: ["Codeine"],
    medicalHistory: ["Type 2 Diabetes", "Hypertension", "Arthritis"]
  },
  "RPT0020": {
    name: "Sophia Wilson",
    idDisplay: "PT-10239",
    age: 41,
    gender: "Female",
    bloodType: "O+",
    allergies: ["Latex"],
    medicalHistory: ["Migraine"]
  },
  "default": {
    name: "Sarah Johnson",
    idDisplay: "PT-10234",
    age: 34,
    gender: "Female",
    bloodType: "O+",
    allergies: ["Nuts", "pollen", "Sulfa drugs"],
    medicalHistory: ["Hypertension", "Type 2 Diabetes"]
  }
}

export default function PharmacistPatientPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.id as string

  const patient = patientData[patientId] || patientData["default"]

  return (
    <AppShell>
      <PatientMedicalBook
        patientId={patientId}
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
