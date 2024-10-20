import Link from "next/link";
import { FaClipboardList, FaLaptopCode, FaBookOpen, FaGraduationCap } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className=" text-white py-20 text-center">
        <h1 className="text-6xl font-bold text-pink-700">Welcome to <span className="text-green-600">Exam Point</span></h1>
        <p className="mt-4 text-xl text-orange-600">Your one-stop solution for mock test papers.</p>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-semibold text-center mb-6 text-lime-600">Prepare for Your Exams with Confidence</h2>
        <p className="text-center mb-8 text-gray-400">
          At Mock-App, we provide mock tests for O Level, CCC, ADCA, DCA, A Level, and other competitive exams.
          Our goal is to help you prepare effectively so you can perform your best on exam day.
        </p>

        {/* Mock Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center gap-6 pb-24">
          <div className="bg-gray-900 rounded-lg p-6 shadow-md transition transform hover:scale-105">
            <FaClipboardList className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">O Level Mock Tests</h3>
            <p className="mt-2 text-gray-400">Get access to a variety of mock tests to prepare for your O Level exams.</p>
            <Link href="/exams/olevel" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Start Now
            </Link>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 shadow-md transition transform hover:scale-105">
            <FaLaptopCode className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">CCC Mock Tests</h3>
            <p className="mt-2 text-gray-400">Enhance your knowledge and skills with our CCC mock tests.</p>
            <Link href="/exams/ccc" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Start Now
            </Link>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 shadow-md transition transform hover:scale-105">
            <FaBookOpen className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">ADCA Mock Tests</h3>
            <p className="mt-2 text-gray-400">Prepare for ADCA exams with our comprehensive mock tests.</p>
            <Link href="/exams/adca" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Start Now
            </Link>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 shadow-md transition transform hover:scale-105">
            <FaGraduationCap className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">A Level Mock Tests</h3>
            <p className="mt-2 text-gray-400">Access a range of mock tests designed for A Level preparation.</p>
            <Link href="/exams/alevel" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Start Now
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
