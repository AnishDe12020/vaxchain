import { redirect } from "next/navigation"
import { prisma, Role } from "database"
import { getServerSession } from "next-auth"

import { Button } from "@/components/ui/button"
import Batches from "@/components/dashboard/tables/batches"

const DashboardPage = async () => {
  const session = await getServerSession()

  if (!session?.user?.name) {
    redirect("/auth")
  }

  const user = await prisma.user.findUnique({
    where: {
      address: session?.user.name,
    },
  })

  let batches

  if (user?.role === Role.DISTRIBUTOR) {
    batches = await prisma.batch.findMany({
      where: {
        distributor: user?.address,
      },
    })
  } else if (user?.role === Role.MANUFACTURER) {
    batches = await prisma.batch.findMany({
      where: {
        manufacturer: user?.address,
      },
    })
  }

  return <>{batches && <Batches batches={batches} />}</>
}

export default DashboardPage
