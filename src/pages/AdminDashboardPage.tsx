import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card } from "../components/ui/card"
import { Users, FileText, Briefcase, UserCheck } from "lucide-react"
import { apiUrl } from "../lib/api"

export default function AdminDashboardPage() {
  const [auth, setAuth] = useState<boolean | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    fetch(apiUrl("/api/admin/contacts"), {
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => {
        if (r.status === 401) {
          setAuth(false)
          navigate("/admin")
        } else {
          setAuth(true)
        }
      })
      .catch(() => {
        setAuth(false)
        navigate("/admin")
      })
  }, [navigate])

  if (auth === null) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center py-20">
        <div className="text-muted-foreground">Loading...</div>
      </section>
    )
  }

  const links = [
    { title: "Contacts", desc: "View contact form submissions", icon: Users, href: "/admin/contacts" },
    { title: "KYC Submissions", desc: "View KYC document submissions", icon: FileText, href: "/admin/kyc" },
    { title: "Blogs", desc: "Manage blog posts", icon: FileText, href: "/admin/blogs" },
    { title: "Careers", desc: "Manage job listings", icon: Briefcase, href: "/admin/careers" },
    { title: "Applicants", desc: "View job applicants", icon: UserCheck, href: "/admin/applicants" },

  ]

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <Link key={l.title} to={l.href}>
              <Card className="flex h-full flex-col gap-2 p-6 transition-colors hover:border-accent/50 hover:bg-accent/5">
                <l.icon className="h-10 w-10 text-accent" />
                <span className="font-semibold text-foreground">{l.title}</span>
                <span className="text-sm text-muted-foreground">{l.desc}</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
