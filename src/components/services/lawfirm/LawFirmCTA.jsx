import { motion } from "framer-motion"

export default function LawFirmCTA() {
  return (
    <section className="py-24 lg:py-32 bg-[#10B981]">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Headline */}
          <h2 
            className="text-4xl lg:text-5xl font-bold text-[#0F0F0F] mb-6 leading-tight" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Your Firm Deserves Better Than Spreadsheets.
          </h2>

          {/* Subtext */}
          <p className="text-[#0F0F0F]/70 text-lg mb-10 max-w-2xl mx-auto">
            Join 80+ law firms already on our platform. Start your free 30-day trial today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="w-full sm:w-auto px-8 py-4 bg-[#0F0F0F] text-[#F5F5F0] rounded-lg font-semibold hover:bg-[#0F0F0F]/90 transition-colors">
              Start Free Trial
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border-2 border-[#0F0F0F] text-[#0F0F0F] rounded-lg font-semibold hover:bg-[#0F0F0F]/10 transition-colors">
              Schedule a Demo
            </button>
          </div>

          {/* Additional Info */}
          <p className="text-[#0F0F0F]/60 text-sm">
            Free setup · Free migration · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}
