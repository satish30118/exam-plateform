// components/Instructions.js
"use client";

import {useSearchParams } from "next/navigation";

const Instructions = () => {
    const searchParams = useSearchParams();
    const testId = searchParams.get('testId');

    const checkInstruction = (id) => {
        const checkbox = document.getElementById(`${id}_ch`);
        if (!checkbox.checked) {
            alert("Please confirm that you have read the instructions.");
            return;
        }
        // Proceed to the next step
        console.log(testId)
    };

    return (
        <div className="container mx-auto p-4 text-gray-800">
            <div className="w-10/12 mx-auto">
                <h4 className="text-center font-extrabold text-xl pb-4">Please read the instructions carefully</h4>

                <section>
                    <h4 className="pb-3 font-bold text-xl underline">General Instructions:</h4>
                    <ol className="ml-14 list-decimal space-y-4">
                        <li>The clock will be set at the server. The countdown timer will display the remaining time. When it reaches zero, the exam will end automatically.</li>
                        <li>
                            The Questions Palette will show the status of each question:
                            <ol className="ml-6 space-y-2 mt-2">
                                <li className="flex space-x-2"><img src="/img/QuizIcons/Logo1.png" alt="Logo1" /> <span>You have not visited the question yet.</span></li>
                                <li className="flex space-x-2"><img src="/img/QuizIcons/Logo2.png" alt="Logo2" /> <span>You have not answered the question.</span></li>
                                <li className="flex space-x-2"><img src="/img/QuizIcons/Logo3.png" alt="Logo3" /> <span>You have answered the question.</span></li>
                                <li className="flex space-x-2"><img src="/img/QuizIcons/Logo4.png" alt="Logo4" /> <span>You marked the question for review but have not answered it.</span></li>
                                <li className="flex space-x-2"><img src="/img/QuizIcons/Logo5.png" alt="Logo5" /> <span>Questions "Answered and Marked for Review" will be evaluated.</span></li>
                            </ol>
                        </li>
                        <li>You can hide the question palette by clicking the "&gt;" arrow and show it again by clicking the "&lt;" arrow.</li>
                        <li>You can change the exam language by clicking your profile image in the top-right corner.</li>
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
                                <li>Click the button next to the answer to select it.</li>
                                <li>To deselect, click the button again or click <strong>Clear Response</strong>.</li>
                                <li>Click <strong>Save & Next</strong> to save your answer.</li>
                                <li>Click <strong>Mark for Review & Next</strong> to save and mark for review.</li>
                            </ol>
                        </li>
                    </ol>
                </section>

                <section className="mt-5">
                    <h4 className="mb-3 font-bold text-xl underline">Navigating through Sections:</h4>
                    <ol className="ml-14 list-decimal space-y-2">
                        <li>Sections are displayed at the top of the screen. Click on a section name to view its questions.</li>
                        <li>After clicking <strong>Save & Next</strong> on the last question of a section, you will be taken to the next section.</li>
                        <li>You can navigate between sections at any time during the exam.</li>
                    </ol>
                </section>

                <hr className="my-5" />

                <label className="text-red-600 pl-3">
                    <input type="checkbox" id="1_ch" className="mr-2" /> I have read and understood the instructions. I declare that I am not in possession of any prohibited gadget or material.
                </label>

                <hr className="my-5" />

                <div className="text-center my-5 ">
                    <button onClick={() => checkInstruction("1")} className="bg-green-500 text-white px-4 py-2 rounded">Proceed</button>
                </div>
            </div>
        </div>
    );
};

export default Instructions;
