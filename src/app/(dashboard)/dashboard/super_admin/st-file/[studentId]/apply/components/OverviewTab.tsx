import React from "react";
import StatCard from "./StatCard";
import ActionCard from "./ActionCard";
import UniversityCard from "./UniversityCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCircleCheck, faClock, faCopy, faFile, faPaperPlane, faUsers } from "@fortawesome/free-solid-svg-icons";

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
        <StatCard title="Total Universities" value={stats.total} icon={<FontAwesomeIcon icon={faUsers} style={{color:"blue"}} />}/>
        <StatCard title="Submitted" value={stats.submitted} icon={<FontAwesomeIcon icon={faCircleCheck} style={{color:"green"}} />}/>
        <StatCard title="Pending Action" value={stats.pending} icon={<FontAwesomeIcon icon={faClock} style={{color:"orange"}} />}/>
        <StatCard title="Drafts" value={stats.draft} icon={<FontAwesomeIcon icon={faFile}  style={{color:"gray"}} />}/>
      </div>

      <div className="actions-grid">
        <ActionCard title="API Submissions" description="1 university ready for automated submission" action="Submit via API" icon={<FontAwesomeIcon icon={faPaperPlane} style={{color:"blue"}} />}/>
        <ActionCard title="Manual Submissions" description="2 universities need portal submission" action="View Details" icon={<FontAwesomeIcon icon={faCopy} style={{color:"purple"}} />}/>
        <ActionCard title="Follow-ups Required" description="3 pending responses from universities" action="Check Status" icon={<FontAwesomeIcon icon={faBell}  style={{color:"orange"}} />}/>
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
