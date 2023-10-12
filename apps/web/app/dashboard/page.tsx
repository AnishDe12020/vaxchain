import { redirect } from "next/navigation"
import { Role } from "database"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/db"
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

  if (!user) {
    redirect("/auth")
  }

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
  } else {
    batches = await prisma.batch.findMany({
      where: {
        doctor: user?.address,
      },
    })
  }

  return (
    <>{batches && <Batches batches={batches} role={user.role as Role} />}</>
  )
}

export default DashboardPage
