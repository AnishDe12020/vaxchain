import { prisma } from "database"
import { getServerSession } from "next-auth"

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
