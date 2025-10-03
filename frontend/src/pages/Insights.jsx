import { Brain, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import api from "../services/api";

export default function Insights() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const generateSummary = async () => {
    setIsLoading(true);
    setError(null);
    setSummary(null);

    try {
      const data = await api.post('summary/weekly');
      setSummary(data);
    } catch (err) {
      setError(err.message || 'Failed to generate insights');
      console.error('Error generating summary:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Brain className="w-12 h-12 text-indigo-500 mr-4" />
            <h1 className="text-4xl font-bold text-white">
              Mind Mirror
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            AI-powered insights from your recent journal entries
          </p>
        </div>

        {/* Generate Summary Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center mb-8 shadow-2xl">
          <div className="max-w-md mx-auto">
            <button
              onClick={generateSummary}
              disabled={isLoading}
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center mx-auto gap-3 w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Insights...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  View Weekly Insights
                </>
              )}
            </button>
            <p className="text-indigo-200 text-sm mt-4">
              Get a thoughtful AI summary of your 7 most recent journal entries
            </p>
          </div>
        </div>

        {/* Summary Display */}
        {summary && (
          <div className="bg-gray-800 rounded-2xl p-8 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-indigo-400" />
                Your Weekly Insights
              </h3>
              <div className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
                {summary.entriesProcessed} entries analyzed
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-100 text-lg leading-relaxed whitespace-pre-wrap">
                {summary.summary}
              </p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-red-400 mb-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold">Unable to Generate Insights</h3>
            </div>
            <p className="text-red-300">{error}</p>
            <button
              onClick={generateSummary}
              className="mt-4 bg-red-500/20 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
