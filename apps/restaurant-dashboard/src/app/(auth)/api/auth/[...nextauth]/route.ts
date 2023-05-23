import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
// adding Prisma

//
export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // api call
        try {
          const response = await axios.post(
            "http://localhost:3001/api/v1/auth-service/auth/login",
            {
              email: credentials?.email,
              password: credentials.password,
            }
          );
          const { data } = response;
          console.log(data);
          return {
            id: data.userId,
            email: data.email,
            access_token: data.access_token,
            key: "Hey cool",
          };
        } catch (err) {
          console.log(err);
        }
        // validate user from database
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log(session, token);
      return {
        ...session,
        user: {
          ...session.user,
          access_token: token.access_token,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          access_token: u.access_token,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
