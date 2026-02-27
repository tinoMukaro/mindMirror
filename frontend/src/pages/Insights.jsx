import { Brain, Loader2 } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Weekly Insights
            </h1>
          </div>
          <p className="text-gray-600 max-w-xl mx-auto">
            AI-powered analysis of your recent journal entries
          </p>
        </div>

        {/* Generate Summary Section */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200 shadow-sm">
          <div className="max-w-md mx-auto">
            <button
              onClick={generateSummary}
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center mx-auto gap-2 w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Insights...
                </>
              ) : (
                'Generate Weekly Insights'
              )}
            </button>
            <p className="text-gray-500 text-sm mt-3 text-center">
              Analysis of your 7 most recent journal entries
            </p>
          </div>
        </div>

        {/* Summary Display */}
        {summary && (
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Your Weekly Summary
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Based on {summary.entriesProcessed} journal entries
                </p>
              </div>
              <div className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                AI Analysis
              </div>
            </div>
            
            <div className="prose max-w-none">
              <div className="bg-gray-50 rounded-lg p-5">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {summary.summary}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 rounded-xl p-6 border border-red-100">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">
                  Unable to generate insights
                </h3>
                <p className="text-red-600 text-sm mb-3">{error}</p>
                <button
                  onClick={generateSummary}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
