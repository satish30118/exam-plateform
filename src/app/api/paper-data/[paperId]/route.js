// app/api/paper-data/[id]/route.js
import MCQExamPaper from '@/models/MCQExamPaper';
import PracticalExamPaper from '@/models/PracticalExamPaper';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { paperId } = params;
  const { searchParams } = request.nextUrl;
  const examType = searchParams.get('examType');

  await connectDB();

  try {
    let examPaper;
    if (examType == "MCQ") {
      examPaper = await MCQExamPaper.findById(paperId)
    }
    if (examType == "Practical") {
      examPaper = await PracticalExamPaper.findById(paperId)
    }
    if (!examPaper || !examPaper.isActive) {
      return NextResponse.json({ success: false, message: 'Exam paper not found' }, { status: 404 });
    }

    examPaper?.questions?.map((q) => {
      q.correctAnswer = " "
    })

    return NextResponse.json(examPaper);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
