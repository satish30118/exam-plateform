"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

const ThankYouMessage = () => {
    const router = useRouter()
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600">Thank You!</h1>
        <p className="mt-4 text-gray-900">
          Your responses have been submitted successfully. We appreciate your participation!
        </p>
        <div className="mt-6 flex justify-evenly">
          <button 
            onClick={()=> router.push("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Home
          </button>
          <button 
            onClick={()=> router.push("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouMessage;
