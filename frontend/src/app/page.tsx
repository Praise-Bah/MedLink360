import { LandingHeader } from "@/components/layout/landing-header"
import { HeroSection } from "@/components/landing/hero-section"
import { WelcomeSection } from "@/components/landing/welcome-section"
import { HealthcareAccessCard } from "@/components/landing/healthcare-access-card"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { ServicesSection } from "@/components/landing/services-section"
import { AppointmentSection } from "@/components/landing/appointment-section"
import { WhyChooseUsSection } from "@/components/landing/why-choose-us-section"
import { ReadyToConnectSection } from "@/components/landing/ready-to-connect-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <HeroSection />
      <WelcomeSection />
      <HealthcareAccessCard />
      <HowItWorksSection />
      <ServicesSection />
      <AppointmentSection />
      <WhyChooseUsSection />
      <ReadyToConnectSection />
    </div>
  )
}
