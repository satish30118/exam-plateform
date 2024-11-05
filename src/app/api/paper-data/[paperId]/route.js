// app/api/paper-data/[id]/route.js
import MCQExamPaper from '@/models/MCQExamPaper';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { paperId } = params; 

  await connectDB();

  try {
    let examPaper = await MCQExamPaper.findById(paperId)
    if (!examPaper || !examPaper.isActive) {
      return NextResponse.json({ success: false, message: 'Exam paper not found' }, { status: 404 });
    }

    examPaper.questions.map((q)=>{
        q.correctAnswer = " "
    })

    return NextResponse.json(examPaper);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
