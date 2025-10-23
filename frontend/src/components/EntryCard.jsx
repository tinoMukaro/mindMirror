
import { Trash2, Pencil } from "lucide-react";

export default function EntryCard({ title, content, italic, onEdit, onDelete }) {
  return (
    <div className="bg-white hover:bg-gray-50 p-4 rounded-xl shadow-md border border-lime-100 relative">
      {/* Top row: title + buttons */}
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-lg font-semibold text-lime-700">{title}</h3>
        
        {/* Action buttons */}
        <div className="flex space-x-2">
          <button onClick={onEdit} className="text-lime-500 hover:text-lime-600">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="text-red-500 hover:text-red-600">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className={`text-sm ${italic ? "italic" : ""} text-gray-600`}>
        {content}
      </p>
    </div>
  );
}