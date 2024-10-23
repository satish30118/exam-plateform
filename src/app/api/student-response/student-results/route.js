import StudentResponse from '@/models/StudentResponse';
import MCQExamPaper from '@/models/MCQExamPaper';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const studentId = searchParams.get('studentId');

  await connectDB();

  try {
    let response = await StudentResponse.find({ studentId }).populate({ path: "examPaperId", select: "-questions" }).select("-responses");

    if (!response) {
      return NextResponse.json({ success: false, message: 'Response paper not found' }, { status: 404 });
    }


    return NextResponse.json({ success: true, results: response });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
