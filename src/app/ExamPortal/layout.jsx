"use client"
import ExamHeader from '@/components/ExamPortal/ExamHeader'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
const TimerContext = createContext();

const ExamPortallayout = ({ children }) => {
    const [timeRemaining, setTimeRemaining] = useState(-1); // Total time in seconds
    const [isTimerActive, setIsTimerActive] = useState(true); // Control the timer state
    const [studentResponse, setStudentsResponse ] = useState({});



    // useEffect(() => {
    //     // Disable right-click context menu
    //     const handleContextMenu = (e) => {
    //         e.preventDefault();
    //     };

    //     // Disable F12 and Ctrl + Shift + I
    //     const handleKeyDown = (e) => {
    //         if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
    //             e.preventDefault();
    //         }
    //     };

    //     // Add event listeners
    //     document.addEventListener('contextmenu', handleContextMenu);
    //     document.addEventListener('keydown', handleKeyDown);

    //     // Cleanup the event listeners on component unmount
    //     return () => {
    //         document.removeEventListener('contextmenu', handleContextMenu);
    //         document.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, []);

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
    }, [timeRemaining, isTimerActive]);

    // Handle test submission
    const handleSubmit = () => {
        // Implement your submit logic here
        toast.success("Test submitted!");
        setIsTimerActive(false); // Stop the timer
    };

    return (
        <div>
            <TimerContext.Provider value={{ timeRemaining, setTimeRemaining, studentResponse, setStudentsResponse  }}>
                <ExamHeader time={timeRemaining} />
                {children}
            </TimerContext.Provider>
        </div>
    )
}

export default ExamPortallayout
export const useTimer = () => useContext(TimerContext);