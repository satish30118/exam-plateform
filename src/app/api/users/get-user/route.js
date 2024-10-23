import User from '@/models/User';
import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get('userId');
  console.log(userId)

  await connectDB(); 

  try {
    let user = await User.findOne({userId}).select({role:1})
    if (!user) {
      return NextResponse.json({ success: false, message: 'User Not Found' });
    }
    return NextResponse.json({ success: true, user}, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 }); // Use NextResponse.json for consistent responses
  }
}
