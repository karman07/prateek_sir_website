import React from 'react';
import { useJournals } from '../contexts/JournalContext';

const JournalPublications: React.FC = () => {
  const { journals } = useJournals();

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-8 mt-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-slate-800">
          SCI <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">Publications</span>
        </h1>

        <ol className="space-y-10 list-decimal list-inside">
          {journals.map((j, idx) => (
            <li
              key={j._id || idx}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition"
            >
              <p className="text-lg text-slate-800 leading-relaxed">
                <strong>{j.authors}</strong>{' '}
                <span className="text-blue-600 font-medium">{j.title}</span>{' '}
                <em>{j.journal}</em>
                {j.volume ? ` ${j.volume}` : ''}
                {j.number ? `, no. ${j.number}` : ''}
                ({j.year}): {j.pages}.
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default JournalPublications;
