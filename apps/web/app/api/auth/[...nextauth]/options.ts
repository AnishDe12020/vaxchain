import { log } from "console";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      log("signIn cb >> ", { user, account, profile, email, credentials });

      // check if user is new and if new redirect to roles else log user in
      return true;
    },
  },
  pages: {
    signIn: "/auth",
  },
};
