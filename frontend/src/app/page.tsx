import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/layout/header"
import { DashboardCard } from "@/components/dashboard/dashboard-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to MedLink360</h1>
          <p className="mt-2 text-gray-600">Healthcare management platform connecting patients with providers</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Patients"
            value="1,234"
            description="Active patients in system"
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="Appointments Today"
            value="28"
            description="Scheduled for today"
            trend={{ value: 5, isPositive: true }}
          />
          <DashboardCard
            title="Pending Reviews"
            value="15"
            description="Awaiting doctor review"
            trend={{ value: 3, isPositive: false }}
          />
          <DashboardCard
            title="System Status"
            value="Online"
            description="All systems operational"
          />
        </div>

        {/* Login Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
            <p className="text-gray-600 mb-6">
              Sign in to access your healthcare dashboard and manage patient information.
            </p>
            <LoginForm />
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Patient Management System
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Appointment Scheduling
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Medical Records
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Healthcare Analytics
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
