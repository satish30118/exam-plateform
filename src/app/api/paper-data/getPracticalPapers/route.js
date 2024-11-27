
import MCQExamPaper from '@/models/MCQExamPaper'; 
import PracticalExamPaper from '@/models/PracticalExamPaper';
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

    let examPapers = await PracticalExamPaper.find(query)
      .select({ questions: 0 }) 
      .sort({ title: 1 });

    return NextResponse.json(examPapers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
