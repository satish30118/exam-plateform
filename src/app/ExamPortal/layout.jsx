"use client"
import ExamHeader from '@/components/ExamPortal/ExamHeader'
import Loading from '@/components/Loader';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, Suspense, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
const TimerContext = createContext();

const ExamPortallayout = ({ children }) => {
  const [timeRemaining, setTimeRemaining] = useState(-1); // Total time in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState({});
  const pathname = usePathname();
  const [exitTimeout, setExitTimeout] = useState(null);
  const examMode = pathname.startsWith("/ExamPortal/MCQPortal") || pathname.startsWith("/ExamPortal/PractialPortal");
  const searchParams = useSearchParams()
  const router = useRouter()
  const examId = searchParams.get('examId');
  const examType = searchParams.get('examType');
  const { data: session } = useSession()


  useEffect(() => {
    if (!examMode) return;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        toast.warn("You left the exam tab. Submitting your responses.");
        handleExamSubmit();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [examMode]);


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
      }, 1000);
    } else if (timeRemaining === 0) {
      handleExamSubmit();
    }

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, [timeRemaining, isTimerActive]);


  const enterFullScreen = () => {
    const docElm = document.documentElement;
    if (!document.fullscreenElement) {  // Only enter fullscreen if not already in it
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) { // For Firefox
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullscreen) { // For Chrome, Safari, and Opera
        docElm.webkitRequestFullscreen();
      } else if (docElm.msRequestFullscreen) { // For IE/Edge
        docElm.msRequestFullscreen();
      }
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) { // Only exit fullscreen if currently in fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // For Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // For Chrome, Safari, and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // For IE/Edge
        document.msExitFullscreen();
      }
    }
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement && examMode) {
      toast.warn("You exited fullscreen mode. Please stay in fullscreen for the exam, otherwise, the exam will end in 10 seconds.");

      const timeoutId = setTimeout(() => {
        toast.warn("You didn't return to fullscreen in time. Submitting the exam.");
        if (exitTimeout) handleExamSubmit();
      }, 10000);

      setExitTimeout(timeoutId);
    } else if (document.fullscreenElement) {
      if (exitTimeout) {
        clearTimeout(exitTimeout);
        setExitTimeout(null);
        toast.success("You returned to fullscreen. Continue your exam.");
      }
    }
  };

  useEffect(() => {
    if (examMode) {
      enterFullScreen();
      document.addEventListener("fullscreenchange", handleFullscreenChange);
    }

    return () => {
      if (examMode) {
        exitFullScreen();
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
        if (exitTimeout) {
          clearTimeout(exitTimeout);
        }
      }
    };
  }, [examMode]);



  // Handle test submission
  const handleExamSubmit = async () => {
    try {
      const submissionData = {
        studentId: session?.userId,
        examPaperId: examId,
        examPaperType: examType + "ExamPaper",
        responses: Object.entries(responses).map(([questionId, { selectedOption, answerType }]) => ({
          questionId,
          selectedOption,
          answerType,
        })),
      };

      setLoading(true)
      const { data } = await axios.post('/api/student-response', submissionData);
      setLoading(false)
      if (data.success) {
        toast.success('Responses submitted successfully!');
        router.push(`/ExamFeedback?&studentId=${session?.userId}&examId=${examId}&examType=MCQ&responseId=${data.responseId}`)
      } else {
        toast.error('Failed to submit responses.');
      }
    } catch (error) {
      console.error(error);
      setLoading(false)
      toast.error('Error submitting responses: ' + error.message);
    }
    setIsTimerActive(false);
  };

  if (loading) return <div> <Loading text="Submiting Response..." /></div>

  return (
    <div>
      <TimerContext.Provider value={{ timeRemaining, setTimeRemaining, responses, setResponses, handleExamSubmit }}>
        <Suspense fallback={<div>Suspense Loading...</div>}>
          <div className="h-screen bg-gray-100 ">
            <div className="h-1/6 "><ExamHeader time={timeRemaining} /></div>
            <div className="h-5/6 bg-gray-100">{children}</div>
          </div>
        </Suspense>
      </TimerContext.Provider>
    </div>
  )
}

export default ExamPortallayout
export const useTimer = () => useContext(TimerContext);