import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import ModeToggle from "@/components/ui/mode-toggle"
import UserAuthForm from "@/components/auth/user-auth-form"

export const Auth = async () => {
  const session = await getServerSession()

  return (
    <>
      <div className="container relative hidden h-[900px] flex-col items-center justify-center md:grid">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Use your google workspace to create an account
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
