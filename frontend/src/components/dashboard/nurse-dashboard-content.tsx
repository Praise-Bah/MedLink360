"use client"

export function NurseDashboardContent() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-lg border border-[#e2e4e5] p-6">
        <h2 className="text-[24px] font-bold text-[#242731] mb-2">
          Welcome Nurse Carter,
        </h2>
        <p className="text-[14px] text-[#575f6e]">
          You have 12 patients assigned to you today
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Care Overview */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-[#e2e4e5] p-6">
          <h3 className="text-[18px] font-semibold text-[#242731] mb-6">
            Patient Care Overview
          </h3>
          
          {/* Bar Chart */}
          <div className="h-64 flex items-end justify-around gap-4">
            {[
              { label: "8-15", value: 17, height: "40%" },
              { label: "16-20", value: 45, height: "60%" },
              { label: "21-29", value: 85, height: "80%" },
              { label: "30-45", value: 135, height: "95%" },
              { label: "46-60", value: 35, height: "50%" },
              { label: "61-80", value: 10, height: "25%" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-[#8b5cf6] rounded-t-lg" style={{ height: item.height }} />
                <span className="text-[12px] text-[#575f6e]">{item.label}</span>
                <span className="text-[14px] font-semibold text-[#242731]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-lg border border-[#e2e4e5] p-6">
          <h3 className="text-[18px] font-semibold text-[#242731] mb-4">
            Today's Tasks
          </h3>
          
          <div className="space-y-3">
            {[
              { task: "Medication Round", time: "9:00 AM", status: "completed" },
              { task: "Vital Signs Check", time: "10:30 AM", status: "in-progress" },
              { task: "Wound Dressing", time: "2:00 PM", status: "pending" },
              { task: "Patient Assessment", time: "4:00 PM", status: "pending" },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-[#f2f8ff] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={item.status === "completed"}
                    className="h-4 w-4"
                    readOnly
                  />
                  <span className="text-[14px] font-medium text-[#242731]">
                    {item.task}
                  </span>
                </div>
                <span className="text-[12px] text-[#575f6e]">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assigned Patients */}
      <div className="bg-white rounded-lg border border-[#e2e4e5] p-6">
        <h3 className="text-[18px] font-semibold text-[#242731] mb-4">
          Assigned Patients
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Emma Johnson", room: "Room 101", condition: "Post-Surgery", priority: "high" },
            { name: "Michael Brown", room: "Room 102", condition: "Recovery", priority: "medium" },
            { name: "Sarah Davis", room: "Room 103", condition: "Observation", priority: "low" },
            { name: "James Wilson", room: "Room 104", condition: "ICU", priority: "high" },
            { name: "Lisa Anderson", room: "Room 105", condition: "Stable", priority: "low" },
            { name: "Robert Taylor", room: "Room 106", condition: "Monitoring", priority: "medium" },
          ].map((patient, i) => (
            <div key={i} className="p-4 border border-[#e2e4e5] rounded-lg hover:border-[#007bff] transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[14px] font-semibold text-[#242731]">
                    {patient.name}
                  </p>
                  <p className="text-[12px] text-[#575f6e]">{patient.room}</p>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-medium ${
                  patient.priority === "high" ? "bg-red-100 text-red-700" :
                  patient.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                  "bg-green-100 text-green-700"
                }`}>
                  {patient.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-[12px] text-[#575f6e]">{patient.condition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="p-6 bg-white border border-[#e2e4e5] rounded-lg hover:border-[#8b5cf6] transition-colors text-center">
          <div className="text-[32px] mb-2">💊</div>
          <p className="text-[14px] font-medium text-[#242731]">Medications</p>
        </button>
        <button className="p-6 bg-white border border-[#e2e4e5] rounded-lg hover:border-[#8b5cf6] transition-colors text-center">
          <div className="text-[32px] mb-2">📋</div>
          <p className="text-[14px] font-medium text-[#242731]">Care Plans</p>
        </button>
        <button className="p-6 bg-white border border-[#e2e4e5] rounded-lg hover:border-[#8b5cf6] transition-colors text-center">
          <div className="text-[32px] mb-2">🩺</div>
          <p className="text-[14px] font-medium text-[#242731]">Vital Signs</p>
        </button>
        <button className="p-6 bg-white border border-[#e2e4e5] rounded-lg hover:border-[#8b5cf6] transition-colors text-center">
          <div className="text-[32px] mb-2">📝</div>
          <p className="text-[14px] font-medium text-[#242731]">Notes</p>
        </button>
      </div>
    </div>
  )
}
