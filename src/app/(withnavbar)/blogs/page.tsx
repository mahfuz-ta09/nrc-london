import { Metadata } from 'next'
import { Suspense } from 'react'
import Loader from '@/component/shared/loader/loader'
import BlogList from './BlogList'
import Footer from '@/component/shared/footer/Footer'
import Link from 'next/link'



export const metadata:Metadata = {
    title: "All Blogs | NRC Educational Consultants Ltd.",
    description: "Explore all blogs from NRC Educational Consultants Ltd. Discover insights, guides, and updates on education, courses, and learning.",
    openGraph: {
        title: "All Blogs | NRC Educational Consultants Ltd.",
        description: "Explore all blogs from NRC Educational Consultants Ltd. Discover insights, guides, and updates on education, courses, and learning.",
        url: "https://www.nrcedu-uk.com/blogs",
        images: [
        {
            url: "https://www.nrcedu-uk.com/og-image.png",
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
        images: ["https://www.nrcedu-uk.com/og-image.png"],
    },
}


const page = () => {
    return (
        <div className="page-container">
            <div className="page-banner">
                <div className="banner-content">
                    <div className="bread-crumb">
                        <Link className='bread-link1' href="/">home</Link>
                        <div className="bread-dot"></div>
                        <Link className='bread-link2'  href="/blogs">blogs</Link>
                    </div>
                    <h1>Blogs</h1>
                    <p>The world is a book, and those who do not travel read only one page. Education 
                        abroad helps you read the entire story, one experience at a time.</p>
                    <Link className="banner-link" href='/proceed'>apply now</Link>
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
