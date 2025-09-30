import Banner from "./Banner"
import type { Metadata } from "next"
import "@/css/Proceed/Proceed.css"
import ProceedForm from "./ProceedForm"
import Footer from "@/component/shared/footer/Footer"

export const metadata: Metadata = {
    title: "Student Registration | Spectrum Education Consultancy",
    description:
        "Register now to start your journey toward studying abroad with Spectrum Education Consultancy. Complete the student registration form and we'll guide you through every step.",
    openGraph: {
        title: "Student Registration | Spectrum Education Consultancy",
        description:
        "Register now to start your journey toward studying abroad with Spectrum Education Consultancy.",
        url: "https://nrcedu-uk.com/proceed",
        type: "website",
        images: [
        {
            url: "https://nrcedu-uk.com/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Spectrum Education Consultancy",
        },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Student Registration | Spectrum Education Consultancy",
        description:
        "Register now to start your journey toward studying abroad with Spectrum Education Consultancy.",
        images: ["https://nrcedu-uk.com/og-image.jpg"], 
    },
    alternates: {
        canonical: "https://nrcedu-uk.com/proceed",
    },
}

export default function Page() {
    return (
        <div className="page-container">
            <Banner />
            <ProceedForm />
            <Footer />
        </div>
    )
}
