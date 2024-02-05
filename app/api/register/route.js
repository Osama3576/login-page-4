import dbConnect from '@/lib/dbConnect';

import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import User from '@/models/UserModel';

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse('Missing info', { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      hashedPassword,
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error, 'Registration error');
    return new NextResponse('Internal error', { status: 500 });
  }
}
