import PracticalExamPaper from "@/models/PracticalExamPaper";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();

  try {
    const body = await request.json();
    const totalQuestions = body.questions.length;
    let totalMarks = 80;

    const exam = new PracticalExamPaper({ ...body, totalQuestions, totalMarks });
    await exam.save();

    const res = {
      course:exam.course,
      subject: exam.subject,
      topic : exam.topic,
      totalMarks : exam.totalMarks,
      totalQuestions : exam.totalQuestions,
      examDate : exam.examDate,
    }

    return NextResponse.json({ message: 'Exam added successfully!',res  }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
