/* eslint-disable turbo/no-undeclared-env-vars */
export * from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config();
declare global {
  var prisma: PrismaClient;
}

let prisma: PrismaClient;
if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
}

// const prisma = new PrismaClient();
export { prisma };
