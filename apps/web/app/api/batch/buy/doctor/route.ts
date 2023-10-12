import { getServerSession } from "next-auth"

import { prisma } from "@/lib/db"

export const POST = async (request: Request) => {
  const session = await getServerSession()

  if (!session?.user?.name) {
    return new Response("Unauthorized", { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: {
      address: session?.user.name,
    },
  })

  if (!user?.role) {
    return new Response("Unauthorized", { status: 401 })
  }

  if (user.role !== "DOCTOR") {
    return new Response("Unauthorized", { status: 401 })
  }

  const body = await request.json()

  if (!body.batch) {
    return new Response("Missing required fields", { status: 400 })
  }

  await prisma.batch.update({
    where: {
      pubkey: body.batch,
    },
    data: {
      doctor: user.address,
      stopDate: new Date(),
      status: "ReceivedByDoctor",
    },
  })

  return new Response("OK", { status: 200 })
}
