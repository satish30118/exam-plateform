"use client";
import Question from '@/components/ExamPortal/Question';
import QuestionPalette from '@/components/ExamPortal/QuestionPalette';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTimer } from '../../layout';
import axios from 'axios';
import Loading from '@/components/Loader';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Editor } from '@monaco-editor/react';
import AssetsModal from '@/components/ExamPortal/AssetsModal';

const PracticalPortal = () => {
    const { setTimeRemaining, responses, setResponses, handleExamSubmit } = useTimer();
    const [isPermission, setIsPermission] = useState(false)
    const [paperData, setPaperData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState("")
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)
    const { data: session, status } = useSession()
    const searchParams = useSearchParams()
    const router = useRouter()
    const examId = searchParams.get('examId');
    const [showAssetsModal, setShowAssetsModal] = useState(false);

    // Move to the next or previous question
    const navigateQuestion = (direction) => {
        const newIndex = selectedQuestionIndex + direction;
        if (newIndex >= 0 && newIndex < paperData.length) {
            setSelectedQuestionIndex(newIndex);
            setSelectedQuestion(paperData[newIndex]);
        }

        setResponses({
            ...responses,
            [selectedQuestion._id]: {
                selectedOption: responses[selectedQuestion._id]?.selectedOption || null,
                answerType: responses[selectedQuestion._id]?.answerType || "NotAnswered"
            }// Store the selected option for each question
        });

    };

    const handleAnswerType = (type) => {
        if (responses[selectedQuestion._id]?.selectedOption) {
            setResponses({
                ...responses,
                [selectedQuestion._id]: {
                    selectedOption: responses[selectedQuestion._id]?.selectedOption || null,
                    answerType: type
                }

            });
        } else {
            setResponses({
                ...responses,
                [selectedQuestion._id]: {
                    selectedOption: responses[selectedQuestion._id]?.selectedOption || null,
                    answerType: "NotAnswered"
                }// Store the selected option for each question
            });


        }
        // console.log(responses);
        if (selectedQuestionIndex < paperData.length - 1) {
            setSelectedQuestion(paperData[selectedQuestionIndex + 1]);
            setSelectedQuestionIndex(selectedQuestionIndex + 1)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        handleExamSubmit()
    };


    const fetchPaperData = async () => {
        try {
            const { data } = await axios.get(`/api/paper-data/${examId}?examType=Practical`);
            setPaperData(data.questions);
            setSelectedQuestion(data.questions[0])
            setTimeRemaining(data?.duration * 60)
        } catch (err) {
            console.error(err);
            setError('Failed to fetch paper data.');
            toast.error('Failed to fetch paper data.');
        } finally {
            setLoading(false); // Set loading to false when done
        }
    }

    useEffect(() => {
        if (status == "loading") { return }
        if (!session) {
            toast.warn("Your are not permitted to this page, login first to access this")
            router.push(`/ExamPortal/StudentLogin?examId=${examId}`)
            return;
        }
        setIsPermission(true)
        fetchPaperData();
    }, [status, session]);
    const [code, setCode] = useState("//hello world");

    const [iframeContent, setIframeContent] = useState("");

    // Update iframe content on code change
    useEffect(() => {
        const timeout = setTimeout(() => setIframeContent(code), 300);
        return () => clearTimeout(timeout);
    }, [code]);

useEffect(()=>{
    setCode(responses[selectedQuestion._id]?.selectedOption ||`
        <!-- Write HTML, CSS, and JS here -->
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              /* Add your CSS here */
              body {
                font-family: Arial, sans-serif;
              }
            </style>
          </head>
          <body>
            <h1>Hello, World!</h1>
            <script>
              // Add your JavaScript here
              console.log("Hello from JavaScript!");
            </script>
          </body>
        </html>
          `)
},[selectedQuestion])
    const formattedQuestionText = selectedQuestion?.questionText?.replace(/\n/g, '<br />');

    if (!isPermission) return <div> <Loading text="Checking Permission..." /></div>
    if (loading) return <div> <Loading text="Question Loading..." /></div>

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="h-full bg-gray-100 text-gray-900">
                {/* Main Content */}
                <div className="flex p-4 h-5/6">
                    {/* Left Section: Question Display */}
                    <div className='w-5/6 static'>
                        <div className="h-5/6 overflow-y-auto bg-white p-4 rounded shadow-md ">

                            {/* Questions Display */}
                            <div className='flex justify-between'>
                                <h2 className="text-lg md:text-xl font-bold">Question {selectedQuestionIndex + 1}:</h2>
                                <div className='font-bold flex space-x-2'>
                                    <h3 className='text-green-500 font-bold'>+{selectedQuestion?.marks}</h3>,
                                    <h3 className='text-red-500'>-{selectedQuestion?.negative}</h3>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="ml-3 flex flex-col justify-between">
                                <div>
                                    <p className="text-base md:text-lg mb-4" dangerouslySetInnerHTML={{ __html: formattedQuestionText }} />
                                </div>
                            </div>

                            {selectedQuestion.questionImage && <img src={selectedQuestion?.questionImage} className='h-64' />}

                        </div>


                        <div className="bg-white p-4 flex justify-between text-xs lg:text-base">
                            {/* <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleAnswerType("MarkAndNext")}>Mark for Review</button> 
                            <button className="bg-orange-600 text-white px-4 py-2 rounded" onClick={() => handleAnswerType("SaveMarkAndNext")}>Save & Mark for Review</button> */}
                            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowAssetsModal(true)} >Assests</button>
                            <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => handleAnswerType("SaveAndNext")}>Save & Next</button>
                        </div>
                        <div className="p-4 flex justify-between text-xs lg:text-base">
                            <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>
                            <div>
                                <button className="bg-gray-200 text-black px-6 py-2 rounded" onClick={() => navigateQuestion(-1)}>&lt;&lt; Back</button>
                                <button className="bg-gray-500 text-white px-6 py-2 rounded" onClick={() => navigateQuestion(1)}> Next &gt;&gt; </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Question Palette */}
                    <div className="max-h-screen overflow-y-auto w-1/6 bg-white p-4 ml-4 rounded shadow-md">
                        <QuestionPalette data={paperData} selectQuestion={setSelectedQuestion} setIndex={setSelectedQuestionIndex} responses={responses} setResponses={setResponses} />
                    </div>
                </div>
            </div>


            {/* HTML/CSS/JS EDITOR */}
            <div>
                <div style={{ display: "flex", height: "75vh", padding: "20px", margin: "auto" }} className='space-x-4'>
                    {/* Code Editor */}
                    <div style={{ flex: 1, border: "2px solid lightblue" }}>
                        <Editor
                            height="100%"
                            defaultLanguage="html"
                            value={code}
                            onChange={(value) => {
                                setCode(value); setResponses({
                                    ...responses,
                                    [selectedQuestion._id]: {
                                        selectedOption: value,
                                    }, answerType :"NotAnswer"
                                });
                            }}
                            options={{ fontSize: 14 }}
                        />
                    </div>


                    {/* Preview */}
                    <div style={{ flex: 1, border: "2px solid lightblue" }}>
                        <iframe
                            srcDoc={iframeContent}
                            title="Live Preview"
                            sandbox="allow-scripts"
                            style={{ width: "100%", height: "100%", border: "none" }}
                        />
                    </div>
                </div>
            </div>

            {/* Modal */}
            <AssetsModal
                assets={selectedQuestion?.assets || { image: [], audio: [], video: [], url: [] }}
                isOpen={showAssetsModal}
                onClose={() => setShowAssetsModal(false)}
            />
        </Suspense>
    );
};

export default PracticalPortal;
