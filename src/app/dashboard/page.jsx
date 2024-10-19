"use client"
const { default: Test } = require("@/components/ExamPortal/Test");

const App = () => {
    const handleTestSubmission = () => {
      // Logic to handle test submission (save results, etc.)
      console.log('Test submitted!');
    };
  
    return (
      <Test totalTime={300} examPaperId="someExamId" onSubmit={handleTestSubmission} />
    );
  };
  export default App
  