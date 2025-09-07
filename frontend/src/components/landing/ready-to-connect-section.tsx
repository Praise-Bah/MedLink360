import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ReadyToConnectSection() {
  return (
    <section className="min-h-screen flex flex-col">
      {/* Light blue section - takes up most of the screen */}
      <div className="flex-1 bg-blue-300 flex items-center justify-center px-4">
        {/* This section can be filled with content as needed */}
      </div>
      
      {/* Dark blue section with content */}
      <div className="bg-blue-800 px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Connect with Healthcare Professionals?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust MedLink360 for secure, reliable healthcare 
            connections and medical record management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-800 px-8 py-3 text-lg font-semibold"
              >
                Join MedLink360
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-800 px-8 py-3 text-lg font-semibold"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-blue-900 px-4 py-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-200 text-sm">
            © 2025 MedLink360. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}
