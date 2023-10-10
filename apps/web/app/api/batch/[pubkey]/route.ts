import { prisma } from "database"

export const GET = async (
  _: Request,
  { params }: { params: { pubkey: string } }
) => {
  const batch = await prisma.batch.findUnique({
    where: {
      pubkey: params.pubkey,
    },
    select: {
      Vaccine: true,
      TempLog: true,
    },
  })

  if (!batch) {
    return new Response("Not found", { status: 404 })
  }

  return new Response(JSON.stringify(batch), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  })
}
