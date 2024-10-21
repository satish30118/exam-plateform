"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaClipboardList, FaCode, FaBook } from 'react-icons/fa';
import axios from 'axios'; // Import Axios
import { useSearchParams } from 'next/navigation';

const WebDesigningPage = ({params}) => {
  const [selectedSection, setSelectedSection] = useState('theory');
  const [tests, setTests] = useState([]); // State to hold test data
  const [loading, setLoading] = useState(true); // Loading state

  const searchParams = useSearchParams()
  const {subjectCode} = params;
  const subject = searchParams.get('sub');

  // Fetch the test data when the component mounts
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`/api/paper-data/getpapers?course=olevel&subject=${subjectCode}`); // Fetch test data from the API
        setTests(response.data); // Set the fetched data to state
        setLoading(false); // Disable loading state
      } catch (error) {
        console.error('Failed to fetch test data:', error);
        setLoading(false); // Disable loading state in case of error
      }
    };

    fetchTests();
  }, [subjectCode]);

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
          <button
            onClick={() => setSelectedSection('notes')}
            className={`px-4 py-2 rounded ${selectedSection === 'notes' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Chapter-wise Notes
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-white text-center mt-6">Loading tests...</p>
      ) : (
        <div className="mt-6">
          {selectedSection === 'theory' && (
            <div>
              <h2 className="text-2xl font-semibold text-white">Theoretical Tests</h2>
              <p className="mt-2 text-gray-400">
                Choose from the following mock tests to enhance your theoretical knowledge.
              </p>
              <div className="text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                {tests.filter(test => test.type === 'theoretical').map((test, index) => (
                  <div key={index} className="bg-gray-900 p-3 py-7 rounded-lg shadow-md">
                    <div className="flex justify-center text-center pb-1">
                      <FaClipboardList className="text-blue-500 mt-1 text-xl" />
                      <h3 className="text-lg text-center font-bold ml-2 text-yellow-600">{test.title}</h3>
                    </div>
                    <p className="text-pink-600 text-lg">{test.chapter}</p>
                    <p className="text-gray-400 text-xs">Marks: {test.totalMarks}</p>
                    <p className="text-gray-400 text-xs">Duration: {test.duration}mins</p>

                    <Link href={`/ExamPortal/StudentLogin?examId=${test._id}&examTitle=${test.title}&exam=olevel&examType=MCQ&subjectCode=${test.subject}`} className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                      Take Test
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedSection === 'practical' && (
            <div>
              <h2 className="text-2xl font-semibold text-white">Practical Tests</h2>
              <p className="mt-2 text-gray-400">
                The Practical Exam includes creating a web page using HTML, CSS, and JavaScript. 
                Students will be required to demonstrate their skills through coding.
              </p>
              <div className="text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                {tests.filter(test => test.type === 'practical').map((test, index) => (
                  <div key={index} className="bg-gray-900 p-3 py-7 rounded-lg shadow-md">
                    <div className="flex items-center justify-center text-center pb-1">
                      <FaClipboardList className="text-blue-500" />
                      <h3 className="text-lg text-center font-bold ml-2 text-yellow-600">{test.title}</h3>
                    </div>
                    <p className="text-pink-600 text-lg">{test.chapter}</p>
                    <p className="text-gray-400 text-xs">Marks: {test.totalMarks}</p>
                    <p className="text-gray-400 text-xs">Duration: {test.duration}mins</p>

                    <Link href={`/ExamPortal/StudentLogin?examId=${test._id}&examTitle=${test.title}&exam=olevel&examType=Practical&subjectCode=${test.subject}`} className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                      Take Test
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedSection === 'notes' && (
            <div>
              <h2 className="text-2xl font-semibold text-white">Chapter-wise Notes</h2>
              <p className="mt-2 text-gray-400">
                Here are the notes organized by chapter to help you study effectively.
              </p>
              <div className="mt-4 space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white">Chapter 1: Introduction to Web Design</h3>
                  <p className="mt-2 text-gray-400">Overview of web design principles and best practices.</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white">Chapter 2: HTML Basics</h3>
                  <p className="mt-2 text-gray-400">Understanding HTML structure and elements.</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white">Chapter 3: CSS Styling</h3>
                  <p className="mt-2 text-gray-400">Applying styles and layouts using CSS.</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white">Chapter 4: JavaScript Basics</h3>
                  <p className="mt-2 text-gray-400">Introduction to JavaScript and its use in web design.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WebDesigningPage;
