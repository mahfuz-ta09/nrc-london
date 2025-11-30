import '../ApplicationDetails/css/Details.css'

const ProgressRing = ({ verified }: { verified: number }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  const percentage = (verified / 4) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-ring-container">
      <svg className="progress-ring" width="180" height="180">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>

        <circle
          stroke="#e2e8f0"
          strokeWidth="12"
          fill="transparent"
          r={radius}
          cx="90"
          cy="90"
        />

        <circle
          className="progress-ring-circle"
          stroke="url(#gradient)"
          strokeWidth="12"
          fill="transparent"
          strokeLinecap="round"
          r={radius}
          cx="90"
          cy="90"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.6s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>

      <div className="progress-ring-text">
        <div className="progress-percentage">
          {Math.round(percentage)}%
        </div>
        <div className="progress-label">Complete</div>
      </div>
    </div>
  );
};

export default ProgressRing;
