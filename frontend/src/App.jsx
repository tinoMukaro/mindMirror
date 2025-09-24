import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Footer from "./components/Footer";
import Insights from "./pages/Insights";
import AuthPage from "./pages/AuthPage";


function App() {
  return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
}

export default App;