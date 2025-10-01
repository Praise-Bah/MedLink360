"use client"

import { Button } from "@/components/common/Button"

export function MedicalBookPage() {
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
          <a href="/appointments" className="flex items-center space-x-3 text-white/80 hover:bg-white/10 rounded-lg px-4 py-3">
            <span className="text-lg"></span>
            <span>Appointments</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-white bg-white/20 rounded-lg px-4 py-3">
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-600 mb-2">Medical Book</h1>
              <p className="text-gray-600">Your complete medical history and records in diary-like format</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Upload Files</span>
            </Button>
          </div>
        </div>

        {/* File Upload Area */}
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</h3>
                <p className="text-gray-500">Upload your medical records, test results, prescriptions, and other documents</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md">
                Choose Files
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 pb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by doctor, diagnosis or symptoms..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
              <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-md px-4 py-3 pr-8 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                <option>All Status</option>
                <option>Recent</option>
                <option>Lab Results</option>
                <option>Prescriptions</option>
                <option>Reports</option>
              </select>
              <svg className="absolute right-2 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Upload Medical Records Section */}
        <div className="px-6 pb-6">
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-2">Upload Medical Records</h3>
                <p className="text-gray-600 mb-4">Add past records, documents</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State Message */}
        <div className="px-6 pb-12">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No medical records yet</h3>
            <p className="text-gray-500 mb-6">Start building your medical history by uploading your first document</p>
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md">
              Upload Your First Record
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
