import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResearch } from '@/contexts/ResearchContext';
import { COLORS } from '@/constants/colors';
import { ArrowLeft } from 'lucide-react';

const ResearchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projects = useResearch();

  const project = projects.find((p) => p._id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600 text-lg">
        Research project not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span style={{ color: COLORS.accent }}>Back</span>
      </button>

      <div className="bg-white shadow-md rounded-xl p-6 md:p-10 space-y-6">
        <h1 className="text-3xl font-bold text-slate-800">{project.title}</h1>

        <div className="text-slate-600 leading-relaxed">
          <p><strong className="text-slate-700">Amount:</strong> {project.amount}</p>
          <p><strong className="text-slate-700">Funding Agency:</strong> {project.fundingAgency}</p>
          <p><strong className="text-slate-700">Scheme:</strong> {project.scheme}</p>
          <p><strong className="text-slate-700">Duration:</strong> {project.duration}</p>
          <p><strong className="text-slate-700">Investigators:</strong> {project.investigators}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Description</h2>
          <p className="text-slate-700 leading-relaxed">
            {project.discription?.trim()
              ? project.discription
              : 'This is a detailed research project conducted under prestigious funding, involving innovative methodologies and impactful outcomes aimed at academic and practical advancements.'}
          </p>
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-600 hover:underline"
            style={{ color: COLORS.accent }}
          >
            View Official Link →
          </a>
        )}
      </div>
    </div>
  );
};

export default ResearchDetails;
