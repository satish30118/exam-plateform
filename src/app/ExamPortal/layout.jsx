"use client"
import ConfirmationModal from '@/components/ExamPortal/ConfirmationModal';
import ExamHeader from '@/components/ExamPortal/ExamHeader';
import Loading from '@/components/Loader';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, Suspense, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const TimerContext = createContext();

const ExamPortallayout = ({ children }) => {
  const [timeRemaining, setTimeRemaining] = useState(-1);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const examId = searchParams.get('examId');
  const examType = searchParams.get('examType');
  const { data: session, status } = useSession();

  // Function to open the confirmation modal
  const handleExamSubmit = async () => {
    setIsModalOpen(true);  // Open modal to confirm before submitting
  };

  // Function that is called when user confirms submission
  const handleModalConfirm = async () => {
    try {
      const res = responses;
      console.log(JSON.parse(localStorage.getItem('responses')));

      const submissionData = {
        studentId: session?.userId,
        examPaperId: examId,
        examPaperType: examType + "ExamPaper",
        responses: Object.entries(res).map(([questionId, { selectedOption, answerType }]) => ({
          questionId,
          selectedOption,
          answerType,
        })),
      };

      setLoading(true);
      const { data } = await axios.post('/api/student-response', submissionData);
      if (data.success) {
        if (examType == "MCQ") {
          router.push(`/ExamFeedback?&studentId=${session?.userId}&examId=${examId}&examType=MCQ&responseId=${data.responseId}`);
        } else {
          router.push(`/ExamFeedback/PracticalExamFeedback?studentId=${session?.userId}&examId=${examId}&examType=MCQ&responseId=${data.responseId}`);
        }
      } else {
        toast.error('Failed to submit responses.');
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Error submitting responses: ' + error.message);
    }
    setIsTimerActive(false);
    setIsModalOpen(false);  // Close modal after submission
  };

  // Function to close the modal if user cancels
  const handleModalCancel = () => {
    setIsModalOpen(false);  // Close modal if user cancels
  };

  // The rest of your code for timer, fullscreen, etc.

  if (loading) return <div> <Loading text="Wait, Submitting your Response, Don't do anything..." /></div>

  return (
    <div>
      <TimerContext.Provider value={{ timeRemaining, setTimeRemaining, responses, setResponses, handleExamSubmit }}>
        <Suspense fallback={<div>Suspense Loading...</div>}>
          <div className="h-screen bg-gray-100">
            <div className="h-1/6"><ExamHeader time={timeRemaining} /></div>
            <div className="h-5/6 bg-gray-100">{children}</div>
          </div>
        </Suspense>
      </TimerContext.Provider>

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onConfirm={handleModalConfirm} 
        onCancel={handleModalCancel} 
      />
    </div>
  );
};

export default ExamPortallayout;
export const useTimer = () => useContext(TimerContext);
