'use client'
import React, { useEffect, useState } from 'react'
import '@/css/shared/LandingPage/LandingPage.css';
import { useGetAllBannersQuery } from '@/redux/endpoints/banner/bannerEndpoint';
import Loader from '../Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faArrowRight, faQuestion } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import DummyBanner from './DummyBanner';

const LandingPage = () => {
    const [current, setCurrent] = useState<number>(0)
    const { data: banners, isLoading } = useGetAllBannersQuery({ status: 'active' })
 
    const items = banners?.data || []
    const total = banners?.meta?.total || items.length || 0
    
    useEffect(() => {
        if (total <= 1) return;
            const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 6000)

        return () => clearInterval(interval);
    }, [total])


    
    const safeIndex = total > 0 ? Math.max(0, Math.min(current, total - 1)) : 0

    const handlePageNmbr = (val: number) => {
        setCurrent(prev => {
            if (total === 0) return 0
            let next = prev + val
            if (next < 0) next = total - 1
            if (next >= total) next = 0
            return next
        })
    }
    if (isLoading) return <Loader />
    if (total === 0) return <DummyBanner />
        

    return (
        <div className="banner">
            <div className="banner-wrapper">
                <div className="count-section">
                    <h1 className="count-title">
                        {safeIndex + 1}/{total}
                    </h1>
                    <div className="controls-wrapper">
                        <button
                            onClick={() => handlePageNmbr(-1)}
                            className="bnr-cntrl"
                            disabled={total <= 1}
                            aria-label="Previous banner"
                        >
                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                        </button>
                        <button
                            onClick={() => handlePageNmbr(1)}
                            className="bnr-cntrl"
                            disabled={total <= 1}
                            aria-label="Next banner"
                        >
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </button>
                    </div>
                </div>


                {items.map((banner: any, index: number) => {
                    const isActive = safeIndex === index
                    
                    return (
                        <div
                            key={`${current}-${banner._id || banner.title}`} 
                            className={`banner-item ${isActive ? 'banner-item-show' : 'banner-item-hide'}`}
                            style={{
                                backgroundImage: banner?.imageUrl?.url 
                                    ? `linear-gradient(135deg, rgba(0, 44, 58, 0.8), rgba(0, 28,37, 0.6)), url(${banner.imageUrl.url})`
                                    : 'linear-gradient(135deg, rgba(0, 44, 58, 0.8), rgba(0, 28,37, 0.6))',
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <div className="content">
                                <div className="left-section">
                                    <h1 className="banner-title">
                                        {banner?.title ? (
                                            <>
                                                {banner.title.split(" ")[0]} <br />
                                                {banner.title.split(" ").slice(1).join(" ")}
                                            </>
                                        ) : (
                                            "NRC Educational Consultants Ltd."
                                        )}
                                    </h1>
                                </div>
                            </div>

                        <div className="diagonal-cut">
                            <div className="action-links slide">
                                <Link className="action-link" href="/Proceed">
                                    apply now <FontAwesomeIcon icon={faArrowRight} className="fas fa-arrow-right"/>
                                </Link>
                                <Link className="action-link" href="/RecruitmentPartner/Becomeanagent">
                                    work as an agent <FontAwesomeIcon icon={faArrowRight} className="fas fa-arrow-right"/>
                                </Link>
                            </div>
                            <div className="right-section">
                                <div className="content-box">
                                    <p className="main-heading">
                                        {banner?.title || "No description available."}
                                    </p>
                                    <p className="description">
                                        {banner?.description || "No description available."}
                                    </p>
                                </div>
                            </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LandingPage