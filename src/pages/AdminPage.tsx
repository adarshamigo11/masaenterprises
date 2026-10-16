import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import GlassCard from "../components/GlassCard"
import { Loader2 } from "lucide-react"
import { apiUrl } from "../lib/api"

export default function AdminPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !password) {
      toast.error("Username and password are required")
      return
    }
    setLoading(true)
    try {
      const res = await fetch(apiUrl("/api/admin/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Invalid credentials")
      const data = await res.json()
      if (data.token) {
        localStorage.setItem("admin_token", data.token)
      }
      toast.success("Login successful")
      navigate("/admin/dashboard")
    } catch {
      toast.error("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-20">
      <div className="w-full max-w-md px-4">
        <GlassCard>
          <h1 className="mb-6 text-2xl font-bold text-foreground">Admin Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-emerald-dark">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </GlassCard>
      </div>
    </section>
  )
}
