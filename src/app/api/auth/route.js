import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectDB from '@/utils/db'; // Ensure this is correct
import User from '@/models/User'; // Ensure this path is correct

export async function POST(req) {
  const { username, password, role } = await req.json();
  await connectDB(); // Connect to your database

  // Check if the user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, password: hashedPassword, role });

  // Save the new user
  await newUser.save();
  
  return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}
