import React from 'react';

type Props = {
  name: string;
  thesisTitle: string;
  degree: 'PhD' | 'Masters';
  year: string;
  image: string;
};

const StudentCard: React.FC<Props> = ({ name, thesisTitle, degree, year, image }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-md p-5 hover:shadow-xl transition-all">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 object-cover rounded-full border-2 border-blue-200"
        />
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{name}</h3>
          <span
            className={`inline-block text-xs mt-1 px-2 py-0.5 rounded-full font-medium ${
              degree === 'PhD' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
            }`}
          >
            {degree}
          </span>
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-2">
        <strong>Thesis:</strong> {thesisTitle}
      </p>
      <p className="text-sm text-slate-500">
        <strong>Year:</strong> {year}
      </p>
    </div>
  );
};

export default StudentCard;
