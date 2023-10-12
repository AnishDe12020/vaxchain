import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/db"
import BuyForm from "@/components/dashboard/forms/buy"

const ReceivePage = async () => {
  const session = await getServerSession()

  if (!session?.user?.name) {
    redirect("/auth")
  }

  const user = await prisma.user.findUnique({
    where: {
      address: session?.user.name,
    },
  })

  if (!user?.role) {
    redirect("/auth")
  }

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <BuyForm role={user.role} />
    </div>
  )
}

export default ReceivePage
