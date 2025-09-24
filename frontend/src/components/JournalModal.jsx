import { useEffect, useState } from "react";
import api from "../services/api"; 

export default function JournalModal({ isOpen, onClose, addEntry, editEntry, onEditSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill fields if editing
  useEffect(() => {
    if (editEntry) {
      setTitle(editEntry.title || "");
      setContent(editEntry.content || "");
    } else {
      setTitle("");
      setContent("");
    }
    setError(""); // Clear error when modal opens/closes
  }, [editEntry, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title.trim() && !content.trim()) {
      onClose();
      return;
    }

    if (!title.trim() || !content.trim()) {
      setError("Please fill in both title and content or press Done again to close without saving.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (editEntry) {
        // UPDATE ENTRY
        const res = await api.put(`journals/${editEntry.id}`, {
          title: title.trim(),
          content: content.trim(),
        });
        
        // Your backend returns: { message: "...", journal: updatedEntry }
        onEditSave(res.journal); // Extract the journal object
      } else {
        // CREATE NEW ENTRY
        const res = await api.post("journals", {
          title: title.trim(),
          content: content.trim(),
        });
        
        // Your backend returns: { message: "...", journal: newEntry }
        addEntry(res.journal); // Extract the journal object
      }

      onClose();
    } catch (err) {
      console.error("Failed to save entry:", err);
      setError(err.error || err.message || "Failed to save entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.metaKey) { // Cmd+Enter to save
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-5xl min-h-[90vh] shadow-2xl text-gray-100 relative flex flex-col">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-300">
            {editEntry ? "Edit Journal Entry" : "New Journal Entry"}
          </h2>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="text-indigo-400 hover:text-indigo-500 text-sm font-medium disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Done"}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-900/20 border border-red-700 text-red-300 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full bg-transparent border-b border-gray-700 text-3xl font-bold mb-6 focus:outline-none focus:border-indigo-500 placeholder-gray-500"
          disabled={loading}
        />

        {/* Journal Text Area */}
        <textarea
          placeholder="Start writing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow bg-transparent resize-none text-lg focus:outline-none placeholder-gray-500"
          disabled={loading}
        />

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center rounded-2xl">
            <div className="text-indigo-400">Saving...</div>
          </div>
        )}
      </div>
    </div>
  );
}