import { redirect } from "next/navigation"
import { prisma } from "database"
import { getServerSession } from "next-auth"

import { Button } from "@/components/ui/button"

const DashboardPage = async () => {
  const session = await getServerSession()

  if (!session?.user?.name) {
    redirect("/auth")
  }

  const user = await prisma.batch.findUnique({
    where: {
      pubkey: session?.user.name,
    },
  })

  const batches = await prisma.batch.findMany({
    where: {},
  })

  return (
    <div className="container relative hidden h-[900px] flex-col items-center justify-center md:grid">
      <Button>New batch</Button>
    </div>
  )
}

export default DashboardPage
