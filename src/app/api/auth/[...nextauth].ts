import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/db";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: {},
            password: {},
        },
        async authorize(credentials: any, req: any) {
          const user = await prisma.lecturer.findUnique({
              where: {
                  username: credentials.username
              }
          })
          if (user) {
              return user;
          }
          console.log("credentials", credentials)
          return null;
        },
    }),
  ],
});

export { handler as GET, handler as POST };