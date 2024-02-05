import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { MongoDBAdapter } from '@auth/mongodb-adapter';

import User from '@/models/UserModel';
import clientPromise from '@/lib/mongodbClient';
import dbConnect from '@/lib/dbConnect';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error('fill  all fields');
        await dbConnect();
        //get user eamil check
        const user = await User.findOne({
          email: credentials.email,
        });
        if (!user || !user?.hashedPassword)
          throw new Error('User Not found');

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) throw new Error('Invalid Password');

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
