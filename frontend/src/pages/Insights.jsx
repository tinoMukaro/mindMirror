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
    <div className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Brain className="w-12 h-12 text-lime-500 mr-4" />
            <h1 className="text-4xl font-bold text-lime-700">
              Mind Mirror
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI-powered insights from your recent journal entries
          </p>
        </div>

        {/* Generate Summary Section */}
        <div className="bg-gradient-to-r from-lime-500 to-lime-600 rounded-2xl p-8 text-center mb-8 shadow-2xl">
          <div className="max-w-md mx-auto">
            <button
              onClick={generateSummary}
              disabled={isLoading}
              className="bg-white text-lime-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center mx-auto gap-3 w-full"
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
            <p className="text-lime-100 text-sm mt-4">
              Get a thoughtful AI summary of your 7 most recent journal entries
            </p>
          </div>
        </div>

        {/* Summary Display */}
        {summary && (
          <div className="bg-gray-50 rounded-2xl p-8 border border-lime-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-lime-700 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-lime-500" />
                Your Weekly Insights
              </h3>
              <div className="text-sm text-gray-600 bg-lime-100 px-3 py-1 rounded-full">
                {summary.entriesProcessed} entries analyzed
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-lime-100">
              <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                {summary.summary}
              </p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold">Unable to Generate Insights</h3>
            </div>
            <p className="text-red-500">{error}</p>
            <button
              onClick={generateSummary}
              className="mt-4 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}