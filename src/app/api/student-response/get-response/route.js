import StudentResponse from '@/models/StudentResponse';
import MCQExamPaper from '@/models/MCQExamPaper';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const responseId = searchParams.get('responseId');
console.log(responseId)
  await connectDB();

  try {
    // Populate the examPaper field in the StudentResponse
    let response = await StudentResponse.findById(responseId).populate('examPaperId');
    
    if (!response) {
      return NextResponse.json({ success: false, message: 'Response paper not found' }, { status: 404 });
    }

    return NextResponse.json(response); 
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
