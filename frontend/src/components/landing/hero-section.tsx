"use client"

import { Button } from "@/components/common/Button"

export function HeroSection() {
  return (
    <section 
      className="min-h-screen flex items-center relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/pattern1.png)' }}
    >
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
              <Button className="bg-blue-600 hover:bg-white-700 px-6 py-3">
                Find a doctor
              </Button>
              <Button className="px-6 py-3 hover:bg-blue-700 bg-white-600 ">
                Learn more
              </Button>
            </div>
          </div>

          {/* Right side - Healthcare professional image */}
          <div className="relative">
            <img 
              src="/image1.png" 
              alt="Healthcare professional with stethoscope" 
              className="w-full h-[100vh] max-w-2xl ml-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
