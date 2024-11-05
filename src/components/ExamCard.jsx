import React from 'react'
import { FaClipboardList, FaCode, FaBook } from 'react-icons/fa';
export const ExamCard = ({data}) => {
    return (
        <div >
            <div className="flex justify-center text-center pb-1">
                <FaClipboardList className="text-blue-500 mt-0 text-2xl" />
                <h3 className="text-xl text-center font-bold ml-2 text-yellow-600 pb-2 capitalize">{data.title?.toUpperCase()} </h3>
            </div>
            <div>{data?.chapter && <div className='text-pink-600 text-sm font-bold pb-3 capitalize'>Chapter - {data.chapter}</div>}</div>
            <div>{data?.topic && <div className='text-pink-600 text-sm font-bold pb-3 capitalize'>Topic - {data.topic}</div>}</div>
            <div className='flex justify-around px-3 pb-3'>
                <div className='text-sm'>  <p className="text-gray-400">{data.totalMarks}</p><p className="text-gray-400">Marks</p></div>
                <div className='text-sm'>  <p className="text-gray-400">{data.totalQuestions}</p><p className=" text-gray-400">Questions</p></div>
                <div className='text-sm'> <p className="text-gray-400">{data.duration}</p> <p className="text-gray-400">Minutes</p></div>
            </div>
            <div>{data?.examDate && <div className='text-gray-400 text-sm font-bold  pb-3 capitalize'>Exam Date - {data.examDate.split("T")[0]}, 09:00 AM</div>}</div>
        </div>
    )
}
