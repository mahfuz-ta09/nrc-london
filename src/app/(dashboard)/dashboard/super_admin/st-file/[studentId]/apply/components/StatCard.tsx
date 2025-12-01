// app/apply/components/StatCard.tsx
import React from "react";

const StatCard: React.FC<{ title: string; value: number | string; icon?: React.ReactNode; color?: string }> = ({ title, value, icon, color }) => {
  return (
    <div className="stat-card card">
      <div className="stat-icon">{icon}</div>
      <h3 className="stat-value">{value}</h3>
      <p className="stat-title">{title}</p>
    </div>
  );
};

export default StatCard;
