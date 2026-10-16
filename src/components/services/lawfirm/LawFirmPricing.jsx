import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Solo",
    price: "₹3,999",
    period: "/month",
    bestFor: "1-3 lawyers",
    accentColor: "#6B6B6B",
    features: [
      "Unlimited case management",
      "Document storage (10GB)",
      "Client portal (20 clients)",
      "Basic billing and invoicing",
      "Court diary and reminders",
      "Email support"
    ],
    buttonVariant: "outline"
  },
  {
    name: "Firm",
    price: "₹8,999",
    period: "/month",
    bestFor: "Up to 10 lawyers",
    accentColor: "#10B981",
    badge: "Most Popular",
    features: [
      "Everything in Solo",
      "Unlimited client portal",
      "Advanced time tracking",
      "Auto invoice generation",
      "Google Calendar sync",
      "Role-based access control",
      "Phone + email support"
    ],
    buttonVariant: "filled",
    featured: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Pricing",
    bestFor: "10+ lawyers",
    accentColor: "#059669",
    features: [
      "Everything in Firm",
      "Unlimited lawyers and offices",
      "Custom workflows",
      "API access",
      "Dedicated account manager",
      "On-premise option available"
    ],
    buttonVariant: "outline"
  }
]

export default function LawFirmPricing() {
  return (
    <section className="py-24 lg:py-32 bg-[#111111]">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-0.5 bg-[#10B981]" />
            <span className="text-[#10B981] text-xs font-semibold tracking-widest uppercase">
              Pricing
            </span>
          </div>
          <h2 
            className="text-4xl lg:text-5xl font-bold text-[#F5F5F0] mb-4" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Simple Pricing for Every Firm
          </h2>
          <p className="text-[#8A8A80] text-lg">
            Free 30-day trial · No credit card required
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl bg-[#1A1A1A] border ${
                plan.featured ? "border-[#10B981]" : "border-[#2E2E2E]"
              } p-8 hover:border-[#10B981]/50 transition-colors duration-300`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#10B981] text-[#0F0F0F] text-sm font-semibold rounded-full">
                  {plan.badge}
                </div>
              )}

              {/* Top Accent Line */}
              <div 
                className="h-1 w-full rounded-full mb-6"
                style={{ backgroundColor: plan.accentColor }}
              />

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-[#F5F5F0] mb-2">{plan.name}</h3>
              <p className="text-[#8A8A80] text-sm mb-6">Best for: {plan.bestFor}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#F5F5F0]">{plan.price}</span>
                  <span className="text-[#8A8A80]">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-[#F5F5F0]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => window.location.href = `/payment`}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  plan.buttonVariant === "filled"
                    ? "bg-[#10B981] text-[#0F0F0F] hover:bg-[#10B981]/90"
                    : `border border-[${plan.accentColor}] text-[${plan.accentColor}] hover:bg-[${plan.accentColor}]/10`
                }`}
                style={plan.buttonVariant === "outline" ? {
                  borderColor: plan.accentColor,
                  color: plan.accentColor
                } : {}}
              >
                Purchase Now
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#8A8A80] text-sm mt-12"
        >
          Free setup · Free data migration · Cancel anytime
        </motion.p>
      </div>
    </section>
  )
}
