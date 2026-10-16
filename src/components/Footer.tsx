import { Link } from "react-router-dom"
import { Mail, Phone, MapPin } from "lucide-react"

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Blogs", href: "/blogs" },
  { title: "Careers", href: "/careers" },
  { title: "Contact", href: "/contact" },
]

const serviceLinks = [
  { title: "Software Development", href: "/services/software-development" },
  { title: "HRM & Payroll", href: "/services/hrm-payroll" },
  { title: "School Management", href: "/services/school-management" },
  { title: "Tour & Travel", href: "/services/tour-travel" },
  { title: "Law Firm", href: "/services/law-firm" },
]

export default function Footer() {
  return (
    <footer className="relative text-white rounded-t-3xl overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/qqqq.jpg')" }}
      />
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <img src="/images/logo.png" alt="MASA Enterprises" className="h-14 w-auto" />
            </div>
            <p className="text-base leading-relaxed text-white/80">Trusted financial technology solutions for businesses worldwide.</p>
          </div>
          <div>
            <h3 className="mb-4 text-base font-semibold uppercase tracking-wider text-emerald-400">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-base text-white/80 transition-colors hover:text-emerald-400">{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-base font-semibold uppercase tracking-wider text-emerald-400">Services</h3>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-base text-white/80 transition-colors hover:text-emerald-400">{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-base font-semibold uppercase tracking-wider text-emerald-400">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <span className="text-base text-white/80">Indore, Madhya Pradesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-emerald-400" />
                <a href="tel:+919589730529" className="text-base text-white/80 hover:text-emerald-400">+91 95897 30529</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-emerald-400" />
                <a href="mailto:info@masaenterprises.com" className="text-base text-white/80 hover:text-emerald-400">info@masaenterprises.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/20 pt-6 text-center">
          <p className="text-base text-white/60">{new Date().getFullYear()} MASA Enterprises. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link to="/privacy-policy" className="text-sm text-white/60 transition-colors hover:text-emerald-400">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
