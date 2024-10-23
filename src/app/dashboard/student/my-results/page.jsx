"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '@/components/Loader'; // Assuming you have a loader component
import Link from 'next/link'; // Import Link for navigation
import { useSession } from 'next-auth/react';

const Results = () => {
  const [results, setResults] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const {data:session} = useSession()

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const studentId = session?.userId
        const { data } = await axios.get(`/api/student-response/student-results?studentId=${studentId}`);
        
        if (data.success) {
          setResults(data.results);
        } else {
          toast.error(data.message || 'Failed to fetch results');
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return <Loading text="Loading results..." />;
  }

  return (
    <div className="text-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      {results && results.length > 0 ? (
        results.map((result) => (
          <div key={result._id} className="bg-gray-900 p-3 py-7 rounded-lg shadow-md">
            <div className="flex justify-center text-center pb-1">
              <h3 className="text-3xl text-center font-bold ml-2 text-yellow-600">
              {result.examPaperId?.syllabus} {result.examPaperId?.title}
              </h3>
            </div>
            <div className='text-green-600 text-sm font-bold'>
              Course - {result.examPaperId.course.toUpperCase()} ({result.examPaperId.subject.toUpperCase()})
            </div>
            {result.examPaperId.chapter && <div className='text-green-600 text-sm font-bold pb-3'>
              Chapter - {result.examPaperId.chapter}
            </div>}
            <div className='text-pink-600 text-lg font-bold pb-3'>
              Score - {result.score}
            </div>
            <div className='flex justify-around px-3 pb-3'>
              <div>
                <p className="text-gray-400">{result?.examPaperId?.totalMarks}</p>
                <p className="text-gray-400">Total Marks</p>
              </div>
              <div>
                <p className="text-gray-400">{result?.examPaperId?.totalQuestions}</p>
                <p className="text-gray-400">Questions</p>
              </div>
              <div>
                <p className="text-gray-400">{result?.examPaperId?.duration}</p>
                <p className="text-gray-400">Minutes</p>
              </div>
            </div>
            <Link href={`/ExamFeedback/ExamResult?responseId=${result?._id}`} className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              View Details
            </Link>
          </div>
        ))
      ) : (
        <div className="text-gray-400">No results found.</div>
      )}
    </div>
  );
};

export default Results;
