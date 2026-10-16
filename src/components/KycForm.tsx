import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Loader2, Download, FileText } from "lucide-react"
import { apiUrl } from "../lib/api"

const fileFields = [
  { name: "kycForm", label: "KYC Form (PDF/Image)" },
  { name: "panCard", label: "PAN Card (Image)" },
  { name: "aadhaarFront", label: "Aadhaar Card - Front (Image)" },
  { name: "aadhaarBack", label: "Aadhaar Card - Back (Image)" },
  { name: "signature", label: "Signature (Image)" },
]

export default function KycForm() {
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<Record<string, File | null>>({})

  function handleFileChange(name: string, file: File | null) {
    setFiles((prev) => ({ ...prev, [name]: file }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = (formData.get("name") as string)?.trim()
    const phone = (formData.get("phone") as string)?.trim()

    if (!name || name.length < 2) {
      toast.error("Please enter your full name.")
      return
    }
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid contact number.")
      return
    }
    const hasFiles = fileFields.some((f) => files[f.name])
    if (!hasFiles) {
      toast.error("Please upload at least one document.")
      return
    }

    for (const field of fileFields) {
      if (files[field.name]) formData.append(field.name, files[field.name] as File)
    }

    setLoading(true)
    try {
      const res = await fetch(apiUrl("/api/kyc"), { method: "POST", body: formData })
      if (!res.ok) {
        const errData = await res.json().catch(() => null)
        throw new Error(errData?.error || `Server error: ${res.status}`)
      }
      toast.success("KYC documents submitted successfully!")
      ;(e.target as HTMLFormElement).reset()
      setFiles({})
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Download User Agreement Button */}
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-50 border border-emerald-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">KYC Form</h4>
              
            </div>
          </div>
          <a
            href="/KYC%20form/Nextway_user_aggrement%20-%20Copy.pdf"
            download="MASA_User_Agreement.pdf"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-md"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="kyc-name">Full Name</Label>
          <Input id="kyc-name" name="name" placeholder="Your full name" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="kyc-phone">Contact Number</Label>
          <Input id="kyc-phone" name="phone" placeholder="+91 98765 43210" required />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {fileFields.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <Label htmlFor={`kyc-${field.name}`}>{field.label}</Label>
            <Input
              id={`kyc-${field.name}`}
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(field.name, e.target.files?.[0] ?? null)}
            />
          </div>
        ))}
      </div>
      <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-emerald-dark">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit KYC Documents
      </Button>
    </form>
  )
}
