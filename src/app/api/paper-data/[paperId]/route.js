// app/api/paper-data/[id]/route.js
import MCQExamPaper from '@/models/MCQExamPaper'; // Adjust the import path according to your project structure
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { paperId } = params; // Destructure id from params

  await connectDB(); // Connect to MongoDB

  try {
    let examPaper = await MCQExamPaper.findById(paperId)
    // console.log(paperId)
    if (!examPaper) {
      return NextResponse.json({ success: false, message: 'Exam paper not found' }, { status: 404 });
    }

    examPaper.questions.map((q)=>{
        q.correctAnswer = " "
    })
    return NextResponse.json(examPaper); // Use NextResponse.json for consistent responses
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 }); // Use NextResponse.json for consistent responses
  }
}
