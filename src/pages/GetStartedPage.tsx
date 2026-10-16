import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle } from "lucide-react"
import api from "../lib/api"

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
}

export default function GetStartedPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const planName = searchParams.get("plan") || ""
  const serviceName = searchParams.get("service") || ""

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    planName,
    serviceName,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Update form data when URL params change
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      planName: searchParams.get("plan") || "",
      serviceName: searchParams.get("service") || "",
    }))
  }, [searchParams])

  const validateForm = () => {
    const newErrors: FormErrors = {}

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }
    }

    // Validate Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Contact number is required"
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, "")
      if (phoneDigits.length < 10) {
        newErrors.phone = "Phone number must have at least 10 digits"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await api.post("/inquiry/submit", formData)
      // Redirect to thank you page on success
      navigate("/thank-you")
    } catch (error: any) {
      console.error("Submission error:", error)
      setSubmitError(error.response?.data?.error || "Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-5 gap-8">
              {/* LEFT COLUMN - Order Summary (40%) */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Your Order Summary
                  </h2>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Service</p>
                        <p className="font-semibold text-gray-900">{serviceName || "Not specified"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Plan</p>
                        <p className="font-semibold text-gray-900">{planName || "Not specified"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-6"></div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Next Steps:</h3>
                    <ol className="space-y-4">
                      {[
                        "Submit your details below",
                        "Our team reviews your request",
                        "We will contact you shortly with next steps",
                        "Complete the payment process",
                        "Reply with transaction confirmation",
                        "Account activated within 24 hours of payment",
                      ].map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-600 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - Inquiry Form (60%) */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Tell Us About Yourself
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.fullName 
                            ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                        } focus:outline-none focus:ring-4 transition-colors`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.email 
                            ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                        } focus:outline-none focus:ring-4 transition-colors`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.phone 
                            ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                        } focus:outline-none focus:ring-4 transition-colors`}
                        placeholder="Enter your 10-digit mobile number"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Plan (Read-only) */}
                    <div>
                      <label htmlFor="planName" className="block text-sm font-medium text-gray-700 mb-2">
                        Selected Plan
                      </label>
                      <input
                        type="text"
                        id="planName"
                        name="planName"
                        value={formData.planName}
                        readOnly
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
                      />
                    </div>

                    {/* Service (Read-only) */}
                    <div>
                      <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700 mb-2">
                        Selected Service
                      </label>
                      <input
                        type="text"
                        id="serviceName"
                        name="serviceName"
                        value={formData.serviceName}
                        readOnly
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
                      />
                    </div>

                    {/* Submit Error */}
                    {submitError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
