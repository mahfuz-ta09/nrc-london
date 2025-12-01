// app/apply/components/HistoryTab.tsx
import React from "react";
import HistoryEvent from "./HistoryEvent";

type Data = { timeline: any[] };

const HistoryTab: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <div className="tab-content">
      <div className="card">
        <h2 className="card-title">Activity Timeline</h2>
        <div className="timeline">
          {data.timeline.map((event, idx) => (
            <HistoryEvent key={idx} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryTab;
