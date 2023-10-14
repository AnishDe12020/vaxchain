import { prisma } from "@/lib/db"

export const POST = async (request: Request) => {
  const body = await request.json()

  if (!body.batch || !body.temp || !body.pubkey) {
    return new Response("Missing required fields", { status: 400 })
  }

  const batch = await prisma.batch.findUnique({
    where: {
      pubkey: body.batch,
    },
    include: {
      TempLog: {
        orderBy: {
          timestamp: "desc",
        },
      },
    },
  })

  if (!batch) {
    return new Response("Batch not found", { status: 404 })
  }

  let defect = false

  if (
    body.temp > batch.manufacturer ||
    body.temp < batch.manufacturer ||
    (batch.TempLog.length > 0 &&
      new Date().getTime() - new Date(batch.TempLog[0].timestamp).getTime() >
        300000)
  ) {
    defect = true
  }

  const log = await prisma.tempLog.create({
    data: {
      pubkey: body.pubkey,
      temp: body.temp,
      timestamp: new Date(),
      batch: {
        connect: {
          pubkey: body.batch,
        },
      },
    },
  })

  await prisma.batch.update({
    where: {
      pubkey: body.batch,
    },
    data: {
      latestTempLog: body.pubkey,
      tempDefect: defect,
    },
  })

  return new Response(JSON.stringify(log), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  })
}
