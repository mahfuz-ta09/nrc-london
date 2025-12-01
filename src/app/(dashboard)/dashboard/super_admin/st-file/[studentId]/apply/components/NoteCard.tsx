import React from "react";

const NoteCard: React.FC<{ note: any }> = ({ note }) => {
  const cls =
    note.type === "info" ? "note-info" : note.type === "action" ? "note-action" : "note-warning";

  return (
    <div className={`note-card card ${cls}`}>
      <div className="note-top">
        <strong>{note.admin}</strong>
        <small className="muted">{note.date}</small>
      </div>
      <p>{note.text}</p>
    </div>
  );
};

export default NoteCard;
