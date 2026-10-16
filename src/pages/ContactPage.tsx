import HeroSection from "../components/HeroSection"
import ContactForm from "../components/ContactForm"

export default function ContactPage() {
  return (
    <>
      <HeroSection 
        title="Contact Us" 
        subtitle="Get in touch with our team. We'd love to hear from you."
        videoBackground={true}
        backgroundImage="/images/cu2.jpg"
      />
      <section className="py-20 lg:py-28 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/images/cu.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        {/* Frosted Glass Card Container */}
        <div className="relative z-10 mx-auto max-w-2xl px-4">
          <div className="backdrop-blur-sm bg-white/3 border border-white/20 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-8 lg:p-10">
            <h2 className="mb-8 text-2xl font-bold text-white text-center">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
