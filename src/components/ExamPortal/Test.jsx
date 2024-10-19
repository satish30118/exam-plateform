// pages/test.js
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const Test = () => {
  const { data: session } = useSession();
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Add event listener
    document.addEventListener('contextmenu', handleContextMenu);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useEffect(() => {
    // Call the API to get the remaining time for the test
    const fetchRemainingTime = async () => {
      const response = await axios.get('/api/test-time'); // API to get test duration
      setTimeRemaining(response.data.remainingTime);
    };

    fetchRemainingTime();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit(); // Auto submit if time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const handleSubmit = async () => {
    // Submit the test answers logic here
    await axios.post('/api/submit-test', { /* test results */ });
  };

  return (
    <div>
      <h1>Test Title</h1>
      <h2>Time Remaining: {timeRemaining} seconds</h2>
      {/* Render your test questions here */}

      <button onClick={handleSubmit}>Submit Test</button>
    </div>
  );
};

export default Test;
