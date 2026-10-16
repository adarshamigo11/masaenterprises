import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { ArrowLeft, Trash2, FileText, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { apiUrl } from "../lib/api"

interface KycSubmission {
  _id: string
  name: string
  phone: string
  kycFormFileId: string | null
  panCardFileId: string | null
  aadhaarFrontFileId: string | null
  aadhaarBackFileId: string | null
  signatureFileId: string | null
  createdAt: string
}

export default function AdminKycPage() {
  const [auth, setAuth] = useState<boolean | null>(null)
  const [submissions, setSubmissions] = useState<KycSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    fetch(apiUrl("/api/admin/kyc"), {
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
        if (data) setSubmissions(data)
        setLoading(false)
      })
      .catch(() => {
        setAuth(false)
        navigate("/admin")
      })
  }, [navigate])

  async function handleDelete(id: string) {
    if (!confirm("Delete this KYC submission?")) return
    try {
      const token = localStorage.getItem("admin_token")
      const res = await fetch(apiUrl(`/api/admin/kyc?id=${id}`), {
        method: "DELETE",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (!res.ok) throw new Error("Failed to delete")
      setSubmissions((prev) => prev.filter((s) => s._id !== id))
      toast.success("KYC submission deleted")
    } catch {
      toast.error("Failed to delete")
    }
  }

  function fileLink(fileId: string | null, label: string) {
    if (!fileId) return null
    const downloadUrl = apiUrl(`/api/admin/kyc/file/${fileId}?download=1`)
    return (
      <a href={downloadUrl} download className="inline-flex items-center gap-1 text-sm text-accent hover:underline" target="_blank" rel="noopener noreferrer">
        Download {label} <ExternalLink className="h-3 w-3" />
      </a>
    )
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
        <h1 className="mb-8 text-3xl font-bold text-foreground">KYC Submissions</h1>
        {submissions.length === 0 ? (
          <Card className="flex flex-col items-center gap-4 p-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">No KYC submissions yet</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((s) => (
              <Card key={s._id} className="flex flex-col gap-3 p-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.phone}</p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {fileLink(s.kycFormFileId, "KYC Form")}
                    {fileLink(s.panCardFileId, "PAN Card")}
                    {fileLink(s.aadhaarFrontFileId, "Aadhaar Front")}
                    {fileLink(s.aadhaarBackFileId, "Aadhaar Back")}
                    {fileLink(s.signatureFileId, "Signature")}
                  </div>
                  <p className="text-xs text-muted-foreground">{format(new Date(s.createdAt), "PPpp")}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(s._id)}>
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
