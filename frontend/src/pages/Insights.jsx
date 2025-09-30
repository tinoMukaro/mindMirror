import { Brain, Sparkles, BarChart3, Heart, Target, Calendar } from "lucide-react";

export default function Insights() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Analysis",
      description: "Get intelligent summaries of your journal entries using advanced natural language processing"
    },
    {
      icon: BarChart3,
      title: "Emotional Trends",
      description: "Track your mood patterns and emotional journey over time with sentiment analysis"
    },
    {
      icon: Heart,
      title: "Personal Insights",
      description: "Discover recurring themes and patterns in your thoughts and experiences"
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Identify progress towards your personal goals and aspirations"
    },
    {
      icon: Calendar,
      title: "Timeline View",
      description: "See how your thoughts and feelings evolve across different time periods"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Brain className="w-16 h-16 text-indigo-500 mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Mind Mirror
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            AI-powered journal insights that help you understand yourself better
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center mb-16 shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-black/20 text-white text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Coming Soon
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Insights Are on Their Way
            </h2>
            <p className="text-indigo-100 text-lg mb-6">
              We're working hard to bring you AI-powered analysis of your journal entries. 
              This feature will help you discover patterns, track emotions, and gain deeper self-awareness.
            </p>
            <div className="bg-white/10 rounded-lg p-4 inline-block">
              <p className="text-white font-semibold">
                Expected Launch: End of October
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            What to Expect
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-indigo-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white ml-4">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center text-white mb-8">
            How It Will Work
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg">
                1
              </div>
              <h4 className="text-xl font-semibold text-white">Write Journals</h4>
              <p className="text-gray-400">
                Continue writing your daily thoughts and experiences as you normally do
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg">
                2
              </div>
              <h4 className="text-xl font-semibold text-white">Generate Insights</h4>
              <p className="text-gray-400">
                Click the analyze button to process your entries with AI technology
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg">
                3
              </div>
              <h4 className="text-xl font-semibold text-white">Discover Patterns</h4>
              <p className="text-gray-400">
                Receive meaningful insights about your thoughts, emotions, and growth
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}