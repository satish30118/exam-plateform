// StudentSidebar.js
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { FaUserCircle, FaBook, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';

const StudentSidebar = () => {
  const { data: session, status} = useSession();
  return (
    <div className="w-64 bg-gray-900 shadow-md p-4">
      <h1 className="text-xl font-bold text-white mb-6">Student Dashboard</h1>
      <nav>
        <ul>
        <li className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Link href={`/dashboard/student?userId=${session?.userId}&name=${session?.user?.name}`} className="flex items-center text-gray-200">
              <FaUserCircle className="mr-2" />
              <span>Profile</span>
            </Link>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Link href={`/dashboard/student/my-results?userId=${session?.userId}&name=${session?.user?.name}`} className="flex items-center text-gray-200">
              <FaClipboardList className="mr-2" />
              <span>My Results</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StudentSidebar;
