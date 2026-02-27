import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef();
  const navigate = useNavigate();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-2xl p-2 border border-gray-100 z-50
                 transition-all duration-200 ease-out"
    >
      <button
        onClick={() => {
          navigate("/profile");
          onClose();
        }}
        className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
      >
        Profile
      </button>

      <button
        onClick={() => {
          navigate("/settings");
          onClose();
        }}
        className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
      >
        Settings
      </button>

      <hr className="my-2" />

      <button
        onClick={handleLogout}
        className="block w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;