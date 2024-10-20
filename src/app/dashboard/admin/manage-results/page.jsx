// pages/admin/results.js
import React from 'react';

const ViewResults = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">View Results</h2>
      {/* Result viewing functionality goes here */}
      <div className="bg-gray-900 p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-200">Results Overview</h3>
        <ul className="mt-2">
          <li className="border-b border-gray-700 py-2 flex justify-between">
            <span>Exam 1</span>
            <span>View Results</span>
          </li>
          <li className="border-b border-gray-700 py-2 flex justify-between">
            <span>Exam 2</span>
            <span>View Results</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ViewResults;
