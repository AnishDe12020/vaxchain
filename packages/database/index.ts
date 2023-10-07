/* eslint-disable turbo/no-undeclared-env-vars */
export * from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export { prisma };
