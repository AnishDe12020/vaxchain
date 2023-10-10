import { prisma } from "database"
import { getServerSession } from "next-auth"

export const GET = async (
  _: Request,
  { params }: { params: { pubkey: string } }
) => {
  const vaccine = await prisma.vaccine.findUnique({
    where: {
      pubkey: params.pubkey,
    },
  })

  if (!vaccine) {
    return new Response("Not found", { status: 404 })
  }

  return new Response(JSON.stringify(vaccine), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  })
}

export const PATCH = async (
  _: Request,
  { params }: { params: { pubkey: string } }
) => {
  const session = await getServerSession()

  if (!session?.user?.name) {
    return new Response("Unauthorized", { status: 401 })
  }

  const vaccine = await prisma.vaccine.findUnique({
    where: {
      pubkey: params.pubkey,
    },
  })

  if (!vaccine) {
    return new Response("Not found", { status: 404 })
  }

  if (vaccine.used) {
    return new Response("Vaccine already used", { status: 400 })
  }

  await prisma.vaccine.update({
    where: {
      pubkey: params.pubkey,
    },
    data: {
      used: true,
      usedBy: session.user.name,
      usedAt: new Date(),
    },
  })

  return new Response("OK", { status: 200 })
}
