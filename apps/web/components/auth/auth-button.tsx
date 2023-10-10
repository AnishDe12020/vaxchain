"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export const AuthButton = () => {
  const session = useSession();
  return (
    <>
      {session.data?.user ? (
        <Link
          href="#"
          onClick={() =>
            signOut({
              callbackUrl: "/auth",
            })
          }
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Logout
        </Link>
      ) : (
        // <h4 className="absolute right-4 top-4 md:right-8 md:top-8">
        //   Welcome {session.data.user.name}!
        // </h4>
        <Link
          href="/auth"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Login
        </Link>
      )}
    </>
  );
};
