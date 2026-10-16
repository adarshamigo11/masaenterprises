import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { ArrowLeft, Trash2, Users } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { apiUrl } from "../lib/api"

interface Contact {
  _id: string
  name: string
  phone: string
  email: string
  message: string
  createdAt: string
}

export default function AdminContactsPage() {
  const [auth, setAuth] = useState<boolean | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
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
          return r.json()
        }
      })
      .then((data) => {
        if (data) setContacts(data)
        setLoading(false)
      })
      .catch(() => {
        setAuth(false)
        navigate("/admin")
      })
  }, [navigate])

  async function handleDelete(id: string) {
    if (!confirm("Delete this contact submission?")) return
    try {
      const token = localStorage.getItem("admin_token")
      const res = await fetch(apiUrl(`/api/admin/contacts?id=${id}`), {
        method: "DELETE",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (!res.ok) throw new Error("Failed to delete")
      setContacts((prev) => prev.filter((c) => c._id !== id))
      toast.success("Contact deleted")
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
        <h1 className="mb-8 text-3xl font-bold text-foreground">Contacts</h1>
        {contacts.length === 0 ? (
          <Card className="flex flex-col items-center gap-4 p-12 text-center">
            <Users className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">No contact submissions yet</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {contacts.map((c) => (
              <Card key={c._id} className="flex flex-col gap-2 p-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.email}</p>
                  <p className="text-sm text-muted-foreground">{c.phone}</p>
                  <p className="mt-2 text-sm">{c.message}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(c.createdAt), "PPpp")}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(c._id)}>
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
