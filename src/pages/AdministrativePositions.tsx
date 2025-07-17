import React from 'react';
import { useAdminPositions } from '../contexts/AdminPositionsContext';

const AdminPositions: React.FC = () => {
  const { positions } = useAdminPositions();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-8 mt-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Administrative Positions
        </h1>

        <ul className="space-y-4">
          {positions.map((pos) => (
            <li
              key={pos._id}
              className="bg-white border border-slate-200 shadow-sm rounded-xl px-5 py-4 text-slate-700 hover:shadow-md transition"
            >
              <span>{pos.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPositions;
