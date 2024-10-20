// Results.js
import React from 'react';

const Results = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Results</h2>
      <ul className="bg-gray-900 p-4 rounded shadow">
        <li className="border-b border-gray-700 py-2 flex justify-between">
          <span>IoT Exam</span>
          <span>85%</span>
        </li>
        <li className="border-b border-gray-700 py-2 flex justify-between">
          <span>LibreOffice Exam</span>
          <span>90%</span>
        </li>
      </ul>
    </div>
  );
};

export default Results;
