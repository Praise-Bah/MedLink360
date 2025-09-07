"use client"

import { Button } from "@/components/common/Button"
import { useEffect, useRef } from "react"

export function HealthcareAccessCard() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const currentCardRef = useRef(0)
  const totalCards = 3

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollToNextCard = () => {
      currentCardRef.current = (currentCardRef.current + 1) % totalCards
      const cardWidth = container.clientWidth
      container.scrollTo({
        left: currentCardRef.current * cardWidth,
        behavior: 'smooth'
      })
    }

    const interval = setInterval(scrollToNextCard, 5000) // Auto-scroll every 5 seconds

    return () => clearInterval(interval)
  }, [])
  return (
    <section className="min-h-screen flex items-center justify-center py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-6xl font-black text-blue-600 mb-4">
            Welcome to the Future of Healthcare
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience seamless, secure, and instant access to your medical information
          </p>
        </div>

        {/* Horizontally Scrollable Cards */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-scroll mb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
        >
          <div className="flex">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden min-w-full max-w-full flex-shrink-0 snap-start mx-4">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left side - Content */}
                <div className="p-12">
                  <h3 className="text-3xl font-bold text-blue-600 mb-6">
                    Seamless Healthcare Access
                  </h3>
                  
                  <p className="text-gray-600 mb-8 text-base leading-relaxed">
                    Connect with healthcare providers instantly and share your verified information safely.
                  </p>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700 text-base px-6 py-3">
                    Start now
                  </Button>
                </div>

                {/* Right side - Healthcare professionals image */}
                <div className="relative">
                  <img 
                    src="/happy nurses1.jpg" 
                    alt="Healthcare professionals" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden min-w-full max-w-full flex-shrink-0 snap-start mx-4">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12">
                  <h3 className="text-3xl font-bold text-blue-600 mb-6">
                    Seamless Healthcare Access
                  </h3>
                  
                  <p className="text-gray-600 mb-8 text-base leading-relaxed">
                    Connect with healthcare providers instantly and share your verified information safely.
                  </p>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700 text-base px-6 py-3">
                    Start now
                  </Button>
                </div>

                <div className="relative">
                  <img 
                    src="/happy nurses2.jpg" 
                    alt="Healthcare professionals" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden min-w-full max-w-full flex-shrink-0 snap-start mx-4">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12">
                  <h3 className="text-3xl font-bold text-blue-600 mb-6">
                    Seamless Healthcare Access
                  </h3>
                  
                  <p className="text-gray-600 mb-8 text-base leading-relaxed">
                    Connect with healthcare providers instantly and share your verified information safely.
                  </p>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700 text-base px-6 py-3">
                    Start now
                  </Button>
                </div>

                <div className="relative">
                  <img 
                    src="/happy nurses3.jpg" 
                    alt="Healthcare professionals" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
          <div className="w-8 h-1 bg-blue-200 rounded-full"></div>
          <div className="w-8 h-1 bg-blue-200 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
