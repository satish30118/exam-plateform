import React from 'react'
import { FaDesktop, FaUserCircle } from 'react-icons/fa'

const ExamHeader = ({time}) => {
  return (
    <div>{/* Header Section */}
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <FaDesktop className="text-6xl text-blue-900" />
          <div>
            <h1 className="text-lg font-bold text-blue-900">System Name: <span className="text-orange-600">[C0001]</span></h1>
            <p className="text-gray-600">Excellence in Assessment</p>
          </div>
        </div>
        <div className='flex items-center text-blue-900 font-bold text-xl'>
         <span>Time Remaining- <span className="text-orange-600">{time}:00 min</span></span> 
        </div>
        <div className="flex items-center space-x-4 ">
          <div className="flex items-center border-2 p-2 border-blue-800">
          <FaUserCircle className="text-5xl text-blue-900" />
          </div>
          <div>
          <h1 className="text-lg font-bold text-blue-900">Student Name: <span className="text-orange-600">Satish Maurya</span></h1>
          <h1 className="text-lg font-bold text-blue-900">Course: <span className="text-orange-600">M2-R5</span></h1>
          </div>
        </div>
      </div>
    </header></div>
  )
}

export default ExamHeader