import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Loader2 } from "lucide-react"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error("Failed to submit")
      toast.success("Message sent successfully! We will get back to you soon.")
      reset()
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-white">Full Name</Label>
          <Input 
            id="name" 
            placeholder="Your name" 
            {...register("name")}
            className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus:border-white/60 focus:ring-1 focus:ring-white/60"
          />
          {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="text-white">Phone Number</Label>
          <Input 
            id="phone" 
            placeholder="+91 98765 43210" 
            {...register("phone")}
            className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus:border-white/60 focus:ring-1 focus:ring-white/60"
          />
          {errors.phone && <p className="text-sm text-red-400">{errors.phone.message}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-white">Email Address</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="your@email.com" 
          {...register("email")}
          className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus:border-white/60 focus:ring-1 focus:ring-white/60"
        />
        {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="text-white">Message</Label>
        <Textarea 
          id="message" 
          placeholder="Tell us about your project..." 
          rows={5} 
          {...register("message")}
          className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus:border-white/60 focus:ring-1 focus:ring-white/60 resize-none"
        />
        {errors.message && <p className="text-sm text-red-400">{errors.message.message}</p>}
      </div>
      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-gradient-to-r from-[#6fcf3a] to-[#27ae60] text-white font-semibold rounded-full py-6 hover:from-[#5dbb2a] hover:to-[#219955] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send Message
      </Button>
    </form>
  )
}
