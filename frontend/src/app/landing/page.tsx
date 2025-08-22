import { LandingHeader } from "@/components/layout/landing-header"
import { HeroSection } from "@/components/landing/hero-section"
import { WelcomeSection } from "@/components/landing/welcome-section"
import { HealthcareAccessCard } from "@/components/landing/healthcare-access-card"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <HeroSection />
      <WelcomeSection />
      <HealthcareAccessCard />
      <HowItWorksSection />
    </div>
  )
}
