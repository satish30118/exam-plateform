const OtherExamsPage = () => {
    return (
      <div className="bg-gray-800 min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold text-white">Coming Soon!</h1>
        <p className="mt-4 text-xl text-gray-400">
          We're working hard to bring you mock tests for other exams including CCC, ADCA, DCA, A Level, and more.
        </p>
        <p className="mt-2 text-lg text-gray-500">
          Stay tuned for updates and new features!
        </p>
        
        <div className="mt-10">
          <img
            src="https://via.placeholder.com/400x200.png?text=Coming+Soon" // Placeholder image; replace with an appropriate image URL
            alt="Coming Soon"
            className="rounded shadow-lg"
          />
        </div>
      </div>
    );
  };
  
  export default OtherExamsPage;
  