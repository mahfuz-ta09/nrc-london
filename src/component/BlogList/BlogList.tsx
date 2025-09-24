'use client'
import Link from 'next/link'
import '../../css/component/Card.css'
import { Suspense, useState } from 'react'
import Loader from '../shared/loader/loader'
import { useGetBlogByCategoryQuery, useGetUniqueCatagoriesQuery } from '@/redux/endpoints/blogs/blogsEndpoint'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPen , faTag } from '@fortawesome/free-solid-svg-icons'
import Pagination from '../shared/Pagination/Pagination'


const BlogList = () => {
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
    return (
        (loadCategory||loadBlogs) ? <Loader /> :
        <div className='blog-list-container'>
            <div className="blog-tag-list">
                <button onClick={()=>setParams({...params,category: "all"})}  className={"all"===params.category?"blog-tag-item active":"blog-tag-item"}>all</button>
                {
                    category?.data?.map((category:string, index:number) => (
                        <button onClick={()=>setParams({...params,category: category})} key={index} className={category===params.category?"blog-tag-item active":"blog-tag-item"}>{category}</button>
                    ))
                }
            </div>
        
            <div className="blog-list">
                <Suspense fallback={<Loader/>}>
                    {
                        blogsData?.data?.map((blog:any, index:number) => (
                            <div key={index} className="card">
                                <div className="card-banner">
                                    <img src={blog?.meta?.ogImage?.url} alt="" />
                                    <div className="banner-text">
                                        <p className='banner-auther'><FontAwesomeIcon icon={faPen}/>{blog?.author}</p>
                                        <p className='banner-published'><FontAwesomeIcon icon={faList}/>{blog?.publishedAt}</p>
                                        <p className='banner-tags'><FontAwesomeIcon icon={faTag }/>{blog?.tags?.map((t:string,n:number)=>t)}</p>
                                    </div>
                                </div>
                                <div className="card-details">
                                    <Link className='card-details-title' href={`blogs/${blog?.slug}`}>{blog?.title.slice(0,140)}...</Link>
                                    <div className="bar"></div>
                                    <p className='card-details-description'>{blog?.description.slice(0,160)}...</p>
                                    <Link href={`blogs/${blog?.slug}`} className='learn-more'>learn more</Link>
                                </div>
                            </div>
                        ))
                    }
                </Suspense>
            </div>
            <Pagination
                totalPages={blogsData?.meta?.totalPages}
                currentPage={Number(params?.page)}
                onPageChange={handlePageChange}
                siblingCount={1} 
            />
        </div>
    )
}

export default BlogList
