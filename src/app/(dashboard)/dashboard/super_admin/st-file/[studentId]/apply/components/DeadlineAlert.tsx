// app/apply/components/DeadlineAlert.tsx
import React from "react";

const DeadlineAlert: React.FC<{ university: any }> = ({ university }) => {
  if (!university.responseDeadline) return null;
  const daysUntil = Math.ceil(
    (new Date(university.responseDeadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const isUrgent = daysUntil <= 7;

  return (
    <div className={`deadline-card card ${isUrgent ? "urgent" : "soon"}`}>
      <div className="deadline-left">
        <i className={`fa-solid ${isUrgent ? "fa-bell" : "fa-calendar"}`} />
      </div>
      <div className="deadline-body">
        <h4>{university.name}</h4>
        <p className="muted">Response expected in <strong>{daysUntil} days</strong> ({university.responseDeadline})</p>
      </div>
    </div>
  );
};

export default DeadlineAlert;
