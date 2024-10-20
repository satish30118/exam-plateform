import React, { useEffect, useState } from 'react'

const Question = ({ data, selectOption, index }) => {
    const [selectedOption, setSelectedOption] = useState(null); // Track the selected option

    // Reset selected option when data (question) changes
    useEffect(() => {
        setSelectedOption(null); // Clear selection when a new question is loaded
    }, [data]);

    return (
        <div><h2 className="text-xl font-bold">Question {index + 1}: </h2>
            <hr className="my-4" />
            <div className='ml-3  flex flex-col justify-between'>
                <div>
                    <p className="text-lg mb-4">{data?.questionText}</p>
                    <div className="space-y-2">
                        {data?.options?.map((opt, index) => (
                            <label className="block" key={index}>
                                <input type="radio" name="option" className='mr-2' checked={selectedOption === opt} onChange={() => {setSelectedOption(opt); selectOption(data?._id, opt); }} />{opt}
                            </label>
                        ))}

                    </div>
                </div>
            </div></div>
    )
}

export default Question