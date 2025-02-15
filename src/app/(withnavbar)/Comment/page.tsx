'use client'
import { useGetALlReviewQuery } from "@/redux/endpoints/review/reviewEndpoints"
import "@/css/additional/Review/allReview.css"
import Footer from "@/component/shared/Footer/Footer";

const ReviewPage = () => {
    const { data, isLoading } = useGetALlReviewQuery();

    return (
        <div className="review-page">
            <div className="banner">
                <h1>What Our Students Say</h1>
            </div>

            <div className="reviews-container wdth">
                {isLoading ? (
                    <p className="loading">Loading reviews...</p>
                ) : (
                    <div className="reviews-grid">
                        {data?.data?.length ? (
                            data.data.map((review:any, index:number) => (
                                <div key={index} className="review-card">
                                    <img src={review.image || "/default-user.png"} alt="User" className="user-image" />
                                    <h3>{review.name || review.email}</h3>
                                    <p>"{review.review || "No comment available."}"</p>
                                </div>
                            ))
                        ) : (
                            <p className="no-comments">No reviews yet.</p>
                        )}
                    </div>
                )}

                
            </div>
            <Footer />
        </div>
    )
}

export default ReviewPage
