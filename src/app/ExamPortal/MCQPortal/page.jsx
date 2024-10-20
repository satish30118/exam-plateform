"use client";
import Question from '@/components/ExamPortal/Question';
import QuestionPalette from '@/components/ExamPortal/QuestionPalette';
import ExamHeader from '@/components/ExamPortal/ExamHeader';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTimer } from '../layout';
import axios from 'axios';
import Loading from '@/components/Loader';

const MCQPortal = () => {
  const { setTimeRemaining, studentResponse, setStudentResponse } = useTimer();
  const [paperData, setPaperData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState("")
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)

  const [responses, setResponses] = useState({});

  const handleOptionSelect = (questionId, selectedOption) => {
    setResponses({
      ...responses,
      [questionId]: {
        selectedOption,
        answerType: "NotAnswered"
      }// Store the selected option for each question
    });
    // console.log(responses);
  };


  const handleNextBtn = () => {
    setResponses({
      ...responses,
      [selectedQuestion._id]: {
        selectedOption: responses[selectedQuestion._id]?.selectedOption || null,
        answerType: responses[selectedQuestion._id]?.answerType || "NotAnswered"
      }// Store the selected option for each question
    });
    if (selectedQuestionIndex < paperData.length - 1) {
      setSelectedQuestion(paperData[selectedQuestionIndex + 1]);
      setSelectedQuestionIndex(selectedQuestionIndex + 1)
    }
  }

  const handleBackBtn = () => {
    setResponses({
      ...responses,
      [selectedQuestion._id]: {
        selectedOption: responses[selectedQuestion._id]?.selectedOption || null,
        answerType: responses[selectedQuestion._id]?.answerType || "NotAnswered"
      }// Store the selected option for each question
    });
    if (selectedQuestionIndex > 0) {
      setSelectedQuestion(paperData[selectedQuestionIndex - 1]);
      setSelectedQuestionIndex(selectedQuestionIndex - 1)
    }
  }

  const handleClearResponse = () => {
    setResponses({
      ...responses,
      [selectedQuestion._id]: {
        selectedOption: "",
        answerType: "NotAnswered"
      }// Store the selected option for each question

    });
    setSelectedQuestion(paperData[selectedQuestionIndex]);
  }

  const handleAnswerType = (type) => {
    if (type === "MarkAndNext") {
      setResponses({
        ...responses,
        [selectedQuestion._id]: {
          selectedOption: null,
          answerType: type
        }// Store the selected option for each question
      });
      if (selectedQuestionIndex < paperData.length - 1) {
        setSelectedQuestion(paperData[selectedQuestionIndex + 1]);
        setSelectedQuestionIndex(selectedQuestionIndex + 1)
      }
      return;
    }

    if (responses[selectedQuestion._id]?.selectedOption) {
      setResponses({
        ...responses,
        [selectedQuestion._id]: {
          selectedOption: responses[selectedQuestion._id]?.selectedOption || null,
          answerType: type
        }// Store the selected option for each question
      });
    } else {
      setResponses({
        ...responses,
        [selectedQuestion._id]: {
          selectedOption: responses[selectedQuestion._id]?.selectedOption || null,
          answerType: "NotAnswered"
        }// Store the selected option for each question
      });
    }
    // console.log(responses);
    if (selectedQuestionIndex < paperData.length - 1) {
      setSelectedQuestion(paperData[selectedQuestionIndex + 1]);
      setSelectedQuestionIndex(selectedQuestionIndex + 1)
    }
  }



  useEffect(() => {
    // Fetch paper data from backend
    const fetchPaperData = async () => {
      try {
        const { data } = await axios.get('/api/paper-data/67142862344b8a9d1f9c235d'); // Adjust the endpoint as needed
        setPaperData(data.questions);
        setSelectedQuestion(data?.questions[0])
        setTimeRemaining(data?.duration * 60)
      } catch (err) {
        console.error(err);
        setError('Failed to fetch paper data.');
        toast.error('Failed to fetch paper data.');
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchPaperData();
  }, [setTimeRemaining]);

  if (loading) return <Loading />

  return (
    <div className="h-full bg-gray-100 text-gray-900">
      {/* Main Content */}
      <div className="flex p-4 h-5/6">
        {/* Left Section: Question Display */}
        <div className='w-9/12 static'>
          <div className="h-5/6 overflow-y-auto bg-white p-4 rounded shadow-md">
            {/* Pass the fetched paper data to the Question component */}
            <Question data={selectedQuestion} selectOption={handleOptionSelect} index={selectedQuestionIndex} chosenOption={responses[selectedQuestion._id]?.selectedOption} />
          </div>
          <div className="bg-white p-4 flex justify-between text-xs lg:text-base">
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleAnswerType("MarkAndNext")}>Mark for Review</button>
            <button className="bg-orange-600 text-white px-4 py-2 rounded" onClick={() => handleAnswerType("SaveMarkAndNext")}>Save & Mark for Review</button>
            <button className="bg-gray-200 text-black px-4 py-2 rounded" onClick={handleClearResponse}>Clear Response</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => handleAnswerType("SaveAndNext")}>Save & Next</button>
          </div>
          <div className="p-4 flex justify-between text-xs lg:text-base">
            <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
            <div>
              <button className="bg-gray-200 text-black px-6 py-2 rounded" onClick={handleBackBtn}>&lt;&lt; Back</button>
              <button className="bg-gray-500 text-white px-6 py-2 rounded" onClick={handleNextBtn}> Next &gt;&gt; </button>
            </div>
          </div>
        </div>

        {/* Right Section: Question Palette */}
        <div className="max-h-screen overflow-y-auto w-4/12 bg-white p-4 ml-4 rounded shadow-md">
          <QuestionPalette data={paperData} selectQuestion={setSelectedQuestion} setIndex={setSelectedQuestionIndex} responses={responses} setResponses={setResponses} />
        </div>
      </div>
    </div>
  );
};

export default MCQPortal;
