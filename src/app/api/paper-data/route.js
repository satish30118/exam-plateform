// app/api/paper-data/[id]/route.js
import ExamPaper from '@/models/ExamPaper'; // Adjust the import path according to your project structure
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request, { query }) {
  const { id } = query;

  await connectDB(); // Connect to MongoDB

  try {
    const examPaper = await ExamPaper.findById(id);
    if (!examPaper) {
      return new NextResponse(JSON.stringify({ success: false, message: 'Exam paper not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, data: examPaper }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
