import { Metadata } from 'next'
import { Suspense } from 'react'
import style from '../../../css/blogs/mainBlogPage.module.css'
import Loader from '@/component/shared/Loader/Loader'
import BlogList from '@/component/BlogList/BlogList'
import Footer from '@/component/shared/Footer/Footer'


export const metadata:Metadata = {
    title: "All Blogs | NRC Educational Consultants Ltd.",
    description: "Explore all blogs from NRC Educational Consultants Ltd. Discover insights, guides, and updates on education, courses, and learning.",
    openGraph: {
        title: "All Blogs | NRC Educational Consultants Ltd.",
        description: "Explore all blogs from NRC Educational Consultants Ltd. Discover insights, guides, and updates on education, courses, and learning.",
        url: "https://www.nrcedu-uk.com/Blogs",
        images: [
        {
            url: "https://yoursite.com/og-image.png",
            width: 1200,
            height: 630,
            alt: "NRC Educational Consultants Ltd. Blogs",
        },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "All Blogs | NRC Educational Consultants Ltd.",
        description: "Explore all blogs from NRC Educational Consultants Ltd. Discover insights, guides, and updates on education, courses, and learning.",
        images: ["https://yoursite.com/og-image.png"],
    },
}

const page = () => {
    return (
        <div className="blog-page-container">
            <div className="blog-page-header">
                <div className="blog-header-content">
                    <h1>Read Our blogs</h1>
                    <p>To stay updated</p>
                </div>
            </div>
            <div className="blog-page-body">
                <Suspense fallback={<Loader />}>
                    <BlogList />
                </Suspense>
            </div>
            <Footer />
        </div>
    )
}

 
export default page
