import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "Will I get reminders for court hearings?",
    answer: "Yes. Automated email and SMS reminders go out 7 days, 3 days, and 1 day before every scheduled hearing."
  },
  {
    question: "Is our case data secure?",
    answer: "All data is AES-256 encrypted at rest and transmitted over HTTPS. Role-based permissions ensure lawyers only see their assigned cases."
  },
  {
    question: "Can clients use the portal on mobile?",
    answer: "Yes. The client portal is fully mobile-responsive on any device. Clients can view cases, hearings, documents, and invoices anytime."
  },
  {
    question: "How long does setup take?",
    answer: "Most firms are fully live within 5 working days — including data migration and team training, both provided at no extra cost."
  },
  {
    question: "Does it sync with Google Calendar?",
    answer: "Yes. All court dates and deadlines sync automatically with Google Calendar with reminders through both platforms."
  }
]

export default function LawFirmFAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="py-24 lg:py-32 bg-[#0F0F0F]">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl lg:text-5xl font-bold text-[#F5F5F0] mb-4" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Common Questions
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg border ${
                openIndex === index ? "border-[#10B981]" : "border-[#2E2E2E]"
              } overflow-hidden`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 bg-[#1A1A1A] hover:bg-[#1F1F1F] transition-colors"
              >
                <span className="text-left text-[#F5F5F0] font-medium text-lg flex-1">
                  {faq.question}
                </span>
                <div className="text-[#10B981]">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-5 bg-[#1A1A1A]/50 border-t border-[#2E2E2E]">
                      <p className="text-[#8A8A80] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
