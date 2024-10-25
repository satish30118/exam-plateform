import MCQExamPaper from "@/models/MCQExamPaper";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();

  try {
    const body = await request.json();
    const totalQuestions = body.questions.length;
    let totalMarks = 0;

    body.questions.forEach(element => {
      totalMarks += element.marks;
    });

    const exam = new MCQExamPaper({ ...body, totalQuestions, totalMarks });
    await exam.save();

    return NextResponse.json({ message: 'Exam added successfully!', course:exam.course, subject: exam.subject, }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
