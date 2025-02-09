'use client'
import '../../../css/additional/Review/Review.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight, faUser } from '@fortawesome/free-solid-svg-icons'
import { useGetPageReviewQuery } from '@/redux/endpoints/review/reviewEndpoints'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Loader from '@/component/shared/Loader/Loader'


const Review = () => {
    const router = useRouter()
    const [page,setPage] = useState(1)
    const [item,setItem] = useState(3)
    const { data , isLoading } = useGetPageReviewQuery({page,item})

    

    return (
        <div className='review-container'>
            <div className="review-content">
                <img className='top-image' src='https://i.ibb.co.com/PTJW3jY/Green-Beige-Aesthetic-Leaves-Illustration-Background-Instagram-Story-removebg-preview.png' />
                <div className="review-header">
                    <div>
                        <h1>How our</h1> 
                        <h1>services look like?</h1>
                    </div>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis culpa laborum vero iusto aspernatur blanditiis in cumque debitis voluptatem fugiat.</p>
                    <button onClick={(()=>router.push('/Comment'))} className='review-comment'>view all</button>
                </div>
                    {
                        // isLoading ? <p className='loading'>Loading...</p> : 
                        isLoading ? <Loader /> : 
                        
                        <div className="comments">
                            <div className='comment'>
                            {data?.data[0]?.url ? <img src={data?.data[0]?.url} alt="" /> :<FontAwesomeIcon className='comment-image' icon={faUser}/>}
                                <div className="comment-body">
                                    <div className="comment-header">
                                        <h1>{data?.data[0]?.name || data?.data[0]?.email}</h1>
                                        <FontAwesomeIcon className='qoutation' icon={faQuoteRight}/>
                                    </div>
                                    <p className="comment-main">
                                        {data?.data[0]?.comment ? data?.data[0]?.comment : "No comment exist!"}
                                    </p>
                                </div>
                            </div>
                        

                            <div className='comment focus'>
                            {data?.data[1]?.url ? <img src={data?.data[1]?.url} alt="" /> :<FontAwesomeIcon className='comment-image' icon={faUser}/>}
                                <div className="comment-body">
                                    <div className="comment-header">
                                        <h1>{data?.data[1]?.name || data?.data[1]?.email}</h1>
                                        <FontAwesomeIcon className='qoutation focus-icon' icon={faQuoteRight}/>
                                    </div>
                                    <p className="comment-main">
                                        {data?.data[1]?.comment ? data?.data[1]?.comment : "No comment exist!"}
                                    </p>
                                </div>
                            </div>

                            <div className='comment'>
                            {data?.data[2]?.url ? <img src={data?.data[2]?.url} alt="" /> :<FontAwesomeIcon className='comment-image' icon={faUser}/>}
                                <div className="comment-body">
                                    <div className="comment-header">
                                        <h1>{data?.data[2]?.name || data?.data[2]?.email}</h1>
                                        <FontAwesomeIcon className='qoutation' icon={faQuoteRight}/>
                                    </div>
                                    <p className="comment-main">
                                        {data?.data[2]?.comment ? data?.data[2]?.comment : "No comment exist!"}
                                    </p>
                                </div>
                            </div>
                        </div>

                    }
                    <div className="btn-group">
                        <button onClick={()=>setPage(page>1 ? page-1 : page)}>prv</button>
                        <button onClick={()=>setPage(page<data?.meta?.totalPages ? page+1 : page)}>nxt</button>
                    </div>
            </div>
        </div>
    )
}

export default Review