import { Button } from "@/components/ui/button"

export function AppointmentSection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          Book Your Appointment
        </h2>
        <div className="space-y-6">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg"
          >
            Schedule Now
          </Button>
        </div>
      </div>
    </section>
  )
}
