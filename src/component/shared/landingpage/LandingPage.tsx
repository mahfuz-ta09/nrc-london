"use client"
import DummyBanner from './DummyBanner';
import '@/css/shared/LandingPage/LandingPage.css';
import { Suspense, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAllBannersQuery } from '@/redux/endpoints/banner/bannerEndpoint';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';


const LandingPage = () => {
    const [current, setCurrent] = useState<number>(0)
    const { data: banners } = useGetAllBannersQuery({ status: 'active' })
    const router = useRouter()
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
    
    if (total === 0) return <DummyBanner />
        
    
    return (
        <Suspense fallback={<DummyBanner/>}>
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
                                key={banner._id || banner.title || index} 
                                className={`banner-item ${isActive ? 'banner-item-show' : 'banner-item-hide'}`}
                                style={{
                                    backgroundImage: banner?.imageUrl?.url 
                                        ? `linear-gradient(to left, rgba(0, 66, 66, 0.7) 40%,rgba(0,0,0,0.9)60%), url(${banner.imageUrl.url})`
                                        : 'linear-gradient(to left, rgba(0, 66, 66, 0.7) 40%,rgba(0,0,0,0.9)60%)',
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}>
                                <div className="content">
                                    <div className="left-section">
                                        <img className='left-image' src='/images/writting.png' alt="Banner image" />
                                        <h1 className="banner-title">
                                            {banner?.title ? (
                                                <>
                                                    {banner.title}
                                                </>
                                            ) : (
                                                "NRC Educational Consultants Ltd."
                                            )}
                                        </h1>
                                        <p className="description">
                                            {banner?.description || "No description available."}
                                        </p>
                                        <div className='btn-container'>
                                            <button onClick={()=>router.push('/recruitment-partner/become-agent')} className='btn1'>become and agent</button>
                                            <button onClick={()=>router.push('/proceed')} className='btn2'>start you journey</button>
                                        </div>
                                    </div>
                                    <div className="right-section">
                                        <img src='/images/tanzim-on-top.webp' alt="Banner image" />
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        </Suspense>
    )
}

export default LandingPage