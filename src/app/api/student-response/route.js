import StudentResponse from '@/models/StudentResponse';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { studentId, examPaperId, examPaperType, responses } = await request.json();

  await connectDB(); // Connect to MongoDB

  try {
    // Check if a student response already exists
    let existingResponse = await StudentResponse.findOne({ studentId, examPaperId, examPaperType });

    if (existingResponse) {
      // Update the existing response
      existingResponse.responses = responses; // Update the responses
      const updatedResponse = await existingResponse.save(); // Save the updated response
      return new NextResponse(JSON.stringify({ success: true, data: updatedResponse }), { status: 200 });
    }

    // Create a new student response document
    const newResponse = new StudentResponse({
      studentId,
      examPaperId,
      examPaperType,
      responses,
    });

    // Save the student's responses
    await newResponse.save();

    return new NextResponse(JSON.stringify({ success: true, data: newResponse }), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
