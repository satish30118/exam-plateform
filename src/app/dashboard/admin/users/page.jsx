"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const [newStudent, setNewStudent] = useState({ name: '', email: '', mobile: '' });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registeredStudentInfo, setRegisteredStudentInfo] = useState(null); // State to store the newly registered student's info

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const addStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email) {
      toast.warn('Name and email are required');
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/add-user", newStudent);
      toast.success(data.message);
      setNewStudent({ name: '', email: '', mobile: '' });
      setRegisteredStudentInfo(data.user); 
      setLoading(false);
      registeredStudent();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const registeredStudent = async () => {
    try {
      const { data } = await axios.get("/api/users/get-users");
      setStudents(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    registeredStudent();
  }, []);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Users</h2>

      {/* Form for adding a new student */}
      <form onSubmit={addStudent} className="bg-gray-800 p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Student</h3>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 px-6 rounded bg-gray-700 placeholder-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            value={newStudent.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 px-6 rounded bg-gray-700 placeholder-gray-400"
            required
          />
          <input
            type="tel"
            name="mobile"
            value={newStudent.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full p-2 px-6 rounded bg-gray-700 placeholder-gray-400 "
          />
          <button type="submit" className="bg-blue-600 w-64 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "Wait..." : "Add Student"}
          </button>
        </div>
      </form>

      {/* Registered Student Info Box */}
      {registeredStudentInfo && (
        <div className="bg-green-700 p-4 rounded-lg mb-6 text-white shadow-lg">
          <h3 className="text-lg font-bold mb-2">New Student Registered Successfully</h3>
          <p><strong>Name:</strong> {registeredStudentInfo.name}</p>
          <p><strong>Email:</strong> {registeredStudentInfo.email}</p>
          <p><strong>Student ID:</strong> {registeredStudentInfo.userId}</p>
          <p><strong>Password:</strong> {registeredStudentInfo.userId}</p> {/* Display the generated password */}
        </div>
      )}

      {/* List of registered users */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-4">Registered Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-gray-800 rounded-lg">
            <thead>
              <tr className="bg-gray-700 text-white text-left">
                <th className="px-4 py-3">Student ID</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Student Email</th>
                <th className="px-4 py-3">Student Mobile</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-600 transition duration-300 text-gray-200 border-b border-gray-700">
                  <td className="px-4 py-3">{student.userId}</td>
                  <td className="px-4 py-3 w-64">{student.name}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3">{student.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
