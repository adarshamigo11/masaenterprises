import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { ArrowLeft, Trash2, UserCheck, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { apiUrl } from "../lib/api"

interface Applicant {
  _id: string
  jobId: string
  name: string
  phone: string
  email: string
  resumeFileId: string | null
  createdAt: string
}

export default function AdminApplicantsPage() {
  const [auth, setAuth] = useState<boolean | null>(null)
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    fetch(apiUrl("/api/admin/applicants"), {
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => {
        if (r.status === 401) {
          setAuth(false)
          navigate("/admin")
        } else {
          setAuth(true)
          return r.json()
        }
      })
      .then((data) => {
        if (data) setApplicants(data)
        setLoading(false)
      })
      .catch(() => {
        setAuth(false)
        navigate("/admin")
      })
  }, [navigate])

  async function handleDelete(id: string) {
    if (!confirm("Delete this applicant?")) return
    try {
      const token = localStorage.getItem("admin_token")
      const res = await fetch(apiUrl(`/api/admin/applicants/${id}`), {
        method: "DELETE",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (!res.ok) throw new Error("Failed to delete")
      setApplicants((prev) => prev.filter((a) => a._id !== id))
      toast.success("Applicant deleted")
    } catch {
      toast.error("Failed to delete")
    }
  }

  if (auth === null || (auth && loading)) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center py-20">
        <div className="text-muted-foreground">Loading...</div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Link to="/admin/dashboard" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="mb-8 text-3xl font-bold text-foreground">Applicants</h1>
        {applicants.length === 0 ? (
          <Card className="flex flex-col items-center gap-4 p-12 text-center">
            <UserCheck className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">No applicants yet</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {applicants.map((a) => (
              <Card key={a._id} className="flex flex-col gap-2 p-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{a.name}</p>
                  <p className="text-sm text-muted-foreground">{a.email}</p>
                  <p className="text-sm text-muted-foreground">{a.phone}</p>
                  {a.resumeFileId && (
                    <a
                      href={apiUrl(`/api/admin/applicants/resume/${a.resumeFileId}`)}
                      download
                      className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                    >
                      Download Resume <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  <p className="text-xs text-muted-foreground">Job ID: {a.jobId || "N/A"} • {format(new Date(a.createdAt), "PPpp")}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(a._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
