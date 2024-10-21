"use client"
import ExamHeader from '@/components/ExamPortal/ExamHeader'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, Suspense, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
const TimerContext = createContext();

const ExamPortallayout = ({ children }) => {
    const [timeRemaining, setTimeRemaining] = useState(-1); // Total time in seconds
    const [isTimerActive, setIsTimerActive] = useState(true); // Control the timer state
    const [responses, setResponses] = useState({});
    const pathname = usePathname();
    const [exitTimeout, setExitTimeout] = useState(null);
    const examMode = pathname.startsWith("/ExamPortal/MCQPortal");
    const searchParams = useSearchParams()
    const  router = useRouter()
    const examId = searchParams.get('examId');
    const {data:session} = useSession()


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
            handleExamSubmit(); // Auto-submit if time is zero
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
      toast.warn("You exited fullscreen mode. Please stay in fullscreen for the exam otherwise exam end in 60sec");
      
      // Start 1 minute timer
      const timeoutId = setTimeout(() => {
        // If user hasn't re-entered fullscreen, submit the test
        toast.error("You didn't return to fullscreen in time.Submitting the exam.");
        submitTest(); // Call the function to submit the test here
      }, 60000); // 60 seconds

      setExitTimeout(timeoutId);
    } else if (document.fullscreenElement && exitTimeout) {
      // If the user re-enters fullscreen, clear the timeout
      clearTimeout(exitTimeout);
      setExitTimeout(null);
      toast.success("You returned to fullscreen. Continue your exam.");
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
        // Clear any leftover timeout when component unmounts
        if (exitTimeout) clearTimeout(exitTimeout);
      }
    };
  }, [examMode]);


    // Handle test submission
    const handleExamSubmit = async() => {
        try {
            // Prepare the data to send
            const submissionData = {
              studentId: session.userId,  // Replace with actual student ID
              examPaperId: examId,  // Replace with actual exam paper ID
              examPaperType: "MCQExamPaper",  // Adjust if you have multiple types
              responses: Object.entries(responses).map(([questionId, { selectedOption, answerType }]) => ({
                questionId,
                selectedOption,
                answerType,
              })),
            };
      
            // Send the data to the backend
            const { data } = await axios.post('/api/student-response', submissionData); // Adjust the endpoint as needed
      
            if (data.success) {
              toast.success('Responses submitted successfully!');
              router.push("/ExamPortal")
            } else {
              toast.error('Failed to submit responses.');
            }
          } catch (error) {
            console.error(error);
            toast.error('Error submitting responses: ' + error.message);
          }
        setIsTimerActive(false); // Stop the timer
    };

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