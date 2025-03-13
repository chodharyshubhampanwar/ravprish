import React from "react";

const VerticalDottedLines: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* Each line is absolutely positioned at certain percentages */}
      <div className="absolute top-0 left-[20%] w-px h-full border-r-2 border-dotted border-gray-200"></div>
      <div className="absolute top-0 left-[40%] w-px h-full border-r-2 border-dotted border-gray-200"></div>
      <div className="absolute top-0 left-[60%] w-px h-full border-r-2 border-dotted border-gray-200"></div>
      <div className="absolute top-0 left-[80%] w-px h-full border-r-2 border-dotted border-gray-200"></div>
    </div>
  );
};

export default VerticalDottedLines;
