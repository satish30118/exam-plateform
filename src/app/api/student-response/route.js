import StudentResponse from '@/models/StudentResponse';
import MCQExamPaper from '@/models/MCQExamPaper'; // Import the MCQExamPaper model to fetch exam details
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Mailer } from '@/utils/Mailer';
import User from '@/models/User';
import PracticalExamPaper from '@/models/PracticalExamPaper';

export async function POST(request) {
  const { studentId, examPaperId, examPaperType, responses } = await request.json();
  await connectDB();
  console.log(studentId, examPaperId, examPaperType, responses)
  try {
    let examPaper;
    if (examPaperType == "MCQExamPaper") {
      examPaper = await MCQExamPaper.findById(examPaperId);
    } else {
      examPaper = await PracticalExamPaper.findById(examPaperId);
    }

    if (!examPaper) {
      return new NextResponse(JSON.stringify({ success: false, error: "Exam paper not found" }), { status: 404 });
    }

    // Initialize the score
    let totalScore = 0;

    if (examPaperType == "MCQExamPaper") {
      responses.forEach(response => {
        const questionId = new mongoose.Types.ObjectId(response.questionId);
        const question = examPaper.questions.id(response.questionId);
        if (question) {
          if (response.selectedOption === question.correctAnswer) {
            totalScore += question.marks;
          } else {
            totalScore -= question.negative;
          }
        }
      });
    }


    let existingResponse = await StudentResponse.findOne({ studentId, examPaperId, examPaperType });
    if (existingResponse) {
      existingResponse.responses = responses;
      existingResponse.score = totalScore;
      const updatedResponse = await existingResponse.save();
      // Mail sending
      const user = await User.findOne({ userId: studentId })
      if (examPaperType == "MCQExamPaper") {
        Mailer(user.email, "Congratulations on Completing Your Mock Test!", examCompletionEmail(user.name, examPaper.syllabus, examPaper.title, examPaper.course, totalScore, examPaper.totalMarks, updatedResponse._id))
      }
      return new NextResponse(JSON.stringify({ success: true, responseId: updatedResponse._id }), { status: 200 });
    }


    // Create a new student response document
    const newResponse = new StudentResponse({
      studentId,
      examPaperId,
      examPaperType,
      responses,
      score: totalScore,
    });
    await newResponse.save();

    // Mail sending
    const user = await User.findOne({ userId: studentId })

    if (examPaperType == "MCQExamPaper") {
      Mailer(user.email, "Congratulations on Completing Your Mock Test!", examCompletionEmail(user.name, examPaper.syllabus, examPaper.title, examPaper.course, totalScore, examPaper.totalMarks, newResponse._id))
    }
    return new NextResponse(JSON.stringify({ success: true, responseId: newResponse._id }), { status: 201 });
  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}



const examCompletionEmail = (name, syllabus, testTitle, course, totalScore, totalMarks, responseId) => {
  return (`
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
      <h2 style="text-align: center; color: #333;">Exam Completion Notification</h2>
      <p style="font-size: 16px;">Dear ${name},</p>
      <p style="font-size: 15px;">Congratulations! You have successfully completed the <strong>${syllabus} ${testTitle} </strong> for the <strong>${course.toUpperCase()}</strong> course on the Exam Point platform.</p>
      
      <h3 style="color: #333;">Your Test Results</h3>
      <p><strong>Score:</strong> ${totalScore} out of ${totalMarks}</p>
      <p><strong>Percentage:</strong> ${(totalScore / totalMarks * 100).toFixed(2)}%</p>
      
      <p style="font-size: 15px; border-top: 1px solid #ccc; padding-top: 10px;">We hope you found the mock test beneficial for your exam preparation. Keep practicing to enhance your skills!</p>
      
      <h4 style="color: #333;">Next Steps</h4>
      <p style="font-size: 15px;">Review your answers and performance on your dashboard to identify areas for improvement.</p>
      
      <h4 style="color: #333;">View Your Results</h4>
      <p style="text-align: left;">
        <a href="https://exam.akriticomputer.xyz/ExamFeedback/ExamResult?responseId=${responseId}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px; transition: background-color 0.3s;">
          View Result
        </a>
      </p>
      
      <h4 style="color: #333;">Need Help?</h4>
      <p style="font-size: 16px;">If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:akriticomputercenter.official@gmail.com" style="color: #007bff; text-decoration: underline;">akriticomputercenter.official@gmail.com</a>.</p>
      
      <p style="font-size: 16px;">Best wishes for your future exams!</p>
      <p style="font-size: 16px;">Best regards,</p>
      <p style="font-size: 16px; font-weight: bold;">Team Exam Point</p>
    </div>
  `);
};
