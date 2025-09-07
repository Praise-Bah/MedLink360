"use client"

import { Button } from "@/components/common/Button"
import { useEffect, useRef, useState } from "react"

export function HealthcareAccessCard() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentCard, setCurrentCard] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const totalCards = 3

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current
        const cardWidth = container.clientWidth
        const nextCard = (currentCard + 1) % totalCards
        
        container.scrollTo({
          left: nextCard * cardWidth,
          behavior: 'smooth'
        })
        
        setCurrentCard(nextCard)
      }
    }, 5000) // Auto-scroll every 5 seconds

    return () => clearInterval(interval)
  }, [currentCard, isHovered])

  return (
    <section className="min-h-screen flex items-center justify-center py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full flex-shrink-0 snap-start">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                {/* Left side - Content */}
                <div className="p-12 flex flex-col justify-center">
                  <h3 className="text-4xl font-bold text-blue-600 mb-8">
                    Seamless Healthcare Access
                  </h3>
                  
                  <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                    Connect with healthcare providers instantly and share your verified information safely. Experience the future of digital healthcare management.
                  </p>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 w-fit">
                    Start now
                  </Button>
                </div>

                {/* Right side - Healthcare professionals image */}
                <div className="relative min-h-[400px]">
                  <img 
                    src="/happy nurses1.jpg" 
                    alt="Healthcare professionals" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full flex-shrink-0 snap-start">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                <div className="p-12 flex flex-col justify-center">
                  <h3 className="text-4xl font-bold text-blue-600 mb-8">
                    Secure Data Management
                  </h3>
                  
                  <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                    Your medical data is protected with enterprise-grade security. Access your health records anytime, anywhere with complete peace of mind.
                  </p>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 w-fit">
                    Learn More
                  </Button>
                </div>

                <div className="relative min-h-[400px]">
                  <img 
                    src="/happy nurses2.jpg" 
                    alt="Healthcare professionals" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full flex-shrink-0 snap-start">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                <div className="p-12 flex flex-col justify-center">
                  <h3 className="text-4xl font-bold text-blue-600 mb-8">
                    24/7 Healthcare Support
                  </h3>
                  
                  <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                    Get round-the-clock access to healthcare professionals and emergency services. Your health is our priority, every hour of every day.
                  </p>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 w-fit">
                    Get Support
                  </Button>
                </div>

                <div className="relative min-h-[400px]">
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
          {[0, 1, 2].map((index) => (
            <div 
              key={index}
              className={`w-8 h-1 rounded-full transition-colors duration-300 ${
                currentCard === index ? 'bg-blue-600' : 'bg-blue-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
