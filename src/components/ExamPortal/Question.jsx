import React, { useEffect, useState } from 'react';

const Question = ({ data, selectOption, index, chosenOption }) => {
  const [selectedOption, setSelectedOption] = useState(chosenOption); // Track the selected option

  // Reset selected option when `data` or `chosenOption` changes
  useEffect(() => {
    setSelectedOption(chosenOption); // Update the selected option when the chosen option changes
  }, [data]); 

  return (
    <div>
      <h2 className="text-xl font-bold">Question {index + 1}:</h2>
      <hr className="my-4" />
      <div className="ml-3 flex flex-col justify-between">
        <div>
          <p className="text-lg mb-4">{data?.questionText}</p>
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
                {opt}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
