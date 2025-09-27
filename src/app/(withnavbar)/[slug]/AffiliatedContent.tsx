"use client"

import Image from "next/image"
import Form from "./Form"
import Footer from "@/component/shared/footer/Footer"
import "../../../css/blogs//slugDesign.css"

interface AffiliatedContentProps {
  data: any
}

export default function AffiliatedContent({ data }: AffiliatedContentProps) {
  return (
    <>
      <div className="blog-detail-container">
        <div className="blog-body">
          <div className="blog-header">
            {data?.header_image?.url && (
              <Image
                src={data?.header_image?.url}
                fill
                priority
                alt="university header image"
                className="blog-header-image"
              />
            )}
          </div>
          <h1 className="blog-heading">{data?.name}</h1>
          <div className="blog-detail-container-body">
            <h4>{data?.description}</h4>
            <div
              dangerouslySetInnerHTML={{ __html: data?.content || "" }}
            />
          </div>
        </div>
        <div className="blog-form">
          <Form />
        </div>
      </div>

      <Footer />
    </>
  )
}
