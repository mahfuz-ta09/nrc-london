"use client"

import Image from "next/image"
import Form from "./Form"
import Footer from "@/component/shared/footer/Footer"
import "../../../css/blogs//slugDesign.css"

interface BlogContentProps {
  data: any
}

export default function BlogContent({ data }: BlogContentProps) {
  return (
    <>
      <div className="blog-detail-container">
        <div className="blog-body">
          <div className="blog-header">
            {data?.meta?.ogImage?.url && (
              <Image
                src={data?.meta?.ogImage?.url}
                fill
                priority
                alt="blog header image"
                className="blog-header-image"
              />
            )}
          </div>
          <h1 className="blog-heading">{data?.title}</h1>
          <div className="blog-detail-container-body">
            <p>
              <em>
                {data?.publishedAt} By {data?.author}
              </em>
            </p>
            <h4>{data?.content?.summary}</h4>
            <div
              dangerouslySetInnerHTML={{ __html: data?.content?.body || "" }}
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
