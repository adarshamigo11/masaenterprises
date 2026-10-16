import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import HeroSection from "../components/HeroSection"
import SectionHeading from "../components/SectionHeading"
import ServicesGrid from "../components/ServicesGrid"
import TestimonialCarousel from "../components/TestimonialCarousel"
import GlassCard from "../components/GlassCard"
import { Shield, Zap, HeartHandshake, TrendingUp, Globe } from "lucide-react"

// Counter animation hook
function useCountUp(end: number, duration: number = 2) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!isInView) return
    
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isInView, end, duration])
  
  return { count, ref }
}

// Counter component
function CounterNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { count, ref } = useCountUp(value, 2)
  return <span ref={ref}>{count}{suffix}</span>
}

const features = [
  { icon: Shield, title: "Trusted Expertise", description: "Years of experience delivering secure and reliable fintech solutions to businesses of all sizes." },
  { icon: Zap, title: "Cutting-Edge Technology", description: "We leverage the latest frameworks and tools to build high-performance, scalable applications." },
  { icon: HeartHandshake, title: "Client-First Approach", description: "Every solution is tailored to your unique business needs with dedicated support at every step." },
  { icon: TrendingUp, title: "Proven Results", description: "Our solutions have helped businesses achieve measurable growth and operational efficiency." },
]

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Trusted Financial Technology Solutions"
        subtitle="MASA Enterprises delivers innovative software solutions for trading, HR management, education, travel, and legal operations. Empowering businesses with technology that works."
        ctaText="Explore Services"
        ctaHref="/services"
        secondaryCta="Contact Us"
        secondaryHref="/contact"
        videoBackground
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Large rounded container with soft padding and subtle shadow */}
          <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-white p-8 lg:p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
            <SectionHeading title="Why Choose MASA Enterprises Private Limited" subtitle="We combine deep domain expertise with modern technology to deliver solutions that drive real business outcomes." titleColor="text-emerald-600" />
            
            {/* Two-column responsive layout */}
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center mt-12">
              {/* Left column - Feature cards */}
              <div className="flex flex-col gap-4 order-1">
                {features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                    whileHover={{ scale: 1.03, x: 8 }}
                    className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:border-emerald-200 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-emerald-100">
                      <f.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Right column - Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-2 lg:order-2"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/50 border border-gray-200">
                  <img
                    src="/images/whychooseus.jpg"
                    alt="Why Choose MASA Enterprises"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Vision & Mission Infographic Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/visionmission.jpg"
            alt="Vision and Mission Background"
            className="w-full h-full object-cover"
          />
          {/* Frosted Glass Overlay */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          {/* Main infographic layout */}
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
            
            {/* Left Side - Central Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-white/50 backdrop-blur-xl border-2 border-white/30 flex flex-col items-center justify-center shadow-2xl shadow-black/10">
                <div className="flex flex-col items-center px-6">
                  <img
                    src="/images/logo.png"
                    alt="MASA Enterprises"
                    className="h-16 w-40 lg:h-20 lg:w-48 object-contain"
                  />
                  
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-3xl -z-10" />
            </motion.div>

            {/* Connection Lines - Desktop only */}
            <div className="hidden lg:block absolute left-[320px] top-1/2 -translate-y-1/2 w-32">
              {/* Main horizontal line */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-emerald-400/50 to-white/30" />
              
              {/* Connection nodes */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 rounded-full bg-white/50 shadow-lg" />
              
              {/* Branch lines to cards */}
              <div className="absolute top-1/2 right-0 w-px h-24 bg-gradient-to-b from-white/30 to-transparent origin-top" style={{ transform: 'rotate(25deg)' }} />
              <div className="absolute top-1/2 right-0 w-px h-24 bg-gradient-to-t from-white/30 to-transparent origin-bottom" style={{ transform: 'rotate(-25deg)' }} />
            </div>

            {/* Right Side - Content Blocks */}
            <div className="flex flex-col gap-5 lg:ml-24 lg:pl-8">
              
              {/* Mission Block */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 shadow-xl hover:shadow-2xl hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 group"
              >
                {/* Connection dot */}
                <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-400/50 shadow-lg shadow-emerald-400/30 group-hover:bg-emerald-400 group-hover:shadow-emerald-400/50 transition-all" />
                
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                    <Zap className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Our Mission</span>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      Empowering Businesses Through Innovation
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Our mission is to democratize access to powerful financial and business technology. We believe every organization, regardless of size, deserves world-class software solutions that are reliable, scalable, and affordable.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Vision Block */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 shadow-xl hover:shadow-2xl hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 group"
              >
                {/* Connection dot */}
                <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-400/50 shadow-lg shadow-blue-400/30 group-hover:bg-blue-400 group-hover:shadow-blue-400/50 transition-all" />
                
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                    <TrendingUp className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Our Vision</span>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      Leading the Future of FinTech
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      We envision a future where technology seamlessly integrates into every business operation, enabling smarter decisions, faster growth, and unprecedented efficiency.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Core Values Block */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 shadow-xl hover:shadow-2xl hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 group"
              >
                {/* Connection dot */}
                <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-400/50 shadow-lg shadow-purple-400/30 group-hover:bg-purple-400 group-hover:shadow-purple-400/50 transition-all" />
                
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                    <Shield className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Core Values</span>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      Integrity, Innovation, and Excellence
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      At MASA Enterprises, we are driven by strong values that guide every solution we build. We prioritize transparency, technological innovation, customer success, and continuous improvement to deliver reliable digital solutions that businesses can trust.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Innovation Block */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 shadow-xl hover:shadow-2xl hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 group"
              >
                {/* Connection dot */}
                <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-400/50 shadow-lg shadow-amber-400/30 group-hover:bg-amber-400 group-hover:shadow-amber-400/50 transition-all" />
                
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 group-hover:bg-amber-500/30 transition-colors">
                    <HeartHandshake className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Innovation</span>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      Building Intelligent Technology
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Innovation is at the heart of everything we create. By combining artificial intelligence, advanced analytics, and modern software architecture, we continuously develop smarter platforms that simplify complex business and trading operations.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Growth Strategy Block */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 shadow-xl hover:shadow-2xl hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300 group"
              >
                {/* Connection dot */}
                <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400/50 shadow-lg shadow-cyan-400/30 group-hover:bg-cyan-400 group-hover:shadow-cyan-400/50 transition-all" />
                
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                    <Globe className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Growth Strategy</span>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      Driving Sustainable Digital Expansion
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Our growth strategy focuses on building scalable technologies, expanding AI-powered solutions, and supporting businesses across multiple industries. By continuously improving our platforms, we aim to help organizations achieve long-term digital success.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="Our Services" subtitle="Comprehensive technology solutions designed to meet the evolving needs of modern businesses." titleColor="text-emerald-600" />
          <ServicesGrid />
        </div>
      </section>

      {/* Milestones / Achievements Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              <span className="text-emerald-600">Highlights</span> from Our Journey
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              A collection of insights, achievements, and stories designed to inspire smarter thinking and better decision-making in the world of technology.
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-stretch">
            {/* Left Column - Image Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-300/50 group h-full min-h-[400px] lg:min-h-[500px]"
            >
              <img
                src="/images/download.jpg"
                alt="Milestones"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                  From Concept to Reality:<br />
                  Crafting Products that Redefine Excellence.
                </h3>
                <div className="mt-6">
                  <Link
                    to="/about"
                    className="inline-flex items-center px-6 py-3 rounded-full border-2 border-emerald-400 text-emerald-400 font-medium hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300"
                  >
                    Discover Our Story
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Achievement Cards */}
            <div className="flex flex-col gap-4">
              {[
                { value: 40, suffix: "+", label: "Flawless Project Delivery Rate", delay: 0.1 },
                { value: 99, suffix: "%", label: "Flawless Project Delivery Rate", delay: 0.2 },
                { value: 10, suffix: "+", label: "High-Impact Projects Completed", delay: 0.3 },
                { value: 5, suffix: "+", label: "Global Markets Serving", delay: 0.4 },
                { value: 30, suffix: "+", label: "Years of Combined Founder Experience", delay: 0.5 },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -8,
                    rotateX: 5,
                    rotateY: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  className="flex items-center gap-6 rounded-2xl bg-white p-6 shadow-xl shadow-gray-300/60 border border-gray-100 hover:shadow-2xl hover:border-emerald-300 hover:bg-gradient-to-br hover:from-white hover:to-emerald-50/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 shadow-inner">
                    <span className="text-2xl font-bold text-emerald-600">
                      <CounterNumber value={stat.value} suffix={stat.suffix} />
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {stat.label}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title={<>What Our <span className="text-emerald-600">Clients</span> Say</>} subtitle="Hear from the businesses that have transformed their operations with our solutions." />
          <TestimonialCarousel />
        </div>
      </section>
    </>
  )
}
