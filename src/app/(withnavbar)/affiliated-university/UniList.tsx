'use client'
import Link from 'next/link'
import { Suspense } from 'react'
import '../../../css/component/Card.css'
import Loader from '@/component/shared/loader/loader'
import { faPen} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetUniAgentsQuery } from '@/redux/endpoints/affiliatedUni/affiliatedUni'

const BlogList = () => {
    const { data: blogsData, isLoading: loadBlogs } = useGetUniAgentsQuery()

    return (
        (loadBlogs) ? <Loader /> :
        <div className='blog-list-container'>
            <div className="blog-list">
                <Suspense fallback={<Loader/>}>
                    {
                        blogsData?.data?.map((blog:any, index:number) => (
                            <div key={index} className="card">
                                <div className="card-banner">
                                    <img src={blog?.header_image?.url} alt="" />
                                    <div className="banner-text">
                                        <p className='banner-auther'><FontAwesomeIcon icon={faPen}/>{blog?.location}</p>
                                    </div>
                                </div>
                                <div className="card-details">
                                    <Link className='card-details-title' href={`/${blog?.slug}`}>{blog?.name}</Link>
                                    <div className="bar"></div>
                                    <p className='card-details-description'>{blog?.description?.slice(0,160)}...</p>
                                    <Link href={`/${blog?.slug}`} className='learn-more'>learn more</Link>
                                </div>
                            </div>
                        ))
                    }
                </Suspense>
            </div>
        </div>
    )
}

export default BlogList
