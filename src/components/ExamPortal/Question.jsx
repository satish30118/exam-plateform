import React, { useEffect, useState } from 'react';

const Question = ({ data, selectOption, index, chosenOption }) => {
  const [selectedOption, setSelectedOption] = useState(chosenOption); // Track the selected option

  // Reset selected option when `data` or `chosenOption` changes
  useEffect(() => {
    setSelectedOption(chosenOption); // Update the selected option when the chosen option changes
  }, [data, chosenOption]); // Also include chosenOption in dependency array
  const formattedQuestionText = data?.questionText?.replace(/\n/g, '<br />');

  return (
    <div className="p-4 bg-white">
      <div className='flex justify-between'>
      <h2 className="text-lg md:text-xl font-bold">Question {index + 1}:</h2> <div className='font-bold flex space-x-2'><h3 className='text-green-500 font-bold'>+{data?.marks}</h3>, <h3 className='text-red-500'>-{data?.negative}</h3></div></div>
      <hr className="my-4" />
      <div className="ml-3 flex flex-col justify-between">
        <div>
        <p className="text-base md:text-lg mb-4" dangerouslySetInnerHTML={{ __html: formattedQuestionText }} />
          <div className="space-y-2">
            {data?.options?.map((opt, idx) => (
              <label className="block" key={idx}>
                <input
                  type="radio"
                  name={`option-${data?._id}`} // Make the name unique per question
                  className="mr-2"
                  checked={selectedOption === opt} // Compare selectedOption with the current option
                  onChange={() => {
                    setSelectedOption(opt); // Update local state
                    selectOption(data?._id, opt); // Trigger parent function
                  }}
                />
                <span className="text-sm md:text-base">{opt}</span> {/* Responsive text size for options */}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
