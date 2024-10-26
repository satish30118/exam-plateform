import User from '@/models/User';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
    await connectDB();

    try {
        let users = await User.find({}).sort({ userId: -1 })
        if (!users) {
            return NextResponse.json({ success: false, message: 'User Not Found' });
        }
        return NextResponse.json({ success: true, users }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
