// AdminSidebar.js
import Link from 'next/link';
import React from 'react';
import { FaUserCircle, FaClipboardList, FaBook, FaSignOutAlt, FaUsers, FaPlusSquare } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 shadow-md p-4">
      <h1 className="text-xl font-bold text-white mb-6">Admin Dashboard</h1>
      <nav>
        <ul>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Link href="/dashboard/admin/users" className="flex items-center text-gray-200">
              <FaUsers className="mr-2" />
              <span>Manage Users</span>
            </Link>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Link href="/dashboard/admin/manage-exams" className="flex items-center text-gray-200">
              <FaBook className="mr-2" />
              <span>Manage Exams</span>
            </Link>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Link href="/dashboard/admin/manage-results" className="flex items-center text-gray-200">
              <FaClipboardList className="mr-2" />
              <span>View Results</span>
            </Link>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Link href="/dashboard/admin/manage-exams/add-mcq-exam" className="flex items-center text-gray-200">
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
