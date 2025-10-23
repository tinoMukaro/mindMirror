import Button from "../components/Button"; 
import { PenTool, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {


  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center px-6">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold text-lime-600 mb-4">
          Mind Mirror
          <Brain className="inline-block w-8 h-8 text-lime-500 ml-2" />
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          A journal that listens. Reflects. Learns. Let your thoughts guide you
          and your patterns reveal themselves.
        </p>
      </header>

      
      <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">
       {/* Actions */}
      
        <Link to="/login">{/*tinoMukaro*/}
         <Button className="bg-lime-500 hover:bg-lime-600 text-white">
         <PenTool className="w-5 h-5 mr-2" />
         Start Journaling
         </Button>
        </Link> 

        
      </div>

      {/* Feature preview section */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-2xl shadow-md border border-lime-100">
          <h3 className="text-xl font-semibold mb-2 text-lime-700">Dominant Thought Detector</h3>
          <p className="text-sm text-gray-600">
            See which thoughts or emotions appear frequently over time.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl shadow-md border border-lime-100">
          <h3 className="text-xl font-semibold mb-2 text-lime-700">Weekly Summaries</h3>
          <p className="text-sm text-gray-600">
            Summaries that reflect what you've written.
          </p>
        </div>
      </section>
      </div>

  );
}