// app/apply/components/SubmissionsTab.tsx
import React, { useState } from "react";
import SubmissionCard from "./SubmissionCard";

type Data = { universities: any[] };

const SubmissionsTab: React.FC<{ data: Data }> = ({ data }) => {
  const [selectedMethod, setSelectedMethod] = useState<"all" | "api" | "manual" | "email">("all");

  const filteredUniversities = selectedMethod === "all"
    ? data.universities
    : data.universities.filter((u) => u.submissionMethod === selectedMethod);

  return (
    <div className="tab-content">
      <div className="card p-12">
        <div className="filter-row">
          {["all", "api", "manual", "email"].map((method) => (
            <button
              key={method}
              className={`filter-btn ${selectedMethod === method ? "active" : ""}`}
              onClick={() => setSelectedMethod(method as any)}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      <div className="stack">
        {filteredUniversities.map((uni) => (
          <SubmissionCard key={uni.id} university={uni} />
        ))}
      </div>
    </div>
  );
};

export default SubmissionsTab;
