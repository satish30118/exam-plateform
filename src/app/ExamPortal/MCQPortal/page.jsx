"use client";
import Question from '@/components/ExamPortal/Question';
import QuestionPalette from '@/components/ExamPortal/QuestionPalette';
import ExamHeader from '@/components/ExamPortal/ExamHeader';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const MCQPortal = () => {
  const [timeRemaining, setTimeRemaining] = useState(4); // Total time in seconds
  const [isTimerActive, setIsTimerActive] = useState(true); // Control the timer state

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable F12 and Ctrl + Shift + I
    const handleKeyDown = (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listeners on component unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Timer effect
  useEffect(() => {
    let timer;

    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // handleSubmit(); // Auto-submit when time is up
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Update every second
    } else if (timeRemaining === 0) {
      handleSubmit(); // Auto-submit if time is zero
    }

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Handle test submission
  const handleSubmit = () => {
    // Implement your submit logic here
    toast.success("Test submitted!");
    setIsTimerActive(false); // Stop the timer
  };

  return (
    <div className="h-screen bg-gray-100 text-gray-900">
      {/* Top Header Bar */}
      <ExamHeader time={timeRemaining} />

      {/* Main Content */}
      <div className="flex p-4 h-4/5">
        {/* Left Section: Question Display */}
        <div className='w-9/12 static'>
          <div className="h-5/6 overflow-y-auto bg-white p-4 rounded shadow-md">
            <Question />
          </div>
          <div className="bg-white p-4 flex justify-between">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Mark for Review</button>
            <button className="bg-orange-600 text-white px-4 py-2 rounded">Save & Mark for Review</button>
            <button className="bg-gray-200 text-black px-4 py-2 rounded">Clear Response</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded">Save & Next</button>
          </div>
          <div className="p-4 flex justify-between">
            <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
            <div>
              <button className="bg-gray-200 text-black px-6 py-2 rounded">&lt;&lt; Back</button>
              <button className="bg-gray-500 text-white px-6 py-2 rounded"> Next &gt;&gt; </button>
            </div>
          </div>
        </div>

        {/* Right Section: Question Palette */}
        <div className="max-h-screen overflow-y-auto w-4/12 bg-white p-4 ml-4 rounded shadow-md">
          <QuestionPalette />
        </div>
      </div>
    </div>
  );
};

export default MCQPortal;
