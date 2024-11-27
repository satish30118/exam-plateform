"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const ExamSubmitted = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10">
            {/* Success Message Container */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">Exam Submitted Successfully!</h2>

                {/* Thank You Note */}
                <div className="text-center text-lg text-gray-800 mb-6">
                    <p>Thank you for completing the exam. Your submission has been successfully received!</p>
                </div>

                {/* Result Information */}
                <div className="text-center text-sm text-gray-700 mb-6">
                    <p>Your results will be emailed to you once we will checked.</p>
                    <p>Please be patient while we process your results.</p>
                </div>

                {/* Button to Navigate Back to Exam Portal */}
                <div className="flex justify-center mt-6">
                    <button 
                        className="bg-blue-600 text-white px-6 py-2 rounded-md"
                        onClick={() => router.push('/')}
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExamSubmitted;
