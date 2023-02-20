import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // ...
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
        httpOptions: {
          timeout: 40000,
        }
      },
      secret: process.env.NEXTAUTH_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/auth-account',
  }
});