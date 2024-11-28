import StudentResponse from '@/models/StudentResponse';
import MCQExamPaper from '@/models/MCQExamPaper';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';
import PracticalExamPaper from '@/models/PracticalExamPaper';

export async function GET(request) {
    await connectDB();
    const { searchParams } = request.nextUrl;
    const studentId = searchParams.get('studentId');

    try {
        let results = await StudentResponse.find({studentId, examPaperType:"PracticalExamPaper"}).populate({
            path: "examPaperId",
            select: "totalMarks title course subject chapter syllabus topic"
        }).sort({updatedAt : -1});
        return NextResponse.json({ success: true, results });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
