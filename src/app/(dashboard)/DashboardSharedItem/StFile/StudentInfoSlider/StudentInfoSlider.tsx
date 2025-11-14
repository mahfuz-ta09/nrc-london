"use client";
import { useRef } from "react";
import '@/css/Dashboard/DashBoardSharedItem/DashboardSharedCss.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { useGetStudentFileStatQuery } from "@/redux/endpoints/studentfileprocess/proceedEndpoints";
import { content, resetState } from "../type";

type StudentListProps = {
    values: any;
    setValues: React.Dispatch<React.SetStateAction<any>>;
}

type ContentKey = keyof typeof content;

const StudentInfoSlider = ({ values , setValues }: StudentListProps) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const { data: workflowSteps , isLoading } = useGetStudentFileStatQuery()
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
        const walk = (x - startX) * 1.5;
        sliderRef.current!.scrollLeft = scrollLeft - walk;
    };

    // console.log(workflowSteps?.data,values)
    
    return (
        <div className="student-info-slider-container">
            <div
                ref={sliderRef}
                className="student-info-slider"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}>
                {
                    Object.entries(workflowSteps?.data || {}).map(([key, value]: [ContentKey, any]) => (
                    <div key={key} className="student-info-card">
                        <div className="student-card-info-header">
                            <FontAwesomeIcon className="info-header-icon" icon={content[key][3]} />
                            <div className="student-card-info-header-item">
                                <h5>{value?.complete}</h5>
                                <h6 onClick={() => setValues((prev:any) => ({
                                    ...resetState,
                                    [key]: { 
                                        ...resetState[key],            
                                        complete: false
                                    }
                                }))}>{content[key][0] as string}</h6>
                            </div>
                        </div>
                        <div className="student-card-info-body">
                            <h5>{value?.verified}</h5>
                            <h6>
                                {content[key][1]} <br />
                                {content[key][2]} <br />
                            </h6>
                            <button onClick={() => setValues((prev:any) => ({
                                ...resetState,
                                [key]: {                        
                                    ...resetState[key],               
                                    verified: true   
                                }
                            }))} className="details-action-btn">
                                View Students <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </div>
                    ))

                }
                    
            </div>
        </div>

    )
}

export default StudentInfoSlider;
