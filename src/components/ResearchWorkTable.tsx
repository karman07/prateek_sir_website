import React from 'react';
import { useResearch } from '@/contexts/ResearchContext';
import { COLORS } from '@/constants/colors';
import { useNavigate } from 'react-router-dom';

const ResearchWorkTable: React.FC = () => {
  const projects = useResearch();
  const navigate = useNavigate();
  const visibleProjects = projects.slice(0, 5);

  return (
    <section className="w-full px-4 py-16 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-none mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          Research <span style={{ color: COLORS.accent }}>Projects</span>
        </h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-[1200px] divide-y divide-slate-200 text-sm sm:text-base">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">#</th>
                <th className="px-4 py-3 text-left font-semibold">Title</th>
                <th className="px-4 py-3 text-left font-semibold">Amount</th>
                <th className="px-4 py-3 text-left font-semibold">Agency</th>
                <th className="px-4 py-3 text-left font-semibold">Scheme</th>
                <th className="px-4 py-3 text-left font-semibold">Duration</th>
                <th className="px-4 py-3 text-left font-semibold">Investigators</th>
                <th className="px-4 py-3 text-left font-semibold">Learn More</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleProjects.map((proj, index) => (
                <tr
                  key={proj._id}
                  className="hover:bg-slate-50 transition duration-300"
                >
                  <td className="px-4 py-3 font-medium text-slate-700">{index + 1}</td>
                  <td className="px-4 py-3">{proj.title}</td>
                  <td className="px-4 py-3">{proj.amount}</td>
                  <td className="px-4 py-3">{proj.fundingAgency}</td>
                  <td className="px-4 py-3">{proj.scheme}</td>
                  <td className="px-4 py-3">{proj.duration}</td>
                  <td className="px-4 py-3">{proj.investigators}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/research/${proj._id}`)}
                      className="text-blue-600 hover:underline font-medium"
                      style={{ color: COLORS.accent }}
                    >
                      Learn More →
                    </button>
                  </td>
                </tr>
              ))}

              {projects.length > 5 && (
                <tr className="hover:bg-slate-100 text-center">
                  <td colSpan={8} className="py-4">
                    <button
                      onClick={() => navigate('/research')}
                      className="text-sm text-blue-600 hover:underline font-medium"
                      style={{ color: COLORS.accent }}
                    >
                      Show More Projects →
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ResearchWorkTable;
