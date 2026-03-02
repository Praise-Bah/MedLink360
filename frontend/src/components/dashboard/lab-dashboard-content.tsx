"use client"

export function LabDashboardContent() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-lg border border-[#e2e4e5] p-6">
        <h2 className="text-[24px] font-bold text-[#242731] mb-2">
          Welcome Lab Technician,
        </h2>
        <p className="text-[14px] text-[#575f6e]">
          You have 8 pending test results to process
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-[#e2e4e5] p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-[24px]">
              🧪
            </div>
            <div>
              <p className="text-[12px] text-[#575f6e]">Pending Tests</p>
              <p className="text-[24px] font-bold text-[#242731]">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e2e4e5] p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center text-[24px]">
              ✅
            </div>
            <div>
              <p className="text-[12px] text-[#575f6e]">Completed Today</p>
              <p className="text-[24px] font-bold text-[#242731]">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e2e4e5] p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-lg bg-yellow-50 flex items-center justify-center text-[24px]">
              ⏱️
            </div>
            <div>
              <p className="text-[12px] text-[#575f6e]">In Progress</p>
              <p className="text-[24px] font-bold text-[#242731]">5</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#e2e4e5] p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-lg bg-red-50 flex items-center justify-center text-[24px]">
              🚨
            </div>
            <div>
              <p className="text-[12px] text-[#575f6e]">Urgent</p>
              <p className="text-[24px] font-bold text-[#242731]">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Test Queue */}
      <div className="bg-white rounded-lg border border-[#e2e4e5] p-6">
        <h3 className="text-[18px] font-semibold text-[#242731] mb-4">
          Test Queue
        </h3>
        <div className="space-y-3">
          {[
            { patient: "Emma Johnson", test: "Blood Test - CBC", priority: "urgent", time: "30 min ago" },
            { patient: "Michael Brown", test: "Urine Analysis", priority: "normal", time: "1 hour ago" },
            { patient: "Sarah Davis", test: "X-Ray - Chest", priority: "normal", time: "2 hours ago" },
            { patient: "James Wilson", test: "Blood Test - Glucose", priority: "urgent", time: "45 min ago" },
            { patient: "Lisa Anderson", test: "ECG", priority: "normal", time: "3 hours ago" },
          ].map((item, i) => (
            <div key={i} className="p-4 border border-[#e2e4e5] rounded-lg hover:border-[#007bff] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-[14px] font-semibold text-[#242731]">
                      {item.patient}
                    </p>
                    <span className={`px-2 py-1 rounded text-[10px] font-medium ${
                      item.priority === "urgent" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {item.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#575f6e] mb-1">{item.test}</p>
                  <p className="text-[11px] text-[#9ca3af]">{item.time}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[#007bff] text-white rounded-lg text-[12px] hover:bg-[#0056b3]">
                    Process
                  </button>
                  <button className="px-4 py-2 border border-[#e2e4e5] rounded-lg text-[12px] hover:bg-gray-50">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-white rounded-lg border border-[#e2e4e5] p-6">
        <h3 className="text-[18px] font-semibold text-[#242731] mb-4">
          Recent Results
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { patient: "Robert Taylor", test: "Blood Test - CBC", status: "Completed", result: "Normal" },
            { patient: "Anna Wilson", test: "Urine Analysis", status: "Completed", result: "Abnormal" },
            { patient: "John Doe", test: "X-Ray - Chest", status: "Completed", result: "Normal" },
            { patient: "Jane Smith", test: "Blood Test - Lipid Panel", status: "Completed", result: "Normal" },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-[#f2f8ff] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[14px] font-semibold text-[#242731]">
                  {item.patient}
                </p>
                <span className={`px-2 py-1 rounded text-[10px] font-medium ${
                  item.result === "Normal" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {item.result}
                </span>
              </div>
              <p className="text-[12px] text-[#575f6e]">{item.test}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="p-6 bg-white border border-[#e2e4e5] rounded-lg hover:border-[#007bff] transition-colors text-center">
          <div className="text-[32px] mb-2">🧪</div>
          <p className="text-[14px] font-medium text-[#242731]">New Test</p>
        </button>
        <button className="p-6 bg-white border border-[#e2e4e5] rounded-lg hover:border-[#007bff] transition-colors text-center">
          <div className="text-[32px] mb-2">📊</div>
          <p className="text-[14px] font-medium text-[#242731]">Results</p>
        </button>
        <button className="p-6 bg-white border border-[#e2e4e5] rounded-lg hover:border-[#007bff] transition-colors text-center">
          <div className="text-[32px] mb-2">📋</div>
          <p className="text-[14px] font-medium text-[#242731]">Reports</p>
        </button>
        <button className="p-6 bg-white border border-[#e2e4e5] rounded-lg hover:border-[#007bff] transition-colors text-center">
          <div className="text-[32px] mb-2">⚙️</div>
          <p className="text-[14px] font-medium text-[#242731]">Equipment</p>
        </button>
      </div>
    </div>
  )
}
