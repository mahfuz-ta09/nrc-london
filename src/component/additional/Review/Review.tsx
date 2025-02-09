'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../css/additional/Review/Review.css'
import { faQuoteRight, faUser } from '@fortawesome/free-solid-svg-icons'
import { useGetPageReviewQuery } from '@/redux/endpoints/review/reviewEndpoints'
import { useState } from 'react'


const Review = () => {
    const [page,setPage] = useState(1)
    const [item,setItem] = useState(3)
    const { data , isLoading } = useGetPageReviewQuery({page,item})

    console.log(data)

    return (
        <div className='review-container'>
            <div className="review-content">
                <img className='top-image' src='https://i.ibb.co.com/PTJW3jY/Green-Beige-Aesthetic-Leaves-Illustration-Background-Instagram-Story-removebg-preview.png' />
                <div className="review-header">
                    <div>
                        <h1>What our</h1> 
                        <h1>students says</h1>
                    </div>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis culpa laborum vero iusto aspernatur blanditiis in cumque debitis voluptatem fugiat.</p>
                    <button className='review-comment'>view all</button>
                </div>
                    {
                        isLoading ? <p>Loading...</p> : 
                        
                        <div className="comments">
                            <div className='comment'>
                                <FontAwesomeIcon className='comment-image' icon={faUser}/>
                                <div className="comment-body">
                                    <div className="comment-header">
                                        <h1>{data?.data[0]?.name || data?.data[0]?.email}</h1>
                                        <FontAwesomeIcon className='qoutation' icon={faQuoteRight}/>
                                    </div>
                                    <p className="comment-main">
                                        {data?.data[0]?.comment}
                                    </p>
                                </div>
                            </div>
                        

                            <div className='comment focus'>
                                <FontAwesomeIcon className='comment-image' icon={faUser}/>
                                <div className="comment-body">
                                    <div className="comment-header">
                                        <h1>{data?.data[1]?.name || data?.data[1]?.email}</h1>
                                        <FontAwesomeIcon className='qoutation focus-icon' icon={faQuoteRight}/>
                                    </div>
                                    <p className="comment-main">
                                        
                                    {data?.data[1]?.comment}
                                    </p>
                                </div>
                            </div>

                            <div className='comment'>
                                <FontAwesomeIcon className='comment-image' icon={faUser}/>
                                <div className="comment-body">
                                    <div className="comment-header">
                                        <h1>{data?.data[2]?.name || data?.data[2]?.email}</h1>
                                        <FontAwesomeIcon className='qoutation' icon={faQuoteRight}/>
                                    </div>
                                    <p className="comment-main">
                                    {data?.data[2]?.comment}
                                    </p>
                                </div>
                            </div>
                        </div>

                    }
            </div>
        </div>
    )
}

export default Review