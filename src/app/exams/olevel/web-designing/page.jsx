"use client"
import Link from 'next/link';
import {useState } from 'react';
import { FaClipboardList, FaCode, FaBook } from 'react-icons/fa';

const WebDesigningPage = () => {
  const [selectedSection, setSelectedSection] = useState('theory');
 
  const tests = [
    {
      title: 'Full Theoretical Test',
      description: 'Complete mock test covering all theoretical aspects of Web Design.',
      icon: <FaClipboardList className="text-blue-500" />,
      link: '/olevel/tests/web-design-theory',
    },
    {
      title: 'Chapter-wise Theoretical Test',
      description: 'Mock tests for each chapter to reinforce your understanding.',
      icon: <FaBook className="text-blue-500" />,
      link: '/olevel/tests/web-design-chapterwise',
    },
    {
      title: 'Practical Exam',
      description: 'Create a webpage using HTML, CSS, and JavaScript.',
      icon: <FaCode className="text-blue-500" />,
      link: '/olevel/tests/web-design-practical',
    },
  ];

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-pink-600 text-center">Web Designing & Publishing (M2-R5)</h1>

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

      <div className="mt-6">
        {selectedSection === 'theory' && (
          <div>
            <h2 className="text-2xl font-semibold text-white">Theoretical Tests</h2>
            <p className="mt-2 text-gray-400">
              Choose from the following mock tests to enhance your theoretical knowledge.
            </p>
            <div className="text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {tests.slice(0, 2).map((test, index) => (
                <div key={index} className="bg-gray-900 p-3 py-7 rounded-lg shadow-md">
                  <div className="flex items-center justify-center mb-2 text-center pb-3">
                    {test.icon}
                    <h3 className="text-lg text-center font-bold  ml-2 text-yellow-600">{test.title}</h3>
                  </div>
                  <p className="text-gray-400">{test.description}</p>
                  <Link href={`/ExamPortal/StudentLogin?examId=${index}&examTitle=${test.title}`} className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
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
            <Link href={tests[2].link} className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Start Practical Test
            </Link>
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
              {/* Add more chapters as needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebDesigningPage;
