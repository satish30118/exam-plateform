'use client';

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevent automatic redirect
    router.push('/'); // Manually redirect after sign out
  };

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" passHref className='flex items-center justify-between space-x-1'>
            <img src="/img/logo.png" alt="" className="h-12 rounded-full w-12" />
            <h1 className="text-2xl font-bold text-green-600">Exam Point</h1>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-4">
          <Link href="/exams/olevel" passHref>
            <p className="hover:bg-gray-700 px-3 py-2 rounded-md text-md font-bold">O Level</p>
          </Link>
          <Link href="/exams/adca" passHref>
            <p className="hover:bg-gray-700 px-3 py-2 rounded-md text-md font-semibold">ADCA</p>
          </Link>
          <Link href="/exams/dca" passHref>
            <p className="hover:bg-gray-700 px-3 py-2 rounded-md text-md font-semibold">DCA</p>
          </Link>
          <Link href="/exams/cuet" passHref>
            <p className="hover:bg-gray-700 px-3 py-2 rounded-md text-md font-semibold">CUET(UG)</p>
          </Link>
        </div>

        {/* Login/Logout Button */}
        {!session ? (
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login" passHref>
              <p className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Login
              </p>
            </Link>
            
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium" onClick={handleSignOut}>
              Logout
            </button>
            <Link href={`/dashboard/${session.role.toLowerCase()}?userId=${session?.userId}&name=${session?.user?.name}`} passHref>
            <img src={session?.image} alt="" title='Dashboard' className='h-11 w-11 rounded-full'/>
          </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={handleNavToggle} className="text-2xl">
            {navOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {navOpen && (
        <div className="md:hidden bg-background">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/exams/olevel" passHref>
              <p className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">O-Level</p>
            </Link>
            <Link href="/exams/alevel" passHref>
              <p className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">A-Level</p>
            </Link>
            <Link href="/exams/ccc" passHref>
              <p className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">CCC</p>
            </Link>
            <Link href="/exams/adca" passHref>
              <p className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">ADCA</p>
            </Link>
            <Link href="/exams/dca" passHref>
              <p className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">DCA</p>
            </Link>

            <Link href="/exams/cuet" passHref>
              <p className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">CUET(UG)</p>
            </Link>

            {/* Login Button */}
            {!session ? (
              <Link href="/auth/login" passHref>
                <p className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Login
                </p>
              </Link>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium" onClick={handleSignOut}>
                Logout
              </button>
               <Link href={`/dashboard/${session.role.toLowerCase()}?userId=${session?.userId}&name=${session?.name}`} passHref>
               <img src={session?.image} alt="" title='Dashboard' className='h-11 w-11 rounded-full'/>
             </Link>
             </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
