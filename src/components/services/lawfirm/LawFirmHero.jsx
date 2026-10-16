import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function LawFirmHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0F0F0F] overflow-hidden pt-20">
      {/* Diagonal Line Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 1px,
            #10B981 1px,
            #10B981 2px
          )`,
          backgroundSize: "20px 20px"
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F0F0F]/50 to-[#0F0F0F]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Small Gold Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 text-[#10B981] text-xs font-semibold tracking-widest uppercase border border-[#10B981]/30 rounded-full">
            LAW FIRM MANAGEMENT
          </span>
        </motion.div>

        {/* Large Serif Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl lg:text-7xl xl:text-8xl font-bold text-[#F5F5F0] mb-8 leading-tight" 
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Your Entire Law Firm.<br />
          Digitized. On Time.
        </motion.h1>

        {/* Muted Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg lg:text-xl text-[#8A8A80] mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Case tracking, document management, client portal, and automated billing —
          all in one secure platform built for legal professionals.
        </motion.p>

        {/* Two Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button 
            size="lg"
            className="px-8 py-6 bg-[#10B981] text-[#0F0F0F] hover:bg-[#10B981]/90 font-semibold rounded-lg"
          >
            Request a Demo
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="px-8 py-6 border-2 border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10 font-semibold rounded-lg bg-transparent"
          >
            See Features
          </Button>
        </motion.div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {[
            { value: "80+", label: "Law Firms" },
            { value: "5,000+", label: "Cases" },
            { value: "0", label: "Missed Deadlines" },
            { value: "100%", label: "Secure" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-[#10B981] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                {stat.value}
              </div>
              <div className="text-sm text-[#8A8A80] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
