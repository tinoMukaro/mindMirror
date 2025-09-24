import { useEffect, useState } from "react";
import api from "../services/api"; 
import { Search, Plus, User, Brain } from "lucide-react";
import EntryCard from "../components/EntryCard";
import FloatingButton from "../components/FloatingButton";
import JournalModal from "../components/JournalModal";
import { Link } from "react-router-dom";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [editEntry, setEditEntry] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const openModal = () => {
    setEditEntry(null); 
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditEntry(null);
  };

  // Fetch entries 
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const res = await api.get("journals"); 
        
        // Your backend returns: { message: "...", journals: entries, count: number }
        const entriesData = res.journals || [];
        setEntries(entriesData.reverse()); 
      } catch (err) {
        console.error("Failed to fetch entries:", err);
        setError(err.error || err.message || "Failed to load entries");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const addEntry = (newEntry) => {
    setEntries(prev => [newEntry, ...prev]);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`journals/${id}`); 
      setEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
      setError(err.error || err.message || "Failed to delete entry");
    }
  };

  const handleEdit = (entry) => {
    setEditEntry(entry);
    setModalOpen(true);
  };

  const handleSaveEdit = (updatedEntry) => {
    setEntries(prev =>
      prev.map(entry => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
    setEditEntry(null);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-6 flex items-center justify-center">
        <div className="text-gray-400">Loading entries...</div>
      </div>
    );
  }

  // Show error state
  if (error && entries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-6 flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-6 relative">
      {/* Header */}
      <div className="flex items-center justify-end mb-6">
        <h1 className="text-3xl font-bold mr-auto">Journal</h1>
        <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 mr-1.5">
          <Search className="w-5 h-5 text-gray-300" />
        </button>
        <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
          <User className="w-5 h-5 text-gray-300" />
        </button>
        <Link to="/insights">
          <button className="p-2 rounded-4xl bg-indigo-600 hover:bg-indigo-700 mr-1.5">
            <Brain className="w-5 h-5" />
          </button>
        </Link> 
      </div>

      {/* Stats */}
      <div className="flex gap-6 text-sm text-gray-400 mb-8">
        <span>✍️ {entries.reduce((sum, e) => sum + (e.content?.split(" ").length || 0), 0)} Words Written</span>
        <span>🗓️ {entries.length} Days Journaled</span>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-900/20 border border-red-700 text-red-300 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Entries */}
      <div className="space-y-4">
        {entries.map((entry, idx) => (
          <EntryCard
            key={entry.id || idx}
            title={entry.title}
            content={entry.content}
            italic={false}
            onEdit={() => handleEdit(entry)}
            onDelete={() => handleDelete(entry.id)}
          />
        ))}
        
        {entries.length === 0 && !loading && (
          <div className="text-center text-gray-500 py-12">
            <p>No journal entries yet.</p>
            <p className="text-sm">Click the + button to create your first entry!</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <JournalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        addEntry={addEntry}
        editEntry={editEntry}
        onEditSave={handleSaveEdit}
      />

      {/* Floating Action Button */}
      <FloatingButton icon={<Plus className="w-6 h-6" />} onClick={openModal} />
    </div>
  );
}