'use client'
import { useState } from 'react'
import '../../css/blogs/mainBlogPage.css'
import Loader from '../shared/Loader/Loader'
import { useGetBlogByCategoryQuery, useGetUniqueCatagoriesQuery } from '@/redux/endpoints/blogs/blogsEndpoint'
import Link from 'next/link'

const BlogList = () => {
    const [params,setParams] = useState({category: 'all', page:1, limit:10})
    const {data:category , isLoading: loadCategory} = useGetUniqueCatagoriesQuery()
    const { data: blogsData, isLoading: loadBlogs } = useGetBlogByCategoryQuery(params)
    
    
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
                {
                    blogsData?.data?.map((blog:any, index:number) => (
                        <div key={index} className="blog-card">
                            <div className="meta">
                                <div className="photo" style={{backgroundImage:`url(${blog?.meta?.ogImage?.url})`}}></div>
                                <ul className="details">
                                    <li className="author"><a>{blog?.author}</a></li>
                                    <li className="date">{blog?.publishedAt}</li>
                                    <li className="tags">
                                        <ul>
                                            {
                                                blog?.tags?.map((tag:string, idx:number) => (
                                                    <li key={idx}><a>{tag}</a></li>
                                                ))
                                            }
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="description">
                                <h1><Link href={`/Blogs/${blog?.slug}`}>{blog?.title}</Link></h1>
                                <h2>{blog?.slug}</h2>
                                <p>{blog?.meta?.ogDescription.slice(0,180)}...</p>
                                <p className="read-more">
                                    <Link href={`/Blogs/${blog?.slug}`}>Read More</Link>
                                </p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default BlogList
