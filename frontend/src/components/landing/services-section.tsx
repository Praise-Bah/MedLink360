import { CheckCircle } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      title: "Medical Certificates",
      description: "Store and verify medical certificates, test results, and diagnostic reports with blockchain security.",
      features: [
        "Instant verification",
        "Partner proof storage", 
        "Global acceptance"
      ]
    },
    {
      title: "Medical Certificates", 
      description: "Store and verify medical certificates, test results, and diagnostic reports with blockchain security.",
      features: [
        "Instant verification",
        "Partner proof storage",
        "Global acceptance"
      ]
    },
    {
      title: "Medical Certificates",
      description: "Store and verify medical certificates, test results, and diagnostic reports with blockchain security.", 
      features: [
        "Instant verification",
        "Partner proof storage",
        "Global acceptance"
      ]
    },
    {
      title: "Medical Certificates",
      description: "Store and verify medical certificates, test results, and diagnostic reports with blockchain security.",
      features: [
        "Instant verification", 
        "Partner proof storage",
        "Global acceptance"
      ]
    }
  ]

  return (
    <section className="min-h-screen flex items-center justify-center py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare verification solutions for patients, providers, and institutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
