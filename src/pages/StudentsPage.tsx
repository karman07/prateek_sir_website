import React, { useState } from 'react';
import { useStudents } from '@/contexts/StudentContext';
import StudentCard from '@/components/StudentCard';

const StudentsPage: React.FC = () => {
  const students = useStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const [degreeFilter, setDegreeFilter] = useState<'All' | 'PhD' | 'Masters'>('All');

  const filteredStudents = students.filter((student) => {
    const matchesDegree = degreeFilter === 'All' || student.degree === degreeFilter;
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.thesisTitle.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDegree && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-24">
      <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">PhD & Master's Students</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name or thesis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={degreeFilter}
          onChange={(e) => setDegreeFilter(e.target.value as 'All' | 'PhD' | 'Masters')}
          className="w-full md:w-40 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Degrees</option>
          <option value="PhD">PhD</option>
          <option value="Masters">Masters</option>
        </select>
      </div>

      {/* Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student._id}
              name={student.name}
              thesisTitle={student.thesisTitle}
              degree={student.degree}
              year={student.year}
              image={student.image}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500">No students found.</p>
      )}
    </div>
  );
};

export default StudentsPage;
