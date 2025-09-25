import { useState } from "react";
import api from "../services/api";
import { Brain, Loader2, RefreshCcw } from "lucide-react";

export default function Insights() {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState(null);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Making API call to insights/generate...');
      
      // Your API already handles baseURL and credentials
      const response = await api.post("insights/generate");
      console.log('API Response:', response);
      
      setInsight(response);
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error details:', err.response || err);
      
      // Your API interceptor returns error.response.data, so err should contain the error message
      const errorMessage = err.message || 
                          err.error || 
                          "Failed to generate insights. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center">
          Mind Mirror
          <Brain className="inline-block w-8 h-8 md:w-12 md:h-12 text-indigo-500 ml-2" />
        </h1>
        <p className="text-lg text-gray-400 max-w-xl">
          Get AI-powered insights from your journal entries. Understand your thoughts, emotions, and patterns.
        </p>
      </div>

      <button
        onClick={fetchInsights}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 transition-all duration-200 font-medium text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            Analyzing Your Journals...
          </>
        ) : (
          <>
            <RefreshCcw className="w-5 h-5" />
            Generate Insights
          </>
        )}
      </button>

      {error && (
        <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-xl max-w-xl w-full">
          <p className="text-red-400 text-lg font-medium">Error</p>
          <p className="text-red-300">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 text-red-300 hover:text-red-100 text-sm"
          >
            Dismiss
          </button>
        </div>
      )}

      {insight && (
        <div className="mt-8 max-w-4xl w-full space-y-6">
          {/* Insight Header */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-indigo-400">
                📊 Your Journal Insights
              </h2>
              <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm capitalize">
                {insight.type || 'ai_enhanced'} analysis
              </span>
            </div>
            <p className="text-gray-300 mb-2">
              {insight.message || 'Insights generated successfully'}
            </p>
            <p className="text-sm text-gray-500">
              Analyzed {insight.insights?.entriesAnalyzed || 0} journal entries
            </p>
          </div>

          {/* Summary Card */}
          {insight.insights?.summary && (
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-green-400 text-lg mb-3 flex items-center">
                📝 Summary
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {insight.insights.summary}
              </p>
            </div>
          )}

          {/* Sentiment Card */}
          {insight.insights?.sentiment && (
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-green-400 text-lg mb-3 flex items-center">
                😊 Sentiment Analysis
              </h3>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full font-medium capitalize ${
                  insight.insights.sentiment.label === 'positive' ? 'bg-green-600 text-green-100' :
                  insight.insights.sentiment.label === 'negative' ? 'bg-red-600 text-red-100' :
                  'bg-yellow-600 text-yellow-100'
                }`}>
                  {insight.insights.sentiment.label}
                </span>
                <span className="text-gray-300">
                  Confidence: {Math.round((insight.insights.sentiment.score || 0) * 100)}%
                </span>
              </div>
            </div>
          )}

          {/* Themes Card */}
          {insight.insights?.themes?.primaryThemes && insight.insights.themes.primaryThemes.length > 0 && (
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-green-400 text-lg mb-3 flex items-center">
                🎯 Key Themes
              </h3>
              <div className="flex flex-wrap gap-3">
                {insight.insights.themes.primaryThemes.map((theme, index) => (
                  <div key={theme} className="bg-indigo-600 px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="font-medium capitalize">{theme}</span>
                    <span className="text-indigo-200 text-sm">
                      {Math.round((insight.insights.themes.scores[index] || 0) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats Card */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="font-semibold text-green-400 text-lg mb-3 flex items-center">
              📈 Analysis Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div>
                <span className="text-gray-400">Entries Analyzed:</span>{' '}
                {insight.insights?.entriesAnalyzed || 0}
              </div>
              {insight.insights?.timeframe && (
                <>
                  <div>
                    <span className="text-gray-400">Timeframe:</span>{' '}
                    {insight.insights.timeframe.oldest ? 
                      new Date(insight.insights.timeframe.oldest).toLocaleDateString() : 'N/A'}
                    {' → '}
                    {insight.insights.timeframe.newest ? 
                      new Date(insight.insights.timeframe.newest).toLocaleDateString() : 'N/A'}
                  </div>
                </>
              )}
              {insight.insights?.averageEntryLength && (
                <div>
                  <span className="text-gray-400">Avg Entry Length:</span>{' '}
                  {insight.insights.averageEntryLength} words
                </div>
              )}
            </div>
          </div>

          {/* Regenerate Button */}
          <div className="text-center">
            <button
              onClick={fetchInsights}
              disabled={loading}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 px-6 py-2 rounded-xl flex items-center gap-2 mx-auto"
            >
              <RefreshCcw className="w-4 h-4" />
              Regenerate Insights
            </button>
          </div>
        </div>
      )}

      {!insight && !error && !loading && (
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-400 max-w-xl">
            No insights generated yet. Click the button above to analyze your journal entries and discover patterns in your thoughts.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            You'll need at least one journal entry to generate insights.
          </p>
        </div>
      )}
    </div>
  );
}