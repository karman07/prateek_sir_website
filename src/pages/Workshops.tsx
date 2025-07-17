import React, { useState } from 'react';
import { useWorkshops } from '../contexts/WorkshopsContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Workshops: React.FC = () => {
  const { workshops } = useWorkshops();
  const [openYear, setOpenYear] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-20 px-4 sm:px-8 md:px-16 mt-24">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Workshops / <span className="text-blue-600">Seminars</span>
      </h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {workshops.map(({ year, events, _id }) => (
          <div
            key={_id || year}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <button
              onClick={() => setOpenYear(openYear === year ? null : year)}
              className="w-full flex justify-between items-center px-6 py-4 text-left bg-gray-100 hover:bg-gray-200 rounded-t-2xl transition"
            >
              <h2 className="text-2xl font-semibold text-blue-700">{year}</h2>
              <span className="text-gray-500">
                {openYear === year ? <ChevronUp /> : <ChevronDown />}
              </span>
            </button>

            {openYear === year && (
              <ul className="px-6 pb-6 pt-2 list-disc list-inside text-gray-700 space-y-2 text-base leading-relaxed">
                {events.map((event, idx) => (
                  <li key={idx}>{event}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workshops;
