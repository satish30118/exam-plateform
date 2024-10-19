import React from 'react'

const QuestionPalette = () => {
    return (
        <div><ol className="space-y-2">
            <div ><li className="inline-flex space-x-2 items-center mr-3 "><img src="/img/QuizIcons/Logo1.png" alt="Logo1" className='h-8' /> <span>Not Visited</span></li>
                <li className="inline-flex  space-x-2 items-center"><img src="/img/QuizIcons/Logo2.png" alt="Logo2" className='h-8' /> <span>Not Answered</span></li></div>
            <div><li className="inline-flex space-x-2 items-center mr-3"><img src="/img/QuizIcons/Logo3.png" alt="Logo3" className='h-8' /> <span>Answered</span></li>
                <li className="inline-flex space-x-2 items-center"><img src="/img/QuizIcons/Logo4.png" alt="Logo4" className='h-8' /> <span>Marked for Review</span></li></div>

            <li className="flex space-x-2 items-center"><img src="/img/QuizIcons/Logo5.png" alt="Logo5" className='h-8' /> <span>Answered and Marked for Review (will be evaluated)</span></li>
        </ol>
            <h2 className="font-bold my-4">Question Palette</h2>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-2 mb-4">
                {/* Map question numbers and their statuses */}
                {Array.from({ length: 100 }, (_, i) => (
                    <button
                        key={i}
                        className="w-10 h-10 rounded-full bg-gray-300 text-black"
                    >
                        {i + 1}
                    </button>
                ))}
            </div></div>
    )
}

export default QuestionPalette