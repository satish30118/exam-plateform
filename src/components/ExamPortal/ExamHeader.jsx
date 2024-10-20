import { useSession } from 'next-auth/react';
import React from 'react';
import { FaDesktop, FaUserCircle } from 'react-icons/fa';

const ExamHeader = ({ time }) => {
  const { data: session } = useSession()
  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-center sm:justify-between px-4">
        {/* Left Section: System Info (Visible on medium screens and up) */}
        <div className="hidden sm:flex items-center space-x-4">
          <FaDesktop className="text-3xl md:text-4xl lg:text-5xl text-blue-900" />
          <div>
            <h1 className="text-sm md:text-lg lg:text-xl font-bold text-blue-900">
              System Name: <span className="text-orange-600">[C0001]</span>
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
            {session ? <img src={session.user.image} alt='user' className='h-9 lg:h-10 rounded' /> : <FaUserCircle className="text-lg md:text-3xl lg:text-5xl text-blue-900" />}

          </div>
          <div>
            <h1 className="text-sm md:text-base lg:text-lg font-bold text-blue-900">
              Student Name: <span className="text-orange-600">Satish Maurya</span>
            </h1>
            <h1 className="text-sm md:text-base lg:text-lg font-bold text-blue-900">
              Course: <span className="text-orange-600">M2-R5</span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExamHeader;
