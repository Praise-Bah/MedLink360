import { Button } from "@/components/common/Button"

export function HealthcareAccessCard() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Content */}
            <div className="p-8 lg:p-12">
              <h3 className="text-3xl font-bold text-blue-600 mb-4">
                Seamless Healthcare Access
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Connect with healthcare providers instantly and share your verified information 
                safely.
              </p>
              
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start now
              </Button>
            </div>

            {/* Right side - Blue placeholder for image */}
            <div className="bg-blue-600 h-64 lg:h-auto flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <p className="text-blue-100 text-sm">Healthcare Team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
