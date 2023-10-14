import { prisma } from "@/lib/db"

export const POST = async (request: Request) => {
  const body = await request.json()

  if (!body.batch || !body.temp || !body.pubkey) {
    return new Response("Missing required fields", { status: 400 })
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

  return new Response(JSON.stringify(log), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  })
}
