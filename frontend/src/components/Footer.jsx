const Footer = () => {
    const year = new Date().getFullYear();
  
    return (
      <footer className="bg-gray-900 text-gray-300 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left - App name */}
            <div className="text-lg font-semibold text-indigo-600">
              MindMirror <span className="text-gray-400 font-normal">© {year}</span>
            </div>
  
            {/* Middle - Links */}
            <div className="flex space-x-6 text-sm">
              <a href="https://github.com/tinoMukaro/" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </div>
  
            {/* Right - Built for */}
            <div className="text-sm text-gray-500 italic">
              • Built for self-awareness
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  