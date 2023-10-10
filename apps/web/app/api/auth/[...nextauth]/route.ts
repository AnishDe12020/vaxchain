import NextAuth from "next-auth";
import { options } from "./options";
import { NextRequest, NextResponse } from "next/server";


const handler = (req: NextRequest, res: NextResponse) => {
    return NextAuth(req as any, res as any, options(req));
  };

export { handler as GET, handler as POST };

