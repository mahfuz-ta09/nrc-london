"use client"
import DummyBanner from './DummyBanner';
import '@/css/shared/LandingPage/LandingPage.css';
import { Suspense, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAllBannersQuery } from '@/redux/endpoints/banner/bannerEndpoint';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
    const [current, setCurrent] = useState<number>(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { data: banners, isLoading } = useGetAllBannersQuery({ status: 'active' });
    const router = useRouter();
    
    const items = banners?.data || [];
    const total = banners?.meta?.total || items.length || 0;
    
    useEffect(() => {
        if (total <= 1) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 6000);

        return () => clearInterval(interval);
    }, [total]);

    const safeIndex = total > 0 ? Math.max(0, Math.min(current, total - 1)) : 0;

    const handlePageNmbr = (val: number) => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        setCurrent(prev => {
            if (total === 0) return 0;
            let next = prev + val;
            if (next < 0) next = total - 1;
            if (next >= total) next = 0;
            return next;
        });
        
        setTimeout(() => setIsTransitioning(false), 800);
    };
    
    if (total === 0 || isLoading) return <DummyBanner />;
    
    return (
        <Suspense fallback={<DummyBanner/>}>
            <div className="banner">
                <div className="banner-wrapper">
                    {/* Enhanced Navigation Controls */}
                    <div className="count-section">
                        <div className="count-display">
                            <span className="current-slide">{safeIndex + 1}</span>
                            <span className="slide-divider">/</span>
                            <span className="total-slides">{total}</span>
                        </div>
                        <div className="controls-wrapper">
                            <button
                                onClick={() => handlePageNmbr(-1)}
                                className="bnr-cntrl bnr-prev"
                                disabled={total <= 1 || isTransitioning}
                                aria-label="Previous banner"
                            >
                                <FontAwesomeIcon icon={faAngleDoubleLeft} />
                            </button>
                            <button
                                onClick={() => handlePageNmbr(1)}
                                className="bnr-cntrl bnr-next"
                                disabled={total <= 1 || isTransitioning}
                                aria-label="Next banner"
                            >
                                <FontAwesomeIcon icon={faAngleDoubleRight} />
                            </button>
                        </div>
                    </div>

                    {/* Progress Dots */}
                    {total > 1 && (
                        <div className="progress-dots">
                            {items.map((_: any, index: number) => (
                                <button
                                    key={index}
                                    className={`dot ${safeIndex === index ? 'active' : ''}`}
                                    onClick={() => !isTransitioning && setCurrent(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    {items.map((banner: any, index: number) => {
                        const isActive = safeIndex === index;
                        
                        // Get proper background style based on screen size
                        const getBackgroundStyle = () => {
                            if (typeof window === 'undefined') {
                                return {
                                    backgroundImage: `linear-gradient(to left, rgba(0, 66, 66, 0.8) 40%, rgba(0, 0, 0, 0.95) 60%), url(${banner?.imageUrl?.url})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                };
                            }

                            const isMobile = window.innerWidth <= 768;
                            const gradient = isMobile
                                ? 'linear-gradient(to bottom, rgba(0, 66, 66, 0.85) 0%, rgba(0, 0, 0, 0.95) 100%)'
                                : 'linear-gradient(to left, rgba(0, 66, 66, 0.8) 40%, rgba(0, 0, 0, 0.95) 60%)';
                            
                            return {
                                backgroundImage: `${gradient}, url(${banner?.imageUrl?.url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            };
                        };
                        
                        return (
                            <div
                                key={banner._id || banner.title || index} 
                                className={`banner-item ${isActive ? 'banner-item-show' : 'banner-item-hide'}`}
                                style={getBackgroundStyle()}
                            >
                                <div className="content">
                                    <div className="left-section">
                                        {/* Decorative Element */}
                                        <div className="title-decoration"></div>
                                        
                                        <h1 className="banner-title">
                                            {banner?.title || "NRC Educational Consultants Ltd."}
                                        </h1>
                                        
                                        <p className="description">
                                            {banner?.description || "Your pathway to global education excellence"}
                                        </p>
                                        
                                        <div className='btn-container'>
                                            <button 
                                                onClick={() => router.push('/proceed')} 
                                                className='btn-primary'
                                            >
                                                <span className="btn-icon">🚀</span>
                                                Start Your Journey
                                            </button>
                                            <button 
                                                onClick={() => router.push('/recruitment-partner/become-agent')} 
                                                className='btn-secondary'
                                            >
                                                <span className="btn-icon">🤝</span>
                                                Become an Agent
                                            </button>
                                        </div>


                                        <div className="stats-section">
                                            <div className="stat-item">
                                                <span className="stat-number">200+</span>
                                                <span className="stat-label">Universities</span>
                                            </div>
                                            <div className="stat-divider"></div>
                                            <div className="stat-item">
                                                <span className="stat-number">30+</span>
                                                <span className="stat-label">Countries</span>
                                            </div>
                                            <div className="stat-divider"></div>
                                            <div className="stat-item">
                                                <span className="stat-number">4+</span>
                                                <span className="stat-label">Years</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="right-section">
                                        <div className="image-wrapper">
                                            <img 
                                                src='/images/banner-photo.webp' 
                                                alt="Banner image"
                                                loading="eager"
                                            />
                                            <div className="image-glow"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Suspense>
    );
};

export default LandingPage;