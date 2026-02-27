import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Brain } from "lucide-react";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-end mb-6 relative">
      <h1 className="text-3xl font-bold mr-auto text-lime-700">
        Journal
      </h1>

      {/* Search */}
      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 mr-1.5 border border-lime-200">
        <Search className="w-5 h-5 text-gray-600" />
      </button>

      {/* User Button */}
      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(prev => !prev)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 border border-lime-200"
        >
          <User className="w-5 h-5 text-gray-600" />
        </button>

        <UserMenu
          isOpen={isUserMenuOpen}
          onClose={() => setIsUserMenuOpen(false)}
        />
      </div>

      {/* Insights */}
      <Link to="/insights">
        <button className="p-2 rounded-4xl bg-lime-500 hover:bg-lime-600 text-white ml-1.5">
          <Brain className="w-5 h-5" />
        </button>
      </Link>
    </div>
  );
};

export default Header;