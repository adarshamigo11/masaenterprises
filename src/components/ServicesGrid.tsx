import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useState } from "react"

const services = [
  { 
    title: "AI Trading", 
    description: "Next-Gen Trading Powered by Artificial Intelligence. Our self-learning AI models analyze millions of market signals in real-time to execute smarter, faster, and more profitable trades.", 
    image: "/images/services/AIT.jpg",
    href: "/services/ai-trading" 
  },
  { 
    title: "Software Development", 
    description: "We Don't Just Write Code. We Engineer Solutions. From idea to deployment, we build powerful, scalable, and secure software tailored to your exact business needs.", 
    image: "/images/services/SD.jpg",
    href: "/services/software-development" 
  },
  { 
    title: "HRM & Payroll", 
    description: "Your Entire HR Department. One Smart Platform. From hiring to retiring — automate every aspect of human resource operations and payroll with zero errors and full statutory compliance.", 
    image: "/images/services/payroll.webp",
    href: "/services/hrm-payroll" 
  },
  { 
    title: "School Management", 
    description: "Run Your Entire School From One Dashboard. A complete ERP solution that digitizes academics, administration, and parent communication for modern educational institutions.", 
    image: "/images/services/school.webp",
    href: "/services/school-management" 
  },
  { 
    title: "Tour & Travel", 
    description: "End-to-end travel management software for agencies and tour operators.", 
    image: "/images/hero2.png",
    href: "/services/tour-travel" 
  },
  { 
    title: "Law Firm Management", 
    description: "Digital case management and workflow solutions tailored for legal professionals.", 
    image: "/images/finance-careers.jpg",
    href: "/services/law-firm" 
  },
]

function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    setRotateX((y - centerY) / 10)
    setRotateY((centerX - x) / 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      key={s.href}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-80 lg:h-96 cursor-pointer"
    >
          {/* Full background image */}
          <img
            src={s.image}
            alt={s.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Content overlay with frosty glass background */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="bg-white/10 backdrop-blur-[2px] p-6 border-t border-white/20">
              <h3 className="text-xl font-bold text-white  drop-shadow-lg">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white drop-shadow-md">
                {s.description}
              </p>
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full rounded-full border-white text-white hover:bg-white hover:text-gray-900 transition-all bg-white/20 backdrop-blur-sm">
                  <Link to={s.href}>Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
  )
}

export default function ServicesGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1000px" }}>
      {services.map((s, i) => (
        <ServiceCard key={s.href} s={s} i={i} />
      ))}
    </div>
  )
}
