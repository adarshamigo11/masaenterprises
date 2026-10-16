import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { ArrowLeft, Trash2, Briefcase, Plus } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { apiUrl } from "../lib/api"

interface Career {
  _id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
  active: boolean
  createdAt: string
}

export default function AdminCareersPage() {
  const [auth, setAuth] = useState<boolean | null>(null)
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Career | null>(null)
  const [form, setForm] = useState({ title: "", department: "", location: "Indore, India", type: "Full-Time", description: "", requirements: "", active: true })
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  function loadCareers() {
    const token = localStorage.getItem("admin_token")
    fetch(apiUrl("/api/admin/careers"), {
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => (r.ok ? r.json() : []))
      .then(setCareers)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    fetch(apiUrl("/api/admin/careers"), {
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
        if (data) setCareers(data)
        setLoading(false)
      })
      .catch(() => {
        setAuth(false)
        navigate("/admin")
      })
  }, [navigate])

  function openCreate() {
    setEditing(null)
    setForm({ title: "", department: "", location: "Indore, India", type: "Full-Time", description: "", requirements: "", active: true })
    setDialogOpen(true)
  }

  function openEdit(career: Career) {
    setEditing(career)
    setForm({
      title: career.title,
      department: career.department || "",
      location: career.location || "Indore, India",
      type: career.type || "Full-Time",
      description: career.description,
      requirements: Array.isArray(career.requirements) ? career.requirements.join("\n") : "",
      active: career.active ?? true,
    })
    setDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const requirements = form.requirements
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
      const token = localStorage.getItem("admin_token")
      const res = await fetch(editing ? apiUrl(`/api/admin/careers/${editing._id}`) : apiUrl("/api/admin/careers"), {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: form.title,
          department: form.department,
          location: form.location,
          type: form.type,
          description: form.description,
          requirements,
          active: form.active,
        }),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to save")
      toast.success(editing ? "Career updated" : "Career created")
      setDialogOpen(false)
      loadCareers()
    } catch {
      toast.error("Failed to save")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this job listing?")) return
    try {
      const token = localStorage.getItem("admin_token")
      const res = await fetch(apiUrl(`/api/admin/careers/${id}`), {
        method: "DELETE",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (!res.ok) throw new Error("Failed to delete")
      setCareers((prev) => prev.filter((c) => c._id !== id))
      toast.success("Career deleted")
    } catch {
      toast.error("Failed to delete")
    }
  }

  if (auth === null || (auth && loading && careers.length === 0)) {
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
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Careers</h1>
          <Button onClick={openCreate} className="bg-accent text-accent-foreground hover:bg-emerald-dark">
            <Plus className="mr-2 h-4 w-4" /> Add Job
          </Button>
        </div>
        {careers.length === 0 ? (
          <Card className="flex flex-col items-center gap-4 p-12 text-center">
            <Briefcase className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">No job listings yet</p>
            <Button onClick={openCreate} variant="outline">
              Add first job listing
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {careers.map((c) => (
              <Card key={c._id} className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-foreground">{c.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {c.department} • {c.location} • {c.type} • {format(new Date(c.createdAt), "PP")} {c.active ? "• Active" : "• Inactive"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(c)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(c._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Job" : "Add Job"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input id="department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Input id="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="Full-Time" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} required />
              </div>
              <div>
                <Label htmlFor="requirements">Requirements (one per line)</Label>
                <Textarea id="requirements" value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows={4} placeholder="Requirement 1&#10;Requirement 2" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
                <Label htmlFor="active">Active</Label>
              </div>
              <Button type="submit" disabled={submitting} className="bg-accent text-accent-foreground hover:bg-emerald-dark">
                {submitting ? "Saving..." : editing ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
