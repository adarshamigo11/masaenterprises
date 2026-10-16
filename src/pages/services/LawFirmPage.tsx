import { useEffect } from "react"
import LawFirmHero from "../../components/services/lawfirm/LawFirmHero"
import ModuleTabs from "../../components/services/lawfirm/ModuleTabs"
import BenefitsStats from "../../components/services/lawfirm/BenefitsStats"
import LawFirmPricing from "../../components/services/lawfirm/LawFirmPricing"
import LawFirmFAQ from "../../components/services/lawfirm/LawFirmFAQ"
import LawFirmCTA from "../../components/services/lawfirm/LawFirmCTA"

export default function LawFirmPage() {
  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Section 1 — Hero */}
      <LawFirmHero />

      {/* Section 2 — Core Features (Tabbed Layout) */}
      <ModuleTabs />

      {/* Section 3 — Stats + Benefits */}
      <BenefitsStats />

      {/* Section 4 — Pricing */}
      <LawFirmPricing />

      {/* Section 5 — FAQ */}
      <LawFirmFAQ />

      {/* Section 6 — Bottom CTA */}
      <LawFirmCTA />
    </div>
  )
}
