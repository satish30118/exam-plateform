"use client"
import Loading from '@/components/Loader';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ExamFeedbackPage = () => {
  const [studentResponse, setStudentResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const responseId = searchParams.get('responseId');
  const { data: session, status } = useSession();

  // Fetch student response data from backend
  useEffect(() => {
    // if(status == "loading"){
    //   return;
    // }
    // if(!session){
    //   return toast.warn("You have not authenticated for this page, login required for this page")
    // }

    const fetchStudentResponse = async () => {
      try {
        const { data } = await axios.get(`/api/student-response/get-response?responseId=${responseId}`);
        setStudentResponse(data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch exam response data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentResponse();
  }, [responseId]);

  if (loading) return <div><Loading text="Result Loading..." /></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const { studentId, examPaperId, responses, score } = studentResponse;


  return (
    <div className='bg-gray-800 text-gray-100'>
      <div className="container mx-auto max-w-5xl p-4">
        {/* Top section: Student and Exam Details */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-2xl mb-8">
          <h1 className="text-3xl font-extrabold mb-4 text-green-600 text-center tracking-wide">Exam Result</h1>

          <div >
            <div className="flex gap-4 justify-evenly flex-wrap">
              {/* Student Name */}
              <div className="flex  flex-col gap-0 justify-center items-center">
                <strong className="text-lg text-blue-400">Student Name:</strong>
                <span className="text-base text-pink-600">{session?.user?.name}</span>
              </div>

              {/* Student ID */}
              <div className="flex flex-col justify-between items-center">
                <strong className="text-blue-400">Student ID:</strong>
                <span className="text-base text-pink-600">{studentId}</span>
              </div>

              {/* Obtained Marks */}
              <div className="flex flex-col flex-coljustify-between items-center">
                <strong className="text-lg text-blue-400">Obtained Marks:</strong>
                <span className="text-base text-pink-600">{score} / {examPaperId?.totalMarks}</span>
              </div>

              {/* Duration */}
              <div className="flex flex-col justify-between items-center">
                <strong className="text-blue-400">Duration:</strong>
                <span className="text-base text-pink-600">{examPaperId?.duration} minutes</span>
              </div>

              {/* Questions */}
              <div className="flex flex-col justify-between items-center">
                <strong className="text-blue-400">Total Questions:</strong>
                <span className="text-base text-pink-600">{examPaperId?.totalQuestions}</span>
              </div>

              {/* Course and Topic (if exists) */}
              <div className="flex flex-col justify-between items-center">
                <strong className="text-blue-400">Course:</strong>
                <span className="text-sm text-pink-600">{examPaperId?.course.toUpperCase()}</span>
              </div>
              {examPaperId?.topic && (
                <div className="flex  flex-col justify-between items-center">
                  <strong className="text-blue-400">Topic:</strong>
                  <span className="text-base text-pink-600">{examPaperId?.topic}</span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Visual Elements */}
          <div className="mt-6 text-center">
            <div className="inline-block px-4 py-2 bg-blue-600 rounded-full text-white text-lg font-semibold">
              Congratulations! 🎉
            </div>
          </div>
        </div>

        {/* Main section: Questions and Feedback */}
        <div className="bg-gray-900 px-8 py-5 shadow-lg rounded-lg">
          <h1 className="text-3xl font-extrabold mb-4 text-green-600 text-center tracking-wide">Your Responses</h1>
          {examPaperId.questions.map((question, index) => {
            const studentResponse = responses.find(res => res.questionId == question._id.toString());
            const formattedQuestionText = question?.questionText?.replace(/\n/g, '<br />');

            return (
              <div key={index} className="mb-4 p-3 border border-gray-600 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className='flex justify-between'>
                  <p className="text-base md:text-lg mb-4" dangerouslySetInnerHTML={{ __html: formattedQuestionText }} /> <div className='font-bold flex space-x-2'><h3 className='text-green-500 font-bold'>+{question?.marks}</h3>, <h3 className='text-red-500'>-{question?.negative}</h3></div></div>
                <div className="ml-4 mt-2 space-y-2">
                  {question.options.map((option, idx) => {
                    const isSelected = option == studentResponse?.selectedOption;
                    const isCorrect = option == question.correctAnswer;
                    return (
                      <div key={idx} className={`p-2 rounded-lg border ${isSelected && isCorrect ? 'border-green-500' : isSelected ? 'border-red-600' : "border-transparent"} transition duration-150`}>
                        <p className={`${isCorrect ? 'text-green-400 font-semibold' : isSelected ? "text-red-500" : 'text-gray-300'} flex items-center`}>
                          {String.fromCharCode(65 + idx)}. {option}
                          {isSelected && <span className="ml-2 text-yellow-300 text-sm font-medium">(Your Answer)</span>}
                          {isCorrect && <span className="ml-2 text-green-400 text-sm font-medium">(Correct Answer)</span>}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className='text-right'>
                  <p className="mt-2 text-gray-300 ">
                    <strong className="text-blue-400">Your Response:</strong> <span className="text-pink-600">{studentResponse?.selectedOption || "Not Answered"}</span>
                  </p>
                  {/* <p className="text-green-400">
                    <strong className="text-blue-400">Correct Answer:</strong> <span className="text-pink-600">{question.correctAnswer}</span>
                  </p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExamFeedbackPage;
