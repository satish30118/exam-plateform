"use client";

import StudentLogin from '@/components/ExamPortal/StudentLogin';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Suspense, useState } from 'react';
import { toast } from 'react-toastify';

const LoginContent = ({ handleLogin, userId, setUserId, password, setPassword }) => {
  return (
    <div className="h-full bg-gray-800 flex flex-col">
      {/* Login Section */}
      <div className="mt-20">
        <StudentLogin
          handleLogin={handleLogin}
          userId={userId}
          setUserId={setUserId}
          password={password}
          setPassword={setPassword}
        />
      </div>
    </div>
  );
};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const examId = searchParams.get('examId');
  const examTitle = searchParams.get('examTitle');
  const exam = searchParams.get('exam');
  const paperCode = searchParams.get('paperCode');

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
      toast.error("Invalid credentials");
    } else {
      // Check for Google Password Manager warnings
      const breachWarning = result?.warning;

      if (breachWarning) {
        toast.warning("The password you just used has been found in a data breach. Please consider changing it.");
      }
      router.push(`/ExamPortal/Instructions?examId=${examId}&examTitle=${examTitle}&exam=${exam}&paperCode=${paperCode}`);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent 
        handleLogin={handleLogin} 
        userId={userId} 
        setUserId={setUserId} 
        password={password} 
        setPassword={setPassword} 
      />
    </Suspense>
  );
}
