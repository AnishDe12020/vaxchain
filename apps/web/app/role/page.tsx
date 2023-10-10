import { redirect } from "next/navigation"
import { prisma } from "database"
import { getServerSession } from "next-auth"

import ModeToggle from "@/components/ui/mode-toggle"
import { AuthButton } from "@/components/auth/auth-button"
import UserRoleSelect from "@/components/auth/user-role-select"

const Role = async () => {
  const session = await getServerSession()

  if (!session?.user?.name) {
    return redirect("/auth")
  } else {
    console.log(session)
    const user = await prisma.user.findUnique({
      where: {
        address: session?.user.name,
      },
    })
    console.log(user)

    if (user?.role) {
      return redirect("/dashboard")
    } else
      return (
        <>
          <div className="container relative hidden h-[900px] flex-col items-center justify-center md:grid">
            <div className="lg:p-8">
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Complete your Account
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Get a role to access the platform
                  </p>
                </div>
                <UserRoleSelect />
              </div>
            </div>
          </div>
        </>
      )
  }
}

export default Role
