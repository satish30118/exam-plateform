import MCQExamPaper from "@/models/MCQExamPaper";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server"; // Import NextResponse

export async function POST(request) {
  await connectDB(); // Connect to the database

  try {
    const body = await request.json(); // Parse the request body
    console.log(body); // Log to check the parsed body

    const exam = new MCQExamPaper(body); // Create a new exam using the parsed body
    await exam.save(); // Save the exam to the database

    // Respond with NextResponse and structured response data
    return NextResponse.json({ message: 'Exam added successfully!', exam }, { status: 201 });
  } catch (error) {
    // Respond with an error using NextResponse and status 400
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
