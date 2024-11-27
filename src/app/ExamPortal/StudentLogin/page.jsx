"use client";

import StudentLogin from '@/components/ExamPortal/StudentLogin';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Suspense, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '@/components/Loader';

const LoginContent = ({ loading, handleLogin, userId, setUserId, password, setPassword }) => {
  return (
    <div className="h-full bg-gray-100 flex flex-col">
      {/* Login Section */}
      <div className="mt-20">
        <StudentLogin
          handleLogin={handleLogin}
          userId={userId}
          setUserId={setUserId}
          password={password}
          setPassword={setPassword}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false)
  const searchParams = useSearchParams();
  const router = useRouter();
  const examId = searchParams.get('examId');
  const examTitle = searchParams.get('examTitle');
  const exam = searchParams.get('exam');
  const subjectCode = searchParams.get('subjectCode');
  const examType = searchParams.get('examType')

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!userId || !password){
      toast.warn("Enter your credentials!");
      return;
    }
    setLoading(true)
    const result = await signIn('credentials', {
      userId,
      password,
      redirect: false,
    });
 
    if (result.error) {
      setLoading(false)
      toast.error("Invalid credentials, If you have not register with us then register first!");
    } else {
      setLoading(false)
      // toast.success("Login success")
      setIsStarted(true)
      setTimeout(() => {
        router.push(`/ExamPortal/Instructions?examId=${examId}&examTitle=${examTitle}&exam=${exam}&examType=${examType}&subjectCode=${subjectCode}`);
      }, 1500);

    }

    setLoading(false)
  };

  if (isStarted) return <Loading text="Wait, Redirecting to Instructions Page..." />

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent
        handleLogin={handleLogin}
        userId={userId}
        setUserId={setUserId}
        password={password}
        setPassword={setPassword}
        loading={loading}
      />
    </Suspense>
  );
}
