"use client";
import { useState } from "react";
import Link from "next/link";
import '@/css/shared/CommentWithBlog/CommentWithBlog.css'

const CommentWithBlog = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            text: 'NRC helped me achieve my dream of studying in the UK. Their guidance throughout the visa process was exceptional and stress-free.',
            author: 'Sarah Ahmed, University of Manchester'
        },
        {
            text: 'From choosing the right university to landing in Canada, NRC was with me every step of the way. Highly recommend their services!',
            author: 'Rafiul Islam, University of Toronto'
        },
        {
            text: 'Professional, supportive, and knowledgeable. NRC made my journey to Australia smooth and successful. Thank you!',
            author: 'Nusrat Jahan, Monash University'
        },
        {
            text: 'The team at NRC went above and beyond to help me secure admission to my dream university in the USA. Forever grateful!',
            author: 'Mehedi Hasan, Boston University'
        },
        {
            text: 'Best consultancy for international education! They handled everything from applications to accommodation. Excellent service!',
            author: 'Tasnim Rahman, University of Melbourne'
        },
    ];

    const visibleCount = 3; // Number of cards visible at once
    const maxIndex = Math.max(0, testimonials.length - visibleCount);

    const onPrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const onNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    // Get the visible testimonials based on current index
    const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + visibleCount);

    return (
        <section className="prefooter-section">
            <div className="testimonial-container">
                <h2 className="section-title">What Our Students Say</h2>
                <div className="testimonial-cards">
                    <button 
                        className="nav-btn" 
                        onClick={onPrev}
                        disabled={currentIndex === 0}
                        aria-label="Previous testimonials"
                    >
                        ‹
                    </button>
                    
                    <div className="testimonial-list">
                        {visibleTestimonials.map((testimonial, idx) => (
                            <div 
                                className="testimonial-card" 
                                key={currentIndex + idx}
                                style={{
                                    animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`
                                }}
                            >
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                <span className="testimonial-author">— {testimonial.author}</span>
                            </div>
                        ))}
                    </div>
                    
                    <button 
                        className="nav-btn" 
                        onClick={onNext}
                        disabled={currentIndex >= maxIndex}
                        aria-label="Next testimonials">
                        ›
                    </button>
                </div>


                <div className="testimonial-dots">
                    {Array.from({ length: testimonials.length - visibleCount + 1 }, (_, i) => (
                        <button
                            key={i}
                            className={`dot ${currentIndex === i ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
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
                    <p>Partner with us to help students achieve their dreams and grow your consultancy network.</p>
                    <Link href="/affiliated-university" className="cta-btn">
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CommentWithBlog;