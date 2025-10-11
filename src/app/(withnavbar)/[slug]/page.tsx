import type { Metadata } from "next"
import BlogContent from "./BlogContent"
import { notFound } from "next/navigation"
import AffiliatedContent from "./AffiliatedContent"
import UniversityContent from "./UniversityContent"

const status = "published"
let api = process.env.NEXT_PUBLIC_APP_ENV==='LOCAL'? process.env.NEXT_PUBLIC_LOCAL_API : process.env.NEXT_PUBLIC_DEPLOYED_API

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    
    const [blogRes, uniRes, countryRes] = await Promise.all([
        fetch(`${api}/blog/single/${slug}/${status}`, {
            cache: "no-store",
        }),
        fetch(`${api}/affiliated-uni/single/${slug}`, {
            cache: "no-store",
        }),
        fetch(`${api}/country/unique/${slug}`, {
            cache: "no-store",
        }),
    ])

    const [blog, uni, country] = await Promise.all([blogRes.json(), uniRes.json(), countryRes.json()])
    
    if (country?.data?.type === "study-option") {
        return {
            title: country?.data?.meta_title || "Study Abroad",
            description: blog?.data?.meta_description || "",
            openGraph: {
                title: blog?.data?.meta_title,
                description: blog?.data?.meta_description,
                images: blog?.data?.famousFile?.url
                ? [{ url: blog?.data?.famousFile?.url }]
                : [],
            },
            twitter: {
                card: "summary_large_image",
                title: blog?.data?.meta_title,
                description: blog?.data?.meta_description,
                images: blog?.data?.famousFile?.url
                ? [blog?.data?.famousFile?.url]
                : [],
            },
        }
    }


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

    const [blogRes, uniRes, countryRes] = await Promise.all([
        fetch(`${api}/blog/single/${slug}/${status}`, {
            cache: "no-store",
        }),
        
        fetch(`${api}/affiliated-uni/single/${slug}`, {
            cache: "no-store",
        }),
        
        fetch(`${api}/country/unique/${slug}`, {
            cache: "no-store",
        }),
    ])

    const [blog, uni, country] = await Promise.all([blogRes.json(), uniRes.json(), countryRes.json()])

    if (blog?.data?.type === "blog") {
        return <BlogContent data={blog.data} />
    }

    if (uni?.data?.type === "affiliated") {
        return <AffiliatedContent data={uni.data} />
    }
    
    if (country?.data?.type === "study-option") {
        return <UniversityContent data={country.data}/>
    }


    notFound()
}
