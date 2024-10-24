'use client';
import { FaGoogle } from 'react-icons/fa';
import { signIn, useSession, getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    
    if (result.error) {
      toast.error("Invalid credentials");
    } else {
      toast.success('Login successful!');

      // Fetch the updated session
      const updatedSession = await getSession();
      router.push(`/dashboard/${updatedSession?.role?.toLowerCase() || 'student'}`);
    }
  };

  const handleSignIn = async () => {
    const result = await signIn('google', { redirect: false });    
    if (result?.ok) {
      // Fetch updated session after successful Google login
      const updatedSession = await getSession();
      // console.log('Updated session after Google login:', updatedSession);
      router.push(`/dashboard/${updatedSession?.role?.toLowerCase() || 'student'}`);
    }
  };

  return (
    <div className='bg-gray-800 min-h-screen flex justify-center items-center pb-7 pt-4'>
      <div className="container mx-auto flex flex-col items-center justify-center flex-grow px-4">
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 max-w-md w-full pb-8">
          <h2 className="text-3xl font-semibold text-center text-blue-500 mb-6">Account Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Id</label>
              <input
                type="email"
                id="email"
                className="bg-gray-800 mt-1 block w-full px-4 py-3 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="bg-gray-800 mt-1 block w-full px-4 py-3 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              LOGIN
            </button>
          </form>

          <div className="flex justify-between items-center mt-4">
            <hr className="flex-grow border-gray-600" />
            <span className="text-gray-400 mx-4">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <button
            onClick={handleSignIn}
            className='mt-5 w-full py-2 px-5 my-1 rounded-lg flex items-center justify-center bg-red-600 hover:bg-red-700 transition duration-200 text-white'
          >
            <FaGoogle className="mr-2" />
            Login with Google
          </button>
          <div className="flex justify-between items-center mt-8">
            <hr className="flex-grow border-gray-600" />
            <span className="text-gray-400 mx-4">Have not Registered ?</span>
            <hr className="flex-grow border-gray-600" />
          </div>
          <button
            onClick={handleSignIn}
            className='mt-2 w-full py-2 px-5 rounded-lg flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-200 text-white'
          >
            <FaGoogle className="mr-2" />
            Register with Google
          </button>
        </div>
      </div>
    </div>
  );
}
