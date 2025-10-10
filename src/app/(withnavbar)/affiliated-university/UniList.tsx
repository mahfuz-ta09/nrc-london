'use client'
import { Suspense } from 'react'
import '../../../css/component/Card.css'
import { useRouter } from 'next/navigation'
import SideInfo from '@/component/ui/faq/SideInfo'
import Loader from '@/component/shared/loader/loader'
import { useGetUniAgentsQuery } from '@/redux/endpoints/affiliatedUni/affiliatedUni'

const BlogList = () => {
    const router = useRouter()
    const { data: blogsData, isLoading: loadBlogs } = useGetUniAgentsQuery()
    
    
    
    return (
        (loadBlogs) ? <Loader /> :
        <div className='blog-list-container'>
            <div className="blog-list">
                <Suspense fallback={<Loader/>}>
                    {
                        blogsData?.data?.map((blog:any, index:number) => (
                        <div key={blog?._id} className="blog-card-wrapper">
                            <div className="blog-card">
                                <div className="blog-sidebar">
                                    <div className="categories">
                                        {blog?.categories?.join(", ")}
                                    </div>

                                    <div className="meta-info">
                                        <div className="meta-item">
                                            <span>{blog?.location}</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                            
                            <div className="blog-content">
                            <div className="blog-image">
                                <img
                                    src={blog?.header_image?.url}
                                    alt="university image"
                                />
                            </div>

                            <div className="blog-text">
                                <h2 onClick={()=>router.push(`/${blog?.slug}`)} className="blog-title">
                                    {blog?.name?.slice(0,60)}...
                                </h2>

                                <p className="blog-description">
                                    {blog?.meta?.meta_description.slice(0,90)}...
                                </p>

                                <button onClick={()=>router.push(`/${blog?.slug}`)} className="view-more-btn">
                                    details
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>

                        ))
                    }
                </Suspense>
            </div>
            
            <div className='blogs-side'>
                
                <SideInfo />
            </div>
        </div>
    )
}

export default BlogList
