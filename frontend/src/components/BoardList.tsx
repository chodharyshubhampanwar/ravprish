// src/components/BoardList.tsx
import React from "react";
import { examBoards } from "../examBoards";

const BoardList: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      {/* Header Row */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Chapter wise PYQ Bank
        </h2>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View All
        </a>
      </div>

      {/* Grid of Boards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {examBoards.map((board) => (
          <div
            key={board.name}
            className="flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src="https://cdn.aglasem.com/centralised/org-logo/up-board.jpg"
              alt={`${board.name} Logo`}
              className="mb-2 h-16 w-16 object-contain"
            />
            <p className="text-sm font-medium text-gray-700">{board.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardList;
