import Question from '@/components/tests/Question';
import QuestionPalette from '@/components/tests/QuestionPalette';
import TestHeader from '@/components/tests/TestHeader';
import React from 'react';

const TestPortal = () => {
  return (
    <div className="h-screen bg-gray-100 text-gray-900">
      {/* Top Header Bar */}
      <TestHeader />

      {/* Main Content */}
      <div className="flex p-4 h-4/5">

        {/* Left Section: Question Display */}
        <div className='w-9/12 static'>
          <div className="h-5/6 overflow-y-auto  bg-white p-4 rounded shadow-md">
            <Question />
          </div>
          <div className="bg-white p-4 flex justify-between">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Mark for Review</button>
            <button className="bg-orange-600 text-white px-4 py-2 rounded">Save & Mark for Review</button>
            <button className="bg-gray-200 text-black px-4 py-2 rounded">Clear Response</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded">Save & Next</button>
          </div>
          <div className=" p-4 flex justify-between">
            <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
            <div>
              <button className="bg-gray-200 text-black px-6 py-2 rounded ">&lt;&lt; Back</button>
              <button className="bg-gray-500 text-white px-6 py-2 rounded"> Next &gt;&gt; </button>
            </div>

          </div>
        </div>


        {/* Right Section: Question Palette */}
        <div className="max-h-screen overflow-y-auto w-4/12  bg-white p-4 ml-4 rounded shadow-md">
          <QuestionPalette />
        </div>
      </div>
    </div>
  );
};

export default TestPortal;
