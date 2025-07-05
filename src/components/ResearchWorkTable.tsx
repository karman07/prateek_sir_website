import React from 'react';
import { useResearch } from '@/contexts/ResearchContext';
import { COLORS } from '@/constants/colors';
import { useNavigate } from 'react-router-dom';

const ResearchWorkTable: React.FC = () => {
  const projects = useResearch();
  const navigate = useNavigate();
  const visibleProjects = projects.slice(0, 5);

  return (
    <section className="w-full px-4 py-16 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white">
      <div className="max-w-none mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
          Research <span className={`${COLORS.gradientText}`}>Projects</span>
        </h2>

        <div className="overflow-x-auto rounded-2xl shadow-lg border border-slate-200">
          <table className="min-w-[1200px] w-full divide-y divide-slate-200 text-sm sm:text-base">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-4 text-left font-semibold">#</th>
                <th className="px-4 py-4 text-left font-semibold">Title</th>
                <th className="px-4 py-4 text-left font-semibold">Amount</th>
                <th className="px-4 py-4 text-left font-semibold">Agency</th>
                <th className="px-4 py-4 text-left font-semibold">Scheme</th>
                <th className="px-4 py-4 text-left font-semibold">Duration</th>
                <th className="px-4 py-4 text-left font-semibold">Investigators</th>
                <th className="px-4 py-4 text-left font-semibold">Learn More</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {visibleProjects.map((proj, index) => (
                <tr
                  key={proj._id}
                  className="hover:bg-slate-50 transition duration-300"
                >
                  <td className="px-4 py-4 font-medium text-slate-700">{index + 1}</td>
                  <td className="px-4 py-4">{proj.title}</td>
                  <td className="px-4 py-4">{proj.amount}</td>
                  <td className="px-4 py-4">{proj.fundingAgency}</td>
                  <td className="px-4 py-4">{proj.scheme}</td>
                  <td className="px-4 py-4">{proj.duration}</td>
                  <td className="px-4 py-4">{proj.investigators}</td>
                  <td className="px-4 py-4">
                    <span
                      onClick={() => navigate(`/research/${proj._id}`)}
                      className="text-sm text-blue-600 hover:underline cursor-pointer font-medium"
                    >
                      Learn More →
                    </span>
                  </td>
                </tr>
              ))}

              {projects.length > 5 && (
                <tr className="text-center bg-slate-50 hover:bg-slate-100 transition">
                  <td colSpan={8} className="py-4">
                    <button
                      onClick={() => navigate('/research')}
                      className="text-sm text-blue-600 hover:underline font-medium"
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
