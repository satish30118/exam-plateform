"use client"

import StudentLogin from '@/components/tests/StudentLogin';
import TestHeader from '@/components/tests/TestHeader';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const  router = useRouter();
  const testId = searchParams.get('testId');

  const handleLogin = ()=>{
    router.push(`/tests/Instructions?testId=${testId}`)
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
