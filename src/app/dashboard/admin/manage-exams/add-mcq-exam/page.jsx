"use client"
import Loading from '@/components/Loader';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddExam = () => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [syllabus, setSyllabus] = useState('');
    const [course, setCourse] = useState('');
    const [subject, setSubject] = useState('');
    const [chapter, setChapter] = useState('');
    const [questions, setQuestions] = useState([]);
    const [duration, setDuration] = useState();
    const { data: session } = useSession()
    const router = useRouter()

    const handleAddQuestion = () => {
        setQuestions([...questions, { questionText: '', options: ['', ''], correctAnswer: '', marks: 1 }]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const examData = {
            title,
            subject,
            syllabus,
            chapter,
            questions,
            duration,
            course,
            adminEmail: session?.user?.email
        };

        try {
            setLoading(true)
            const response = await axios.post('/api/paper-data/add-practical-paper', examData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                toast.success('Exam added successfully!');
                router.push(`/dashboard/admin/manage-exams?course=${response.data.course}&subject=${response.data.subject}`)
            } else {
                toast.warn('Failed to add exam.');
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Error adding exam:', error);
            toast.error('Failed to add exam. Please try again.');
        }
    };

    if(loading) return <Loading text = "Creating Exam Paper"/>
    return (
        <div className="container mx-auto p-6 bg-gray-800 text-gray-200">
            <h2 className="text-2xl font-bold mb-4">Add MCQ Exam</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-1">Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-2 w-full rounded bg-gray-700 text-gray-200"
                            placeholder='eg: Test-1 or Test-2'
                            required

                        />
                    </div>
                    <div>
                        <label className="block mb-1">Syllabus:</label>
                        <select
                            value={syllabus}
                            onChange={(e) => setSyllabus(e.target.value)}
                            className="p-3 w-full rounded bg-gray-700 text-gray-200"
                            required
                        >
                            <option value="">-- Select Syllabus --</option>
                            <option value="Full Syllabus">Full Syllabus</option>
                            <option value="Chapter Wise">Chapter Wise</option>

                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Course:</label>
                        <select
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="p-3 w-full rounded bg-gray-700 text-gray-200"
                            required
                        ><option value="">-- Select Course --</option>
                            <option value="olevel">O Level</option>
                            <option value="alevel">A Level</option>
                            <option value="ccc">CCC</option>
                            <option value="adca">ADCA</option>
                            <option value="dca">DCA</option>
                            <option value="tally">Tally</option>
                            <option value="cuet">CUET(UG)</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Subject:</label>
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="p-3 w-full rounded bg-gray-700 text-gray-200"
                            required
                        ><option value="">-- Select Subject --</option>
                            <option value="m2">Web Design</option>
                            <option value="m3">Python</option>
                            <option value="m4">IoT</option>
                            <option value="m1">IT Tools</option>
                            <option value="home-science">Home Science</option>
                            <option value="hindi">Hindi</option>
                            <option value="physical-education">Physical Education</option>
                            <option value="political-Science">Political Science</option>
                            <option value="other">Other</option>

                        </select>
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
                        <label className="block mb-1">Duration (minutes):</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
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
                    disabled={loading}
                >
                    {loading ? "Wait..." : "Create Exam"}
                </button>
            </form>
            <br />
            <br />
        </div>
    );
};

export default AddExam;
