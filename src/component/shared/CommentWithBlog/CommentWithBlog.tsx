"use client";
import Link from "next/link";
import { useState } from "react";
import '@/css/shared/CommentWithBlog/CommentWithBlog.css'
import { useGetPageReviewQuery } from "@/redux/endpoints/review/reviewEndpoints";
import { useRouter } from "next/navigation";

const CommentWithBlog = () => {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [item] = useState(3)
    const { data, refetch, isLoading } = useGetPageReviewQuery({ page, item })
    const [currentIndex, setCurrentIndex] = useState(0);

    console.log(data)

    return (
        <section className="prefooter-section">
            <div className="testimonial-container">
                <h2 className="section-title">What Our Students Say</h2>
                <div className="testimonial-cards">
                    <button 
                        className="nav-btn" 
                        disabled={page <= 1} 
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        aria-label="Previous testimonials"
                    >
                        ‹
                    </button>
                    
                    <div className="testimonial-list">
                        {data?.data?.map((testimonial:any, idx:number) => (
                            <div 
                                className="testimonial-card" 
                                key={currentIndex + idx}
                                style={{
                                    animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`
                                }}
                            >
                                <p className="testimonial-text">"{testimonial?.review}"</p>
                                <span className="testimonial-author">— {testimonial?.name},</span>
                                <span style={{fontSize:'15px',fontWeight:'400',textTransform:'none'}} className="testimonial-author">{testimonial?.email}</span>
                            </div>
                        ))}
                    </div>
                    
                    <button 
                        className="nav-btn" 
                        disabled={page >= data?.meta?.totalPages} 
                        onClick={() => setPage(prev => Math.min(prev + 1, data?.meta?.totalPages))}
                        aria-label="Next testimonials">
                        ›
                    </button>
                </div>
                    <button 
                        className={`testimonial-dots`}
                        onClick={()=>router.push('/comment')}
                    >see all
                    </button>
                {/* <div className="testimonial-dots">
                    {Array.from({ length: testimonials.length - visibleCount + 1 }, (_, i) => (
                        <button
                            key={i}
                            className={`dot ${currentIndex === i ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div> */}
            </div>

            <div className="cta-sections">
                <div className="cta-box">
                    <h3>Still not clear? Read Our Blogs</h3>
                    <p>Stay informed with expert tips, student stories, and the latest updates on studying abroad.</p>
                    <Link href="/blogs" className="cta-btn">
                        Visit Blog
                    </Link>
                </div>
                <div className="cta-box">
                    <h3>Look Who We're Partnered With</h3>
                    <p>
                    We have partnered with many organizations to ensure a seamless experience for students and professionals who are building their careers abroad.
                    </p>
                    <Link href="/affiliated-university" className="cta-btn">
                    Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CommentWithBlog;