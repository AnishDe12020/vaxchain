import { NextRequest, NextResponse } from "next/server"
import { Keypair } from "@solana/web3.js"
import { prisma } from "database"
import { getServerSession } from "next-auth/next"

import { encryptWithAES } from "@/lib/crypto"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get("email") as string

  if (!email || email === "")
    return NextResponse.json({ error: true, message: "Email is required" })

  const session = await getServerSession()

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return NextResponse.json({ user, session: session?.user?.name })
}

export async function POST(req: NextRequest) {
  const { providerId, email, name, image } = await req.json()
  try {
    const user = await prisma.user.create({
      data: {
        providerId,
        email,
        name,
        image,
      },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.log("create user error >> ", error)
    return NextResponse.json({ error })
  }
}

export async function PUT(req: NextRequest) {
  const { role } = await req.json()
  const session = await getServerSession()

  const kp = Keypair.generate()
  const ePvtKey = encryptWithAES(
    kp.secretKey.toString(),
    process.env.SECRET_KEY as string
  )

  // const user = await prisma.user.update({
  //   where: {
  //     email: session?.user?.email as string,
  //   },
  //   data: {
  //     role,
  //     publicKey: kp.publicKey.toString(),
  //     ePvtKey,
  //   },
  // });

  return NextResponse.json({ updated: true })
}
