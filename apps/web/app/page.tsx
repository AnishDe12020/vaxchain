import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"

import { options } from "./api/auth/[...nextauth]/options"

export default async function Home() {
  const session = await getServerSession(options as any)

  if ((session as any)?.user) {
    return redirect("/dashboard")
  } else {
    return redirect("/auth")
  }
}
