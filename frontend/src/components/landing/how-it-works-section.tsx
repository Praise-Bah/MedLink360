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
    <section 
      id="how-it-works" 
      className="min-h-screen flex items-center bg-cover bg-center bg-no-repeat py-16"
      style={{ backgroundImage: 'url(/pattern2.png)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl lg:text-6xl font-bold text-blue-600 mb-4">
            How MedLink360 Works
          </h2>
          <p className="text-xl text-gray-600">
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
              
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                {step.title}
              </h3>
              
              <p className="text-lg text-gray-800 leading-relaxed font-medium">
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
