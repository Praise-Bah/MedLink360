"use client"

import { Button } from "@/components/common/Button"

export function AppointmentsPage() {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Bah Praise",
      specialty: "Cardiologist",
      date: "2025-09-15",
      time: "10:30am",
      location: "St. Mary's Hospital",
      address: "123 Medical Center Dr, Room 205",
      type: "Follow-Up",
      reason: "Hypertension check-up",
      notes: "Bring recent blood pressure readings",
      status: "Confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Bah Praise",
      specialty: "Cardiologist",
      date: "2025-09-15",
      time: "10:30am",
      location: "St. Mary's Hospital",
      address: "123 Medical Center Dr, Room 205",
      type: "Follow-Up",
      reason: "Hypertension check-up",
      notes: "Bring recent blood pressure readings",
      status: "Confirmed"
    },
    {
      id: 3,
      doctor: "Dr. Bah Praise",
      specialty: "Cardiologist",
      date: "2025-09-16",
      time: "10:30am",
      location: "St. Mary's Hospital",
      address: "123 Medical Center Dr, Room 205",
      type: "Follow-Up",
      reason: "Hypertension check-up",
      notes: "Bring recent blood pressure readings",
      status: "Pending"
    },
    {
      id: 4,
      doctor: "Dr. Bah Praise",
      specialty: "Cardiologist",
      date: "2025-09-16",
      time: "10:30am",
      location: "St. Mary's Hospital",
      address: "123 Medical Center Dr, Room 205",
      type: "Follow-Up",
      reason: "Hypertension check-up",
      notes: "Bring recent blood pressure readings",
      status: "Confirmed"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-500/20 backdrop-blur-sm p-6 fixed h-full overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 font-bold text-sm">M</span>
          </div>
          <span className="text-white font-semibold">MedLink360</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <a href="/dashboard" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Dashboard Overview</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-white bg-white/20 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Appointments</span>
          </a>
          <a href="/medical-book" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Medical Book</span>
          </a>
          <a href="/notifications" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Notifications</span>
          </a>
          <a href="/profile" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Profile</span>
          </a>
          <a href="/settings" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Settings</span>
          </a>
        </nav>

        {/* User Profile */}
        <div className="mt-auto pt-8">
          <div className="bg-white/20 rounded-lg p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <div>
              <div className="text-white font-semibold">Divina237</div>
              <div className="text-white/70 text-sm">Patient</div>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-white/80 hover:text-white mt-4 px-4 py-2">
            <span className="text-lg"></span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white ml-64 h-screen overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-50 p-6 border-b">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Appointments</h1>
          <p className="text-gray-600">Book, view, and manage your healthcare appointments</p>
          
          {/* Search and Filter Bar */}
          <div className="flex items-center space-x-4 mt-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search doctors, specialties, or reasons..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
              <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-md px-4 py-3 pr-8 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                <option>All Status</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
              <svg className="absolute right-2 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
           <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md"> Book New Appointment </Button>

          </div>
        </div>

        {/* Appointments List */}
        <div className="p-6 space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {/* Doctor Avatar */}
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">BP</span>
                  </div>
                  
                  {/* Appointment Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{appointment.doctor}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium mb-3">{appointment.specialty}</p>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                      <span className="text-gray-500"></span>
                          <span className="text-gray-700">{appointment.date} at {appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500"></span>
                          <div>
                            <div className="text-gray-700">{appointment.location}</div>
                            <div className="text-gray-500 text-sm">{appointment.address}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-gray-700">Type: </span>
                          <span className="text-gray-600">{appointment.type}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Reason: </span>
                          <span className="text-gray-600">{appointment.reason}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Notes: </span>
                          <span className="text-gray-600">{appointment.notes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Avatar with P */}
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center ml-4">
                  <span className="text-white font-bold">P</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <span></span>
                  <span>View Details</span>
                </button>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <span></span>
                  <span>Reschedule</span>
                </button>
                <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                  <span></span>
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
