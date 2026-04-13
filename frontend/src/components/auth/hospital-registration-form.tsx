"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/common/Button"

interface FormData {
  // Hospital Information
  hospitalName: string
  registrationNumber: string
  hospitalEmail: string
  hospitalPhone: string
  website: string
  
  // Address
  country: string
  address: string
  city: string
  state: string
  postalCode: string
  
  // Facility Details
  bedCount: string
  emergencyServices: boolean
  ambulanceServices: boolean
  
  // Admin Information
  adminFullName: string
  adminEmail: string
  adminPhone: string
  adminPosition: string
  
  // Documents (URLs for now, will be file uploads later)
  operatingPermit: string
  hospitalLicense: string
  accreditation: string
}

const initialFormData: FormData = {
  hospitalName: "",
  registrationNumber: "",
  hospitalEmail: "",
  hospitalPhone: "",
  website: "",
  country: "Cameroon",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  bedCount: "",
  emergencyServices: false,
  ambulanceServices: false,
  adminFullName: "",
  adminEmail: "",
  adminPhone: "",
  adminPosition: "",
  operatingPermit: "",
  hospitalLicense: "",
  accreditation: ""
}

export function HospitalRegistrationForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  // File input refs
  const operatingPermitRef = useRef<HTMLInputElement>(null)
  const hospitalLicenseRef = useRef<HTMLInputElement>(null)
  const accreditationRef = useRef<HTMLInputElement>(null)

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    // Extra safety: if somehow called before step 4, just move to the next step
    if (step < 4) {
      handleNext()
      return
    }

    setLoading(true)

    // TODO: Submit to backend API
    console.log("Hospital Registration:", formData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your hospital registration request has been submitted successfully. 
            The Ministry of Health will review your application and documents.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>What happens next?</strong><br />
              Once approved, the designated hospital administrator ({formData.adminEmail}) 
              will receive an invitation email to set up their account.
            </p>
          </div>
          <Button onClick={() => router.push("/")} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-8">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="mb-6">
            <img 
              src="/medlink360_logo_cropped.png" 
              alt="MedLink360" 
              className="h-20 object-contain"
            />
            <p className="text-xs text-gray-500 mt-1">Hospital Registration Portal</p>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Register Your Hospital</h1>
            <p className="text-gray-600 text-sm">
              Submit your hospital for verification by the Ministry of Health
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  s < step ? "bg-green-500 text-white" :
                  s === step ? "bg-blue-600 text-white" :
                  "bg-gray-200 text-gray-500"
                }`}>
                  {s < step ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : s}
                </div>
                {s < 4 && (
                  <div className={`w-12 lg:w-20 h-1 mx-1 ${s < step ? "bg-green-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="flex justify-between text-xs text-gray-500 mb-6 -mt-4">
            <span className={step === 1 ? "text-blue-600 font-medium" : ""}>Hospital Info</span>
            <span className={step === 2 ? "text-blue-600 font-medium" : ""}>Location</span>
            <span className={step === 3 ? "text-blue-600 font-medium" : ""}>Admin Details</span>
            <span className={step === 4 ? "text-blue-600 font-medium" : ""}>Documents</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            {/* Step 1: Hospital Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.hospitalName}
                    onChange={(e) => updateField("hospitalName", e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., City General Hospital"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => updateField("registrationNumber", e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., HOS-2024-001234"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hospital Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.hospitalEmail}
                      onChange={(e) => updateField("hospitalEmail", e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="info@hospital.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.hospitalPhone}
                      onChange={(e) => updateField("hospitalPhone", e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+237 XX XXX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => updateField("website", e.target.value)}
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.hospital.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bed Count
                    </label>
                    <input
                      type="number"
                      value={formData.bedCount}
                      onChange={(e) => updateField("bedCount", e.target.value)}
                      className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 150"
                    />
                  </div>
                  <div className="space-y-2 pt-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.emergencyServices}
                        onChange={(e) => updateField("emergencyServices", e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Emergency Services</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.ambulanceServices}
                        onChange={(e) => updateField("ambulanceServices", e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Ambulance Services</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => updateField("country", e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Cameroon">Cameroon</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Ivory Coast">Ivory Coast</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Rwanda">Rwanda</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    required
                    rows={2}
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Enter full street address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Douala"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Region/State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Littoral Region"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => updateField("postalCode", e.target.value)}
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., GA-123-4567"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Your hospital location will be visible to patients 
                    searching for nearby healthcare facilities once approved.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Admin Details */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> The person listed below will become the primary 
                    Hospital Administrator. They will receive an invitation email to create their 
                    account once the hospital is approved.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Administrator Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.adminFullName}
                    onChange={(e) => updateField("adminFullName", e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Dr. John Mensah"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Administrator Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.adminEmail}
                    onChange={(e) => updateField("adminEmail", e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="admin@hospital.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This email will receive the invitation to set up the admin account
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.adminPhone}
                      onChange={(e) => updateField("adminPhone", e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+237 XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position/Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.adminPosition}
                      onChange={(e) => updateField("adminPosition", e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Medical Director"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Documents */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    Upload the following documents for verification. All documents should be 
                    clear, legible, and in PDF or image format.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Operating Permit <span className="text-red-500">*</span>
                  </label>
                  <div 
                    onClick={() => operatingPermitRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer ${
                      formData.operatingPermit ? 'border-green-400 bg-green-50' : 'border-gray-300'
                    }`}
                  >
                    {formData.operatingPermit ? (
                      <>
                        <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-green-600 font-medium">{formData.operatingPermit}</p>
                        <p className="text-xs text-gray-500 mt-1">Click to change file</p>
                      </>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </div>
                  <input
                    ref={operatingPermitRef}
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) updateField("operatingPermit", file.name)
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital License <span className="text-red-500">*</span>
                  </label>
                  <div 
                    onClick={() => hospitalLicenseRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer ${
                      formData.hospitalLicense ? 'border-green-400 bg-green-50' : 'border-gray-300'
                    }`}
                  >
                    {formData.hospitalLicense ? (
                      <>
                        <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-green-600 font-medium">{formData.hospitalLicense}</p>
                        <p className="text-xs text-gray-500 mt-1">Click to change file</p>
                      </>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </div>
                  <input
                    ref={hospitalLicenseRef}
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) updateField("hospitalLicense", file.name)
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Health Facility Accreditation
                  </label>
                  <div 
                    onClick={() => accreditationRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer ${
                      formData.accreditation ? 'border-green-400 bg-green-50' : 'border-gray-300'
                    }`}
                  >
                    {formData.accreditation ? (
                      <>
                        <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-green-600 font-medium">{formData.accreditation}</p>
                        <p className="text-xs text-gray-500 mt-1">Click to change file</p>
                      </>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </div>
                  <input
                    ref={accreditationRef}
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) updateField("accreditation", file.name)
                    }}
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Review Checklist</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✓ Hospital: {formData.hospitalName || "Not provided"}</li>
                    <li>✓ Location: {formData.city}, {formData.state}, {formData.country}</li>
                    <li>✓ Admin: {formData.adminFullName} ({formData.adminEmail})</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
              ) : (
                <Link
                  href="/"
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </Link>
              )}
              
              {step < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Registration"}
                </Button>
              )}
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By registering, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image/Info */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center p-12">
        <div className="text-white max-w-md">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Join Cameroon's Healthcare Network</h2>
          <p className="text-blue-100 mb-8">
            Register your hospital with MedLink360 to connect with patients, 
            streamline operations, and be part of the national healthcare ecosystem.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Ministry Verified</h3>
                <p className="text-blue-200 text-sm">Official verification by the Ministry of Health</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Digital Records</h3>
                <p className="text-blue-200 text-sm">Seamless integration with patient medical books</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Staff Management</h3>
                <p className="text-blue-200 text-sm">Onboard and manage your healthcare staff</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
