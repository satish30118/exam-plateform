import Link from "next/link";
import { FaDesktop, FaCode, FaNetworkWired, FaCloud } from "react-icons/fa";

const OLevelPage = () => {
  return (
    <div className="bg-gray-800 min-h-screen flex flex-col pb-24">
      <header className=" py-20 text-center">
        <h1 className="text-6xl font-bold text-pink-600 ">O Level Courses</h1>
        <p className="mt-4 text-xl">Select a course to start your preparation!</p>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-semibold text-center mb-6 text-yellow-600">Available Courses</h2>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center gap-6">
          {/* Information Technology Tools and Network Basics */}
        <div className="bg-gray-900 rounded-lg p-6 shadow-md transition transform hover:scale-105">
          <FaNetworkWired className="text-blue-600 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white">M1-R5 Information Technology Tools and Network Basics</h3>
          <p className="mt-2 text-gray-400">Understand IT tools and basics of networking.</p>
          <Link href="/exams/olevel/m1?sub=(M1-R5) Information Technology Tools and Network Basics" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Start Now
          </Link>
        </div>

          {/* Web Designing & Publishing */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-md transition transform hover:scale-105">
            <FaDesktop className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">M2-R5 Web Designing & Publishing</h3>
            <p className="mt-2 text-gray-400">Learn the essentials of web design and publishing.</p>
            <Link href="/exams/olevel/m2?sub=(M2-R5) Web Designing and Publishing" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Start Now
            </Link>
          </div>

          {/* Programming and Problem Solving through Python */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-md transition transform hover:scale-105">
            <FaCode className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">M3-R5 Programming and Problem Solving through Python</h3>
            <p className="mt-2 text-gray-400">Master programming concepts and problem-solving techniques.</p>
            <Link href="/exams/olevel/m3?sub=(M3-R5) Programming and Problem Solving through Python" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Start Now
            </Link>
          </div>



          {/* Internet of Things and its Applications */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-md transition transform hover:scale-105">
            <FaCloud className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">M4-R5 Internet of Things and its Applications</h3>
            <p className="mt-2 text-gray-400">Explore IoT concepts and their real-world applications.</p>
            <Link href="/exams/olevel/m4?sub=(M4-R5) Internet of Things and its Applications" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Start Now
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OLevelPage;
