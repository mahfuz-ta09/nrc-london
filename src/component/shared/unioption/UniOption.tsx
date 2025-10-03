"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useGetUniNavItemQuery } from "@/redux/endpoints/university/universityEndpoints";
import Loader from "../loader/loader";
import '../../../css/shared/Unioption/UniOption.css'

const UniOption: React.FC = () => {
    const router = useRouter();
    const { data, isLoading } = useGetUniNavItemQuery();
    const trackRef = useRef<HTMLDivElement | null>(null);


    const [cardStep, setCardStep] = useState<number>(0);
    const GAP = 16;

    
    useEffect(() => {
        const compute = () => {
        const track = trackRef.current;
        if (!track) return;
        const first = track.querySelector<HTMLElement>(".uo-card");
        if (first) {
            const w = first.offsetWidth;
            setCardStep(w + GAP);
            track.style.setProperty("--uo-card-gap", `${GAP}px`);
        }
        };
        compute();
        window.addEventListener("resize", compute);
        return () => window.removeEventListener("resize", compute);
    }, [isLoading, data]);


    const dragging = useRef({ down: false, startX: 0, scrollLeft: 0 });

    const onPointerDown = (e: React.PointerEvent) => {
        const track = trackRef.current;
        if (!track) return;
        dragging.current.down = true;
        dragging.current.startX = e.clientX;
        dragging.current.scrollLeft = track.scrollLeft;
        (e.target as Element).setPointerCapture?.(e.pointerId);
        track.classList.add("uo-dragging");
    };
        
    const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current.down || !trackRef.current) return;
    e.preventDefault();

    const x = e.clientX;
    const dx = x - dragging.current.startX;

    
    requestAnimationFrame(() => {
        if (trackRef.current) {
        trackRef.current.scrollLeft = dragging.current.scrollLeft - dx;
        }
    });
    };


    const onPointerUp = (e: React.PointerEvent) => {
        dragging.current.down = false;
        try { (e.target as Element).releasePointerCapture?.(e.pointerId); } catch {}
        trackRef.current?.classList.remove("uo-dragging");
    };

    
    const scrollByCard = (dir: -1 | 1) => {
        const track = trackRef.current;
        if (!track) return;
        const amount = cardStep || Math.round(track.clientWidth * 0.8);
        track.scrollBy({ left: dir * amount, behavior: "smooth" });
    };

    return (
        <section className="uo-container">
            <div className="uo-inner">
                <header className="uo-header">
                <div className="uo-subtitle">🌍 Study Abroad</div>
                <h2 className="uo-title">
                    Choose Your <span className="uo-accent">Study Destination</span>
                </h2>
                <p className="uo-lead">
                    Explore top countries offering world-class education, vibrant cultures, and global career
                    opportunities. Your academic journey starts here.
                </p>
                </header>

                <div className="uo-controls">
                <button
                    aria-label="previous"
                    className="uo-arrow"
                    onClick={() => scrollByCard(-1)}
                    type="button"
                >
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                </button>

                <button
                    aria-label="next"
                    className="uo-arrow"
                    onClick={() => scrollByCard(1)}
                    type="button"
                >
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </button>
                </div>

                <div
                className="uo-track"
                ref={trackRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={() => (dragging.current.down = false)}
                >
                {isLoading ? (
                    <Loader />
                ) : (
                    data?.data?.map((option: any) => (
                    <article className="uo-card" key={option.country}>
                        <img className="uo-image" src={option.image} alt={option.country} />
                        <img className="uo-flag" src={option.flag} alt={`${option.country} flag`} />
                        <div className="uo-overlay" />
                        <div className="uo-details">
                        <h3>Study in {option.country}</h3>
                        <p>Inspiring higher study abroad</p>
                        <button
                            className="uo-cta"
                            onClick={() => router.push(`/university/${option.country}`)}
                            type="button"
                        >
                            Details
                        </button>
                        </div>
                    </article>
                    ))
                )}
                </div>
            </div>
        </section>
    );
};

export default UniOption;
