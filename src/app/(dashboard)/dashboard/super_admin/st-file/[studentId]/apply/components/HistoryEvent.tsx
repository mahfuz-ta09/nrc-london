// app/apply/components/HistoryEvent.tsx
import React from "react";

const HistoryEvent: React.FC<{ event: any }> = ({ event }) => {
  const icons: any = {
    success: <i className="fa-solid fa-circle-check text-green-600" />,
    info: <i className="fa-solid fa-circle-info text-blue-600" />,
    warning: <i className="fa-solid fa-triangle-exclamation text-orange-600" />,
  };

  return (
    <div className="history-event">
      <div className="history-icon">{icons[event.type]}</div>
      <div className="history-body">
        <div className="history-top">
          <p className="history-action">{event.action}</p>
          <small className="muted">{event.date}</small>
        </div>
        <p className="muted">by {event.admin}</p>
      </div>
    </div>
  );
};

export default HistoryEvent;

