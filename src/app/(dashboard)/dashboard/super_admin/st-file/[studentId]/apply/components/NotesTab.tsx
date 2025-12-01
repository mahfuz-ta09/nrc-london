import React, { useState } from "react";
import NoteCard from "./NoteCard";

type Data = { notes: any[] };

const NotesTab: React.FC<{ data: Data }> = ({ data }) => {
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState<"info" | "action" | "warning">("info");

  return (
    <div className="tab-content">
      <div className="card">
        <h2 className="card-title">Add New Note</h2>
        <textarea
          rows={3}
          className="textarea"
          placeholder="Enter note for other admins..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <div className="form-row">
          <select value={noteType} onChange={(e) => setNoteType(e.target.value as any)} className="select">
            <option value="info">Information</option>
            <option value="action">Action Required</option>
            <option value="warning">Warning</option>
          </select>
          <button className="btn btn-primary">Add Note</button>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Previous Notes</h2>
        <div className="stack">
          {data.notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesTab;
