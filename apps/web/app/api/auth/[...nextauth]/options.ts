import { prisma } from "database";
import { IncomingMessage } from "http";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { NextRequest } from "next/server";

export const options = (
  req: NextRequest
): NextAuthOptions => {
  return {
    providers: [
      CredentialsProvider({
        // @ts-ignore
        async authorize(credentials) {
          if (!credentials) {
            console.error("no creds")
            throw new Error("user can not be authenticated");
          }

          const nonce = req.cookies.get("auth-nonce")


          const message = `Sign this message for authenticating with your wallet. Nonce: ${nonce?.value}`;
          const messageBytes = new TextEncoder().encode(message);

          const publicKeyBytes = bs58.decode(credentials.publicKey);
          const signatureBytes = bs58.decode(credentials.signature);

          const result = nacl.sign.detached.verify(
            messageBytes,
            signatureBytes,
            publicKeyBytes
          );

          if (!result) {
            console.error("no result")
            throw new Error("user can not be authenticated");
          }

          const user = { name: credentials.publicKey };

          const profile = await prisma.user.findUnique({
            where: {
              address: credentials.publicKey,
            },
          });

          if (!profile) {
            await prisma.user.create({
              data: {
                address: credentials.publicKey,
              },
            });
          }

          return user;
        },
      }),
    ],
    pages: {
      signIn: "/auth",
    },
  };
};
