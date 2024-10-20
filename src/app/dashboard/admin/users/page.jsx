// pages/admin/users.js
import React from 'react';

const ManageUsers = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Manage Users</h2>
      {/* User management functionality goes here */}
      <div className="bg-gray-900 p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-200">Registered Users</h3>
        <ul className="mt-2">
          <li className="border-b border-gray-700 py-2 flex justify-between">
            <span>Student 1</span>
            <span>View</span>
          </li>
          <li className="border-b border-gray-700 py-2 flex justify-between">
            <span>Student 2</span>
            <span>View</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ManageUsers;
