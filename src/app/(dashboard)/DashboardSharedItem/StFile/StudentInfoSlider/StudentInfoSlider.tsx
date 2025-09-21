"use client";
import { useRef } from "react";
import '@/css/Dashboard/DashBoardSharedItem/DashboardSharedCss.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBuilding, faCircleCheck, faCircleXmark, faComments, faFileCircleCheck, faFlagCheckered, faFolderOpen, faPaperPlane, faPenNib, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useGetStudentFileStatQuery } from "@/redux/endpoints/studentfileprocess/proceedEndpoints";
const workflowSteps = [
  {
    id: 1,
    icon: faFolderOpen,
    count: 0,
    title: "File Initialized",
    bodyTitle: "files ready for",
    bodySubtitle: "initialization",
    action: "activate",
  },
  {
    id: 2,
    icon: faSearch,
    count: 0,
    title: "Files Under Review",
    bodyTitle: "files ready for",
    bodySubtitle: "review finished",
    action: "review",
  },
  {
    id: 3,
    icon: faFileCircleCheck,
    count: 0,
    title: "Docs Verified",
    bodyTitle: "files ready for",
    bodySubtitle: "verification",
    action: "verify",
  },
  {
    id: 4,
    icon: faPenNib,
    count: 0,
    title: "Preparing Application",
    bodyTitle: "files ready for",
    bodySubtitle: "application",
    action: "prepare",
  },
  {
    id: 5,
    icon: faPaperPlane,
    count: 0,
    title: "Submitted",
    bodyTitle: "applications waiting for",
    bodySubtitle: "response",
    action: "track",
  },
  {
    id: 6,
    icon: faComments,
    count: 0,
    title: "In Progress",
    bodyTitle: "applications pending",
    bodySubtitle: "communication",
    action: "follow up",
  },
  {
    id: 7,
    icon: faCircleCheck,
    count: 0,
    title: "Approved",
    bodyTitle: "students ready for",
    bodySubtitle: "post-visa services",
    action: "complete",
  },
  {
    id: 8,
    icon: faCircleXmark,
    count: 0,
    title: "Rejected",
    bodyTitle: "cases need",
    bodySubtitle: "re-application",
    action: "review",
  },
  {
    id: 9,
    icon: faFlagCheckered,
    count: 0,
    title: "Completed",
    bodyTitle: "students ready for",
    bodySubtitle: "archiving",
    action: "archive",
  },
];


const StudentInfoSlider = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const { data , isLoading } = useGetStudentFileStatQuery()
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
                onMouseMove={handleMouseMove}>
                {workflowSteps.map((step) => (
                    <div key={step.id} className="student-info-card">
                        <div className="student-card-info-header">
                            <FontAwesomeIcon className="info-header-icon" icon={step.icon} />
                            <div className="student-card-info-header-item">
                                <h5>{step.count}</h5>
                                <h6>{step.title}</h6>
                            </div>
                        </div>
                        <div className="student-card-info-body">
                            <h5>{step.count}</h5>
                            <h6>
                                {step.bodyTitle} <br /> {step.bodySubtitle}
                            </h6>
                            <button className="details-action-btn">
                                {step.action} <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default StudentInfoSlider;
