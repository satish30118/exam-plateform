"use client";
import Question from '@/components/ExamPortal/Question';
import QuestionPalette from '@/components/ExamPortal/QuestionPalette';
import ExamHeader from '@/components/ExamPortal/ExamHeader';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTimer } from '../layout';
import axios from 'axios';

const MCQPortal = () => {
  const { setTimeRemaining } = useTimer();
  const [paperData, setPaperData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});

  const selectedQuestion = paperData[selectedQuestionIndex] || {};

  const fetchPaperData = async () => {
    try {
      const { data } = await axios.get('/api/paper-data/67142862344b8a9d1f9c235d');
      setPaperData(data.questions);
      setTimeRemaining(data.duration * 60);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch paper data.');
      toast.error('Failed to fetch paper data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaperData();
  }, []);

  // General handler for selecting options and setting answer type
  const updateResponse = (questionId, selectedOption = null, answerType = "NotAnswered") => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        selectedOption: selectedOption || prev[questionId]?.selectedOption || null,
        answerType,
      },
    }));
  };

  // Handle option selection
  const handleOptionSelect = (questionId, selectedOption) => {
    updateResponse(questionId, selectedOption, "NotAnswered");
  };

  // Move to the next or previous question
  const navigateQuestion = (direction) => {
    updateResponse(selectedQuestion._id);
    const newIndex = selectedQuestionIndex + direction;
    if (newIndex >= 0 && newIndex < paperData.length) {
      setSelectedQuestionIndex(newIndex);
    }
  };

  // Handle answer type and move to the next question
  const handleAnswerType = (type) => {
    updateResponse(selectedQuestion._id, responses[selectedQuestion._id]?.selectedOption, type);
    if (selectedQuestionIndex < paperData.length - 1) {
      setSelectedQuestionIndex(selectedQuestionIndex + 1);
    }
  };

  // Clear response for the current question
  const handleClearResponse = () => {
    setResponses(prev => ({
      ...prev,
      [selectedQuestion._id]: {
        selectedOption: "",
        answerType: "",
      },
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-screen bg-gray-100 text-gray-900">
      <div className="flex p-4 h-4/5">
        {/* Left Section: Question Display */}
        <div className='w-9/12 static'>
          <div className="h-5/6 overflow-y-auto bg-white p-4 rounded shadow-md">
            {/* Question Component */}
            <Question
              data={selectedQuestion}
              selectOption={handleOptionSelect}
              index={selectedQuestionIndex}
              chosenOption={responses[selectedQuestion._id]?.selectedOption}
            />
          </div>
          {/* Buttons for Answer Type */}
          <div className="bg-white p-4 flex justify-between">
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleAnswerType("MarkAndNext")}>
              Mark for Review
            </button>
            <button className="bg-orange-600 text-white px-4 py-2 rounded" onClick={() => handleAnswerType("SaveMarkAndNext")}>
              Save & Mark for Review
            </button>
            <button className="bg-gray-200 text-black px-4 py-2 rounded" onClick={handleClearResponse}>
              Clear Response
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => handleAnswerType("SaveAndNext")}>
              Save & Next
            </button>
          </div>
          {/* Navigation Buttons */}
          <div className="p-4 flex justify-between">
            <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
            <div>
              <button className="bg-gray-200 text-black px-6 py-2 rounded" onClick={() => navigateQuestion(-1)}>
                &lt;&lt; Back
              </button>
              <button className="bg-gray-500 text-white px-6 py-2 rounded" onClick={() => navigateQuestion(1)}>
                Next &gt;&gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Question Palette */}
        <div className="max-h-screen overflow-y-auto w-4/12 bg-white p-4 ml-4 rounded shadow-md">
          <QuestionPalette
            data={paperData}
            selectQuestion={(_, index) => setSelectedQuestionIndex(index)}
            setResponses={setResponses}
            responses={responses}
          />
        </div>
      </div>
    </div>
  );
};

export default MCQPortal;
