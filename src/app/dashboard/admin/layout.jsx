// AdminLayout.js
import AdminSidebar from '@/components/dashboard/AdminSidebar';
import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <AdminSidebar />
      <div className="flex-1 p-6 overflow-y-auto bg-gray-800">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
