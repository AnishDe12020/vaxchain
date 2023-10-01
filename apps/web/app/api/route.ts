import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  NextResponse.json({ message: "Hello, world!" });
};
