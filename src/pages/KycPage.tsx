import HeroSection from "../components/HeroSection"
import KycForm from "../components/KycForm"
import { motion } from "framer-motion"
import { Shield, FileCheck, Lock, Eye, Server, Activity } from "lucide-react"

export default function KycPage() {
  return (
    <>
      <HeroSection title="KYC Documents" subtitle="Submit your KYC documents securely." videoBackground backgroundImage="/images/download.jpg" />
      
      {/* Form Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          {/* Two Partition Layout - Locked Together */}
          <div className="flex flex-col lg:flex-row items-stretch rounded-3xl overflow-hidden shadow-2xl">
            {/* Left - Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative lg:w-1/2 min-h-[400px] lg:min-h-[600px]"
            >
              <img 
                src="/images/kyc.jpg" 
                alt="KYC Verification" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Content on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  Secure KYC Verification
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-white/80"
                >
                  Your documents are encrypted and stored securely
                </motion.p>
              </div>
              
              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-20 h-20 border-t-4 border-r-4 border-emerald-400/50 rounded-tr-2xl" />
              <div className="absolute bottom-4 left-4 w-20 h-20 border-b-4 border-l-4 border-emerald-400/50 rounded-bl-2xl" />
            </motion.div>

            {/* Right - Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 flex flex-col justify-center bg-white"
            >
              <div className="p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Submit <span className="text-emerald-600">KYC Documents</span>
                  </h2>
                  <p className="text-slate-500">
                    Please fill in your details and upload the required documents for verification
                  </p>
                </div>
                <KycForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KYC Verification Section - Dark Background with Blue Neon */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-black">
        {/* Blue Neon Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        
        {/* Neon Border Lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-blue-500/20">
                <img 
                  src="/images/kyc3.jpg" 
                  alt="KYC Verification" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 via-transparent to-cyan-900/30" />
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-blue-400/50 rounded-tr-xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-blue-400/50 rounded-bl-xl" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                KYC <span className="text-blue-400">Verification</span>
              </h2>
              <h3 className="text-xl text-slate-300 mb-6">Secure Identity Verification for a Safe Trading Environment</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                At MASA Enterprises, we are committed to creating a secure and transparent trading ecosystem. Our Know Your Customer (KYC) verification process helps us confirm user identities, prevent fraud, and comply with financial regulations.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                By completing KYC verification, users gain access to a safer and more reliable platform while helping maintain the integrity of the financial system.
              </p>
              <p className="text-slate-400 leading-relaxed">
                KYC verification is a standard requirement for fintech platforms to ensure customer identities are verified and to prevent fraud, money laundering, and financial crimes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why KYC & Documents Section - Light Background */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">

          {/* Section 2: Why KYC is Required */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/whykyc.jpg" 
                  alt="Why KYC" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/40 to-transparent" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Why KYC is <span className="text-emerald-600">Required</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                KYC helps us maintain a secure and trustworthy environment for all users.
              </p>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Key reasons include:</h3>
              <ul className="space-y-3">
                {[
                  "Preventing fraud and identity theft",
                  "Protecting users from financial crimes",
                  "Ensuring regulatory compliance",
                  "Creating a trusted trading ecosystem",
                  "Enhancing platform security"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 text-slate-600"
                  >
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mt-6">
                Modern fintech platforms rely on KYC to verify identities and reduce fraud risks while ensuring compliance with financial regulations.
              </p>
            </motion.div>
          </div>

          {/* Section 3: Documents Required */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/kyc5.jpg" 
                  alt="Documents Required" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/40 to-transparent" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Documents <span className="text-emerald-600">Required</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                To complete verification, users may be required to submit the following:
              </p>
              <ul className="space-y-4">
                {[
                  { icon: FileCheck, text: "Government-issued identity proof (PAN Card / Aadhaar / Passport)" },
                  { icon: Shield, text: "Address proof (Utility bill, Aadhaar, etc.)" },
                  { icon: Eye, text: "Selfie or live photo verification" }
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/50 border border-slate-200"
                  >
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <span className="text-slate-700">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="text-slate-500 text-sm mt-6">
                All documents are used strictly for verification purposes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Digital Cards Section - Data Protection */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-black">
        {/* Blue Neon Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        
        {/* Neon Border Lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              How Your Data is <span className="text-blue-400">Protected</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              At MASA Enterprises, protecting your personal information is our highest priority. We use advanced security practices to ensure your KYC data remains private and secure.
            </p>
          </motion.div>

          {/* Digital Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Lock, 
                title: "End-to-End Encryption", 
                desc: "All user data is encrypted during transmission and storage, ensuring that sensitive information remains unreadable even if intercepted." 
              },
              { 
                icon: Server, 
                title: "Secure Data Storage", 
                desc: "Your documents are stored in secure, encrypted servers with strict access controls." 
              },
              { 
                icon: Shield, 
                title: "Restricted Access", 
                desc: "Only authorized verification systems and trained personnel can access KYC information through role-based access controls." 
              },
              { 
                icon: Activity, 
                title: "Multi-Layer Security Systems", 
                desc: "Our platform uses advanced security layers such as authentication systems, monitoring tools, and fraud detection technologies." 
              },
              { 
                icon: Eye, 
                title: "Continuous Security Monitoring", 
                desc: "Regular security audits and vulnerability testing help identify and prevent potential risks." 
              }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-blue-500/20 hover:bg-slate-800/50 hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <card.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
