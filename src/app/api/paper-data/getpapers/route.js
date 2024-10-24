// app/api/paper-data/[id]/route.js
import MCQExamPaper from '@/models/MCQExamPaper'; // Adjust the import path according to your project structure
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const course = searchParams.get('course');
  const subject = searchParams.get('subject');

  await connectDB(); // Connect to MongoDB

  try {
    const querry = {
      course, 
    }
    if(subject){
      querry["subject"] = subject;
    }
    let examPaper = await MCQExamPaper.find(querry).select({questions:0}).sort({syallbus:-1})
    if (!examPaper) {
      return NextResponse.json({ success: false, message: 'Exam paper not found' }, { status: 404 });
    }
    return NextResponse.json(examPaper); // Use NextResponse.json for consistent responses
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 }); // Use NextResponse.json for consistent responses
  }
}
