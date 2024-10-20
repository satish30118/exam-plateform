import React from 'react';

const QuestionPalette = ({ data, selectQuestion, setIndex, responses, setResponses }) => {
  
  const handleSelect = (question, index) => {
    selectQuestion(question);
    setIndex(index);
    setResponses(prev => ({
      ...prev,
      [question._id]: {
        selectedOption: prev[question._id]?.selectedOption || null,
        answerType: prev[question._id]?.answerType || "NotAnswered"
      }
    }));
  };

  const getStatusIcon = (answerType) => {
    switch (answerType) {
      case "SaveAndNext":
        return '/img/QuizIcons/Logo3.png';
      case "MarkAndNext":
        return '/img/QuizIcons/Logo4.png';
      case "SaveMarkAndNext":
        return '/img/QuizIcons/Logo5.png';
      case "NotAnswered":
        return '/img/QuizIcons/Logo2.png';
      default:
        return '/img/QuizIcons/Logo1.png';
    }
  };

  return (
    <div>
      <ol className="space-y-2">
        <div>
          <li className="inline-flex space-x-2 items-center mr-3">
            <img src="/img/QuizIcons/Logo1.png" alt="Logo1" className='h-8' /> <span>Not Visited</span>
          </li>
          <li className="inline-flex space-x-2 items-center">
            <img src="/img/QuizIcons/Logo2.png" alt="Logo2" className='h-8' /> <span>Not Answered</span>
          </li>
        </div>
        <div>
          <li className="inline-flex space-x-2 items-center mr-3">
            <img src="/img/QuizIcons/Logo3.png" alt="Logo3" className='h-8' /> <span>Answered</span>
          </li>
          <li className="inline-flex space-x-2 items-center">
            <img src="/img/QuizIcons/Logo4.png" alt="Logo4" className='h-8' /> <span>Marked for Review</span>
          </li>
        </div>
        <li className="inline-flex space-x-2 items-center">
          <img src="/img/QuizIcons/Logo5.png" alt="Logo5" className='h-8' />
          <span>Answered and Marked for Review (will be evaluated)</span>
        </li>
      </ol>

      <h2 className="font-bold my-4">Question Palette</h2>
      
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-2 mb-4">
        {data?.map((d, index) => (
          <button
            key={index}
            className="w-10 h-10 rounded-full text-black relative"
            onClick={() => handleSelect(d, index)}
          >
            <img src={getStatusIcon(responses[d._id]?.answerType)} alt='status-logo' className='h-9' />
            <p className='absolute top-0 left-0 w-10 h-10 rounded-full flex items-center justify-center'>{index + 1}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPalette;
