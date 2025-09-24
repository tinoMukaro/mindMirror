import { useState } from "react";
import api from "../services/api"; // adjust path if needed
import { Brain, Loader2, RefreshCcw } from "lucide-react";

export default function Insights() {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState(null);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.post("insights/generate"); // POST call
      setInsight(data);
    } catch (err) {
      console.error("Error fetching insights:", err);
      setError(err.message || "Failed to fetch insights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Mind Mirror
        <Brain className="inline-block w-8 h-8 text-indigo-500 ml-2" />
      </h1>

      <button
        onClick={fetchInsights}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 transition"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            Generating...
          </>
        ) : (
          <>
            <RefreshCcw className="w-5 h-5" />
            Generate Insights
          </>
        )}
      </button>

      {error && (
        <p className="text-red-400 text-lg mt-4">{error}</p>
      )}

      {insight && (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mt-6 max-w-xl w-full">
          <h2 className="text-xl font-semibold text-indigo-400 mb-2">
            Generated Insight:
          </h2>
          <pre className="text-gray-300 whitespace-pre-wrap text-sm">
            {JSON.stringify(insight, null, 2)}
          </pre>
        </div>
      )}

      {!insight && !error && (
        <p className="text-lg text-gray-400 max-w-xl mx-auto mt-4">
          No insights yet. Tap the button and let’s see what your mind is thinking.
        </p>
      )}
    </div>
  );
}
