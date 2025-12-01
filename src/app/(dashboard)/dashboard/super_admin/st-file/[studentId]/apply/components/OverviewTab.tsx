// app/apply/components/OverviewTab.tsx
import React from "react";
import StatCard from "./StatCard";
import ActionCard from "./ActionCard";
import UniversityCard from "./UniversityCard";

type Uni = any;
type Data = { universities: Uni[]; notes: any[]; timeline: any[]; studentName?: string };

const OverviewTab: React.FC<{ data: Data }> = ({ data }) => {
  const stats = {
    total: data.universities.length,
    submitted: data.universities.filter((u) => u.status === "submitted").length,
    pending: data.universities.filter((u) => u.status === "pending").length,
    draft: data.universities.filter((u) => u.status === "draft").length,
  };

  return (
    <div className="tab-content">
      <div className="stats-grid">
        <StatCard title="Total Universities" value={stats.total} icon={<i className="fa-solid fa-users" />} color="blue" />
        <StatCard title="Submitted" value={stats.submitted} icon={<i className="fa-solid fa-circle-check" />} color="green" />
        <StatCard title="Pending Action" value={stats.pending} icon={<i className="fa-solid fa-clock" />} color="yellow" />
        <StatCard title="Drafts" value={stats.draft} icon={<i className="fa-regular fa-file" />} color="gray" />
      </div>

      <div className="actions-grid">
        <ActionCard title="API Submissions" description="1 university ready for automated submission" action="Submit via API" icon={<i className="fa-solid fa-paper-plane" />} color="blue" />
        <ActionCard title="Manual Submissions" description="2 universities need portal submission" action="View Details" icon={<i className="fa-solid fa-copy" />} color="purple" />
        <ActionCard title="Follow-ups Required" description="3 pending responses from universities" action="Check Status" icon={<i className="fa-solid fa-bell" />} color="orange" />
      </div>

      <div className="card">
        <h2 className="card-title">Universities Overview</h2>
        <div className="stack">
          {data.universities.map((uni: Uni) => (
            <UniversityCard key={uni.id} university={uni} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
