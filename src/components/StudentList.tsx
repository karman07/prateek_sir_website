import React, { useState } from 'react';
import { useStudents } from '@/contexts/StudentContext';
import { COLORS } from '@/constants/colors';
import StudentCard from './StudentCard';

const StudentList: React.FC = () => {
  const students = useStudents();

  const phdStudents = students.filter((s) => s.degree === 'PhD');
  const mastersStudents = students.filter((s) => s.degree === 'Masters');

  const [showMorePhD, setShowMorePhD] = useState(false);
  const [showMoreMasters, setShowMoreMasters] = useState(false);

  const renderToggleButton = (showMore: boolean, toggle: () => void) => (
    <div className="text-center mt-6">
      <button
        onClick={toggle}
         className={`px-6 py-2 rounded-lg text-sm font-medium text-white transition duration-300 ${COLORS.gradientAccent}`}
      >
        {showMore ? (
          <>
            View Less 
          </>
        ) : (
          <>
            View More  
          </>
        )}
      </button>
    </div>
  );

  return (
    <section
      className="w-full px-6 py-20 sm:px-8 md:px-16 lg:px-24 xl:px-32"
      style={{ backgroundColor: '#fff', color: COLORS.textPrimary2 }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-slate-800">
          My Research <span className={COLORS.gradientText}>Scholars</span>
        </h2>

        {/* PhD Students */}
        <div className="mb-14">
          <h3 className="text-2xl font-semibold text-slate-800 mb-6">PhD Students</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showMorePhD ? phdStudents : phdStudents.slice(0, 3)).map((s) => (
              <StudentCard key={s._id} {...s} />
            ))}
          </div>
          {phdStudents.length > 3 &&
            renderToggleButton(showMorePhD, () => setShowMorePhD(!showMorePhD))}
        </div>

        {/* Master's Students */}
        <div>
          <h3 className="text-2xl font-semibold text-slate-800 mb-6">Master's Students</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showMoreMasters ? mastersStudents : mastersStudents.slice(0, 3)).map((s) => (
              <StudentCard key={s._id} {...s} />
            ))}
          </div>
          {mastersStudents.length > 3 &&
            renderToggleButton(showMoreMasters, () =>
              setShowMoreMasters(!showMoreMasters)
            )}
        </div>
      </div>
    </section>
  );
};

export default StudentList;
