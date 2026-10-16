import { motion } from "framer-motion"

const stats = [
  { value: "80+", label: "Law Firms" },
  { value: "5,000+", label: "Cases" },
  { value: "ZERO", label: "Missed Deadlines" },
  { value: "100%", label: "Document Security" }
]

const benefits = [
  "Never miss a court date or deadline",
  "Secure document access from anywhere",
  "Clients always informed — fewer calls",
  "Automated invoicing saves hours weekly",
  "Up and running in under 5 days",
  "Free data migration included"
]

export default function BenefitsStats() {
  return (
    <section className="py-24 lg:py-32 bg-[#0F0F0F]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 max-w-7xl mx-auto">
          {/* Left Column - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 
              className="text-4xl lg:text-5xl font-bold text-[#F5F5F0] mb-8 leading-tight" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Why 80+ Law Firms Trust Our Platform
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#10B981] text-lg mt-0.5">✦</span>
                  <span className="text-[#F5F5F0] text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] p-8 flex flex-col items-center justify-center text-center hover:border-[#10B981]/50 transition-colors duration-300"
              >
                <div className="text-4xl lg:text-5xl font-bold text-[#10B981] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {stat.value}
                </div>
                <div className="text-[#8A8A80] text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
