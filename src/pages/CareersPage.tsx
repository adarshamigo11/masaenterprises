import useSWR from "swr"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import SectionHeading from "../components/SectionHeading"
import GlassCard from "../components/GlassCard"
import { Skeleton } from "../components/ui/skeleton"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { MapPin, Briefcase, Loader2, Zap, TrendingUp, Leaf, Users } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { apiUrl } from "../lib/api"

interface Job {
  _id: string
  title: string
  description: string
  location: string
  type: string
  department?: string
}

const fetcher = (url: string) => fetch(apiUrl(url)).then((r) => r.json())

export default function CareersPage({ setShowFooter }: { setShowFooter: (show: boolean) => void }) {
  const { data: jobs, isLoading } = useSWR<Job[]>("/api/careers", fetcher)
  const [activeSection, setActiveSection] = useState(0)

  // Hide footer when on careers page
  useEffect(() => {
    setShowFooter(false)
    return () => setShowFooter(true)
  }, [setShowFooter])

  return (
    <>
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{ backgroundImage: "url('/images/c1.jpg')" }}
      />
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-0" />
      
      {/* Content Container - All sections stacked on top of each other */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl px-4 py-20">
          {/* Section 1: Hero */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: activeSection === 0 ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="text-center max-w-4xl mx-auto absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ display: activeSection === 0 ? 'flex' : 'none' }}
          >
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl lg:text-7xl font-bold text-white  mb-6"
              >
                Careers
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl lg:text-2xl text-white/90"
              >
                Join our team and build the future of fintech.
              </motion.p>
            </div>
          </motion.div>

          {/* Section 2: Why Join Us */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: activeSection >= 1 ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ display: activeSection === 1 ? 'block' : 'none' }}
            className="text-center"
          >
            <FadeInSection>
              <h2 className="text-4xl lg:text-5xl font-bold text-white  mb-4">
                Why Join Us
              </h2>
              <p className="text-xl text-white/80 mb-16">Choose Nextway for your next career move.</p>
            </FadeInSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Innovative Technology", desc: "Work with cutting-edge fintech and enterprise solutions that make a real impact.", Icon: Zap },
                { title: "Growth & Learning", desc: "Continuous learning opportunities, certifications, and a culture that values development.", Icon: TrendingUp },
                { title: "Work-Life Balance", desc: "Flexible work arrangements and a supportive environment that respects your well-being.", Icon: Leaf },
                { title: "Collaborative Culture", desc: "Join a talented team that collaborates, innovates, and celebrates success together.", Icon: Users },
              ].map((card, i) => (
                <FadeInSection key={card.title} delay={i * 0.1}>
                  <div className="relative group">
                    {/* Blur Drop Background */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl blur-md group-hover:blur-lg transition-all duration-300" />
                    {/* Card Content */}
                    <div className="relative h-full bg-black border border-white/10 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 rounded-xl overflow-hidden">
                      {/* Top Blur Overlay */}
                      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-500/10 to-transparent backdrop-blur-sm pointer-events-none" />
                      {/* Bottom Blur Under Text */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-emerald-900/20 to-transparent backdrop-blur-xs pointer-events-none" />
                      {/* Card Content */}
                      <div className="relative p-6 h-full flex flex-col items-center text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/20 backdrop-blur-sm">
                          <card.Icon className="h-6 w-6 text-emerald-400" />
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-white ">{card.title}</h3>
                        <p className="mt-2 text-sm text-slate-300 flex-grow">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </motion.div>

          {/* Section 3: Open Positions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: activeSection >= 2 ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ display: activeSection >= 2 ? 'block' : 'none' }}
            className="text-center"
          >
            <FadeInSection>
              <h2 className="text-4xl lg:text-5xl font-bold text-white  mb-4">
                Open Positions
              </h2>
              <p className="text-xl text-white/80 mb-16">Find the role that fits your skills.</p>
            </FadeInSection>
            {isLoading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <FadeInSection key={i} delay={i * 0.1}>
                    <div className="glass rounded-xl p-6">
                      <Skeleton className="mb-2 h-6 w-1/3" />
                      <Skeleton className="mb-4 h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </FadeInSection>
                ))}
              </div>
            ) : !jobs || jobs.length === 0 ? (
              <FadeInSection>
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <Briefcase className="h-16 w-16 text-white/60" />
                  <h3 className="text-xl font-semibold text-white ">No open positions</h3>
                  <p className="max-w-md text-white/70">Send your resume to careers@nextwayinfotech.com</p>
                </div>
              </FadeInSection>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job, i) => (
                  <FadeInSection key={job._id} delay={i * 0.1}>
                    <JobCard job={job} />
                  </FadeInSection>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Detection */}
      <ScrollDetector activeSection={activeSection} setActiveSection={setActiveSection} totalSections={3} />
    </>
  )
}

// Fade-in section wrapper component
function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

// Scroll detector component
function ScrollDetector({ activeSection, setActiveSection, totalSections }: { 
  activeSection: number
  setActiveSection: (section: number) => void
  totalSections: number
}) {
  useEffect(() => {
    let isTransitioning = false
    const transitionDuration = 1200 // ms - duration of fade animation
    
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return
      
      // Prevent default scroll behavior
      e.preventDefault()
      
      isTransitioning = true
      
      if (e.deltaY > 0) {
        // Scrolling down - go to next section
        const nextSection = Math.min(activeSection + 1, totalSections - 1)
        if (nextSection !== activeSection) {
          setActiveSection(nextSection)
        }
      } else {
        // Scrolling up - go to previous section
        const prevSection = Math.max(activeSection - 1, 0)
        if (prevSection !== activeSection) {
          setActiveSection(prevSection)
        }
      }
      
      // Wait for fade out + fade in to complete
      setTimeout(() => {
        isTransitioning = false
      }, transitionDuration)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [activeSection, setActiveSection, totalSections])

  return null
}

function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [resume, setResume] = useState<File | null>(null)

  async function handleApply(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !phone || !email) {
      toast.error("Please fill all required fields")
      return
    }
    const fd = new FormData()
    fd.append("jobId", job._id)
    fd.append("name", name)
    fd.append("phone", phone)
    fd.append("email", email)
    if (resume) fd.append("resume", resume)
    setLoading(true)
    try {
      const res = await fetch(apiUrl("/api/careers/apply"), { method: "POST", body: fd })
      if (!res.ok) throw new Error("Failed")
      toast.success("Application submitted!")
      setOpen(false)
      setName("")
      setPhone("")
      setEmail("")
      setResume(null)
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="relative group h-full">
        {/* Blur Drop Background */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl blur-md group-hover:blur-lg transition-all duration-300" />
        {/* Card Content - Pure Black */}
        <div className="relative h-full bg-black border border-white/10 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 rounded-xl overflow-hidden p-6">
          {/* Top Blur Overlay */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-500/10 to-transparent backdrop-blur-sm pointer-events-none" />
          {/* Bottom Blur Under Text */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-emerald-900/20 to-transparent backdrop-blur-xs pointer-events-none" />
          {/* Card Content */}
          <div className="relative flex flex-col h-full">
            <h3 className="text-lg font-semibold text-white ">{job.title}</h3>
            {job.department && <p className="mt-1 text-sm text-slate-300">{job.department}</p>}
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-400">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
              <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{job.type}</span>
            </div>
            <p className="mt-3 text-sm text-slate-400 line-clamp-3 flex-grow">{job.description}</p>
            <Button onClick={() => setOpen(true)} className="mt-4 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 backdrop-blur-sm">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleApply} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="resume">Resume (PDF)</Label>
              <Input id="resume" type="file" accept=".pdf" onChange={(e) => setResume(e.target.files?.[0] ?? null)} />
            </div>
            <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-emerald-dark">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Application
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
