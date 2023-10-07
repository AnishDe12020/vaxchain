import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(options);

  if (session?.user) {
    return redirect("/dashboard");
  } else {
    return redirect("/auth");
  }
}
