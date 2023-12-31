import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findAdminByEmail, findUserByEmail } from "./actions";
import { Admin, User } from "@prisma/client";

interface MyCredentials {
  email: string;
  password: string;
}

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        try {
          const { email, password } = credentials as MyCredentials;

          const user = (await findUserByEmail(email)) as User;
          const admin = (await findAdminByEmail(email)) as Admin;

          // console.log(admin);
          // console.log(user);
          if (user) {
            const isMatched =
              password && user.password
                ? await compare(password, user.password)
                : false;

            if (!isMatched) {
              throw new Error("Password not Matched!");
            }

            return user;
          }

          if (admin) {
            const isMatched =
              password && admin.password
                ? await compare(password, admin.password)
                : false;

            // console.log(isMatched);
            if (!isMatched) {
              throw new Error("Password not Matched!");
            }

            return admin;
          }

          return null;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],

  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.avatar = user?.avatar;
      }
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
};
