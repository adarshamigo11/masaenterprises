import HeroSection from "../components/HeroSection"
import SectionHeading from "../components/SectionHeading"
import { motion } from "framer-motion"
import { Lightbulb, Shield, Trophy, HeartHandshake, TrendingUp, Globe, Zap, Users } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
}

export default function AboutPage() {
  return (
    <>
      <HeroSection 
        title="Transforming Ideas into Intelligent Technology" 
        subtitle="We are a technology company committed to transforming businesses through innovative software solutions."
        videoBackground
        videoFile="/video.mp4"
      />
      
      {/* About Us Introduction */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* Left - Image */}
            <motion.div {...fadeInUp} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/as1.jpg" 
                  alt="About MASA Enterprises"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-100 rounded-2xl -z-10 hidden lg:block" />
            </motion.div>

            {/* Right - Text */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                <span className="text-emerald-600">About</span> Us
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                At MASA Enterprises, we believe technology should simplify complexity and empower businesses to achieve more. As a forward-thinking technology company, we specialize in building intelligent digital solutions that help organizations grow, innovate, and succeed in an increasingly connected world.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Our expertise spans across financial technology, AI-powered trading systems, business automation tools, and scalable software platforms, designed to meet the evolving needs of modern enterprises.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                By combining innovation, data-driven insights, and modern engineering, we create solutions that help businesses operate smarter and move faster in competitive markets.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/ourstory.jpg')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title={<>Our <span className="text-emerald-400">Story</span></>} subtitle="Building the future of technology" light />
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed text-white/90 mb-6">
              MASA Enterprises was founded with a simple vision: to make advanced technology accessible to businesses of all sizes.
            </p>
            <p className="text-lg leading-relaxed text-white/90 mb-6">
              From developing intelligent trading platforms to creating scalable digital systems for organizations, our journey has always been driven by one goal — delivering reliable technology that creates real impact.
            </p>
            <p className="text-lg leading-relaxed text-white/90">
              Over the years, we have worked with businesses across multiple industries, helping them adopt smarter systems, streamline operations, and unlock new growth opportunities through technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Timeline */}
      <section className="py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <SectionHeading title={<>Mission & <span className="text-emerald-600">Vision</span></>} subtitle="Our purpose and future direction" />
          
          {/* Timeline Container */}
          <div className="relative mt-16">
            {/* Vertical Line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-8 lg:left-1/2 top-0 w-1 bg-gradient-to-b from-emerald-500 to-blue-500 -translate-x-1/2"
            />
            
            {/* Mission Item */}
            <div className="relative flex items-start gap-6 lg:gap-0 mb-16">
              {/* Timeline Node */}
              <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="h-16 w-16 rounded-full bg-emerald-100 border-4 border-white shadow-lg flex items-center justify-center"
                >
                  <Zap className="h-8 w-8 text-emerald-600" />
                </motion.div>
              </div>
              
              {/* Content - Left on desktop */}
              <div className="ml-20 lg:ml-0 lg:w-1/2 lg:pr-16 lg:text-right">
                <h3 className="text-2xl font-bold text-foreground mb-2">Our Mission</h3>
                {/* Content drops down on scroll */}
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  whileInView={{ opacity: 1, y: 0, height: "auto" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <h4 className="text-lg font-semibold text-emerald-600 mb-3">Empowering Businesses Through Innovation</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Our mission is to democratize access to powerful financial and business technology. We believe every organization, regardless of size, deserves world-class software solutions that are reliable, scalable, and affordable.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    By building intelligent systems and advanced platforms, we help businesses automate processes, analyze data efficiently, and make better strategic decisions.
                  </p>
                </motion.div>
              </div>
              
              {/* Empty space for right side on desktop */}
              <div className="hidden lg:block lg:w-1/2" />
            </div>
            
            {/* Vision Item */}
            <div className="relative flex items-start gap-6 lg:gap-0">
              {/* Timeline Node */}
              <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                  className="h-16 w-16 rounded-full bg-blue-100 border-4 border-white shadow-lg flex items-center justify-center"
                >
                  <Globe className="h-8 w-8 text-blue-600" />
                </motion.div>
              </div>
              
              {/* Empty space for left side on desktop */}
              <div className="hidden lg:block lg:w-1/2" />
              
              {/* Content - Right on desktop */}
              <div className="ml-20 lg:ml-0 lg:w-1/2 lg:pl-16">
                <h3 className="text-2xl font-bold text-foreground mb-2">Our Vision</h3>
                {/* Content drops down on scroll */}
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  whileInView={{ opacity: 1, y: 0, height: "auto" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <h4 className="text-lg font-semibold text-blue-600 mb-3">Leading the Future of FinTech</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    We envision a future where technology seamlessly integrates into every business operation.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Through intelligent financial systems, AI-driven platforms, and modern software solutions, we aim to enable smarter decisions, faster growth, and unprecedented operational efficiency. Our goal is to become a trusted technology partner for organizations seeking to innovate and grow in the digital era.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Services Showcase */}
      <section className="relative py-20 lg:py-28 bg-[#0a0a0f] overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0">
          {/* Emerald/Green smoke effect */}
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-emerald-900/40 via-emerald-800/20 to-transparent blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-emerald-900/30 via-emerald-700/15 to-transparent blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          {/* Light rays */}
          <div className="absolute bottom-0 right-0 w-full h-full overflow-hidden">
            <div className="absolute bottom-[-50%] right-[-20%] w-[1000px] h-[1000px] bg-gradient-to-tl from-emerald-500/10 via-transparent to-transparent rotate-45 transform origin-bottom-right" />
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
          {/* Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-light text-white/90 leading-tight">
              What We Do
            </h2>
            <h3 className="text-3xl lg:text-5xl font-bold text-white mt-2">
              Our Services
            </h3>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Advanced software solutions for real business challenges
            </p>
          </motion.div>

          {/* 2x2 Grid of Services - Ordered: 01→02→04→03 (Z-pattern) */}
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {[
              { num: "01", title: "Financial Technology", desc: "Secure and scalable fintech platforms for modern finance", arrow: "right" },
              { num: "02", title: "Custom Development", desc: "Tailored software solutions built to meet unique business needs", arrow: "down" },
              { num: "03", title: "Business Automation", desc: "Tools that streamline operations and improve efficiency", arrow: "none" },
            ].map((service, i) => (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300"
              >
                {/* Number */}
                <span className="text-4xl font-bold text-white/20">
                  {service.num}
                </span>
                
                {/* Title */}
                <h4 className="text-xl font-bold text-white mt-3 mb-2">
                  {service.title}
                </h4>
                
                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed">
                  {service.desc}
                </p>
                
                {/* Dotted separator */}
                <div className="mt-4 border-b border-dotted border-white/20" />
                
                {/* Arrow connector - position based on direction */}
                {service.arrow === "right" && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 bg-[#0a0a0f] border border-white/20 rounded-full flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <svg className="w-4 h-4 text-white/40 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
                {service.arrow === "down" && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-[#0a0a0f] border border-white/20 rounded-full flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <svg className="w-4 h-4 text-white/40 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
                {service.arrow === "left" && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-[#0a0a0f] border border-white/20 rounded-full flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <svg className="w-4 h-4 text-white/40 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - 3D Parallax Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ perspective: "1000px" }}>
        {/* 3D Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-[-50px] bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('/images/whyus11.jpg')",
              transformStyle: "preserve-3d"
            }}
            initial={{ rotateY: -5, rotateX: 3 }}
            whileInView={{ rotateY: 0, rotateX: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </motion.div>
        
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-[1]" />
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <SectionHeading 
              title={<>Why Choose <span className="text-emerald-400">MASA Enterprises</span></>}
              subtitle="Your partner in digital growth" 
              light
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="max-w-4xl mx-auto mt-12"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div 
              className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
              whileHover={{ 
                rotateY: 2, 
                rotateX: -2,
                scale: 1.02,
                transition: { duration: 0.3 } 
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <p className="text-lg leading-relaxed text-white/90 mb-6">
                Businesses choose MASA Enterprises because we combine technical expertise with a deep understanding of business challenges.
              </p>
              <p className="text-lg leading-relaxed text-white/90 mb-6">Our approach focuses on:</p>
              <ul className="space-y-3 mb-6">
                {[
                  "building scalable and future-ready technology",
                  "delivering intelligent automation solutions",
                  "ensuring reliability, performance, and security",
                  "supporting businesses through continuous innovation",
                ].map((item, i) => (
                  <motion.li 
                    key={item} 
                    className="flex items-center gap-3 text-white/80"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <motion.div 
                      className="h-2 w-2 rounded-full bg-emerald-400"
                      whileHover={{ scale: 1.5 }}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <p className="text-lg leading-relaxed text-white font-semibold">
                We are not just technology providers — we are long-term partners in digital growth.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Looking Ahead */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Looking Ahead
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              As technology continues to evolve, MASA Enterprises remains committed to pushing boundaries and exploring new possibilities. Our future focus includes expanding our AI-driven trading platforms, fintech innovations, and intelligent automation systems to help businesses navigate the next generation of digital transformation.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
