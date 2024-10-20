// app/api/paper-data/[id]/route.js
import ExamPaper from '@/models/ExamPaper'; // Adjust the import path according to your project structure
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params; // Destructure id from params

  await connectDB(); // Connect to MongoDB

  try {
    let examPaper = await ExamPaper.findById(id)
    if (!examPaper) {
      return new NextResponse.json({ success: false, message: 'Exam paper not found' }, { status: 404 });
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
