"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaClipboardList, FaCode, FaBook } from 'react-icons/fa';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/components/Loader';
import { ExamCard } from '@/components/ExamCard';

const OlevelPage = ({ params }) => {
  const [selectedSection, setSelectedSection] = useState('theory');
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false)

  const searchParams = useSearchParams()
  const { subjectCode } = params;
  const subject = searchParams.get('sub');

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
        const response = await axios.get(`/api/paper-data/getpapers?course=olevel&subject=${subjectCode}`); // Fetch test data from the API
        setTests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch test data:', error);
        setLoading(false);
      }
    };

    fetchTests();
  }, [subjectCode]);

  if (isStarted) return <Loading text={"Wait, Redirecting to exam portal..."} />

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-pink-600 text-center">{subject}</h1>

      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold text-yellow-600">Choose a Section</h2>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setSelectedSection('theory')}
            className={`px-4 py-2 rounded ${selectedSection === 'theory' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Theoretical Tests
          </button>
          <button
            onClick={() => setSelectedSection('practical')}
            className={`px-4 py-2 rounded ${selectedSection === 'practical' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Practical Tests
          </button>

        </div>
      </div>
      <br />
      <hr />

      {/* Loading State */}
      {loading ? (
        <p className="text-white text-center mt-6">Loading tests...</p>
      ) : (
        <div className="mt-6">
          {selectedSection === 'theory' && (
            <div>
              <div>
                <h2 className="text-2xl font-semibold text-white text-center">Topic Wise Test</h2>
                <div className="text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                  {tests.filter((test) => test.syllabus === "Topic Wise").map((test, index) => (
                    <div key={index} className="bg-gray-900 p-3 py-7 rounded-lg shadow-md">
                      <ExamCard data={test} />
                      <button onClick={() => handleRedirect(`/ExamPortal/StudentLogin?examId=${test._id}&examTitle=${test.title}&exam=olevel&examType=MCQ&subjectCode=${test.subject}`)} className={`mt-4 inline-block bg-${!test.isActive ? "gray-800" : "green-700"} text-white py-2 px-4 rounded hover:bg-blue-700  cursor-${!test.isActive && "not-allowed"}` } disabled={!test.isActive}>
                        {isStarted
                          ? "Wait Starting..."
                          : new Date(toString(test.examDate)) <= new Date() && test.isActive
                            ? "Start Exam"
                            : new Date(toString(test.examDate)) <= new Date() && !test.isActive
                              ? "Exam Expired"
                              : "Exam Not Started"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <br /> <hr /><br />
              <div>
                <h2 className="text-2xl font-semibold text-white text-center">Chapter Wise Test</h2>
                <div className="text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                  {tests.filter((test) => test.syllabus === "Chapter Wise").map((test, index) => (
                    <div key={index} className="bg-gray-900 p-3 py-7 rounded-lg shadow-md">
                      <ExamCard data={test} />
                      <button onClick={() => handleRedirect(`/ExamPortal/StudentLogin?examId=${test._id}&examTitle=${test.title}&exam=olevel&examType=MCQ&subjectCode=${test.subject}`)} className={`mt-4 inline-block bg-${!test.isActive ? "gray-800" : "green-700"} text-white py-2 px-4 rounded hover:bg-blue-700  cursor-${!test.isActive && "not-allowed"}`} disabled={!test.isActive}>
                        {isStarted
                          ? "Wait Starting..."
                          :  test.isActive
                            ? "Start Exam"
                            : !test.isActive
                              ? "Exam Expired"
                              : "Exam Not Started"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <br />
              <hr /> <br />
              <div>
                <h2 className="text-2xl font-semibold text-white text-center">Full Syllabus Test</h2>
                <div className="text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                  {tests.filter((test) => test.syllabus === "Full Syllabus").map((test, index) => (
                    <div key={index} className="bg-gray-900 p-3 py-7 rounded-lg shadow-md">
                      <ExamCard data={test} />
                      <button onClick={() => handleRedirect(`/ExamPortal/StudentLogin?examId=${test._id}&examTitle=${test.title}&exam=olevel&examType=MCQ&subjectCode=${test.subject}`)} className={`mt-4 inline-block bg-${!test.isActive ? "gray-800" : "green-700"} text-white py-2 px-4 rounded hover:bg-blue-700  cursor-${!test.isActive && "not-allowed"}`} disabled={!test.isActive}>
                        {isStarted
                          ? "Wait Starting..."
                          : new Date(test.examDate) <= new Date() && test.isActive
                            ? "Start Exam"
                            : new Date(test.examDate) <= new Date() && !test.isActive
                              ? "Exam Expired"
                              : "Exam Not Started"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedSection === 'practical' && (
            <div>
              <h2 className="text-2xl font-semibold text-white">Practical Tests</h2>
              <div className="text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                Comming soon....
              </div>
            </div>
          )}


        </div>
      )}
    </div>
  );
};

export default OlevelPage;
