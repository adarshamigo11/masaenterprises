import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { CheckCircle, ArrowLeft } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function ThankYouPage() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-16 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.3
                }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
              >
                <CheckCircle className="w-16 h-16 text-green-600" />
              </motion.div>

              {/* Heading */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Request Submitted Successfully!
              </h1>

              {/* Message */}
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our team will review your request and contact you shortly with next steps. 
                Please check your email and phone for updates.
              </p>

              {/* Divider */}
              <div className="border-t border-gray-200 my-8"></div>

              {/* Additional Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">What's next?</span> Our team will review your request and get in touch with you soon. 
                  Once everything is confirmed, your account will be activated within 24 hours.
                </p>
              </div>

              {/* Return Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="w-5 h-5" />
                Return to Homepage
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
