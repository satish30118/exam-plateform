"use client"

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" passHref>
            <h1 className="text-2xl font-bold">Mock-App</h1>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-4 ">
          <Link href="/exams/olevel" passHref>
            <p className="hover:bg-gray-700 px-3 py-2 rounded-md text-md font-bold">O Level</p>
          </Link>
          <Link href="/exams/ccc" passHref>
            <p className="hover:bg-gray-700 px-3 py-2 rounded-md text-md font-bold">CCC</p>
          </Link>
          <Link href="/exams/adca" passHref>
            <p className="hover:bg-gray-700 px-3 py-2 rounded-md text-md font-semibold">ADCA</p>
          </Link>
          <Link href="/exams/dca" passHref>
            <p className="hover:bg-gray-700 px-3 py-2 rounded-md text-md font-semibold">DCA</p>
          </Link>
          <Link href="/exams/alevel" passHref>
            <p className="hover:bg-gray-700 px-3 py-2 rounded-md text-md font-semibold">A Level</p>
          </Link>
        </div>

        {/* Login Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" passHref>
            <p className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Login
            </p>
          </Link>
        </div>

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
            <Link href="/olevel" passHref>
              <p className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">O-Level</p>
            </Link>
            <Link href="/ccc" passHref>
              <p className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">CCC</p>
            </Link>
            <Link href="/adca" passHref>
              <p className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">ADCA</p>
            </Link>
            <Link href="/dca" passHref>
              <p className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">DCA</p>
            </Link>
            <Link href="/alevel" passHref>
              <p className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">A-Level</p>
            </Link>
            <Link href="/login" passHref>
              <p className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base font-medium">
                Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
