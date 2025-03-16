import { useState, useEffect } from "react";

export default function Advice({user, entries, send, backgroundImage}) {
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
    <div
      className="advice"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // or any specific height you prefer
        padding: "20px", // adjust padding as needed
        color: "black", // to ensure text is visible on the background
      }}
    >
      <button onClick={() => setShowForm(true)} className="add-button">
        + add advice
      </button>

      {showForm && (
        <div className="form-popup">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <textarea
                value={title}
                onChange={handleTitleChange}
                placeholder="Title of your entry"
              />
            </div>

            <div className="form-group">
              <label>Advice:</label>
              <textarea
                value={advice}
                onChange={handleAdviceChange}
                placeholder="I wish I knew..."
              />
            </div>

            <div className="submit-cancel-group">
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
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
