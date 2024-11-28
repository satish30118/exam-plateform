// AdminSidebar.js
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { FaUserCircle, FaClipboardList, FaBook, FaSignOutAlt, FaUsers, FaPlusSquare } from 'react-icons/fa';

const AdminSidebar = () => {
  const {data:session} = useSession()
  return (
    <div className="w-64 bg-gray-900 shadow-md p-4">
      <h1 className="text-xl font-bold text-white mb-6">Admin Dashboard</h1>
      <nav>
        <ul>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Link href={`/dashboard/admin/users?userId=${session?.userId}&name=${session?.user?.name}`} className="flex items-center text-gray-200">
              <FaUsers className="mr-2" />
              <span>Manage Students</span>
            </Link>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Link href={`/dashboard/admin/manage-exams?course=adca&subject=other&userId=${session?.userId}&name=${session?.user?.name}`} className="flex items-center text-gray-200">
              <FaBook className="mr-2" />
              <span>Manage Exams</span>
            </Link>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Link href={`/dashboard/admin/manage-results?userId=${session?.userId}&name=${session?.user?.name}`} className="flex items-center text-gray-200">
              <FaClipboardList className="mr-2" />
              <span>View Results</span>
            </Link>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Link href={`/dashboard/admin/practical-result?userId=${session?.userId}&name=${session?.user?.name}`} className="flex items-center text-gray-200">
              <FaClipboardList className="mr-2" />
              <span>Check Practical Exam</span>
            </Link>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Link href={`/dashboard/admin/manage-exams/add-mcq-exam?userId=${session?.userId}&name=${session?.user?.name}`} className="flex items-center text-gray-200">
              <FaPlusSquare className="mr-2" />
              <span>Add MCQ Exam</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
