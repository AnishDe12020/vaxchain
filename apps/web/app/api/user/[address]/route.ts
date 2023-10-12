import { prisma } from "@/lib/db"

export const GET = async (
  _: Request,
  { params }: { params: { address: string } }
) => {
  const user = await prisma.user.findUnique({
    where: {
      address: params.address,
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
