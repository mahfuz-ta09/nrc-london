import React from "react";

const TrackingCard: React.FC<{ university: any }> = ({ university }) => {
  return (
    <div className="tracking-card card">
      <div className="tracking-top">
        <div>
          <h4>{university.name}</h4>
          <p className="muted">{university.program}</p>
        </div>
        {university.applicationId && <span className="mono">{university.applicationId}</span>}
      </div>

      {university.status === "submitted" && (
        <div className="tracking-body">
          <div className="row">
            <span>Submitted</span>
            <strong>{university.submittedDate}</strong>
          </div>
          {university.responseDeadline && (
            <div className="row">
              <span>Response Expected By</span>
              <strong>{university.responseDeadline}</strong>
            </div>
          )}
          <div className="row">
            <span>Last Update</span>
            <strong>{university.lastUpdate}</strong>
          </div>
          <button className="btn btn-outline">Check Status Update</button>
        </div>
      )}
    </div>
  );
};

export default TrackingCard;
