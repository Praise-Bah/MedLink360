"use client"

export function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "appointment",
      title: "Appointment confirmed",
      description: "Your appointment with Dr. Sarah Johnson has been confirmed for tomorrow at 10:30 AM at St. Mary's Hospital",
      priority: "high",
      time: "2 hours ago",
      read: false,
      icon: "📅"
    },
    {
      id: 2,
      type: "appointment",
      title: "Appointment confirmed",
      description: "Your appointment with Dr. Sarah Johnson has been confirmed for tomorrow at 10:30 AM at St. Mary's Hospital",
      priority: "high",
      time: "2 hours ago",
      read: false,
      icon: "📅"
    },
    {
      id: 3,
      type: "prescription",
      title: "Prescription Ready for Pickup",
      description: "Your prescription for Lisinopril 10mg is ready for pickup at Central Pharmacy. Pharmacy confirmation received.",
      priority: "medium",
      time: "4 hours ago",
      read: false,
      icon: "💊"
    },
    {
      id: 4,
      type: "appointment",
      title: "Appointment rescheduled",
      description: "Your appointment with Dr. Sarah Johnson has been confirmed for tomorrow at 10:30 AM at St. Mary's Hospital",
      priority: "low",
      time: "7 hours ago",
      read: false,
      icon: "📅"
    },
    {
      id: 5,
      type: "prescription",
      title: "Prescription Ready for Pickup",
      description: "Your prescription for Lisinopril 10mg is ready for pickup at Central Pharmacy. Pharmacy confirmation received.",
      priority: "medium",
      time: "4 days ago",
      read: false,
      icon: "💊"
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 z-10">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-lg">MedLink360</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <a href="/dashboard" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg">📊</span>
            <span>Dashboard Overview</span>
          </a>
          <a href="/appointments" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg">📅</span>
            <span>Appointments</span>
          </a>
          <a href="/medical-book" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg">📋</span>
            <span>Medical Book</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-white bg-white/20 rounded-lg px-4 py-3">
            <span className="text-lg">🔔</span>
            <span>Notifications</span>
          </a>
          <a href="/profile" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg">👤</span>
            <span>Profile</span>
          </a>
          <a href="/settings" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg">⚙️</span>
            <span>Settings</span>
          </a>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-20 left-6 right-6">
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">D</span>
            </div>
            <div>
              <p className="font-medium text-sm">Divino237</p>
              <p className="text-xs text-white/70">Patient</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="absolute bottom-6 left-6 right-6">
          <button className="w-full bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                5
              </span>
            </div>
            <p className="text-gray-600">Stay updated with appointments, medical book changes, and pharmacy confirmations</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex items-center space-x-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search notifications..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm">
                <option>All types</option>
                <option>Appointments</option>
                <option>Prescriptions</option>
                <option>Medical Records</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <span className="text-xl">{notification.icon}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-blue-600">
                          {notification.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(notification.priority)}`}>
                          {notification.priority}
                        </span>
                        <span className="text-sm text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Mark as read</span>
                  </button>
                  <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm font-medium">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
