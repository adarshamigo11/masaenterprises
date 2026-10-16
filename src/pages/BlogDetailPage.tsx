import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import HeroSection from "../components/HeroSection"
import { Skeleton } from "../components/ui/skeleton"
import { Button } from "../components/ui/button"
import { ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { apiUrl } from "../lib/api"

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  imageFileId: string | null
  coverImage: string | null
  createdAt: string
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetch(apiUrl("/api/blogs"))
      .then((r) => r.json())
      .then((blogs: Blog[]) => {
        const found = blogs.find((b) => b.slug === slug)
        setBlog(found || null)
      })
      .catch(() => setBlog(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <>
        <HeroSection title="Loading..." subtitle="" compact />
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <Skeleton className="mb-8 h-12 w-3/4" />
            <Skeleton className="mb-4 h-64 w-full rounded-lg" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-2/3" />
          </div>
        </section>
      </>
    )
  }

  if (!blog) {
    return (
      <>
        <HeroSection title="Blog Not Found" subtitle="The blog post you're looking for doesn't exist." compact />
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
            <Button asChild variant="outline">
              <Link to="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
              </Link>
            </Button>
          </div>
        </section>
      </>
    )
  }

  const imgUrl = blog.imageFileId ? apiUrl(`/api/blogs/image/${blog.imageFileId}`) : (blog.coverImage && blog.coverImage.startsWith("http") ? blog.coverImage : null)

  return (
    <>
      <HeroSection title={blog.title} subtitle={`By ${blog.author} • ${format(new Date(blog.createdAt), "MMMM d, yyyy")}`} compact />
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link to="/blogs" className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
          </Link>
          <article className="space-y-8">
            {imgUrl && <img src={imgUrl} alt={blog.title} className="w-full rounded-xl object-cover shadow-lg" />}
            <div>
              <p className="text-muted-foreground">{blog.excerpt}</p>
            </div>
            <div
              className="space-y-4 text-foreground [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-semibold [&_p]:leading-relaxed [&_img]:rounded-lg [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>
        </div>
      </section>
    </>
  )
}
