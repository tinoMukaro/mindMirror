import Button from "../components/Button"; 
import { PenTool, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-6">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Mind Mirror
          <Brain className="inline-block w-8 h-8 text-indigo-500 ml-2" />
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          A journal that listens. Reflects. Learns. Let your thoughts guide you—
          and your patterns reveal themselves.
        </p>
      </header>

      
      <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">
       {/* Actions */}
      
        <Link to="/login">{/*tinoMukaro*/}
         <Button className="bg-indigo-600 hover:bg-indigo-700">
         <PenTool className="w-5 h-5 mr-2" />
         Start Journaling
         </Button>
        </Link> 

        
      </div>

      {/* Feature preview section */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Dominant Thought Detector</h3>
          <p className="text-sm text-gray-400">
            See which thoughts or emotions appear frequently over time.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Monthly Summaries</h3>
          <p className="text-sm text-gray-400">
            Automatic summaries that reflect what you've written.
          </p>
        </div>
      </section>
      </div>

  );
}