import User from "@/models/User";
import connectDB from "@/utils/db";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { generateUserId } from "@/utils/generateUserId";


const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (user && user.comparePassword(credentials.password)) {
          return user;
        } else {
          return null;
        }
      },
    }),
    
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // If it's a Google login
      if (account && profile) {
        await connectDB();
  
        // Check if the user exists in the database
        let user = await User.findOne({ email: profile.email });
  
        // If the user does not exist, create a new user in the database
        if (!user) {
          user = await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            password: "", // No password since Google login is being used
            userId: generateUserId(), // Your function for generating unique 4-digit userId
          });
        }
  
        // Attach necessary user data to the JWT token
        token.userId = user.userId;
        token.image = user.image;
      }
  
      return token;
    },
    async session({ session, token }) {
      session.userId = token.userId;
      session.image = token.image;
      return session;
    },
  }
  
}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}