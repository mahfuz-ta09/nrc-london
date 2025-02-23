'use client'
import '../../../css/additional/Review/Review.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faArrowAltCircleRight, faQuoteRight, faUser } from '@fortawesome/free-solid-svg-icons'
import { useGetPageReviewQuery } from '@/redux/endpoints/review/reviewEndpoints'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Loader from '@/component/shared/Loader/Loader'

const Review = () => {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [item] = useState(3)
    const { data, refetch, isLoading } = useGetPageReviewQuery({ page, item })


    useEffect(() => {
        refetch()
    }, [page, refetch])

    return (
        <div className='review-container'>
            <div className="review-content">
                
                <div className="review-header">
                    <div>
                        <h1>How our</h1> 
                        <h1>services look like?</h1>
                    </div>
                    <p>See what our customers have to say about their experience with us. Real feedback from real users!</p>
                    <button onClick={()=>router.push('/Comment')} className='review-comment'>View all</button>
                </div>

                {isLoading ? <Loader /> : (
                    <div className="comments">
                        {data?.data?.length > 0 ? (
                            data.data.map((review: any, index: number) => (
                                <div key={index} className={`comment ${index === 1 ? 'focus' : ''}`}>
                                    {review.image ? (
                                        <img className='comment-image' src={review.image} alt="User" />
                                    ) : (
                                        <FontAwesomeIcon className='comment-font' icon={faUser} />
                                    )}
                                    <div className="comment-body">
                                        <div className="comment-header">
                                            <h1>{review.name || review.email}</h1>
                                            <FontAwesomeIcon className={`qoutation ${index === 1 ? 'focus-icon' : ''}`} icon={faQuoteRight} />
                                        </div>
                                        <p className="comment-main">{review.review.slice(0,120)+'....' || "No comment exist!"}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No comments found!</p>
                        )}
                    </div>
                )}

                <div className="btn-group">
                    <button 
                        disabled={page <= 1} 
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    >
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    </button>
                    <button 
                        disabled={page >= data?.meta?.totalPages} 
                        onClick={() => setPage(prev => Math.min(prev + 1, data?.meta?.totalPages))}
                    >
                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Review
