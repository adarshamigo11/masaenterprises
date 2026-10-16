import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Scale, FileText, Users, Clock } from "lucide-react"

const modules = [
  {
    id: "case-management",
    icon: Scale,
    label: "Case Management",
    headline: "Never Miss a Hearing Again",
    description: "Complete visibility over every active case — hearings, deadlines, assigned lawyers, and case status in one place.",
    features: [
      "Track unlimited cases and hearings",
      "Automated deadline reminders via email and SMS",
      "Assign cases to team members",
      "Case timeline and full history view",
      "Filter by client, court, or status"
    ]
  },
  {
    id: "document-management",
    icon: FileText,
    label: "Document Management",
    headline: "Every Document. Exactly Where You Need It.",
    description: "Securely store and access all case documents from anywhere — no more hunting through email chains.",
    features: [
      "Centralized storage per case and client",
      "Role-based access control",
      "Document version history",
      "AES-256 encryption at rest",
      "Full-text search across all files"
    ]
  },
  {
    id: "client-portal",
    icon: Users,
    label: "Client Portal",
    headline: "Give Clients Visibility. Stop the Status Calls.",
    description: "Clients get their own secure login to track case progress, view documents, and see upcoming hearing dates.",
    features: [
      "Dedicated login per client",
      "Real-time case status updates",
      "View hearing schedule and documents",
      "Secure in-app messaging",
      "Mobile-friendly on any device"
    ]
  },
  {
    id: "time-billing",
    icon: Clock,
    label: "Time & Billing",
    headline: "Every Billable Minute. Captured.",
    description: "One-click timers and auto-generated invoices ensure no billable time is ever lost again.",
    features: [
      "One-click timer per case",
      "Manual time entry with notes",
      "Auto-generate invoices from hours",
      "Invoice status: Draft/Sent/Paid/Overdue",
      "Automated payment reminders"
    ]
  }
]

export default function ModuleTabs() {
  const [activeTab, setActiveTab] = useState(0)

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
              What's Included
            </span>
          </div>
          <h2 
            className="text-4xl lg:text-5xl font-bold text-[#F5F5F0] mb-2" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Everything Your Firm Needs
          </h2>
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {modules.map((module, index) => (
            <button
              key={module.id}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-300 border-b-2 ${
                activeTab === index
                  ? "border-[#10B981] text-white"
                  : "border-transparent text-[#8A8A80] hover:text-[#F5F5F0]"
              }`}
            >
              {module.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto"
        >
          {/* Left Column - Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20">
                {(() => {
                  const IconComponent = modules[activeTab].icon;
                  return IconComponent ? <IconComponent className="w-6 h-6 text-[#10B981]" /> : null;
                })()}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#F5F5F0]" style={{ fontFamily: 'Playfair Display, serif' }}>
                {modules[activeTab].headline}
              </h3>
            </div>
            <p className="text-[#8A8A80] text-lg leading-relaxed mb-8">
              {modules[activeTab].description}
            </p>
            <ul className="space-y-4">
              {modules[activeTab].features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#10B981] text-lg mt-0.5">✦</span>
                  <span className="text-[#F5F5F0]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Mockup Placeholder */}
          <div className="lg:col-span-2">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#2E2E2E] p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center">
                  {(() => {
                    const IconComponent = modules[activeTab].icon;
                    return IconComponent ? <IconComponent className="w-10 h-10 text-[#10B981]/50" /> : null;
                  })()}
                </div>
                <p className="text-[#8A8A80] text-sm">Module Preview</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
