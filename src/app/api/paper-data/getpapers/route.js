// app/api/paper-data/[id]/route.js
import MCQExamPaper from '@/models/MCQExamPaper'; // Adjust the import path according to your project structure
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const course = searchParams.get('course');
  const subject = searchParams.get('subject');

  await connectDB(); 

  try {
    const query = { course };
    if (subject) {
      query.subject = subject;
    }

    // Add MongoDB date comparison with `$lte`
    query.examDate = { $lte: new Date() };

    let examPapers = await MCQExamPaper.find(query)
      .select({ questions: 0 }) 
      .sort({ title: 1 });

    if (!examPapers || examPapers.length === 0) {
      return NextResponse.json({ success: false, message: 'Exam paper not found' }, { status: 404 });
    }

    return NextResponse.json(examPapers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
