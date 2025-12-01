// app/apply/components/UniversityCard.tsx
import React from "react";

const UniversityCard: React.FC<{ university: any }> = ({ university }) => {
  const statusMap: any = {
    submitted: "status-submitted",
    pending: "status-pending",
    draft: "status-draft",
  };

  return (
    <div className="university-card card-small">
      <div className="uc-left">
        <h4 className="uc-title">{university.name}</h4>
        <p className="uc-sub">{university.program}</p>
      </div>
      <div className="uc-right">
        <span className={`status-pill ${statusMap[university.status] || ""}`}>{university.status}</span>
        <span className="method-pill"><i className={`fa-solid ${university.submissionMethod === "api" ? "fa-paper-plane" : university.submissionMethod === "manual" ? "fa-copy" : "fa-envelope"}`} /> {university.submissionMethod}</span>
      </div>
    </div>
  );
};

export default UniversityCard;
