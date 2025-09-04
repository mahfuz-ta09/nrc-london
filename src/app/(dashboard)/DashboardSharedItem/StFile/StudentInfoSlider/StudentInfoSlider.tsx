"use client";
import { useRef } from "react";
import '@/css/Dashboard/DashBoardSharedItem/DashboardSharedCss.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBuilding } from "@fortawesome/free-solid-svg-icons";

const StudentInfoSlider = () => {
    const sliderRef = useRef<HTMLDivElement>(null);

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: React.MouseEvent) => {
        isDown = true;
        sliderRef.current!.classList.add("active");
        startX = e.pageX - sliderRef.current!.offsetLeft;
        scrollLeft = sliderRef.current!.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown = false;
        sliderRef.current!.classList.remove("active");
    };

    const handleMouseUp = () => {
        isDown = false;
        sliderRef.current!.classList.remove("active");
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current!.offsetLeft;
        const walk = (x - startX) * 1.5; // drag speed
        sliderRef.current!.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="student-info-slider-container">
            <div
                ref={sliderRef}
                className="student-info-slider"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <div className="student-info-card">
                    <div className="student-card-info-header">
                        <FontAwesomeIcon className="info-header-icon" icon={faBuilding}/>
                        <div className="student-card-info-header-item">
                            <h5>54</h5>
                            <h6>Lorem ipsum dolor sit amet.</h6>
                        </div>
                    </div>
                    <div className="student-card-info-body">
                        <h5>54</h5>
                        <h6>Lorem ipsum dolor <br/>sit amet.</h6>
                        <button className="action-btn">activate <FontAwesomeIcon icon={faArrowRight}/></button>
                    </div>
                </div>
                <div className="student-info-card">
                    <div className="student-card-info-header">
                        <FontAwesomeIcon className="info-header-icon" icon={faBuilding}/>
                        <div className="student-card-info-header-item">
                            <h5>54</h5>
                            <h6>Lorem ipsum dolor sit amet.</h6>
                        </div>
                    </div>
                    <div className="student-card-info-body">
                        <h5>54</h5>
                        <h6>Lorem ipsum dolor <br/>sit amet.</h6>
                        <button className="action-btn">activate <FontAwesomeIcon icon={faArrowRight}/></button>
                    </div>
                </div>
                <div className="student-info-card">
                    <div className="student-card-info-header">
                        <FontAwesomeIcon className="info-header-icon" icon={faBuilding}/>
                        <div className="student-card-info-header-item">
                            <h5>54</h5>
                            <h6>Lorem ipsum dolor sit amet.</h6>
                        </div>
                    </div>
                    <div className="student-card-info-body">
                        <h5>54</h5>
                        <h6>Lorem ipsum dolor <br/>sit amet.</h6>
                        <button className="action-btn">activate <FontAwesomeIcon icon={faArrowRight}/></button>
                    </div>
                </div>
                <div className="student-info-card">
                    <div className="student-card-info-header">
                        <FontAwesomeIcon className="info-header-icon" icon={faBuilding}/>
                        <div className="student-card-info-header-item">
                            <h5>54</h5>
                            <h6>Lorem ipsum dolor sit amet.</h6>
                        </div>
                    </div>
                    <div className="student-card-info-body">
                        <h5>54</h5>
                        <h6>Lorem ipsum dolor <br/>sit amet.</h6>
                        <button className="action-btn">activate <FontAwesomeIcon icon={faArrowRight}/></button>
                    </div>
                </div>
                <div className="student-info-card">
                    <div className="student-card-info-header">
                        <FontAwesomeIcon className="info-header-icon" icon={faBuilding}/>
                        <div className="student-card-info-header-item">
                            <h5>54</h5>
                            <h6>Lorem ipsum dolor sit amet.</h6>
                        </div>
                    </div>
                    <div className="student-card-info-body">
                        <h5>54</h5>
                        <h6>Lorem ipsum dolor <br/>sit amet.</h6>
                        <button className="action-btn">activate <FontAwesomeIcon icon={faArrowRight}/></button>
                    </div>
                </div>
                <div className="student-info-card">
                    <div className="student-card-info-header">
                        <FontAwesomeIcon className="info-header-icon" icon={faBuilding}/>
                        <div className="student-card-info-header-item">
                            <h5>54</h5>
                            <h6>Lorem ipsum dolor sit amet.</h6>
                        </div>
                    </div>
                    <div className="student-card-info-body">
                        <h5>54</h5>
                        <h6>Lorem ipsum dolor <br/>sit amet.</h6>
                        <button className="action-btn">activate <FontAwesomeIcon icon={faArrowRight}/></button>
                    </div>
                </div>
                <div className="student-info-card">
                    <div className="student-card-info-header">
                        <FontAwesomeIcon className="info-header-icon" icon={faBuilding}/>
                        <div className="student-card-info-header-item">
                            <h5>54</h5>
                            <h6>Lorem ipsum dolor sit amet.</h6>
                        </div>
                    </div>
                    <div className="student-card-info-body">
                        <h5>54</h5>
                        <h6>Lorem ipsum dolor <br/>sit amet.</h6>
                        <button className="action-btn">activate <FontAwesomeIcon icon={faArrowRight}/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentInfoSlider;
