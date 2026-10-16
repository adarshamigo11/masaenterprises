import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  { 
    name: "Rajesh Sharma", 
    role: "CEO, TradeTech Solutions", 
    quote: "Nextway Infotech transformed our trading operations with their algo trading platform. The performance improvements exceeded all our expectations.",
    rating: 5,
  },
  { 
    name: "Priya Mehta", 
    role: "Director, EduVision Academy", 
    quote: "The school management system is incredibly comprehensive. It has streamlined our entire administration process.",
    rating: 5,
  },
  { 
    name: "Anil Verma", 
    role: "Managing Partner, Verma & Associates", 
    quote: "Their law firm management software has digitized our entire case workflow. Remarkable efficiency!",
    rating: 5,
  },
  { 
    name: "Sunita Patel", 
    role: "HR Head, GlobalCorp India", 
    quote: "The HRM and payroll system saved us countless hours every month. The automation is seamless and the support team is always responsive.",
    rating: 5,
  },
  { 
    name: "Vikram Singh", 
    role: "Founder, WanderLust Travels", 
    quote: "Nextway built a tour and travel management platform that perfectly fits our business model.",
    rating: 5,
  },
  { 
    name: "Dr. Amit Khanna", 
    role: "Principal, Delhi Public School", 
    quote: "The digital transformation of our school operations has been phenomenal. Parents are happier than ever.",
    rating: 5,
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    zIndex: 0,
  }),
}

export default function TestimonialCarousel() {
  const [[current, direction], setCurrent] = useState([0, 0])

  const paginate = useCallback((newDirection: number) => {
    setCurrent(([prev]) => {
      const newIndex = (prev + newDirection + testimonials.length) % testimonials.length
      return [newIndex, newDirection]
    })
  }, [])

  const goTo = useCallback((index: number) => {
    setCurrent(([prev]) => [index, index > prev ? 1 : -1])
  }, [])

  // Auto-change every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000)
    return () => clearInterval(timer)
  }, [paginate])

  const prevIndex = (current - 1 + testimonials.length) % testimonials.length
  const nextIndex = (current + 1) % testimonials.length

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Previous Testimonial (Blurred) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-64 opacity-40 blur-sm scale-90 hidden lg:block">
        <TestimonialCard testimonial={testimonials[prevIndex]} />
      </div>

      {/* Next Testimonial (Blurred) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-64 opacity-40 blur-sm scale-90 hidden lg:block">
        <TestimonialCard testimonial={testimonials[nextIndex]} />
      </div>

      {/* Main Testimonial with Animation */}
      <div className="relative z-10 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
          >
            <TestimonialCard testimonial={testimonials[current]} isMain />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button 
          onClick={() => paginate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-emerald-500" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={() => paginate(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial, isMain = false }: { testimonial: typeof testimonials[0]; isMain?: boolean }) {
  return (
    <div className={`rounded-2xl bg-white shadow-lg border border-gray-100 text-center ${isMain ? "p-8" : "p-6"}`}>
      {/* Quote icon */}
      <Quote className={`text-emerald-300 mx-auto mb-4 ${isMain ? "h-10 w-10" : "h-8 w-8"}`} />
      
      {/* Rating stars */}
      <div className="flex gap-1 justify-center mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className={`fill-amber-400 text-amber-400 ${isMain ? "h-5 w-5" : "h-4 w-4"}`} />
        ))}
      </div>
      
      {/* Quote text */}
      <blockquote className={`text-gray-700 leading-relaxed mb-6 ${isMain ? "text-lg" : "text-sm"}`}>
        &quot;{testimonial.quote}&quot;
      </blockquote>
      
      {/* User info */}
      <div className="flex flex-col items-center gap-2">
        {/* Avatar */}
        <div className={`rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold ${isMain ? "h-14 w-14 text-xl" : "h-10 w-10 text-lg"}`}>
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className={`font-semibold text-gray-900 ${isMain ? "" : "text-sm"}`}>
            {testimonial.name}
          </p>
          <p className={`text-gray-500 ${isMain ? "text-sm" : "text-xs"}`}>{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}
