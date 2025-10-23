export default function FloatingButton({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-15 left-1/2 transform -translate-x-1/2 bg-lime-500 hover:bg-lime-600 text-white p-4 rounded-full shadow-lg"
    >
      {icon}
    </button>
  );
}