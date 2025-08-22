export function HowItWorksSection() {
  const steps = [
    {
      title: "Sign Up & Verify",
      description: "Create your secure account and verify your identity with our advanced biometric system"
    },
    {
      title: "Sign Up & Verify", 
      description: "Create your secure account and verify your identity with our advanced biometric system"
    },
    {
      title: "Sign Up & Verify",
      description: "Create your secure account and verify your identity with our advanced biometric system"
    }
  ]

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            How MedLink360 Works
          </h2>
          <p className="text-lg text-gray-600">
            Three simple steps to secure, verified healthcare access
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Blue circle icon */}
              <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{index + 1}</span>
              </div>
              
              <h3 className="text-xl font-bold text-blue-600 mb-3">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center mt-12 space-x-4">
          <div className="w-12 h-1 bg-blue-600 rounded"></div>
          <div className="w-12 h-1 bg-blue-300 rounded"></div>
          <div className="w-12 h-1 bg-blue-300 rounded"></div>
        </div>
      </div>
    </section>
  )
}
