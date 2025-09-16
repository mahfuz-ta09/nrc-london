import type { Metadata } from "next"
import Image from "next/image"
import "../../../../css/blogs/slugDesign.css"


export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { slug } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API}/blog/${slug}`, {
    cache: "no-store",
  })
  const blog = await res.json()

  return {
    title: blog?.data?.title || "Blog",
    description: blog?.data?.content?.summary || "",
    openGraph: {
      title: blog?.data?.title,
      description: blog?.data?.content?.summary,
      images: blog?.data?.meta?.ogImage?.url
        ? [{ url: blog?.data.meta.ogImage.url }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog?.data?.title,
      description: blog?.data?.content?.summary,
      images: blog?.data?.meta?.ogImage?.url
        ? [blog?.data?.meta?.ogImage?.url]
        : [],
    },
  }
}


export default async function BlogDetail(
  { params }: { params: { slug: string } }
) {
  const { slug } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API}/blog/${slug}`, {
    cache: "no-store",
  })
  const blog = await res.json()

  return (
    <div className="blog-detail-container">
      <div className="blog-header">
        {blog?.data?.meta?.ogImage?.url && (
          <Image
            src={blog.data.meta.ogImage.url}
            fill
            priority
            alt="blog header image"
            className="blog-header-image"
          />
        )}
      </div>
      <h1 className="blog-heading">{blog?.data?.title}</h1>
      <div className="blog-detail-container-body">
        <p>
          <em>
            {blog?.data?.publishedAt} By {blog?.data?.author}
          </em>
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: blog?.data?.content?.body || "" }}
        />
      </div>
    </div>
  )
}
