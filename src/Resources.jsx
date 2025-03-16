import { useState } from "react";

export default function Resources({ backgroundImage }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [category, setCategory] = useState("education");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [entries, setEntries] = useState({
    education: [],
    courses: [],
    finances: [],
    opportunities: [],
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const allTags = Array.from(
    new Set(
      Object.values(entries)
        .flat()
        .map((entry) => entry.tags)
        .flat()
    )
  );

  const handleTagSelection = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "") return;
    setEntries((prev) => ({
      ...prev,
      [category]: [...prev[category], { content, tags: tags.split(",") }],
    }));
    setContent("");
    setTags("");
    setIsFormOpen(false);
  };

  return (
    <div
      className="resources"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // or any specific height you prefer
        padding: "20px", // adjust padding as needed
        color: "black", // to ensure text is visible on the background
      }}
    >
      <div className="dropdown">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="dropdown-button"
        >
          Filter by Tags
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {allTags.map((tag, index) => (
              <div key={index} className="dropdown-item">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagSelection(tag)}
                />
                <label>{tag}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={() => setIsFormOpen(true)} className="add-button">
        + add new entry
      </button>

      {isFormOpen && (
        <div className="form-popup">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Category:</label>
              <div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="education">Education</option>
                  <option value="courses">Courses</option>
                  <option value="finances">Finances/Scholarships</option>
                  <option value="opportunities">Opportunities</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="top-left-label">Content:</label>
              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter information..."
                />
              </div>
            </div>

            <div className="form-group">
              <label>Tags (comma separated):</label>
              <div>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter tags..."
                />
              </div>
            </div>

            <div className="submit-cancel-group">
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setIsFormOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {Object.keys(entries).map((key) => (
        <div key={key} className="category-section">
          <h2>{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
          <div className="entries">
            {entries[key]
              .filter(
                (entry) =>
                  selectedTags.length === 0 ||
                  entry.tags.some((tag) => selectedTags.includes(tag))
              )
              .map((entry, index) => (
                <div key={index} className="entry">
                  <p>{entry.content}</p>
                  {entry.tags.length > 0 && (
                    <p className="tags">Tags: {entry.tags.join(", ")}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
