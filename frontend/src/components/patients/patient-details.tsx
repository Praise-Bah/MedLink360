"use client"

interface PatientDetailsProps {
  patientId: string
}

export function PatientDetails({ patientId }: PatientDetailsProps) {
  // Mock data - replace with actual API call
  const patient = {
    id: patientId,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    dateOfBirth: "1990-01-01",
    address: "123 Main St, City, State 12345",
    medicalHistory: [
      "Hypertension",
      "Diabetes Type 2"
    ]
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Patient Details</h1>
        <p className="text-gray-600">Patient ID: {patientId}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="text-gray-900">{patient.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{patient.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="text-gray-900">{patient.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <p className="text-gray-900">{patient.dateOfBirth}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="text-gray-900">{patient.address}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Medical History</h2>
            <div className="space-y-2">
              {patient.medicalHistory.map((condition, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  {condition}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
