import { prisma } from "database"
import { getServerSession } from "next-auth"

export const GET = async () => {
  const session = await getServerSession()

  if (!session?.user?.name) {
    return new Response("Unauthorized", { status: 401 })
  }

  const batches = await prisma.batch.findMany({
    where: {
      manufacturer: session.user.name,
    },
    select: {
      Vaccine: true,
      TempLog: true,
    },
  })

  return new Response(JSON.stringify(batches), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  })
}

export const POST = async (request: Request) => {
  const session = await getServerSession()

  if (!session?.user?.name) {
    return new Response("Unauthorized", { status: 401 })
  }

  const body = await request.json()

  if (
    !body.name ||
    !body.pubkey ||
    !body.expiresAt ||
    !body.tempMin ||
    !body.tempMax ||
    !body.costPerPiece ||
    !body.quantity ||
    !body.vaccines
  ) {
    return new Response("Missing required fields", { status: 400 })
  }

  const batch = await prisma.batch.create({
    data: {
      costPerPiece: body.costPerPiece,
      expiresAt: new Date(body.expiresAt),
      name: body.name,
      pubkey: body.pubkey,
      quantity: body.quantity,
      tempMax: body.tempMax,
      tempMin: body.tempMin,
      status: "Manufactured",
      manufacturer: session.user.name,
    },
  })

  await prisma.vaccine.createMany({
    data: body.vaccines.map((vaccine: string) => ({
      pubkey: vaccine,
      batchId: batch.id,
    })),
    skipDuplicates: true,
  })

  return new Response("OK", { status: 200 })
}
