import User from "@/models/User";
import connectDB from "@/utils/db";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Mailer } from "@/utils/Mailer";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // console.log(credentials)
        await connectDB();
        let user;
        if(credentials?.userId){
          user = await User.findOne({ userId: credentials.userId });
        }else{
          user = await User.findOne({ email: credentials.email });
        }
         

        if (user && (await user.comparePassword(credentials.password))) {
          // Return necessary user data, including userId
          return { 
            id: user._id,
            name:user.name,
            email: user.email,
            userId: user.userId, 
            image: user.image,
            role: user.role
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // console.log(token, account, profile, user)
      // Handle Google login
      if (account && profile) {
        await connectDB();
        let dbUser = await User.findOne({ email: profile.email });

        if (!dbUser) {
          dbUser = await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            password: "",
            userId: "",
          });
          Mailer(dbUser.email, "Successfully Completed Onboarding with Exam Point", sub(dbUser.userId) )
        }

        token.userId = dbUser.userId;
        token.image = dbUser.image;
        token.role = dbUser.role;
      }

      // Handle Credentials login
      if (!profile && user) {
        token.userId = user.userId;
        token.role = user.role;
        token.image = user.image;

      }

      return token;
    },
    async session({ session, token }) {
      session.userId = token.userId;
      session.role = token.role;
      session.image = token.image;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


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
