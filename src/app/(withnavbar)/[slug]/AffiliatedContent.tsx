"use client"
import Form from "./Form"
import Footer from "@/component/shared/footer/Footer"
import "../../../css/blogs//slugDesign.css"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import AcademicSolution from "@/component/shared/academicsolution/AcademicSolution"

interface AffiliatedContentProps {
  data: any
}

export default function AffiliatedContent({ data }: AffiliatedContentProps) {
  console.log(data)
  return (
    <>
      <div className="page-container">
        <div className="page-banner">
          <div className="banner-content">
            <div className="bread-crumb">
                <Link className='bread-link1' href="/affiliated-university">agents in bangladesh</Link>
                <div className="bread-dot"></div>
                <Link className='bread-link2'  href="">affiliated university details</Link>
            
            </div>
            </div>
        </div>

          
          <div className="blog-detail-container">
            
            <div className="blog-body">
                  <div className="blog-detail-container-body">
                {data?.header_image?.url && (
                    <img
                    src={data?.header_image?.url}
                      alt="blog header image"
                      className="body-image"
                  />
                )}
                <h4>{data?.location}</h4>
                <h4>{data?.name}</h4>
                <div dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
            </div>
            </div>

            <div className="blog-info-part">
              <Form />
              <AcademicSolution/>
            </div>
          
          </div>

        <Footer />
      </div>
    </>
  )
}
