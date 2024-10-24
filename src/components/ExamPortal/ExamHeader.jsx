import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { FaDesktop, FaUserCircle } from 'react-icons/fa';

const ExamHeader = ({ time }) => {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const exam = searchParams.get('exam');
  const subjectCode = searchParams.get('subjectCode');

  return (
    <header className="bg-white h-5/6 flex py-4 shadow-md sticky top-0">
      <div className="container mx-auto flex items-center justify-center sm:justify-between px-4">
        {/* Left Section: System Info (Visible on medium screens and up) */}
        <div className="hidden sm:flex items-center space-x-4">
          <FaDesktop className="text-3xl md:text-4xl lg:text-5xl text-blue-900" />
          <div>
            <h1 className="text-sm md:text-lg lg:text-xl font-bold text-blue-900">
              System Name: <span className="text-orange-600">[C072]</span>
            </h1>
            <p className="text-xs md:text-base text-gray-600">Excellence in Assessment</p>
          </div>
        </div>

        {/* Center Section: Time Remaining (Visible on all screens) */}
        <div className='flex items-center flex-col text-blue-900 font-bold text-base sm:text-sm lg:text-lg'>
          {time !== -1 && (
            <>
              <span>
                Time Remaining
              </span>
              <span className="text-orange-600">
                {Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)} min
              </span>
            </>
          )}
        </div>

        {/* Right Section: Student Info (Visible on medium screens and up) */}
        <div className="hidden sm:flex items-center space-x-4 ">
          <div className="flex items-center border-2 p-1 border-blue-800 rounded">
            {!session ? <FaUserCircle className="text-lg md:text-3xl lg:text-5xl text-blue-900" /> :  <img src={status != "loading" && session && session.image} alt="" className='h-11 rounded-sm'/>}
            
          </div>
          <div>
            <h1 className="text-sm md:text-base lg:text-lg font-bold text-blue-900">
              Student Name: <span className="text-orange-600 lg:text-lg">{session?.user?.name}</span>
            </h1>
            <h1 className="text-sm md:text-base lg:text-lg font-bold text-blue-900">
              Course: <span className="text-orange-600 lg:text-base">{exam?.toUpperCase()} ({subjectCode?.toUpperCase()})</span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExamHeader;
