import Link from "next/link"

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">MedLink360</h2>
        <nav className="space-y-2">
          <Link 
            href="/dashboard" 
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link 
            href="/patients" 
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Patients
          </Link>
        </nav>
      </div>
    </aside>
  )
}
