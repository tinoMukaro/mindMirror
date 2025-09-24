// src/components/EntryCard.jsx

import { Trash2, Pencil } from "lucide-react";

export default function EntryCard({ title, content, italic, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl shadow-md relative">
      {/* Top row: title + buttons */}
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        
        {/* Action buttons */}
        <div className="flex space-x-2">
          <button onClick={onEdit} className="text-indigo-400 hover:text-indigo-500">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="text-red-400 hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className={`text-sm ${italic ? "italic" : ""} text-gray-300`}>
        {content}
      </p>
    </div>
  );
}
