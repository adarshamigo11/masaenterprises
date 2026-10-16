import useSWR from "swr"
import { Link } from "react-router-dom"
import { useState, useMemo } from "react"
import HeroSection from "../components/HeroSection"
import { Skeleton } from "../components/ui/skeleton"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { FileText, Search, ArrowRight, Mail, ChevronLeft, ChevronRight } from "lucide-react"
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

const fetcher = (url: string) => fetch(apiUrl(url)).then((r) => r.json())

// Helper to get image URL
const getImageUrl = (blog: Blog) => {
  if (blog.imageFileId) return apiUrl(`/api/blogs/image/${blog.imageFileId}`)
  if (blog.coverImage && blog.coverImage.startsWith("http")) return blog.coverImage
  return null
}

// Calculate read time
const calculateReadTime = (content: string) => {
  const words = content.replace(/<[^>]+>/g, '').split(' ').length
  return Math.ceil(words / 200)
}

export default function BlogsPage() {
  const { data: blogs, isLoading } = useSWR<Blog[]>("/api/blogs", fetcher)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null)
  const itemsPerPage = 6

  // Filter and search blogs
  const filteredBlogs = useMemo(() => {
    if (!blogs) return []
    
    let filtered = [...blogs]
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query)
      )
    }
    
    // Filter by author
    if (selectedAuthor) {
      filtered = filtered.filter(blog => blog.author === selectedAuthor)
    }
    
    return filtered
  }, [blogs, searchQuery, selectedAuthor])

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Get unique authors
  const uniqueAuthors = useMemo(() => {
    if (!blogs) return []
    const authorMap = new Map<string, number>()
    blogs.forEach(blog => {
      authorMap.set(blog.author, (authorMap.get(blog.author) || 0) + 1)
    })
    return Array.from(authorMap.entries())
  }, [blogs])

  // Popular posts (top 4)
  const popularPosts = blogs ? blogs.slice(0, 4) : []

  // You Might Also Like (last 3)
  const recommendedBlogs = blogs ? blogs.slice(-3) : []

  return (
    <>
      <HeroSection 
        title="Blog & Insights" 
        subtitle="Expert perspectives from our team" 
        videoBackground 
        backgroundImage="/images/blogher.jpg" 
      />
      
      {/* ZONE 1 — PAGE HEADER */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Header with search */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Blog & Insights</h1>
              <p className="mt-2 text-gray-600">Expert perspectives from our team</p>
            </div>
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full border-gray-200 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {isLoading ? (
        /* Loading State */
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Skeleton className="h-96 w-full mb-12 rounded-2xl" />
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass rounded-xl overflow-hidden">
                  <Skeleton className="h-56 w-full" />
                  <div className="p-6">
                    <Skeleton className="mb-3 h-6 w-3/4" />
                    <Skeleton className="mb-2 h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : !blogs || blogs.length === 0 ? (
        /* Empty State */
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <FileText className="h-16 w-16 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900">No blog posts yet</h3>
              <p className="max-w-md text-gray-600">We are working on some great content. Check back soon.</p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* ZONE 2 — FEATURED ARTICLE */}
          {filteredBlogs.length > 0 && (
            <section className="py-12 bg-gray-50">
              <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <Link to={`/blogs/${filteredBlogs[0].slug}`} className="block group">
                  <div className="rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="grid lg:grid-cols-[45%_55%] gap-0">
                      {/* Image */}
                      <div className="relative h-64 lg:h-full overflow-hidden">
                        {getImageUrl(filteredBlogs[0]) ? (
                          <img
                            src={getImageUrl(filteredBlogs[0])!}
                            alt={filteredBlogs[0].title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-100">
                            <FileText className="h-24 w-24 text-gray-300" />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold w-fit mb-4">
                          <span>FEATURED</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                          {filteredBlogs[0].title}
                        </h2>
                        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                          {filteredBlogs[0].excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
                          <span className="font-medium text-gray-900">{filteredBlogs[0].author}</span>
                          <span>•</span>
                          <span>{format(new Date(filteredBlogs[0].createdAt), "MMMM d, yyyy")}</span>
                          <span>•</span>
                          <span>~{calculateReadTime(filteredBlogs[0].content)} min read</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                          <span>Read Article</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* ZONE 3 — ALL ARTICLES */}
          <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="grid lg:grid-cols-[70%_30%] gap-12">
                {/* LEFT — Blog Grid */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">All Articles</h2>
                    <span className="text-sm text-gray-500">
                      {paginatedBlogs.length} of {filteredBlogs.length} articles
                    </span>
                  </div>

                  {paginatedBlogs.length === 0 ? (
                    <div className="text-center py-20">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No articles found matching your criteria</p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedAuthor(null)
                        }}
                        className="mt-4"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="grid sm:grid-cols-2 gap-6 mb-8">
                        {paginatedBlogs.slice(1).map((blog) => (
                          <Link key={blog._id} to={`/blogs/${blog.slug}`} className="block group">
                            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white hover:border-gray-300 transition-all">
                              {/* Cover Image */}
                              <div className="relative aspect-video overflow-hidden">
                                {getImageUrl(blog) ? (
                                  <img
                                    src={getImageUrl(blog)!}
                                    alt={blog.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                    <FileText className="h-12 w-12 text-gray-300" />
                                  </div>
                                )}
                              </div>
                              
                              {/* Content */}
                              <div className="p-5">
                                <div className="inline-block px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium mb-3">
                                  {blog.author}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors">
                                  {blog.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                  {blog.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
                                  <span>{format(new Date(blog.createdAt), "MMM d, yyyy")}</span>
                                  <span>•</span>
                                  <span>~{calculateReadTime(blog.content)} min</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="h-10 w-10 rounded-full"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="icon"
                              onClick={() => setCurrentPage(page)}
                              className={`h-10 w-10 rounded-full ${
                                currentPage === page ? "bg-gray-900 text-white hover:bg-gray-900" : ""
                              }`}
                            >
                              {page}
                            </Button>
                          ))}
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="h-10 w-10 rounded-full"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* RIGHT — Sidebar */}
                <div className="space-y-8">
                  {/* Widget 1: Popular Posts */}
                  <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Posts</h3>
                    <div className="space-y-4">
                      {popularPosts.map((blog, i) => (
                        <Link key={blog._id} to={`/blogs/${blog.slug}`} className="flex gap-3 group">
                          <span className="text-3xl font-bold text-gray-300 group-hover:text-purple-300 transition-colors">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                              {blog.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {blog.author} · {format(new Date(blog.createdAt), "MMM d, yyyy")}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Widget 2: Browse by Author */}
                  <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Browse by Author</h3>
                    <div className="space-y-3">
                      {uniqueAuthors.map(([author, count]) => (
                        <button
                          key={author}
                          onClick={() => {
                            setSelectedAuthor(selectedAuthor === author ? null : author)
                            setCurrentPage(1)
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                            selectedAuthor === author
                              ? "bg-purple-100 text-purple-700"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                              {author.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium">{author}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{count} {count === 1 ? 'article' : 'articles'}</span>
                            <ArrowRight className="h-3 w-3" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Widget 3: Newsletter */}
                  <div className="rounded-2xl border border-purple-200 p-6 bg-gradient-to-br from-purple-50 to-white">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-purple-100">
                        <Mail className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Stay Updated</h3>
                        <p className="text-sm text-gray-600 mt-1">Get our latest articles delivered to your inbox</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="rounded-lg border-gray-300"
                      />
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ZONE 4 — BOTTOM FULL WIDTH STRIP */}
          {recommendedBlogs.length > 0 && (
            <section className="py-20 bg-gray-50">
              <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900">You Might Also Like</h2>
                  <p className="text-gray-600 mt-2">More articles from our team</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {recommendedBlogs.map((blog) => (
                    <Link key={blog._id} to={`/blogs/${blog.slug}`} className="block group">
                      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg transition-all">
                        <div className="relative aspect-video overflow-hidden">
                          {getImageUrl(blog) ? (
                            <img
                              src={getImageUrl(blog)!}
                              alt={blog.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-100">
                              <FileText className="h-12 w-12 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors">
                            {blog.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{blog.author}</span>
                            <span>•</span>
                            <span>{format(new Date(blog.createdAt), "MMM d, yyyy")}</span>
                          </div>
                          <div className="mt-4 flex items-center gap-2 text-purple-600 font-medium text-sm group-hover:gap-3 transition-all">
                            <span>Read More</span>
                            <ArrowRight className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  )
}
