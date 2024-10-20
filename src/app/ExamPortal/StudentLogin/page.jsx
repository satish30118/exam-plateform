"use client"

import StudentLogin from '@/components/ExamPortal/StudentLogin';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const  router = useRouter();
  const examId = searchParams.get('examId');
  const examTitle = searchParams.get('examTitle');

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      userId,
      password,
      redirect: false,
    });

    if (result.error) {
      // console.log(result)
      alert("Invalid credentials")
    } else {
      // Redirect or handle successful login
      router.push(`/ExamPortal/Instructions?examId=${examId}&examTitle=${examTitle}`)
    }
  };
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col">
      {/* Login Section */}
      <div className="mt-20">
      <StudentLogin handleLogin={handleLogin} userId={userId} 
          setUserId={setUserId} 
          password={password} 
          setPassword={setPassword}/>
      </div>
    </div>
  );
}
