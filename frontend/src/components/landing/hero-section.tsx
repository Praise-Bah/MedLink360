"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-blue-600 leading-tight">
                Connect.
              </h1>
              <h1 className="text-5xl font-bold text-blue-600 leading-tight">
                Care.
              </h1>
              <h1 className="text-5xl font-bold text-blue-600 leading-tight">
                Heal.
              </h1>
            </div>
            
            <p className="text-lg text-gray-600 max-w-md">
              Your trusted platform to connect with verified medical professionals, 
              access quality healthcare services, and securely manage your medical reports 
              all in one place.
            </p>
            
            <div className="flex space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3">
                Find a doctor
              </Button>
              <Button variant="outline" className="px-6 py-3">
                Learn more
              </Button>
            </div>
          </div>

          {/* Right side - Blue placeholder for image */}
          <div className="bg-blue-600 rounded-lg h-96 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Healthcare Professional</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
