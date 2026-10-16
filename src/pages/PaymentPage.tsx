import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, QrCode, Building2, CreditCard, Landmark } from "lucide-react"
import { Button } from "../components/ui/button"
import Navbar from "../components/Navbar"

interface BankDetail {
  label: string
  value: string
  icon: React.ReactNode
}

export default function PaymentPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const bankDetails: BankDetail[] = [
    {
      label: "Account Name",
      value: "NEXTWAY INFO TECHNOLOGY PVT. LTD.",
      icon: <Building2 className="w-5 h-5" />
    },
    {
      label: "Account Number",
      value: "076226900000196",
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      label: "IFSC Code",
      value: "YESB0000762",
      icon: <Landmark className="w-5 h-5" />
    },
    {
      label: "UPI ID",
      value: "yespay.mabs0762269ikit0196@yesbankltd",
      icon: <CreditCard className="w-5 h-5" />
    }
  ]

  const handleCopy = async (value: string, fieldId: string) => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value)
        setCopiedField(fieldId)
        setTimeout(() => setCopiedField(null), 2000)
        return
      }
      
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea")
      textArea.value = value
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      const successful = document.execCommand("copy")
      document.body.removeChild(textArea)
      
      if (successful) {
        setCopiedField(fieldId)
        setTimeout(() => setCopiedField(null), 2000)
      } else {
        console.error("Fallback copy failed")
      }
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-6"
              >
                <QrCode className="w-8 h-8 text-emerald-600" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Complete Your Payment
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Scan the QR code or use the bank details below to complete your payment. 
                Please share the payment screenshot with us after transfer.
              </p>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Side - QR Code */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                    Scan to Pay
                  </h2>
                  <p className="text-slate-500 mb-6">
                    Use any UPI app to scan and pay
                  </p>
                  
                  {/* QR Code Image */}
                  <div className="relative inline-block">
                    <div className="p-4 bg-white rounded-xl border-2 border-dashed border-slate-300">
                      <img
                        src="/images/payment_QR.jpg"
                        alt="Payment QR Code"
                        className="w-64 h-64 md:w-80 md:h-80 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center bg-slate-100 rounded-lg">
                                <div class="text-center text-slate-400">
                                  <svg class="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                  </svg>
                                  <p>Please add payment_QR.jpg</p>
                                  <p class="text-sm">to /public/images/</p>
                                </div>
                              </div>
                            `
                          }
                        }}
                      />
                    </div>
                    
                    {/* Decorative corner accents */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg"></div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg"></div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-lg"></div>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    UPI Payment Accepted
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Bank Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
                    <Landmark className="w-6 h-6 text-emerald-600" />
                    Bank Transfer Details
                  </h2>
                  
                  <div className="space-y-4">
                    {bankDetails.map((detail, index) => (
                      <motion.div
                        key={detail.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="group bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-slate-400">
                                {detail.icon}
                              </span>
                              <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                                {detail.label}
                              </span>
                            </div>
                            <p className="text-lg font-semibold text-slate-900 break-all">
                              {detail.value}
                            </p>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(detail.value, `${detail.label}-${index}`)}
                            className="shrink-0 flex items-center gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
                          >
                            {copiedField === `${detail.label}-${index}` ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span className="hidden sm:inline">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span className="hidden sm:inline">Copy</span>
                              </>
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Instructions Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg"
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Next Steps
                  </h3>
                  <ul className="space-y-2 text-emerald-50">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-200 mt-1">1.</span>
                      <span>Complete the payment using QR code or bank transfer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-200 mt-1">2.</span>
                      <span>Take a screenshot of the payment confirmation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-200 mt-1">3.</span>
                      <span>Share the screenshot with us via email or WhatsApp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-200 mt-1">4.</span>
                      <span>Our team will verify and activate your service</span>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
