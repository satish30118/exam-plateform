import User from "@/models/User";
import connectDB from "@/utils/db";
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
        return NextResponse.json({ message: 'Student added sucessfully', user: newUser }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
