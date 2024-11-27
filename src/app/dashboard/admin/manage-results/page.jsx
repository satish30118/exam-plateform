"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaEnvelope } from 'react-icons/fa';

const ManageResults = () => {
  const [results, setResults] = useState([]);
  const [studentId, setStudentId] = useState(null)

  const getReults = async () => {
    if (!studentId) {
      toast.warn("Enter Student Id")
      return;
    }
    try {
      const { data } = await axios.get(`/api/student-response/all-results?studentId=${studentId}`);
      if (data.results.length == 0) {
        toast.warn("No results found, please check student Id")
        setResults([])
        return
      }
      setResults(data.results);

      // console.log(data.results)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendEmail = async (result) => {
    const { data } = await axios.post("/api/student-response/send-result", { result });
    toast.success(data?.message)
  }

  return (
    <div className="text-white">
      <div className='mb-6 mx-20'>
        <input type="text" placeholder='Enter student ID' value={studentId} onChange={(e) => setStudentId(e.target.value)} className='w-80 p-2 px-4 mx-auto text-center text-black rounded-sm' />
        <button className="mt-4 inline-block bg-blue-600 text-white py-2 rounded-l-none px-4 rounded hover:bg-blue-700" onClick={getReults}>Get Results</button>
      </div>

      {/* List of results */}
      {results.length != 0 && <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Students Results</h2>
        <div className='pb-3'>
          <div>Student ID : {results[0]?.studentId} </div>
          
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-gray-800 rounded-lg text-center">
            <thead>
              <tr className="bg-gray-700 text-white text-center">
                <th className="px-4 py-3 w-10"> Result</th>
                <th className="px-4 py-3">Exam Title</th>
                <th className="px-4 py-3">Exam Syllabus</th>
                <th className="px-4 py-3">Exam Subject</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Total Marks</th>
                <th className="px-4 py-3">Percentage</th>
                <th className="px-4 py-3">Exam Date</th>

              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result._id} className="hover:bg-gray-600 transition duration-300 text-gray-200 border-b border-gray-700">
                  <td className="px-4 py-3 flex justify-center items-center"><FaEnvelope onClick={() => handleSendEmail(result)} className='cursor-pointer' title='Send Result' /></td>
                  <td className="px-4 py-3">{result?.examPaperId?.title}</td>
                  <td className="px-4 py-3">{result?.examPaperId?.syllabus}</td>
                  <td className="px-4 py-3">{result?.examPaperId?.subject}</td>
                  <td className="px-4 py-3">{result?.examPaperId?.course.toUpperCase()}</td>
                  <td className="px-4 py-3">{result?.score}</td>
                  <td className="px-4 py-3">{result?.examPaperId?.totalMarks}</td>
                  <td className="px-4 py-3">{(result?.score / result?.examPaperId?.totalMarks * 100).toFixed(2)}%</td>
                  <td className="px-4 py-3 min-w-32">{result?.updatedAt.split("T")[0]}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}

    </div>
  );
};

export default ManageResults;
