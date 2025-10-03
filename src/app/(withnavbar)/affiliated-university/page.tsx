import { Metadata } from 'next'
import { Suspense } from 'react'
import Loader from '@/component/shared/loader/loader'
import UniList from './UniList'
import Footer from '@/component/shared/footer/Footer'
import Link from 'next/link'


export const metadata:Metadata = {
    title: "Affiliated University | NRC Educational Consultants Ltd.",
    description: "Explore all blogs from NRC Educational Consultants Ltd. Discover insights, guides, and updates on education, courses, and learning.",
    openGraph: {
        title: "Affiliated University | NRC Educational Consultants Ltd.",
        description: "Explore all blogs from NRC Educational Consultants Ltd. Discover insights, guides, and updates on education, courses, and learning.",
        url: "https://www.nrcedu-uk.com/affiliated-university",
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
        title: "Affiliated University | NRC Educational Consultants Ltd.",
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
                        <Link className='bread-link2'  href="/affiliated-university">affiliated university details</Link>
                    </div>
                    <h1>Official Representatives in Bangladesh</h1>
                    <div className="title-decoration"></div>
                    <p>
                        Partnering with globally recognized universities, our trusted agents in Bangladesh 
                        guide students through every step — from choosing the right program to a successful admission.
                    </p>
                    <Link className="banner-link" href='/proceed'>apply now</Link>
                </div>
            </div>
            
            <div className="blog-page-body">
                <Suspense fallback={<Loader />}>
                    <UniList />
                </Suspense>
            </div>
            <Footer />
        </div>
    )
}

 
export default page
