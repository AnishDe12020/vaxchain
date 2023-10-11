import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { ConnectWallet } from "@/components/shared/ConnectWallet"

export const Auth = async () => {
  const session = await getServerSession()

  if (session?.user?.name) {
    redirect("/dashboard")
  }

  return (
    <>
      <div className="container relative hidden h-[900px] flex-col items-center justify-center md:grid">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Authenticate with your wallet
              </h1>
            </div>

            <ConnectWallet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
