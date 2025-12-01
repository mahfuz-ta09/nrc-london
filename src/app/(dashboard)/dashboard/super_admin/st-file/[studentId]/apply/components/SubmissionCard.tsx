import React from "react";

const SubmissionCard: React.FC<{ university: any }> = ({ university }) => {
  const method = university.submissionMethod;

  const renderApi = () => (
    <div>
      <div className="row success">
        <i className="fa-solid fa-circle-check" /> API Integration Active
      </div>
      {university.status === "pending" && <button className="btn btn-primary">Submit Application via API</button>}
      {university.status === "submitted" && (
        <div className="card-note">
          <p><strong>Application ID:</strong> {university.applicationId}</p>
          <p><strong>Submitted:</strong> {university.submittedDate}</p>
        </div>
      )}
    </div>
  );

  const renderManual = () => (
    <div>
      <div className="card-note">
        <h4>Manual Submission Required</h4>
        <ol>
          <li>Open portal: <a href={university.portalUrl} target="_blank" rel="noreferrer">{university.portalUrl}</a></li>
          <li>Login with saved credentials</li>
          <li>Copy student information below</li>
          <li>Complete submission and enter Application ID</li>
        </ol>
      </div>
      <button className="btn btn-secondary">Copy Student Data for Portal</button>
      <button style={{marginLeft:"10px"}} className="btn btn-primary">Mark as Submitted</button>
    </div>
  );

  const renderEmail = () => (
    <div>
      <div className="card-note">
        <p><strong>Recipient:</strong> {university.recipientEmail}</p>
      </div>
      {!university.draftGenerated ? (
        <button className="btn btn-success">Generate Email Draft with Documents</button>
      ) : (
        <button className="btn btn-primary">Send Application Email</button>
      )}
    </div>
  );

  return (
    <div className="submission-card card">
      <div className="submission-header">
        <div>
          <h4>{university.name}</h4>
          <p className="muted">{university.program}</p>
        </div>
        {university.assignedTo && <div className="assigned-pill">{university.assignedTo}</div>}
      </div>

      <div className="submission-body">
        {method === "api" && renderApi()}
        {method === "manual" && renderManual()}
        {method === "email" && renderEmail()}
      </div>
    </div>
  );
};

export default SubmissionCard;
