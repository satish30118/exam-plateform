"use client";
import AdminSidebar from '@/components/dashboard/AdminSidebar';
import Loading from '@/components/Loader';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const { data: session, status } = useSession(); // Use status to handle loading state

  useEffect(() => {
    const verifyUser = async () => {
      if (status === 'loading') return; // Wait for session to be fetched

      if (!session) {
        toast.warn("You have not logged in");
        router.push('/auth/login');
      } else {
        try {
          const { data } = await axios.get(`/api/users/get-user?userId=${session?.userId}`);
          if (data.success && data.user.role === 'Admin') {
            setIsVerified(true);
          } else {
            toast.error("You are not authorized to access this page!");
            router.push('/');
          }
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong!");
        }
      }
    };

    verifyUser();
  }, [session, status, router]);

  if (status === 'loading' || !isVerified) {
    return <Loading text="Verifying user..." />;
  }

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
