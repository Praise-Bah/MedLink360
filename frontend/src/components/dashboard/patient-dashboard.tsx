"use client"

import { Button } from "@/components/common/Button"

export function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-500/20 backdrop-blur-sm p-6">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 font-bold text-sm">M</span>
          </div>
          <span className="text-white font-semibold">MedLink360</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-3 text-white bg-white/20 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Dashboard Overview</span>
          </a>
          <a href="/appointments" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
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
      <div className="flex-1 p-8">
        {/* Welcome Header */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Divina237</h1>
          <p className="text-white/80">Here's your health overview for today</p>
        </div>

        {/* Emergency Information */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg"></span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Emergency Information - Ministry of Health</h2>
              <div className="flex space-x-8 mt-2">
                <div>
                  <p className="text-white/80 text-sm">Emergency Services</p>
                  <p className="text-white/80 text-sm">Poison Control</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-white/80">
              <p> 911 - Immediate Emergency</p>
              <p> 911 - Immediate Emergency</p>
            </div>
            <div className="text-white/80">
              <p> +237 677777777</p>
              <p> health.gov/emergency</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center mb-4">
              <span className="text-white text-lg mr-3"></span>
              <h2 className="text-xl font-bold text-white">Upcoming Appointments</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">DB</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Dr. Bah Praise</h3>
                    <p className="text-white/70 text-sm">Cardiologist</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-semibold">Dr. Bah Praise</h3>
              </div>
            </div>
          </div>

          {/* Health Summary */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center mb-4">
              <span className="text-white text-lg mr-3"></span>
              <h2 className="text-xl font-bold text-white">Health Summary</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Blood Pressure</span>
                <span className="text-white">120/80</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Heart Rate</span>
                <span className="text-white">72 bpm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Weight</span>
                <span className="text-white">70 kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-white text-lg mr-3"></span>
              <h2 className="text-xl font-bold text-white">Recent Notifications</h2>
            </div>
            <button className="text-white/80 hover:text-white text-sm">View All</button>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-1">Appointment Confirmed</h3>
              <p className="text-white/70 text-sm mb-2">Your appointment with Dr. Praise Bah has been confirmed for tomorrow at 10:30 AM</p>
              <span className="text-white/60 text-xs">2 hours ago</span>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-1">Appointment Confirmed</h3>
              <p className="text-white/70 text-sm mb-2">Your appointment with Dr. Praise Bah has been confirmed for tomorrow at 10:30 AM</p>
              <span className="text-white/60 text-xs">2 hours ago</span>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-1">Appointment Confirmed</h3>
              <p className="text-white/70 text-sm mb-2">Your appointment with Dr. Praise Bah has been confirmed for tomorrow at 10:30 AM</p>
              <span className="text-white/60 text-xs">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
