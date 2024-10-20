"use client"
import axios from 'axios';
import React, { useState } from 'react';

const AddExam = () => {
    const [title, setTitle] = useState('FullSyllabus');
    const [course, setCourse] = useState('olevel');
    const [subject, setSubject] = useState('');
    const [type, setType] = useState('theoretical');
    const [chapter, setChapter] = useState('');
    const [questions, setQuestions] = useState([]);
    const [duration, setDuration] = useState();
    const [totalMarks, setTotalMarks] = useState();

    const handleAddQuestion = () => {
        setQuestions([...questions, { questionText: '', options: ['', ''], correctAnswer: '', marks: 1 }]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const examData = {
            title,
            subject,
            type,
            chapter,
            questions,
            duration,
            totalMarks,
            course
        };

        try {
            // Use Axios to send a POST request
            const response = await axios.post('/api/paper-data', examData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert('Exam added successfully!');
            } else {
                alert('Failed to add exam.');
            }
        } catch (error) {
            console.error('Error adding exam:', error);
            alert('Failed to add exam. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-800 text-gray-200">
            <h2 className="text-2xl font-bold mb-4">Add Exam</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-1">Title:</label>
                        <select
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-3 w-full rounded bg-gray-700 text-gray-200"
                            required
                        >
                            <option value="FullSyllabus">Full Syllabus</option>
                            <option value="ChapterWise">Chapter Wise</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Course:</label>
                        <select
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="p-3 w-full rounded bg-gray-700 text-gray-200"
                            required
                        >
                            <option value="olevel">O Level</option>
                            <option value="alevel">A Level</option>
                            <option value="ccc">CCC</option>
                            <option value="adca">ADCA</option>
                            <option value="dca">DCA</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Subject:</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="p-2 w-full rounded bg-gray-700 text-gray-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Chapter:</label>
                        <input
                            type="text"
                            value={chapter}
                            onChange={(e) => setChapter(e.target.value)}
                            className="p-2 w-full rounded bg-gray-700 text-gray-200"
                            
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Type:</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="p-3 w-full rounded bg-gray-700 text-gray-200"
                            required
                        >
                            <option value="theoretical">MCQ</option>
                            <option value="practical">Practical</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1">Duration (minutes):</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="p-2 w-full rounded bg-gray-700 text-gray-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Total Marks:</label>
                        <input
                            type="number"
                            value={totalMarks}
                            onChange={(e) => setTotalMarks(Number(e.target.value))}
                            className="p-2 w-full rounded bg-gray-700 text-gray-200"
                            required
                        />
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">Questions:</h3>
                {questions.map((question, index) => (
                    <div key={index} className="mb-4 border p-4 rounded bg-gray-800">
                        <label className="block mb-1">Question Text:</label>
                        <textarea
                            value={question.questionText}
                            onChange={(e) => {
                                const updatedQuestions = [...questions];
                                updatedQuestions[index].questionText = e.target.value;
                                setQuestions(updatedQuestions);
                            }}
                            className="p-2 w-full rounded mb-2 bg-gray-700 text-gray-200"
                            rows="3"
                            required
                        ></textarea>

                        <label className="block mb-1">Options:</label>
                        {question.options.map((option, optionIndex) => (
                            <input
                                key={optionIndex}
                                type="text"
                                value={option}
                                onChange={(e) => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[index].options[optionIndex] = e.target.value;
                                    setQuestions(updatedQuestions);
                                }}
                                className="p-2 w-full rounded mb-2 bg-gray-700 text-gray-200"
                                placeholder={`Option ${optionIndex + 1}`}
                                required
                            />
                        ))}
                        <button
                            type="button"
                            onClick={() => {
                                const updatedQuestions = [...questions];
                                updatedQuestions[index].options.push('');
                                setQuestions(updatedQuestions);
                            }}
                            className="text-blue-400 hover:text-blue-600 mb-2"
                        >
                            Add Option
                        </button>

                        <label className="block mb-1">Correct Answer:</label>
                        <input
                            type="text"
                            value={question.correctAnswer}
                            onChange={(e) => {
                                const updatedQuestions = [...questions];
                                updatedQuestions[index].correctAnswer = e.target.value;
                                setQuestions(updatedQuestions);
                            }}
                            className="p-2 w-full rounded mb-2 bg-gray-700 text-gray-200"
                            required
                        />

                        <label className="block mb-1">Marks:</label>
                        <input
                            type="number"
                            value={question.marks}
                            onChange={(e) => {
                                const updatedQuestions = [...questions];
                                updatedQuestions[index].marks = Number(e.target.value);
                                setQuestions(updatedQuestions);
                            }}
                            className="p-2 w-full rounded bg-gray-700 text-gray-200"
                            required
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 mb-4"
                >
                    Add Question
                </button>
                <hr />
                <button
                    type="submit"
                    className="bg-blue-600 float-right my-5 text-white py-2 px-4 rounded"
                >
                    Submit Exam
                </button>
            </form>
            <br />
            <br />
        </div>
    );
};

export default AddExam;
