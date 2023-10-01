import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Role = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession();

  if (session) {
    return redirect("/dashboard");
  } else if (!session && !searchParams.auth) {
    return redirect("/auth");
  } else {
    return <h1>role</h1>;
  }
};

export default Role;
