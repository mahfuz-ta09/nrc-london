"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../loader/loader";
import '@/css/shared/Unioption/UniOption.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetUniNavItemQuery } from "@/redux/endpoints/university/universityEndpoints";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";


const UniOption = () => {
    const router = useRouter();
    const { data , isLoading } = useGetUniNavItemQuery()
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
        setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
        const walk = x - startX;
        if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
        setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
        const walk = x - startX;
        if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleTouchEnd = () => setIsDragging(false);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
        const scrollAmount = 350;
        scrollContainerRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
        }
    };

    return (
        <section className="unioption-container">
            <div className="unioption-header">
                <h4 className="option-subtitle">🌍 Study Abroad</h4>
                <h2 className="home-text-header">
                    Choose Your <span style={{color:"#008080"}}>Study Destination</span>
                </h2>
                <p className="unioption-description">
                    Explore top countries offering world-class education, vibrant cultures, and global career opportunities.
                    Your academic journey starts here.
                </p>
            </div>
            
            <div className="uni-nav">
                <button onClick={() => scroll("left")} className="uni-nav-btn">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                </button>
                <button onClick={() => scroll("right")} className="uni-nav-btn">
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </button>
            </div>
            <div
                className="uni-carousel"
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
                {isLoading ? (
                <Loader />
                ) : (
                data?.data?.map((option: any) => (
                    <div key={option.country} className="uni-card">
                        <img className="uni-image" src={option.image} alt={option.country} />
                        <img className="uni-flag" src={option.flag} alt={`${option.country} flag`} />
                        <div className="uni-overlay"></div>
                        <div className="uni-details">
                            <h3>Study in {option.country}</h3>
                            <p>Inspiring higher study abroad</p>
                            <button onClick={() => router.push(`/university/${option.country}`)}>
                            Details <FontAwesomeIcon icon={faArrowAltCircleRight} />
                            </button>
                        </div>
                    </div>
                ))
                )}
            </div>

        </section>
    );
};



export default UniOption;
