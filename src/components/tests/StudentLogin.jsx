import React from 'react'

const StudentLogin = ({handleLogin}) => {
  return (
    <div><div className="container mx-auto flex flex-col items-center justify-center flex-grow px-4">
    <div className="bg-gray-900 rounded-lg shadow-lg p-8 max-w-md w-full">
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Student Login</h2>
      <form>
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
          <input 
            type="text" 
            id="username" 
            className="bg-gray-800 mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input 
            type="password" 
            id="password" 
            className="bg-gray-800 mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition duration-200"
          onClick={handleLogin}
        >
          LOGIN
        </button>
      </form>
      <p className="mt-4 text-center text-orange-600">Click Login To proceed</p>
    </div>
  </div></div>
  )
}

export default StudentLogin