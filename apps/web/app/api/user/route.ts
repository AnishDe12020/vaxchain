import { getServerSession } from "next-auth"

import { prisma } from "@/lib/db"

export const GET = async () => {
  const session = await getServerSession()

  if (!session?.user?.name) {
    return new Response("Unauthorized", { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: {
      address: session.user.name,
    },
  })

  if (!user) {
    return new Response("Not found", { status: 404 })
  }

  return new Response(JSON.stringify(user), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  })
}

export const PUT = async (request: Request) => {
  const session = await getServerSession()

  if (!session?.user?.name) {
    return new Response("Unauthorized", { status: 401 })
  }

  const body = await request.json()

  if (!body.role) {
    return new Response("Missing role", { status: 400 })
  }

  await prisma.user.update({
    where: {
      address: session.user.name,
    },
    data: {
      role: body.role,
    },
  })

  return new Response("OK", { status: 200 })
}
