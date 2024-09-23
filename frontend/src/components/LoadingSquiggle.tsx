import React from "react";

const LoadingSquiggle: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="animate-draw"
      >
        <path
          d="M10 50 Q 25 25, 40 50 T 70 50 T 100 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
      </svg>
      <p className="mt-4 text-lg font-semibold">Loading...</p>
    </div>
  );
};

export default LoadingSquiggle;
