import { useState, useEffect } from "react";
import "./App.css";

export default function Advice({user, entries, send}) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [advice, setAdvice] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);

  // const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((title.trim() === "") | (advice.trim() === "")) return;
    send(title, advice)
    setTitle("");
    setAdvice("");
    setShowForm(false);
  };

  const handleClickTitle = (entry) => {
    setSelectedEntry(entry);
  };

  const handleClosePopup = () => {
    setSelectedEntry(null);
  };

  return (
    <div className="advice">
      {user && <button onClick={() => setShowForm(true)} className="add-button">
        +
      </button>}

      {showForm && (
        <div className="form-popup">
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of your entry"
            />
            <label>Advice:</label>
            <textarea
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              placeholder="I wish I knew..."
            />

            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="message-list">
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <div
              key={index}
              className="message"
              onClick={() => handleClickTitle(entry)}
            >
              {entry.title.slice(0, 50)}
              {entry.title.length > 50 ? "..." : ""}
            </div>
          ))
        ) : (
          <p>No messages yet!</p>
        )}
      </div>

      {selectedEntry && (
        <div className="popup-background" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEntry.title}</h2>
            <p>{selectedEntry.content}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
