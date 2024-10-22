import MCQExamPaper from "@/models/MCQExamPaper";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server"; 

export async function POST(request) {
  await connectDB(); 

  try {
    const body = await request.json(); 
    const totalQuestions = body.questions.length
    // console.log(totalQuestions); 

    const exam = new MCQExamPaper({...body, totalQuestions}); 
    await exam.save(); 

    return NextResponse.json({ message: 'Exam added successfully!', exam }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
