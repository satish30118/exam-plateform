"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaClipboardList, FaCode, FaBook } from 'react-icons/fa';
import axios from 'axios'; // Import Axios
import { useSearchParams } from 'next/navigation';

const ManageExamPage = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const params = useSearchParams()
  const [course, setCourse] = useState(params.get("course"));

  // Fetch the test data when the component mounts
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`/api/paper-data/getpapers?course=${course}`);
        setTests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch test data:', error);
        setLoading(false);
      }
    };

    fetchTests();
  }, [course]);

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-pink-600 text-center">{course?.toUpperCase()} Papers Management</h1>
      <div className='max-w-3xl mt-8 mx-auto text-center '>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="p-3 w-full rounded bg-gray-700 text-gray-200"
          required
        >
          <option value="">-- Select Course --</option>
          <option value="olevel">O Level</option>
          <option value="alevel">A Level</option>
          <option value="dca">DCA</option>
          <option value="adca">ADCA</option>
          <option value="tally">Tally</option>
          <option value="ccc">CCC</option>
          <option value="cuet">CUET(UG)</option>
        </select>
      </div>
      {/* Loading State */}
      {loading ? (
        <p className="text-white text-center mt-6">Loading tests...</p>
      ) : (
        <div className="mt-6">
          <div>

            <div className="text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {tests.map((test, index) => (
                <div key={index} className="bg-gray-900 p-3 py-7 rounded-lg shadow-md">
                  <div className="flex justify-center text-center pb-1">
                    <FaClipboardList className="text-blue-500 mt-1 text-2xl" />
                    <h3 className="text-xl text-center font-bold ml-2 text-yellow-600 pb-2">{test.syllabus} {test.title} </h3>
                  </div>
                  <div>{test?.chapter && <div className='text-pink-600 text-sm font-bold pb-3'>Topic - {test.chapter}</div>}</div>
                  <div className='flex justify-around px-3 pb-3'>
                    <div className='text-sm'>  <p className="text-gray-400">{test.totalMarks}</p><p className="text-gray-400">Marks</p></div>
                    <div className='text-sm'>  <p className="text-gray-400">{test.totalQuestions}</p><p className=" text-gray-400">Questions</p></div>
                    <div className='text-sm'> <p className="text-gray-400">{test.duration}</p> <p className="text-gray-400">Minutes</p></div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ManageExamPage;
