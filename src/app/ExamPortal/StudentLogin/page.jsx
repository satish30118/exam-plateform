"use client"

import StudentLogin from '@/components/ExamPortal/StudentLogin';
import TestHeader from '@/components/ExamPortal/ExamHeader';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const  router = useRouter();
  const examId = searchParams.get('examId');
  const examTitle = searchParams.get('examTitle');


  const handleLogin = ()=>{
    router.push(`/ExamPortal/Instructions?examId=${examId}&examTitle=${examTitle}`)
  }
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col">
      {/* Test Header Section */}
      <TestHeader />
      {/* Login Section */}
      <div className="mt-20">
      <StudentLogin handleLogin={handleLogin}/>
      </div>
    </div>
  );
}
