"use client"
import Form from "./Form"
import Footer from "@/component/shared/footer/Footer"
import "../../../css/blogs/slugDesign.css"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons"

interface BlogContentProps {
  data: any
}

export default function BlogContent({ data }: BlogContentProps) {
    return (
      <>
        <div className="page-container">
          <div className="page-banner">
            <div className="banner-content">
              <div className="bread-crumb">
                  <Link className='bread-link1' href="/blogs">blogs</Link>
                  <div className="bread-dot"></div>
                  <Link className='bread-link2'  href="">details blog</Link>
              
              </div>
              {data?.meta?.ogImage?.url && (
                <img
                  src={data?.meta?.ogImage?.url}
                  alt="blog header image"
                  className="banner-image"
                />
              )}

            </div>
          </div>
          

            <div className="blog-detail">
              <h1>{data?.title}</h1>
              <p>{data?.publishedAt} By {data?.author}</p>
              
              <div className="like-dislike">
                <h5>{data?.stats?.views}<FontAwesomeIcon className="like-icon" icon={faEye}/></h5>
                <h5>{data?.stats?.likes}<FontAwesomeIcon className="like-icon" icon={faThumbsUp}/></h5>
              </div>
              <div className="blog-detail-container">
                <div className="blog-body">
                  <div className="blog-detail-container-body">
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
          </div>

        </div>

        <Footer />
      </>
    )
}
