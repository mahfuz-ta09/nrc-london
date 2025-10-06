'use client'
import Link from 'next/link'
import '../../../css/component/Card.css'
import { Suspense, useState } from 'react'
import Loader from '@/component/shared/loader/loader'
import Pagination from '@/component/shared/Pagination/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPen , faTag } from '@fortawesome/free-solid-svg-icons'
import { useGetBlogByCategoryQuery, useGetUniqueCatagoriesQuery } from '@/redux/endpoints/blogs/blogsEndpoint'
import { useRouter } from 'next/navigation'
import ServicesSection from '@/component/shared/academicsolution/AcademicSolution'




const BlogList = () => {
    const router = useRouter()
    const [params,setParams] = useState({category: 'all', page:1, limit:10})
    const { data:category , isLoading: loadCategory} = useGetUniqueCatagoriesQuery()
    const { data: blogsData, isLoading: loadBlogs } = useGetBlogByCategoryQuery(params)

    if (!blogsData?.data || !category?.data) {
        return <Loader />
    }

    const handlePageChange = (p: number) => {
        setParams({
            ...params,
            page : p
        })
    }
console.log(blogsData)
    return (
        (loadCategory||loadBlogs) ? <Loader /> :
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
                                            <span>{blog?.publishedAt}</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                                <line x1="3" y1="10" x2="21" y2="10"></line>
                                            </svg>
                                        </div>

                                        <div className="meta-item">
                                            <span>{blog?.stats?.views}</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        </div>

                                        <div className="meta-item">
                                            <span>{blog?.stats?.commentsCount}</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                            </svg>
                                        </div>

                                        <div className="meta-item">
                                            <span>{blog?.author}</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                            
                            <div className="blog-content">
                            <div className="blog-image">
                                <img
                                    src={blog?.meta?.ogImage?.url}
                                    alt="blog image"
                                />
                            </div>

                            <div className="blog-text">
                                <h2 onClick={()=>router.push(`/${blog?.slug}`)} className="blog-title">
                                    {blog?.title?.slice(0,60)}...
                                </h2>

                                <p className="blog-description">
                                    {blog?.description.slice(0,90)}...
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
                <Pagination
                    totalPages={blogsData?.meta?.totalPages}
                    currentPage={Number(params?.page)}
                    onPageChange={handlePageChange}
                    siblingCount={1} 
                />
            </div>
            
            <div className='blogs-side'>
                <div className="blog-tag-list">
                    <button onClick={()=>setParams({...params,category: "all"})}  className={"all"===params.category?"blog-tag-item active":"blog-tag-item"}>all</button>
                    {
                        category?.data?.map((category:string, index:number) => (
                            <button onClick={()=>setParams({...params,category: category})} key={index} className={category===params.category?"blog-tag-item active":"blog-tag-item"}>{category}</button>
                        ))
                    }
                </div>
                
                <ServicesSection />
            </div>
        </div>
    )
}

export default BlogList

