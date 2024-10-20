// pages/admin/exams.js
import React from 'react';

const ManageExams = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Manage Exams</h2>
      {/* Exam management functionality goes here */}
      <div className="bg-gray-900 p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-200">Current Exams</h3>
        <ul className="mt-2">
          <li className="border-b border-gray-700 py-2 flex justify-between">
            <span>Web Designing</span>
            <span>Edit</span>
          </li>
          <li className="border-b border-gray-700 py-2 flex justify-between">
            <span>Python Programming</span>
            <span>Edit</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ManageExams;
