import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import ModeToggle from "@/components/ui/mode-toggle"
import { AuthButton } from "@/components/auth/auth-button"
import UserRoleSelect from "@/components/auth/user-role-select"

const Role = async ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const session = await getServerSession()

  if (session && !searchParams.auth) {
    return redirect("/dashboard")
  } else if (!session && !searchParams.auth) {
    return redirect("/auth")
  } else {
    const getUser = await (
      await fetch(
        `${process.env.NEXTAUTH_URL}/api/user?email=${session?.user?.email}`
      )
    ).json()

    if (getUser?.user?.role) {
      return redirect("/dashboard")
    } else
      return (
        <>
          <div className="container relative hidden h-[900px] flex-col items-center justify-center md:grid">
            <div className="absolute flex left-4 top-4 md:left-8 md:top-8 text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              Vaxchain
            </div>
            <div className="absolute right-32 top-4 md:right-32 md:top-8">
              <ModeToggle />
            </div>
            <AuthButton />

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
