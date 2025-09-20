'use client'
import "@/css/additional/Review/allReview.css"
import Footer from "@/component/shared/Footer/Footer"
import { useGetALlReviewQuery } from "@/redux/endpoints/review/reviewEndpoints"
import { useState } from "react"
import Pagination from "@/component/shared/Pagination/Pagination"
import Loader from "@/component/shared/Loader/Loader"

type paraType = {
    email: string,
    name: string,
    page: number,
    limit: number
}

const ReviewPage = () => {
    const [para,setPara] = useState<paraType>({
            email:'',
            name:'',
            page:1,
            limit:100
        })
    const { data, isLoading } = useGetALlReviewQuery(para)

    const handlePageChange = (p: number) => {
        setPara({
            ...para,
            page : p
        })
    }

    if(isLoading) return <Loader />

    return (
        <div className="review-page">
            <div className="banner">
                <h1>An Overview of Our Services</h1>
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

                <Pagination
                    totalPages={data?.meta?.totalPages}
                    currentPage={Number(para?.page)}
                    onPageChange={handlePageChange}
                    siblingCount={1}/>
            </div>
            <Footer />
        </div>
    )
}

export default ReviewPage
