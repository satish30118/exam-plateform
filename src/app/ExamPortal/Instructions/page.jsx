// components/Instructions.js
"use client";

import Loading from "@/components/Loader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Instructions = () => {
    const [isPermission, setIsPermission] = useState(false)
    const searchParams = useSearchParams();
    const { data: session, status } = useSession()
    const router = useRouter()
    const examId = searchParams.get('examId');
    const examTitle = searchParams.get('examTitle');
    const exam = searchParams.get('exam');
    const subjectCode = searchParams.get('subjectCode');
    const examType = searchParams.get('examType');


    useEffect(() => {
        if (status == "loading") { return }
        if (!session) {
            toast.warn("Your are not permitted to this page, login first to access this")
            router.push(`/ExamPortal/StudentLogin?examId=${examId}&examTitle=${examTitle}&exam=${exam}&examType=${examType}&subjectCode=${subjectCode}`)
        } else {
            setIsPermission(true)
        }

    }, [status, examId, exam, examTitle, examType, router, session, subjectCode])
    const checkInstruction = (id) => {
        const checkbox = document.getElementById(`${id}_ch`);
        if (!checkbox.checked) {
            toast.warn("Please confirm that you have read the instructions.");
            return;
        }
        // Proceed to the next step
        if (examType == "MCQ") {
            router.push(`/ExamPortal/${examType}Portal?examId=${examId}&examTitle=${examTitle}&exam=${exam}&examType=${examType}&subjectCode=${subjectCode}`)

        } else {
            router.push(`/ExamPortal/${examType}Portal/${subjectCode}?examId=${examId}&examTitle=${examTitle}&exam=${exam}&examType=${examType}&subjectCode=${subjectCode}`)
        }
    };

    if (!isPermission) return <div> <Loading text="Checking Permission..." /></div>

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="container bg-gray-100 mx-auto p-4 h-full overflow-y-auto text-gray-800">
                <div className="w-full lg:w-10/12 mx-auto">
                    <h4 className="text-center font-extrabold text-xl pb-4">Please read the instructions carefully</h4>

                    <section>
                        <h4 className="pb-3 font-bold text-xl underline">General Instructions:</h4>
                        <ol className="ml-14 list-decimal space-y-4">
                            <li>The clock will be set at the server. The countdown timer will display the remaining time. When it reaches zero, the exam will end automatically.</li>
                            <li>
                                The Questions Palette displayed on the right side of screen will show the status of each question using one of the following symbols:
                                <ol className="ml-6 space-y-2 mt-2">
                                    <li className="flex space-x-2"><img src="/img/QuizIcons/Logo1.png" alt="Logo1" /> <span>You have not visited the question yet.</span></li>
                                    <li className="flex space-x-2"><img src="/img/QuizIcons/Logo2.png" alt="Logo2" /> <span>You have not answered the question.</span></li>
                                    <li className="flex space-x-2"><img src="/img/QuizIcons/Logo3.png" alt="Logo3" /> <span>You have answered the question.</span></li>
                                    <li className="flex space-x-2"><img src="/img/QuizIcons/Logo4.png" alt="Logo4" /> <span>You marked the question for review but have not answered it.</span></li>
                                    <li className="flex space-x-2"><img src="/img/QuizIcons/Logo5.png" alt="Logo5" /> <span>Questions &quot;Answered and Marked for Review&quot; will be evaluated.</span></li>
                                </ol>
                            </li>
                            <li>You can click on the &gt; arrow which apperes to the left of question palette to collapse the question palette thereby maximizing the question window. To view the question palette again, you can click on &lt; which appears on the right side of question window.</li>
                            <li>You can click on your &quot;Profile&quot; image on top right corner of your screen to change the language during the exam for entire question paper. On clicking of Profile image you will get a drop-down to change the question content to the desired language.
                            </li>
                            <li>Use <img src="/img/QuizIcons/down.png" className="inline mx-2" alt="Down" /> to scroll down and <img src="/img/QuizIcons/up.png" className="inline mx-2" alt="Up" /> to scroll up without manual scrolling.</li>
                        </ol>
                    </section>

                    <section className="mt-5">
                        <h4 className="mb-3 font-bold text-xl underline">Navigating to a Question:</h4>
                        <ol className="ml-14 list-decimal space-y-4">
                            <li>
                                To answer a question:
                                <ol className="ml-14 list-[lower-alpha] space-y-1">
                                    <li>Click the question number in the Question Palette to go directly to that question.</li>
                                    <li>Click <strong>Save & Next</strong> to save your answer and proceed to the next question.</li>
                                    <li>Click <strong>Mark for Review & Next</strong> to mark it for review and move to the next question.</li>
                                </ol>
                            </li>
                        </ol>
                    </section>

                    <section className="mt-5">
                        <h4 className="mb-3 font-bold text-xl underline">Answering a Question:</h4>
                        <ol className="ml-14 list-decimal space-y-4">
                            <li>
                                For multiple-choice questions:
                                <ol className="ml-14 list-[lower-alpha] space-y-1">
                                    <li>To select you answer, click on the button of one of the options.</li>
                                    <li>To deselect, click the button again or click <strong>Clear Response</strong>.</li>
                                    <li>To change your chosen answer, click on the button of another option</li>
                                    <li>You <strong>MUST</strong> click <strong>Save & Next</strong> to save your answer.</li>
                                    <li>Click <strong>Mark for Review & Next</strong> to save and mark for review.</li>
                                </ol>
                            </li>
                            <li>To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.</li>
                        </ol>
                    </section>

                    <section className="mt-5">
                        <h4 className="mb-3 font-bold text-xl underline">Navigating through Sections:</h4>
                        <ol className="ml-14 list-decimal space-y-2">
                            <li>Sections in this question paper are displayed on the top bar of the screen. Questions in a section can be viewed by click on the section name. The section you are currently viewing is highlighted.</li>
                            <li>After clicking <strong>Save & Next</strong> on the last question of a section, you will be taken to the next section.</li>
                            <li>You can shuffle between sections and questions anything during the examination as per your convenience only during the time stipulated.</li>
                            <li>Candidate can view the corresponding section summery as part of the legend that appears in every section above the question palette.</li>
                        </ol>
                    </section>

                    <hr className="my-5" />

                    <label className="text-red-600 pl-3">
                        <input type="checkbox" id="1_ch" className="mr-2" /> I have read and understood the instructions. All computer hardware allotted to me are in proper working condition. I declare that I am not in possession of / not wearing / not carrying any prohibited gadget like mobile phone, bluetooth devices etc. /any prohibited material with me into the Examination Hall.I agree that in case of not adhering to the instructions, I shall be liable to be debarred from this Test and/or to disciplinary action, which may include ban from future Tests / Examinations.
                    </label>

                    <hr className="my-5" />

                    <div className="text-center my-5 ">
                        <button onClick={() => checkInstruction("1")} className="bg-green-500 text-white px-4 py-2 rounded">Proceed</button>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Instructions;
