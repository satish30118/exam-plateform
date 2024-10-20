import User from "@/models/User";
import connectDB from "@/utils/db";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
