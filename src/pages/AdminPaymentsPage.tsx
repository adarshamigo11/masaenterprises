import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { fetchWithAuth, apiUrl } from "../lib/api"

interface Inquiry {
  _id: string
  fullName: string
  email: string
  phone: string
  planName: string
  serviceName: string
  status: 'pending' | 'approved' | 'denied'
  submittedAt: string
}

export default function AdminPaymentsPage() {
  const [auth, setAuth] = useState<boolean | null>(null)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("admin_token")
        const res = await fetchWithAuth("/admin/inquiries", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        if (res.status === 401) {
          setAuth(false)
          navigate("/admin")
          return
        }
        const data = await res.json()
        setInquiries(data.inquiries || [])
        setAuth(true)
      } catch {
        setAuth(false)
        navigate("/admin")
      } finally {
        setLoading(false)
      }
    }

    fetchInquiries()
  }, [navigate])

  async function handleApprove(id: string, name: string) {
    if (!confirm(`Mark request from ${name} as approved?`)) return
    
    setProcessingId(id)
    try {
      const token = localStorage.getItem("admin_token")
      const res = await fetch(apiUrl(`/api/admin/inquiries/${id}/approve`), { 
        method: "POST", 
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      
      if (!res.ok) throw new Error("Failed to approve")
      
      setInquiries(prev => prev.map(inq => 
        inq._id === id ? { ...inq, status: 'approved' as const } : inq
      ))
      toast.success(`Request approved`)
    } catch (error: any) {
      toast.error(error.message || "Failed to approve")
    } finally {
      setProcessingId(null)
    }
  }

  async function handleDeny(id: string, name: string) {
    if (!confirm(`Deny and delete request from ${name}?`)) return
    
    try {
      const token = localStorage.getItem("admin_token")
      const res = await fetch(apiUrl(`/api/admin/inquiries/${id}/deny`), { 
        method: "DELETE", 
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      
      if (!res.ok) throw new Error("Failed to deny")
      
      setInquiries(prev => prev.filter(inq => inq._id !== id))
      toast.success("Request deleted")
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
        <h1 className="mb-8 text-3xl font-bold text-foreground">Payment Requests</h1>
        
        {inquiries.length === 0 ? (
          <Card className="flex flex-col items-center gap-4 p-12 text-center">
            <CheckCircle className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">No payment requests yet</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <Card key={inquiry._id} className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-lg text-foreground">{inquiry.fullName}</p>
                      {inquiry.status === 'approved' && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                    <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {inquiry.planName}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                        {inquiry.serviceName}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Submitted: {format(new Date(inquiry.submittedAt), "PPpp")}
                    </p>
                  </div>
                  
                  {inquiry.status === 'pending' && (
                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(inquiry._id, inquiry.fullName)}
                        disabled={processingId === inquiry._id}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeny(inquiry._id, inquiry.fullName)}
                        disabled={processingId === inquiry._id}
                        className="text-red-600 hover:bg-red-50 border-red-200"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Deny
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
