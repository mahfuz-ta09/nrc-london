import { Metadata } from "next"
import '../../../../css/blogs/slugDesign.css'
import Image from "next/image"


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API}/blog/${slug}`)

    const blog = await res.json()
    
    return {
        title: blog?.data?.title || "Blog",
        description: blog?.data?.content?.summary || "",
        openGraph: {
            title: blog?.data?.title,
            description: blog?.data?.content?.summary,
            images: blog?.data?.meta?.ogImage?.url ? [{ url: blog?.data.meta.ogImage.url }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: blog?.data?.title,
            description: blog?.data?.content?.summary,
            images: blog?.data?.meta?.ogImage?.url ? [blog?.data?.meta?.ogImage?.url] : [],
        },
    }
}


export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API}/blog/${slug}`, {
        cache: "no-store",
    })

    const blog = await res.json()
    return (
        <div className="blog-detail-container">
            <div className="blog-header">
                <h1>{blog?.data?.title}</h1>
                <div className="header-blog-content">
                    <Image 
                        src={blog?.data?.meta?.ogImage?.url || null} 
                        fill
                        priority  
                        alt="blog header image"/>
                </div>
            </div>
            <div className="blog-detail-container-body">
                <p>{blog?.data?.publishedAt}<em>By {blog?.data?.author}</em></p>
                <div dangerouslySetInnerHTML={{ __html: blog?.data?.content?.body || "" }} />
            </div>
            
        </div>
    )
}


export const viewport = {
    themeColor: "#ffffff",
}
