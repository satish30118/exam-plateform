"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ManageResults = () => {
  const [results, setResults] = useState([]);

  const getReults = async () => {
    try {
      const { data } = await axios.get("/api/student-response/all-results");
      setResults(data.results);
      console.log(data.results)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReults();
  }, []);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Students Results</h2>
      {/* List of results */}
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-gray-800 rounded-lg text-center">
            <thead>
              <tr className="bg-gray-700 text-white text-center">
                <th className="px-4 py-3">Student ID</th>
                <th className="px-4 py-3">Exam Title</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Total Marks</th>
                <th className="px-4 py-3">Score Percentage</th>
                <th className="px-4 py-3">Exam Date</th>

              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result._id} className="hover:bg-gray-600 transition duration-300 text-gray-200 border-b border-gray-700">
                  <td className="px-4 py-3">{result?.studentId}</td>
                  <td className="px-4 py-3">{result?.examPaperId?.title}</td>
                  <td className="px-4 py-3">{result?.examPaperId?.course.toUpperCase()}</td>
                  <td className="px-4 py-3">{result?.score}</td>
                  <td className="px-4 py-3">{result?.examPaperId?.totalMarks}</td>
                  <td className="px-4 py-3">{(result?.score/result?.examPaperId?.totalMarks*100).toFixed(2)}%</td>
                  <td className="px-4 py-3 min-w-32">{result?.updatedAt.split("T")[0]}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageResults;
