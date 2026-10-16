import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Carousel slides data
const heroSlides = [
  { 
    image: "/images/HERO1.jpg", 
    title: "Smarter Trading with Artificial Intelligence",
    subtitle: "Nextway Infotech's AI trading systems use real-time data analysis, automated strategies, and predictive insights to help traders maximize opportunities in the stock market.",
    align: "right" as const
  },
  { 
    image: "/images/finance-careers.jpg", 
    title: "Trusted Financial Technology Solutions",
    subtitle: "Nextway Infotech delivers innovative software solutions for trading, HR management, education, travel, and legal operations. Empowering businesses with technology that works.",
    align: "center" as const
  },
]

// Typewriter effect hook
function useTypewriter(text: string, speed: number = 100, delay: number = 500) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let currentIndex = 0
    let timeout: ReturnType<typeof setTimeout>

    const startTyping = () => {
      const typeNextChar = () => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++
          timeout = setTimeout(typeNextChar, speed)
        } else {
          setIsTyping(false)
          // Restart after a delay
          timeout = setTimeout(() => {
            currentIndex = 0
            setIsTyping(true)
            typeNextChar()
          }, 2000)
        }
      }
      typeNextChar()
    }

    const initialDelay = setTimeout(startTyping, delay)

    return () => {
      clearTimeout(timeout)
      clearTimeout(initialDelay)
    }
  }, [text, speed, delay])

  return { displayText, isTyping }
}

// Typewriter title component
interface TypewriterTitleProps {
  title: string
  compact?: boolean
}

function TypewriterTitle({ title, compact }: TypewriterTitleProps) {
  const { displayText, isTyping } = useTypewriter(title, 80, 500)

  return (
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`font-bold text-white  ${compact ? "text-3xl lg:text-4xl" : "text-4xl lg:text-6xl"}`}
    >
      {displayText}
      <span className={`inline-block w-1 h-[1em] bg-white ml-1 ${isTyping ? "animate-pulse" : ""}`} />
    </motion.h1>
  )
}

interface HeroSectionProps {
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  secondaryCta?: string
  secondaryHref?: string
  gradient?: "navy" | "emerald" | "mixed"
  compact?: boolean
  videoBackground?: boolean
  backgroundImage?: string
  videoFile?: string
}

export default function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCta,
  secondaryHref,
  gradient = "mixed",
  compact = false,
  videoBackground = false,
  backgroundImage,
  videoFile,
}: HeroSectionProps) {
  const location = useLocation()
  const isHomepage = location.pathname === "/"
  const [currentSlide, setCurrentSlide] = useState(0)
  const [zoomDirection, setZoomDirection] = useState<"in" | "out">("in")

  // Zoom animation effect - smooth 8 second cycle (4s zoom in, 4s zoom out)
  useEffect(() => {
    if (!videoBackground) return

    const zoomInterval = setInterval(() => {
      setZoomDirection((prev) => (prev === "in" ? "out" : "in"))
    }, 8000)

    return () => clearInterval(zoomInterval)
  }, [videoBackground])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setZoomDirection("in")
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setZoomDirection("in")
  }

  const gradientMap = {
    navy: "from-primary via-navy-light to-primary",
    emerald: "from-emerald-dark via-accent to-emerald-dark",
    mixed: "from-primary via-navy-light to-emerald-dark",
  }

  return (
    <section className={`relative flex items-center justify-center overflow-hidden pt-20 ${videoBackground ? "" : `bg-gradient-to-br ${gradientMap[gradient]}`} ${compact ? "py-20" : "py-44 lg:py-56"}`} style={{ zIndex: 'auto' }}>
      {videoBackground && isHomepage && (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${heroSlides[currentSlide].image}')` }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: zoomDirection === "in" ? 1.1 : 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                scale: { duration: 8, ease: "easeInOut" },
                opacity: { duration: 0.8 }
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Carousel Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-white w-6" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
      {videoBackground && !isHomepage && videoFile && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0, filter: 'blur(8px)' }}
          >
            <source src={videoFile} type="video/mp4" />
          </video>
          {/* Overlay to improve text readability over blurred video */}
          <div 
            className="absolute inset-0 bg-black/30"
            style={{ zIndex: 1 }}
          />
        </>
      )}
      {videoBackground && !isHomepage && backgroundImage && !videoFile && (
        <div
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url("${backgroundImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0
          }}
        />
      )}
      {!videoBackground && (
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        </div>
      )}
      <div className={`relative z-10 flex w-full ${videoBackground && isHomepage ? (heroSlides[currentSlide].align === "center" ? "justify-center" : "justify-end") : "justify-center"}`}>
        <div className={`mx-auto max-w-4xl px-4 ${videoBackground && isHomepage ? (heroSlides[currentSlide].align === "center" ? "text-center" : "ml-0 mr-8 lg:mr-16 xl:mr-24 text-right max-w-2xl") : "text-center"}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={videoBackground && isHomepage ? currentSlide : "static"}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <h1 className={`font-bold text-white  ${compact ? "text-3xl lg:text-4xl" : "text-4xl lg:text-6xl"}`}>
                {videoBackground && isHomepage ? heroSlides[currentSlide].title : title}
              </h1>
              <motion.p 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
                className={`mt-5 max-w-2xl text-lg leading-relaxed text-white/80 ${isHomepage ? "ml-auto" : "mx-auto"}`}
              >
                {videoBackground && isHomepage ? heroSlides[currentSlide].subtitle : subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          {(ctaText || secondaryCta) && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className={`mt-8 flex flex-wrap gap-4 ${videoBackground && isHomepage ? (heroSlides[currentSlide].align === "center" ? "justify-center" : "justify-end") : "justify-center"}`}>
            {ctaText && ctaHref && (
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-emerald-dark">
                <Link to={ctaHref}>{ctaText}</Link>
              </Button>
            )}
            {secondaryCta && secondaryHref && (
              <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link to={secondaryHref}>{secondaryCta}</Link>
              </Button>
            )}
          </motion.div>
        )}
        </div>
      </div>
    </section>
  )
}
