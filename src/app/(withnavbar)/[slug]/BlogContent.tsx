"use client"
import Form from "./Form"
import Footer from "@/component/shared/footer/Footer"
import "../../../css/blogs/slugDesign.css"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import AcademicSolution from "@/component/shared/academicsolution/AcademicSolution"

interface BlogContentProps {
  data: any
}

export default function BlogContent({ data }: BlogContentProps) {

    return (
        <div className="page-container">
          <div className="page-banner">
            <div className="banner-content">
              <div className="bread-crumb">
                  <Link className='bread-link1' href="/blogs">blogs</Link>
                  <div className="bread-dot"></div>
                  <Link className='bread-link2'  href="">details blog</Link>
              
              </div>

            </div>
          </div>
          
              <div className="blog-detail-container">
                
                <div className="blog-body">
                  <div className="blog-detail-container-body">
                      {data?.meta?.ogImage?.url && (
                        <img
                          src={data?.meta?.ogImage?.url}
                          alt="blog header image"
                          className="body-image"
                        /> )}

                      <h1>{data?.title}</h1>
                      <p>{data?.publishedAt}</p>
                      <h4>{data?.content?.summary}</h4>
                      
                      <div dangerouslySetInnerHTML={{ __html: data?.content || "" }}/>
                  </div>
                </div>
                <div className="blog-info-part">
                  <Form />
                  <AcademicSolution/>
                </div>
              </div>

        <Footer />
        </div>

    )
}
