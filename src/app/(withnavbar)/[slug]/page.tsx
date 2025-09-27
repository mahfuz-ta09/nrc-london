import type { Metadata } from "next"
import { notFound } from "next/navigation"
import AffiliatedContent from "./AffiliatedContent"
import BlogContent from "./BlogContent"

const status = "published"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params

    const [blogRes, uniRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_DEPLOYED_API}/blog/single/${slug}/${status}`, {
            cache: "no-store",
        }),
        fetch(`${process.env.NEXT_PUBLIC_DEPLOYED_API}/affiliated-uni/single/${slug}`, {
            cache: "no-store",
        }),
    ])

    const [blog, uni] = await Promise.all([blogRes.json(), uniRes.json()])

    if (blog?.data?.type === "blog") {
        return {
        title: blog?.data?.title || "Blog",
        description: blog?.data?.content?.summary || "",
        openGraph: {
            title: blog?.data?.meta?.ogTitle,
            description: blog?.data?.meta?.ogDescription,
            images: blog?.data?.meta?.ogImage?.url
            ? [{ url: blog?.data.meta.ogImage.url }]
            : [],
        },
        twitter: {
            card: "summary_large_image",
            title: blog?.data?.meta?.ogTitle,
            description: blog?.data?.meta?.ogDescription,
            images: blog?.data?.meta?.ogImage?.url
            ? [blog?.data?.meta?.ogImage?.url]
            : [],
        },
        }
    }

    if (uni?.data?.type === "affiliated") {
        return {
        title: uni?.data?.name || "Affiliated University",
        description: uni?.data?.description || "",
        openGraph: {
            title: uni?.data?.meta_title,
            description: uni?.data?.meta_description,
            images: uni?.data?.header_image?.url
            ? [{ url: uni?.data?.header_image?.url }]
            : [],
        },
        twitter: {
            card: "summary_large_image",
            title: uni?.data?.meta_title,
            description: uni?.data?.meta_description,
            images: uni?.data?.header_image?.url
            ? [uni?.data?.header_image?.url]
            : [],
        },
        }
    }

    return {
        title: "Not Found",
        description: "The requested content could not be found",
    }
}


export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const [blogRes, uniRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_DEPLOYED_API}/blog/single/${slug}/${status}`, {
            cache: "no-store",
        }),
        fetch(`${process.env.NEXT_PUBLIC_DEPLOYED_API}/affiliated-uni/single/${slug}`, {
            cache: "no-store",
        }),
    ])

    const [blog, uni] = await Promise.all([blogRes.json(), uniRes.json()])

    if (blog?.data?.type === "blog") {
        return <BlogContent data={blog.data} />
    }

    if (uni?.data?.type === "affiliated") {
        return <AffiliatedContent data={uni.data} />
    }


    notFound()
}
