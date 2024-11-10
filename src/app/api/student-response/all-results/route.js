import StudentResponse from '@/models/StudentResponse';
import MCQExamPaper from '@/models/MCQExamPaper';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
    await connectDB();

    try {
        let results = await StudentResponse.find({}).populate({
            path: "examPaperId",
            select: "totalMarks title course subject chapter syllabus topic"
        }).select("-responses").sort({updatedAt : -1});
        return NextResponse.json({ success: true, results });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
