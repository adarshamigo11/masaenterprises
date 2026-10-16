import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { ArrowLeft, Trash2, FileText, Plus } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { apiUrl } from "../lib/api"

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  coverImage: string
  imageFileId: string | null
  published: boolean
  createdAt: string
}

export default function AdminBlogsPage() {
  const [auth, setAuth] = useState<boolean | null>(null)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Blog | null>(null)
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", author: "", published: false, coverImage: "" })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  function loadBlogs() {
    const token = localStorage.getItem("admin_token")
    fetch(apiUrl("/api/admin/blogs"), {
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => (r.ok ? r.json() : []))
      .then(setBlogs)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    fetch(apiUrl("/api/admin/blogs"), {
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
        if (data) setBlogs(data)
        setLoading(false)
      })
      .catch(() => {
        setAuth(false)
        navigate("/admin")
      })
  }, [navigate])

  function openCreate() {
    setEditing(null)
    setForm({ title: "", slug: "", excerpt: "", content: "", author: "", published: false, coverImage: "" })
    setImageFile(null)
    setDialogOpen(true)
  }

  function openEdit(blog: Blog) {
    setEditing(blog)
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      published: blog.published,
      coverImage: blog.coverImage || "",
    })
    setImageFile(null)
    setDialogOpen(true)
  }

  function slugify(s: string) {
    return s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const body = new FormData()
      body.append("title", form.title)
      body.append("slug", form.slug || slugify(form.title))
      body.append("excerpt", form.excerpt)
      body.append("content", form.content)
      body.append("author", form.author)
      body.append("published", String(form.published))
      if (form.coverImage) {
        body.append("coverImage", form.coverImage)
      }
      if (imageFile) {
        body.append("image", imageFile)
      }

      const url = editing ? apiUrl(`/api/admin/blogs/${editing._id}`) : apiUrl("/api/admin/blogs")
      const method = editing ? "PUT" : "POST"
      const token = localStorage.getItem("admin_token")
      const res = await fetch(url, { method, body, credentials: "include", headers: token ? { Authorization: `Bearer ${token}` } : {} })
      if (!res.ok) throw new Error("Failed to save")
      toast.success(editing ? "Blog updated" : "Blog created")
      setDialogOpen(false)
      loadBlogs()
    } catch {
      toast.error("Failed to save")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this blog post?")) return
    try {
      const token = localStorage.getItem("admin_token")
      const res = await fetch(apiUrl(`/api/admin/blogs/${id}`), {
        method: "DELETE",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (!res.ok) throw new Error("Failed to delete")
      setBlogs((prev) => prev.filter((b) => b._id !== id))
      toast.success("Blog deleted")
    } catch {
      toast.error("Failed to delete")
    }
  }

  if (auth === null || (auth && loading && blogs.length === 0)) {
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
          <h1 className="text-3xl font-bold text-foreground">Blogs</h1>
          <Button onClick={openCreate} className="bg-accent text-accent-foreground hover:bg-emerald-dark">
            <Plus className="mr-2 h-4 w-4" /> Add Blog
          </Button>
        </div>
        {blogs.length === 0 ? (
          <Card className="flex flex-col items-center gap-4 p-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">No blog posts yet</p>
            <Button onClick={openCreate} variant="outline">
              Add first blog post
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {blogs.map((b) => (
              <Card key={b._id} className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-foreground">{b.title}</p>
                  <p className="text-sm text-muted-foreground">
                    By {b.author} - {format(new Date(b.createdAt), "PP")} {b.published ? "- Published" : "- Draft"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(b)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(b._id)}>
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
              <DialogTitle>{editing ? "Edit Blog" : "Add Blog"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated from title" />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} required />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} required />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input id="author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="coverImage">Image URL</Label>
                <Input
                  id="coverImage"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                />
                <p className="mt-1 text-xs text-muted-foreground">Use a link to an image, or upload a file below.</p>
              </div>
              <div>
                <Label htmlFor="image">Or upload image file</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                {editing?.imageFileId && !imageFile && !form.coverImage && (
                  <p className="mt-1 text-xs text-muted-foreground">Current image is set. Use URL or file to replace.</p>
                )}
                {imageFile && (
                  <p className="mt-1 text-xs text-muted-foreground">{imageFile.name} selected</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                <Label htmlFor="published">Published</Label>
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
