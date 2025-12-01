import React from "react";

const ActionCard: React.FC<{ title: string; description: string; action: string; icon?: React.ReactNode; color?: string }> = ({ title, description, action, icon, color }) => {
  return (
    <div className="action-card card">
      <div className="action-left">{icon}</div>
      <div className="action-body">
        <h3 className="action-title">{title}</h3>
        <p className="action-desc">{description}</p>
        <button className="btn btn-primary small">{action}</button>
      </div>
    </div>
  );
};

export default ActionCard;
