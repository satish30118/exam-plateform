"use client"
import { useSession } from 'next-auth/react';
import React from 'react';

const ExamFeedbackPage = () => {
  const { data: session } = useSession()
  const studentResponse = {
    studentName: "John Doe",
    examDetails: {
      title: "MCQ Exam on Web Design",
      totalMarks: 100,
      duration: 60,
      questions: [
        {
          _id: "q1",
          questionText: "What does HTML stand for?",
          options: [
            "HyperText Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "None of the above"
          ],
          correctAnswer: "HyperText Markup Language"
        },
        {
          _id: "q2",
          questionText: "Which of the following is a JavaScript framework?",
          options: [
            "React",
            "Laravel",
            "Flask",
            "Django"
          ],
          correctAnswer: "React"
        },
        {
          _id: "q3",
          questionText: "CSS stands for?",
          options: [
            "Cascading Style Sheets",
            "Creative Style System",
            "Computer Style System",
            "None of the above"
          ],
          correctAnswer: "Cascading Style Sheets"
        }
      ]
    },
    responses: [
      {
        questionId: "q1",
        selectedOption: "HyperText Markup Language"
      },
      {
        questionId: "q2",
        selectedOption: "Flask"
      },
      {
        questionId: "q3",
        selectedOption: "Cascading Style Sheets"
      }
    ]
  };

  const { studentName, examDetails, responses } = studentResponse;

  return (
    <div className='bg-gray-800'>
      <div className="container mx-auto p-4">
        {/* Top section: Student and Exam Details */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl mb-8">
          <h1 className="text-3xl font-extrabold mb-6 text-pink-500 text-center tracking-wide">Exam Result</h1>

          {/* Student Details */}
          <div className="flex items-center justify-center gap-8">
            {/* Student Image */}
            <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-4 border-gray-900">
              <img src={session?.image} alt="Student" className="w-full h-full object-cover" />
            </div>

            {/* Exam and Student Information */}
            <div className="text-gray-200">
              <p className="mb-2"><strong className="text-pink-400">Student:</strong> <span className="text-lg">{session?.user?.name}</span></p>
              <p className="mb-2"><strong className="text-pink-400">Exam:</strong> <span className="text-lg">{examDetails.title}</span></p>
              <p className="mb-2"><strong className="text-pink-400">Obtained Marks:</strong> <span className="text-lg">70</span> <span className="text-sm">out of</span> <span className="text-lg">{examDetails.totalMarks}</span></p>
              <p className="mb-2"><strong className="text-pink-400">Duration:</strong> <span className="text-lg">{examDetails.duration} minutes</span></p>
            </div>
          </div>

          {/* Additional Visual Elements */}
          <div className="mt-8 text-center">
            <div className="inline-block px-6 py-2 bg-pink-600 rounded-full text-white text-lg font-semibold">
              Congratulations! 🎉
            </div>
          </div>
        </div>



        {/* Main section: Questions and Feedback */}
        <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Question and Your Responses</h2>
          {examDetails.questions.map((question, index) => {
            const studentResponse = responses.find(res => res.questionId === question._id);
            return (
              <div key={index} className="mb-6 p-4 border border-gray-600 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <p className="font-bold text-white">Q{index + 1}: {question.questionText}</p>
                <div className="ml-4 mt-2 space-y-2">
                  {question.options.map((option, idx) => {
                    const isSelected = option === studentResponse?.selectedOption;
                    const isCorrect = option === question.correctAnswer;
                    return (
                      <div key={idx} className={`p-3 rounded-lg border ${isSelected ? 'border-yellow-500 bg-gray-700' : 'border-transparent'} transition duration-150`}>
                        <p className={`${isCorrect ? 'text-green-400 font-semibold' : 'text-gray-300'} flex items-center`}>
                          {String.fromCharCode(65 + idx)}. {option}
                          {isSelected && <span className="ml-2 text-yellow-300 font-medium">(Your Answer)</span>}
                          {isCorrect && <span className="ml-2 text-green-400 font-medium">(Correct Answer)</span>}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-2 text-gray-300">
                  <strong>Chosen Answer:</strong> <span className="text-white">{studentResponse?.selectedOption || "Not Answered"}</span>
                </p>
                <p className="text-green-400">
                  <strong>Correct Answer:</strong> <span className="text-white">{question.correctAnswer}</span>
                </p>
              </div>
            );
          })}
        </div>


      </div>
    </div>
  );
};

export default ExamFeedbackPage;
