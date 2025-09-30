import type { Metadata } from "next"
import Banner from "./Banner"
import AgentForm from "./AgentForm"
import "@/css/Proceed/Proceed.css"
import Footer from "@/component/shared/footer/Footer"

export const metadata: Metadata = {
  title: "Become an Agent | NRC Educational Consultants Ltd.",
  description:
    "Apply to become an official recruitment partner of NRC Educational Consultants Ltd. Join our global network and help students achieve their study abroad goals.",
  keywords: [
    "become agent",
    "recruitment partner",
    "educational consultancy",
    "NRC Educational Consultants",
  ],
  openGraph: {
    title: "Become an Agent | NRC Educational Consultants Ltd.",
    description:
      "Apply to become an official recruitment partner of NRC Educational Consultants Ltd. Join our global network and help students achieve their study abroad goals.",
    url: "https://www.yourdomain.com/become-agent",
    type: "website",
    images: [
      {
        url: "https://www.yourdomain.com/og-become-agent.jpg",
        width: 1200,
        height: 630,
        alt: "Become an agent - NRC",
      },
    ],
  },
  alternates: {
    canonical: "https://www.yourdomain.com/become-agent",
  },
}

export default function Page() {
  return (
    <>
      <div className="page-container">
        <Banner />
        <AgentForm />
        <Footer />
      </div>
    </>
  )
}
