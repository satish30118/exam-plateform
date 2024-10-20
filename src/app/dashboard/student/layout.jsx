// StudentLayout.js
import StudentSidebar from '@/components/dashboard/StudentSideBar';
import React from 'react';

const StudentLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <StudentSidebar />
      <div className="flex-1 p-6 overflow-y-auto bg-gray-800">
        {children}
      </div>
    </div>
  );
};

export default StudentLayout;
