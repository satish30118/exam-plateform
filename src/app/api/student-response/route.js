import StudentResponse from '@/models/StudentResponse';
import MCQExamPaper from '@/models/MCQExamPaper'; // Import the MCQExamPaper model to fetch exam details
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(request) {
  const { studentId, examPaperId, examPaperType, responses } = await request.json();
  await connectDB();
  try {
    let examPaper;
    if (examPaperType == "MCQExamPaper") {
      examPaper = await MCQExamPaper.findById(examPaperId);
    } else {
      // examPaper = await PracticalExamPaper.findById(examPaperId);
    }

    if (!examPaper) {
      return new NextResponse(JSON.stringify({ success: false, error: "Exam paper not found" }), { status: 404 });
    }

    // Initialize the score
    let totalScore = 0;

    responses.forEach(response => {
      // Convert response.questionId to ObjectId if it is not already
      const questionId = new mongoose.Types.ObjectId(response.questionId);
      console.log("firstQuestion id: ", examPaper.questions[0]._id.toString())
      console.log("first ansrwed id: ", responses[0].questionId)


      // Find the question by ObjectId
      const question = examPaper.questions.id(response.questionId);
      console.log(questionId)
      console.log('Matched Question:', question);

      if (question) {
        if (response.selectedOption === question.correctAnswer) {
          // Correct answer: Add the marks
          totalScore += question.marks;
        } else {
          // Incorrect answer: Subtract negative marks
          totalScore -= question.negative;
        }
      }
    });

    // Check if a student response already exists
    let existingResponse = await StudentResponse.findOne({ studentId, examPaperId, examPaperType });

    if (existingResponse) {
      // Update the existing response
      existingResponse.responses = responses; // Update the responses
      existingResponse.score = totalScore; // Update the score
      const updatedResponse = await existingResponse.save(); // Save the updated response
      return new NextResponse(JSON.stringify({ success: true,  responseId: updatedResponse._id }), { status: 200 });
    }

    // Create a new student response document
    const newResponse = new StudentResponse({
      studentId,
      examPaperId,
      examPaperType,
      responses,
      score: totalScore, // Save the calculated score
    }); 

    // Save the student's responses and score
    await newResponse.save();

    return new NextResponse(JSON.stringify({ success: true, responseId: newResponse._id }), { status: 201 });
  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
