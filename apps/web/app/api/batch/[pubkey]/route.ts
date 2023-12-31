import { prisma } from "@/lib/db"

export const GET = async (
  _: Request,
  { params }: { params: { pubkey: string } }
) => {
  const batch = await prisma.batch.findUnique({
    where: {
      pubkey: params.pubkey,
    },
    include: {
      Vaccine: true,
      TempLog: {
        orderBy: {
          timestamp: "desc",
        },
      },
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
