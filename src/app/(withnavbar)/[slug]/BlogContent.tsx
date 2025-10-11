"use client"
import Link from "next/link"
import "../../../css/blogs/slugDesign.css"
import SideForm from "@/component/ui/faq/SideForm"
import Footer from "@/component/shared/footer/Footer"
import SideInfo from "../../../component/ui/faq/SideInfo"

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
                  <Link className='bread-link2'  href="">blog details</Link>
              
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
                  <SideForm />
                  <SideInfo />
                </div>
          </div>

          <Footer />
        </div>

    )
}
