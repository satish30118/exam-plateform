import User from "@/models/User";
import connectDB from "@/utils/db";
import { Mailer } from "@/utils/Mailer";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB();

    try {
        const body = await request.json();
        const user = await User.findOne({ email: body.email }).select({ password: 0 });

        if (user) {
            return NextResponse.json({ message: 'Student Already added', user }, { status: 200 });
        }
        const newUser = await User.create(body)
        newUser.password = ""
        Mailer(newUser.email, "Successfully Completed Onboarding with Exam Point", sub(newUser.userId) )
        return NextResponse.json({ message: 'Student added sucessfully', user: newUser }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

const sub = (studentId)=>{
    return (`<h1>Welcome to Exam Point</h1>
      <p>Dear Student,</p>
      <p>We are excited to have you on board. Below are your registration details for accessing the Exam Point platform:</p>
      
      <h3>Login Details</h3>
      <p><strong>Student ID:</strong> ${studentId}</p>
      <p><strong>Password:</strong> ${studentId}</p>
  
      <p>Please use these credentials to log in and access your exam dashboard.</p>
      
      <h4>Need Help?</h4>
      <p>If you have any issues or need assistance, feel free to contact our support team at akriticomputercenter.official@gmail.com.</p>
      
      <p>Best regards,</p>
      <p>Exam Point Team</p>`)
  }
  