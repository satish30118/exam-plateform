"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaClipboardList, FaCode, FaBook } from 'react-icons/fa';
import axios from 'axios'; 
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loader';

const TallyPage = ({ params }) => {
  const [tests, setTests] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [isStarted, setIsStarted] = useState(false);


  const router = useRouter()
  const handleRedirect = (route) => {
    setIsStarted(true)
    setTimeout(() => {
      router.push(route)
    }, 1500)
  }
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`/api/paper-data/getpapers?course=tally`); // Fetch test data from the API
        setTests(response.data); // Set the fetched data to state
        setLoading(false); // Disable loading state
      } catch (error) {
        console.error('Failed to fetch test data:', error);
        setLoading(false); // Disable loading state in case of error
      }
    };

    fetchTests();
  }, []);

  if (isStarted) return <Loading text="Wait, Redirecting to exam portal..." />

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-pink-600 text-center">Course on Computer Concepts (CCC)</h1>

      {/* Loading State */}
      {loading ? (
        <p className="text-white text-center mt-6">Loading tests...</p>
      ) : (
        <div className="mt-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Practice Tests</h2>
            <p className="mt-2 text-gray-400">
              Choose from the following mock tests to enhance your theoretical knowledge.
            </p>
            <div className="text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {tests.filter(test => test.type === 'mcq').map((test, index) => (
                <div key={index} className="bg-gray-900 p-3 py-7 rounded-lg shadow-md">
                  <div className="flex justify-center text-center pb-1">
                    <FaClipboardList className="text-blue-500 mt-1 text-xl" />
                    <h3 className="text-3xl text-center font-bold ml-2 text-yellow-600 pb-2 capitalize">{test.title}</h3>
                  </div>
                  <div className='flex justify-around px-3'>
                    <div>  <p className="text-gray-400">{test.totalMarks}</p><p className="text-gray-400">Marks</p></div>
                    <div>  <p className="text-gray-400">Topics</p><p className=" text-pink-600 capitalize">{test.chapter}</p></div>
                    <div> <p className="text-gray-400">{test.duration}</p> <p className="text-gray-400">Minutes</p></div>
                  </div>

                  <button onClick={() => handleRedirect(`/ExamPortal/StudentLogin?examId=${test._id}&examTitle=${test.title}&exam=tally&examType=MCQ&subjectCode="T1"`)} className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Start Exam
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default TallyPage;
