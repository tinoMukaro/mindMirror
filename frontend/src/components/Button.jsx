
export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-6 py-2 rounded-xl font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
