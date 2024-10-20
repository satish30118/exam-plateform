import StudentResponse from '@/models/StudentResponse';
import ExamPaper from '@/models/ExamPaper';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { studentId, examPaperId, responses } = await request.json();

  await connectDB(); // Connect to MongoDB

  try {
    // Check if the exam paper exists
    const examPaper = await ExamPaper.findById(examPaperId);
    if (!examPaper) {
      return new NextResponse(JSON.stringify({ success: false, message: 'Exam paper not found' }), { status: 404 });
    }

    // Create a new student response document
    const newResponse = new StudentResponse({
      studentId,
      examPaperId,
      responses,
    });

    // Save the student's responses
    await newResponse.save();

    return new NextResponse(JSON.stringify({ success: true, data: newResponse }), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
