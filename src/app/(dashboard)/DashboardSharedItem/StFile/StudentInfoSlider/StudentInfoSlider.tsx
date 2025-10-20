"use client";
import { useRef } from "react";
import '@/css/Dashboard/DashBoardSharedItem/DashboardSharedCss.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBuilding, faFileSignature, faFolderOpen, faGlobe, faIdCard, faUniversity } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"; 
import { useGetStudentFileStatQuery } from "@/redux/endpoints/studentfileprocess/proceedEndpoints";


const content: Record<string, [string, string, string, IconDefinition]> = {
  file: ["Pending file upload", "Files uploaded"," awaiting review", faFolderOpen],
  personalData: ["Profile incomplete", "Profile updated"," pending verification", faIdCard],
  englishProfData: ["English proof missing", "English proof submitted","  awaiting check", faGlobe],
  englishTest: ["Test not taken", "Test submitted","  pending result check", faFileSignature],
  universityAssigned: ["University not assigned", "University assigned"," pending confirmation", faUniversity],
};
type ContentKey = keyof typeof content;
const StudentInfoSlider = () => {
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


    Object.entries(workflowSteps?.data|| {}).map(([key, value]) => console.log(key,value));

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
                                <h5>{value?.requiredSubmitted}</h5>
                                <h6>{content[key][0] as string}</h6>
                            </div>
                        </div>
                        <div className="student-card-info-body">
                            <h5>{value?.requiredVerified}</h5>
                            <h6>
                                {content[key][1]} <br />
                                {content[key][2]} <br />
                            </h6>
                            <button className="details-action-btn">
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
