import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"

const services = [
  { title: "Software Development", href: "/services/software-development" },
  { title: "HRM & Payroll", href: "/services/hrm-payroll" },
  { title: "School Management", href: "/services/school-management" },
  { title: "Law Firm Management", href: "/services/law-firm" },
]

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services", hasDropdown: true },
  { title: "Blogs", href: "/blogs" },
  { title: "Careers", href: "/careers" },
  { title: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsCollapsed(true)
      } else {
        setIsCollapsed(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setIsServicesOpen(true)
  }

  const handleMouseLeave = () => {
    // 300ms delay — enough time for mouse to travel into the dropdown
    hoverTimeout.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 300)
  }

  return (
    <>
      {/* ─── Desktop ─────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 hidden lg:block">

        {/* Floating logo — slides in from left when collapsed */}
        <motion.div
          initial={{ x: "-120%", opacity: 0 }}
          animate={{
            x: isCollapsed ? 0 : "-120%",
            opacity: isCollapsed ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="absolute top-5 left-6 z-50"
        >
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="MASA Enterprises"
              className="h-14 w-36 object-contain"
            />
          </Link>
        </motion.div>

        {/* Nav capsule */}
        <motion.div
          initial={false}
          animate={{
            y: isCollapsed ? -90 : 0,
            opacity: isCollapsed ? 0 : 1,
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className={`absolute top-5 left-1/2 -translate-x-1/2 ${
            isCollapsed ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <nav
            className="flex items-center gap-0 rounded-full bg-white/75 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/50 w-[90vw] max-w-5xl"
            style={{ overflow: "visible" }}
          >
            {/* Logo inside capsule */}
            <Link
              to="/"
              className="flex items-center pl-6 pr-5 py-2.5 border-r border-gray-200/60 shrink-0"
            >
              <img
                src="/images/logo.png"
                alt="MASA Enterprises"
                className="h-9 w-24 object-contain"
              />
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-1 px-5 py-2 min-w-0 flex-1 justify-center">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  // ✅ Dropdown is INSIDE this div — shares the same onMouseLeave zone
                  <div
                    key={link.title}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ zIndex: 10000 }}
                  >
                    <Link
                      to={link.href}
                      className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:text-gray-900 hover:bg-gray-100/80 whitespace-nowrap"
                    >
                      {link.title}
                      <motion.span
                        animate={{ rotate: isServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-3 w-3" />
                      </motion.span>
                    </Link>

                    {/* Dropdown — inside the trigger div, absolutely positioned below it */}
                    <motion.div
                      initial={false}
                      animate={
                        isServicesOpen
                          ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" }
                          : { opacity: 0, y: -6, scale: 0.97, pointerEvents: "none" }
                      }
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 6px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "220px",
                        zIndex: 10000,
                      }}
                    >
                      <div className="rounded-2xl border border-white/20 bg-gray-900/95 backdrop-blur-xl p-2 shadow-2xl">
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            to={service.href}
                            onClick={() => setIsServicesOpen(false)}
                            className="block rounded-xl px-4 py-2.5 text-sm text-gray-300 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <Link
                    key={link.title}
                    to={link.href}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      location.pathname === link.href
                        ? "text-gray-900 bg-gray-100"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                    }`}
                  >
                    {link.title}
                  </Link>
                )
              )}
            </div>

            {/* CTA */}
            <div className="flex items-center px-3 py-2 pl-2 border-l border-gray-200/60 shrink-0">
              <Button
                asChild
                className="rounded-full bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 px-5 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 shadow-none"
              >
                <Link to="https://web.nextwayinfo.tech/">Get Started</Link>
              </Button>
            </div>
          </nav>
        </motion.div>
      </header>

      {/* ─── Mobile sticky navbar ─────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="MASA Enterprises"
              className="h-9 w-24 object-contain"
            />
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="h-10 w-10"
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 bg-white"
          >
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <div key={link.title}>
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      location.pathname === link.href
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {link.title}
                  </Link>
                  {link.hasDropdown && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          to={service.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="pt-2">
                <Button
                  asChild
                  className="w-full rounded-full bg-emerald-500 text-white hover:bg-emerald-600 px-5 py-2 text-sm font-medium"
                >
                  <Link to="https://web.nextwayinfo.tech/" onClick={() => setIsMobileOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>
    </>
  )
}