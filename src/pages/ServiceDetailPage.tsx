import React from "react"
import { useParams, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Brain, Cpu, Network, TrendingUp, Shield, Zap, Globe, Settings, ChevronRight, CheckCircle2, Code2, Target, Users, DollarSign, Clock, GraduationCap, BookOpen, Bus, Award, FileText, MessageSquare, Bell } from "lucide-react"
import HeroSection from "../components/HeroSection"
import { getServiceBySlug } from "@/lib/services-data"
import GlassCard from "../components/GlassCard"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { useState } from "react"
import LawFirmPage from "./services/LawFirmPage"

// HRM Modules Tabs Component
function HRMModulesTabs() {
  const [activeTab, setActiveTab] = useState(0)

  const modules = [
    {
      icon: Users,
      emoji: "👤",
      title: "Employee Management",
      statBadge: "Manage unlimited employees across departments",
      content: [
        "Complete employee lifecycle from offer letter to exit",
        "Digital onboarding with document collection",
        "Org chart and department hierarchy management",
        "Employee profiles with full history",
        "Role-based access control for managers and HR",
        "Exit management and full & final settlement automation",
      ]
    },
    {
      icon: Clock,
      emoji: "🕐",
      title: "Attendance & Leave",
      statBadge: "Reduce attendance disputes by 90%",
      content: [
        "Biometric integration (fingerprint, face recognition)",
        "Mobile app check-in/check-out with GPS location",
        "Automatic overtime and late-mark calculation",
        "Custom leave policies (casual, sick, earned, LOP)",
        "Leave approval workflow with manager notifications",
        "Holiday calendar management per branch/location",
      ]
    },
    {
      icon: DollarSign,
      emoji: "",
      title: "Payroll Processing",
      statBadge: "Process payroll 80% faster than manual methods",
      content: [
        "One-click payroll processing for entire company",
        "Flexible salary structures (CTC, gross, net)",
        "Automatic deductions: PF, ESI, TDS, Professional Tax",
        "Loan and advance management with EMI deductions",
        "Payslip auto-generation and email delivery",
        "Bank transfer file generation (NEFT/bulk transfer)",
        "Full & Final settlement calculation on exit",
      ]
    },
    {
      icon: TrendingUp,
      emoji: "",
      title: "HR Analytics",
      statBadge: "Make data-driven HR decisions in seconds",
      content: [
        "Live workforce dashboard (headcount, attrition, growth)",
        "Department-wise cost analysis",
        "Attendance trends and absenteeism reports",
        "Payroll cost vs revenue ratio tracking",
        "Leave utilization patterns per team",
        "Custom report builder — export to Excel or PDF",
      ]
    },
    {
      icon: Shield,
      emoji: "✅",
      title: "Compliance Management",
      statBadge: "100% compliance — zero penalty risk",
      content: [
        "Automated PF challan generation (ECR file)",
        "ESI contribution tracking and filing support",
        "TDS calculation per employee per month",
        "Professional Tax as per state-specific slabs",
        "Compliance calendar with deadline alerts",
        "Audit-ready reports for labour inspections",
      ]
    },
    {
      icon: Users,
      emoji: "🚀",
      title: "Employee Self-Service Portal",
      statBadge: "Reduce HR team workload by 60%",
      content: [
        "Employees apply for leave from mobile or web",
        "View and download payslips anytime",
        "Submit reimbursement claims with bill uploads",
        "Update personal details and bank information",
        "View attendance, leave balance, and holiday list",
        "Raise HR queries and track resolution status",
      ]
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {modules.map((module, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
              activeTab === i
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <span className="mr-2">{module.emoji}</span>
            {module.title}
          </button>
        ))}
      </div>

      {/* Content Panel */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl p-8 lg:p-12 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-sm border border-indigo-500/30"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30">
            {modules[activeTab].icon && (() => {
              const IconComponent = modules[activeTab].icon
              return <IconComponent className="w-8 h-8 text-indigo-400" />
            })()}
          </div>
          <h3 className="text-3xl font-bold text-white">
            {modules[activeTab].title}
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-6">
          <ul className="space-y-3">
            {modules[activeTab].content.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <span className="text-white">{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center">
            <div className="px-8 py-6 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-indigo-500/30 text-center">
              <p className="text-indigo-400 font-semibold text-lg">
                📊 {modules[activeTab].statBadge}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// School Management Bento Grid Component
function SchoolBentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* Large Card 1 - Academic Management (spans 2 columns) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="md:col-span-2 group relative rounded-[20px] p-8 bg-gradient-to-br from-blue-500/10 to-orange-500/10 backdrop-blur-sm border border-blue-500/30 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <GraduationCap className="w-full h-full" />
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-blue-500/20 backdrop-blur-sm border border-blue-500/30">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Management</h3>
        </div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />Curriculum planning and syllabus management</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />Timetable builder with clash detection</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />Exam scheduling, mark entry, and result generation</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />Homework assignment and submission tracking</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />Class-wise and subject-wise performance reports</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />Online class integration (Zoom / Google Meet)</li>
        </ul>
      </motion.div>

      {/* Large Card 2 - Student & Parent Portal (spans 2 columns) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="md:col-span-2 group relative rounded-[20px] p-8 bg-gradient-to-br from-orange-500/10 to-blue-500/10 backdrop-blur-sm border border-orange-500/30 shadow-lg hover:shadow-xl hover:shadow-orange-500/20 transition-all cursor-pointer overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <Users className="w-full h-full" />
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-orange-500/20 backdrop-blur-sm border border-orange-500/30">
            <Users className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Student & Parent Portal</h3>
        </div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />Parents track attendance, marks, homework daily</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />Instant notifications for circulars and events</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />Student progress report available anytime</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />Teacher-parent messaging within the portal</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />Mobile app for parents (Android + iOS)</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />Online leave application by parents</li>
        </ul>
      </motion.div>

      {/* Small Card 1 - Fee Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="group relative rounded-[20px] p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/30 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-blue-500/20 backdrop-blur-sm border border-blue-500/30">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Fee Management</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />Online fee collection (UPI, cards, net banking)</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />Auto fee reminders via SMS/WhatsApp</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />Discount, scholarship, concession management</li>
        </ul>
      </motion.div>

      {/* Small Card 2 - Transport Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="group relative rounded-[20px] p-6 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-500/30 shadow-lg hover:shadow-xl hover:shadow-orange-500/20 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-orange-500/20 backdrop-blur-sm border border-orange-500/30">
            <Bus className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Transport Management</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />GPS-based live bus tracking for parents</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />Route and stop management</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />Driver and vehicle record management</li>
        </ul>
      </motion.div>

      {/* Small Card 3 - Inventory Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="group relative rounded-[20px] p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/30 shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30">
            <FileText className="w-6 h-6 text-cyan-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Inventory Management</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />Track school assets, lab equipment, stationery</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />Stock in/out with low stock alerts</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />Vendor management and purchase records</li>
        </ul>
      </motion.div>

      {/* Small Card 4 - Reports & Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="group relative rounded-[20px] p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-purple-500/20 backdrop-blur-sm border border-purple-500/30">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />Student performance trends over terms/years</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />Attendance analytics per class and student</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />Fee collection vs outstanding reports</li>
        </ul>
      </motion.div>
    </div>
  )
}

// School Management FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${
        isOpen 
          ? "bg-blue-50 border-blue-500" 
          : "bg-white border-gray-200 hover:border-blue-300"
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-6 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
            <span className="text-blue-600 text-sm font-bold">?</span>
          </div>
          {question}
        </h3>
        <ChevronRight
          className={`w-5 h-5 text-blue-500 transition-transform shrink-0 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="px-6 pb-6 pl-14"
        >
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </div>
  )
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? getServiceBySlug(slug) : undefined
  const [activePlan, setActivePlan] = useState<'standard' | 'premium'>('standard')

  if (!service) return <Navigate to="/services" replace />

  // Special rendering for AI Trading page
  const isAITrading = slug === "ai-trading"
  const isSoftwareDev = slug === "software-development"
  const isHRM = slug === "hrm-payroll"
  const isSchoolManagement = slug === "school-management"

  if (isAITrading) {
    return (
      <>
        {/* Hero Section - Matched to Law Firm Layout */}
        <section className="relative min-h-screen flex items-center justify-center bg-[#0F0F0F] overflow-visible pt-20">
          {/* Diagonal Line Texture - Same as Law Firm */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 1px,
                #3B3786 1px,
                #3B3786 2px
              )`,
              backgroundSize: "20px 20px"
            }}
          />

          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            onError={(e) => console.error('Video load error:', e)}
            onLoadStart={() => console.log('Video loading started')}
            onLoadedData={() => console.log('Video loaded successfully')}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="/aivideo.mp4" type="video/mp4" />
          </video>

          {/* Gradient Overlay - Same as Law Firm */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F0F0F]/50 to-[#0F0F0F]" />

          {/* Content - Same structure as Law Firm */}
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            {/* Small Emerald Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 text-[#3B3786] text-xs font-semibold tracking-widest uppercase border border-[#3B3786]/30 rounded-full">
                AI TRADING SOLUTIONS
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
              Next-Gen Trading Powered by
              <span className="block text-[#3B3786]">
                Artificial Intelligence
              </span>
            </motion.h1>

            {/* Muted Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg lg:text-xl text-[#8A8A80] mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Our self-learning AI models analyze millions of market signals in real-time to execute smarter, faster, and more profitable trades — completely automated.
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
                className="px-8 py-6 bg-[#3B3786] text-white hover:bg-[#3B3786]/90 font-semibold rounded-lg"
              >
                Get Started Free
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="px-8 py-6 border-2 border-[#3B3786] text-[#3B3786] hover:bg-[#3B3786]/10 font-semibold rounded-lg bg-transparent"
              >
                See How It Works
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
                { value: "10,000+", label: "Trades Daily" },
                { value: "<5ms", label: "Execution Speed" },
                { value: "98.7%", label: "Accuracy" },
                { value: "₹500Cr+", label: "Volume Managed" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-[#3B3786] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
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

        {/* Pricing Section */}
       <section className="py-20 lg:py-28 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d0d]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Choose the perfect plan for your trading needs
              </p>
            </motion.div>

            {/* Toggle Button */}
            <div className="flex justify-center mb-12">

              <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">

                <button

                  onClick={() => setActivePlan('standard')}

                  className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${

                    activePlan === 'standard'

                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'

                      : 'text-gray-300 hover:text-white'

                  }`}

                >

                  Standard

                </button>

                <button

                  onClick={() => setActivePlan('premium')}

                  className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${

                    activePlan === 'premium'

                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'

                      : 'text-gray-300 hover:text-white'

                  }`}

                >

                  Premium

                </button>

              </div>

            </div>



            {/* Standard Plans */}

            {activePlan === 'standard' && (

              <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">

                {[

                  {

                    name: "Basic Plan",

                    price: "₹15,000",

                    period: "+ GST / month",

                    description: "Perfect for individual traders starting with AI",

                    features: [

                      "1 AI Trading Strategy",

                      "NSE & BSE Access",

                      "Pre-trained AI models (no customization)",

                      "Real-time analytics dashboard",

                      "Basic risk controls",

                      "Email support",

                      "Up to ₹1L capital",

                    ],

                    popular: false,

                  },

                  {

                    name: "Professional Plan",

                    price: "₹25,000",

                    period: "+ GST / month",

                    badge: "MOST POPULAR",

                    description: "Advanced features for serious traders",

                    features: [

                      "5 AI Trading Strategies",

                      "NSE, BSE & MCX Access",

                      "Custom model training on your data",

                      "Sentiment analysis engine",

                      "Full AI risk management suite",

                      "Walk-forward backtesting",

                      "Priority support (phone + email)",

                      "Up to ₹3L capital",

                      "Monthly AI performance review",

                    ],

                    popular: true,

                  },

                  {

                    name: "Standard Plan",

                    price: "₹35,000",

                    period: "+ GST / month",

                    description: "For growing traders and small firms",

                    features: [

                      "10 AI Trading Strategies",

                      "All Indian exchanges + F&O",

                      "Custom ML model development",

                      "Deep learning integration",

                      "Advanced risk management",

                      "Explainable AI (XAI) dashboard",

                      "Dedicated account manager",

                      "24/7 phone support",

                      "Up to ₹5L capital",

                      "Bi-weekly performance reviews",

                    ],

                    popular: false,

                  },

                ].map((plan, i) => (

                  <motion.div

                    key={plan.name}

                    initial={{ opacity: 0, y: 30 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    viewport={{ once: true }}

                    transition={{ delay: i * 0.1 }}

                    className={`relative rounded-3xl p-8 ${

                      plan.popular

                        ? "bg-gradient-to-b from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500"

                        : "bg-white/5 backdrop-blur-sm border border-white/10"

                    }`}

                  >

                    {plan.badge && (

                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">

                        <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">

                          {plan.badge}

                        </span>

                      </div>

                    )}

                    <div className="text-center mb-6">

                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

                      <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

                      <div className="flex items-baseline justify-center">

                        <span className="text-4xl lg:text-5xl font-bold text-emerald-400" style={{ fontFamily: '"Playfair Display", serif' }}>{plan.price}</span>

                        <span className="text-gray-400 ml-2">{plan.period}</span>

                      </div>

                    </div>

                    <ul className="space-y-4 mb-8">

                      {plan.features.map((feature, j) => (

                        <li key={j} className="flex items-start gap-3">

                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />

                          <span className="text-gray-300 text-sm">{feature}</span>

                        </li>

                      ))}

                    </ul>

                    <Button

                      onClick={() => window.location.href = `/payment`}

                      className={`w-full rounded-full py-6 text-lg ${

                        plan.popular

                          ? "bg-emerald-500 text-white hover:bg-emerald-600"

                          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"

                      }`}

                    >

                      Purchase Now

                    </Button>

                  </motion.div>

                ))}

              </div>
            )}
            {/* Premium Plans */}

            {activePlan === 'premium' && (

              <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">

                {[

                  {

                    name: "Basic Plan",

                    price: "₹62,000",

                    period: "+ GST / 3 months",

                    description: "Extended support for serious traders",

                    features: [

                      "3 AI Trading Strategies",

                      "NSE, BSE & MCX Access",

                      "Semi-custom model tuning",

                      "Advanced analytics dashboard",

                      "Enhanced risk controls",

                      "Priority email + phone support",

                      "Up to ₹8L capital",

                      "Quarterly performance review",

                    ],

                    popular: false,

                  },

                  {

                    name: "Professional Plan",

                    price: "₹1,00,000",

                    period: "+ GST / 6 months",

                    badge: "BEST VALUE",

                    description: "Maximum capital and extended support",

                    features: [

                      "8 AI Trading Strategies",

                      "All Indian exchanges + comprehensive F&O",

                      "Custom ML model development",

                      "Deep learning & reinforcement learning",

                      "Full AI risk management suite",

                      "Explainable AI (XAI) dashboard",

                      "Dedicated AI analyst",

                      "24/7 priority support",

                      "Up to ₹10L capital",

                      "Monthly strategy optimization",

                    ],

                    popular: true,

                  },

                  {

                    name: "Custom/Enterprise Plan",

                    price: "Pricing As Per Your Needs",

                    period: "+ GST / 6 months",

                    description: "Fully customized for institutions",

                    features: [

                      "Unlimited AI Trading Strategies",

                      "All exchanges + international markets",

                      "Dedicated ML/AI development team",

                      "Custom deep learning architecture",

                      "Continuous model retraining pipeline",

                      "White-label options available",

                      "On-premise deployment option",

                      "Dedicated quant analyst team",

                      "Unlimited capital",

                      "Custom contract & SLA",

                      "24/7 white-glove support",

                    ],

                    popular: false,

                  },

                ].map((plan, i) => (

                  <motion.div

                    key={plan.name}

                    initial={{ opacity: 0, y: 30 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    viewport={{ once: true }}

                    transition={{ delay: i * 0.1 }}

                    className={`relative rounded-3xl p-8 ${

                      plan.popular

                        ? "bg-gradient-to-b from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500"

                        : "bg-white/5 backdrop-blur-sm border border-white/10"

                    }`}

                  >

                    {plan.badge && (

                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">

                        <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">

                          {plan.badge}

                        </span>

                      </div>

                    )}

                    <div className="text-center mb-6">

                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

                      <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

                      <div className="flex items-baseline justify-center">

                        <span className="text-4xl lg:text-5xl font-bold text-emerald-400" style={{ fontFamily: '"Playfair Display", serif' }}>{plan.price}</span>

                        <span className="text-gray-400 ml-2">{plan.period}</span>

                      </div>

                    </div>

                    <ul className="space-y-4 mb-8">

                      {plan.features.map((feature, j) => (

                        <li key={j} className="flex items-start gap-3">

                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />

                          <span className="text-gray-300 text-sm">{feature}</span>

                        </li>

                      ))}

                    </ul>

                    <Button

                      onClick={() => window.location.href = `/payment`}

                      className={`w-full rounded-full py-6 text-lg ${

                        plan.popular

                          ? "bg-emerald-500 text-white hover:bg-emerald-600"

                          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"

                      }`}

                    >

                      Purchase Now

                    </Button>

                  </motion.div>

                ))}

              </div>

            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Advanced AI-Powered Features
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Harness the power of cutting-edge machine learning for your trading strategies
              </p>
            </motion.div>

            {/* Feature images - add your images to /images/ folder and update paths here */}
            {(() => {
              const featureImages = [
                "/images/rt1.jpg", // Image for feature 1 (Real-Time AI Analytics)
                "/images/rm.jpg", // Image for feature 2 (Intelligent Risk Management)
                "/images/aie.jpg", // Image for feature 3 (High-Speed AI Execution)
                "/images/aibt.png", // Image for feature 4 (AI Backtesting Engine)
                "/images/sentiment.webp", // Image for feature 5 (Sentiment Analysis Engine)
                "/images/stt.jpg", // Image for feature 6 (Adaptive Strategy Optimization)
              ];

              return (
            <div className="relative max-w-6xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-emerald-500" />

              <div className="space-y-12">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative flex items-start gap-8 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                  >
                    {/* Content */}
                    <div className={`flex-1 pl-20 lg:pl-0`}>
                      <div className={`inline-flex items-center gap-3 mb-3`}>
                        <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                    </div>

                    {/* Timeline Dot with Icon */}
                    <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 top-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 border-4 border-white shadow-xl shadow-emerald-500/30 flex items-center justify-center">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Icon Display with Background Image */}
                    <div className="hidden lg:flex flex-1 justify-center">
                      <div className="w-full max-w-md aspect-square rounded-2xl bg-cover bg-center border border-emerald-500/20 backdrop-blur-sm overflow-hidden relative" style={{ backgroundImage: `url(${featureImages[i]})` }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30" />
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                          <feature.icon className="w-32 h-32 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
              )
            })()}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-900 to-navy-light">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Why We Are Diffrent?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Our Core Features
              </p>
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Data Ingestion & Feature Engineering",
                  description: "Our AI pipeline ingests real-time OHLCV data, options chain data, FII/DII flows, global indices, and news feeds. Raw data is transformed into hundreds of engineered features for model training.",
                  icon: Cpu
                },
                {
                  step: "02",
                  title: "Model Training & Backtesting",
                  description: "We train ensemble ML models (Random Forest, LSTM, Gradient Boosting, and Transformer-based architectures) on your chosen instruments and timeframes. Walk-forward backtesting validates performance across unseen market conditions.",
                  icon: Network
                },
                {
                  step: "03",
                  title: "Paper Trading & Model Validation",
                  description: "Before going live, the AI runs in shadow mode — generating signals and simulated trades in real-time without real capital. Sharpe ratio, max drawdown, win rate, and other metrics are monitored closely.",
                  icon: TrendingUp
                },
                {
                  step: "04",
                  title: "Live Deployment with Continuous Learning",
                  description: "Once validated, the model goes live. It self-monitors performance and triggers automatic retraining when model drift is detected, ensuring the AI never goes stale.",
                  icon: Zap
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="flex items-start gap-6 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-emerald-500/30 transition-colors">
                    <div className="hidden lg:flex shrink-0">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30">
                          <item.icon className="w-10 h-10 text-emerald-400" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                          {item.step}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="lg:hidden text-emerald-400 font-bold text-lg mb-2">Step {item.step}</div>
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-navy-light to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Why Choose AI Trading?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Experience the future of trading with intelligent automation
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {service.benefits.map((benefit, i) => {
                const [title, ...desc] = benefit.split(" — ")
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    {/* Decorative gradient orb */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 transition-all duration-500" />

                    <div className="relative flex items-start gap-5">
                      {/* Icon Badge */}
                      <div className="shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                          <CheckCircle2 className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                          {title}
                        </h3>
                        {desc.length > 0 && (
                          <p className="text-gray-300 leading-relaxed">
                            {desc.join(" — ")}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 lg:py-28 bg-gradient-to-b from-gray-900 to-navy-light">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                How Our AI Trading Works
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                From data ingestion to live deployment in four seamless steps
              </p>
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Data Ingestion & Feature Engineering",
                  description: "Our AI pipeline ingests real-time OHLCV data, options chain data, FII/DII flows, global indices, and news feeds. Raw data is transformed into hundreds of engineered features for model training.",
                  icon: Cpu
                },
                {
                  step: "02",
                  title: "Model Training & Backtesting",
                  description: "We train ensemble ML models (Random Forest, LSTM, Gradient Boosting, and Transformer-based architectures) on your chosen instruments and timeframes. Walk-forward backtesting validates performance across unseen market conditions.",
                  icon: Network
                },
                {
                  step: "03",
                  title: "Paper Trading & Model Validation",
                  description: "Before going live, the AI runs in shadow mode — generating signals and simulated trades in real-time without real capital. Sharpe ratio, max drawdown, win rate, and other metrics are monitored closely.",
                  icon: TrendingUp
                },
                {
                  step: "04",
                  title: "Live Deployment with Continuous Learning",
                  description: "Once validated, the model goes live. It self-monitors performance and triggers automatic retraining when model drift is detected, ensuring the AI never goes stale.",
                  icon: Zap
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="flex items-start gap-6 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-emerald-500/30 transition-colors">
                    <div className="hidden lg:flex shrink-0">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30">
                          <item.icon className="w-10 h-10 text-emerald-400" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                          {item.step}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="lg:hidden text-emerald-400 font-bold text-lg mb-2">Step {item.step}</div>
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-navy-light to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Get answers to common questions about our AI trading platform
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-4">
              {[
                {
                  q: "Do I need any knowledge of AI or machine learning to use your platform?",
                  a: "Not at all. Our platform abstracts all the complexity. You define your goals and risk appetite — our AI handles the rest."
                },
                {
                  q: "How is your AI trading different from traditional algo trading?",
                  a: "Traditional algo trading follows fixed, rule-based logic that never changes. Our AI models use machine learning to continuously learn from new market data, detect patterns invisible to humans, and self-optimize — making them far more adaptive and intelligent."
                },
                {
                  q: "What ML models do you use under the hood?",
                  a: "We use an ensemble of models depending on the strategy type — LSTM and Transformer networks for time-series prediction, Random Forest and XGBoost for classification signals, and Reinforcement Learning for execution optimization."
                },
                {
                  q: "How does the AI manage risk automatically?",
                  a: "Our ML-based risk engine monitors real-time portfolio Greeks, correlation exposure, and predicted volatility. It auto-reduces position sizes when risk thresholds are breached and can halt trading entirely if anomalous market conditions are detected."
                },
                {
                  q: "What happens when market conditions change drastically (like a crash or black swan event)?",
                  a: "Our regime detection module identifies abnormal market conditions using unsupervised clustering algorithms and automatically switches to a capital-preservation mode, reducing exposure until normal conditions resume."
                },
                {
                  q: "Is my trading data used to train a shared model?",
                  a: "No. Every client gets their own isolated model trained exclusively on their chosen instruments and strategy parameters. Your data is never shared or mixed with other clients."
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:border-emerald-500/30 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-gray-400 leading-relaxed pl-8">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-emerald-900/20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Start Trading with AI?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                Join thousands of traders who are already leveraging artificial intelligence for smarter, faster, and more profitable trading.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="bg-emerald-500 text-white hover:bg-emerald-600 rounded-full px-8 py-6 text-lg">
                  <Link to="/contact">Start Your Free Trial</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 rounded-full px-8 py-6 text-lg">
                  <Link to="/contact">Schedule a Demo</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    )
  }

  // Special rendering for Software Development page
  if (isSoftwareDev) {
    return (
      <>
        {/* Hero Section with Tech Stack Animation */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          {/* Floating Tech Icons Background */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/10"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  y: [null, Math.random() * -100],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: Math.random() * 10 + 10, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Code2 className="w-12 h-12" />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-blue-500/20 backdrop-blur-sm border border-blue-500/30">
                  <Code2 className="w-16 h-16 text-blue-400" />
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                We Don't Just Write Code.
                <span className="block text-blue-400">
                  We Engineer Solutions.
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                From idea to deployment, we build powerful, scalable, and secure software tailored to your exact business needs — using the world's most trusted technologies.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="bg-blue-500 text-white hover:bg-blue-600 rounded-full px-8 py-6 text-lg">
                  <Link to="/contact">Start Your Project</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-full px-8 py-6 text-lg">
                  <Link to="#what-we-build">View Our Work</Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="text-blue-400 hover:text-blue-300 rounded-full px-8 py-6 text-lg group">
                  <Link to="/contact" className="flex items-center gap-2">
                    Talk to an Expert
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Technologies We Master Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-900 to-blue-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Technologies We Master
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                We don't just know these technologies — we build production-grade systems with them
              </p>
            </motion.div>

            {/* Category 1 - Full Stack Frameworks */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-1 bg-blue-500 rounded-full"></span>
                Full Stack Frameworks
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    name: "MERN Stack",
                    tech: "MongoDB + Express + React + Node.js",
                    use: "SaaS platforms, admin dashboards, real-time web applications, and customer-facing portals",
                    image: "/images/mern.jpg"
                  },
                  {
                    name: "MEAN Stack",
                    tech: "MongoDB + Express + Angular + Node.js",
                    use: "Enterprise dashboards, data-heavy internal tools, and large scale business management systems",
                    image: "/images/mean.jpg"
                  },
                  {
                    name: "PHP / Laravel",
                    tech: "PHP + Laravel + MySQL",
                    use: "E-commerce platforms, CMS systems, legacy modernization, and high-traffic web portals",
                    image: "/images/phplaravel.jpg"
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="tech-card-container"
                  >
                    <div 
                      className="tech-card-inner relative h-64 preserve-3d transition-transform duration-500 cursor-pointer"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Front */}
                      <div 
                        className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 border border-blue-500/30 backdrop-blur-sm"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                      >
                        <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                        <p className="text-blue-300 text-sm mb-4">{item.tech}</p>
                        <div className="text-gray-400 text-sm">
                          <span className="text-blue-400 font-semibold">→ Hover to see</span> what we build
                        </div>
                      </div>
                      {/* Back */}
                      <div 
                        className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden border border-cyan-500/30 backdrop-blur-sm"
                        style={{ 
                          backfaceVisibility: 'hidden', 
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url("${item.image}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'absolute',
                            width: '100%',
                            height: '100%'
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Category 2 - CRM & Enterprise */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-1 bg-blue-500 rounded-full"></span>
                CRM & Enterprise Platforms
              </h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
              >
                <div className="tech-card-container">
                  <div 
                    className="tech-card-inner relative h-48 preserve-3d transition-transform duration-500 cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div 
                      className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 border border-blue-500/30 backdrop-blur-sm"
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="px-3 py-1 bg-blue-500/30 rounded-full text-xs font-semibold text-blue-300">
                          Certified
                        </div>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">Salesforce</h4>
                      <p className="text-blue-300 text-sm mb-4">Sales Cloud, Service Cloud, Apex, LWC</p>
                      <div className="text-gray-400 text-sm">
                        <span className="text-blue-400 font-semibold">→ Hover to see</span> what we build
                      </div>
                    </div>
                    <div 
                      className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden border border-purple-500/30 backdrop-blur-sm"
                      style={{ 
                        backfaceVisibility: 'hidden', 
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ 
                          backgroundImage: `url("/images/salesforce.jpg")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'absolute',
                          width: '100%',
                          height: '100%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Category 3 - Database & Backend */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-1 bg-blue-500 rounded-full"></span>
                Database & Backend
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    name: "SQL",
                    tech: "MySQL / PostgreSQL / MSSQL",
                    use: "Financial systems, ERP software, complex reporting, and transactional applications",
                    image: "/images/sql.jpg"
                  },
                  {
                    name: "MongoDB",
                    tech: "NoSQL, Aggregation pipelines, Atlas",
                    use: "Real-time apps, flexible data models, high-write workloads, and microservices",
                    image: "/images/mongo.jpg"
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="tech-card-container"
                  >
                    <div 
                      className="tech-card-inner relative h-48 preserve-3d transition-transform duration-500 cursor-pointer"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div 
                        className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 border border-blue-500/30 backdrop-blur-sm"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                      >
                        <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                        <p className="text-blue-300 text-sm mb-4">{item.tech}</p>
                        <div className="text-gray-400 text-sm">
                          <span className="text-blue-400 font-semibold">→ Hover to see</span> what we build
                        </div>
                      </div>
                      <div 
                        className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden border border-cyan-500/30 backdrop-blur-sm"
                        style={{ 
                          backfaceVisibility: 'hidden', 
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url("${item.image}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'absolute',
                            width: '100%',
                            height: '100%'
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Category 4 - Cloud & Infrastructure */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-1 bg-blue-500 rounded-full"></span>
                Cloud & Infrastructure
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    name: "AWS",
                    tech: "EC2, S3, Lambda, RDS, CloudFront, API Gateway, SES, Route53",
                    use: "Hosting scalable apps, serverless functions, file storage, CDN delivery, and auto-scaling systems",
                    badge: "Certified Partner",
                    image: "/images/aws.jpg"
                  },
                  {
                    name: "GCP",
                    tech: "Cloud Run, Firebase, BigQuery, Cloud Storage, Pub/Sub, Kubernetes Engine",
                    use: "ML-integrated apps, real-time databases with Firebase, big data analytics, and containerized microservice deployments",
                    badge: "Certified Partner",
                    image: "/images/gcp.jpg"
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="tech-card-container"
                  >
                    <div 
                      className="tech-card-inner relative h-56 preserve-3d transition-transform duration-500 cursor-pointer"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div 
                        className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 border border-blue-500/30 backdrop-blur-sm"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="px-3 py-1 bg-blue-500/30 rounded-full text-xs font-semibold text-blue-300">
                            {item.badge}
                          </div>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                        <p className="text-blue-300 text-sm mb-4">{item.tech}</p>
                        <div className="text-gray-400 text-sm">
                          <span className="text-blue-400 font-semibold">→ Hover to see</span> what we build
                        </div>
                      </div>
                      <div 
                        className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden border border-purple-500/30 backdrop-blur-sm"
                        style={{ 
                          backfaceVisibility: 'hidden', 
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url("${item.image}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'absolute',
                            width: '100%',
                            height: '100%'
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Build Section */}
        <section id="what-we-build" className="py-20 lg:py-28 bg-gradient-to-b from-blue-900 to-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                What We Build
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Every line of code serves a business purpose
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Web Applications",
                  tech: "Built with MERN / MEAN / PHP",
                  examples: "Customer portals, SaaS dashboards, booking systems, inventory tools"
                },
                {
                  title: "Enterprise Software",
                  tech: "Built with Salesforce, SQL, AWS",
                  examples: "CRM systems, ERP platforms, workflow automation, reporting tools"
                },
                {
                  title: "APIs & Integrations",
                  tech: "Built with Node.js, PHP, REST, GraphQL",
                  examples: "Payment gateways, third-party integrations, microservices, webhooks"
                },
                {
                  title: "Cloud-Native Applications",
                  tech: "Built with AWS, GCP, Docker, Kubernetes",
                  examples: "Auto-scaling SaaS, serverless functions, multi-region deployments, CI/CD pipelines"
                },
                {
                  title: "Salesforce Solutions",
                  tech: "Built with Apex, Lightning Web Components, Salesforce Flow, REST APIs",
                  examples: "Custom Salesforce apps, Sales Cloud customizations, third-party sync, automated workflows"
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-colors"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-blue-400 text-sm font-semibold mb-4">{item.tech}</p>
                  <ul className="space-y-2">
                    {item.examples.split(", ").map((ex, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{ex}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features Section - Alternating Layout */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-900 to-blue-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Everything Your Software Needs, Built In
              </h2>
            </motion.div>

            <div className="space-y-20">
              {[
                {
                  icon: Shield,
                  title: "Security-First Architecture",
                  features: [
                    "SSL/TLS encryption on all data in transit",
                    "AES-256 encryption for data at rest",
                    "Role-based access control (RBAC)",
                    "OWASP security standards compliance",
                    "Regular automated vulnerability scanning",
                    "Two-factor authentication (2FA) built-in"
                  ],
                  tech: "AWS IAM, JWT, bcrypt, HTTPS, Helmet.js, CORS policies",
                  imageLeft: true,
                  backgroundImage: "/images/kyc.jpg"
                },
                {
                  icon: Zap,
                  title: "Performance & Scalability",
                  features: [
                    "Horizontal auto-scaling on AWS EC2 / GCP Cloud Run",
                    "CDN-powered global content delivery via AWS CloudFront",
                    "Database query optimization and indexing for SQL and MongoDB",
                    "Redis caching layer for sub-100ms API responses",
                    "Load balancing across multiple availability zones"
                  ],
                  tech: "AWS CloudFront, Redis, Nginx, PM2, MongoDB Atlas",
                  imageLeft: false,
                  backgroundImage: "/images/rt1.jpg"
                },
                {
                  icon: Settings,
                  title: "Seamless Integrations",
                  features: [
                    "RESTful and GraphQL API development",
                    "Payment gateways: Razorpay, Stripe, PayU",
                    "Communication: Twilio SMS, SendGrid, WhatsApp Business API",
                    "ERP & CRM: Salesforce, Zoho, Tally",
                    "Cloud storage: AWS S3, Google Cloud Storage",
                    "Maps & Location: Google Maps API"
                  ],
                  tech: "Node.js, PHP, Axios, Webhook handlers, OAuth 2.0",
                  imageLeft: true,
                  backgroundImage: "/images/c1.jpg"
                },
                {
                  icon: Globe,
                  title: "Cloud Deployment & DevOps",
                  features: [
                    "Full CI/CD pipeline setup (GitHub Actions / Jenkins)",
                    "Containerized deployments using Docker",
                    "Kubernetes orchestration for microservices",
                    "Automated backups and disaster recovery",
                    "Real-time monitoring with AWS CloudWatch and GCP Monitoring",
                    "Zero-downtime deployments with blue-green deployment strategy"
                  ],
                  tech: "AWS, GCP, Docker, Kubernetes, GitHub Actions, Terraform",
                  imageLeft: false,
                  backgroundImage: "/images/aws.jpg"
                },
              ].map((feature) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row ${feature.imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-blue-500/20 backdrop-blur-sm border border-blue-500/30">
                        <feature.icon className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="text-3xl font-bold text-white">{feature.title}</h3>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {feature.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="text-gray-300">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <p className="text-sm text-blue-300">
                        <span className="font-semibold">Tech used:</span> {feature.tech}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div 
                      className="w-full max-w-md aspect-square rounded-2xl bg-cover bg-center border border-blue-500/30 backdrop-blur-sm shadow-2xl shadow-blue-500/20"
                      style={{ 
                        backgroundImage: `url("${feature.backgroundImage}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Process Timeline */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-blue-900 to-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                How We Build Your Software
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A proven process refined over 150+ projects
              </p>
            </motion.div>

            <div className="relative max-w-5xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500" />

              <div className="space-y-12">
                {[
                  {
                    step: "01",
                    title: "Discovery & Architecture Design",
                    duration: "Week 1",
                    description: [
                      "Deep-dive requirements gathering session",
                      "Business process mapping and user flow design",
                      "Technology selection (MERN vs MEAN vs PHP vs Salesforce — we recommend the best fit)",
                      "System architecture design (monolith vs microservices, cloud infrastructure planning)",
                      "Database schema design (SQL vs NoSQL decision)",
                      "Project scope, timeline, and cost finalization"
                    ],
                    tools: "Figma, Miro, Draw.io, ERD tools"
                  },
                  {
                    step: "02",
                    title: "UI/UX Design",
                    duration: "Week 1-2",
                    description: [
                      "Wireframes for all screens and user flows",
                      "High-fidelity mockups with your brand identity",
                      "Interactive Figma prototype for client approval",
                      "Mobile-first responsive design",
                      "Design system creation (colors, typography, components)"
                    ],
                    tools: "Figma, Adobe XD"
                  },
                  {
                    step: "03",
                    title: "Agile Development (Sprints)",
                    duration: "Week 2 onwards",
                    description: [
                      "Sprint planning with prioritized feature backlog",
                      "Daily standups and progress updates",
                      "Demo at end of every sprint (you see real progress)",
                      "Code reviews and pair programming",
                      "Unit testing and integration testing per sprint",
                      "Version control with Git (feature branching strategy)"
                    ],
                    tools: "MERN / MEAN / PHP / Salesforce / SQL / AWS / GCP"
                  },
                  {
                    step: "04",
                    title: "QA & Testing",
                    duration: "Last 1-2 weeks",
                    description: [
                      "Manual QA testing across devices and browsers",
                      "Automated testing (Jest, Mocha, Cypress)",
                      "Performance testing and load testing",
                      "Security penetration testing",
                      "UAT (User Acceptance Testing) with client",
                      "Bug fixes and final refinements"
                    ],
                    tools: "Jest, Mocha, Cypress"
                  },
                  {
                    step: "05",
                    title: "Deployment & Go Live",
                    duration: "2-3 days",
                    description: [
                      "Production environment setup on AWS or GCP",
                      "Domain, SSL, and CDN configuration",
                      "CI/CD pipeline activation",
                      "Database migration to production",
                      "Smoke testing on live environment",
                      "Go live 🚀"
                    ],
                    tools: "AWS EC2/RDS/S3, GCP Cloud Run, Docker, Nginx, GitHub Actions"
                  },
                  {
                    step: "06",
                    title: "Post-Launch Support",
                    duration: "Ongoing",
                    description: [
                      "3 months free bug fixes included",
                      "Performance monitoring and alerts",
                      "Regular security patches and updates",
                      "Feature enhancement requests",
                      "Monthly health check reports",
                      "Optional: Monthly maintenance retainer"
                    ],
                    tools: "Ongoing support"
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative flex items-start gap-8 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${i % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:text-left lg:pl-16"} pl-20 lg:pl-0`}>
                      <div className={`inline-flex items-center gap-3 mb-3 ${i % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-300">
                          {item.duration}
                        </span>
                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                      </div>
                      <ul className={`space-y-2 mb-4 ${i % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                        {item.description.map((d, j) => (
                          <li key={j} className={`flex items-start gap-2 ${i % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                            <span className="text-gray-300 text-sm">{d}</span>
                          </li>
                        ))}
                      </ul>
                      <div className={`inline-block px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 ${i % 2 === 0 ? "lg:ml-auto" : ""}`}>
                        <p className="text-xs text-blue-300">
                          <span className="font-semibold">Tools:</span> {item.tools}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 top-8 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900 shadow-lg shadow-blue-500/50" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Selection Guide */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-900 to-blue-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Not Sure Which Technology Is Right for You?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                We help you choose — here's our honest guide
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-500/30">
                    <th className="text-left p-4 text-blue-300 font-semibold">If you need...</th>
                    <th className="text-left p-4 text-blue-300 font-semibold">We recommend...</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { need: "A fast, modern web app or SaaS", recommend: "MERN Stack (React + Node + MongoDB)" },
                    { need: "A large-scale enterprise internal tool", recommend: "MEAN Stack (Angular + Node + MongoDB)" },
                    { need: "E-commerce or content-heavy website", recommend: "PHP / Laravel + MySQL" },
                    { need: "CRM, sales, or service workflow", recommend: "Salesforce (Sales Cloud / Service Cloud + Apex)" },
                    { need: "Complex reports or financial systems", recommend: "SQL (PostgreSQL / MySQL) + Node.js or PHP backend" },
                    { need: "Scalable cloud infrastructure", recommend: "AWS (EC2 + RDS + S3 + CloudFront + Lambda)" },
                    { need: "ML-integrated or data-heavy applications", recommend: "GCP (Firebase + BigQuery + Cloud Run + Pub/Sub)" },
                  ].map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-white/10 hover:bg-blue-500/10 transition-colors"
                    >
                      <td className="p-4 text-gray-300">{row.need}</td>
                      <td className="p-4 text-blue-400 font-semibold">{row.recommend}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-gray-400 text-lg mb-6">
                Not sure? Book a free 30-minute tech consultation and we'll recommend the perfect stack for your project.
              </p>
              <Button asChild size="lg" className="bg-blue-500 text-white hover:bg-blue-600 rounded-full px-8 py-6 text-lg">
                <Link to="/contact">Book Free Consultation</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section - 3 Column Grid */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-blue-900 to-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Why Businesses Choose Us
              </h2>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: "Exact Fit Solutions",
                  description: "No templates. No shortcuts. Every feature, workflow, and interface is built specifically for your business processes."
                },
                {
                  icon: TrendingUp,
                  title: "Built to Scale",
                  description: "Whether you have 10 users or 10,00,000 — our AWS and GCP-powered architectures scale automatically without performance loss."
                },
                {
                  icon: Shield,
                  title: "Enterprise-Grade Security",
                  description: "Security isn't an afterthought. Every project follows OWASP standards, uses encrypted databases, and passes penetration testing before launch."
                },
                {
                  icon: Zap,
                  title: "Fast Delivery with Agile",
                  description: "2-week sprint cycles mean you see working software every fortnight — not just promises. Most projects launch in 6-12 weeks."
                },
                {
                  icon: Users,
                  title: "Long-Term Partnership",
                  description: "We don't disappear after launch. Post-launch support, maintenance retainers, and dedicated account managers keep your software healthy long-term."
                },
                {
                  icon: DollarSign,
                  title: "Transparent Pricing",
                  description: "No hidden costs. No surprise invoices. Fixed-price projects with clearly defined scope or flexible monthly retainers — you choose what works for you."
                },
              ].map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-colors"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                    <benefit.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-900 to-blue-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Simple, Transparent Project Pricing
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                Every project is unique — here's our base structure. Final pricing depends on scope and complexity.
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
              {[
                {
                  name: "Starter Project",
                  price: "₹49,999",
                  period: "one-time",
                  badge: null,
                  description: "Small businesses needing their first web application",
                  features: [
                    "Up to 10 screens / modules",
                    "MERN or PHP stack (we recommend best fit)",
                    "Basic authentication (email/password)",
                    "MySQL or MongoDB database",
                    "Deployed on AWS or GCP",
                    "Mobile responsive design",
                    "1 third-party integration (payment, maps, or email)",
                    "Source code handover",
                    "1 month post-launch support",
                    "Basic documentation",
                  ],
                  notIncluded: [
                    "Custom UI/UX design",
                    "Advanced integrations",
                    "CI/CD pipeline"
                  ],
                  popular: false,
                },
                {
                  name: "Growing Business",
                  price: "₹1,49,999",
                  period: "one-time",
                  badge: "MOST POPULAR",
                  description: "Startups and SMEs needing a full-featured custom platform",
                  features: [
                    "Up to 30 screens / modules",
                    "MERN / MEAN / PHP / Salesforce (based on requirements)",
                    "Custom UI/UX design in Figma",
                    "Advanced auth (OAuth, Google login, 2FA)",
                    "SQL + NoSQL hybrid if needed",
                    "AWS / GCP production deployment",
                    "CI/CD pipeline with GitHub Actions",
                    "Up to 5 third-party integrations",
                    "RESTful API development",
                    "Redis caching layer",
                    "Source code + full documentation",
                    "3 months post-launch support",
                    "1 free sprint of enhancements after launch",
                  ],
                  notIncluded: [],
                  popular: true,
                },
                {
                  name: "Enterprise Engineering",
                  price: "₹3,00,000+",
                  period: "Custom Quote",
                  badge: null,
                  description: "Large businesses, complex platforms, and enterprise-grade systems",
                  features: [
                    "Unlimited scope and modules",
                    "Full system architecture design",
                    "Microservices or monolith — we decide together",
                    "Salesforce customization available",
                    "Multi-region AWS / GCP deployment",
                    "Kubernetes / Docker containerization",
                    "Advanced security audit + pen testing",
                    "Unlimited third-party integrations",
                    "GraphQL API if required",
                    "BigQuery / advanced analytics setup",
                    "Dedicated development team assigned",
                    "Weekly progress calls + sprint demos",
                    "12 months support + maintenance SLA",
                    "NDA available",
                    "White-label option",
                  ],
                  notIncluded: [],
                  popular: false,
                },
              ].map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-3xl p-8 ${
                    plan.popular
                      ? "bg-gradient-to-b from-blue-500/20 to-cyan-500/20 border-2 border-blue-500"
                      : "bg-white/5 backdrop-blur-sm border border-white/10"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl lg:text-5xl font-bold text-blue-400">{plan.price}</span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 opacity-50">
                        <span className="w-5 h-5 flex items-center justify-center text-red-400 shrink-0 mt-0.5">✕</span>
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => window.location.href = `/payment`}
                    className={`w-full rounded-full py-6 text-lg ${
                      plan.popular
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    }`}
                  >
                    Purchase Now
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <div className="inline-block px-6 py-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-gray-300">
                  <span className="text-2xl mr-2">💡</span>
                  <span className="font-semibold">All projects include:</span> Git version control, code reviews, testing, and a staging environment before go-live. 
                  <span className="text-blue-400 font-semibold">No hidden charges. Ever.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-blue-900 to-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Get answers to common questions about our software development services
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-4">
              {[
                {
                  q: "How do you decide which technology to use for my project?",
                  a: "We analyze your business requirements, expected user load, budget, and long-term roadmap. For example, we'd recommend MERN for a fast SaaS app, PHP/Laravel for an e-commerce store, Salesforce for CRM workflows, and AWS + microservices for an enterprise platform that needs to scale to millions of users."
                },
                {
                  q: "Do you work with our existing codebase or only greenfield projects?",
                  a: "Both. We regularly take over existing projects, refactor legacy PHP or older Node.js code, add new features, migrate to cloud (AWS/GCP), and improve performance of live systems."
                },
                {
                  q: "Can you integrate our software with Salesforce or other third-party platforms?",
                  a: "Yes. We have hands-on experience with Salesforce APIs, Apex development, Lightning Web Components, and syncing external systems with Salesforce using REST APIs and middleware."
                },
                {
                  q: "Will my software be hosted on AWS or GCP? What's the monthly cloud cost?",
                  a: "We deploy on both AWS and GCP depending on your requirements. Cloud hosting costs are separate from development costs and typically range from ₹2,000 to ₹15,000/month depending on traffic and storage needs. We optimize architecture to minimize cloud spend."
                },
                {
                  q: "What if I need changes after the project is delivered?",
                  a: "All plans include post-launch support for bug fixes. For new features and enhancements, we offer monthly retainer packages or fixed-price change requests — whichever suits you."
                },
                {
                  q: "How do you ensure the security of my software and data?",
                  a: "We follow OWASP Top 10 security practices, use JWT + bcrypt for authentication, AES-256 for data encryption, AWS IAM for cloud security, and run automated vulnerability scans before every deployment."
                },
                {
                  q: "Do I get the source code after the project?",
                  a: "Yes, always. 100% source code ownership is included in every plan. We also hand over full technical documentation and deployment guides."
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:border-blue-500/30 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-gray-400 leading-relaxed pl-8">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-blue-900 to-emerald-900/20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Build Your Software?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                Let's turn your idea into reality with cutting-edge technology and proven expertise.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="bg-blue-500 text-white hover:bg-blue-600 rounded-full px-8 py-6 text-lg">
                  <Link to="/contact">Start Your Project</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-full px-8 py-6 text-lg">
                  <Link to="/contact">Schedule a Demo</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    )
  }

  // Special rendering for HRM & Payroll page
  if (isHRM) {
    return (
      <>
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1A0533] via-[#2D1B69] to-[#1A0533]">
          {/* Floating HR Metric Cards Background */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/10"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: window.innerHeight + 100,
                }}
                animate={{ 
                  y: -100,
                  rotate: 360
                }}
                transition={{ 
                  duration: Math.random() * 10 + 15, 
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
              >
                <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                  {i % 3 === 0 ? <Users className="w-8 h-8" /> : i % 3 === 1 ? <Clock className="w-8 h-8" /> : <DollarSign className="w-8 h-8" />}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30">
                  <Users className="w-16 h-16 text-indigo-400" />
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                Your Entire HR Department.
                <span className="block text-indigo-400">
                  One Smart Platform.
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                From hiring to retiring — automate every aspect of human resource operations and payroll with zero errors and full statutory compliance.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="bg-indigo-500 text-white hover:bg-indigo-600 rounded-full px-8 py-6 text-lg">
                  <Link to="/contact">Request a Demo</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 rounded-full px-8 py-6 text-lg">
                  <Link to="#pricing">See Pricing</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section 1 - The Problem We Solve */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-[#1A0533] to-[#0F0A1E]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Still Managing HR the Old Way?
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Left Side - The Old Way */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl p-8 bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30"
              >
                <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
                  <span className="text-4xl">❌</span>
                  Without Us
                </h3>
                <ul className="space-y-4">
                  {[
                    "Payroll calculated manually in Excel every month",
                    "Attendance tracked in registers or punch cards",
                    "Employees calling HR for every leave balance query",
                    "Salary slips distributed physically or via plain email",
                    "PF, ESI, TDS calculated manually — errors every cycle",
                    "No visibility into HR data or workforce trends",
                    "Onboarding new employees takes days of paperwork",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-400 text-xl mt-0.5">✕</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Right Side - The HRM Way */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl p-8 bg-gradient-to-br from-emerald-900/20 to-emerald-900/20 border border-emerald-500/30"
              >
                <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                  <span className="text-4xl">✅</span>
                  With Our HRM Platform
                </h3>
                <ul className="space-y-4">
                  {[
                    "Payroll auto-processed in one click — zero errors",
                    "Biometric & app-based attendance tracked in real time",
                    "Employee self-service portal handles it all 24/7",
                    "Payslips auto-generated and emailed every month",
                    "100% statutory compliance — PF, ESI, TDS automated",
                    "Live HR dashboard with actionable workforce analytics",
                    "Digital onboarding completed in under 30 minutes",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2 - Core Modules with Tabs */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-[#87868a] to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Everything HR Under One Roof
              </h2>
            </motion.div>

            <HRMModulesTabs />
          </div>
        </section>

        {/* Section 3 - Stats Strip */}
        <section className="py-20 bg-gradient-to-r from-[#1A0533] via-[#6C63FF] to-[#1A0533]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: 80, suffix: "%", label: "Faster Payroll Processing" },
                { value: 100, suffix: "%", label: "Statutory Compliance Guaranteed" },
                { value: 30, suffix: " Min", label: "Employee Onboarding Time" },
                { value: 0, suffix: "", label: "Payroll Errors Guaranteed", prefix: "Zero " },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl lg:text-7xl font-bold text-white mb-2">
                    {stat.prefix}{stat.value}<sup className="text-3xl">{stat.suffix}</sup>
                  </div>
                  <div className="text-indigo-200 text-lg font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 - Who Is This For */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-[#F9F7FF] to-[#0F0A1E]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Built for Every Type of Organisation
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Whether you have 10 employees or 10,000 — our platform scales with you
              </p>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "",
                  title: "Startups & SMEs",
                  features: [
                    "Simple setup in under a day",
                    "No dedicated HR team needed",
                    "Affordable plans that grow with you",
                    "Core payroll + attendance covered",
                  ]
                },
                {
                  icon: "",
                  title: "Manufacturing & Field Teams",
                  features: [
                    "Shift management and rotational shifts",
                    "Biometric integration for shop floor",
                    "Overtime and night shift allowances",
                    "Multi-location branch management",
                  ]
                },
                {
                  icon: "",
                  title: "Hospitals & Healthcare",
                  features: [
                    "24/7 shift scheduling and management",
                    "Department-wise payroll structures",
                    "Nurse and doctor contract management",
                    "Strict compliance and audit trail",
                  ]
                },
                {
                  icon: "",
                  title: "Schools & Educational Institutions",
                  features: [
                    "Academic year-based payroll cycles",
                    "Teaching and non-teaching staff separation",
                    "Leave policy aligned with school calendar",
                    "Integration with school management system",
                  ]
                },
                {
                  icon: "",
                  title: "Construction & Contract Workforce",
                  features: [
                    "Daily wage and contract worker payroll",
                    "Contractor and sub-contractor management",
                    "Site-wise attendance tracking",
                    "Labour compliance and contractor billing",
                  ]
                },
                {
                  icon: "",
                  title: "IT & Services Companies",
                  features: [
                    "Remote team attendance via app",
                    "Flexible work-from-home policies",
                    "Appraisal and increment management",
                    "Reimbursement and expense claims",
                  ]
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-8 rounded-2xl bg-white border border-gray-200 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
                >
                  <div className="text-5xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
                  <ul className="space-y-2">
                    {card.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5 - Pricing */}
        <section id="pricing" className="py-20 lg:py-28 bg-gradient-to-b from-[#0F0A1E] to-[#1A0533]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Straightforward Pricing. No Surprises.
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                All plans include free setup and onboarding support
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "₹2,999",
                  period: "/month",
                  description: "Up to 25 employees",
                  accentColor: "from-gray-500 to-gray-600",
                  borderColor: "border-gray-500/30",
                  features: [
                    "Employee profiles & org chart",
                    "Attendance tracking (app-based)",
                    "Leave management",
                    "Monthly payroll processing",
                    "Payslip generation & email delivery",
                    "PF, ESI, TDS auto-calculation",
                    "Email support",
                  ],
                  notIncluded: [
                    "Biometric integration",
                    "Self-service portal",
                    "HR analytics dashboard",
                  ],
                  popular: false,
                },
                {
                  name: "Professional",
                  price: "₹6,999",
                  period: "/month",
                  badge: "MOST POPULAR",
                  description: "Up to 100 employees",
                  accentColor: "from-indigo-500 to-purple-600",
                  borderColor: "border-indigo-500",
                  glow: true,
                  features: [
                    "Everything in Starter",
                    "Employee self-service portal (web + mobile)",
                    "Biometric device integration",
                    "Recruitment and onboarding module",
                    "Advanced HR analytics dashboard",
                    "Compliance calendar + deadline alerts",
                    "Loan & advance management",
                    "Custom leave policies",
                    "Reimbursement & expense claims",
                    "Phone + email support",
                    "Dedicated onboarding specialist",
                  ],
                  notIncluded: [],
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  period: "",
                  description: "100+ employees / Multi-location",
                  accentColor: "from-yellow-500 to-amber-600",
                  borderColor: "border-yellow-500/30",
                  features: [
                    "Everything in Professional",
                    "Unlimited employees",
                    "Multi-branch / multi-location support",
                    "Custom salary structures per department",
                    "API access for third-party integrations",
                    "Custom workflows and approval chains",
                    "Dedicated account manager",
                    "On-premise deployment option",
                    "White-label available",
                    "SLA-backed support (4hr response time)",
                  ],
                  notIncluded: [],
                  popular: false,
                },
              ].map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-2xl p-8 ${
                    plan.glow ? "bg-gradient-to-b from-indigo-500/10 to-purple-500/10 shadow-xl shadow-indigo-500/20" : "bg-white/5 backdrop-blur-sm"
                  } border-l-4 ${plan.accentColor} ${plan.borderColor}`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                    <div className="flex items-baseline">
                      <span className="text-4xl lg:text-5xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 opacity-50">
                        <span className="w-5 h-5 flex items-center justify-center text-red-400 shrink-0 mt-0.5">✕</span>
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => window.location.href = `/payment`}
                    className={`w-full rounded-full py-6 text-lg ${
                      plan.popular
                        ? "bg-indigo-500 text-white hover:bg-indigo-600"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    }`}
                  >
                    Purchase Now
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <div className="inline-block px-6 py-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <p className="text-gray-300">
                  <span className="text-2xl mr-2">💡</span>
                  <span className="font-semibold">All plans include:</span> Free data migration from your existing system, free training session for your HR team, and 14-day free trial.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 6 - FAQ */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-[#1A0533] to-[#0F0A1E]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Common Questions
              </h2>
            </motion.div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "Is your payroll software compliant with Indian labour laws?",
                  a: "Yes. We handle PF, ESI, TDS, Professional Tax, Gratuity, and Bonus calculations as per the latest Indian statutory requirements. Compliance rules update automatically when regulations change."
                },
                {
                  q: "Can employees access their payslips from their phone?",
                  a: "Yes. The self-service mobile app lets employees view payslips, apply for leave, check attendance, and raise HR queries anytime — no need to contact HR for routine requests."
                },
                {
                  q: "How long does it take to set up the entire system?",
                  a: "Basic setup takes 1 working day. Full setup including biometric integration, data migration, and HR team training is completed within 3-5 working days."
                },
                {
                  q: "Can it handle employees across multiple office locations?",
                  a: "Yes. You can manage multiple branches, locations, and departments from a single admin panel with location-wise attendance, payroll, and reporting."
                },
                {
                  q: "What if we already have employee data in Excel or another software?",
                  a: "We provide free data migration support. Your team shares the existing Excel files and we import all employee records, salary structures, and leave balances into the new system at no extra cost."
                },
                {
                  q: "Is employee salary and personal data secure on your platform?",
                  a: "Absolutely. All data is encrypted using AES-256 encryption, stored on secure cloud servers with daily backups, and access is controlled via role-based permissions. Your data is never shared with third parties."
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:border-indigo-500/30 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                      <span className="text-indigo-400 text-sm font-bold">?</span>
                    </div>
                    {faq.q}
                  </h3>
                  <p className="text-gray-400 leading-relaxed pl-9">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-[#0F0A1E] to-[#6C63FF]/20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your HR Operations?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                Join hundreds of organizations automating their HR and payroll with zero errors.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="bg-indigo-500 text-white hover:bg-indigo-600 rounded-full px-8 py-6 text-lg">
                  <Link to="/contact">Request a Demo</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 rounded-full px-8 py-6 text-lg">
                  <Link to="/contact">Start Free Trial</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    )
  }

  // Special rendering for School Management page
  if (isSchoolManagement) {
    return (
      <>
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0D1B4B] via-[#1E40AF] to-[#0D1B4B]">
          {/* Floating School Icons Background */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/10"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: window.innerHeight + 100,
                }}
                animate={{ 
                  y: -100,
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: Math.random() * 15 + 15, 
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
              >
                <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                  {[GraduationCap, BookOpen, Bus, Bell, Award][i % 5] && (() => {
                    const IconComponent = [GraduationCap, BookOpen, Bus, Bell, Award][i % 5]
                    return IconComponent ? <IconComponent className="w-8 h-8" /> : null
                  })()}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-blue-500/20 backdrop-blur-sm border border-blue-500/30">
                  <GraduationCap className="w-16 h-16 text-blue-400" />
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                Run Your Entire School From One Dashboard.
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                A complete ERP solution that digitizes academics, administration, and parent communication for modern educational institutions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#3B3786] text-white hover:bg-[#3B3786]/90 rounded-full px-8 py-6 text-lg">
                  <Link to="/contact">Schedule a Free Demo</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
                  <Link to="#modules">See All Features</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section 1 - Modules Showcase (Bento Grid) */}
        <section id="modules" className="py-20 lg:py-28 bg-gradient-to-b from-[#0D1B4B] to-[#F0F7FF]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                One System. Every Department.
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Everything your school needs — nothing it doesn't
              </p>
            </motion.div>

            <SchoolBentoGrid />
          </div>
        </section>

        {/* Section 2 - Stats Strip */}
        <section className="py-20 bg-gradient-to-r from-[#1a1545] via-[#3B3786] to-[#1a1545]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "100+", label: "Schools Onboarded" },
                { value: "50,000+", label: "Students Managed" },
                { value: "98%", label: "Parent Satisfaction Rate" },
                { value: "40%", label: "Reduction in Admin Workload" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl lg:text-7xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-orange-100 text-lg font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3 - Who Benefits (Persona Cards) */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-[#F0F7FF] to-[#0D1B4B]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Built for Everyone in Your School
              </h2>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
              {/* Card 1: The Principal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl p-8 bg-gradient-to-b from-blue-50 to-white border border-blue-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4"></div>
                  <h3 className="text-2xl font-bold text-blue-900">The Principal</h3>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">Morning:</span>
                    <p className="text-gray-700">Opens dashboard — sees today's attendance across all classes instantly</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">Midday:</span>
                    <p className="text-gray-700">Reviews exam results and identifies underperforming sections</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">Evening:</span>
                    <p className="text-gray-700">Generates board meeting report with one click — no manual compilation</p>
                  </div>
                </div>
                <div className="italic text-blue-800 text-center">
                  "Complete visibility over every aspect of school operations, always."
                </div>
              </motion.div>

              {/* Card 2: The Teacher */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl p-8 bg-gradient-to-b from-emerald-50 to-white border border-emerald-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4"></div>
                  <h3 className="text-2xl font-bold text-emerald-900">The Teacher</h3>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold">Morning:</span>
                    <p className="text-gray-700">Marks attendance on mobile app in under 2 minutes</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold">Midday:</span>
                    <p className="text-gray-700">Uploads homework and study material for students</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold">Evening:</span>
                    <p className="text-gray-700">Enters exam marks — results auto-calculate and publish</p>
                  </div>
                </div>
                <div className="italic text-emerald-800 text-center">
                  "Less paperwork. More time for teaching."
                </div>
              </motion.div>

              {/* Card 3: The Parent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl p-8 bg-gradient-to-b from-orange-50 to-white border border-orange-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4"></div>
                  <h3 className="text-2xl font-bold text-orange-900">The Parent</h3>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold">Morning:</span>
                    <p className="text-gray-700">Gets notification — child marked present at school ✅</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold">Afternoon:</span>
                    <p className="text-gray-700">Checks today's homework assigned by teacher</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold">Evening:</span>
                    <p className="text-gray-700">Pays next month's fee online — receipt in inbox instantly</p>
                  </div>
                </div>
                <div className="italic text-orange-800 text-center">
                  "Always connected to their child's school life, from anywhere."
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 4 - Pricing */}
        <section id="pricing" className="py-20 lg:py-28 bg-gradient-to-b from-[#0D1B4B] to-[#F0F7FF]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Plans for Every Institution
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Free setup and staff training included in all plans
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
              {[
                {
                  name: "Basic",
                  price: "₹4,999",
                  period: "/month",
                  description: "Up to 300 students",
                  ribbonColor: "from-gray-500 to-gray-600",
                  features: [
                    "Student & staff management",
                    "Attendance management",
                    "Fee collection + online payments",
                    "Basic academic management",
                    "Parent SMS/email notifications",
                    "Email support",
                  ],
                  notIncluded: [
                    "Parent mobile app",
                    "GPS transport tracking",
                    "Advanced analytics",
                  ],
                  popular: false,
                },
                {
                  name: "Professional",
                  price: "₹9,999",
                  period: "/month",
                  badge: "MOST POPULAR",
                  description: "Up to 1000 students",
                  ribbonColor: "from-blue-500 to-[#1E40AF]",
                  glow: true,
                  features: [
                    "Everything in Basic",
                    "Student & parent mobile app",
                    "Exam and result management",
                    "GPS transport tracking",
                    "Library management",
                    "Homework and assignment module",
                    "Advanced performance analytics",
                    "Phone + email support",
                    "Dedicated onboarding specialist",
                  ],
                  notIncluded: [],
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  period: "",
                  description: "1000+ students / Multiple branches",
                  ribbonColor: "from-[#0D1B4B] to-black",
                  goldText: true,
                  features: [
                    "Everything in Professional",
                    "Unlimited students and staff",
                    "Multi-branch management",
                    "Custom branding / white-label",
                    "API access for third-party integrations",
                    "Dedicated account manager",
                    "On-premise deployment option",
                    "SLA-backed support",
                  ],
                  notIncluded: [],
                  popular: false,
                },
              ].map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-2xl overflow-hidden ${
                    plan.glow ? "shadow-xl shadow-blue-500/20" : "shadow-lg"
                  }`}
                >
                  {/* Top Ribbon */}
                  <div className={`h-3 bg-gradient-to-r ${plan.ribbonColor}`} />

                  <div className="p-8 bg-white">
                    {plan.badge && (
                      <div className="absolute top-6 right-6">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {plan.badge}
                        </span>
                      </div>
                    )}
                    <div className="mb-6">
                      <h3 className={`text-2xl font-bold mb-2 ${plan.goldText ? "text-[#0D1B4B]" : "text-gray-900"}`}>
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                      <div className="flex items-baseline">
                        <span className="text-4xl lg:text-5xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2">{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                      {plan.notIncluded.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3 opacity-50">
                          <span className="w-5 h-5 flex items-center justify-center text-red-400 shrink-0 mt-0.5">✕</span>
                          <span className="text-gray-400 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className={`w-full rounded-full py-6 text-lg ${
                        plan.popular
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      <Link to="/contact">{plan.popular ? "Get Started Now" : "Contact Sales"}</Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <div className="inline-block px-6 py-4 rounded-xl bg-blue-50 border border-blue-200">
                <p className="text-gray-700">
                  <span className="text-2xl mr-2">💡</span>
                  <span className="font-semibold">All plans include:</span> 14-day free trial, free data migration, and free training session for your staff.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 5 - FAQ */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-[#F0F7FF] to-[#0D1B4B]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Quick Answers
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-4">
              {[
                {
                  q: "Can parents track the school bus in real time?",
                  a: "Yes. Parents get live GPS tracking of their child's school bus directly on the parent mobile app — with arrival time estimates and stop notifications."
                },
                {
                  q: "Does it support online fee payment?",
                  a: "Yes. Parents can pay fees via UPI, debit/credit cards, and net banking. Receipts are auto-generated and emailed instantly on payment."
                },
                {
                  q: "How long does setup take?",
                  a: "Basic setup is completed in 3-5 working days. Full data migration, staff training, and go-live typically takes 1-2 weeks depending on school size."
                },
                {
                  q: "Can it manage multiple school branches?",
                  a: "Yes. Our Enterprise plan supports centralized management of all branches from one admin panel with branch-wise reports and controls."
                },
                {
                  q: "Is there a mobile app for parents and teachers?",
                  a: "Yes. Parents get a dedicated mobile app for attendance, results, fees, and messaging. Teachers get a separate app for attendance marking and homework uploads."
                },
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-[#0D1B4B] to-[#1E40AF]/20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Digitize Your School?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                Join 100+ schools already running smarter with our platform.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#3B3786] text-white hover:bg-[#3B3786]/90 rounded-full px-8 py-6 text-lg">
                  <Link to="/contact">Schedule Your Free Demo</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-[#3B3786] text-[#3B3786] hover:bg-[#3B3786]/10 rounded-full px-8 py-6 text-lg">
                  <Link to="/contact">Talk to Our Team</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    )
  }

  // Special handling for Software Development page
  if (service.slug === "software-development") {
    return (
      <>
        <HeroSection 
          title={service.title} 
          subtitle={service.shortTitle} 
          compact 
          videoBackground 
          backgroundImage="/images/software.jpg" 
        />
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-16">
              <p className="text-lg leading-relaxed text-muted-foreground">{service.longDescription}</p>
            </div>
            <h3 className="mb-8 text-2xl font-bold text-foreground">Key Features</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.features.map((f, i) => (
                <GlassCard key={f.title} delay={i * 0.05}>
                  <f.icon className="h-8 w-8 text-accent" />
                  <h4 className="mt-3 font-semibold text-foreground">{f.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                </GlassCard>
              ))}
            </div>
            <h3 className="mt-16 mb-8 text-2xl font-bold text-foreground">Benefits</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.benefits.map((b, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-muted-foreground">{b}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      </>
    )
  }

  // Special handling for Law Firm Management page - uses custom redesigned layout
  if (service.slug === "law-firm") {
    return <LawFirmPage />
  }

  // Default rendering for other services
  return (
    <>
      <HeroSection title={service.title} subtitle={service.shortTitle} compact gradient="navy" />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-16">
            <p className="text-lg leading-relaxed text-muted-foreground">{service.longDescription}</p>
          </div>
          <h3 className="mb-8 text-2xl font-bold text-foreground">Key Features</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.features.map((f, i) => (
              <GlassCard key={f.title} delay={i * 0.05}>
                <f.icon className="h-8 w-8 text-accent" />
                <h4 className="mt-3 font-semibold text-foreground">{f.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
              </GlassCard>
            ))}
          </div>
          <h3 className="mt-16 mb-8 text-2xl font-bold text-foreground">Benefits</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.benefits.map((b, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-muted-foreground">{b}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}









