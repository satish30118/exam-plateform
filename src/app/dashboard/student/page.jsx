"use client"
import { useSession } from 'next-auth/react';
import React from 'react';

const Profile = () => {
  const {data:session, status} = useSession()
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
      <p className="text-gray-200">Student ID: {session?.userId}</p>
      <p className="text-gray-200">Student Name: {session?.user.name}</p>
      <p className="text-gray-200">Course: {session?.user?.email}</p>
      {/* Add more profile details here */}
    </div>
  );
};

export default Profile;
