import React, { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"

const accordionItems = [
  {
    title: "Who We Are",
    content: `MASA Enterprises is a technology company specializing in custom software development, web applications, and enterprise solutions. This Privacy Policy explains how we collect, use, and protect information from clients, visitors, and users who interact with us. By using our services you agree to the practices described here.`
  },
  {
    title: "Information We Collect",
    content: `We collect only what is necessary to deliver our services effectively.

Personal Information: Your name, email, phone number, company name, and billing details when you contact us or engage our services.

Project Data: Business requirements, technical documents, credentials, and assets you share with us for software development purposes.

Technical Data: Basic information like IP address and browser type collected automatically when you visit our website for security and performance purposes only.`
  },
  {
    title: "How We Use Your Information",
    content: `All data collected is used strictly for:
→ Analyzing and executing your project
→ Communicating progress and updates
→ Providing support and maintenance
→ Processing payments and invoices
→ Meeting legal and contractual obligations

We do not use your data for advertising or any third-party marketing purposes.`
  },
  {
    title: "Confidentiality",
    content: `All project information including source code, credentials, and business data is strictly confidential. Only team members directly working on your project have access, and all are bound by confidentiality agreements.

We do not sell, rent, or share your data with anyone outside of what is strictly necessary to deliver your project.`
  },
  {
    title: "Intellectual Property",
    content: `During Development: All code, designs, and deliverables remain the property of MASA Enterprises until full payment is received.

After Full Payment: Complete ownership and usage rights are transferred to the client as per the agreed project terms.

We retain rights to reuse our own pre-built tools, frameworks, and libraries that are not client-specific.`
  },
  {
    title: "Data Security",
    content: `We implement industry-standard measures to protect your data including access controls, secure environments, credential management, and internal data policies.

While we take every precaution, no digital system can guarantee absolute security. We encourage clients to also follow secure practices on their end.`
  },
  {
    title: "Your Rights & Contact",
    content: `You have the right to access, correct, or request deletion of your data at any time after project completion.

To exercise these rights or for any privacy-related questions contact us at:

📧 info@masaenterprises.com
🌐 www.masaenterprises.com

We will respond to all requests within a reasonable timeframe.`
  },
  {
    title: "Policy Updates",
    content: `MASA Enterprises may update this Privacy Policy from time to time. Changes will be published on this page with a revised date. Continued use of our services after any update means you accept the revised policy.`
  }
]

function AccordionItem({ item, index, isOpen, onToggle }) {
  return (
    <div 
      className={`bg-[#0f0f0f] border-b border-emerald-900/30 transition-all duration-300 ${
        isOpen ? 'border-l-[3px] border-l-emerald-500 bg-gradient-to-r from-emerald-950/30 to-transparent' : ''
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-[18px] hover:bg-emerald-950/20 transition-colors text-left"
      >
        <span className="text-[15px] font-medium text-emerald-50">
          {item.title}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-emerald-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-5 pb-5 pt-0"
        >
          <p className="text-[14px] text-gray-300 leading-relaxed whitespace-pre-line">
            {item.content}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default function PrivacyPolicyPage() {
  const [openItem, setOpenItem] = useState(null)

  const toggle = (index) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <>
      <Navbar />
      
      {/* SECTION 1 — HERO */}
      <section className="relative w-full bg-gradient-to-r from-[#1a1545] to-[#3B3786] py-20 lg:py-28 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold tracking-wide uppercase">
                Legal Document
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6"
            >
              Privacy Policy
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/90 max-w-[500px] mx-auto mb-8 leading-relaxed"
            >
              At MASA Enterprises we are committed to protecting your privacy and handling all information with transparency.
            </motion.p>

            {/* Last Updated */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm text-white/70"
            >
              Last Updated: June 2025
            </motion.p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — POLICY CONTENT */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <div className="max-w-[900px] mx-auto">
            <div className="space-y-0">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  item={item}
                  index={index}
                  isOpen={openItem === index}
                  onToggle={() => toggle(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — BOTTOM CTA */}
      <section className="relative w-full bg-gradient-to-r from-[#1a1545] via-[#3B3786] to-[#2a2470] py-16 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
            >
              Have Questions About Your Privacy?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-emerald-200 mb-8"
            >
              We are happy to clarify anything.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/contact">
                <button className="px-8 py-4 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">
                  Contact Us
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
