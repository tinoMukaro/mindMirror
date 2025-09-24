export default function FloatingButton({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-15 left-1/2 transform -translate-x-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg"
    >
      {icon}
    </button>
  );
}
