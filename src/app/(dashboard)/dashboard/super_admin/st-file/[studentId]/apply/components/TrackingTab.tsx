// app/apply/components/TrackingTab.tsx
import React from "react";
import TrackingCard from "./TrackingCard";
import DeadlineAlert from "./DeadlineAlert";

type Data = { universities: any[] };

const TrackingTab: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <div className="tab-content">
      <div className="card">
        <h2 className="card-title">Application Status Timeline</h2>
        <div className="stack">
          {data.universities.map((uni) => (
            <TrackingCard key={uni.id} university={uni} />
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Upcoming Deadlines</h2>
        <div className="stack">
          {data.universities.filter((u) => u.responseDeadline).map((uni) => (
            <DeadlineAlert key={uni.id} university={uni} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackingTab;
