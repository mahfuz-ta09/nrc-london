'use client'
// app/apply/components/ApplicationManagement.tsx
import React, { useState } from "react";
import NotesTab from "./NotesTab";
import HistoryTab from "./HistoryTab";
import OverviewTab from "./OverviewTab";
import TrackingTab from "./TrackingTab";
import SubmissionsTab from "./SubmissionsTab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faClock, faCompass, faFolderOpen, faNoteSticky } from "@fortawesome/free-solid-svg-icons";


const ApplicationManagement: React.FC = () => {
    type AppTab = "overview" | "submissions" | "tracking" | "notes" | "history";
    const [activeTab, setActiveTab] = useState<"overview" | "submissions" | "tracking" | "notes" | "history">("overview");

    const applicationData = {
        studentId: "ST12345",
        studentName: "John Doe",
        universities: [
        {
            id: 1,
            name: "University of Toronto",
            program: "Computer Science MSc",
            submissionMethod: "api",
            status: "submitted",
            submittedDate: "2024-11-15",
            responseDeadline: "2024-12-15",
            lastUpdate: "2024-11-20",
            applicationId: "UOT-2024-CS-12345",
            portalUrl: "https://apply.utoronto.ca",
        },
        {
            id: 2,
            name: "McGill University",
            program: "Data Science MSc",
            submissionMethod: "manual",
            status: "pending",
            assignedTo: "Admin Sarah",
            nextAction: "Submit via portal",
            portalUrl: "https://apply.mcgill.ca",
            credentials: { username: "agency@email.com", saved: true },
        },
        {
            id: 3,
            name: "UBC Vancouver",
            program: "Software Engineering",
            submissionMethod: "email",
            status: "draft",
            draftGenerated: false,
            recipientEmail: "admissions@ubc.ca",
        },
        ],
        notes: [
        {
            id: 1,
            admin: "Admin John",
            date: "2024-11-18",
            text: "Student requested priority processing for UofT",
            type: "info",
        },
        {
            id: 2,
            admin: "Admin Sarah",
            date: "2024-11-19",
            text: "McGill requires additional recommendation letter",
            type: "action",
        },
        ],
        timeline: [
        {
            date: "2024-11-15",
            action: "Application submitted to UofT",
            admin: "System",
            type: "success",
        },
        {
            date: "2024-11-18",
            action: "Documents verified",
            admin: "Admin John",
            type: "success",
        },
        {
            date: "2024-11-20",
            action: "UofT acknowledged receipt",
            admin: "System",
            type: "info",
        },
        ],
    };

    return (
        <div className="app-container">
            <div className="app-wrapper">
                <div className="header-card">
                    <div className="header-left">
                        <h1 className="header-title">
                        Application Management - {applicationData.studentName}
                        </h1>
                        <p className="header-sub">Student ID: {applicationData.studentId}</p>
                    </div>

                    <div className="header-actions">
                        <button className="btn btn-primary">
                        <i className="fa-solid fa-paper-plane" /> Bulk Submit
                        </button>
                        <button className="btn btn-gray">
                        <i className="fa-regular fa-file" /> Generate Report
                        </button>
                    </div>
                </div>

                <div className="tabs-card">
                    <div className="tabs">
                        {["overview", "submissions", "tracking", "notes", "history"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as AppTab)}
                            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                        >
                            <FontAwesomeIcon
                                icon={
                                    tab === "overview"
                                    ? faChartSimple
                                    : tab === "submissions"
                                    ? faFolderOpen
                                    : tab === "tracking"
                                    ? faCompass
                                    : tab === "notes"
                                    ? faNoteSticky
                                    : faClock
                                }
                            />
                            <span className="tab-label">{tab}</span>
                        </button>
                        ))}
                    </div>
                </div>


                <div className="tab-content-wrapper">
                    {activeTab === "overview" && <OverviewTab data={applicationData} />}
                    {activeTab === "submissions" && <SubmissionsTab data={applicationData} />}
                    {activeTab === "tracking" && <TrackingTab data={applicationData} />}
                    {activeTab === "notes" && <NotesTab data={applicationData} />}
                    {activeTab === "history" && <HistoryTab data={applicationData} />}
                </div>
            </div>
        </div>
    );
};

export default ApplicationManagement;
